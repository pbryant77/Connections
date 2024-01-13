
//Create game tile sets

const cypher = {
    setOne: {
        name: 'abcd',
        set: ['a','b','c','d']
    }, 
    setTwo: {
        name: 'efgh',
        set: ['e','f','g','h']
    },
    setThree: {
        name: 'ijkl',
        set: ['i','j','k','l']
    },
    setFour: {
        name: 'mnop',
        set: ['m','n','o','p']
    }
}

let setOne = cypher.setOne.set;
let setTwo = cypher.setTwo.set;
let setThree = cypher.setThree.set;
let setFour = cypher.setFour.set;

let gameSet = setOne.concat(setTwo, setThree, setFour);
console.log(gameSet);

let setCount = 0;
let tempSet = [];

//Shuffle set
function shuffle(arr) {
    for (let i = arr.length - 1; i >0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

//Populate game board
let correctSet = 0;

function shuffleTiles() {
    const game = document.getElementsByClassName('tile');
    
    while (game[0]) {
        game[0].remove();
    }
    
    shuffle(gameSet);
    let board = document.getElementById('board');

    for (let i = 0; i < gameSet.length; i++) {
        const tile = document.createElement("div");
        tile.className = `tile`;
        tile.innerHTML = gameSet[i];
        board.appendChild(tile);

        if (tempSet.includes(gameSet[i])) {
            tile.style.backgroundColor = 'lightblue';
        }
    }
}

shuffleTiles();

//Gameplay//////////////////////////////////////////

//// Tile selection
const tiles = document.getElementsByClassName('tile');

document.getElementById('board').addEventListener('click', (e) => {
    if (e.target.classList.contains('tile')) {
        if (setCount < 4 && e.target.style.backgroundColor !== 'lightblue') {
            e.target.style.backgroundColor = 'lightblue';
            setCount++;
            tempSet.push(e.target.innerHTML);
            console.log('setCount: ' + setCount);
            console.log(tempSet);
        } else if (setCount <= 4 && e.target.style.backgroundColor == 'lightblue'){
            e.target.style.backgroundColor = 'lightgray';
            setCount--;
            let index = tempSet.indexOf(e.target.innerHTML);
            tempSet.splice(index, 1);
            console.log(setCount);
            console.log(tempSet);
        } else {
            alert('You can only submit sets of four. Submit or unselect a tile.');
        }
    }
}, false);

//// Set submission
let score = 0;
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', (event) => {
    if (setCount < 4) {
        alert('You can only submit sets of four.');
    } else {
        scoreCheck();
    }
});

// When user correctly guesses a set, place that set at the top of the grid
function placeSet() {
    let checker = (arr1, arr2) => arr1.every(i => arr2.includes(i));

    const game = document.getElementsByClassName('tile');
    const board = document.getElementById('board');
    const setTile = document.createElement('div');
    setTile.className = 'set';
    if (correctSet == 1) {
        setTile.className = 'firstSet';
    } 
    if (checker(tempSet, setOne)) {
        setTile.innerHTML = `<h3>${cypher.setOne.name}</h3><br>${setOne.join(', ')}`;
        setTile.id = 'setOne';
    } else if (checker(tempSet, setTwo)) {
        setTile.innerHTML = `<h3>${cypher.setTwo.name}</h3><br>${setTwo.join(', ')}`;
        setTile.id = 'setTwo';
    } else if (checker(tempSet, setThree)) {
        setTile.innerHTML = `<h3>${cypher.setThree.name}</h3><br>${setThree.join(', ')}`;
        setTile.id = 'setThree';
    } else {
        setTile.innerHTML = `<h3>${cypher.setFour.name}</h3><br>${setFour.join(', ')}`;
        setTile.id = 'setFour';
    }
    board.style.marginTop = '1rem';
    document.body.insertBefore(setTile, board)
    gameSet = gameSet.filter(x => !tempSet.includes(x));
    console.log('gameSet: ' + gameSet);
    clear();
    shuffleTiles();
}

function scoreCheck() {
    let checker = (arr1, arr2) => arr1.every(i => arr2.includes(i));

    if (checker(tempSet, setOne)) {
        alert('huzzah! that\s set 1!');
        correctSet++;
        placeSet();
    } else if (checker(tempSet, setTwo)) {
        alert('huzzah! that\s set 2!');
        correctSet++;
        placeSet();
    } else if (checker(tempSet, setThree)) {
        alert('huzzah! that\s set 3!');
        correctSet++;
        placeSet();
    } else if (checker(tempSet, setFour)) {
        alert('huzzah! that\s set 4!');
        correctSet++;
        placeSet();
    } else {
        alert('try again');
        score++;
        document.getElementById('score').innerHTML = `${score} Incorrect`;
        clear();
    }

    if (correctSet == 4) {
        const winMessage = document.createElement('h2');
        winMessage.innerHTML = 'YOU WIN! CONGRATS!';
        winMessage.id = 'winMessage';
        document.body.insertBefore(winMessage, board);
        
        const controls = document.getElementById('controls');
        controls.style.display = 'none';
    }
}; /////////// NEED TO ADD FUNCTIONALITY TO CHANGE BOARD ONCE A SET HAS BEEN MATCHED; ALSO UPDATE INCORRECT COUNTER FOR FAILED ATTEMPTS

//// Clear selections
const clearBtn = document.getElementById('clear');

function clear() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.backgroundColor = 'lightgray';
    }

    setCount = 0;
    tempSet = [];
};

clearBtn.addEventListener('click', clear);

//// Shuffle remaining tiles
const shuffleBtn = document.getElementById('shuffle');

shuffleBtn.addEventListener('click', shuffleTiles)
////////////////////////////// After shuffling, tiles no longer responding to click events


