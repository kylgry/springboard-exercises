from flask import Flask, request
import operations

app = Flask(__name__)

@app.route('/math/<calc>')
def calc(calc):
    a = int(request.args["a"])
    b = int(request.args["b"])
    if calc == "add":
        return str(operations.add(a,b))
    if calc == "sub":
        return str(operations.sub(a,b))
    if calc == "mult":
        return str(operations.mult(a,b))
    if calc == "div":
        return str(operations.div(a,b))

@app.route('/add')
def add():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.add(a,b))

@app.route('/sub')
def sub():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.sub(a,b))

@app.route('/mult')
def mult():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.mult(a,b))

@app.route('/div')
def div():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.div(a,b))
