from flask import Flask, request, jsonify, render_template, abort
from models import db, connect_db
from keys import API_KEY
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = "hunter2"

connect_db(app)

# from flask_debugtoolbar import DebugToolbarExtension
# debug = DebugToolbarExtension(app)


@app.route('/')
def show_root():
    return render_template('index.html')
