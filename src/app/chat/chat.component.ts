import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { MessageModel, UserModel } from '../constants';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public $users: Observable<Array<UserModel>> = from([]);
  public currentUser: UserModel;
  public messageHistory: Array<MessageModel>;
  public chatWithUser: UserModel;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initUsers();
    this.initCurrentUser();
  }

  private initUsers() {
    this.$users = this.route.data
      .pipe(map(data => {
      const value = data.users;
      if (value.length > 0) {
        this.chatWithUser = value[0];
      }
      return value;
    }), catchError(err => {
      console.log(err);
      return err;
    }));
  }

  public startChatWith(user: UserModel): void {
    this.chatWithUser = user;
  }

  private initCurrentUser() {
   this.userService.getCurrentUser()
     .pipe(take(1))
     .subscribe(value => {
     this.currentUser = value;
   });
  }

  logout() {
    localStorage.clear();
  }

  ngOnDestroy(): void {
  }
}

