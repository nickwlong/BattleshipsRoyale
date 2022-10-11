
export function Computer(props) {
    //props imports gridArrays array(with elements) and setGridArray function for players (along others like turnState)
    const computerTurn = async() => {

    let uniqueShot = false
        
    if (props.turnState === 'Computer 1') {

        while (uniqueShot === false){

        let playerPicked = Math.floor(Math.random() * 2);

        if (playerPicked === 0){

        let indexPicked = Math.floor(Math.random() * 49);
        //picks random player and random square
        let newGridArray = props.grid1Array.map((square, i) => {

            //maps array with objects, picks specific square, then returns same array but the modified square replaces original
            if(indexPicked === i && ["ship","ship2","ship31","ship32","ship4","ship5"].includes(square.shipStatus) && square.hitStatus != 'hit' && square.hitStatus != 'hitfull' && square.hitStatus != 'miss'){
                uniqueShot = true
                console.log(square.hitStatus)
                return { ...square, hitStatus: 'hit'}
            } else if (indexPicked === i && square.shipStatus === '0' && square.hitStatus != 'hit' && square.hitStatus != 'hitfull' && square.hitStatus != 'miss') {
                uniqueShot = true
                console.log(square.hitStatus)
                return { ...square, hitStatus: 'miss'}
            } else { return square }
        })
        props.setGrid1Array(newGridArray)


    } else if (playerPicked === 1){

        let indexPicked = Math.floor(Math.random() * 49);
        
        let newGridArray = props.grid2Array.map((square, i) => {
            if(indexPicked === i && ["ship","ship2","ship31","ship32","ship4","ship5"].includes(square.shipStatus) && square.hitStatus != 'hit' && square.hitStatus != 'hitfull' && square.hitStatus != 'miss'){
                uniqueShot = true
                console.log(square.hitStatus)
                return { ...square, hitStatus: 'hit'}
            } else if (indexPicked === i && square.shipStatus === '0' && square.hitStatus != 'hit' && square.hitStatus != 'hitfull' && square.hitStatus != 'miss') {
                uniqueShot = true
                console.log(square.hitStatus)
                return { ...square, hitStatus: 'miss'}
            } else { return square }
        })
        props.setGrid2Array(newGridArray)


    }
    }   
        props.checkGameWinner()
        props.setTurnState('Computer 2')
        //imports setTurnState function and changes turn to Computer2
        console.log("meep1")

    } else if (props.turnState === 'Computer 2'){

        
        while (uniqueShot === false){

            let playerPicked = Math.floor(Math.random() * 2);
    
            if (playerPicked === 0){
    
            let indexPicked = Math.floor(Math.random() * 49);
            //picks random player and random square
            let newGridArray = props.grid1Array.map((square, i) => {
    
                //maps array with objects, picks specific square, then returns same array but the modified square replaces original
                if(indexPicked === i && ["ship2","ship31","ship32","ship4","ship5","ship2C","ship31C","ship32C","ship4C","ship5C"].includes(square.shipStatus) && square.hitStatus != 'hit' && square.hitStatus != 'hitfull' && square.hitStatus != 'miss'){
                    uniqueShot = true
                    console.log(square.hitStatus)
                    return { ...square, hitStatus: 'hit'}
                } else if (indexPicked === i && square.shipStatus === '0' && square.hitStatus != 'hit' && square.hitStatus != 'hitfull' && square.hitStatus != 'miss') {
                    uniqueShot = true
                    console.log(square.hitStatus)
                    return { ...square, hitStatus: 'miss'}
                } else { return square }
            })
            props.setGrid1Array(newGridArray)
    
    
        } else if (playerPicked === 1){
    
            let indexPicked = Math.floor(Math.random() * 16);
            
            let newGridArray = props.grid3Array.map((square, i) => {
                if(indexPicked === i && ["ship2","ship31","ship32","ship4","ship5","ship2C","ship31C","ship32C","ship4C","ship5C"].includes(square.shipStatus) && square.hitStatus != 'hit' && square.hitStatus != 'hitfull' && square.hitStatus != 'miss'){
                    uniqueShot = true
                    console.log(square.hitStatus)
                    return { ...square, hitStatus: 'hit'}
                } else if (indexPicked === i && square.shipStatus === '0' && square.hitStatus != 'hit' && square.hitStatus != 'hitfull' && square.hitStatus != 'miss') {
                    uniqueShot = true
                    console.log(square.hitStatus)
                    return { ...square, hitStatus: 'miss'}
                } else { return square }
            })
            props.setGrid3Array(newGridArray)
    
    
        }
        }   
            props.checkGameWinner()
            props.setTurnState('Player 1')
            //imports setTurnState function and changes turn to Player
            console.log("meep1")

    }
}

setTimeout(() =>{
    return(<div>{computerTurn()}</div>)
}, 500);
//Computer function is called so when it is called, it calls the computerTurn function and runs code above


}
