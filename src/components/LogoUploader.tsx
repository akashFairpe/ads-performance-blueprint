import React, { useState, useRef } from 'react';

interface LogoUploaderProps {
  onLogoUpload: (logoUrl: string) => void;
  currentLogo?: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoUpload, currentLogo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onLogoUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div 
      className="company-logo-uploader" 
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      style={{ 
        width: '120px', 
        height: '40px', 
        background: currentLogo ? `url(${currentLogo}) center/contain no-repeat` : 'var(--background-secondary)', 
        border: `2px ${isDragging ? 'solid var(--accent-blue)' : 'dashed var(--border)'}`, 
        borderRadius: 'var(--border-radius-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--font-small)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      {!currentLogo && (
        <span>{isDragging ? 'Drop Logo' : 'Upload Logo'}</span>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default LogoUploader;