// app/api/saveData/route.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let db;

async function connectToDatabase() {
  if (db) return { client, db };
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db('user_data_db'); // Your database name
  return { client, db };
}

export async function POST(request) {
  try {
    const { data } = await request.json();
    const { db } = await connectToDatabase();
    const collection = db.collection('user_data_collection'); // Your collection name
    await collection.insertOne({ data });
    return new Response(JSON.stringify({ message: 'Data saved successfully!' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(JSON.stringify({ error: 'Error saving data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
