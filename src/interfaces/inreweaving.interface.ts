export interface Interweaving {
  id: number;
  user_id: number;
  role_id: number;
  program_id: number;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    photo: string;
    password: string;
  };
  role: {
    id: number;
    name: string;
  };
  program: {
    id: number;
    name: string;
    description: string;
    photo: string;
    date: string;
    content: String[];
  };
}
