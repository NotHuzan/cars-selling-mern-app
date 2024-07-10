import React from 'react'
import UseCars from '../UseCars/UseCars'

const UserSavedAds = () => {
  return (
    <div>
      <h1 style={{margin: '3rem 0',textAlign: 'center'}}>Saved Ads</h1>  
      <UseCars savedAds />
    </div>
  )
}

export default UserSavedAds
