import React, { useState } from 'react';
import './AddImg.css';

function AddImg() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (newFile) => {
    setFile(newFile);
    const newPreview = URL.createObjectURL(newFile);
    setPreview(newPreview);
  };

  // Cleanup preview when component unmounts
  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="upload-container">
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="file-input"
          onChange={handleFileInput}
          accept="image/*"
          multiple={false}
        />
        <div className="upload-content">
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Choose an image or drag & drop it here</p>
          <span>Maximum file size: 50 MB</span>
        </div>
      </div>

      {file && preview && (
        <div className="preview-container">
          <div className="preview-item">
            <img src={preview} alt="Preview" />
            <div className="preview-info">
              <span>{file.name}</span>
              <span className="file-size">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="filename">File Name:</label>
            <input
              type="text"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter file name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              placeholder="Add a description (max 200 characters)"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 200))}
              maxLength={200}
              rows={4}
            />
            <div className="character-counter">
              {description.length}/200 characters
            </div>
          </div>
        </div>
      )}

      {file && preview && (
        <div className="button-group">
          <button className="cancel-btn" onClick={() => {
            setFile(null);
            setPreview(null);
            setDescription('');
            setFilename('');
          }}>Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      )}
    </div>
  );
}

export default AddImg;
