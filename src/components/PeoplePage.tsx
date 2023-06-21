import { useEffect, useState } from "react";
import { PeopleFilters } from "./PeopleFilters";
import { PeopleTable } from "./PeopleTable";
import { Person } from "../types";
import { FilterType, useGender } from "../hooks/useGender";

const filterByGender = (type: FilterType, array: Person[] = []) => {
  const options = {
    All: array,
    Male: array.filter((person) => person.sex === 'm'),
    Female: array.filter((person) => person.sex === 'f'),
  };

  return options[type];
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorWrong, setErrorWrong] = useState<string>("");
  const { gender, handleGender } = useGender((type: FilterType) => {
    setPeople(filterByGender(type, allPeople));
  });

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://mate-academy.github.io/react_people-table/api/people.json"
      );
      const data = await response.json();

      setTimeout(() => {
        setAllPeople(data);

        setIsLoading(false);
      }, 500);
    } catch (error) {
      setErrorWrong('Something went wrong');
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    setPeople(filterByGender(gender, allPeople));
  }, [allPeople]);

  return (
    <>
      <div className="block">

        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              isLoading={isLoading}
              people={people}
              gender={gender}
              handleGender={handleGender}
              // slug={people.find((person) => person.slug)}
            />
          </div>

          <div className="column">
            {!isLoading && (
              <div className="box table-container">
                {/* <Loader /> */}

                {errorWrong && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {people.length > 0 ? (
                  <PeopleTable people={people} />
                ) : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                <p>There are no people matching the current search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
