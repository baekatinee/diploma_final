import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Context } from '../..'

const PagesRental= observer(() => {
  const { rental } = useContext(Context);
  const pageCount = Math.ceil(rental.totalCount / rental.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination shape="rounded" className="mt-3" count={pageCount}>
      {pages.map((page) => (
        <PaginationItem
          key={page}
          selected={rental.page === page}
          onClick={() => rental.setPage(page)}
        >
          {page}
        </PaginationItem>
      ))}
    </Pagination>
  );
});

export default PagesRental;