## 조건문
falsy 한것과 truthy 한것들
  ```js
  false
  0
  ''
  null
  undefined
  NaN
  ```
  ```js
  true
  37
  -37
  'mark'
  {}
  []
  ```
  `` if (){ } else if () {} else {} ``
  ``` JS
  const data = n % 3 === 0

  ```
  ### 논리연산자
    &&, ||, !
    - &&: and 연산자
    - ||: or 연산자
    - !: not 연산자
  ### 논리 연산자를 이용한 조건부 실행
    표현식 && 표현식
    // 둘다 참 일때만 참이다.
    표현식은 앞에 먼저 평가하고, 뒤에를 평가한다.

    ```JS
    let n = 5;
    n % 5 === 0 && console.log('5로 나누어 떨어질때만 실행');
    // and연산자 앞 표현식이 참 일때, 뒤에 표현식이 실행됨.

    let n = 6;
    n % 5 === 0 || console.log('5로나누어떨어지지 않음');
    // or연산자 앞 표현식이 거짓일때, 뒤에 표현식이 실행됨
    ```

### 삼항연산자
```js
// 조건 ? 조건이 참이면 실행되는 표현식 : 조건이 거짓이면 실행되는 표현식
// 중괄호 {} 를 사용할 수 없는 문법이기 떄문에 하나의 표현식만 가능합니다.

let n = 8;

console.log(n % 4 === 0 ? '4의 배수입니다' : '4의 배수가 아닙니다')

// switch 뒤 괄호 안에 있는 값이 무엇인지 중괄호 안에 있는 코드들을 비교해서 실행함.
switch ( n % 5) {
  case 0: {
    console.log('5의 배수임');
    break;
  }
  default:
    console.log(n);
}
// break 와 case 문의 순서를 잘 조정하여, 원하는 코드를 만들어 낼 수 있도록 이해해야함.
n = 6
switch ( n % 5 ) {
  console.log('5의 배수입니다.');
  break;
}
case 1:
case 2:
case 3:
case 4:
  console.log('5의 배수가 아닙니다');
default:
  console.log(n);
```