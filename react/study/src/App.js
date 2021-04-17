import React from "react";
// 컴포넌트의 앞글자는 대문자.. 코드컨벤션임.
const Loading = () => <div>Loading...</div>

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lang: 'javascript',
      data: new Date()
    }
  }  
  render() {
    const { lang, date } = this.state
    return(
    <>
      <div>{lang}</div>
      <div>{date}</div>
    </>
    )   
  }

  componentDidMount() {
  
  }

  componentWillUnmount() { //setstate 변경 x

  }
}

export default App;