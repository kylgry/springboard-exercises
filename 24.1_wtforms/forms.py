from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField
from wtforms.validators import InputRequired, URL, Optional, NumberRange

class AddPet(FlaskForm):
    name = StringField("Name", validators=[InputRequired(message="Pet name required")])
    species = SelectField("Species", choices=[('cat', 'Cat'),  ('dog', 'Dog'),  ('porcupine', 'Porcupine')])
    photo_url = StringField("Photo URL", default="http://localhost:5000/static/images/cat.jpg", validators=[Optional(), URL(require_tld=False)])
    age = IntegerField("Age", validators=[NumberRange(min=0, max=30),Optional()])
    notes = StringField("Notes")
    available = BooleanField("Available", default=True)

class EditPet(FlaskForm):
    photo_url = StringField("Photo URL", default="http://localhost:5000/static/images/cat.jpg", validators=[Optional(), URL(require_tld=False)])
    notes = StringField("Notes")
    available = BooleanField("Available", default=True)
