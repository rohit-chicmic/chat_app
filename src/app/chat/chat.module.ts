import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatService } from './services/chat.service';
import { UserSocketService } from './services/user-socket.service';
import { DatePipe } from './utils/date.pipe';
import { SocketIoModule } from 'ngx-socket-io';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from '../services/interceptor.service';



@NgModule({
  declarations: [
    ChatComponent,
    UserComponent,
    MessageComponent,
    MessagesComponent,
    DatePipe,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    SocketIoModule
  ],
  providers: [ChatService, UserSocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }]
})
export class ChatModule { }
