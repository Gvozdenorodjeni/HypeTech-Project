export interface AdminContextType {
  registered: string | null;
  current: string | null;
}

export interface User {
  email: string;
  id: number;
  name: string;
  address?: {
    city?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
    street?: string;
    suite?: string;
    zipcode?: string;
  };
  company?: {
    bs?: string;
    catchPhrase?: string;
    name?: string;
  };
  phone?: string;
  username?: string;
  website?: string;
}

export interface UserContextType {
  data: User[];
  loading: boolean;
  loaded: boolean;
}
