import psycopg2
import os
import openai
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

        #check type


        # if character, planets, species
        # make use of inner joins

        # if star ships


        # if vehicles

        
        cursor.execute("""
        select *
        from %s
        where lower(name) like lower(%s)
        """, [AsIs(star_wars_type), f"%{star_wars_name}%"])

        #check if list is empty
        return list(cursor)

@app.route('/image-generator')
def dalle_request():

    #based on what is passed


    name = request.args.get("name", "Anakin Skywalker")

    name = name + " from Star Wars"

    openai.api_key = "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"
    response = openai.Image.create(
    prompt=name,
    n=1,
    size="1024x1024"
    )

    image_url = response['data'][0]['url']

    return_image = {"image_url": image_url}

    return return_image