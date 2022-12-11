create table planet(
    name text primary key,
    rotation_period text,
    orbital_period text,  
    diameter text,
    climate text,
    gravity text,
    terrain text,
    surface_water text,
    population text
);

create table species(
    name text primary key,
    classification text,
    designation text,
    average_height text,
    skin_colors text,
    hair_colors text,
    eye_colors text,
    average_lifespan text,
    language text,
    homeworld text references planet(name)
);

create table character(
    name text primary key,
    height text,
    mass text,
    hair_color text,
    skin_color text,
    eye_color text,
    birth_year text,
    gender text,
    homeworld text references planet(name),
    species text references species(name)
);

create table vehicle(
    name text primary key,
    model text,
    manufacturer text,
    cost_in_credits text,
    length text,
    max_atmosphering_speed text,
    crew text,
    passengers text,
    cargo_capacity text,
    consumables text,
    vehicle_class text
);

create table starship(
    name text primary key,
    model text,
    manufacturer text,
    cost_in_credits text,
    length text,
    max_atmosphering_speed text,
    crew text,
    passengers text,
    cargo_capacity text,
    consumables text,
    hyperdrive_rating text,
    MGLT text,
    starship_class text
);