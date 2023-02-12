import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const NavbarComp = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/MarFashion.png" alt="logo" width={50} height={50}/>
          <Link className="navbar-brand" href='/' legacyBehavior>
            <strong className="ms-3">MAR Fashion</strong>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
