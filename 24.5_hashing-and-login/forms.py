from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import InputRequired, Length


class RegisterForm(FlaskForm):
    username = StringField("username", validators=[InputRequired()])
    password = PasswordField("password", validators=[InputRequired()])
    email = StringField("email", validators=[InputRequired()])
    first_name = StringField("first name", validators=[InputRequired()])
    last_name = StringField("last name", validators=[InputRequired()])


class LoginForm(FlaskForm):
    username = StringField("username", validators=[InputRequired()])
    password = PasswordField("password", validators=[InputRequired()])

class FeedbackForm(FlaskForm):
    title = StringField("title", validators=[InputRequired(), Length(min=-1, max=100)])
    content = TextAreaField("content", render_kw={'rows': 5}, validators=[InputRequired(), Length(min=-1, max=1000)])
