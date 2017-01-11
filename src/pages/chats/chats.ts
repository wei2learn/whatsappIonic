import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment'
import { Observable } from 'rxjs'
import { Chat } from "api/models/whatsapp-models";
import { Chats, Messages } from "api/collections/whatsapp-collections";

/*
  Generated class for the Chats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'chats.html'
})
export class ChatsPage {
  chats: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.chats = this.findChats();
  }

  ngOnInit() {
    this.chats = Chats
      .find({})
      .mergeMap((chats: Chat[]) =>
        Observable.combineLatest(
          ...chats.map((chat: Chat) =>
            Messages
              .find({chatId: chat._id})
              .startWith(null)
              .map(messages => {
                if (messages) chat.lastMessage = messages[0];
                return chat;
              })
          )
        )
      ).zone();
  }

//  private findChats(): Observable<any[]> {
//     return Observable.of([
//       {
//         _id: '0',
//         title: 'Ethan Gonzalez',
//         picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
//         lastMessage: {
//           content: 'You on your way?',
//           createdAt: moment().subtract(1, 'hours').toDate()
//         }
//       },
//       {
//         _id: '1',
//         title: 'Bryan Wallace',
//         picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
//         lastMessage: {
//           content: 'Hey, it\'s me',
//           createdAt: moment().subtract(2, 'hours').toDate()
//         }
//       },
//       {
//         _id: '2',
//         title: 'Avery Stewart',
//         picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
//         lastMessage: {
//           content: 'I should buy a boat',
//           createdAt: moment().subtract(1, 'days').toDate()
//         }
//       },
//       {
//         _id: '3',
//         title: 'Katie Peterson',
//         picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
//         lastMessage: {
//           content: 'Look at my mukluks!',
//           createdAt: moment().subtract(4, 'days').toDate()
//         }
//       },
//       {
//         _id: '4',
//         title: 'Ray Edwards',
//         picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
//         lastMessage: {
//           content: 'This is wicked good ice cream.',
//           createdAt: moment().subtract(2, 'weeks').toDate()
//         }
//       }
//     ]);
//   }

  removeChat(chat: Chat): void {
    this.chats = this.chats.map<Chat[]>(chatsArray => {
      const chatIndex = chatsArray.indexOf(chat);
      chatsArray.splice(chatIndex, 1);
      return chatsArray;
    });
  }  

}
