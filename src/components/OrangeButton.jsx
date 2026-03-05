import React from 'react'

const OrangeButton = ({children,style, onClickFunction}) => {
  return (
    <div className="orangeButton text-sm" style={style} onClick={onClickFunction}>
      {children}
      <div className="seconddiv"></div>
      <div className="thirddiv"></div>
      <div className="fourthdiv"></div>
    </div>
  )
}

export default OrangeButton