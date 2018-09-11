import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ items }) => (
  <div>
    {items.map(item => (
      <Link key={item.id} to={item.meta.slug}>
        {item.title}
      </Link>
    ))}
  </div>
);
