import React,{useState} from 'react';
import Memes from './components/Memes';
import FooterPage from "./components/layout/FooterPage";
import NavBar from './components/layout/NavBar';

function App() {
  const [page, setpage] = useState(0);
  return (
    <React.Fragment class="w-full" >
  <NavBar/>
     <Memes page={page} setpage={setpage} />
 <FooterPage  />
    </React.Fragment >
  );
}

export default App;
