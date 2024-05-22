import React from 'react';

const InputV = (props) => {
  return (
    <div>
      <input type={props.type} name={props.name} id={props.id} placeholder={props.value}/>
    </div>
  )
}

export default InputV;
