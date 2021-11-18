import React, { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";
import { Loading } from "../..";
import AdminLayout from "../../../AdminComponent/AdminLayout";
import UserLayout from "../../../UserComponent/UserLayout";

const AuthLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setUser(await Auth.currentAuthenticatedUser());
    };
    getUser();
  }, []);
  if (!user) {
    return <Loading />;
  }
  if (
    user?.signInUserSession?.idToken?.payload?.["cognito:groups"]?.includes(
      "Admin"
    )
  ) {
    return <AdminLayout />;
  }
  return <UserLayout />;
};

export default AuthLayout;
