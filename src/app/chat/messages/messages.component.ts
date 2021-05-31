import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageModel, UserModel } from 'src/app/constants';
import { UserService } from 'src/app/services/user.service';
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
  @ViewChild('messageBox') private messageBox: ElementRef;

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
  constructor( private chatService: ChatService, private userService: UserService) { }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
    this._messageHistory = [];
    // this.initHistory(); 
    this.handleNewMessages();
    // this.handleTyping();
    this.getTyping();
    
  }

  private initHistory(): void {

    let his_with = {sender:this.currentUser._id, receiver: this.otherUser._id};
    console.log(his_with);
    
    // this.chatService.readMessagesWith(his_with); //! removed because we have to get histry with api.
    this.userService.getHistory(his_with).subscribe(value => {
      console.log(value);
      
      this._messageHistory = value || [];
      // this.scrollToBottom();
       
    });
  }

  private handleNewMessages(): void {
    this.chatService.receiveMessage()
      .subscribe(value => {
        if(value.sender == this.otherUser._id){ 
          
        this._messageHistory.push(value);}
        console.log(value)
        
        // this.scrollToBottom();
        // this.messageForm.reset();
      
      });

      this.tFlag = false;
  }

  public handleTyping(){
    let typingStatus = {};
    console.log('inside handleTyping');
    
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
      console.log(typingStatus);
      
      this.chatService.sendTypingStatus(typingStatus);

      // this.getTyping();
  }

  private getTyping(){
    this.chatService.getTypingStatus().subscribe(res => {
      console.log(res);
      
      if(res.sender == this.otherUser._id){
        this.tFlag = res.status; // TODO  implement typing feature
      }
    })
  }


  public onSubmit() {
    this.chatService.sendMessage(this.generateMessage());
    this.messageForm.reset();
    // this.clearTyping();
    // this.scrollToBottom();
  }

  // public clearTyping(){
  //   let typingStatus = {
  //     receiver: this.otherUser._id,
  //     sender: this.currentUser._id,
  //     status: false
  //   };

  //   this.chatService.sendTypingStatus(typingStatus);

  // }


  // private scrollToBottom(): void {
  //   try {
  //     // setTimeout(() => {
  //       this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  //     // }, 1);
  //   } catch (err) {
  //   }
  // }

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

