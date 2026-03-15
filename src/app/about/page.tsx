"use client";
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <motion.main 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ flex: 1, padding: '3rem', backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Our Story</h1>
              <div style={{
                height: '400px',
                width: '100%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                marginBottom: '3rem',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1558584449-32219468e820?auto=format&fit=crop&w=1200&q=80" 
                  alt="Atelier" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>

            <section className="animate-fade-in" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '2rem' }}>
                Colora was born from a simple observation: finding the perfect fabric match shouldn't be a game of chance. For designers, tailors, and textile enthusiasts, the nuance of color is everything.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                We've combined decades of textile expertise with cutting-edge AI technology to create the world's most intuitive fabric matching engine. By leveraging the CIELAB color space, we ensure that every match is mathematically and perceptually precise.
              </p>
              <div className="card glass" style={{ padding: '3rem', marginTop: '4rem', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Our Mission</h2>
                <p>
                  To empower creativity by removing the friction between inspiration and execution. We provide the tools you need to find the exact textures and tones your vision requires.
                </p>
              </div>
            </section>
          </div>
        </motion.main>
      </div>
      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--bg-secondary)', backgroundColor: 'var(--white)' }}>
        &copy; 2026 Colora – Premium Fabric Matcher. All rights reserved.
      </footer>
    </div>
  );
}
