import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import NavbarComp from "src/components/Navbar/NavbarComp";
import React from "react";
import CardComp from "src/components/Cards/Cards";

const TokoPage = () => {
  const [login, setLogin] = React.useState(false);
  
  return (
    <div>
      <NavbarComp isLogin={login}/>
      <Container>
        <CardComp />
      </Container>
    </div>
  )
}

export default TokoPage