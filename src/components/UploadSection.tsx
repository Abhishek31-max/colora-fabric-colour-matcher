"use client";
import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Check } from 'lucide-react';
import { extractDominantColor } from '@/lib/color-utils';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadSectionProps {
  onMatch: (hex: string) => void;
  isMatching: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onMatch, isMatching }) => {
  const [image, setImage] = useState<string | null>(null);
  const [extractedColor, setExtractedColor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        setImage(result);
        try {
          const color = await extractDominantColor(result);
          setExtractedColor(color);
        } catch (err) {
          console.error('Extraction error:', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMatch = () => {
    if (extractedColor) {
      onMatch(extractedColor);
    }
  };

  const clear = () => {
    setImage(null);
    setExtractedColor(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section style={{
      maxWidth: '800px',
      margin: '0 auto 4rem',
      textAlign: 'center'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="card glass" 
        style={{
          padding: '4rem 3rem',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem'
        }}
      >
        {!image ? (
          <>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '30px',
                backgroundColor: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                marginBottom: '0.5rem',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <Upload size={40} />
            </motion.div>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', fontWeight: 800 }}>Upload Fabric Sample</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                Drop an image here or click to upload. <br/>
                Our AI will extract the perfect match.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary" 
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Upload size={18} /> Upload Image
              </button>
              <button 
                className="btn-primary" 
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Camera size={18} /> Take Photo
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </>
        ) : (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={image} 
                alt="Uploaded sample" 
                style={{
                  maxWidth: '300px',
                  maxHeight: '300px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  boxShadow: 'var(--shadow-md)'
                }} 
              />
              <button 
                onClick={clear}
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  padding: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--white)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <AnimatePresence>
              {extractedColor && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 2rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: extractedColor,
                    border: '3px solid var(--white)',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                  }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Extracted Colour</div>
                    <div style={{ fontWeight: 600 }}>{extractedColor.toUpperCase()}</div>
                  </div>
                  <button 
                    disabled={isMatching}
                    onClick={handleMatch}
                    className="btn-primary" 
                    style={{ marginLeft: '1rem', opacity: isMatching ? 0.7 : 1 }}
                  >
                    {isMatching ? 'Matching...' : 'Find Matches'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default UploadSection;
