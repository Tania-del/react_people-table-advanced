import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type FilterType = 'All' | 'Male' | 'Female';

export const useGender = (onGenderChange?: (type: FilterType) => void) => {
  const [gender, setGender] = useState<FilterType>('All');

  const handleGender = (type: FilterType) => {
    if (gender !== type) {
      setGender(type);
      onGenderChange?.(type);
    }
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const sex = searchParams.get('sex') || '';

    const type: Record<string, any> = {
      f: 'Female',
      m: 'Male',
    };

    handleGender(type?.[sex] ?? 'All');
  }, []);


  return {
    gender, handleGender,
  };
};
