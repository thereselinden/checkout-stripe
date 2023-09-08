export interface IRegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
}
