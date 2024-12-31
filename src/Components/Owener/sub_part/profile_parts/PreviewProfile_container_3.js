import React,{useState} from 'react'

function PreviewProfilecontainer3() {
    
  const [inputValue, setInputValue] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleAddType = () => {
    if (inputValue.trim() && !selectedTypes.includes(inputValue.trim())) {
      setSelectedTypes([...selectedTypes, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddType();
    }
  };

  const removeSelectedType = (index) => {
    setSelectedTypes(selectedTypes.filter((_, i) => i !== index));
  };


  const equipmentList = [
    "Lens",
    "Tripod",
    "Flash",
    "Memory Card",
    "Camera Bag",
    "Light Meter",
    "External Microphone",
    "Gimbal",
    "Reflector",
    "Studio Lights",
    "Drone",
    "Softbox",
    "Backdrop",
    "Lens Filters",
    "DSLR Camera",
    "Mirrorless Camera",
    "Action Camera",
    "Film Camera"
];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = equipmentList.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    if (inputValue.trim() && !selectedTypes.includes(item.trim())) {
      setSelectedTypes([...selectedTypes, item.trim()]);
    }
    setInputValue('');
    setFilteredSuggestions([]);
  };

  return (
    <div className="PreviewProfile_container_3">
    <div className="media-stats">
      <span>Equipment's</span>
    </div>
    <div className='input con'>
      <input
        type="text"
        value={inputValue}
        onKeyPress={handleKeyPress}
        
        onChange={(e) => {setInputValue(e.target.value) ; handleChange(e)}}
        placeholder="Add new equipment"
      />
      <button onClick={handleAddType}>Add</button>

      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((item, index) => (
            <li 
              key={index} 
              onClick={() => handleSelectSuggestion(item)}
              className="suggestion-item"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="list_con">

      {selectedTypes.length !== 0 ? selectedTypes.map((type, index) => (
        <div key={index} className="selected-item">
          <span>{type}</span>
          <button onClick={() => removeSelectedType(index)}>×</button>
        </div>
      )) : <p className='not_set'>
        No equipment selected yet.
        </p>}
    </div>


  </div>
  )
}

export default PreviewProfilecontainer3
