import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { UserModel, MessageModel, TypingModel} from 'src/app/constants';
import { urlShort } from 'src/environments/environment';
import { CONFIG } from '../utils/socket.config'

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Socket {

  constructor() {
    // super({url:urlShort, options:{}});
    super(CONFIG);
   }

   public messageHistory: Array<MessageModel>;

  //  public connectToRoomWith(otherUserId: string): void {
  //   this.emit('joinRoom', otherUserId);
  // }

  public loggedIn(user): void{
    this.emit('loggedin', user);
  }

  public  getHistoryWith(): Observable<Array<any>> {
    
    return this.fromEvent('getMessages');
  }

  public getUpdatedUser(): Observable<any>{
    return this.fromEvent('updateUserList');
  }

  public sendMessage(message: any) {
    this.emit('chatMessage', message);
    console.log(message);
    
  }

  public receiveMessage(): Observable<any> {
    return this.fromEvent('message');

  }

  readMessagesWith(otherUserId: any) {
    this.emit('getHistory', otherUserId);
  }

  public sendTypingStatus(data){
    this.emit('typing', data);
  }

  public getTypingStatus(): Observable<TypingModel>{
    return this.fromEvent('getTyping');
  }
}

