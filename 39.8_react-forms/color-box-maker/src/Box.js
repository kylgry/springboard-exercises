import React from "react";
import './Box.css'

function Box({ removeBox, bgColor, width, height, id }) {

  const handleSubmit = evt => {
    evt.preventDefault();
    removeBox(id);
  };

  return (
    <div className='Box' style={{ backgroundColor: bgColor, width: `${width}px`, height: `${height}px` }}>
    <form onSubmit={handleSubmit}><button>x</button></form>
    </div>
  )
}

export default Box
