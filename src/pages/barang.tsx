import React from 'react';
import NavbarComp from 'src/components/Navbar/NavbarComp';
import TableComp from 'src/components/Table/Table';
import { MarFashionContext } from 'src/context/MarFashionProvider';

const BarangPage = () => {
    const {isLogin} = React.useContext(MarFashionContext);
    return (
        <>
            <NavbarComp isLogin={isLogin} />
            <div className="container">
                <TableComp />
            </div>
        </>
    )
}

export default BarangPage;