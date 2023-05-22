
export interface user {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    phone: number;
    role: string;
    address: string;
  }

export interface IIS {
    loading?: boolean;
    users: user[] | any;
    error: string;
  }

  // enums
export enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber",
  }


  // customer
  export interface customer {
    id?: number,
    name: string,
    website: string,
    address: string,
    userid?: number
  }

