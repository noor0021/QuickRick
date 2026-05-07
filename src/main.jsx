import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapContainer, CircleMarker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './styles.css'

const demoOtp = '123456'

const initialSignals = []

function formatPlace(place) {
  if (!place) {
    return 'Unknown place'
  }

  return place.split(',').slice(0, 2).join(', ')
}

function MapMover({ currentPosition, destinationPosition, zoom }) {
  const map = useMap()

  React.useEffect(() => {
    if (currentPosition && destinationPosition) {
      map.fitBounds([currentPosition, destinationPosition], { padding: [40, 40] })
      return
    }

    if (currentPosition) {
      map.setView(currentPosition, zoom)
    }
  }, [map, currentPosition, destinationPosition, zoom])

  return null
}

function SearchMapClick({ onPickLocation }) {
  const map = useMap()

  React.useEffect(() => {
    function handleClick(event) {
      onPickLocation([event.latlng.lat, event.latlng.lng])
    }

    map.on('click', handleClick)
    return () => {
      map.off('click', handleClick)
    }
  }, [map, onPickLocation])

  return null
}

function Dashboard() {
  const [view, setView] = React.useState('passenger')
  const [currentPosition, setCurrentPosition] = React.useState([28.6139, 77.209])
  const [currentPlace, setCurrentPlace] = React.useState('Tracking current location...')
  const [destinationText, setDestinationText] = React.useState('')
  const [destinationPlace, setDestinationPlace] = React.useState('')
  const [destinationPosition, setDestinationPosition] = React.useState(null)
  const [searchText, setSearchText] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])
  const [signals, setSignals] = React.useState(initialSignals)
  const [infoText, setInfoText] = React.useState('Tap the map to pick a point or type a place.')
  const [locating, setLocating] = React.useState(true)

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setLocating(false)
      setInfoText('Location access is not available in this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const nextPosition = [position.coords.latitude, position.coords.longitude]
        setCurrentPosition(nextPosition)
        setLocating(false)
        await fetchPlaceName(nextPosition, setCurrentPlace)
      },
      () => {
        setLocating(false)
        setInfoText('Location permission was denied, so the map stays on the default city.')
      }
    )
  }, [])

  async function fetchPlaceName(position, setPlace) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`
      )
      const data = await response.json()
      setPlace(formatPlace(data.display_name))
    } catch {
      setPlace('Current location')
    }
  }

  async function searchPlace(query) {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setSearchResults([])
      return
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(trimmedQuery)}`
      )
      const data = await response.json()
      setSearchResults(data)
    } catch {
      setSearchResults([])
    }
  }

  function selectPlace(place) {
    const nextPosition = [Number(place.lat), Number(place.lon)]
    setCurrentPosition(nextPosition)
    setDestinationPlace(formatPlace(place.display_name))
    setDestinationPosition([Number(place.lat), Number(place.lon)])
    setDestinationText(`${currentPlace} → ${formatPlace(place.display_name)}`)
    setSearchText(formatPlace(place.display_name))
    setSearchResults([])
    setInfoText(`Destination set to ${formatPlace(place.display_name)}`)
  }

  function pickMapLocation(position) {
    setCurrentPosition(position)
    setDestinationText('')
    setDestinationPlace('')
    setDestinationPosition(null)
    fetchPlaceName(position, setCurrentPlace)
    setInfoText('Map point selected. This is your current location.')
  }

  function toggleSignal() {
    if (signals.length > 0) {
      setSignals([])
      setInfoText('Signal stopped.')
      return
    }

    setSignals([
      {
        id: Date.now(),
        position: currentPosition,
        title: currentPlace || 'Passenger signal'
      }
    ])
    setInfoText('Signal sent. Driver dashboard count updated instantly.')
  }

  const signalCount = signals.length
  const isSignalOn = signalCount > 0
  const dashboardTitle = view === 'passenger' ? 'Passenger dashboard' : 'Driver dashboard'
  const rightPanelTitle = view === 'passenger' ? 'Where to?' : 'Live signals'

  return (
    <div className="dashboard-shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow">QuickRick</p>
          <h1>{dashboardTitle}</h1>
        </div>

        <div className="mode-switch">
          <button className={view === 'passenger' ? 'mode-button active' : 'mode-button'} onClick={() => setView('passenger')}>
            Passenger
          </button>
          <button className={view === 'driver' ? 'mode-button active' : 'mode-button'} onClick={() => setView('driver')}>
            Driver
          </button>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="map-card map-card-big">
          <MapContainer center={currentPosition} zoom={14} scrollWheelZoom className="map-frame">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMover currentPosition={currentPosition} destinationPosition={destinationPosition} zoom={14} />
            <SearchMapClick onPickLocation={pickMapLocation} />

            <CircleMarker center={currentPosition} radius={10} pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 1 }}>
              <Popup>Current location</Popup>
            </CircleMarker>

            {destinationPosition ? (
              <CircleMarker center={destinationPosition} radius={10} pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 1 }}>
                <Popup>Destination</Popup>
              </CircleMarker>
            ) : null}

            {signals.map((signal) => (
              <CircleMarker key={signal.id} center={signal.position} radius={8} pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 1 }}>
                <Popup>{signal.title}</Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </section>

        <aside className="side-card">
          <p className="section-label">{rightPanelTitle}</p>
          <div className="mini-card">
            <span className="mini-label">Driver sync</span>
            <strong>{signalCount} signal{signalCount === 1 ? '' : 's'} live right now</strong>
          </div>

          {view === 'passenger' ? (
            <>
              <div className="mini-card">
                <span className="mini-label">Current location</span>
                <strong>{locating ? 'Getting location...' : currentPlace}</strong>
              </div>

              <div className="search-box">
                <label htmlFor="destination">Where to?</label>
                <input
                  id="destination"
                  value={searchText}
                  onChange={(event) => {
                    setSearchText(event.target.value)
                    searchPlace(event.target.value)
                  }}
                  placeholder="Search a place"
                />
                {searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((place) => (
                      <button key={place.place_id} type="button" onClick={() => selectPlace(place)}>
                        {formatPlace(place.display_name)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mini-card">
                <span className="mini-label">Trip text</span>
                <strong>{destinationText || `${currentPlace} → ${destinationPlace || 'Destination'}`}</strong>
              </div>

              <button className={isSignalOn ? 'signal-button signal-on' : 'signal-button'} onClick={toggleSignal}>
                {isSignalOn ? 'Stop the signal' : 'Signal to auto'}
              </button>
            </>
          ) : (
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
          )}

          <p className="status-box">{infoText}</p>
          <p className="status-box subtle">{destinationPlace ? `Destination: ${destinationPlace}` : 'Tap map or search place'}</p>
        </aside>
      </main>
    </div>
  )
}

function AuthFlow() {
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthFlow />
  </React.StrictMode>
)