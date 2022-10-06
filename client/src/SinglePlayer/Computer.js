
export function Computer(props) {
    //props imports gridArrays array(with elements) and setGridArray function for players (along others like turnState)
    const computerTurn = () => {

    if (props.turnState === 'Computer1') {

        let playerPicked = Math.floor(Math.random() * 2);

        if (playerPicked === 0){

        let indexPicked = Math.floor(Math.random() * 16);
        //picks random player and random square
        let newGridArray = props.grid1Array.map((square, i) => {

            //maps array with objects, picks specific square, then returns same array but the modified square replaces original
            if(indexPicked === i && ["ship","ship1","ship2","ship3","ship4"].includes(square.shipStatus)){
                return { ...square, hitStatus: 'hit'}
            } else if (indexPicked === i && square.shipStatus === '0') {
                return { ...square, hitStatus: 'miss'}
            } else { return square }
        })
        props.setGrid1Array(newGridArray)
        //imports function from props and sets the new changed array of objects

    } else if (playerPicked === 1){

        let indexPicked = Math.floor(Math.random() * 16);
        
        let newGridArray = props.grid2Array.map((square, i) => {
            if(indexPicked === i && ["ship","ship1","ship2","ship3","ship4"].includes(square.shipStatus)){
                return { ...square, hitStatus: 'hit'}
            } else if (indexPicked === i && square.shipStatus === '0') {
                return { ...square, hitStatus: 'miss'}
            } else { return square }
        })
        props.setGrid2Array(newGridArray)

    }
        props.setTurnState('Computer2')
        //imports setTurnState function and changes turn to Computer2
        console.log("meep1")

    } else if (props.turnState === 'Computer2'){


        let playerPicked = Math.floor(Math.random() * 2);

        if (playerPicked === 0){

        let indexPicked = Math.floor(Math.random() * 16);
        
        let newGridArray = props.grid1Array.map((square, i) => {
            if(indexPicked === i && ["ship","ship1","ship2","ship3","ship4"].includes(square.shipStatus)){
                return { ...square, hitStatus: 'hit'}
            } else if (indexPicked === i && square.shipStatus === '0') {
                return { ...square, hitStatus: 'miss'}
            } else { return square }
        })
        props.setGrid1Array(newGridArray)

    } else if (playerPicked === 1){

        let indexPicked = Math.floor(Math.random() * 16);
        
        let newGridArray = props.grid3Array.map((square, i) => {
            if(indexPicked === i && ["ship","ship1","ship2","ship3","ship4"].includes(square.shipStatus)){
                return { ...square, hitStatus: 'hit'}
            } else if (indexPicked === i && square.shipStatus === '0') {
                return { ...square, hitStatus: 'miss'}
            } else { return square }
        })
        props.setGrid3Array(newGridArray)

    }


        props.setTurnState('Player1')
        console.log("meep2")



    }
}

return (<div>{computerTurn()}</div>)

}