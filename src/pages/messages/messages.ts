import {Component, OnInit, OnDestroy, ElementRef} from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { Chat, Message } from "api/models/whatsapp-models";
import { Messages } from "../../../api/collections/whatsapp-collections";
import { Observable} from "rxjs";
import { MeteorObservable } from "meteor-rxjs";
 

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "messages-page",
  templateUrl: "messages.html"
})
export class MessagesPage implements OnInit, OnDestroy {
  selectedChat: Chat;
  title: string;
  picture: string;
  messages: Observable<Message[]>;
  message: string = "";
  autoScroller: MutationObserver;


  constructor(navParams: NavParams, element: ElementRef) {
    this.selectedChat = <Chat>navParams.get('chat');
    this.title = this.selectedChat.title;
    this.picture = this.selectedChat.picture;
    console.log("Selected chat is: ", this.selectedChat);
  }
   private get messagesPageContent(): Element {
    return document.querySelector('.messages-page-content');
  }
 
  private get messagesPageFooter(): Element {
    return document.querySelector('.messages-page-footer');
  }
 
  private get messagesList(): Element {
    return this.messagesPageContent.querySelector('.messages');
  }
 
  private get messageEditor(): HTMLInputElement {
    return <HTMLInputElement>this.messagesPageFooter.querySelector('.message-editor');
  }
 
  private get scroller(): Element {
    return this.messagesList.querySelector('.scroll-content');
  }
 
  ngOnInit() {
     let isEven = false;
 
    this.messages = Messages.find(
      {chatId: this.selectedChat._id},
      {sort: {createdAt: 1}}
    ).map((messages: Message[]) => {
      messages.forEach((message: Message) => {
        message.ownership = isEven ? 'mine' : 'other';
        isEven = !isEven;
      });
 
      return messages;
    });
    this.autoScroller = this.autoScroll();
    
  }
  ngOnDestroy() {
    this.autoScroller.disconnect();
  }  
  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode == 13) {
      this.sendMessage();
    }
  }
 
  sendMessage(): void {
    MeteorObservable.call('addMessage', this.selectedChat._id, this.message).zone().subscribe(() => {
      this.message = '';
    });
  }  
  autoScroll(): MutationObserver {
    const autoScroller = new MutationObserver(this.scrollDown.bind(this));
 
    autoScroller.observe(this.messagesList, {
      childList: true,
      subtree: true
    });
 
    return autoScroller;
  }
 
  scrollDown(): void {
    this.scroller.scrollTop = this.scroller.scrollHeight;
    this.messageEditor.focus();
  }  
}
