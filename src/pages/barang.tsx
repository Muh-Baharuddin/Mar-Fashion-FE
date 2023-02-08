import { useContext, useState } from 'react';
import ModalComp from 'src/components/Modal/Modal';
import NavbarComp from 'src/components/Navbar/NavbarComp';
import TableComp from 'src/components/Table/Table';
import { MarFashionContext } from 'src/context/MarFashionProvider';

const BarangPage = () => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {isLogin} = useContext(MarFashionContext);
    return (
        <>
            <NavbarComp isLogin={isLogin} />
            <div className="container">
                <TableComp show={show} handleShow={handleShow}/>
                <ModalComp show={show} handleClose={handleClose}/>
            </div>
        </>
    )
}

export default BarangPage;