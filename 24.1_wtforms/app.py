from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db, Pet
from forms import AddPet, EditPet

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_agency'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
connect_db(app)

app.config['SECRET_KEY'] = "SECRET!"

# from flask_debugtoolbar import DebugToolbarExtension
# debug = DebugToolbarExtension(app)

@app.route('/')
def show_root():
    pets = Pet.query.all()
    return render_template('index.html', pets=pets)

@app.route('/add', methods=['GET', 'POST'])
def add_pet():

    form = AddPet()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        available = form.available.data
        pet = Pet(name=name, species=species, photo_url=photo_url, age=age,notes=notes, available=available)
        db.session.add(pet)
        db.session.commit()
        flash(f"Added {name}")
        return redirect('/')

    else:
        return render_template('add.html', form=form)

@app.route('/<int:id>', methods=['GET', 'POST'])
def show_pet(id):

    pet = Pet.query.get(id)
    form = EditPet(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        return redirect(f'/{id}')

    else:
        return render_template('pet.html', pet=pet, form=form)
