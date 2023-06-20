import React from 'react';
import './Burger.css';

export default function Burger({ open, setOpen }) {
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <button
      className={`burger ${open ? 'burger-open' : ''} ${!open ? 'burger-closed' : ''}`}
      onClick={handleClick}
    ></button>
  );
}
