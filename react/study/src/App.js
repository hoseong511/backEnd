import React from "react";
// 컴포넌트의 앞글자는 대문자.. 코드컨벤션임.
const Loading = () => <div>Loading...</div>

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false
    }
  }

  // 조건문을 사용하지 않고 상태 이용하기
  comment () {
    const con = 1
    const res = con > 0 ? true : false;
    // const and = loading && (<div>loading...</div>) 
  }
  render() {
    const { loading } = this.state
    return (
      <>
        {
           loading && <Loading /> // 노드 시간에 했던 내용임. 
           // 하나의 조건을 충족시킬때 이용하는 방법 앞쪽이 True여야 뒤가 실행
           // || 는 앞이 false여야 뒤를 실행 앞이 true이면 뒤 실행 x
        }
      </>
    )
  } 
}

export default App;