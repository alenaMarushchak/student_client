import React from 'react';
import ReactPaginate from 'react-paginate';

function PaginationComponent({
                                 value,
                                 onChange,
                                 totalPages
                             }) {
    const selected = value - 1;
    return (

        <ReactPaginate
            forcePage={selected}
            onPageChange={onChange}
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={5}

            previousClassName="item"

            nextClassName="item"

            containerClassName="ui pagination pointing secondary menu"

            pageClassName="item"

            disabledClassName="disabled"

            activeClassName="active"

            pageLinkClassName='pagination-item-link'

            disableInitialCallback={true}
            initialPage={0}
        />
    );
}

export default PaginationComponent;
