'use client';

import { useState } from 'react';
import { Lock, Unlock, TrendingUp } from 'lucide-react';

interface TraitCardProps {
  traitName: string;
  geneticMarker: string;
  predictionText: string;
  confidenceScore: number;
  isPaid: boolean;
  variant?: 'default' | 'loading' | 'error' | 'locked';
}

export function TraitCard({
  traitName,
  geneticMarker,
  predictionText,
  confidenceScore,
  isPaid,
  variant = 'default'
}: TraitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'loading':
        return 'glass-card animate-pulse';
      case 'error':
        return 'glass-card border-red-500/30 bg-red-500/10';
      case 'locked':
        return 'glass-card border-yellow-500/30 bg-yellow-500/5';
      default:
        return 'glass-card';
    }
  };

  const formatConfidence = (score: number) => {
    return `${(score * 100).toFixed(1)}%`;
  };

  if (variant === 'loading') {
    return (
      <div className={`${getVariantClasses()} rounded-lg p-4`}>
        <div className="animate-pulse">
          <div className="h-4 bg-purple-300/30 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-purple-300/20 rounded w-1/2 mb-3"></div>
          <div className="h-2 bg-purple-300/20 rounded w-full mb-2"></div>
          <div className="h-2 bg-purple-300/20 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getVariantClasses()} rounded-lg p-4 transition-all duration-200`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            {isPaid ? (
              <Unlock className="w-4 h-4 text-green-400 mr-2" />
            ) : (
              <Lock className="w-4 h-4 text-yellow-400 mr-2" />
            )}
            <h4 className="font-semibold text-white">{traitName}</h4>
          </div>
          <p className="text-xs text-purple-300">Marker: {geneticMarker}</p>
        </div>
        
        {/* Confidence Score */}
        <div className="flex items-center bg-purple-500/20 rounded-full px-2 py-1">
          <TrendingUp className="w-3 h-3 text-purple-300 mr-1" />
          <span className="text-xs text-purple-200">{formatConfidence(confidenceScore)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {isPaid ? (
          <>
            <p className="text-sm text-purple-100 leading-relaxed">
              {isExpanded ? predictionText : `${predictionText.substring(0, 120)}...`}
            </p>
            {predictionText.length > 120 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-purple-300 hover:text-white transition-colors"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </>
        ) : (
          <div className="space-y-2">
            <div className="h-3 bg-purple-300/20 rounded w-full"></div>
            <div className="h-3 bg-purple-300/20 rounded w-4/5"></div>
            <div className="h-3 bg-purple-300/20 rounded w-3/5"></div>
            <p className="text-xs text-yellow-400 mt-2 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Unlock prediction with payment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
