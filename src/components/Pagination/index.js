import React from 'react';
import ReactPaginate from 'react-paginate';
import './style.css';

function Pagination({
  value,
  onChange,
  totalPages
}) {
  const selected = value - 1;
  return (
    <div className="pagination-block">
      <ReactPaginate
        forcePage={selected}
        onPageChange={onChange}
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={5}
        previousLabel={
          <li className={`pagination-item prev ${selected <= 0 ? "disabled" : ''}`}>
            <span className="icon-arrow-left"/>
          </li>
        }
        nextLabel={
          <li className={`pagination-item next ${selected >= (totalPages - 1) ? "disabled" : ''}`}>
            <span className="icon-arrow-right"/>
          </li>
        }
        containerClassName="pagination"
        pageClassName="pagination-item"
        disabledClassName="disabled"
        activeClassName="active"
        pageLinkClassName='pagination-item-link'
        disableInitialCallback={true}
        initialPage={0}
      />
    </div>
  );
}

export default Pagination;
