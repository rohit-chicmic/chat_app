export const API_URL = {
    LOGIN: '/login',
    REGISTER: '/register',
    GET_USER: '/getusers'
}

export interface MessageModel {
    senderId: string;
    receiverId: string;
    message?: string;
    sendDate?: Date;
    readed?: boolean;
  }


  export class UserModel {

    constructor(
        public email: string, 
        public name: string, 
        public _id: any, 
        public newMessagesCount?: number) {
    }
  }