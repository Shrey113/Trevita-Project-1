import React,{useState} from 'react'
import './PreviewProfile.css'

import img_1 from './test_privew/set_prive_img_1.jpg'
import img_2 from './test_privew/set_prive_img_2.jpeg'

import add_more_img from './../img/plus.png'
import PreviewProfilecontainer3 from './profile_parts/PreviewProfile_container_3'

function PreviewProfile() {

  const galleryData = [
    {
      id: 1,
      type: 'video',
      imageUrl: img_1,
      views: '1,342,432',
      title: "Jelena's showreel"
    },
    {
      id: 2,
      type: 'video',
      imageUrl: img_2,
      views: '892,123',
      title: 'Dance Performance'
    },
    {
      id: 3,
      type: 'photo',
      imageUrl: img_1,
      views: '567,890',
      title: 'Studio Portrait'
    },
    {
      id: 2,
      type: 'video',
      imageUrl: img_2,
      views: '892,123',
      title: 'Dance Performance'
    },
    {
      id: 3,
      type: 'photo',
      imageUrl: img_1,
      views: '567,890',
      title: 'Studio Portrait'
    }
   
  ];


  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      profilePic: "path/to/profilePic1.jpg", // Replace with actual image path
      reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod semper neque, vel tristique velit malesuada non. Integer volutpat, dolor vitae tristique tristique, purus ligula posuere ligula, at semper nunc arcu non tortor.",
      postedTime: "Dec 31, 10:00 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@gmail.com",
      profilePic: "path/to/profilePic2.jpg", // Replace with actual image path
      reviewText: "Curabitur ac turpis purus. Sed ut neque ac leo tristique lacinia. Aliquam sit amet magna tristique, consectetur nisl nec, elementum velit.",
      postedTime: "Dec 31, 11:15 AM",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@gmail.com",
      profilePic: "path/to/profilePic3.jpg", // Replace with actual image path
      reviewText: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin fermentum, metus at convallis pretium, ipsum nulla.",
      postedTime: "Dec 31, 12:30 PM",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@gmail.com",
      profilePic: "path/to/profilePic4.jpg", // Replace with actual image path
      reviewText: "Fusce vel libero tincidunt, tincidunt orci sed, condimentum justo. Aliquam erat volutpat. Sed molestie dui ac velit ultrices, in feugiat nunc aliquam.",
      postedTime: "Dec 31, 1:45 PM",
    }
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quosLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos"
  );

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    console.log('Description saved:', description);
  };

  const handleCancel = () => {
    // Revert to the original description
    setIsEditing(false);
    console.log('Edit canceled');
  };



  const [showMore, setShowMore] = useState(false);

  // Determine how many items to show based on the "showMore" state
  const itemsToShow = showMore ? data : data.slice(0, 2);

  const handleShowMore = () => {
    setShowMore(!showMore); // Toggle the state to show more or less
  };
  
  

  return (
    <div className="main_profile_pri">

    
    {/* main - 1 */}
    <div className="PreviewProfile_container">
      <div className="media-stats">
        <span>{25} videos • {89} photos</span>
      </div>
      
      <div className="gallery-grid">
        {galleryData.map((item) => (
          <div key={item.id} className={`gallery-item ${item.type}`}>
            <img src={item.imageUrl} alt={item.title} />
            <span className="video-views">{item.views} views</span>
            <span className="video-title">{item.title}</span>
          </div>
        ))}
        <div className="gallery-item">

        <div className="add_more_page" onClick={() => console.log('Add More Clicked')}>
      <img src={add_more_img} alt="Add More Icon" />
      <span>Add More Images</span>
    </div>
        </div>
      </div>



      <div className="hr_line"></div>



      <div className="profile-description">
        {isEditing ? (
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              cols="50"
            />
            <div className="profile-description-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <p>{description}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>

      
     
    </div>






{/* main - 2 */}

    <div className="PreviewProfile_container_2">
      <div className="media-stats">
        <span>Portfolio</span>
        <p>See all</p>
      </div>
      
      <div className="gallery-grid">
        {galleryData.map((item) => (
          <div key={item.id} className={`gallery-item ${item.type}`}>
            <img src={item.imageUrl} alt={item.title} />
            <span className="video-views">{item.views} views</span>
            <span className="video-title">{item.title}</span>
          </div>
        ))}
        <div className="gallery-item">

        <div className="add_more_page" onClick={() => console.log('Add More Clicked')}>
      <img src={add_more_img} alt="Add More Icon" />
      <span>Add More Images</span>
    </div>
        </div>
      </div>
    </div>







{/* main - 3 */}
    <PreviewProfilecontainer3/>



    
    <div className="PreviewProfile_container_4">
      <div className="media-stats">
        <span>Reviews's</span>
      </div>
    
  
      {itemsToShow.map((item) => (
        <div key={item.id} className="main_con">
          <div className="profile_con">
            <div className="profile_pic">
              <img src={item.profilePic} alt={`${item.name}'s profile`} />
            </div>
            <div className="profile_data">
              <div className="name">{item.name}</div>
              <div className="email">{item.email}</div>
            </div>
          </div>

          <div className="star_con">
            {/* Add star ratings or other content here */}
          </div>

          <div className="review_data">
            {item.reviewText}
          </div>

          <div className="posted_time">{item.postedTime}</div>
        </div>
      ))}
      
      {/* Show More button if there are more items */}
      {data.length > 2 && (
        <button onClick={handleShowMore} className='show-more-btn'>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}


   
    </div>

    </div>
  )
}

export default PreviewProfile
