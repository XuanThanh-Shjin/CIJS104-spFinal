import React, { useState } from 'react';

const PaymentModal = ({ booking, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = (e) => {
    e.preventDefault();
    onPaymentSuccess(booking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Add payment method</h2>
            <p className="text-sm text-gray-500">Add a payment method to complete payments</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="mb-6 space-y-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
            onClick={() => setPaymentMethod('card')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 mr-4 border-2 rounded-full flex items-center justify-center ${paymentMethod === 'card' ? 'border-purple-500' : 'border-gray-400'}`}>
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>}
              </div>
              <div>
                <p className="font-semibold text-gray-800">Credit or Debit Card</p>
                <p className="text-sm text-gray-500">Use a credit or debit card to pay with automatic payments</p>
              </div>
            </div>
          </div>
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'paypal' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
            onClick={() => setPaymentMethod('paypal')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 mr-4 border-2 rounded-full flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-purple-500' : 'border-gray-400'}`}>
                {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>}
              </div>
              <div>
                <p className="font-semibold text-gray-800">Paypal</p>
                <p className="text-sm text-gray-500">Use your Paypal account to make payments</p>
              </div>
            </div>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="cardName">
                Name on card
              </label>
              <input
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                id="cardName"
                type="text"
                placeholder="Cardholder's name"
                required
              />
            </div>
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="cardNumber">
                Card number
              </label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  id="cardNumber"
                  type="text"
                  placeholder="Card's number"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="expiryDate">
                  Expiry
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  id="expiryDate"
                  type="text"
                  placeholder="NM/YY"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="cvv">
                  CVV
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  id="cvv"
                  type="text"
                  placeholder="***"
                  required
                />
              </div>
            </div>
            <div className="flex pt-4 space-x-4">
              <button
                className="w-full py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                type="submit"
              >
                Purchase
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {paymentMethod === 'paypal' && (
            <div className="py-8 text-center">
                <p className="text-gray-600">Redirecting to PayPal...</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
