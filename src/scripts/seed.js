const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const fabrics = [
  {
    name: "Classic Crimson Velvet",
    sku: "CV-001",
    hex: "#8B0000",
    image_url: "https://images.unsplash.com/photo-1594034444408-013143920c74?auto=format&fit=crop&w=400&q=80",
    price: 45.99,
    stock: 120,
    tags: ["velvet", "red", "premium"],
    description: "Deep red velvet with a luxurious sheen.",
    createdAt: new Date()
  },
  {
    name: "Midnight Silk Satin",
    sku: "MS-002",
    hex: "#191970",
    image_url: "https://images.unsplash.com/photo-1592890678913-e9224987dc39?auto=format&fit=crop&w=400&q=80",
    price: 65.50,
    stock: 85,
    tags: ["silk", "blue", "evening"],
    description: "Ultra-smooth silk in a dark midnight blue shade.",
    createdAt: new Date()
  },
  {
    name: "Desert Sand Linen",
    sku: "DL-003",
    hex: "#EDC9AF",
    image_url: "https://images.unsplash.com/photo-1582733909565-5154ee4260f8?auto=format&fit=crop&w=400&q=80",
    price: 22.00,
    stock: 250,
    tags: ["linen", "beige", "breathable"],
    description: "Lightweight, breathable linen in a soft sandy tone.",
    createdAt: new Date()
  },
  {
    name: "Forest Fern Cotton",
    sku: "FC-004",
    hex: "#228B22",
    image_url: "https://images.unsplash.com/photo-1620712943543-bcc4628c6120?auto=format&fit=crop&w=400&q=80",
    price: 18.00,
    stock: 500,
    tags: ["cotton", "green", "natural"],
    description: "Durable green cotton perfect for everyday wear.",
    createdAt: new Date()
  },
  {
    name: "Royal Azure Brocade",
    sku: "RB-005",
    hex: "#007FFF",
    image_url: "https://images.unsplash.com/photo-1584281722572-87009405d68d?auto=format&fit=crop&w=400&q=80",
    price: 89.99,
    stock: 45,
    tags: ["brocade", "blue", "luxury"],
    description: "Ornate blue brocade with silver thread accents.",
    createdAt: new Date()
  },
  {
    name: "Ivory Cloud Chiffon",
    sku: "IC-006",
    hex: "#F5F5F5",
    image_url: "https://images.unsplash.com/photo-1606293459207-6886e680a316?auto=format&fit=crop&w=400&q=80",
    price: 15.75,
    stock: 300,
    tags: ["chiffon", "white", "sheer"],
    description: "Light and airy ivory chiffon for elegant draping.",
    createdAt: new Date()
  },
  {
    name: "Golden Wheat Twill",
    sku: "GT-007",
    hex: "#F5DEB3",
    image_url: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=400&q=80",
    price: 28.50,
    stock: 150,
    tags: ["twill", "yellow", "workwear"],
    description: "Strong and versatile twill in a warm golden hue.",
    createdAt: new Date()
  },
  {
    name: "Deep Orchid Crepe",
    sku: "OC-008",
    hex: "#9932CC",
    image_url: "https://images.unsplash.com/photo-1520006403909-838d6b91c97a?auto=format&fit=crop&w=400&q=80",
    price: 34.00,
    stock: 90,
    tags: ["crepe", "purple", "fashion"],
    description: "Textured purple crepe with a beautiful drape.",
    createdAt: new Date()
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Please specify MONGODB_URI in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('fabrics');

    // Clear existing
    await collection.deleteMany({});
    console.log('Cleared existing fabrics');

    // Insert new
    await collection.insertMany(fabrics);
    console.log(`Successfully seeded ${fabrics.length} fabrics`);

  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await client.close();
  }
}

seed();
