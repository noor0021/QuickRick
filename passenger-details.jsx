import React from 'react'

const styles = {
  page: {
    margin: 0,
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Helvetica, Arial, sans-serif',
    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
    padding: '16px'
  },
  card: {
    width: 'min(92vw, 460px)',
    background: '#ffffff',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
    padding: '24px'
  },
  title: {
    marginTop: 0
  },
  form: {
    display: 'grid',
    gap: '12px'
  },
  label: {
    fontSize: '14px',
    color: '#1e293b'
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '14px'
  },
  row: {
    display: 'flex',
    gap: '10px'
  },
  button: {
    border: 0,
    borderRadius: '10px',
    padding: '11px 14px',
    fontSize: '15px',
    cursor: 'pointer'
  },
  submit: {
    background: '#1d4ed8',
    color: '#ffffff'
  },
  back: {
    background: '#e2e8f0',
    color: '#0f172a',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default function PassengerDetailsPage() {
  const [mobile, setMobile] = React.useState('')
  const [otp, setOtp] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()
    alert('Passenger details saved.')
    window.location.href = '#/role-selector'
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Passenger Details</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="name" style={styles.label}>Name</label>
            <input id="name" name="name" type="text" placeholder="Enter name" style={styles.input} />
          </div>

          <div>
            <label htmlFor="mobile" style={styles.label}>Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(event) => setMobile(event.target.value.replace(/\D/g, '').slice(0, 10))}
              style={styles.input}
            />
          </div>

          <div>
            <label htmlFor="otp" style={styles.label}>OTP</label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 4))}
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <button type="submit" style={{ ...styles.button, ...styles.submit }}>
              Continue
            </button>
            <a href="#/role-selector" style={{ ...styles.button, ...styles.back }}>
              Back
            </a>
          </div>
        </form>
      </section>
    </main>
  )
}
