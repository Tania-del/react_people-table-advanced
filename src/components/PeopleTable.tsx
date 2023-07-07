/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import {
  NavLink,
  useLocation,
} from 'react-router-dom';
import { SortFilterType, useFilter } from '../hooks/useFilter';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface IPeopleTable {
  people: Person[];
  allPeople: Person[];
  setPeople: (people: Person[]) => void;
}
export const PeopleTable: React.FC<IPeopleTable> = (
  { people, allPeople, setPeople },
) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const location = useLocation();
  const { getSort, getOrder, getFilteredPeople } = useFilter();
  // const {} = useFilter()

  const sort = getSort();
  const orderr = getOrder();

  const handleSortQuery = (sortType: string) => {
    const searchParams = new URLSearchParams(location.search);

    // eslint-disable-next-line no-self-compare

    if (sort === sortType && orderr === 'desc') {
      searchParams.delete('sort');
      searchParams.delete('order');
    } else if (sort === sortType) {
      searchParams.set('order', 'desc');
    } else {
      searchParams.set('sort', sortType);
    }

    const searchParamsString = searchParams.toString();

    return `${searchParamsString ? `?${searchParamsString}` : ''}`;
  };

  const sortPeopleBySortType = (sortType: SortFilterType) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let order = false;

    if (sort === sortType) {
      order = true;
    }

    if (sort === sortType && orderr) {
      order = false;
      // eslint-disable-next-line no-param-reassign
      sortType = '' as SortFilterType;
    }

    const result = getFilteredPeople(allPeople, { sortType, order });

    setPeople(result);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <NavLink
                to={handleSortQuery('name')}
                onClick={() => sortPeopleBySortType('name')}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort ${sort === 'name' ? 'fa-sort-up' : ''} ${
                      sort === 'name' && orderr ? 'fa-sort-down' : ''
                    }`}
                  />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <NavLink
                to={handleSortQuery('sex')}
                onClick={() => sortPeopleBySortType('sex')}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort ${sort === 'sex' ? 'fa-sort-down' : ''} ${
                      sort === 'sex' && orderr ? 'fa-sort-up' : ''
                    }`}
                  />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <NavLink
                to={handleSortQuery('born')}
                onClick={() => sortPeopleBySortType('born')}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort ${sort === 'born' ? 'fa-sort-down' : ''} ${
                      sort === 'born' && orderr ? 'fa-sort-up' : ''
                    }`}
                  />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <NavLink
                to={handleSortQuery('died')}
                onClick={() => sortPeopleBySortType('died')}
              >
                <span className="icon">
                  <i
                    className={`fas fa-sort ${sort === 'died' ? 'fa-sort-down' : ''} ${
                      sort === 'died' && orderr ? 'fa-sort-up' : ''
                    }`}
                  />
                </span>
              </NavLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        <>
          {people.map(
            ({
              name, sex, born, died, fatherName, motherName, slug,
            }) => (
              <tr
                key={slug}
                data-cy="person"
                className={
                  selectedPerson === name ? 'has-background-warning' : ''
                }
              >
                <td>
                  <PersonLink
                    key={slug}
                    onClick={() => setSelectedPerson(name)}
                    name={name}
                    slug={slug}
                    sex={sex}
                  />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {motherName ? (
                    people.some((person) => motherName === person.name) ? (
                      // eslint-disable-next-line @typescript-eslint/indent
                      <PersonLink
                        key={slug}
                        onClick={() => setSelectedPerson(motherName)}
                        slug={slug}
                        sex="f"
                        name={motherName}
                        // eslint-disable-next-line react/jsx-closing-bracket-location
                      />
                    ) : (
                      motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {fatherName ? (
                    people.some((person) => fatherName === person.name) ? (
                      // eslint-disable-next-line @typescript-eslint/indent
                      <PersonLink
                        onClick={() => setSelectedPerson(fatherName)}
                        slug={slug}
                        key={slug}
                        sex="m"
                        name={fatherName}
                        // eslint-disable-next-line react/jsx-closing-bracket-location
                      />
                    ) : (
                      motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ),
          )}
        </>
      </tbody>
    </table>
  );
};
