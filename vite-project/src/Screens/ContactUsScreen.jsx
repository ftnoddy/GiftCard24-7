import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { useSnackbar } from 'notistack';
import MainLayout from "../components/Layouts/MainLayout";
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://giftcards247.shop/api/users/contact-us', { name, email, mobile, message });
      setStatus(response.data.message);
      enqueueSnackbar('Email sent successfully!', { variant: 'success' });
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('Error sending email');
      enqueueSnackbar('Error sending email. Please try again later.', { variant: 'error' });
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="bg-white bg-opacity-10 rounded-lg p-6 md:p-8 w-full max-w-5xl mx-auto backdrop-filter backdrop-blur-lg shadow-xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-bold mb-4 text-pink-500">Contact Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm text-white">Name:</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                required
                className="w-full bg-gray-800 text-white rounded-md py-2 px-3 mb-2 text-sm"
              />
              <label className="block mb-2 text-sm text-white">Email:</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full bg-gray-800 text-white rounded-md py-2 px-3 mb-2 text-sm"
              />
              <label className="block mb-2 text-sm text-white">Mobile:</label>
              <input
                type="text"
                value={mobile}
                onChange={handleMobileChange}
                required
                className="w-full bg-gray-800 text-white rounded-md py-2 px-3 mb-2 text-sm"
              />
              <label className="block mb-2 text-sm text-white">Message:</label>
              <textarea
                value={message}
                onChange={handleMessageChange}
                rows="4"
                required
                className="w-full bg-gray-800 text-white rounded-md py-2 px-3 mb-4 text-sm"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
              >
                Send
              </button>
            </form>

            {status && <p className="mt-4 text-sm text-white">{status}</p>}

            <div className="get-in-touch mt-8">
              <h3 className="text-xl mb-2 text-pink-500">Get In Touch</h3>
              <p className="text-sm text-white">If you have any questions, give us a call:</p>
              <a href="tel:+1234567890" className="phone-link flex items-center mt-2 text-white text-sm">
                <FaPhone className="phone-icon mr-2" />
                +91 8502905200
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4">
            <h3 className="text-2xl font-bold mb-4 text-pink-500">Our Location</h3>
            <div className="w-full h-64 md:h-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14736.20868280687!2d88.4277248!3d22.577151999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1716978600487!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
