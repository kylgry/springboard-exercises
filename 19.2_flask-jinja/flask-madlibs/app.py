from flask import Flask, request, render_template
import stories

app = Flask(__name__)

madlib = stories.Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

@app.route('/')
def index():
    prompts = madlib.prompts
    return render_template('index.html', prompts=prompts)

@app.route('/story')
def story():
    madlib_result=madlib.generate(request.args)
    return render_template('story.html', madlib_result=madlib_result)
