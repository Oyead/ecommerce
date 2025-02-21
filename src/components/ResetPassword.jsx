import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  // Define the password validation schema
  const passwordSchema = Yup.string()
    .required('Password is required')
    .matches(
      /^[A-Z][a-z0-9]{2,5}$/,
      'Password must start with an uppercase letter and be 3 to 6 characters long (letters or digits)'
    );

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the new password
      await passwordSchema.validate(newPassword);

      if (newPassword !== confirmPassword) {
        setMessage('Passwords do not match.');
        setMessageType('error');
        return;
      }

      // Retrieve the email from localStorage
      const email = localStorage.getItem('resetEmail');

      // Send the new password to the backend (or update it in your database)
      console.log('New password for', email, ':', newPassword);

      setMessage('Password reset successfully!');
      setMessageType('success');

      // Clear localStorage
      localStorage.removeItem('resetCode');
      localStorage.removeItem('resetEmail');

      // Navigate to the login page or home page
      navigate('/Login');
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-green-color shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-orange-300">Reset Password</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="New Password"
                  />
                </div>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="relative">
                  <button type="submit" className="bg-white text-black rounded-md px-5 py-1">
                    Reset Password
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
  );
}