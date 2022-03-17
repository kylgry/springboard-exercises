from flask import Flask, request, jsonify, render_template, redirect, abort, session, flash
from models import db, connect_db, User, Feedback
from flask_bcrypt import Bcrypt
from forms import RegisterForm, LoginForm, FeedbackForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///flask_feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = "hunter2"

connect_db(app)

# from flask_debugtoolbar import DebugToolbarExtension
# debug = DebugToolbarExtension(app)

@app.route('/')
def show_root():

    return render_template('index.html')


@app.route('/register')
def show_register():

    form = RegisterForm()
    return render_template('register.html', form=form)


@app.route('/register', methods=['POST'])
def register_user():

    form = RegisterForm()

    if form.validate_on_submit():

        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        user = User.register(username, password, email, first_name, last_name)

        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.username

        return redirect('/secret')

    else:
        return render_template("register.html", form=form)


@app.route('/login')
def show_login():

    if 'user_id' in session:
        return redirect('/secret')
    else:
        form=LoginForm()
        return render_template('login.html', form=form)

@app.route('/login', methods=['POST'])
def login():

    form = LoginForm()

    if form.validate_on_submit():

        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            session['user_id'] = user.username
            return redirect(f'/user/{username}')
        else:
            return render_template('login.html', form=form)

    else:
        return render_template('login.html', form=form)


@app.route('/secret')
def show_secret():

    if 'user_id' in session:
        return render_template('secret.html')
    else:
        return redirect('/login')


@app.route('/logout')
def logout():

    session.clear()
    return redirect('/')


@app.route('/user/<username>')
def show_user_info(username):

    if 'user_id' in session:
        user = User.query.filter_by(username=username).first()
        if user == None:
            return abort(404)
        else:
            feedback = Feedback.query.filter_by(username=username).all()
            return render_template('user.html', user=user, feedback=feedback)
    else:
        return redirect('/login')


@app.route('/feedback')
def show_feedback_form():

    if 'user_id' in session:
        form = FeedbackForm()
        return render_template('feedback.html', form=form)
    else:
        return redirect('/login')


@app.route('/feedback', methods=['POST'])
def post_feedback():

    if 'user_id' in session:
        form = FeedbackForm()
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            username = session['user_id']
            new_feedback = Feedback(title=title, content=content, username=username)
            db.session.add(new_feedback)
            db.session.commit()
            return redirect(f'/user/{username}')
        else:
            return render_template('feedback.html', form=form)
    else:
        return redirect('/login')

@app.route('/feedback/<int:feedback_id>/delete')
def delete_feedback(feedback_id):

    if 'user_id' in session:
        feedback = Feedback.query.get(feedback_id)
        username = session['user_id']
        if feedback == None:
            flash("that feedback doesn't exist")
            return redirect(f'/user/{username}')
        elif feedback.username == username:
            db.session.delete(feedback)
            db.session.commit()
            return redirect(f'/user/{username}')
        else:
            flash('you cannot delete feedback from other users!')
            return redirect(f'/user/{username}')
    else:
        return redirect('/login')

@app.route('/feedback/<int:feedback_id>/edit')
def show_edit_feedback(feedback_id):
    if 'user_id' in session:
        feedback = Feedback.query.get(feedback_id)
        username = session['user_id']
        if feedback == None:
            flash("that feedback doesn't exist")
            return redirect(f'/user/{username}')
        elif feedback.username == username:
            form = FeedbackForm()
            form.title.data = feedback.title
            form.content.data = feedback.content
            return render_template('feedback_edit.html', form=form)
        else:
            flash('you cannot delete feedback from other users!')
            return redirect(f'/user/{username}')
    else:
        return redirect('/login')

@app.route('/feedback/<int:feedback_id>/edit', methods=['POST'])
def edit_feedback(feedback_id):

    if 'user_id' in session:
        feedback = Feedback.query.get(feedback_id)
        username = session['user_id']
        if feedback == None:
            flash("that feedback doesn't exist")
            return redirect(f'/user/{username}')
        elif feedback.username != username:
            flash('you cannot edit feedback from other users!')
            return redirect(f'/user/{username}')
        else:
            form = FeedbackForm()
            if form.validate_on_submit():
                feedback.title = form.title.data
                feedback.content = form.content.data
                db.session.commit()
                return redirect(f'/user/{username}')
            else:
                return render_template('feedback_edit.html', form=form)
    else:
        return redirect('/login')

@app.route('/user/<username>/delete')
def delete_user(username):

    if 'user_id' in session:
        if username == session['user_id']:
            user = User.query.get(username)
            db.session.delete(user)
            db.session.commit()
            session.clear()
            return redirect('/')
        else:
            flash('you cannot delete a user other than yourself!')
            return redirect(f'/user/{username}')
    else:
        redirect('/login')
