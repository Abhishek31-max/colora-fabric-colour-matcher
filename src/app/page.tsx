"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import UploadSection from '@/components/UploadSection';
import ResultCard from '@/components/ResultCard';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [mounted, setMounted] = React.useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [hasMatched, setHasMatched] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="animate-fade-in" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Loading Colora...</div>
        </div>
      </div>
    );
  }

  const handleMatch = async (hex: string) => {
    setIsMatching(true);
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hex })
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setMatches(data);
      } else {
        setMatches([]);
        console.error('Match API returned non-array:', data);
      }
      setHasMatched(true);
      
      // Trigger success animation if there's a strong match
      if (Array.isArray(data) && data.length > 0 && data[0].matchPercentage > 90) {
        if (typeof window !== 'undefined') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#7d6e5d', '#a69080', '#f7f3ed']
          });
        }
      }
    } catch (err) {
      console.error('Match error:', err);
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        
        <main style={{ flex: 1, padding: '3rem', backgroundColor: 'var(--bg-primary)', overflowY: 'auto' }}>
          <div className="container" style={{ maxWidth: '1050px' }}>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Boutique</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                Analyze your fabric samples with our AI engine and find the closest match in our premium inventory.
              </p>
            </motion.div>

            <UploadSection onMatch={handleMatch} isMatching={isMatching} />

            <AnimatePresence>
              {hasMatched && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginBottom: '2rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--bg-secondary)'
                  }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Match Results</h2>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Found {matches.length} matches
                    </span>
                  </div>

                  {matches.length > 0 ? (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                      gap: '2rem',
                      paddingBottom: '4rem'
                    }}>
                      {matches.map((match, index) => (
                        <ResultCard key={match._id} fabric={match} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="card glass" style={{ padding: '4rem', textAlign: 'center' }}>
                      <p style={{ color: 'var(--text-secondary)' }}>No close matches found. Try a different sample or color.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <footer style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        backgroundColor: 'var(--white)', 
        borderTop: '1px solid var(--bg-secondary)',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        marginTop: 'auto'
      }}>
        &copy; 2026 Colora – Premium Fabric Matcher. All rights reserved.
      </footer>
    </div>
  );
}
