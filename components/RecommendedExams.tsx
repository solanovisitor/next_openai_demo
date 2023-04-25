// components/RecommendedExams.tsx
import React from 'react';

interface RecommendedExamsProps {
  exams: string[];
}

const RecommendedExams: React.FC<RecommendedExamsProps> = ({ exams }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Recommended Exams</h2>
      <ul className="mt-4 space-y-2">
        {exams.map((exam, index) => (
          <li key={index} className="text-sm">
            - {exam}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedExams;
