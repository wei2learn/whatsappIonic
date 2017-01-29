import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Chat } from "api/models/whatsapp-models";
import { Chats, Messages } from "../../../api/collections/whatsapp-collections";
import * as moment from 'moment';
import { NavController } from "ionic-angular";
import { MessagesPage } from "../messages/messages";

/*
  Generated class for the Chats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'chats.html'
})
export class ChatsPage implements OnInit {
  chats;

  constructor(private navCtrl: NavController) {
    // this.chats = this.findChats();
  }

  ngOnInit() {
    // Messages.find({chatId: "fmGiokhJnjBRHWjX3"}).subscribe(console.log)

    // Messages.find({}).subscribe(console.log)

    this.chats = Chats
      .find({})
      // .do()
      // .do(console.log)
      .map(chats => {
        // console.log(chats)

        chats.map((chat: Chat) => {
          // console.log(chat)
          Messages.find(
            { chatId: chat._id },
            {
              sort: {
                createdAt: -1
              },
              limit: 1
            })
            // .subscribe(console.log)
            // .subscribe(messages => {
            .forEach(messages => {

              console.log(chat._id, messages)
              chat.lastMessage = messages;
            })
          return chat

        })
        return chats
      })


    // this.chats = Chats
    //   .find({})
    //   // .do(console.log)
    //   .mergeMap((chats: Chat[]) =>
    //     Observable.combineLatest(
    //       ...chats.map((chat: Chat) =>
    //         Messages
    //           .find({chatId: chat._id})
    //               .do(console.log)

    //           // .startWith(null)
    //           .map(messages => {
    //             if (messages) chat.lastMessage = messages[0];
    //             return chat;
    //           })
    //       )
    //     )

    //   ).zone()
    // .do(console.log);
  }
  showMessages(chat): void {
    this.navCtrl.push(MessagesPage, {chat});
  }
 
  // private findChats(): Observable<any[]> {
  //   return Observable.of([
  //     {
  //       _id: '0',
  //       title: 'Ethan Gonzalez',
  //       picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
  //       lastMessage: {
  //         content: 'You on your way?',
  //         createdAt: moment().subtract(1, 'hours').toDate()
  //       }
  //     },
  //     {
  //       _id: '1',
  //       title: 'Bryan Wallace',
  //       picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
  //       lastMessage: {
  //         content: 'Hey, it\'s me',
  //         createdAt: moment().subtract(2, 'hours').toDate()
  //       }
  //     },
  //     {
  //       _id: '2',
  //       title: 'Avery Stewart',
  //       picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
  //       lastMessage: {
  //         content: 'I should buy a boat',
  //         createdAt: moment().subtract(1, 'days').toDate()
  //       }
  //     },
  //     {
  //       _id: '3',
  //       title: 'Katie Peterson',
  //       picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
  //       lastMessage: {
  //         content: 'Look at my mukluks!',
  //         createdAt: moment().subtract(4, 'days').toDate()
  //       }
  //     },
  //     {
  //       _id: '4',
  //       title: 'Ray Edwards',
  //       picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
  //       lastMessage: {
  //         content: 'This is wicked good ice cream.',
  //         createdAt: moment().subtract(2, 'weeks').toDate()
  //       }
  //     }
  //   ]);
  // }

  // removeChat(chat: Chat): void {
  //   this.chats = this.chats.map<Chat[]>(chatsArray => {
  //     const chatIndex = chatsArray.indexOf(chat);
  //     chatsArray.splice(chatIndex, 1);
  //     return chatsArray;
  //   });
  // }  

}
