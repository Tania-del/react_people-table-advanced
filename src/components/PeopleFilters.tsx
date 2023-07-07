import classNames from 'classnames';
import { useState } from 'react';
import {
  NavLink,
  useLocation,
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useFilter } from '../hooks/useFilter';
import { FilterTypeShort } from '../hooks/useGender';
// eslint-disable-next-line import/no-duplicates
import { Person } from '../types';
import { getFullGender } from '../utils/common';
import { Loader } from './Loader';
// eslint-disable-next-line import/no-cycle

interface IPeopleFilters {
  isLoading: boolean;
  people: Person[];
  allPeople: Person[];
  setPeople: (people: Person[]) => void;
  setQueryError: (boolean: boolean) => void;
}

export const PeopleFilters: React.FC<IPeopleFilters> = ({
  isLoading,
  allPeople,
  setPeople,
}) => {
  const [search] = useSearchParams();
  const { slug } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const {
    getCenturies,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    getFilteredPeople,
  } = useFilter();

  const centuries = getCenturies();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(location.search);
    const query = e.target.value;

    if (query) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }

    const newSearch = searchParams.toString();

    navigate(`?${newSearch}`);

    setValue(query);

    const result = getFilteredPeople(allPeople, { query });

    setPeople(result);
  };

  const gender = getFullGender(search.get('sex') as FilterTypeShort);

  const handleCenturiesQuery = (century: string) => {
    const searchParams = new URLSearchParams(location.search);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const centuries = getCenturies(century);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    centuries.forEach((century, index) => {
      if (index) {
        searchParams.append('centuries', century);
      } else {
        searchParams.set('centuries', century);
      }
    });

    if (!centuries.length) {
      searchParams.delete('centuries');
    }

    const searchParamsString = searchParams.toString();

    return `/people${slug ? `/${slug}` : ''}${
      searchParamsString ? `?${searchParamsString}` : ''
    }`;
  };

  const sortPeopleByCentury = (century: string) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const centuries = getCenturies(century);

    const result = getFilteredPeople(allPeople, { centuries });

    setPeople(result);
  };

  const handleSexQuery = (sex: string) => {
    const searchParams = new URLSearchParams(location.search);

    if (sex === 'm' || sex === 'f') {
      searchParams.set('sex', sex);
    } else {
      searchParams.delete('sex');
    }

    return `/people${slug ? `/${slug}` : ''}${
      searchParams ? `?${searchParams}` : ''
    }`;
  };

  return (
    <nav className="panel">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className="panel-heading">Filters</p>

          <p className="panel-tabs" data-cy="SexFilter">
            <NavLink
              to={handleSexQuery('all')}
              className={gender === 'All' ? 'is-active' : ''}
              onClick={() => setPeople(
                getFilteredPeople(allPeople, { type: 'All' }),
              )}
            >
              All
            </NavLink>

            <NavLink
              to={handleSexQuery('m')}
              className={gender === 'Male' ? 'is-active' : ''}
              onClick={() => setPeople(
                getFilteredPeople(allPeople, { type: 'Male' }),
              )}
            >
              Male
            </NavLink>

            <NavLink
              to={handleSexQuery('f')}
              className={gender === 'Female' ? 'is-active' : ''}
              onClick={() => setPeople(
                getFilteredPeople(allPeople, { type: 'Female' }),
              )}
            >
              Female
            </NavLink>
          </p>

          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                data-cy="NameFilter"
                type="search"
                value={value}
                className="input"
                placeholder="Search"
                onChange={handleInputChange}
              />

              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            </p>
          </div>

          <div className="panel-block">
            <div
              className="level is-flex-grow-1 is-mobile"
              data-cy="CenturyFilter"
            >
              <div className="level-left">
                <NavLink
                  to={handleCenturiesQuery('16')}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': getCenturies().includes('16'),
                  })}
                  onClick={() => {
                    sortPeopleByCentury('16');
                  }}
                >
                  16
                </NavLink>

                <NavLink
                  to={handleCenturiesQuery('17')}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': getCenturies().includes('17'),
                  })}
                  onClick={() => {
                    sortPeopleByCentury('17');
                  }}
                >
                  17
                </NavLink>

                <NavLink
                  to={handleCenturiesQuery('18')}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': getCenturies().includes('18'),
                  })}
                  onClick={() => {
                    sortPeopleByCentury('18');
                  }}
                >
                  18
                </NavLink>

                <NavLink
                  to={handleCenturiesQuery('19')}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': getCenturies().includes('19'),
                  })}
                  onClick={() => {
                    sortPeopleByCentury('19');
                  }}
                >
                  19
                </NavLink>

                <NavLink
                  to={handleCenturiesQuery('20')}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': getCenturies().includes('20'),
                  })}
                  onClick={() => {
                    sortPeopleByCentury('20');
                  }}
                >
                  20
                </NavLink>
              </div>

              <div className="level-right ml-4">
                <NavLink
                  to={handleCenturiesQuery('all')}
                  data-cy="centuryALL"
                  // className={`button is-success ${centuries === 'all' ? 'is-outlined' : ''} `}
                  className={classNames('button is-success', {
                    'is-outlined': centuries.length !== 0,
                  })}
                  onClick={() => {
                    sortPeopleByCentury('all');
                  }}
                >
                  All
                </NavLink>
              </div>
            </div>
          </div>

          <div className="panel-block">
            <NavLink
              to={slug ? `/people/${slug}` : ''}
              className="button is-link is-outlined is-fullwidth"
              onClick={() => {
                setPeople(allPeople);
                setValue('');
              }}
            >
              Reset all filters
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
};
