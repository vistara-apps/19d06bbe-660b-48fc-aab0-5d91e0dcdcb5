export interface User {
  userId: string;
  farcasterId?: string;
  ethAddress?: string;
  dnaDataUrl?: string;
  timestamp: string;
}

export interface Prediction {
  predictionId: string;
  userId: string;
  traitName: string;
  geneticMarker: string;
  predictionText: string;
  confidenceScore: number;
  timestamp: string;
  isPaid: boolean;
}

export interface SNPResult {
  marker: string;
  trait: {
    trait: string;
    description: string;
  };
}

export interface PaymentResult {
  paymentId: string;
  status: 'pending' | 'completed' | 'failed';
  amount: string;
  currency: 'gem' | 'usdc';
  walletAddress: string;
  predictionId: string;
  transactionHash?: string;
  timestamp: string;
}
