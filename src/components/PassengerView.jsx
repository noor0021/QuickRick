import React from 'react'

export default function PassengerView({ 
  locating, 
  currentPlace, 
  searchText, 
  setSearchText, 
  searchPlace, 
  searchResults, 
  selectPlace, 
  formatPlace, 
  destinationText, 
  destinationPlace, 
  isSignalOn, 
  toggleSignal 
}) {
  return (
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
  )
}
