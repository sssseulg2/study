import React, { useState } from 'react';
import axios from 'axios';
import "./Auth.css"

function Auth({history}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const enterUsername = (e) => {
        setUsername(e.target.value)
    }
    const enterPassword = (e) => {
        setPassword(e.target.value)
    }
    const enterChat = (e) => {
        e.preventDefault();
        axios.post ('http://localhost:5000/auth', {
            username: username,
            password: password
        })
        .then ((response) => {
            console.log("response.send")
            history.push({
                pathname: "/Chat",
                state: {username: username}
            })
        })
        .catch ((error) => {
            alert("로그인에 실패하셨습니다")
        })
    }
    return (
        <div className="auth-container">
            <form className="login-wrap" onSubmit={enterChat}>
                <input type="text" id="username" placeholder="이름을 입력하세요" onChange={enterUsername}></input>
                <input type="password" id="password" placeholder="비밀번호를 입력하세요" onChange={enterPassword}></input>
                <input type="submit" id="btn-submit" value="enter"/>
            </form>
        </div>
    );
}

export default Auth;