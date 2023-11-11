from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows all origins to access your API.

@app.route('/api/')
def hello_world():
    return 'Hello, Flask API!'

if __name__ == '__main__':
    app.run(debug=True)
