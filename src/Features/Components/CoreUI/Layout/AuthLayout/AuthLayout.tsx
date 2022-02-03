import React, { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";
import { Loading } from "../..";
import AdminLayout from "../../../AdminComponent/AdminLayout";
import UserLayout from "../../../UserComponent/UserLayout";
import { AddCompanyName } from "../../../AdminComponent/AddCompanyName";

const AuthLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      console.log(
        "await Auth.currentAuthenticatedUser()",
        await Auth.currentAuthenticatedUser()
      );
      setUser(await Auth.currentAuthenticatedUser());
    };
    getUser();
  }, []);
  if (!user) {
    return <Loading />;
  }
  console.log(
    '!!user?.signInUserSession?.idToken?.payload?.["custom:registeredName"]',
    !user?.signInUserSession?.idToken?.payload?.["custom:registeredName"],
    user?.signInUserSession?.idToken?.payload?.["cognito:groups"]?.includes(
      "Admin"
    )
  );
  if (
    user?.signInUserSession?.idToken?.payload?.["cognito:groups"]?.includes(
      "Admin"
    ) &&
    !user?.signInUserSession?.idToken?.payload?.["custom:registeredName"]
  ) {
    return <AddCompanyName setUser={setUser} />;
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
