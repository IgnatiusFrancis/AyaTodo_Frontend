import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Buttons from "./Buttons";

function NavBar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Buttons />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
