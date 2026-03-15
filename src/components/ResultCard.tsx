"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle, AlertCircle, Palette } from 'lucide-react';

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
  if (!fabric) return null;

  const matchPercentage = typeof fabric.matchPercentage === 'number' ? fabric.matchPercentage : 0;
  const price = typeof fabric.price === 'number' ? fabric.price : 0;
  const stock = typeof fabric.stock === 'number' ? fabric.stock : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ 
        position: 'relative', 
        height: '200px', 
        overflow: 'hidden',
        backgroundColor: fabric.hex || '#eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {fabric.image_url ? (
          <img 
            src={fabric.image_url} 
            alt={fabric.name || 'Fabric'} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <Palette size={48} style={{ opacity: 0.1 }} />
        )}
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
          {matchPercentage}% Match
        </div>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{fabric.name || 'Unknown Fabric'}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: fabric.hex || '#ccc', border: '1px solid rgba(0,0,0,0.1)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{fabric.hex || '#N/A'}</span>
            </div>
          </div>
          <div style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>${price}</div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {fabric.description || 'No description available.'}
        </p>

        <div className="progress-container" style={{ marginBottom: '1.5rem' }}>
          <motion.div 
            className="progress-bar" 
            initial={{ width: 0 }}
            animate={{ width: `${matchPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
            {stock > 0 ? (
              <>
                <CheckCircle size={14} color="var(--success)" />
                <span style={{ color: 'var(--success)', fontWeight: 500 }}>In stock ({stock})</span>
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
