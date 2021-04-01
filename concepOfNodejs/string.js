// string, js는 유니코드를 지원함. 한글, 이모티콘 모두 인식
// string에 지원되는 3가지 메소드!
let string = 'node.js 올인원 패키지'

let isStartWith = string.startsWith('n');
let isIncludes = string.includes(',');
let isEndWith = string.endsWith('지');

const check = () => {
  if (isEndWith && isIncludes && isStartWith) {
    return true
  }
  return false
}

console.log(check());
