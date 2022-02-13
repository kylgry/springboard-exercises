from flask import Flask, request, render_template, redirect, flash, session
import surveys

app = Flask(__name__)

responses = []

@app.route('/')
def display_root():
    title = surveys.satisfaction_survey.title
    instructions = surveys.satisfaction_survey.instructions
    return render_template('index.html', title=title, instructions=instructions)


# i think logically there is no need to have the question number in the url
# this route can just always direct to the next unanswered question by
# looking at length of response array. simpler than adding logic in response to
# url is correct or not. step 7 becoems irrelevant since user can't visit wrong url.

@app.route('/questions')
def display_questions():
    n = len(responses)
    survey_qs = surveys.satisfaction_survey.questions
    if n == len(survey_qs):
        return redirect('/thankyou')
    else:
        question = survey_qs[n].question
        choices = survey_qs[n].choices
        return render_template('question.html', n=n, question=question, choices=choices)

@app.route('/answer', methods=['POST'])
def handle_answer():
    responses.append(request.form.getlist('options')[0])
    return redirect('/questions')

@app.route('/thankyou')
def display_thankyou():
    return render_template('thankyou.html')
