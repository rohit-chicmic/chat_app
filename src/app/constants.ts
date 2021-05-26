export const API_URL = {
    LOGIN: '/login',
    REGISTER: '/register',
    GET_USER: '/getusers',
    AVATAR: '/profileimage'
}

export interface MessageModel {
    sender: string;
    receiver: string;
    message?: string;
    date?: Date;
    readed?: boolean;
  }


  export class UserModel {

    constructor(
        public email: string, 
        public name: string, 
        public _id: any, 
        public newMessagesCount?: number,
        public profileLink?: string,
        public isOnline?: boolean
        ) {
    }
  }