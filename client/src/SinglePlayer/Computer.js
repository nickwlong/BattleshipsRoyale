
export function Computer(props) {

    const computerTurn = () => {

    if (props.turnState === 'Computer1') {

        props.setTurnState('Computer2')
        console.log("meep1")

    } else if (props.turnState === 'Computer2'){

        props.setTurnState('Player1')
        console.log("meep2")

    }
}

return (computerTurn())

}