import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { MessageModel, UserModel } from '../constants';
import { UserService } from '../services/user.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public $users: Observable<any>;
  public currentUser;
  public messageHistory: Array<MessageModel>;
  public chatWithUser: UserModel;
  pr = false;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.chatService.loggedIn(JSON.parse(localStorage.getItem('data')))
    this.initUsers();
    this.initCurrentUser();
    this.router.onSameUrlNavigation;
  }

  private initUsers() {
    this.chatService.getUpdatedUser().subscribe(data => {
      this.$users = data;
      console.log(data);
      
    })
  }

  public startChatWith(user: UserModel): void {
    this.chatWithUser = user;
  }

  private initCurrentUser() {
   this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }


  profileTogle(){
    this.pr = !this.pr;
  }

  ngOnDestroy(): void {
  }
}

