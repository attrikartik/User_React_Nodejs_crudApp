import React from 'react';
import style from './Button.module.css'

// custom button 
const button = ( props )=>{
    return(
        <button 
        className={[style.Button, style[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
        </button>
    )
}
export default button;