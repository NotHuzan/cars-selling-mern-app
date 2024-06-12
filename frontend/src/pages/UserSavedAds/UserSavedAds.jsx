import React from 'react'
import UseCars from '../UseCars/UseCars'

const UserSavedAds = () => {
  return (
    <>
      <h1 style={{margin: '5rem',textAlign: 'center'}}>Saved Ads</h1>  
      <UseCars savedAds />
    </>
  )
}

export default UserSavedAds
