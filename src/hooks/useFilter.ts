import { useLocation } from 'react-router-dom';
import { Person } from '../types';
import { getFullGender } from '../utils/common';
import { FilterType, FilterTypeShort } from './useGender';

export type SortFilterType = 'name' | 'sex' | 'born' | 'died';

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

  const getSort = () => {
    const searchParams = new URLSearchParams(location.search);

    return searchParams.get('sort') ?? '';
  };

  const getOrder = () => {
    const searchParams = new URLSearchParams(location.search);

    return searchParams.get('order') ?? '';
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

    const validatedType
      = type
      || getFullGender((searchParams.get('sex') ?? 'all') as FilterTypeShort);

    const options = {
      All: array,
      Male: array.filter((person) => person.sex === 'm'),
      Female: array.filter((person) => person.sex === 'f'),
    };

    return options[validatedType];
  };

  const sortBySort = (
    array: Person[], sortType?: SortFilterType, order?: boolean,
  ) => {
    const validatedType = (sortType || getSort()) as SortFilterType;

    if (!validatedType) {
      return array;
    }

    const validatedOrder = (order || getOrder() === 'desc') as boolean;

    // console.log('type:', validatedType, 'order:', validatedOrder);

    const options = {
      name: () => array.sort((a, b) => (
        validatedOrder
          ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
      )),
      sex: () => array.sort((a, b) => (
        validatedOrder
          ? b.sex.localeCompare(a.sex) : a.sex.localeCompare(b.sex)
      )),
      born: () => array.sort((a, b) => (
        validatedOrder ? b.born - a.born : a.born - b.born)),
      died: () => array.sort((a, b) => (
        validatedOrder ? b.died - a.died : a.died - b.died)),
    };

    return options?.[validatedType]?.() ?? array;
  };

  const getFilteredPeople = (
    array: Person[],
    options?: {
      type?: FilterType;
      centuries?: string[];
      query?: string;
      sortType?: SortFilterType;
      order?: boolean;
    },
  ) => {
    const filteredByGender = filterByGender(array, options?.type);
    const filtereByQuery = filterByQuery(filteredByGender, options?.query);

    const filteredByCenturies = filterByCenturies(
      filtereByQuery,
      options?.centuries,
    );

    let filteredBySort = filteredByCenturies;

    if (Object.values(options ?? {}).some((value) => value)) {
      // console.log(Object.values(options ?? {}));

      filteredBySort = sortBySort(
        filteredByCenturies,
        options?.sortType,
        options?.order,
      );
    }

    return filteredBySort;
  };

  return {
    filterByQuery,
    filterByCenturies,
    getCenturies,
    filterByGender,
    getFilteredPeople,
    getSort,
    getOrder,
  };
};
