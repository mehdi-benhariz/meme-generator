import React,{useState} from 'react';
import './App.css';
import Meme from './components/Meme';

function App() {
  const [page, setpage] = useState(0);
  return (
    <div className="App">
     <Meme page={page} setpage={setpage} />
     <button onClick={()=>page>=0?setpage(page-1):null} >Previous</button>
                 {page+1}
      <button onClick={()=>page<100?setpage(page+1):null} >Next</button>
    </div>
  );
}

export default App;
