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
  
  render() {
    const { loading } = this.state
    if (loading) return <Loading />
    return <Loading/>
  } 
}

export default App;