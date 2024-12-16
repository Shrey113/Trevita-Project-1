import React, { useState } from "react";
import "./menu.css";
import dwon from './dwon.png'

const Menu = ({ title, items,is_active }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Open menu on hover
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Close menu on hover out
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // Handle click on a menu item
  const handleItemClick = (onClick) => {
    onClick(); // Execute the item's onClick action
    setIsOpen(false); // Close the menu
  };

  return (
    <div
      className="menu-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {is_active && 
      <div className="active_state"></div>}
      
      <button className={`menu-button ${is_active && "active"}`}>
        {title}
        <img src={dwon} alt="" />
    </button>
      {isOpen && (
        <ul className="menu-list">
          {items.map((item, index) => (
            <li
              key={index}
              className="menu-item"
              onClick={() => handleItemClick(item.onClick)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
