# Models3Go

Models3Go is a React project I built for my summative lab. It's a website for browsing and managing 3D-printed products.

The website has three pages: Home, Shop, and Admin Portal.

## Features

- View and search 3D-printed products
- Add new products
- Edit product prices
- Delete products
- Upload, replace, and remove product pictures
- Generate product descriptions using AI
- Works on desktop and mobile

## Technologies Used

- React and JavaScript
- Vite
- React Router
- CSS
- JSON Server
- Ollama (Llama 3.2)

## How to Run

First, clone the repository and install the dependencies.

```bash
git clone https://github.com/Bananabot0003/Models3go.git
cd Models3go
npm install
```

Start the React application:

```bash
npm run dev
```

Open another terminal and start the database:

```bash
npx json-server db.json --port 6001
```

For the AI feature, you will need Ollama installed with the Llama 3.2 model.

```bash
ollama pull llama3.2
ollama serve
```

If Ollama is already running, you don't need to start it again.

Open the website at http://localhost:5173.

## How It Works

The Shop page gets products from `db.json` using JSON Server. Users can search for products by name.

The Admin Portal allows products to be added, edited, and deleted using GET, POST, PATCH, and DELETE requests.

I created a custom React hook called `useProducts` to fetch the products and handle loading and errors.

The AI generator connects to Ollama and creates descriptions based on the product information entered.

Product pictures can also be uploaded. If a product doesn't have a picture, the website displays a purple hexagon instead.

## GitHub

I used Git and GitHub to track my changes. I also created a feature branch and merged a pull request into the main branch.

## Future Improvements

I would like to add a shopping cart, user accounts, and a checkout system in the future.