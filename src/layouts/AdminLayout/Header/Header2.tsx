import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { Button, Container } from 'react-bootstrap'
import HeaderProfileNav from './HeaderProfileNav'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

type HeaderProps = {
  toggleSidebar: () => void;
  toggleSidebarMd: () => void;
}

export default function Header2(props: HeaderProps) {
  const { toggleSidebar, toggleSidebarMd } = props

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <header className="header sticky-top mb-4 p-2 border-bottom">
    //   <Container fluid className="header-navbar d-flex align-items-center">
    //     <Button
    //       variant="link"
    //       className="header-toggler d-md-none px-md-0 me-md-3 rounded-0 shadow-none"
    //       type="button"
    //       onClick={toggleSidebar}
    //     >
    //       <FontAwesomeIcon icon={faBars} />
    //     </Button>
    //     <Button
    //       variant="link"
    //       className="header-toggler d-none d-md-inline-block px-md-0 me-md-3 rounded-0 shadow-none"
    //       type="button"
    //       onClick={toggleSidebarMd}
    //     >
    //       <FontAwesomeIcon icon={faBars} />
    //     </Button>
    //     <Link href="/" className="header-brand d-md-none">
    //       <svg width="118" height="46">
    //         <title>Mar Fashion</title>
    //         <use xlinkHref="/assets/brand/marFashion.svg#full" />
    //       </svg>
    //     </Link>
    //     <div className="header-nav">
    //       <HeaderProfileNav />
    //     </div>
    //   </Container>
    //   <div className="header-divider border-top my-2 ms-n2 me-n2" />
    // </header>
  )
}
