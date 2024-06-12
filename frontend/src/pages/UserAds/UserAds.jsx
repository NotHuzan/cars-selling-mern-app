import React from "react";
import UseCars from "../UseCars/UseCars";

const UserAds = () => {
  return (
    <>
      <h1 style={{margin: '5rem',textAlign: 'center'}}>My Ads</h1>  
      <UseCars ownerAds />
    </>
  );
};

export default UserAds;
