import {
  NavLink, useLocation, useParams, useNavigate,
} from 'react-router-dom';
import { FilterType } from '../hooks/useGender';
// eslint-disable-next-line import/no-duplicates
import { Person } from '../types';
import { Loader } from './Loader';

interface IPeopleFilters {
  isLoading: boolean;
  people: Person[];
  gender: string | undefined;
  handleGender: (type: FilterType) => void;
}

export const PeopleFilters: React.FC<IPeopleFilters> = ({
  isLoading, gender, handleGender,
}) => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    // searchParams.set()

    searchParams.set('query', query);
    const newSearch = searchParams.toString();

    navigate({ search: newSearch });
  };

  return (
    <nav className="panel">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className="panel-heading">Filters</p>

          <p className="panel-tabs" data-cy="SexFilter">
            <NavLink to={`/people/${slug ?? ''}`} className={gender === 'All' ? 'is-active' : ''} onClick={() => handleGender('All')}>
              All
            </NavLink>

            <NavLink to={`/people/${slug ?? ''}?sex=m`} className={gender === 'Male' ? 'is-active' : ''} onClick={() => handleGender('Male')}>
              Male
            </NavLink>

            <NavLink to={`/people/${slug ?? ''}?sex=f`} className={gender === 'Female' ? 'is-active' : ''} onClick={() => handleGender('Female')}>
              Female
            </NavLink>
          </p>

          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                data-cy="NameFilter"
                type="search"
                className="input"
                placeholder="Search"
                // value={query}
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
                <a
                  data-cy="century"
                  className="button mr-1"
                  href="#/people?centuries=16"
                >
                  16
                </a>

                <a
                  data-cy="century"
                  className="button mr-1 is-info"
                  href="#/people?centuries=17"
                >
                  17
                </a>

                <a
                  data-cy="century"
                  className="button mr-1 is-info"
                  href="#/people?centuries=18"
                >
                  18
                </a>

                <a
                  data-cy="century"
                  className="button mr-1 is-info"
                  href="#/people?centuries=19"
                >
                  19
                </a>

                <a
                  data-cy="century"
                  className="button mr-1"
                  href="#/people?centuries=20"
                >
                  20
                </a>
              </div>

              <div className="level-right ml-4">
                <a
                  data-cy="centuryALL"
                  className="button is-success is-outlined"
                  href="#/people"
                >
                  All
                </a>
              </div>
            </div>
          </div>

          <div className="panel-block">
            <a
              className="button is-link is-outlined is-fullwidth"
              href="#/people"
            >
              Reset all filters
            </a>
          </div>
        </>
      )}
    </nav>
  );
};
