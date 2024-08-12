// app/api/getAllData/route.js

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

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('user_data_collection'); // Your collection name
    const data = await collection.find({}).toArray();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
