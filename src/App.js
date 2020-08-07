import React,{useState} from 'react';
import Memes from './components/Memes';
import {MDBNavbar,MDBNavbarBrand,MDBNavbarNav } from "mdbreact";
import FooterPage from "./components/FooterPage";

function App() {
  const [page, setpage] = useState(0);
  return (
    <div className="App">
      <MDBNavbar color="primary-color"  expand="lg" id="nav" >
      <MDBNavbarBrand>
          <strong className="white-text">Memes for life! :) </strong>
        </MDBNavbarBrand>
        <MDBNavbarNav  right>
        <a className="white-text" href="#footer">see more about me</a>
        </MDBNavbarNav>

        </MDBNavbar>
     <Memes page={page} setpage={setpage} />
 <FooterPage  />
    </div>
  );
}

export default App;
