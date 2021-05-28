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
  tFlag :boolean = false;

  messageForm: FormGroup;
  @ViewChild('scrollableDiv') private messageContainer: ElementRef;

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
    this.handleTyping();
    this.getTyping();
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

  private handleTyping(){
    let typingStatus = {};
    if(this.messageForm.controls.message.value != ''){
      typingStatus = {
        receiver: this.otherUser._id,
        sender: this.currentUser._id,
        status: true
      };
      
    }
    else {
      typingStatus = {
        receiver: this.otherUser._id,
        sender: this.currentUser._id,
        status: false
    }
  }
      this.chatService.sendTypingStatus(typingStatus);
    
  }

  private getTyping(){
    this.chatService.getTypingStatus().subscribe(res => {
      if(res.sender == this.otherUser._id){
        this.tFlag = res.status; // TODO  implement typing feature
      }
    })
  }


  public onSubmit() {
    this.chatService.sendMessage(this.generateMessage());
    this.messageForm.reset();
    this.scrollToBottom();
  }


  private scrollToBottom(): void {
    try {
      // setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      // }, 1);
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
    message.date = new Date()
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

