const dbConnect = require('../src/lib/mongodb').default;
const Fabric = require('../src/models/Fabric').default;
require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    console.log('Testing DB connection...');
    await dbConnect();
    console.log('Connection successful.');
    const count = await Fabric.countDocuments();
    console.log(`Found ${count} fabrics in database.`);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    process.exit();
  }
}

test();
