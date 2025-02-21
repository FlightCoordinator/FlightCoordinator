import React from "react";

import Image from "next/image";

import { useAuth0 } from "@auth0/auth0-react";

const UserDetails = () => {
  const { user } = useAuth0();

  return <div>{user ? <Image src={user.picture ?? ""} alt="User Profile Picture" width={20} height={20} /> : ""}</div>;
};

export default UserDetails;
