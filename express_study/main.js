'use strict'

const { init } = require('./server.js');
const { getConfig } = require('./lib/config')
const env = process.env.NODE_ENV

const main = async () => {
  const config = await getConfig() // 파일 형태로 존재하는 경우가 많으니깐

  const server = await init();
  server.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  })

  process.on('SIGTERM', () => server.shutdown()) // 비정상적인 작업으로 좀비 서버가 되는것을 방지
  process.on('SIGINT', () => server.shutdown())

}