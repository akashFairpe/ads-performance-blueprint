import React, { useState, useEffect } from 'react';
import LogoUploader from './LogoUploader';

interface BrandingSystemProps {
  onBrandingChange: (branding: BrandingConfig) => void;
  initialBranding?: BrandingConfig;
  isVisible?: boolean;
}

export interface BrandingConfig {
  logo: string;
  primaryColor: string;
  fontFamily: string;
  companyName: string;
  footerText: string;
}

const BrandingSystem: React.FC<BrandingSystemProps> = ({ 
  onBrandingChange, 
  initialBranding,
  isVisible = true 
}) => {
  const [branding, setBranding] = useState<BrandingConfig>(
    initialBranding || {
      logo: '',
      primaryColor: '#3B82F6',
      fontFamily: 'Inter',
      companyName: 'Your Company',
      footerText: 'Powered by AdSpyder'
    }
  );

  const [isExpanded, setIsExpanded] = useState(false);

  const availableFonts = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Montserrat', label: 'Montserrat' }
  ];

  useEffect(() => {
    onBrandingChange(branding);
    
    // Apply font family to document
    document.documentElement.style.setProperty('--font-family-brand', branding.fontFamily);
    
    // Apply primary color as CSS variable
    const hslColor = hexToHsl(branding.primaryColor);
    document.documentElement.style.setProperty('--brand-primary', hslColor);
  }, [branding, onBrandingChange]);

  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  if (!isVisible) return null;

  return (
    <div className="branding-system no-print" style={{
      background: 'var(--background-secondary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--border-radius-card)',
      padding: 'var(--spacing-md)',
      marginBottom: 'var(--section-spacing)'
    }}>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 style={{ 
          fontSize: 'var(--font-body-lg)', 
          fontWeight: '600', 
          color: 'var(--text-primary)',
          margin: 0
        }}>
          Brand Settings
        </h3>
        <span style={{ 
          fontSize: 'var(--font-body-md)', 
          color: 'var(--text-secondary)' 
        }}>
          {isExpanded ? '▼' : '▶'}
        </span>
      </div>

      {isExpanded && (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 'var(--spacing-md)' 
          }}>
            
            {/* Logo Upload */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 'var(--font-small)', 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Company Logo
              </label>
              <LogoUploader 
                onLogoUpload={(logo) => setBranding({...branding, logo})}
                currentLogo={branding.logo}
              />
            </div>

            {/* Company Name */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 'var(--font-small)', 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Company Name
              </label>
              <input
                type="text"
                value={branding.companyName}
                onChange={(e) => setBranding({...branding, companyName: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--border-radius-button)',
                  fontSize: 'var(--font-body-md)',
                  background: 'var(--background)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Font Family */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 'var(--font-small)', 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Brand Font
              </label>
              <select
                value={branding.fontFamily}
                onChange={(e) => setBranding({...branding, fontFamily: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--border-radius-button)',
                  fontSize: 'var(--font-body-md)',
                  background: 'var(--background)',
                  color: 'var(--text-primary)'
                }}
              >
                {availableFonts.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Primary Color */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 'var(--font-small)', 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Primary Color
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                  style={{
                    width: '40px',
                    height: '32px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--border-radius-button)',
                    cursor: 'pointer'
                  }}
                />
                <input
                  type="text"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--border-radius-button)',
                    fontSize: 'var(--font-body-md)',
                    background: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            {/* Footer Text */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ 
                display: 'block', 
                fontSize: 'var(--font-small)', 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Footer Text
              </label>
              <input
                type="text"
                value={branding.footerText}
                onChange={(e) => setBranding({...branding, footerText: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--border-radius-button)',
                  fontSize: 'var(--font-body-md)',
                  background: 'var(--background)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandingSystem;