import Pagination from 'react-bootstrap/Pagination'
import { useApiTableContext } from '../ApiTable';
import { getData } from '../service';

export const TablePagination = () => {
  const { control } = useApiTableContext()
  const { data } =  getData(control.url, control.params);

  const activePage = control.params.page;
  const totalPages = !data ? 0 : Math.ceil(data.total / control.params.limit);
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
      <Pagination.Item key={number} active={number === activePage} onClick={() => control.handlePageClick(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => control.handlePageClick(1)} disabled={activePage <= 1}/>
      <Pagination.Prev onClick={() => control.handlePageClick(activePage - 1)} disabled={activePage <= 1} />
      {items}
      <Pagination.Next onClick={() => control.handlePageClick(activePage + 1)} disabled={activePage >= totalPages} />
      <Pagination.Last onClick={() => control.handlePageClick(totalPages)} disabled={activePage >= totalPages}/>
    </Pagination>
  )
}
