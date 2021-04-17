import React from "react";
// 컴포넌트의 앞글자는 대문자.. 코드컨벤션임.
const Loading = () => <div>Loading...</div>

function App() {
  const handleClick = (e) => {
    e.stopPropagation() // 중첩시 기능이 두번 실행되는 것을 방지
    console.log('button is clicked');
  }
  const newWhandleClick = (e) => {
    e.preventDefault() // 이거는 작동이 안되는데?
    console.log('wrapper is clicked');
  }
  return (
    <div onClick={newWhandleClick}>
      <button onClick={handleClick}>this is a button</button>
    </div>
    // ?? 안되는데??.. 중첩실행되는데..
  )
}


export default App;