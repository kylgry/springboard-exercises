"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
connect_db(app)

# from flask_debugtoolbar import DebugToolbarExtension
# app.config['SECRET_KEY'] = "SECRET!"
# debug = DebugToolbarExtension(app)

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
    posts = Post.query.filter_by(posted_by=user.id).all()
    return render_template('user.html', user=user, posts=posts)

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

@app.route('/user/<id>/delete')
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')

@app.route('/user/<id>/post/new')
def show_post_new(id):
    user = User.query.get(id)
    return render_template('post_new.html', user=user)

@app.route('/user/<id>/post/new', methods=['POST'])
def new_post(id):
    title = request.form.get('title')
    content = request.form.get('content')
    new_post = Post(title=title, content=content, posted_by=id)
    db.session.add(new_post)
    db.session.commit()
    return redirect(f'/post/{new_post.id}')

@app.route('/post/<id>')
def show_post(id):
    post = Post.query.get(id)
    return render_template('post.html', post=post)

@app.route('/post/<id>/edit')
def show_post_edit(id):
    post = Post.query.get(id)
    return render_template('post_edit.html', post=post)

@app.route('/post/<id>/edit', methods=['POST'])
def edit_post(id):
    post = Post.query.get(id)
    post.title = request.form.get('title')
    post.content = request.form.get('content')
    db.session.commit()
    return redirect(f'/post/{id}')

@app.route('/post/<id>/delete')
def delete_post(id):
    post = Post.query.get(id)
    user_id = post.user.id
    db.session.delete(post)
    db.session.commit()
    return redirect(f'/user/{user_id}')
