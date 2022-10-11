import React from 'react'
import {Alert as AlertBox} from 'react-bootstrap';
function Alert(props) {
    const capitalize = (word)=>{
      if(word==='danger'){
        word='error'
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px'}}>
        {props.alert && <AlertBox className="position-fixed w-100" style={{zIndex: '1'}} variant={props.alert.type}><strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}</AlertBox>}
        </div>
    )
}

export default Alert