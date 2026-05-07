import React from 'react'

export default function DriverView({ signalCount, currentPlace, signals }) {
  return (
    <>
      <div className="mini-card">
        <span className="mini-label">Signal count</span>
        <strong>{signalCount} signal{signalCount === 1 ? '' : 's'} aaya hai</strong>
      </div>

      <div className="mini-card">
        <span className="mini-label">Current place</span>
        <strong>{currentPlace}</strong>
      </div>

      <div className="driver-list">
        {signals.length === 0 ? <p>No passenger signal right now.</p> : null}
        {signals.map((signal) => (
          <div key={signal.id} className="driver-item">
            {signal.title}
          </div>
        ))}
      </div>
    </>
  )
}
