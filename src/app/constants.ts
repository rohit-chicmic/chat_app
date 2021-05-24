export const API_URL = {
    LOGIN: '/login',
    REGISTER: '/register',
    GET_USER: '/getusers'
}

export interface MessageModel {
    sender: string;
    receiver: string;
    message?: string;
    sendDate?: Date;
    readed?: boolean;
  }


  export class UserModel {

    constructor(
        public email: string, 
        public name: string = 'n/a', 
        public _id: any, 
        public newMessagesCount?: number) {
    }
  }