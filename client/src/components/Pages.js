import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { Pagination } from 'react-bootstrap'

const Pages = observer(() => {
    const { ship } = useContext(Context)
    const pageCount = Math.ceil(ship.totalCount / ship.limit)

    const pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className='mt-3'>
            <Pagination.First />
            <Pagination.Prev />
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={ship.page === page}
                    onClick={() => ship.setPage(page)}>
                    {page}
                </Pagination.Item>
            )}
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    )
})

export default Pages
