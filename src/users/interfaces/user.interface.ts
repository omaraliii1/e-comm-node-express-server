export interface IUser {
  _id: string;
  role: string;
  email: string;
  password: string;
  username: string;
  auth_token: string;
}

export interface loggedInUserResponse {
  _id: string;
  role: string;
  email: string;
  username: string;
  auth_token: string;
}
