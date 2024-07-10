import React, { useState, useEffect } from 'react';
import './Sedan.css';
import elantra from '../../assets/eleantra.png';
import city from '../../assets/city.png';
import civic from '../../assets/civic2.png';
import grande from '../../assets/grande.png';

export default function Sedan() {
  const [activeButton, setActiveButton] = useState('one'); // State to track active button

  // Function to handle scroll event and trigger fade-in animations
  const handleScroll = () => {
    const images = document.querySelectorAll('.image');

    images.forEach(image => {
      const rect = image.getBoundingClientRect();
      const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
      if (isVisible) {
        image.classList.add('fade-in'); // Apply fade-in animation to image
      }
    });
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Update active button state
  };

  return (
    <div id='sedan-box'>
      <h1>Sedan</h1>
      <div className='links'>
        <a onClick={() => handleButtonClick('one')} className={activeButton === 'one' ? 'active' : ''}><h5>Honda Civic</h5></a>
        <a onClick={() => handleButtonClick('two')} className={activeButton === 'two' ? 'active' : ''}><h5>Hyundai Elantra</h5></a>
        <a onClick={() => handleButtonClick('three')} className={activeButton === 'three' ? 'active' : ''}><h5>Toyota Corolla</h5></a>
        <a onClick={() => handleButtonClick('four')} className={activeButton === 'four' ? 'active' : ''}><h5>Honda City</h5></a>
      </div>

      <div className='all_images'>
        <div className={`image ${activeButton === 'one' ? 'active fade-in' : ''}`}> 
          <img src={civic} alt='Honda Civic' />
          <h1>Honda Civic</h1>
          <h4>Introducing the 11th generation</h4>
          <div className='buttons'>
            <a className='l fade-in'>Learn more</a>
            <a className='r fade-in'>Buy now</a>
          </div>
        </div>

        <div className={`image ${activeButton === 'two' ? 'active fade-in' : ''}`}> 
          <img src={elantra} alt='Hyundai Elantra' />
          <h1>Hyundai Elantra</h1>
          <h4>Get the Feel of Luxury</h4>
          <div className='buttons'>
            <a className='l fade-in'>Learn more</a>
            <a className='r fade-in'>Buy now</a>
          </div>
        </div>

        <div className={`image ${activeButton === 'three' ? 'active fade-in' : ''}`}> 
          <img src={grande} alt='Toyota Corolla Grande' />
          <h1>Toyota Corolla Grande</h1>
          <h4>Have fun of Paddle Shifter</h4>
          <div className='buttons'>
            <a className='l fade-in'>Learn more</a>
            <a className='r fade-in'>Buy now</a>
          </div>
        </div>

        <div className={`image ${activeButton === 'four' ? 'active fade-in' : ''}`}> 
          <img src={city} alt='Honda City' />
          <h1>Honda City</h1>
          <h4>Enjoy the best fuel average</h4>
          <div className='buttons'>
            <a className='l fade-in'>Learn more</a>
            <a className='r fade-in'>Buy now</a>
          </div>
        </div>
      </div>
    </div>
  );
}
