import Link from 'next/link';
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
      backgroundColor: 'var(--white)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          backgroundColor: 'var(--accent-primary)',
          color: 'var(--white)',
          padding: '8px',
          borderRadius: '10px',
          display: 'flex'
        }}>
          <Palette size={24} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Colora</h1>
      </Link>
      
      <nav style={{ display: 'flex', gap: '2rem' }}>
        <Link href="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Boutique
        </Link>
        <Link href="/collections" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>
          Collections
        </Link>
        <Link href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
