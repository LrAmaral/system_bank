export interface RegisterUser {
  id: string;
  username: string;
  password: string;
  email: string;
  cpf: string;
  createdAt?: string;
  accountNumber?: string;
  balance: number;
  accountType?: string;
  accountStatus?: string;
}
