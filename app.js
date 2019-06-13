let x = 0
let y = 0
let facing = 'NORTH'
let directionValue = 0

const FACING = {
    NORTH : {value: 0, name : "NORTH", move: 1, coor:"y"},
    EAST : {value: 1, name : "EAST", move: 1, coor:"x"},
    SOUTH : {value: 2, name : "SOUTH", move: -1, coor:"y"},
    WEST : {value: 3, name : "WEST", move: -1, coor:"x"}
}

const COMMAND = {
    PLACE : {value: 0, name : "PLACE"},
    MOVE : {value: 1, name : "MOVE"},
    LEFT : {value: -1, name : "LEFT"},
    RIGHT : {value: 1, name : "RIGHT"},
    REPORT : {value: 4, name : "REPORT"},
}

let commandEnum = Object.freeze(COMMAND)
let facingEnum = Object.freeze(FACING)
inputCommand()

function checkDirectionValue(direction){
  switch (direction){
    case facingEnum.NORTH.name:
        return facingEnum.NORTH.value
    case facingEnum.EAST.name:
        return facingEnum.EAST.value 
    case facingEnum.SOUTH.name:
        return facingEnum.SOUTH.value 
    case facingEnum.WEST.name:
        return facingEnum.WEST.value 
  }
}

function getDirectionCoor(direction){
    switch (direction){
        case facingEnum.NORTH.name:
            return facingEnum.NORTH.coor
        case facingEnum.EAST.name:
            return facingEnum.EAST.coor 
        case facingEnum.SOUTH.name:
            return facingEnum.SOUTH.coor 
        case facingEnum.WEST.name:
            return facingEnum.WEST.coor 
      }
}

function getDirectionMove(direction){
    switch (direction){
        case facingEnum.NORTH.name:
            return facingEnum.NORTH.move
        case facingEnum.EAST.name:
            return facingEnum.EAST.move 
        case facingEnum.SOUTH.name:
            return facingEnum.SOUTH.move 
        case facingEnum.WEST.name:
            return facingEnum.WEST.move 
      }
}

function getDirectionName(value){
    switch(value){
        case facingEnum.NORTH.value:
            return facingEnum.NORTH.name
        case facingEnum.EAST.value:
            return facingEnum.EAST.name
        case facingEnum.SOUTH.value:
            return facingEnum.SOUTH.name
        case facingEnum.WEST.value:
            return facingEnum.WEST.name
    }
}

function report(){
    if (x < 0){
        x = 0
    }
    if (x > 5){
        x = 5
    }
    if (y < 0){
        y = 0
    }
    if (y > 5){
        y = 5
    }
        return `${x},${y},${facing}` 
}

function setParam(params){
    x = params[0]
    y = params[1]
    facing = params[2] 
}

function moveCommand(){
    let coor = getDirectionCoor(facing)
    if (coor === "x"){
        x = parseInt(x) + parseInt(getDirectionMove(facing))
    } else {
        y = parseInt(y) + parseInt(getDirectionMove(facing))
    }
}

function leftCommand(){
    directionValue = parseInt(checkDirectionValue(facing)) + parseInt(commandEnum.LEFT.value)
    if (directionValue < 0 ){
        directionValue = 3
    }
    facing = getDirectionName(directionValue)
}

function rightCommand(){
    directionValue = checkDirectionValue(facing) + commandEnum.RIGHT.value
    if (directionValue > 3){
        directionValue = 0
    }
    facing = getDirectionName(directionValue)
}

function checkCommand(input){
    let string = input.split(" ")
    let command = string[0]
    switch(command){
        case commandEnum.PLACE.name:
            setParam(string[1].split(","))
            break
        case commandEnum.MOVE.name:
            moveCommand()
            break
        case commandEnum.LEFT.name:
            leftCommand()
            break
        case commandEnum.RIGHT.name:
            rightCommand()
            break
        case commandEnum.REPORT.name:
            console.log(report())
            break
        default :
            console.log("invalid input")
    }
    
}

function inputCommand (){
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })
    readline.question("type command ", (input) => {
        checkCommand(input)
        readline.close()
        inputCommand()
  })}