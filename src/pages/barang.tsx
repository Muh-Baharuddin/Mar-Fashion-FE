import { useContext, useState } from 'react';
import AddModal from 'src/components/Modal/AddModal';
import EditModal from 'src/components/Modal/EditModal';
import NavbarComp from 'src/components/Navbar/NavbarComp';
import TableComp from 'src/components/Table/Table';
import { MarFashionContext } from 'src/context/MarFashionProvider';

const BarangPage = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    const {isLogin} = useContext(MarFashionContext);
    return (
        <>
            <NavbarComp isLogin={isLogin} />
            <div className="container">
                <TableComp showAdd={showAdd} showEdit={showEdit} handleShowAdd={handleShowAdd} handleShowEdit={handleShowEdit}/>
                <AddModal showAdd={showAdd} handleCloseAdd={handleCloseAdd}/>
                <EditModal showEdit={showEdit} handleCloseEdit={handleCloseEdit}/>
            </div>
        </>
    )
}

export default BarangPage;