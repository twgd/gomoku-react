import React from 'react';

// 每一格
function Square(props) {
    return(
        <div
            className="square"
            onClick={() => props.onClick(props.index)}
        >   
            {
                props.value && 
                <div className={props.value === 'B' ? "black" : "white"}></div>
            }
        </div>
    );
}

// 19*19 棋盤組成
function Board(props) {
    const {squares} = props;
    return(
        <div className="game__board">
            {squares.map((item, index)=>
                <Square
                    key={index}
                    index={index}
                    value={item}
                    onClick={(i) => props.onClick(i)}
                />
            )}
        </div>
    )		
}

export default Board;