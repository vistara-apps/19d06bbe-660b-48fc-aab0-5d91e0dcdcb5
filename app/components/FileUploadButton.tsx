'use client';

import { useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface FileUploadButtonProps {
  onFileUpload: (file: File) => void;
  isDisabled?: boolean;
  variant?: 'default';
}

export function FileUploadButton({ onFileUpload, isDisabled = false, variant = 'default' }: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && (file.name.endsWith('.fasta') || file.name.endsWith('.fa') || file.type === 'text/plain')) {
      onFileUpload(file);
    } else {
      alert('Please upload a valid FASTA file (.fasta, .fa, or .txt)');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          isDragging 
            ? 'border-purple-400 bg-purple-400/10' 
            : 'border-purple-300/50 hover:border-purple-400'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isDisabled && fileInputRef.current?.click()}
      >
        <FileText className="w-8 h-8 text-purple-300 mx-auto mb-2" />
        <p className="text-purple-200 text-sm mb-1">
          {isDragging ? 'Drop your FASTA file here' : 'Upload FASTA Files'}
        </p>
        <p className="text-purple-300 text-xs">
          Drag & drop or click to select (.fasta, .fa, .txt)
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".fasta,.fa,.txt"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
        disabled={isDisabled}
      />

      {/* Upload Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isDisabled}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
      >
        <Upload className="w-4 h-4 mr-2" />
        Add Dataset
      </button>
    </div>
  );
}
