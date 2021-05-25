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
  _messageHistory : Array<any> = [];
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
    // if (!(this._otherUser == value)){
    //   this._messageHistory.length = 0
    // }

    this._otherUser = value;
    this.initHistory();

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
    this._messageHistory = [];
    // this.initHistory(); 
    
    this.handleNewMessages();
  }

  private initHistory(): void {

    let his_with = {sender:this.currentUser._id, receiver: this.otherUser._id};
    console.log(his_with);
    
    this.chatService.readMessagesWith(his_with);
    this.chatService.getHistoryWith()
    .pipe(takeUntil(this.$destroy))
    .subscribe(value => {
      console.log(value);
      
      this._messageHistory = value || [];
      this.scrollToBottom();
      
        
      
    });
  }

  private handleNewMessages(): void {
    this.chatService.receiveMessage()
      .subscribe(value => {
        if(value.sender == this.otherUser._id){ 
        this._messageHistory.push(value);}
        console.log(value)
        this.scrollToBottom();
        this.messageForm.reset();
      
      });
  }


  public onSubmit() {
    this.chatService.sendMessage(this.generateMessage());
    this.messageForm.reset();
  }


  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messageContainer.nativeElement.scroll({
          bottom: this.messageContainer.nativeElement.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }, 1);
    } catch (err) {
    }
  }

  private generateMessage(): MessageModel {
    const message: MessageModel = {
      receiver: this.otherUser._id,
      sender: this.currentUser._id
    };
    if (this.messageForm.controls.message.value) {
      message.message = this.messageForm.controls.message.value;
    }
    console.log(this._messageHistory);
    
    this._messageHistory.push(message)

    return message;
  }

  ngOnDestroy(): void {
    this.chatService.removeAllListeners();
    this.chatService.disconnect();
    this.$destroy.next(true);
    this.$destroy.complete();
  }
} 

