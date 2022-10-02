import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import navItems from './NavItems.json';
import './Navigation.css';

type Props = {
  selectedId: number,
  setSelectedId: (num: number) => void,
};

export const Navigation: React.FC<Props> = ({ selectedId, setSelectedId }) => {
  return (
    <div className="tabs is-medium">
      <ul>
        {navItems.map(item => (
          <li
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={classNames(
              '',
              { 'is-active': selectedId === item.id },
            )}
          >
            <Link
              to={`/${item.link}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
