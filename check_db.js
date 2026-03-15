const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Try to load env from .env.local in the current directory (colora-app)
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const mongoUri = envContent.match(/MONGODB_URI=(.*)/)?.[1];

async function check() {
  if (!mongoUri) {
    console.error('MONGODB_URI not found in .env.local');
    return;
  }
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db();
    const fabrics = await db.collection('fabrics').find({}).limit(10).toArray();
    console.log(JSON.stringify(fabrics, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

check();
