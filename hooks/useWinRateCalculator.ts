
import { useState, useCallback, useEffect } from 'react';

export const useWinRateCalculator = () => {
  const [totalMatches, setTotalMatches] = useState('');
  const [currentWinRate, setCurrentWinRate] = useState('');
  const [targetWinRate, setTargetWinRate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [winStreak, setWinStreak] = useState<number>(() => {
    const savedStreak = localStorage.getItem('winStreak');
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('winStreak', winStreak.toString());
  }, [winStreak]);

  const incrementStreak = useCallback(() => {
    setWinStreak(prev => prev + 1);
  }, []);

  const resetStreak = useCallback(() => {
    setWinStreak(0);
  }, []);

  const calculate = useCallback(() => {
    setError(null);
    setResult(null);

    const tm = parseInt(totalMatches, 10);
    const cwr = parseFloat(currentWinRate);
    const twr = parseFloat(targetWinRate);

    if (isNaN(tm) || isNaN(cwr) || isNaN(twr)) {
      setError('Please fill in all fields with valid numbers.');
      return;
    }

    if (tm <= 0 || cwr < 0 || twr < 0) {
      setError('Values must be positive numbers.');
      return;
    }

    if (cwr > 100 || twr > 100) {
        setError('Win rates cannot exceed 100%.');
        return;
    }

    if (twr <= cwr) {
      setError('Target win rate must be higher than your current win rate.');
      return;
    }

    const currentWinRateDecimal = cwr / 100;
    const targetWinRateDecimal = twr / 100;

    // Formula: x = (TM * (TWR - CWR)) / (1 - TWR)
    const gamesNeeded = (tm * (targetWinRateDecimal - currentWinRateDecimal)) / (1 - targetWinRateDecimal);
    
    setResult(Math.ceil(gamesNeeded));
  }, [totalMatches, currentWinRate, targetWinRate]);

  const reset = useCallback(() => {
    setTotalMatches('');
    setCurrentWinRate('');
    setTargetWinRate('');
    setResult(null);
    setError(null);
  }, []);

  return {
    totalMatches,
    setTotalMatches,
    currentWinRate,
    setCurrentWinRate,
    targetWinRate,
    setTargetWinRate,
    result,
    error,
    calculate,
    reset,
    winStreak,
    incrementStreak,
    resetStreak,
  };
};
