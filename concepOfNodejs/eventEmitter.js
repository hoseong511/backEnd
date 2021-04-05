// 미리 정해둔 상황이 있고 그 정해둔 상황
// 특정 이벤트가 발생했을 때 일괄적으로 특정 코드를 실행시킴
'use strict'

const EventEmitter = require('events')

class ChatManager extends EventEmitter {}
const chatManager = new ChatManager()
chatManager.on('join', () => {
  console.log("new user joined");
})

chatManager.emit("join")