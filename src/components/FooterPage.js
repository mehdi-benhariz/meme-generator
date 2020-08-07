import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4" id="footer" >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">SOFTWARE ENGINEER </h5>
            <p>
  i'm an ambitous and hardworker tunisian software engineer aiming to enhance my level,non-stop learner!
            </p>
          </MDBCol>
          <MDBCol md="6">

          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a target="_blank" href="https://www.linkedin.com/in/mehdi-ben-hariz-8752481a4/">Mehdi Ben Hariz </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;