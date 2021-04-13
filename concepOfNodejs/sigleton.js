// singleton 패턴
// config 파일의 객체를 만들 때 이용
// 단일성! 최초 한번 만 생성
// 요청이 일어날 때 마다 계속 생성되는것을 방지하는 디자인 패턴이다.
'use strict'

class CacheManager {
  constructor() {
    if(!CacheManager.instance){
      this._cache = []
      CacheManager.instance = this
    }
    return CacheManager.instance
  }
}
const inst = new CacheManager()
Object.freeze(inst)

// 마지막 설명이 굉장히 빈약해... 그래서 뭐 어떻게 이용되는지를 조금더 보여주면 좋을거 같은데 말이지.
