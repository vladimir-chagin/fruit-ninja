const elems = {
  gameContainer: document.getElementById('game-container'),
};


function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function coordsToStyle(coords) {
  return {
    left: `${coords.x}px`,
    top: `${coords.y}px`,
  };
}

function styleToCoords(style) {
  return {
    x: parseInt(style.left || '0'),
    y: parseInt(style.top || '0'),
  };
}

function moveFruit(fruit, direction) {
  const coords = styleToCoords(fruit.style);
  if (direction === DIRECTIONS.DOWN) {
    coords.y += SETTINGS.fruitMoveDistance;
    const style = coordsToStyle(coords);
    fruit.style.left = style.left;
    fruit.style.top = style.top;
  }

  if (direction === DIRECTIONS.UP) {

  }
  ////
  if (coords.y >= SETTINGS.containerSize - SETTINGS.imgSize) {
    return true;
  }
  return false;
}

function start() {

}

function stop() {

}

function setPosition(fruit, pos) {
  const style = coordsToStyle(pos); 
  fruit.style.left = style.left;
  fruit.style.top = style.top;
}

function createFruit(coords) {
  const fruit = FRUITS[randomInt(FRUITS.length)];
  const img = document.createElement('img');
  img.src = `img/${fruit}.png`
  setPosition(img, coords);
  return img;
}

function destroyFruit(fruit, hit) {
  elems.gameContainer.removeChild(fruit);
  const name = getFruitName(fruit);
  if (hit) {
    hitFruits.push(name);
  } else {
    missedFruits.push(name);
  }
  calcScores();
}

function addFruit(fruit) {
  elems.gameContainer.appendChild(fruit);
}

function getFruitName(fruit) {
  const slashIdx = fruit.src.lastIndexOf('/');
  const dotIdx = fruit.src.indexOf('.');
  return fruit.src.substring(slashIdx+1, dotIdx)
}

const hitFruits = [];
const missedFruits = [];

function calcScores() {
  let totalScore = 0;
  for (let i = 0; i < hitFruits.length; i += 1) {
    totalScore += SETTINGS.scores[hitFruits[i]];;
  }
  console.log('totalScore: ', totalScore, hitFruits)
}

function handleFruitClick() {

}

function fruitLife(pos) {
  const fruit = createFruit(pos);
  fruit.addEventListener('click', function () {
    destroyFruit(fruit, true);
    clearInterval(intervalId);
  });
  addFruit(fruit);
  const intervalId = setInterval(function () {
    const atBorder = moveFruit(fruit, DIRECTIONS.DOWN);
    if (atBorder) {
      destroyFruit(fruit);
      clearInterval(intervalId);
    }
  }, SETTINGS.fruitMoveInterval);
}


function main() {
  for (let i = 0; i < SETTINGS.maxFruits; i += 1) {
    const coords = {
      x: i*SETTINGS.imgSize,
      y: 0,
    };
    fruitLife(coords);
  } 
}

main();



