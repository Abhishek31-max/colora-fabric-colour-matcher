"use client";
import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock } from 'lucide-react';

interface Fabric {
  _id: string;
  name: string;
  hex: string;
  image_url: string;
  price: number;
}

const Sidebar: React.FC = () => {
  const [trending, setTrending] = useState<Fabric[]>([]);

  useEffect(() => {
    fetch('/api/fabrics')
      .then(res => res.json())
      .then(data => setTrending(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <aside style={{
      width: '320px',
      padding: '2rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid rgba(0,0,0,0.05)',
      height: 'calc(100vh - 80px)',
      overflowY: 'auto'
    }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
          <TrendingUp size={20} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Trending Fabrics</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {trending.slice(0, 4).map(item => (
            <div key={item._id} className="card" style={{ padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                backgroundColor: item.hex,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>${item.price} / yd</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <Clock size={20} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Newly Added</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
           {trending.slice(4, 7).map(item => (
            <div key={item._id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: item.hex }} />
               <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.name}</span>
            </div>
           ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
