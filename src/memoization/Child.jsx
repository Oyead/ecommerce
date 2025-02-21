import React, { memo } from 'react'

function Child({fname,sayHi}) {
    console.log('child');
    sayHi()
    return (
        <div>Child {fname.fName}</div>
    )
}

export default memo(Child);