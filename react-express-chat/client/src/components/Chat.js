import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import socketio from 'socket.io-client'
import "./Chat.css"

const socket = socketio.connect('http://localhost:5000',{transports:['websocket']});
socket.on ('connect', () => {    
    console.log('connect')
});
function Chat () {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const username = location.state.username;
    const chatview = document.getElementsByClassName("chat-view")[0];
    const enterMessage = (e) => {
        setMessage(e.target.value);
    };
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', { 
                username, message 
            })
        }
        document.getElementsByName('message').value = "";
    };

    useEffect(() => {
        socket.on ('updateMessage', (data) => {
            const messageWrap = drawChat(data);
            document.getElementsByClassName('chat-view')[0].appendChild(messageWrap);
        })
        return;
    }, [])

    const drawChat = (data) => {
        const messageWrap = document.createElement('div');
        const name = document.createElement('div');
        const message = document.createElement('div');

        messageWrap.classList.add('message-wrap');
        name.innerText = data.username;
        name.classList.add('message-usernamae');
        message.innerText = data.message;
        message.classList.add('message');

        if(data.username === username) {
            messageWrap.classList.add('my-message');
        }
        else {
            messageWrap.classList.add('your-message');
        }

        messageWrap.appendChild(name);
        messageWrap.appendChild(message);
        return messageWrap;
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                Chat 
            </div>
            <div className="chat-view">
            </div>
            <form className="enter-form" onSubmit={sendMessage}>
                <input type="text" id="message" onChange={enterMessage}/>
                <input type="submit" value="Send" id="send" />
            </form>
        </div>
    );
}

export default Chat;