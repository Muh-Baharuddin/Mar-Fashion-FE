import React, { PropsWithChildren, useContext } from 'react'
import FooterComp from 'src/components/Footer/FooterComp';
import NavbarComp from './Navbar/Navbar';
import { Container } from 'react-bootstrap';

export default function GuessLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <NavbarComp />
      <div className="body flex-grow-1 px-3">
        <Container fluid="lg">
          {children}
        </Container>
      </div>
      <FooterComp/>
    </div>
  )
}
