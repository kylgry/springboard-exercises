from flask import Flask, request, render_template, redirect
from flask import flash, session, make_response
import surveys

app = Flask(__name__)
app.config["SECRET_KEY"] = "abc"

@app.route('/')
def display_root():
    title = surveys.satisfaction_survey.title
    instructions = surveys.satisfaction_survey.instructions
    return render_template('index.html', title=title, instructions=instructions)

@app.route('/start', methods=['POST'])
def start_survey():
    responses = []
    session['responses'] = responses
    return redirect('/questions')

# i think logically there is no need to have the question number in the url
# this route can just always direct to the next unanswered question by
# looking at length of response array. simpler than adding logic in response to
# url is correct or not. step 7 becoems irrelevant since user can't visit wrong url.

# blah blah

@app.route('/questions')
def display_questions():
    """
    if response array in session exists but is not complete,
    then display next unanswered question. if it exists and is
    compelte, then rediret to thank you page. if it doesn't exist,
    redirect to front page.
    """
    responses = session.get('responses', False)
    if responses is not False:

        responses = session['responses']
        n = len(responses)
        survey_qs = surveys.satisfaction_survey.questions

        if n == len(survey_qs):
            return redirect('/thankyou')
        else:
            question = survey_qs[n].question
            choices = survey_qs[n].choices
            return render_template('question.html', n=n, question=question, choices=choices)

    else:
        return redirect('/')

@app.route('/answer', methods=['POST'])
def handle_answer():
    """
    appends response array with survey question response
    """
    responses = session['responses']
    responses.append(request.form.getlist('options')[0])
    session['responses'] = responses
    return redirect('/questions')

@app.route('/thankyou')
def display_thankyou():
    """
    if response array is complete, displays a thank you message.
    if it doesn't exist, redirets to front page. if incomplete,
    redirects to questions page.
    """
    responses = session.get('responses', False)
    if responses is not False:
        if len(responses) == len(surveys.satisfaction_survey.questions):
            return render_template('thankyou.html')
        else:
            return redirect('/questions')
    else:
        return redirect('/')
