"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle, AlertCircle } from 'lucide-react';

interface ResultCardProps {
  fabric: {
    name: string;
    hex: string;
    image_url: string;
    price: number;
    stock: number;
    description: string;
    matchPercentage: number;
  };
  index: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ fabric, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img 
          src={fabric.image_url} 
          alt={fabric.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(4px)',
          padding: '6px 12px',
          borderRadius: '50px',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--accent-primary)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {fabric.matchPercentage}% Match
        </div>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{fabric.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: fabric.hex, border: '1px solid rgba(0,0,0,0.1)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{fabric.hex}</span>
            </div>
          </div>
          <div style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>${fabric.price}</div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {fabric.description}
        </p>

        <div className="progress-container" style={{ marginBottom: '1.5rem' }}>
          <motion.div 
            className="progress-bar" 
            initial={{ width: 0 }}
            animate={{ width: `${fabric.matchPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
            {fabric.stock > 0 ? (
              <>
                <CheckCircle size={14} color="var(--success)" />
                <span style={{ color: 'var(--success)', fontWeight: 500 }}>In stock ({fabric.stock})</span>
              </>
            ) : (
              <>
                <AlertCircle size={14} color="var(--error)" />
                <span style={{ color: 'var(--error)', fontWeight: 500 }}>Out of stock</span>
              </>
            )}
          </div>
          <button style={{
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
