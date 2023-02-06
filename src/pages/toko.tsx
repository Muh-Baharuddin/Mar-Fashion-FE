import { Container } from "react-bootstrap";
import NavbarComp from "src/components/Navbar/NavbarComp";
import { useContext, useState } from "react";
import CardComp from "src/components/Cards/Cards";
import { MarFashionContext } from "src/context/MarFashionProvider";

const TokoPage = () => {
  // const { isLogin, setIsLogin } = useContext(MarFashionContext);
  // setIsLogin(!isLogin)
  return (
    <div>
      <NavbarComp />
      <Container>
        <CardComp />
      </Container>
    </div>
  )
}

export default TokoPage