import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the code sent to the user's email (stored in localStorage or state)
    const storedCode = localStorage.getItem('resetCode');

    if (code === storedCode) {
      setMessage('Code verified successfully!');
      setMessageType('success');
      navigate('/ResetPassword'); // Navigate to the password reset page
    } else {
      setMessage('Invalid code. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-green-color shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-orange-300">Enter Code</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="code"
                      name="code"
                      type="text"
                      value={code}
                      onChange={handleCodeChange}
                      required
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Reset Code"
                    />
                  </div>
                  <div className="relative">
                    <button type="submit" className="bg-white text-black rounded-md px-5 py-1">
                      Submit
                    </button>
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
    </div>
  );
}