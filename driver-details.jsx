import React from 'react'

const styles = {
  page: {
    margin: 0,
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Helvetica, Arial, sans-serif',
    background: 'linear-gradient(135deg, #ecfeff, #cffafe)',
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
    background: '#0f766e',
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

export default function DriverDetailsPage() {
  function handleSubmit(event) {
    event.preventDefault()
    alert('Driver details saved.')
    window.location.href = '#/role-selector'
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Driver Details</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="aadhar" style={styles.label}>Aadhar Number</label>
            <input id="aadhar" name="aadhar" type="text" placeholder="Enter aadhar number" style={styles.input} />
          </div>

          <div>
            <label htmlFor="licenceDocument" style={styles.label}>Licence Document</label>
            <input id="licenceDocument" name="licenceDocument" type="file" accept="image/*" required style={styles.input} />
          </div>

          <div>
            <label htmlFor="phone" style={styles.label}>Phone Number</label>
            <input id="phone" name="phone" type="text" placeholder="Enter phone number" style={styles.input} />
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
