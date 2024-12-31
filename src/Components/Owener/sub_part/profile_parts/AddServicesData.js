import React, { useState } from 'react';
import './AddServicesData.css';

function AddServicesData() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherServiceDescription, setOtherServiceDescription] = useState('');
  const [customServices, setCustomServices] = useState([]);

  const businessTypes = [
    {
        icon: '📸',
        title: 'Portrait Photography',
        description: 'Capturing individuals or groups, often in a studio or a natural setting, focusing on expressions and personalities.',
      },
      {
        icon: '🌄',
        title: 'Landscape Photography',
        description: 'Photographs of nature, outdoor scenes, and vast open spaces, showcasing beautiful landscapes or urban environments.',
      },
      {
        icon: '🎉',
        title: 'Event Photography',
        description: 'Documenting special occasions like weddings, parties, corporate events, and festivals, often focusing on moments and people.',
      },
      {
        icon: '🏙️',
        title: 'Architectural Photography',
        description: 'Capturing the design and structure of buildings, interiors, and cityscapes, often emphasizing lines, shapes, and space.',
      },
    //   {
    //     icon: '🍴',
    //     title: 'Food Photography',
    //     description: 'Photographing food in an appealing way for menus, advertisements, and social media, focusing on textures and colors.',
    //   },
    //   {
    //     icon: '🐶',
    //     title: 'Pet Photography',
    //     description: 'Capturing pets in various settings, highlighting their personality and charm, either in studio or natural environments.',
    //   },
  ];

  const handleTypeSelection = (index) => {
    setSelectedTypes(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      return [...prev, index];
    });
  };

  const handleAddCustomService = () => {
    if (otherServiceDescription.trim()) {
      setCustomServices(prev => [...prev, otherServiceDescription.trim()]);
      setOtherServiceDescription('');
    }
  };

  const removeSelectedType = (index) => {
    setSelectedTypes(prev => prev.filter(i => i !== index));
  };

  const removeCustomService = (index) => {
    setCustomServices(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="business-type-container">
     

     <h1 className="heading">Choose Your Photography Service 📸</h1>
<p className="subheading">
  Select the photography style that best fits your needs, whether it's capturing portraits, landscapes, or special events. Let us bring your vision to life!
</p>

      {(selectedTypes.length > 0 || customServices.length > 0) && (
        <div className="selected-services">
          <h3>Your Selected Services:</h3>
          <div className="selected-items">
            {selectedTypes.map((typeIndex) => (
              <div key={typeIndex} className="selected-item">
                <span>{businessTypes[typeIndex].title}</span>
                <button onClick={() => removeSelectedType(typeIndex)}>×</button>
              </div>
            ))}
            {customServices.map((service, index) => (
              <div key={`custom-${index}`} className="selected-item">
                <span>{service}</span>
                <button onClick={() => removeCustomService(index)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="heading">What's your business type?</h2>
      <div className="business-grid">
        {businessTypes.map((type, index) => (
          <div
            key={index}
            className={`business-card ${selectedTypes.includes(index) ? 'selected' : ''}`}
            onClick={() => handleTypeSelection(index)}
          >
            <div className="icon">{type.icon}</div>
            <h3 className="business-title">{type.title}</h3>
            <p className="business-description">{type.description}</p>
          </div>
        ))}
      </div>

      <div className="other-option">
        <input 
          type="checkbox" 
          id="other-type" 
          checked={showOtherInput}
          onChange={(e) => setShowOtherInput(e.target.checked)}
        />
        <label htmlFor="other-type">Other business type</label>
      </div>

      {showOtherInput && (
        <div className="other-input-container">
          <div className="input-with-button">
            <textarea
              placeholder="Tell us about your service..."
              value={otherServiceDescription}
              onChange={(e) => setOtherServiceDescription(e.target.value)}
              className="other-input"
            />
            <button 
              className="add-button"
              onClick={handleAddCustomService}
              disabled={!otherServiceDescription.trim()}
            >
              Add Service
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddServicesData;
