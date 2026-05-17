export interface User {
  id: number;
  name: string;
  surname: string;
  birthday: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    position: string;
  };
  avatar?: string;
}
