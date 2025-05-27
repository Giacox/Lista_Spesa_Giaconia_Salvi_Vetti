const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const verifyToken = require('./authmiddleware');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'https://lista-spesa-giaconia-salvi-vetti.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const connectToDatabase = async () => {
  try{
    const client = await MongoClient.connect(process.env.MONGO_URI);
    console.log("Connected to database");
    return client.db(process.env.DB_NAME);
  }catch(error){
    console.log("Error connecting to database", error);
    process.exit(1)
  }
}

let database;

const startServer = async () => {
  database = await connectToDatabase();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

}

startServer();
app.get("/api/articles", async (req, res) => {
  if (!database) {
    return res.status(500).json({ message: "Database not connected" });
  }
  try {
    const result = await database
      .collection("Articoli")
      .find({})
      .sort({ aisle: 1, position: 1 })
      .toArray();

    return res.json(result);
  } catch (error) {
    console.log("Error fetching Articoli", error);
    return res.status(500).json({ message: "Error fetching Articoli" });
  }
});

let currentList = [];
app.get('/api/list', async(req, res) => {
  res.json(currentList);
  });
app.delete('/api/list/svuota', async(req, res) => {
  currentList = [];
  res.json({ message: 'Lista svuotata' });
  });
app.get('/api/list/add/:name', async (req, res) => {
  const articleName = req.params.name;
  try {
  const article = await database.collection('Articoli').findOne({ name: articleName });
  if (!article) {
    return res.status(404).json({ error: 'Articolo non trovato' });
  }
  const existsInList = currentList.some(item => item.name === articleName);
  if (existsInList) {
    return res.status(400).json({ message: 'Articolo già presente nella lista' });
  }
  currentList.push(article);
  currentList = currentList.sort((a, b) => {
    if (a.aisle < b.aisle) return -1;
    if (a.aisle > b.aisle) return 1;
    return a.position - b.position;
  });
  res.json({ message: 'Articolo aggiunto', article: article });
  } catch (err) {
  res.status(500).json({ error: 'Errore durante l\'aggiunta', details: err.message });
  }
});
app.delete('/api/list/remove/:name', async(req, res) => {
  const articleName = req.params.name;
  currentList = currentList.filter(article => article.name !== articleName);
  res.json({ message: 'Articolo rimosso' });
});
app.post('/api/articles/add', verifyToken, async(req, res) => {
  if(!database){
    return res.status(500).json({message: "Database not connected"});
  }
  try {
    const {name,category,aisle,position,price}=req.body;
    const existing = await database.collection("Articoli").findOne({ name: name });
    if (existing) {
      return res.status(400).json({ message: "Articolo già presente nel database" });
    }
    const existingPosition = await database.collection("Articoli").findOne({ aisle: aisle, position: position });
    if (existingPosition) {
    return res.status(400).json({ message: "Posizione già occupata da un altro articolo" });
    }
  const result= await database.collection("Articoli").insertOne({
    name,
    category,
    aisle,
    position,
    price
  });
  res.json({message: "Articolo inserito correttamente"})
  } catch (error) {
    console.log("Error fetching article", error);
    return res.status(500).json({message: "Error fetching article"});
  }
});
app.delete("/api/articles/delete/:name",verifyToken, async(req, res)=>{
  if(!database){
    return res.status(500).json({message: "Database not connected"});
  }
  try {
    const nameDelete=req.params.name;
  const result = await database.collection("Articoli").deleteOne({
    name:nameDelete
  });
  if (result.deleteCount === 0) {
    return res.status(404).json({message: "Articolo non trovato"});
  }
  currentList = currentList.filter(article => article.name !== nameDelete);
  return res.status(200).json({message: "Articolo eliminato"});
  } catch (error) {
    console.log("Error deleting Articole", error);
    return res.status(500).json({message: "Error deleting Articole"});
  }
});
app.put("/api/articles/update/:name", verifyToken, async (req, res) => {
  if (!database) {
  return res.status(500).json({ message: "Database not connected" });
  }
  try {
  const nameUpdate = req.params.name;
  const { name, category, aisle, position, price } = req.body;

  const existing = await database.collection("Articoli").findOne({
    $and: [
    { name: name },
    { name: { $ne: nameUpdate } }
    ]
  });
  if (existing) {
    return res.status(400).json({ message: "Articolo già presente nel database" });
  }

  const existingPosition = await database.collection("Articoli").findOne({
    aisle: aisle,
    position: position,
    name: { $ne: nameUpdate }
  });
  if (existingPosition) {
    return res.status(400).json({ message: "Posizione già occupata da un altro articolo" });
  }

  const result = await database.collection("Articoli").updateOne(
    { name: nameUpdate },
    {
    $set: {
      name,
      category,
      aisle,
      position,
      price,
    }
    }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: "Articolo non trovato" });
  }
  return res.status(200).json({ message: "Articolo aggiornato" });
  } catch (error) {
  console.log("Error updating Articole", error);
  return res.status(500).json({ message: "Error updating Articole" });
  }
});

const jwt = require("jsonwebtoken");

app.post("/api/login", async (req, res) => {
  if(!database){
    return res.status(500).json({message: "Database not connected"});
  }
  const { email, password } = req.body;
  try {
    const user = await database.collection("Admins").findOne({ Email: email });
    if (!user || user.Password !== password) {
      return res.status(401).json({ message: "Email o password non validi" });
      }
      const token = jwt.sign(
      { email: user.Email, id: user._id },
      process.env.JWT_SECRET || "ChiaveSuperSegretissima",
      { expiresIn: "2h" }
      );
      
      return res.status(200).json({ message: "Login riuscito", token });
    } catch (error) {
      console.error("Errore durante il login:", error);
      return res.status(500).json({ message: "Errore interno del server" });
    }
  }
);

