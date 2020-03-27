import React from 'react';
import style from './Backdrop.module.css'

// it will be used depending on the show property
const backdrop = props =>{
    return(
                            
        props.show?<div 
               className={style.Backdrop} 
               onClick={props.clicked}></div>:null
      )
}
                         
           

export default backdrop;