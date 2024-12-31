// Import React
import React from 'react';
import './Services.css'; // Make sure to create and link this CSS file


import services_icon from './../../img/photgraphy.png';
import services_icon_2 from './../../img/portrait.png';
import services_icon_3 from './../../img/wedding-arch.png';

const servicesData = [
  {
    id: 1,
    title: 'Wedding Photography',
    description: 'Capture your special day with stunning and timeless photos.',
    price: '$999.00/session',
    icon: services_icon, // Placeholder for the image
  },
  {
    id: 2,
    title: 'Portrait Photography',
    description: 'Professional portraits for individuals, families, or headshots.',
    price: '$199.00/session',
    icon: services_icon_2,
  },
  {
    id: 3,
    title: 'Event Photography',
    description: 'Document your events with high-quality, memorable photos.',
    price: '$499.00/event',
    icon: services_icon_3,
  },
  {
    id: 4,
    title: 'Product Photography',
    description: 'Showcase your products with sharp and attractive imagery.',
    price: '$149.00/product',
    icon: services_icon,
  },
];


// Services Component
const Services = () => {
  return (
    <div className="services_container">
      <div className="services-grid">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <img src={service.icon} alt={`${service.title} icon`} className="service-icon" />
            </div>
            <div className="service-footer">
              <div className="service-price">{service.price}</div>
              <button className="service-detail-button">Detail</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;