import logo from './logo.svg';
import './App.css';

const Head = props => <h1>{props.title}</h1>

function App() {
  return (    
    <>
      <Head title="this is a title" name="this is a name"></Head>
      <Head title="this is a title" name="this is a name"></Head>
    </> // 표현하고자 하는 데이터를 넘기고 싶을때 이용하자
    // 2가지 이상의 컴포넌트를 전달할 때 wrapper를 이용!
    // 아무것도 지정하지 않는 것을 flagment라 함.
  );
}

export default App;
