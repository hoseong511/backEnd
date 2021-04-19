'use strict'

const express = require('express');
const http = require('http');

class ApiServer extends http.Server {
  constructor (config) { // 동적으로 환경설정을 읽어오기
    const app = express() // 한번만 express를 생성함으로서 유일성을 보장받음.
    super(app)
    this.config = config
    this.app = app
    this.currentConns = new Set() //분산된 환경연결??
    this.busy = new WeakSet() // 무중단 배포 환경(CI/CD)에서 해당하는 서버가 종료가 될때 사용중인 커넥션을 관리하기 위해 사용
    this.stopping = false
  }

  async start() {

  }
}

const init = async(config = {}) => {
  const server = new ApiServer(config)
  return server.start();
}