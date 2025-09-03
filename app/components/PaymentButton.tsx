'use client';

import { useState } from 'react';
import { Gem, DollarSign } from 'lucide-react';

interface PaymentButtonProps {
  variant: 'gem' | 'usdc';
  amount: string;
  onPayment: () => void;
}

export function PaymentButton({ variant, amount, onPayment }: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPayment();
      setIsProcessing(false);
    }, 1500);
  };

  const getIcon = () => {
    switch (variant) {
      case 'gem':
        return <Gem className="w-4 h-4 mr-2" />;
      case 'usdc':
        return <DollarSign className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (variant) {
      case 'gem':
        return `${amount} Gem`;
      case 'usdc':
        return `$${amount} USDC`;
      default:
        return 'Pay';
    }
  };

  const getClasses = () => {
    const base = "w-full font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center text-sm";
    
    switch (variant) {
      case 'gem':
        return `${base} bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white`;
      case 'usdc':
        return `${base} bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white`;
      default:
        return `${base} bg-gray-600 hover:bg-gray-700 text-white`;
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className={getClasses()}
    >
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </>
      ) : (
        <>
          {getIcon()}
          Unlock for {getLabel()}
        </>
      )}
    </button>
  );
}
