import Pagination from 'react-bootstrap/Pagination'
import { ItemData } from 'services/item/types';
import { useItemContext } from '../../Item';

type Props = {
  data: ItemData | undefined
}

const PaginationComp = ({data}: Props) => {
  const { queryParams, setQueryParams } = useItemContext()

  const handlePageClick = (pageNumber: number) => {
    setQueryParams((prev) => {
      return { ...prev, page: pageNumber};
    });
  }

  const activePage = queryParams.page;
  const totalPages = !data ? 0 : Math.ceil(data.total / queryParams.limit);
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

export default PaginationComp