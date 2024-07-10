import React from "react";
import UseCars from "../UseCars/UseCars";

const UserAds = () => {
  return (
    <div>
      <h1 style={{margin: '3rem 0',textAlign: 'center'}}>My Ads</h1>  
      <UseCars ownerAds />
    </div>
  );
};

export default UserAds;
