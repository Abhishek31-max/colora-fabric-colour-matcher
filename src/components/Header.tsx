import React from 'react';
import { Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header style={{
      padding: '1.5rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--bg-secondary)',
      backgroundColor: 'var(--white)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          backgroundColor: 'var(--accent-primary)',
          color: 'var(--white)',
          padding: '8px',
          borderRadius: '10px',
          display: 'flex'
        }}>
          <Palette size={24} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Colora</h1>
      </div>
      
      <nav style={{ display: 'flex', gap: '2rem' }}>
        <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Boutique</a>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Collections</a>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>About</a>
      </nav>
    </header>
  );
};

export default Header;
