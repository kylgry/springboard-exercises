from flask import Flask, request, render_template, redirect
from flask import flash, session, make_response, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "abc"

boggle_game = Boggle()
scores = []

@app.route('/')
def display_root():
    """ displays page for playing the game """
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('index.html')

@app.route('/guess')
def check_guess():
    """ checks user input guess to see if valid and returns an answer """
    word = request.args["word"]
    board = session['board']
    answer = boggle_game.check_valid_word(board,word)
    return jsonify(result=answer)

@app.route('/newscore', methods=['POST'])
def update_scores():
    """ updates list with a new score """
    score = request.json['score']
    scores.append(score)
    print(scores)
    return ('', 204)
