/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface IPeopleTable {
  people: Person[];
}
export const PeopleTable: React.FC<IPeopleTable> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
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
