import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const NavbarComp = (props: {isLogin: boolean}) => {
  const { isLogin } = props;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Link className="navbar-brand" href='/guess'>
            <Image src="/MarFashion.png" alt="logo" width={50} height={50}/>
            <strong className="ms-3">MAR Fashion</strong>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href={'/guess'} className="nav-link">
              Beranda
            </Link>
            <Link href={'/toko'} className="nav-link">
              Toko
            </Link>
            {isLogin ? 
              <Link href={'/login'} className="nav-link">
              Login
              </Link> : <Link href={'/'} className="nav-link">
              Dashboard
              </Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
