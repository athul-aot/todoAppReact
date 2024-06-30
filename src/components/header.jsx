import React from 'react'

function Header({handlePopUp}) {
  return (
    <div className='header'>
      <h1>My Tasks</h1>
      {/* <Button btnText={"Add New Task"} btnid={"add-task-show"} togglePopup={handlePopUp}/> */}
      <button className='add-task-show' onClick={handlePopUp}>Add New Task</button>
    </div>
  )
}

export default Header
