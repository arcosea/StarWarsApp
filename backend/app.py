import psycopg2
from flask import Flask, request
from psycopg2.extensions import AsIs
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


@app.route('/star-wars-data')
def request_from_react():

    with conn.cursor() as cursor:

        star_wars_type = request.args.get("type", "character")
        star_wars_name = request.args.get("name", "Anakin")

        print(star_wars_type)
        
        cursor.execute("""
        select *
        from %s
        where lower(name) like lower(%s)
        """, [AsIs(star_wars_type), f"%{star_wars_name}%"])

        return list(cursor)

    #then we request dalle image through helpere dalle_request function

@app.route('/image-generator')
def dalle_request():

    name = request.args.get("name", "Anakin Skywalker")


    #make request to dalle
    #return image
    return {"value": 5}