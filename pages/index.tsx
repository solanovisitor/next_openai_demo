// pages/index.tsx
import Head from 'next/head';
import ClinicalCaseForm from '../components/ClinicalCaseForm';
import RecommendedExams from '../components/RecommendedExams';
import { useState } from 'react';

export default function Home() {
  const [recommendedExams, setRecommendedExams] = useState<string[]>([]);

  const handleSubmit = async (caseText: string) => {
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseText }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendedExams(data.recommendedExams);
      } else {
        console.error('Error fetching recommendations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
        <title>Clinical Case Recommendation App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-8">
        <h1 className="text-3xl font-bold">Clinical Case Recommendation App</h1>
        <ClinicalCaseForm onSubmit={handleSubmit} />
        <RecommendedExams exams={recommendedExams} />
      </main>
    </div>
  );
}