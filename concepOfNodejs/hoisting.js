// hoisting 생성 및 실행 단계가 어떻게 실행되는지에 대해서 
// 코드를 실행하면 함수 먼저 메모리에 저장함!! 호이스팅의 특징.
say('hi')
function say(word){
  console.log(word);
}