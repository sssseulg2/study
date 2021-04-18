import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  usernamePlaceHolder:string="이름을 입력하세요"
  passwordPlaceHolder:string="비밀번호를 입력하세요"

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }
  login() {
    console.log("username: " + this.username);
    console.log("password: " + this.password);
    axios.post('http://localhost:3030/auth', {
      username: this.username,
      password: this.password
    })
    .then ((response) => {
      console.log(response.data)
      if (response.data=='성공'){
        sessionStorage.setItem("username", this.username);
        this.router.navigateByUrl('chat');
      }
      else {
        alert("로그인 실패!");
      }
    });

  }

}
