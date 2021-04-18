import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message: string;
  messages: any [] = [];
  username: any = sessionStorage.getItem("username");
  constructor(private socket: Socket, private toastCtrl: ToastController) { 
  }

  ngOnInit() {
    console.log(this.username)

    this.socket.connect();
    let name = this.username;
    this.socket.emit('newUser', name);

    this.socket.fromEvent('userChange').subscribe(data => {
    let chat = data;
    this.messages.push(chat);
  });
  this.socket.fromEvent('newChat').subscribe(data => {
    let chat = data;
    this.messages.push(chat);
  });
  };

  send() {
    if(this.message) {
      this.socket.emit('send', {
        message: this.message
      });
    }
    this.message='';
  }


  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
