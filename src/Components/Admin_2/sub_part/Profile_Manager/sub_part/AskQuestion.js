import React from 'react';
import './AskQuestion.css';

const AskQuestion = ({ message, onYesClick, onNoClick, closeButton }) => {
  return (
    <div className="overlay_AskQuestion">
      <div className="question-box">
        <p>{message}</p>
        <div className="buttons">
          <button onClick={onYesClick}>Yes</button>
          <button onClick={onNoClick}>No</button>
        </div>
        {closeButton && <button className="close-btn" onClick={closeButton}>Close</button>}
      </div>
    </div>
  );
};

export default AskQuestion;
