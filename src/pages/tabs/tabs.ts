import { Component } from '@angular/core';
import { ChatsPage } from "../chats/chats";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  chatsTab = ChatsPage;

  constructor() {

  }
}
