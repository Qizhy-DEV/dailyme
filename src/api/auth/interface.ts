export interface IUser {
  id: string;
  email: string;
  fullName: string;
  password: string;
  avatar: string;
  auth: {
    emailVerified: boolean;
    verifyCode: string;
  };
}
