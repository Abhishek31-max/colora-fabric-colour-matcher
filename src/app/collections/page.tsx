"use client";
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';

const collections = [
  {
    title: 'Seasonal Favorites',
    desc: 'Lightweight fabrics perfect for the upcoming season.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Luxury Silks',
    desc: 'Fine silks with a premium sheen and elegant drape.',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Sustainable Linens',
    desc: 'Eco-friendly linens sourced from responsible growers.',
    image: 'https://images.unsplash.com/photo-1582733909565-5154ee4260f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Heritage Cottons',
    desc: 'Traditional weaves passed down through generations.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6120?auto=format&fit=crop&w=600&q=80'
  }
];

export default function CollectionsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '3rem', backgroundColor: 'var(--bg-primary)' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Collections</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                Explore our curated selection of high-quality fabrics.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem' }}>
              {collections.map((col, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="card glass"
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ height: '300px', overflow: 'hidden' }}>
                    <img 
                      src={col.image} 
                      alt={col.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    />
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{col.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{col.desc}</p>
                    <button className="btn-primary" style={{ width: '100%' }}>View Collection</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--bg-secondary)', backgroundColor: 'var(--white)' }}>
        &copy; 2026 Colora – Premium Fabric Matcher. All rights reserved.
      </footer>
    </div>
  );
}
