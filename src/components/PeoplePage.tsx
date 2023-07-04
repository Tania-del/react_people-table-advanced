/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useFilter } from '../hooks/useFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorWrong, setErrorWrong] = useState<string>('');
  const [queryError, setQueryError] = useState<boolean>(false);
  const { getFilteredPeople } = useFilter();

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://mate-academy.github.io/react_people-table/api/people.json',
      );

      const data = await response.json();

      setTimeout(() => {
        setAllPeople(data);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setErrorWrong('Something went wrong');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    if (allPeople.length) {
      setPeople(getFilteredPeople(allPeople));
    }
  }, [allPeople]);

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              isLoading={isLoading}
              people={people}
              allPeople={allPeople}
              setPeople={setPeople}
              setQueryError={setQueryError}
            />
          </div>

          <div className="column">
            {!isLoading && (
              <div className="box table-container">
                {errorWrong && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {people.length > 0 && <PeopleTable people={people} />}

                {!queryError && !errorWrong && people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {queryError && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
