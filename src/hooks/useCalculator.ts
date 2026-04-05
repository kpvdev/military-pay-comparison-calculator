import { useState, useCallback } from 'react';
import type { CareerInput, PayBreakdown } from '../types/pay';
import { calculatePay } from '../utils/calculations';

const defaultCareer: CareerInput = {
  rank: '',
  yearsOfService: '',
  calendarYear: '2024',
  bahRate: 0,
  bahZip: '',
  bahLocationName: '',
  withDependents: false,
  sdapLevel: 'SD-0',
};

export function useCalculator() {
  const [career1, setCareer1] = useState<CareerInput>({ ...defaultCareer });
  const [career2, setCareer2] = useState<CareerInput>({ ...defaultCareer });
  const [result1, setResult1] = useState<PayBreakdown | null>(null);
  const [result2, setResult2] = useState<PayBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate1 = useCallback(() => {
    if (!career1.rank || !career1.yearsOfService) {
      setError('Please select a rank and years of service for Career 1.');
      return;
    }
    const result = calculatePay(career1);
    if (!result) {
      setError('No pay data available for this rank/YOS combination.');
      return;
    }
    setResult1(result);
    setError(null);
  }, [career1]);

  const calculate2 = useCallback(() => {
    if (!career2.rank || !career2.yearsOfService) {
      setError('Please select a rank and years of service for Career 2.');
      return;
    }
    const result = calculatePay(career2);
    if (!result) {
      setError('No pay data available for this rank/YOS combination.');
      return;
    }
    setResult2(result);
    setError(null);
  }, [career2]);

  const clear1 = useCallback(() => {
    setCareer1({ ...defaultCareer });
    setResult1(null);
  }, []);

  const clear2 = useCallback(() => {
    setCareer2({ ...defaultCareer });
    setResult2(null);
  }, []);

  const clearAll = useCallback(() => {
    clear1();
    clear2();
    setError(null);
  }, [clear1, clear2]);

  return {
    career1, setCareer1, result1, calculate1, clear1,
    career2, setCareer2, result2, calculate2, clear2,
    clearAll, error, setError,
  };
}
