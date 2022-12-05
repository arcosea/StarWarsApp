import psycopg2
from flask import Flask
from psycopg2.extras import RealDictCursor
from flask_cors import CORS

conn = psycopg2.connect(
    "host=db dbname=postgres user=postgres password=postgres",
    cursor_factory=RealDictCursor)
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return {"value": 5}