// eslint-disable-next-line import/no-cycle
import { FilterType, FilterTypeShort } from '../hooks/useGender';

export const getFullGender = (gender: FilterTypeShort): FilterType => {
  const type: Record<string, any> = {
    f: 'Female',
    m: 'Male',
    all: 'All',
  };

  return type?.[gender] ?? 'All';
};
