import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { getFullGender } from '../utils/common';

export type FilterType = 'All' | 'Male' | 'Female';
export type FilterTypeShort = 'f' | 'm' | 'all';

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
    const sex = (searchParams.get('sex') ?? 'all') as FilterTypeShort;

    handleGender(getFullGender(sex));
  }, []);

  return {
    gender, handleGender,
  };
};
