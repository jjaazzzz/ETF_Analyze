from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # templates/index.html 렌더링

@app.route('/search')
def search():
    query = request.args.get('q')
    return render_template('result.html', query=query)

if __name__ == '__main__':
    app.run(debug=True)
