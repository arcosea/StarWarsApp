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


@app.route('/image-generator')
def request_from_react():
    #take the user information to then make another request
    #first we get data from db
    #then we request dalle image through helpere dalle_request function
    return {"val": 22}


def dalle_request():
    #make request to dalle
    #return image
    return