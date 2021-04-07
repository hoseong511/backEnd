'use strict'
// 객체나 함수가 있을때 그대로 복사해서 새로운함수나 반환????????????????
// 프로토타입 새로운 함수를 만드는데 편리한 기능

function fullstack(backend, frontend) {
  this.backend = backend
  this.frontend = frontend

  fullstack.prototype.getBackend = () => this.backend
  fullstack.prototype.setBackend = () => this.backend = backend
  
  fullstack.prototype.getFrontend = () => this.frontend
  fullstack.prototype.setFrontend = () => this.frontend = frontend

}

const Fullstack = new fullstack('javascript', 'js')
Fullstack.getBackend()
Fullstack.getFrontend()