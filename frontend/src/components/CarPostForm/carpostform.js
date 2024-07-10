import React, { useState } from 'react';
import axios from 'axios';
import './CarPostForm.css';

const CarPostForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    type: '',
    year: '',
    mileage: '',
    price: '',
    condition: '',
    fuelType: '',
    transmission: '',
    color: '',
    engine: '',
    images: [],
    description: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
    
  //   for (const key in formData) {
  //     if (key === 'images') {
  //       // const imgArr=[];
  //       Array.from(formData.images).forEach((file, index) => {
  //         data.append('images', file);
  //         // data['images'].push=file;
  //         // imgArr.push(file);
  //       });
  //       // data['images']=imgArr;
  //     } else {
  //       data.append(key, formData[key]);
  //       // data[key]=formData[key];
  //     }
  //   }

  //   // const newD=new FormData();
  //   // newD.append('make',formData.make);
    
  //   try {
  //     console.log(data);
  //     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/postadd`, data, 
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }
  //     );
  //     setSubmittedData(response.data);
  //   } catch (error) {
  //     console.error('Error posting ad', error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    
    for (const key in formData) {
      // if (key === 'images') {
      //   const imgArr=[];
      //   Array.from(formData.images).forEach((file, index) => {
      //     // data.append('images', file);
      //     // data['images'].push=file;
      //     imgArr.push(file);
      //   });
      //   data['images']=imgArr;
      // } else {
        // data.append(key, formData[key]);
        data[key]=formData[key];
      // }
    }

    // const newD=new FormData();
    // newD.append('make',formData.make);
    
    try {
      console.log(data);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/postad`, data, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
      setSubmittedData(response.data);
    } catch (error) {
      console.error('Error posting ad', error);
    }
  };

  return (
    <div className="car-post-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="make" className="label-group">Make:</label>
          <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="model" className="label-group">Model:</label>
          <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="type" className="label-group">Type:</label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="year" className="label-group">Year:</label>
          <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mileage" className="label-group">Mileage:</label>
          <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="label-group">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="condition" className="label-group">Condition:</label>
          <input type="text" id="condition" name="condition" value={formData.condition} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="fuelType" className="label-group">Fuel Type:</label>
          <input type="text" id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="transmission" className="label-group">Transmission:</label>
          <input type="text" id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="color" className="label-group">Color:</label>
          <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="engine" className="label-group">Engine Capacity:</label>
          <input type="text" id="engine" name="engine" value={formData.engine} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="images" className="label-group">Images:</label>
          <input type="file" id="images" name="images" onChange={handleFileChange} multiple />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label-group">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="button-group">
          <button className='postBtn' type="submit">Submit</button>
        </div>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h2>Car Post Details</h2>
          <p><strong>Make:</strong> {submittedData.make}</p>
          <p><strong>Model:</strong> {submittedData.model}</p>
          <p><strong>Type:</strong> {submittedData.type}</p>
          <p><strong>Year:</strong> {submittedData.year}</p>
          <p><strong>Mileage:</strong> {submittedData.mileage}</p>
          <p><strong>Price:</strong> {submittedData.price}</p>
          <p><strong>Condition:</strong> {submittedData.condition}</p>
          <p><strong>Fuel Type:</strong> {submittedData.fuelType}</p>
          <p><strong>Transmission:</strong> {submittedData.transmission}</p>
          <p><strong>Color:</strong> {submittedData.color}</p>
          <p><strong>Description:</strong> {submittedData.description}</p>
          {submittedData.images.length > 0 && (
            <div>
              <strong>Images:</strong>
              <div className="images">
                {submittedData.images.map((image, index) => (
                  <img key={index} src={`/${image}`} alt={`Car ${index + 1}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarPostForm;
