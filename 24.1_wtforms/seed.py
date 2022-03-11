
from models import Pet, db
from app import app

db.drop_all()
db.create_all()

cat = Pet(name='Pebbles', species='cat', age='3', photo_url='http://localhost:5000/static/images/cat.jpg', available=False)
porc = Pet(name='Mike', species='porcupine', age='12', photo_url='http://localhost:5000/static/images/porcupine.jpg', available=True)

db.session.add(cat)
db.session.add(porc)
db.session.commit()
