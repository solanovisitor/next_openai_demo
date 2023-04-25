// pages/api/recommendations.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai-api';
import { PineconeClient } from '@pinecone-database/pinecone';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { caseText } = req.body;

      // Use OpenAI API to generate embeddings for the caseText
      const embeddingsResponse = await openai.embeddings({
        engine: 'text-embedding-ada-002',
        input: [caseText],
      });

      const vectorRepresentation = embeddingsResponse.data[0];

      // Initialize Pinecone client
      const pinecone = new PineconeClient();
      await pinecone.init({
        environment: 'us-east1-gcp', // Replace with your Pinecone environment
        apiKey: process.env.PINECONE_API_KEY,
      });

      // Use Pinecone to find the nearest neighbors (similar cases)
      const index = pinecone.Index('clinical-cases');
      const queryRequest = {
        vector: vectorRepresentation,
        topK: 5,
        includeValues: true,
        includeMetadata: true,
      };
      const queryResponse = await index.query({ queryRequest });

      // Extract recommended exams from the nearest neighbors
      const recommendedExams = queryResponse.results.map((result) => result.metadata.recommendedExams);

      res.status(200).json({ recommendedExams });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;