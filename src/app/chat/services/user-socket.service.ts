import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { CONFIG_FOR_USER } from '../utils/socket.config';
import { MessageModel, UserModel } from '../../constants'
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserSocketService extends Socket{

  constructor(private userService: UserService) { 
    super(CONFIG_FOR_USER);
  }

  // public newMessage(): Observable<MessageModel> {
  //   return this.userService.getCurrentUser().pipe(take(1), exhaustMap(value =>
  //     (this.fromEvent<MessageModel>('notification' + value._id))
  //     ));
  // }
}
