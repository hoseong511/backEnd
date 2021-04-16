// 생성자 함수
function A(){}

const a = new A();
console.log(a, typeof a);

console.log(A());

// 생성하면서 데이터 넣기
function B(name, age) {
  console.log(name, age);
}

const b = new B();
const c = new B('Song', 22);
console.log(B());

// 객체에 속성(property) 추가하기
// 값을 속성으로 넣기

function A() {
  this.name = 'ho';
}
const a1 = new A(); // {name: '', age: ''}
console.log(a1);

// 함수를 속성으로 넣기
function B() {
  this.hello = function() {
    console.log('hellossss');
  }
}

new B().hello()

//new Function() 표준내장객체!!

// new Object -> 비추천..

const a2 = new Object();

console.log(a2, typeof a2);

const a3 = new Object(true);

console.log(a3, typeof a3);

const a4 = new Object({name:'ho'})
console.log(a4, typeof a4);

// prototyp

function Person(name, age) {
  this.name = name;
  this.age = age;
  // this.hello = function() {
  //   console.log('hello', this.name, this.age);
  // };
}
Person.prototype.hello = function() {
  console.log('hello', this.name, this.age);
}
const p = new Person('Ho', 22);

p.hello();
console.log(p.toString());

console.log(Person.prototype);
console.log(Person.prototype.toString);
console.log(Person.prototype.constructor);
console.log(Person.prototype.hello);

console.log(Object.prototype);
console.log(Object.prototype.toString);
console.log(Object.prototype.constructor);

console.log(p instanceof Person);
console.log(p instanceof Object);