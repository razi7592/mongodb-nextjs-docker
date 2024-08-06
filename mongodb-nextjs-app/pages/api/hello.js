import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });
    res.status(200).json({ message: "Hey, it's Next.js connected to MongoDB!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error connecting to MongoDB", error: e.toString() });
  }
}
