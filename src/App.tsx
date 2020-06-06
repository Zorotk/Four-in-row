
import React, { useState } from "react";
// import produce from "immer";

const App = () => {
  const createArr = (length: number) => { return Array.from(Array(length)) }

  const grid = (width: number, height: number) =>
    createArr(width).map(
      () => createArr(height).map(() => 9)
    )
  const board = grid(6, 7)

  const [display, setDisplay] = useState(board)
  const [stage, setstage] = useState(1)
  const [numState, setnumState] = useState(Array(7).fill(5))
  const changeStage = (x: number, y: number) => {

    if (display[x][y] === 9) {
      if (stage === 1) { setstage(2) }
      else { setstage(1) }
    }
    if (display[x][y] === 9) {

      if (stage === 1) { display[numState[y]][y] = 1 }
      if (stage === 2) { display[numState[y]][y] = 2 }

      let copyState = [...numState]
      let before = copyState.slice(0, y)
      let after = copyState.slice(y + 1)
      let numberState = copyState[y] -= 1
      let newCopyState = [...before, numberState, ...after]
      setnumState(newCopyState)
      // let copyarr = produce(numState, draft => { draft[y] -= 1 })
      // setnumState(copyarr)
      // console.log(copyarr, 'copy')
    }
  }
  const checkWin = () => {
    for (let i = 3; i < display.length; i++) {
      for (let j = 0; j < 7; j++) {

        const betweenIJ = [0, 1, 2, 3]
        if ([1, 2].some(f => betweenIJ.every((v) => display[i][j - v] === f)
        )) {
          return display[i][j]
        }
        if ([1, 2].some(m => betweenIJ.every((n) => display[i - n][j] === m))) {
          return display[i][j]
        }
        if ([1, 2].some(n => betweenIJ.every((m) => display[i - m][j - m] === n))) {
          return display[i][j]
        }
        if ([1, 2].some(n => betweenIJ.every((m) => display[i - m][j + m] === n))) {
          return display[i][j]
        }
      }
    }
  }

  const result = checkWin()

  const again = () => {
    setDisplay(board)
    setnumState(Array(7).fill(5))
  }


  return (
    <div>
      {result && <div style={{
        backgroundColor: 'green',
        textAlign: "center",
      }}>
        < h2 > Победа игрока-{result} </h2>
        <button onClick={() => again()}>Начать сначала?</button></div>}
      <h2><strong>Ход игрока</strong> - {stage}</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${7}, 50px)`,


      }}>
        {display.map((rows, x) => rows.map((cols, y) => (<div
          key={x + y}
          onClick={() => { changeStage(x, y) }}
          style={{
            height: '50px',
            width: '50px',
            border: '2px solid green',
            backgroundColor: display[x][y] === 1 ? 'gold' : '' + display[x][y] === '2' ? 'darkorchid' : '',
            textAlign: 'center',
          }}>{}</div>)))}
      </div>
    </div>
  )
}
export default App;