import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Context } from '..'

const Pages = observer(() => {
  const { ship } = useContext(Context);
  const pageCount = Math.ceil(ship.totalCount / ship.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination shape="rounded" className="mt-3" count={pageCount}>
      {pages.map((page) => (
        <PaginationItem
          key={page}
          selected={ship.page === page}
          onClick={() => ship.setPage(page)}
        >
          {page}
        </PaginationItem>
      ))}
    </Pagination>
  );
});

export default Pages;