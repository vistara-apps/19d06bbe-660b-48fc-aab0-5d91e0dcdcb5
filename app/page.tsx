'use client';

import { useState } from 'react';
import { FrameWrapper } from './components/FrameWrapper';
import { FileUploadButton } from './components/FileUploadButton';
import { TraitCard } from './components/TraitCard';
import { PaymentButton } from './components/PaymentButton';
import { ShareButton } from './components/ShareButton';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { DNA, Sparkles, TrendingUp } from 'lucide-react';

interface Prediction {
  traitName: string;
  geneticMarker: string;
  predictionText: string;
  confidenceScore: number;
  isPaid: boolean;
}

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState<'upload' | 'scan' | 'predict' | 'share'>('upload');

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentStep('scan');
  };

  const handleScanDNA = async () => {
    if (!uploadedFile) return;
    
    setIsScanning(true);
    
    // Simulate DNA scanning and SNP analysis
    setTimeout(() => {
      const mockPredictions: Prediction[] = [
        {
          traitName: "Hair Loss Resistance",
          geneticMarker: "rs1042073",
          predictionText: "Based on your genetic markers, you have a 75% chance of maintaining thick hair throughout your life. Your follicles are genetically programmed for resilience!",
          confidenceScore: 0.75,
          isPaid: false
        },
        {
          traitName: "Athletic Endurance",
          geneticMarker: "rs1815739",
          predictionText: "Your DNA suggests exceptional endurance capabilities. You carry genetic variants associated with elite marathon runners and cyclists.",
          confidenceScore: 0.82,
          isPaid: false
        },
        {
          traitName: "Caffeine Sensitivity",
          geneticMarker: "rs762551",
          predictionText: "You're a slow caffeine metabolizer - that evening coffee might keep you up longer than most people. Your body processes caffeine 40% slower than average.",
          confidenceScore: 0.91,
          isPaid: false
        }
      ];
      
      setPredictions(mockPredictions);
      setIsScanning(false);
      setCurrentStep('predict');
    }, 3000);
  };

  const handlePayment = async (predictionIndex: number) => {
    // Simulate payment processing
    setTimeout(() => {
      setPredictions(prev => 
        prev.map((p, i) => i === predictionIndex ? { ...p, isPaid: true } : p)
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
      <FrameWrapper>
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <DNA className="w-12 h-12 text-purple-300 mr-3" />
              <h1 className="text-4xl font-bold gradient-text">GeneVibes</h1>
            </div>
            <p className="text-lg text-purple-200 mb-6">
              Scan your records, vibe the future you and post the finds to your ENS lifect & your Farcaster vibe.
            </p>
            
            {/* Wallet Connection */}
            <div className="mb-6">
              <ConnectWallet className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Upload FASTA Files</h3>
                <p className="text-purple-200 text-sm mb-4">
                  Upload files to unlock your FASTA data and AI-powered trait mapping for seamless experience.
                </p>
                <FileUploadButton 
                  onFileUpload={handleFileUpload}
                  isDisabled={isScanning}
                />
                {uploadedFile && (
                  <div className="mt-4 p-3 glass-card rounded-md">
                    <p className="text-green-300 text-sm">✓ {uploadedFile.name} uploaded</p>
                  </div>
                )}
                
                {/* Scan Button */}
                {uploadedFile && currentStep === 'scan' && (
                  <div className="mt-4">
                    <button
                      onClick={handleScanDNA}
                      disabled={isScanning}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                    >
                      {isScanning ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Scanning DNA...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Scan On
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              {/* SNP Analysis Card */}
              {currentStep === 'scan' && isScanning && (
                <div className="glass-card rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">SNP Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="animate-pulse-slow w-4 h-4 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-purple-200">Scanning genetic markers...</span>
                    </div>
                    <div className="w-full bg-purple-900/30 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full animate-pulse w-3/4"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Predictions */}
              {predictions.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      SNP Trait Predictions
                    </h3>
                    <button className="text-purple-300 hover:text-white text-sm">
                      ✕
                    </button>
                  </div>
                  
                  {predictions.map((prediction, index) => (
                    <div key={index} className="space-y-3">
                      <TraitCard
                        variant={prediction.isPaid ? 'default' : 'locked'}
                        traitName={prediction.traitName}
                        geneticMarker={prediction.geneticMarker}
                        predictionText={prediction.predictionText}
                        confidenceScore={prediction.confidenceScore}
                        isPaid={prediction.isPaid}
                      />
                      
                      {!prediction.isPaid && (
                        <PaymentButton
                          variant="gem"
                          amount="1"
                          onPayment={() => handlePayment(index)}
                        />
                      )}
                      
                      {prediction.isPaid && (
                        <ShareButton
                          traitName={prediction.traitName}
                          predictionText={prediction.predictionText}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {predictions.length === 0 && currentStep === 'upload' && (
                <div className="glass-card rounded-lg p-12 text-center">
                  <DNA className="w-16 h-16 text-purple-300 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Discover Your Traits?</h3>
                  <p className="text-purple-200">Upload your FASTA file to get started with AI-powered genetic insights.</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Footer */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div className="glass-card rounded-lg p-4">
              <div className="text-2xl font-bold text-white">AI POWERED</div>
              <div className="text-purple-300 text-sm">OpenAI powered trait predictions</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="text-2xl font-bold text-white">🧬 SNP Based</div>
              <div className="text-purple-300 text-sm">Real genetic marker analysis</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="text-2xl font-bold text-white">💎 Micro-pay</div>
              <div className="text-purple-300 text-sm">Pay per prediction model</div>
            </div>
          </div>
        </div>
      </FrameWrapper>
    </div>
  );
}
