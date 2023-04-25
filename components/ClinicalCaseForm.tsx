// components/ClinicalCaseForm.tsx
import React, { useState } from 'react';

interface ClinicalCaseFormProps {
  onSubmit: (caseText: string) => void;
}

const ClinicalCaseForm: React.FC<ClinicalCaseFormProps> = ({ onSubmit }) => {
  const [caseText, setCaseText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(caseText);
    setCaseText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="caseText" className="block text-sm font-medium text-gray-700">
          Clinical Case Description
        </label>
        <div className="mt-1">
          <textarea
            id="caseText"
            name="caseText"
            rows={4}
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Describe the clinical case here..."
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Get Recommendations
      </button>
    </form>
  );
};

export default ClinicalCaseForm;
