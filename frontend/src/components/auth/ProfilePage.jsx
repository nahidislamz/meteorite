import React from "react";
import axiosInstance from "../../Axios";

const ProfilePage = () => {
  const handleClick = async () => {
    const response = await axiosInstance.get("protected/");
    alert(JSON.stringify(response.data));
  };
  return (
    <div>
      <h1>Profile page</h1>
      <p>Only logged in users should see this</p>
      <button onClick={handleClick}>GET protected</button>
    </div>
  );
};

export default ProfilePage;