import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './FeesDetails.css';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

function FeesDetails() {
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('');

  if (!state || !state.student) {
    return <div>No student data found. Please go back and check your register number.</div>;
  }

  const { student } = state;
  const fees = student.residenceType === 'Hosteller' ? 300000 : 150000;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentData = {
      rollNumber: student.rollNumber,
      paymentMethod,
      fees
    };

    console.log('Submitting payment data:', paymentData); // Log payment data

    try {
      const response = await axios.post('http://localhost:8080/payment', paymentData); // Update URL if needed
      console.log('Payment response:', response.data); // Log response data
      alert('Payment successful!'); // Show success message
    } catch (error) {
      console.error('Error processing payment:', error); // Log error
      alert('Payment failed. Please try again.'); // Show error message
    }
  };

  return (
    <>
      <Header />
      <div className="page-background">
        <div className="container">
          <h2>Fees Payment</h2>
          <p><strong>Student Name:</strong> {student.name}</p>
          <p><strong>Register Number:</strong> {student.rollNumber}</p>
          <p><strong>Residence Type:</strong> {student.residenceType}</p>
          <p><strong>Fees:</strong> ₹{fees}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="payment-method">Payment Method</label>
              <select
                id="payment-method"
                name="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="credit-card">Credit Card</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            </div>
            <button type="submit">Submit Payment</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FeesDetails;
