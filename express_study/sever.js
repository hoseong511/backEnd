'use strict'

const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser')

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
    this.app.use((req, res, next) => {
      this.busy.add(req.socket)
      res.on('finish', () => {
        if (this.stopping) req.socket.end()
        this.busy.delete(req.socket)
      })
      next()
    })

    this.app.use(cookieParser())

    this.app.get('/_health', (req, res) => {
      res.sendStatus(200)
    })

    this.app.use((err, req, res, next) => {
      res.status(500).send(generateApiError('Api::Error'))
    })

    this.on('connection', c => {
      this.currentConns.add(c)
      c.on('close', () => this.currentConns.delete(c))
    })

    return this
  }

  shutdown() {
    if (this.stopping) return
    this.stopping = true
    this.close(() => {
      process.exit(0)
    })

    setTimeout(() => {
      console.log('비정상적인 종료 (강제 종료)');
      process.exit(1)
    }, this.config.shutdownTimeout).unref()
  }
}

const init = async(config = {}) => {
  const server = new ApiServer(config)
  return server.start();
}