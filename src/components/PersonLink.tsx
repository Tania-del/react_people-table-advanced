import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface IPersonLink {
  name: Person['name'];
  slug: Person['slug'];
  sex: Person['sex'];
  onClick: () => void;
}

export const PersonLink: FC<IPersonLink> = ({
  name, onClick, slug, sex,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleNameQuery = (slug: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    return `/people/${slug}${
      searchParams ? `?${searchParams}` : ''
    }`;
  };

  return (
    <NavLink
      to={handleNameQuery(slug)}
      onClick={() => {
        onClick();
      }}
      className={sex && sex.toLowerCase() === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </NavLink>
  );
};
