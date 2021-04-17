import React from "react";
// 컴포넌트의 앞글자는 대문자.. 코드컨벤션임.
const Loading = () => <div>Loading...</div>

class App extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){

  }
  
  render() {
    return(<></>)   //setstate 변경 x
  }

  componentDidMount() {
  
  }

  componentWillUnmount() { //setstate 변경 x

  }
}

export default App;