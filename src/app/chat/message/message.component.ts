import { Component, Input, OnInit } from '@angular/core';
import { MessageModel, UserModel } from 'src/app/constants';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private _currentUser: UserModel;
  private _otherUser: UserModel;
  private _message: MessageModel;

  @Input()
  set currentUser(value: UserModel) {
    this._currentUser = value;
  }

  get currentUser() {
    return this._currentUser;
  }

  get otherUser() {
    return this._otherUser;
  }

  @Input()
  set otherUser(value:UserModel){
    this._otherUser = value;
  }

  @Input()
  set message(value:MessageModel) {
    this._message = value;
  }

  get message(){
    return this._message;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
