import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatsPage } from "../pages/chats/chats";
import { MomentModule } from "angular2-moment";
import { MessagesPage } from "../pages/messages/messages";

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    TabsPage,
    MessagesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    TabsPage,
    MessagesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
