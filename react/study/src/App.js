import React from "react";
// 컴포넌트의 앞글자는 대문자.. 코드컨벤션임.
const Loading = () => <div>Loading...</div>

function App() {
  const iter = [0,1,2]
  return (
    <div>
      { // ui 라이브러리에서는 변경된 부분만 업데이트 하기위해서 가상DOM을 이용
        iter.map(item => <h1 key={item}>item</h1>)
      }  
      {/* 가상DOM을 구분하기 위해서 무조건 key를 필요로 함 데이터 중복성을 방지하기 위해서 꼭 지정해야함 
          또 주의해야할점 반복문에서 이용되는 index를 이용*/}
    </div>
    
  )
  const handleClick = (e) => {
    e.stopPropagation() // 중첩시 기능이 두번 실행되는 것을 방지
    console.log(e);
    console.log('button is clicked');
  }
  const newWhandleClick = (param) => {
    // e.preventDefault() // 이거는 작동이 안되는데?
    console.log(param);
    console.log('wrapper is clicked');
  }
  return (
    <div onClick={() => newWhandleClick('test')}>
      <button onClick={handleClick}>this is a button</button>
    </div>
    // ?? 안되는데??.. 중첩실행되는데..
  )
}


export default App;