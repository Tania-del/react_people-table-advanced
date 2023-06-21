import { FC } from 'react';
import { NavLink } from "react-router-dom";
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
  return (
    <NavLink
      to={`/people/${slug}`}
      onClick={() => {
        onClick();
      }}
      className={sex.toLowerCase() === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </NavLink>
  );
};
