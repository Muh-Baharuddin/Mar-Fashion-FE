import Pagination from 'react-bootstrap/Pagination'
import { useApiTableContext } from '../ApiTable';
import { getData } from '../service';

export const TablePagination = () => {
  const { params, control , handlePageClick} = useApiTableContext()
  const { data } =  getData(control.url, params);

  const activePage = params.page;
  const totalPages = !data ? 0 : Math.ceil(data.total / params.limit);
  const maxPagesShow = 5;
  
  let startPage = Math.max(activePage - Math.floor(maxPagesShow / 2), 1);
  let endPage = startPage + maxPagesShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPagesShow + 1, 1);
  }

  
  const items: JSX.Element[] = [];

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageClick(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageClick(1)} disabled={activePage <= 1}/>
      <Pagination.Prev onClick={() => handlePageClick(activePage - 1)} disabled={activePage <= 1} />
      {items}
      <Pagination.Next onClick={() => handlePageClick(activePage + 1)} disabled={activePage >= totalPages} />
      <Pagination.Last onClick={() => handlePageClick(totalPages)} disabled={activePage >= totalPages}/>
    </Pagination>
  )
}
