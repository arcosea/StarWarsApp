create table planet(
    name text primary key,
    rotation_period int,
    orbital_period int 
    diameter int,
    climate text,
    gravity float,
    terrain text,
    surface_water float,
    population bigint
);

create table species(
    name text primary key,
    classification text,
    designation text,
    average_height int,
    skin_colors text,
    hair_colors text,
    eye_colors text,
    average_lifespan int,
    language text,
    homeworld text foreign key references planet(name)
);

create table character(
    name text primary key,
    height int,
    mass float,
    hair_color text,
    skin_color text,
    eye_color text,
    birth_year text,
    gender text,
    homeworld text foreign key references planet(name),
    species text foreign key references species(name)
);