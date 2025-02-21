import React, { useCallback, useMemo, useState } from 'react'
import Child from './Child'

export default function Parent() {

 
    let [counter, setCounter] = useState(0)
    let [notes, setNotes] = useState([])
    let val = useMemo(() => { return clac(counter) }, [counter])
    let fName = useMemo(() => { return { fName: 'ali' } }, [])
    let sayHi = useCallback(() => {
        console.log('hi');
    }, [])

    function addNote() {
        setNotes([...notes, 'new notes'])
    }

    function increase() {
        setCounter(counter + 1)
    }

    function clac(num) {
        console.log('cacl');
        let sum = 0
        for (let i = 0; i < 1000000000; i++) {
            sum += num
        }
        return sum
    }

    return (
        <div className='container'>Parent
            <h1>val : {val}</h1>
            <h1>counter:{counter}</h1>
            <button onClick={increase}>+</button>
            <br />
            <button onClick={addNote}>add note</button>
            <ul>
                {notes.map(ele => <li>{ele}</li>)}
            </ul>
            <Child fname={fName} sayHi={sayHi} />
        </div>
    )
}
