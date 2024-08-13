import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './Fees.css';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Fees() {
  const { auth } = useAuth();
  const [registerNumber, setRegisterNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth) {
      toast.error('You must be logged in to check fees.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/confirm/register/${registerNumber}`);

      // Log the response status
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Log the response data
        navigate('/fees-details', { state: { student: data } });
      } else {
        const errorMessage = await response.text(); // Get error message from the response
        toast.error(`Register number not found: ${errorMessage}`);
      }
    } catch (err) {
      console.error('Fetch error:', err); // Log the error
      toast.error('An error occurred while checking the register number');
    }
  };

  return (
    <>
      <Header />
      <div className="page-background">
        <div className="container">
          <h2>Fees Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="register-number">Register Number</label>
              <input
                type="text"
                id="register-number"
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit">Check Fees</button>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Fees;
