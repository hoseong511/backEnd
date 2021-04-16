// 생성자 함수를 이용하여 새로운 객체를 만들어 내는 방법

function Person(name, age) {
  console.log(this);
  this.name =name;
  this.age = age;
}

const p = new Person('Ho', 37);

console.log(p, p.name, p.age);

// arrow function 안에서는 this가 생기지 않음

const Cat = (name, age) => {
  console.log(this);
  this.name = name;
  this.age = age;
};

// const c = new Cat('ho', 1);

//  함수를 호출하면 함수를 만들어서 리턴

function plus(base) {
  return function(num) {
    return base + num;
  }
}

const plus5 = plus(5);
console.log(plus5(7));

// 함수를 인자로 하여 함수를 호출
function hello(c) {
  console.log('hello');
  c();
}

hello(function() {
  console.log('콜백');
})