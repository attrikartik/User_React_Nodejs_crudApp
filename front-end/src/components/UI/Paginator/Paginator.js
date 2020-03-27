import React from 'react';

import style from './Paginator.module.css';

const paginator = props => (
  <div paginator>
    {props.children}
    <div className={style.paginator__controls}>
      {props.currentPage > 1 ?
        <button className={style.paginator__control } onClick={props.onPrevious}>
          Previous
        </button>:null
      }
      {props.currentPage < props.lastPage ?
        <button className={style.paginator__control } onClick={props.onNext}>
          Next
        </button>:null
      }
    </div>
  </div>
);


export default paginator;
