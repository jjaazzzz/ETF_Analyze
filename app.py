from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # templates/index.html 렌더링

@app.route('/search')
def search():
    query = request.args.get('q', '')
    if not query:
        flash("검색어를 입력해주세요.", "warning")
        return redirect(url_for("index"))
    
    # 결과는 result.html표시
    return render_template('result.html', query=query)

if __name__ == '__main__':
    app.run(debug=True)
