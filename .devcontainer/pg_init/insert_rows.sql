copy planet(name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population)
from '/docker-entrypoint-initdb.d/seed_data/planets.csv'
delimiter ','
csv header;

copy species(name, classification, designation, average_height, skin_colors, hair_colors, eye_colors, average_lifespan, language, homeworld)
from '/docker-entrypoint-initdb.d/seed_data/species.csv'
delimiter ','
csv header;

copy character(name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, species)
from '/docker-entrypoint-initdb.d/seed_data/characters.csv'
delimiter ','
csv header;