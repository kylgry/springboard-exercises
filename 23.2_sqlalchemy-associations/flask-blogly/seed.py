
from models import User, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

john_smith = User(first_name='John', last_name="Smith")
melissa_black = User(first_name='Melissa', last_name="Black")

db.session.add(john_smith)
db.session.add(melissa_black)


db.session.commit()
