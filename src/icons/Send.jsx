import React from 'react'
import * as style from "../styles/styles"
import * as sVar from "../styles/styleVariables"

function Send({isLoading, handleSubmit, isContent, iconColor}) {
  return (
    <style.SendContainer disabled={isLoading} iconColor={iconColor} onClick={isLoading ? null : handleSubmit} isContent={isContent}>
        <svg width="18" height="18">
            <g className="layer">
                <title>Layer 1</title>
                { isContent ?
                    (<path d="m17.5,9.19c0,-0.26 -0.16,-0.42 -0.38,-0.54c-0.01,-0.01 -15.19,-6.63 -15.19,-6.63c-0.04,-0.02 -0.08,-0.03 -0.12,-0.03c-0.05,0 -0.12,0.02 -0.17,0.04c-0.09,0.05 -0.13,0.15 -0.13,0.25l0,6c0,0.16 0.12,0.29 0.29,0.3l15.02,0.6l-15.02,0.6c-0.16,0.01 -0.29,0.14 -0.29,0.3l0,6c0,0.1 0.05,0.2 0.13,0.25c0.05,0.04 0.11,0.04 0.17,0.04c0.04,0 0.08,-0.01 0.12,-0.03l15.02,-6.55c0.29,-0.11 0.55,-0.31 0.55,-0.63l0,0.03z"
                    fill={`${sVar.white100}`}
                    id="svg_1"/>) :
                    (<path d="m17.5,9.19c0,-0.26 -0.16,-0.42 -0.38,-0.54c-0.01,-0.01 -15.19,-6.63 -15.19,-6.63c-0.04,-0.02 -0.08,-0.03 -0.12,-0.03c-0.05,0 -0.12,0.02 -0.17,0.04c-0.09,0.05 -0.13,0.15 -0.13,0.25l0,6c0,0.16 0.12,0.29 0.29,0.3l15.02,0.6l-15.02,0.6c-0.16,0.01 -0.29,0.14 -0.29,0.3l0,6c0,0.1 0.05,0.2 0.13,0.25c0.05,0.04 0.11,0.04 0.17,0.04c0.04,0 0.08,-0.01 0.12,-0.03l15.02,-6.55c0.29,-0.11 0.55,-0.31 0.55,-0.63l0,0.03z"
                    fill={`${sVar.lineColor}`}
                    id="svg_1"/>)}
            </g>
        </svg>
    </style.SendContainer>
  )
}

export default Send