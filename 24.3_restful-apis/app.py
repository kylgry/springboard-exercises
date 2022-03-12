from flask import Flask, request, jsonify, render_template, abort
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
connect_db(app)

app.config['SECRET_KEY'] = "SECRET!"

# from flask_debugtoolbar import DebugToolbarExtension
# debug = DebugToolbarExtension(app)

@app.route('/')
def show_root():
    return render_template('index.html')

@app.route('/api/cupcakes')
def get_all_cupcakes():
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes', methods=['POST'])
def post_cupcake():
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    if request.json['image'] == '':
        image = None;
    else:
        image = request.json['image']
    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()
    new_cupcake_serialized = new_cupcake.serialize()
    return ( jsonify(cupcake=new_cupcake_serialized), 201 )

@app.route('/api/cupcakes/<int:id>')
def get_cupcake(id):
    if valid_id(id):
        cupcake = Cupcake.query.get(id).serialize()
        return jsonify(cupcake=cupcake)
    else:
        abort(404)

@app.route('/api/cupcakes/<int:id>', methods=['PATCH'])
def patch_cupcake(id):
    if valid_id(id):
        cupcake = Cupcake.query.get(id)
        cupcake.flavor = request.json.get('flavor')
        cupcake.size = request.json.get('size')
        cupcake.rating = request.json.get('rating')
        cupcake.image = request.json.get('image')
        db.session.commit()
        cupcake_ser = cupcake.serialize()
        return ( jsonify(cupcake=cupcake_ser), 200 )
    else:
        abort(404)

@app.route('/api/cupcakes/<int:id>', methods=['DELETE'])
def delete_cupcake(id):
    if valid_id(id):
        cupcake = Cupcake.query.get(id)
        db.session.delete(cupcake)
        db.session.commit()
        msg = "Deleted"
        return ( jsonify(msg=msg), 200 )
    else:
        abort(404)

def valid_id(id):
    if id in [x.id for x in Cupcake.query.all()]:
        return True
    else:
        return False
