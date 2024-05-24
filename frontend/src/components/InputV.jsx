import React from 'react';

const InputV = (props) => {
  return (
    <div>
      <input 
      onChange={props.onchange}
      type={props.type} 
      name={props.name} 
      id={props.id} 
      placeholder={props.ph}
      value={props.data}
      required
      />
    </div>
  )
}

export default InputV;
