interface UserEntity {
  name: string;
  email: string;
  password: string;
}

interface UserEntityResponse {
  token?: string;
  user?: UserEntity;
  email?: string;
  password?: string;
  message?: string;
  error?: {
    message?: string;
  };
}
