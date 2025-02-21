import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    const serviceID = 'service_yevfy84';
    const templateID = 'template_537w731';
    const userID = 'f7PNT_LI9ydkjqS1J';

    const resetCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
    const templateParams = {
      email: email,
      reset_code: resetCode,
    };

    try {
      const response = await emailjs.send(serviceID, templateID, templateParams, userID);
      console.log('Email sent successfully:', response);

      // Store the reset code in localStorage
      localStorage.setItem('resetCode', resetCode.toString());
      localStorage.setItem('resetEmail', email);

      setMessage('Reset code sent successfully to your email!');
      setMessageType('success');

      navigate('/VerifyCode'); // Navigate to the verify code page
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('Failed to send reset code. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-green-color shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-orange-300">Enter your email</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <button type="submit" className="bg-white text-black rounded-md px-5 py-1">Submit</button>
                </div>
              </form>
              {message && (
                <div
                  className={`mt-4 text-sm font-medium ${
                    messageType === 'success' ? 'text-black' : 'text-red-500'
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}