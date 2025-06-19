import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
  return (
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
              <p className="text-gray-700">123 Handloom Street, Weavers Town, HT 45678</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-600 text-xl mr-4" />
              <p className="text-gray-700">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-600 text-xl mr-4" />
              <p className="text-gray-700">info@bhagwatihandloom.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Email" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea id="message" name="message" rows={5} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;