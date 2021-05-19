import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { CONFIG } from '../utils/socket.config'

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Socket {

  constructor() {
    super(CONFIG);
   }

   public connectToRoomWith(otherUserId: string): void {
    this.emit('joinRoom', otherUserId);
  }

  public getHistoryWith(): Observable<Array<any>> {
    return this.fromEvent('history');
  }

  // public disconnect(): void {
  //   this.removeAllListeners();
  //   this.disconnect();
  // }

  public sendMessage(message: any) {
    this.emit('send message', message);
  }

  public receiveMessage(): Observable<any> {
    return this.fromEvent('getMessage');
  }

  readMessagesWith(otherUserId: string) {
    this.emit('readAllMessagesWith', otherUserId);
  }
}

