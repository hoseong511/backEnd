// node.green
// ES2015 = ES6
// ES2016 = ES7
// ES2017 = ES8
// ES2018 = ES9
'use strict'
// class를 이용하면 orm에 접근하기가 쉽다.

// 데이터 일관성??

// 클래스가 하나만 생성?(싱글턴)
class Robot {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name}`)
  }
}

const r = new Robot('hi')

const cache = new CacheManger()