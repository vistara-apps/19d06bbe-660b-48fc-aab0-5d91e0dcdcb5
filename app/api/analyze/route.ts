import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

// Mock SNP dictionary for demonstration
const SNP_TRAITS = {
  'rs1042073': {
    trait: 'Hair Loss Resistance',
    description: 'Associated with hair follicle strength and male pattern baldness resistance'
  },
  'rs1815739': {
    trait: 'Athletic Performance',
    description: 'Related to muscle fiber composition and endurance capabilities'
  },
  'rs762551': {
    trait: 'Caffeine Sensitivity',
    description: 'Affects caffeine metabolism speed'
  },
  'rs53576': {
    trait: 'Social Behavior',
    description: 'Associated with empathy and social bonding'
  },
  'rs1801282': {
    trait: 'Metabolism',
    description: 'Related to fat storage and metabolic rate'
  }
};

function analyzeFASTA(fastaContent: string) {
  // Mock SNP analysis - in reality, this would involve complex genomics processing
  const foundSNPs = Object.keys(SNP_TRAITS).slice(0, Math.floor(Math.random() * 3) + 1);
  
  return foundSNPs.map(snp => ({
    marker: snp,
    trait: SNP_TRAITS[snp as keyof typeof SNP_TRAITS]
  }));
}

export async function POST(request: NextRequest) {
  try {
    const { fastaContent, userId } = await request.json();

    if (!fastaContent) {
      return NextResponse.json({ error: 'FASTA content is required' }, { status: 400 });
    }

    // Analyze FASTA for SNPs
    const snpResults = analyzeFASTA(fastaContent);

    if (snpResults.length === 0) {
      return NextResponse.json({ 
        predictions: [],
        message: 'No significant genetic markers found in the provided sequence'
      });
    }

    // Generate AI predictions for each SNP
    const predictions = await Promise.all(
      snpResults.map(async (result) => {
        const prompt = `Based on the genetic marker ${result.marker} associated with ${result.trait.trait}, create a fun, engaging prediction about this person's trait. Make it:
        1. Scientifically informed but accessible
        2. Positive and encouraging
        3. About 50-80 words
        4. Include a confidence percentage (70-95%)
        
        Context: ${result.trait.description}
        
        Return only the prediction text, no extra formatting.`;

        const completion = await openai.chat.completions.create({
          model: 'google/gemini-2.0-flash-001',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.7,
        });

        const predictionText = completion.choices[0]?.message?.content || 'Prediction unavailable';
        const confidenceMatch = predictionText.match(/(\d+)%/);
        const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) / 100 : Math.random() * 0.25 + 0.7;

        return {
          predictionId: `${result.marker}_${Date.now()}`,
          userId: userId || 'anonymous',
          traitName: result.trait.trait,
          geneticMarker: result.marker,
          predictionText: predictionText.replace(/\d+%/g, '').trim(),
          confidenceScore: confidence,
          timestamp: new Date().toISOString(),
          isPaid: false
        };
      })
    );

    return NextResponse.json({ predictions });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze genetic data' },
      { status: 500 }
    );
  }
}
