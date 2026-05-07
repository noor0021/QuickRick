import React from 'react'
import Dashboard from './Dashboard'

const demoOtp = '123456'

export default function AuthFlow() {
  const [step, setStep] = React.useState('mobile')
  const [mobile, setMobile] = React.useState('')
  const [otpInput, setOtpInput] = React.useState('')
  const [sentOtp, setSentOtp] = React.useState('')
  const [message, setMessage] = React.useState('')

  function sendOtp() {
    if (mobile.trim().length !== 10) {
      setMessage('Please enter a valid mobile number.')
      return
    }

    const nextOtp = demoOtp
    setSentOtp(nextOtp)
    setStep('otp')
    setMessage(`Demo OTP sent to ${mobile}.`)
  }

  function verifyOtp() {
    if (otpInput.trim() === sentOtp) {
      setStep('dashboard')
      return
    }

    setMessage('OTP does not match. Try 123456.')
  }

  if (step === 'dashboard') {
    return <Dashboard />
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">QuickRick</p>
        <h1>{step === 'mobile' ? 'Enter mobile number' : 'Enter OTP'}</h1>
        <p className="hero-text">
          {step === 'mobile'
            ? 'First enter your mobile number.'
            : 'Now enter the OTP to open the dashboard.'}
        </p>

        {step === 'mobile' ? (
          <>
            <input
              className="auth-input"
              value={mobile}
              onChange={(event) => {
                const onlyDigits = event.target.value.replace(/\D/g, '')
                setMobile(onlyDigits.slice(0, 10))
              }}
              inputMode="numeric"
              maxLength={10}
              placeholder="Mobile number"
            />
            <button className="primary-button auth-button" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="mini-card otp-box">
              <span className="mini-label">Demo OTP</span>
              <strong>{sentOtp}</strong>
            </div>
            <input
              className="auth-input"
              value={otpInput}
              onChange={(event) => setOtpInput(event.target.value)}
              placeholder="OTP"
            />
            <button className="primary-button auth-button" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {message ? <p className="status-box">{message}</p> : null}
      </div>
    </div>
  )
}
