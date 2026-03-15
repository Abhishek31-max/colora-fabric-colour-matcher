"use client";
import Link from 'next/link';
import React from 'react';
import { Palette } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Boutique', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
  ];

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
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              style={{ 
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)', 
                textDecoration: 'none', 
                fontWeight: isActive ? 600 : 500,
                transition: 'color 0.2s ease',
                position: 'relative'
              }}
              className="nav-link"
            >
              {link.name}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--accent-primary)',
                  borderRadius: '2px'
                }} />
              )}
            </Link>
          );
        })}
      </nav>
      <style jsx>{`
        .nav-link:hover {
          color: var(--accent-primary) !important;
        }
      `}</style>
    </header>
  );
};

export default Header;
