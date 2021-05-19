import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageModel, UserModel } from 'src/app/constants';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  private _currentUser: UserModel;
  private _otherUser: UserModel;
  private _messageHistory: Array<MessageModel>;
  private $destroy = new Subject<boolean>();

  messageForm: FormGroup;
  @ViewChild('scrollableDiv', {
    static: false
  }) private messageContainer: ElementRef;

  @Input()
  set currentUser(value:UserModel) {
    this._currentUser = value;
  }

  get currentUser() {
    return this._currentUser;
  }

  get otherUser(){
    return this ._otherUser;
  }

  @Input()
  set otherUser(value: UserModel) {
    this._otherUser = value;
  }
  
  get messageHistory(): Array<MessageModel> {
    return this._messageHistory;
  }

  @Input()
  set messageHistory(value: Array<MessageModel>) {
    this._messageHistory = value;
  }
  constructor( private chatService: ChatService) { }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
    this.initHistory();
    this.handleNewMessages();
  }

  private initHistory(): void {
    this.chatService.getHistoryWith()
    .pipe(takeUntil(this.$destroy))
    .subscribe(value => {
      this.messageHistory = value || [];
      this.scrollToBottom();
      if (this.messageHistory.some(message => !message.readed)) {
        this.chatService.readMessagesWith(this._otherUser._id);
      }
    });
  }

  private handleNewMessages(): void {
    this.chatService.receiveMessage()
      .pipe(takeUntil(this.$destroy))
      .subscribe(value => {
        this.messageHistory.push(value);
        this.scrollToBottom();
        this.messageForm.reset();
      
      });
  }


  public onSubmit() {
    this.chatService.sendMessage(this.generateMessage());
  }


  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messageContainer.nativeElement.scroll({
          top: this.messageContainer.nativeElement.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }, 1);
    } catch (err) {
    }
  }

  private generateMessage(): MessageModel {
    const message: MessageModel = {
      receiverId: this.otherUser._id,
      senderId: this.currentUser._id
    };
    if (this.messageForm.controls.message.value) {
      message.message = this.messageForm.controls.message.value;
    }
    return message;
  }

  ngOnDestroy(): void {
    this.chatService.removeAllListeners();
    this.chatService.disconnect();
    this.$destroy.next(true);
    this.$destroy.complete();
  }
} 

