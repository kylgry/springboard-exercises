import React, { useState } from "react";
import Box from './Box'
import NewBoxForm from './NewBoxForm'
import { v4 as uuid } from "uuid";
import './BoxList.css'

function BoxList() {

  const [boxes, setBoxes] = useState([])

  const addBox = box => {
    let newBox = { ...box, id: uuid() }
    setBoxes(boxes => [...boxes, newBox])
  };

  const removeBox = id => {
    setBoxes(boxes => [...boxes.filter(box => box.id !== id)])
  };

  return (
    <div className="BoxList">
      <NewBoxForm addBox={ addBox } />
      { boxes.map(box =>
        <Box
          removeBox={ removeBox }
          bgColor={box.bgColor}
          width={box.width}
          height={box.height}
          id={box.id}
          key={box.id}
        />)
      }
    </div>

  )
}

export default BoxList
