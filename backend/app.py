import os
import psycopg2
import openai
from dotenv import load_dotenv
from flask import Flask, request
from psycopg2.extensions import AsIs
from psycopg2.extras import RealDictCursor
from flask_cors import CORS

# Load env & API key
load_dotenv()
API_KEY = os.getenv('OPENAI_API_KEY')

# Connect to database
conn = psycopg2.connect(
    "host=db dbname=postgres user=postgres password=postgres",
    cursor_factory=RealDictCursor)
app = Flask(__name__)
CORS(app)

# Default Test Route


@app.route('/')
def hello_world():
    return {"value": 5}


# Possible fields
ALL_TYPES = ["character", "species", "planet", "vehicle", "starship"]
RELATED_TYPES = ["character", "species", "planet"]
VEHICLE = ['vehicle']
STARSHIP = ['starship']


@app.route('/star-wars-data')
def request_from_react():
    """
        Makes a request to database based on category type & search text
        If the category type is either character, species or planet, it executes 
        inner joins to get interrelated information
        if category is either vehicle or starship, it executes a simple query based
        on searched name

        returns list of results from executed query
    """
    with conn.cursor() as cursor:
        # Fetch data from url
        star_wars_type = request.args.get("type", "character")
        star_wars_name = request.args.get("name", "")

        # Verify type
        if star_wars_type not in ALL_TYPES:
            star_wars_type = "character"

        # Temp variable
        temp = ""

        # If input type is character, planets or species
        if star_wars_type in RELATED_TYPES:
            cursor.execute("""
                select c.name as "name", c.height, c.mass, c.gender, s.name as species, 
                s.average_lifespan as "avg lifespan", p.name as homeworld, p.terrain as "planet terrain"
                from character c
                inner join planet p
                on c.homeworld = p.name
                inner join species s
                on s.name = c.species
                where lower(%s.name) like lower(%s)
                limit 10
            """, [AsIs(star_wars_type[0]), f"%{star_wars_name}%"])
            temp = list(cursor)

        # Query on spaceship table
        elif star_wars_type in STARSHIP:
            cursor.execute("""
                select s.name, s.model, s.manufacturer, s.passengers, s.starship_class as "starship class"
                from starship s
                where lower(s.name) like lower(%s)
                limit 10
            """, [f"%{star_wars_name}%"])
            temp = list(cursor)

        # Query on vehicle table based on name
        elif star_wars_type in VEHICLE:
            cursor.execute("""
                select v.name, v.model, v.manufacturer, v.passengers, v.vehicle_class as "vehicle class"
                from vehicle v
                where lower(v.name) like lower(%s)
                limit 10
            """, [f"%{star_wars_name}%"])
            temp = list(cursor)

        # If list is empty, make simple query on characters
        if len(temp) == 0:
            cursor.execute("""
                select name
                from %s
                limit 10
            """, [AsIs(star_wars_type)])
            temp = list(cursor)

        # Return list
        return temp


@app.route('/image-generator')
def dalle_request():
    """
        Makes a request to OpenAI to generate an image based on query parameter.
        Returns an image url  
    """

    # Get Name from query
    name = request.args.get("name", "Star Wars")
    input_type = request.args.get("type", "character")
    description = name + input_type + "from Star Wars"

    # Make request to Open AI
    openai.api_key = API_KEY
    response = openai.Image.create(
        prompt=description,
        n=1,
        size="1024x1024"
    )

    # Ge response & return image url
    image_url = response['data'][0]['url']
    return_image = {"image_url": image_url}

    return return_image
