export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  id?: string;
}

export interface IUserWithoutPass {
  firstname: string;
  lastname: string;
  email: string;
  id?: string;
}
