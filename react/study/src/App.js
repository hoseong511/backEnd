import React, { useState } from "react";
// 컴포넌트의 앞글자는 대문자.. 코드컨벤션임.
const Loading = () => <div>Loading...</div>

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setCount(count + 1)}/>{count}
      </header>
    </div>
  )
  
}


export default App;