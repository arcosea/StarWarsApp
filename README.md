# Star Wars Image App
## Search
This website allows users to search for a name from any one of 5 potential categories related to Star Wars:
  Characters, Planets, Species, Vehicles & Starships.
 
Each of those categories is a table in the database in which Characters, Planets, and Species are all related.
Vehicles and Starships are both independent

## How It Works

Whenever User clicks search, a request is made to the Flask backend searching for the target name in database. 
If the category is characters, planets or species then it loads relevant column results from character in addition to
 characters homeworld and characters species.

If category is either Vehicles & Starships, then it just displays the name, model, manufacturer, number of passengers, and class of Vehicle and Starship.

If no results are found, it executes a general search query on the given category/table type

Our React App makes a GET request to the /image-generator route created in our Flask App. We also add query parameters of name and type which we use to write a text based description of our image. The description is in the form "{name} {type} from Star Wars" where {type} is either Characters, Planets, Species, Vehicles or Starship and {name} is the name of the given type of on the first result in the table.
From our Flask App, we make another GET request using the OPEN AI API to generate a unique image url which we pass back to our React App. Our React App then displays the image that OPEN AI generated for us.

## Features
Only the top 10 results from database are shown.

Make search Button disabled and include BB-8 loading screen while waiting for response from OpenAI

Used 3js to create space warping in the background



# Instructions: 
## Prerequiste
Visual Studio Code, NodeJS, Docker, Docker & Dev Container VS Code extensions

## 1) Clone repository
```
git clone {url}
```

## 2) In Root Directory Install All Dependencies into Frontend, Run Following
```
   cd frontend
   npm install
   npm install three
   npm i --save-dev @types/three
```
 
## 3) (OPTIONAL) Create OpenAI account to Get OPENAI API Key Or Use Exisiting One 
  Special Case: DMAC does not have to make an account

## 4) Create .env file in Backend
```
cd backend
touch .env
```

## 4) Add OpenAI API Key Inside .env File in the form OPENAI_API_KEY=
`
OPENAI_API_KEY={Enter Key Here}
`
## 5) Build & Open Docker Container
May have to cd into dev container and run docker compose up 
```
cd .devcontainer
docker compose up
```
and then delete .postgres_data inside .devcontainer in order to be able to build container

## 6) From Root Directory Run Flask API in Backend
```
cd backend
flask --debug run
```

## 7) From Root Directory Run React Web App
```
cd frontend
npm start
```

# Technologies & Tools
React,
Typescript,
Python,
Flask,
HTML/CSS,
OpenAI API,
3JS,
Docker,
PostgreSQL

