import { useLocation } from 'react-router-dom';
import { Person } from '../types';
import { getFullGender } from '../utils/common';
import { FilterType, FilterTypeShort } from './useGender';

export const useFilter = () => {
  const location = useLocation();

  const getQuery = () => {
    const searchParams = new URLSearchParams(location.search);

    return searchParams.get('query') ?? '';
  };

  const getCenturies = (century?: string) => {
    const searchParams = new URLSearchParams(location.search);
    let centuries = searchParams.getAll('centuries');

    if (!century) {
      return centuries;
    }

    if (century === 'all') {
      centuries = [];
    } else if (centuries.includes(century)) {
      centuries = centuries.filter((item) => item !== century);
    } else {
      centuries = [...centuries, century];
    }

    return centuries;
  };

  const filterByQuery = (arr: Person[], query = '') => arr.filter(
    (person) => person.name.toLowerCase().includes(query || getQuery() || ''),
  );

  const filterByCenturies = (arr: Person[], centuries?: string[]) => {
    const validatedCenturies = centuries || getCenturies() || [];

    if (!validatedCenturies.length) {
      return arr;
    }

    return arr.filter(({ born }) => validatedCenturies.includes(
      String(Math.ceil(born / 100)),
    ));
  };

  const filterByGender = (array: Person[] = [], type?: FilterType) => {
    const searchParams = new URLSearchParams(location.search);

    const validatedType = type
    || getFullGender((searchParams.get('sex') ?? 'all') as FilterTypeShort);

    const options = {
      All: array,
      Male: array.filter((person) => person.sex === 'm'),
      Female: array.filter((person) => person.sex === 'f'),
    };

    return options[validatedType];
  };

  const getFilteredPeople = (
    array: Person[],
    options?: { type?: FilterType; centuries?: string[]; query?: string },
  ) => {
    const filteredByGender = filterByGender(array, options?.type);
    const filtereByQuery = filterByQuery(filteredByGender, options?.query);

    const filteredByCenturies = filterByCenturies(
      filtereByQuery,
      options?.centuries,
    );

    return filteredByCenturies;
  };

  return {
    filterByQuery,
    filterByCenturies,
    getCenturies,
    filterByGender,
    getFilteredPeople,
  };
};
