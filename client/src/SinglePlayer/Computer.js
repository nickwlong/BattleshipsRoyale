
export function Computer(props) {
    //props imports gridArrays array(with elements) and setGridArray function for players (along others like turnState)
    const computerTurn = async() => {

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
        let wait = await props.setGrid1Array(newGridArray)
        props.checkGameWinner()

    } else if (playerPicked === 1){

        let indexPicked = Math.floor(Math.random() * 16);
        
        let newGridArray = props.grid2Array.map((square, i) => {
            if(indexPicked === i && ["ship","ship1","ship2","ship3","ship4"].includes(square.shipStatus)){
                return { ...square, hitStatus: 'hit'}
            } else if (indexPicked === i && square.shipStatus === '0') {
                return { ...square, hitStatus: 'miss'}
            } else { return square }
        })
        let wait = await props.setGrid2Array(newGridArray)
        props.checkGameWinner()

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

        let wait = await props.setGrid1Array(newGridArray)
        props.checkGameWinner()

    } else if (playerPicked === 1){

        let indexPicked = Math.floor(Math.random() * 16);
        
        let newGridArray = props.grid3Array.map((square, i) => {
            if(indexPicked === i && ["ship","ship1","ship2","ship3","ship4"].includes(square.shipStatus)){
                return { ...square, hitStatus: 'hit'}
            } else if (indexPicked === i && square.shipStatus === '0') {
                return { ...square, hitStatus: 'miss'}
            } else { return square }
        })

        let wait = await props.setGrid3Array(newGridArray)
        props.checkGameWinner()

    }


        props.setTurnState('Player1')
        console.log("meep2")



    }
}

setTimeout(() =>{
    return(<div>{computerTurn()}</div>)
}, 1000);
//Computer function is called so when it is called, it calls the computerTurn function and runs code above


}
