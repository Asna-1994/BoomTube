

export interface User { 
    _id? : string
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: Date;
    password: string;
wallet : number
    createdAt: Date;
    updatedAt: Date;
}

export interface registerData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: Date | string;
    password: string;

  }
