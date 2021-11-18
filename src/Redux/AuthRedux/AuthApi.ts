import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  ChangePasswordFieldType,
  CompleteNewPasswordFieldType,
  LoginFieldType,
  ResetPasswordFieldType,
} from "../../Utils/types";
import { AxiosResponse } from "axios";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { ResponseTypeSelfInfo } from "./AuthTypes";
import { gqlQuerySelfInfo } from "./AuthQuery";

const changePasswordApi = async ({
  oldPassword,
  password,
}: ChangePasswordFieldType): Promise<"SUCCESS"> => {
  const user = await Auth.currentAuthenticatedUser();
  if (user) return Auth.changePassword(user, oldPassword, password);
  else return Auth.signOut();
};

const completeNewPasswordApi = ({
  password,
  user,
}: CompleteNewPasswordFieldType): Promise<AxiosResponse> => {
  return Auth.completeNewPassword(user, password);
};

const forgotPasswordApi = ({
  email,
}: {
  email: string;
}): Promise<AxiosResponse> => {
  return Auth.forgotPassword(email);
};

const resetPasswordApi = ({
  email,
  otp,
  password,
}: ResetPasswordFieldType): Promise<string> => {
  return Auth.forgotPasswordSubmit(email, otp, password);
};

const signInApi = ({
  email,
  password,
}: LoginFieldType): Promise<AxiosResponse> => {
  return Auth.signIn(email, password);
};

const signOutApi = (): Promise<AxiosResponse> => {
  localStorage.clear();
  return Auth.signOut();
};

const selfInfoApi = async (): Promise<GraphQLResult<ResponseTypeSelfInfo>> =>
  API.graphql(graphqlOperation(gqlQuerySelfInfo)) as Promise<
    GraphQLResult<ResponseTypeSelfInfo>
  >;

export {
  changePasswordApi,
  completeNewPasswordApi,
  forgotPasswordApi,
  resetPasswordApi,
  signInApi,
  signOutApi,
  selfInfoApi,
};
