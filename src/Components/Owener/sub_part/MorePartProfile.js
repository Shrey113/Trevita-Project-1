import React, { useState } from 'react';
import './MorePartProfile.css';
import Services from './small_part/Services';


function MorePartProfile() {

  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderContent = () => {
    switch (activePage) {
      case 1:
        return <div className="content">This is Page 1 content.</div>;
      case 2:
        return <div className="content">This is Page 2 content.</div>;
      case 3:
        return <div className="content">This is Page 3 content.</div>;
      default:
        return <div className="content">This is Page 1 content.</div>;
    }
  };

  return (
    <div className="MorePartProfile_con">
      <div className="title_bar_con">
        <button
          className={`page-btn ${activePage === 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          Services 
        </button>
        <button
          className={`page-btn ${activePage === 2 ? 'active' : ''}`}
          onClick={() => handlePageChange(2)}
        >
          Packages
        </button>
        <button
          className={`page-btn ${activePage === 3 ? 'active' : ''}`}
          onClick={() => handlePageChange(3)}
        >
          Equipments
        </button>
      </div>

      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
}

export default MorePartProfile;
