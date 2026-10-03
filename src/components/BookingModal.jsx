import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { StoreManager } from '../data/store';
import Modal, { SuccessCheckmark } from './Modal';

export default function BookingModal({ bookingData, onClose, onBookingSuccess }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    players: '5-v-5',
  });
  const [errors, setErrors] = useState({});
  const [selectedPayment, setSelectedPayment] = useState('upi');
  
  // Payment states: 'IDLE' | 'PROCESSING' | 'SUCCESS' | 'FAILED'
  const [paymentState, setPaymentState] = useState('IDLE');
  const [paymentId, setPaymentId] = useState(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState(null);

  if (!bookingData) return null;

  const { sport, date, slot, durationMins, totalPrice } = bookingData;
  const dateFormatted = format(date, 'dd MMM yyyy');
  const dateStr = format(date, 'yyyy-MM-dd');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateDetails = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a valid 10-digit mobile number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (validateDetails()) {
      setCurrentStep(2);
    }
  };

  const handlePayment = () => {
    setPaymentState('PROCESSING');
    
    // Simulate real gateway processing delay
    setTimeout(() => {
      const generatedPaymentId = `PAY-${Date.now().toString().slice(-6)}`;
      
      // Create booking in StoreManager (syncs across Customer and Admin)
      const newBooking = StoreManager.createBooking({
        sportId: sport,
        sportName: sport === 'football' ? 'Football (5-a-side / 7-a-side)' : 'Box Cricket',
        dateStr: dateStr,
        startTime: slot.time,
        durationMins: durationMins || 60,
        amount: totalPrice,
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        players: formData.players,
      });

      setPaymentId(generatedPaymentId);
      setConfirmedBookingId(newBooking.id);
      setPaymentState('SUCCESS');
      setCurrentStep(4);
      if (onBookingSuccess) onBookingSuccess();
    }, 1200);
  };

  const paymentMethodLabels = {
    upi: 'UPI (GPay / PhonePe)',
    card: 'Credit / Debit Card',
    netbanking: 'Net Banking'
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={currentStep === 4 ? 'PAYMENT SUCCESSFUL' : 'COMPLETE YOUR BOOKING'}
      subtitle={currentStep === 4 ? 'Your reservation is confirmed' : `PrimeTurf Arena • ${sport === 'football' ? 'Football' : 'Cricket'}`}
      maxWidth="540px"
    >
      {/* Stepper Header (steps 1..3) */}
      {currentStep < 4 && paymentState !== 'PROCESSING' && (
        <div className="stepper-bar" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px', borderBottom: '1px solid #E5E7EB', paddingBottom: '14px' }}>
          <div className={`stepper-step ${currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'active') : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: currentStep === 1 ? '700' : '500', color: currentStep >= 1 ? '#16A34A' : '#64748B' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: currentStep >= 1 ? '#16A34A' : '#E2E8F0', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
              {currentStep > 1 ? '✓' : '1'}
            </span>
            Details
          </div>
          <div style={{ color: '#CBD5E1' }}>—</div>
          <div className={`stepper-step ${currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'active') : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: currentStep === 2 ? '700' : '500', color: currentStep >= 2 ? '#16A34A' : '#64748B' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: currentStep >= 2 ? '#16A34A' : '#E2E8F0', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
              {currentStep > 2 ? '✓' : '2'}
            </span>
            Review
          </div>
          <div style={{ color: '#CBD5E1' }}>—</div>
          <div className={`stepper-step ${currentStep >= 3 ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: currentStep === 3 ? '700' : '500', color: currentStep === 3 ? '#16A34A' : '#64748B' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: currentStep === 3 ? '#16A34A' : '#E2E8F0', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
              3
            </span>
            Payment
          </div>
        </div>
      )}

      {/* STEP 1: Customer Details */}
      {currentStep === 1 && (
        <form onSubmit={handleDetailsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '14px', color: '#101513' }}>
            <strong>{dateFormatted}</strong> at <strong>{slot.time}</strong> ({durationMins || 60} mins • <span style={{ color: '#16A34A', fontWeight: '800' }}>₹{totalPrice}</span>)
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>Full Name *</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name" 
              className="form-input"
            />
            {errors.fullName && <span style={{ color: '#DC2626', fontSize: '12px' }}>{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>Mobile Number *</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="10-digit mobile number" 
              className="form-input"
            />
            {errors.phone && <span style={{ color: '#DC2626', fontSize: '12px' }}>{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>Email Address (Optional)</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="For receipt & confirmation" 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>Expected Players *</label>
            <select 
              name="players" 
              value={formData.players}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="5-v-5">5 to 7 Players (Half Pitch)</option>
              <option value="7-v-7">8 to 14 Players (Full Pitch)</option>
              <option value="15+">15+ Players (Group Practice)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '10px', padding: '10px 24px' }}>
              Proceed to Review &rarr;
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Booking Review */}
      {currentStep === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px', background: '#F8FAFC' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: '#64748B', marginBottom: '10px' }}>Slot Summary</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
              <div>Date: <strong>{dateFormatted}</strong></div>
              <div>Time: <strong>{slot.time}</strong></div>
              <div>Duration: <strong>{durationMins || 60} Mins</strong></div>
              <div>Sport: <strong>{sport === 'football' ? 'Football' : 'Cricket'}</strong></div>
              <div>Players: <strong>{formData.players}</strong></div>
            </div>
          </div>

          <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: '#64748B', marginBottom: '8px' }}>Customer Contact</h4>
            <div style={{ fontSize: '14px', color: '#434845' }}>
              <div>Name: <strong>{formData.fullName}</strong></div>
              <div>Phone: <strong>{formData.phone}</strong></div>
              {formData.email && <div>Email: <strong>{formData.email}</strong></div>}
            </div>
          </div>

          <div style={{ border: '1px solid rgba(22, 163, 74, 0.3)', borderRadius: '12px', padding: '16px', background: 'rgba(22, 163, 74, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
              <span>Slot Charge ({slot.time}):</span>
              <span>₹{slot.price}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
              <span>Platform & Lighting Fee:</span>
              <span>₹{slot.bookingFee}</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(22, 163, 74, 0.2)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800' }}>
              <span>Total Amount Payable:</span>
              <span style={{ color: '#16A34A' }}>₹{totalPrice}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
            <button type="button" className="btn btn-outline" style={{ borderRadius: '10px' }} onClick={() => setCurrentStep(1)}>
              Back
            </button>
            <button type="button" className="btn btn-primary" style={{ borderRadius: '10px' }} onClick={() => setCurrentStep(3)}>
              Proceed to Payment &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Payment Method Selection */}
      {currentStep === 3 && paymentState === 'IDLE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#101513' }}>
            Select Payment Method (Total: ₹{totalPrice})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', border: selectedPayment === 'upi' ? '2px solid #16A34A' : '1px solid #E5E7EB', padding: '14px', borderRadius: '12px', cursor: 'pointer', background: selectedPayment === 'upi' ? 'rgba(22, 163, 74, 0.06)' : '#FFFFFF' }}>
              <input type="radio" name="payment" value="upi" checked={selectedPayment === 'upi'} onChange={() => setSelectedPayment('upi')} />
              <div style={{ marginLeft: '12px' }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#101513' }}>UPI (GPay, PhonePe, Paytm)</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Instant & secure UPI transfer</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', border: selectedPayment === 'card' ? '2px solid #16A34A' : '1px solid #E5E7EB', padding: '14px', borderRadius: '12px', cursor: 'pointer', background: selectedPayment === 'card' ? 'rgba(22, 163, 74, 0.06)' : '#FFFFFF' }}>
              <input type="radio" name="payment" value="card" checked={selectedPayment === 'card'} onChange={() => setSelectedPayment('card')} />
              <div style={{ marginLeft: '12px' }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#101513' }}>Credit / Debit Card</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Visa, Mastercard, RuPay</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', border: selectedPayment === 'netbanking' ? '2px solid #16A34A' : '1px solid #E5E7EB', padding: '14px', borderRadius: '12px', cursor: 'pointer', background: selectedPayment === 'netbanking' ? 'rgba(22, 163, 74, 0.06)' : '#FFFFFF' }}>
              <input type="radio" name="payment" value="netbanking" checked={selectedPayment === 'netbanking'} onChange={() => setSelectedPayment('netbanking')} />
              <div style={{ marginLeft: '12px' }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#101513' }}>Net Banking</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>All major Indian banks</div>
              </div>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
            <button type="button" className="btn btn-outline" style={{ borderRadius: '10px' }} onClick={() => setCurrentStep(2)}>
              Back
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              style={{ borderRadius: '10px', padding: '10px 24px' }}
              onClick={handlePayment}
            >
              Pay ₹{totalPrice} & Confirm
            </button>
          </div>
        </div>
      )}

      {/* PAYMENT PROCESSING STATE */}
      {paymentState === 'PROCESSING' && (
        <div style={{ textAlign: 'center', padding: '36px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid rgba(22, 163, 74, 0.2)', borderTopColor: '#16A34A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#101513', letterSpacing: '0.04em' }}>PROCESSING PAYMENT</h3>
          <p style={{ fontSize: '13px', color: '#64748B' }}>Communicating securely with payment gateway...</p>
        </div>
      )}

      {/* STEP 4: GPay / PhonePe Inspired Payment Success & Booking Confirmation */}
      {currentStep === 4 && paymentState === 'SUCCESS' && (
        <div style={{ textAlign: 'center', padding: '8px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Animated Success Circle */}
          <div>
            <SuccessCheckmark />
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#101513', letterSpacing: '0.02em', margin: '4px 0 2px 0' }}>
              PAYMENT SUCCESSFUL
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Your payment has been received.
            </p>
          </div>

          {/* Amount Paid Display */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: '800', color: '#16A34A', lineHeight: '1.1' }}>
              ₹{totalPrice.toLocaleString()}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '12px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
              <div>
                <div style={{ color: '#64748B', fontWeight: '500' }}>Payment ID</div>
                <div style={{ fontWeight: '700', color: '#101513', marginTop: '2px' }}>{paymentId}</div>
              </div>
              <div>
                <div style={{ color: '#64748B', fontWeight: '500' }}>Status</div>
                <div style={{ fontWeight: '800', color: '#16A34A', marginTop: '2px' }}>PAID</div>
              </div>
              <div>
                <div style={{ color: '#64748B', fontWeight: '500' }}>Method</div>
                <div style={{ fontWeight: '700', color: '#101513', marginTop: '2px' }}>{paymentMethodLabels[selectedPayment]}</div>
              </div>
            </div>
          </div>

          {/* Confirmed Booking Details Card */}
          <div style={{ border: '1px solid #E5E7EB', borderRadius: '14px', padding: '16px', textAlign: 'left', background: '#FFFFFF' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#16A34A', marginBottom: '8px' }}>
              BOOKING CONFIRMED
            </div>
            
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#101513' }}>
              PrimeTurf Arena
            </div>
            <div style={{ fontSize: '13px', color: '#434845', marginTop: '2px' }}>
              {sport === 'football' ? 'Football' : 'Box Cricket'} • {dateFormatted} • {slot.time}
            </div>
            
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
              <span>Booking ID:</span>
              <strong style={{ color: '#101513' }}>{confirmedBookingId}</strong>
            </div>
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
            <button 
              type="button"
              className="btn btn-outline"
              style={{ flex: 1, borderRadius: '10px', padding: '12px' }}
              onClick={() => {
                onClose();
                navigate('/');
              }}
            >
              BACK TO HOME
            </button>

            <button 
              type="button"
              className="btn btn-primary"
              style={{ flex: 1, borderRadius: '10px', padding: '12px' }}
              onClick={() => {
                onClose();
                navigate('/my-bookings');
              }}
            >
              VIEW MY BOOKINGS
            </button>
          </div>

        </div>
      )}
    </Modal>
  );
}
