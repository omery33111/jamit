




export interface Register {
  username: string;
  password: string;
  confirmPassword?: string;
  instrument: string;
}


export interface Login {
  username: string;
  password: string;
}


export interface MyToken {
  username: string;
  is_admin: boolean;
}
