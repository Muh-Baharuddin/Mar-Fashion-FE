import { Container } from "react-bootstrap";
import NavbarComp from "src/components/Navbar/NavbarComp";
import { useContext, useEffect, useState } from "react";
import CardComp from "src/components/Cards/Cards";
import { MarFashionContext } from "src/context/MarFashionProvider";
import axios from "axios";

// type dataType = {
//   title: string,
//   description: string,
//   domisili: string,
//   alamat: string,
//   img: string,
//   idToko: string,
// }

const TokoPage = () => {
  const { isLogin } = useContext(MarFashionContext);
  const data = {
    idToko: "1",
    title: 'Toko A',
    domisili: 'Jakarta',
    alamat: 'Jln. Mangga 12',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure reprehenderit architecto quidem.',
    img: 'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2022/12/22/ded5158c-1421-4848-a15f-2e95e897f316.jpg'
  }
  const [items, setItems] = useState([]);
  const getItem = async () => {
      const res = await axios.get('https://fajartimur.com/api/items/');
      setItems(res.data.results)
  }
  useEffect(() => {
      getItem()
  },[])

  return (
    <>
      <NavbarComp />
      <div className="container">
          <div className="row">
              {/* {[1,2,3,4,5,6,7,8,9,10].map(e => {
                  return (
                      <div className="col-md-4 col-6">
                          <CardComp idToko={data.id} title={data.title} domisili={data.domisili} alamat={data.alamat} description={data.description} img={data.img} />
                      </div>
                  );
              })} */}
              {items && items.map(e => {
                  return (
                      <div className="col-md-4 col-6">
                          <CardComp idToko={data.idToko} title={data.title} img={data.img} domisili={data.domisili} alamat={data.alamat} description={data.description} />
                      </div>
                  )
              })}
          </div>
      </div>
    </>
  )
}

export default TokoPage