import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { UserModel, MessageModel} from 'src/app/constants';
import { urlShort } from 'src/environments/environment';
import { CONFIG } from '../utils/socket.config'

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Socket {

  constructor() {
    super({url:urlShort, options:{}});
   }

   public messageHistory: Array<MessageModel>;

  //  public connectToRoomWith(otherUserId: string): void {
  //   this.emit('joinRoom', otherUserId);
  // }

  public loggedIn(user): void{
    this.emit('loggedin', user);
  }

  // public getHistoryWith(): Observable<Array<any>> {
  //   return this.fromEvent('history');
  // }

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

  // readMessagesWith(otherUserId: string) {
  //   this.emit('readAllMessagesWith', otherUserId);
  // }
}
