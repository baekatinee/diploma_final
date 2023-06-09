import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Context } from '../..'

const PagesPayment= observer(() => {
  const { payment } = useContext(Context);
  const pageCount = Math.ceil(payment.totalCount / payment.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination shape="rounded" className="mt-3" count={pageCount}>
      {pages.map((page) => (
        <PaginationItem
          key={page}
          selected={payment.page === page}
          onClick={() => payment.setPage(page)}
        >
          {page}
        </PaginationItem>
      ))}
    </Pagination>
  );
});

export default PagesPayment;