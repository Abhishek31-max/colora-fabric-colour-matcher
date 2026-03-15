"use client";
import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Fabric {
  _id: string;
  name: string;
  hex: string;
  image_url: string;
  price: number;
}

const Sidebar: React.FC = () => {
  const [trending, setTrending] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setError("Request timed out. Note: DB connections may take longer on first load. Ensure your IP (0.0.0.0/0) is whitelisted in MongoDB Atlas.");
        setLoading(false);
      }
    }, 30000);

    fetch('/api/fabrics')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Sidebar data received:', data);
        if (Array.isArray(data)) {
          setTrending(data);
        } else if (data && data.error) {
          setError(data.error);
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
        clearTimeout(timer);
      })
      .catch(err => {
        console.error('Sidebar fetch error:', err);
        setError("Failed to load trending fabrics.");
        setLoading(false);
        clearTimeout(timer);
      });
  }, []);

  return (
    <aside style={{
      width: '320px',
      padding: '2rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid rgba(0,0,0,0.05)',
      height: 'calc(100vh - 80px)',
      overflowY: 'auto',
      position: 'sticky',
      top: '80px'
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
          <TrendingUp size={20} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Trending Fabrics</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} style={{ height: '80px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.05)', animation: 'pulse 1.5s infinite' }} />
            ))
          ) : error ? (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '1rem', textAlign: 'center', backgroundColor: 'rgba(255,0,0,0.03)', borderRadius: '8px' }}>
              {error}
            </div>
          ) : trending.length === 0 ? (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '1rem', textAlign: 'center' }}>
              No trending fabrics found.
            </div>
          ) : (
            trending.slice(0, 3).map(item => (
              <div key={item._id} className="card glass" style={{ padding: '10px', display: 'flex', gap: '12px', alignItems: 'center', border: 'none' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.hex }} />
                    {item.hex.toUpperCase()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <Clock size={20} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Newly Added</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!loading && !error && trending.length > 3 && trending.slice(3, 6).map(item => (
            <div key={item._id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '0.5rem', borderRadius: '8px', transition: 'background 0.2s ease' }} className="hover-target">
               <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: item.hex, flexShrink: 0, boxShadow: 'var(--shadow-sm)' }} />
               <div style={{ flex: 1 }}>
                 <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.name}</div>
                 <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>${item.price}/yd</div>
               </div>
               <ArrowRight size={14} style={{ color: 'var(--text-secondary)' }} />
            </div>
          ))}
          {!loading && !error && trending.length <= 3 && trending.length > 0 && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.7 }}>More items coming soon...</div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: 'var(--accent-primary)', borderRadius: 'var(--radius-md)', color: 'var(--white)' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--white)' }}>New Season Out!</h4>
        <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '1rem' }}>Check our latest spring collection for your next project.</p>
        <Link href="/collections" style={{ color: 'var(--white)', textDecoration: 'underline', fontSize: '0.85rem', fontWeight: 500 }}>
          View Collections
        </Link>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .hover-target:hover {
          background: rgba(0,0,0,0.03);
          cursor: pointer;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
