"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
connect_db(app)

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

@app.route('/')
def show_root():
    return redirect("/users")

@app.route('/users')
def show_users():
    users = User.query.all()
    return render_template("users.html", users=users)

@app.route('/user/new')
def show_user_new():
    return render_template("user_new.html")

@app.route('/user/new', methods=['POST'])
def new_user():
    first_name = request.form.get('first-name')
    last_name = request.form.get('last-name')
    image_url = request.form.get('image-url')
    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/user/<id>')
def show_user(id):
    user = User.query.get(id)
    return render_template('user.html', user=user)

@app.route('/user/<id>/edit')
def show_user_edit(id):
    user = User.query.get(id)
    return render_template('user_edit.html', user=user)

@app.route('/user/<id>/edit', methods=['POST'])
def edit_user(id):
    user = User.query.get(id)
    user.first_name = request.form.get('first-name')
    user.last_name = request.form.get('last-name')
    user.image_url = request.form.get('image-url')
    db.session.commit()
    return redirect(f'/user/{id}')

@app.route('/user/<id>/delete', methods=['POST'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')
