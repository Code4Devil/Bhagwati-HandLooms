import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ContactUs = () => {
  return (



    <div className='pt-20'>

      {/* Hero Banner */}
      <section className="relative h-[300px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent z-10"></div>
        <img
          src="https://readdy.ai/api/search-image?query=contact%20us%20page%20background%20image%20handloom%20textiles&width=1440&height=400&seq=200&orientation=landscape"
          alt="Contact Us"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-xl text-white mb-8">We're here to help! Reach out to us for any inquiries, support, or feedback.</p>
            </div>
          </div>
        </div>
      </section>

<div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">We'd love to hear from you! Please feel free to reach out with any questions, feedback, or inquiries.</p>

          <div className="space-y-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-600 text-xl mr-4" />
              <p className="text-gray-700">Dev Bhumi Near Advocate Factory, Jatal Road, Shondapur Chowk, Panipat, Haryana, India (132103</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-600 text-xl mr-4" />
              <p className="text-gray-700">+91 9050457740</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-600 text-xl mr-4" />
              <p className="text-gray-700">bhagwatihandloom77740@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Our Location (Interactive Map) */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
          <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '300px', width: '100%' }}>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={{ lat: 29.3917604, lng: 76.9498244 }}
                zoom={15}
              >
                <Marker position={{ lat: 29.3917604, lng: 76.9498244 }} />
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="text-center mt-4">
           
         
           
          </div>
        </div>
      </div>

      
    </div>

<Footer />

    </div>

    
    
  );
};

export default ContactUs;
