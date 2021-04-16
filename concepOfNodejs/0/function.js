// new Function(/* 인자1, 인자2, ..., 함수의 바디 */)
// 생성자 방식!
const sum = new Function( 'a', 'b' ,'c', 'return a + b + c');

console.log(sum(1,2,3));
// 함수 선언 방식은 아니다 그래서 호이스팅 x

global.a = 0
{
  const a = 1;

  const test = new Function('return a');
  console.log(test());  
}

// 두가지 표현에 대한 차이!
{
  const a = 2;

  const test = function(){
    return a;
  };

  console.log(test());
}

// arrow 함수를 만들어 이름이 hello1 인 변수에 할당

const hello1 = ( ) => {
  console.log('hello1');
}

// 함수의 매개변수
// 함수를 호출할 때 값을 지정

// 매개변수가 하나일 떄, 괄호 생략 가능

const hello2 = name => {
  console.log('hello2', name);
}

const hello3 = (name, age) =>{
  console.log('hello3', name, age);

};

// 함수의 리턴
const hello4 = name => {
  return `hello4 ${name}`;
};

const hello5 = name => `hello5 ${name}`;
console.log(hello5('ho'));
