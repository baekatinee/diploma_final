import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Context } from '..'

const PagesClient = observer(() => {
  const { client } = useContext(Context);
  const pageCount = Math.ceil(client.totalCount / client.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination shape="rounded" className="mt-3" count={pageCount}>
      {pages.map((page) => (
        <PaginationItem
          key={page}
          selected={client.page === page}
          onClick={() => client.setPage(page)}
        >
          {page}
        </PaginationItem>
      ))}
    </Pagination>
  );
});

export default PagesClient;