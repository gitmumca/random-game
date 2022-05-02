var field = [[0,0,0,0],[0,2,0,0],[0,0,0,0],[0,0,0,0]];
var up = 0, right = 1, down = 2, left = 3;
var flag;
var score = 0;

var win = 1; 
var lost = 0;
var game_off = false;

var start = document.getElementById('11');
start.focus();
start.style.background = 'var(--font-lightgreen)';
localStorage.clear();

function borderColor(row, col, number) {
  var squar = document.getElementById('' + row + col);
  squar.innerHTML = number;

  if (number == 0) {
    squar.style.background = 'var(--dark-color)';
    squar.innerHTML = '';
  }
  else if (number == 2) {
    squar.style.background = 'var(--font-lightgreen)';
  }
  else if (number == 4) {
    squar.style.background = 'var(--font-lightpink)';
  }
  else if (number == 8) {
    squar.style.background = 'var(--font-lightskyblue)';
  }
  else if (number == 16) {
    squar.style.background = 'var(--font-peachpuff)';
  }
  else if (number == 32) {
    squar.style.background = 'var(--font-darkseagreen)';
  }
  else if (number == 64) {
    squar.style.background = 'var(--font-lightgrey)';
  }
  else if (number == 128) {
    squar.style.background = 'var(--font-lightsalmon)';
  }
  else if (number == 256) {
    squar.style.background = 'var(--font-sandybrown)';
  }
  else if (number == 512) {
    squar.style.background = 'var(--font-thistle)';
  }
  else if (number == 1024) {
    squar.style.background = 'var(--font-lightyellow)';
  }
  else if (number == 2048) {
    squar.style.background = 'var(--font-paleturquoise)';
    if (!game_off) {game_over(win);}
  }
}

function game_over(res) {

  if (res == lost) { document.querySelector('.winner').innerHTML = 'GAME OVER! You lost!'; }
  else { document.querySelector('.winner').innerHTML = 'GAME OVER! Сongratulations! You are a WINNER !'; }
  document.querySelector('.winner').style.visibility = 'visible';
  game_off = true;

  let curItem = localStorage.length;
  for (i=0; i<localStorage.length; i++) {
    if (Number(localStorage.getItem('score'+i).slice(20)) < score) {curItem = i; break;}
  }

  for (i=localStorage.length; i>curItem; i--) {
    localStorage.setItem('score'+i, localStorage.getItem('score'+(i-1)));
  }
  localStorage.setItem('score'+curItem, new Date().toLocaleString()+score);
  refreshListScore();
}

function refreshListScore() {
  for (i=0; i<10; i++) {
    let str = localStorage.getItem('score'+i);
    document.getElementById('score'+i+0).innerHTML = (i<localStorage.length) ? str.slice(0,20) : '';
    document.getElementById('score'+i+1).innerHTML = (i<localStorage.length) ? str.slice(20) : '';
  }
}

function refreshField() {
  field.forEach((el, i) => el.forEach((ell, ii) => borderColor(i, ii, ell)));
  document.querySelector('.score').innerHTML = 'score ' + score;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
  //Максимум и минимум включаются
}

// coef - в начале игры первое значение только 2
function addNumber(coef) {
  let max = 0;
  field.forEach((el, i) => el.forEach((ell, ii) => (ell == 0) ? max = max + 1 : 0));

  if (max == 0) { game_over(lost); return;}

  let newPos = getRandomIntInclusive(1, max);
  max = 0;
  field.forEach((el, i) => el.forEach(function (ell, ii) {
    if (ell == 0) {
      max = max + 1;
      if (max == newPos) {field[i][ii] = getRandomIntInclusive(1, coef) * 2;}
    }
  }
  ));
}

function moveAll(direction) {

  if (direction == up) {
    for (j=0; j<4; j++) {
      flag = true;
      while (flag) {
        flag = false;
        for (i=1; i<4; i++) {
          if (field[i][j] > 0 && field[i-1][j] == 0) {field[i-1][j] = field[i][j]; field[i][j] = 0; flag = true}
        }
      }
      for (i=1; i<4; i++) {
        if (field[i][j] > 0 && field[i][j] == field[i-1][j]) {field[i-1][j] = field[i-1][j]*2; score = score + field[i-1][j]; field[i][j] = 0; i++}
      }  
      flag = true;
      while (flag) {
        flag = false;
        for (i=1; i<4; i++) {
          if (field[i][j] > 0 && field[i-1][j] == 0) {field[i-1][j] = field[i][j]; field[i][j] = 0; flag = true}
        }
      }
    }
  }
  else if (direction == right) {
    field.forEach(function (el) {
      flag = true;
      while (flag) {
        flag = false;
        for (i=2; i>=0; i--) {
          if (el[i] > 0 && el[i+1] == 0) {el[i+1] = el[i]; el[i] = 0; flag = true}
        }
      }
      for (i=2; i>=0; i--) {
        if (el[i] > 0 && el[i] == el[i+1]) {el[i+1] = el[i+1]*2; score = score + el[i+1]; el[i] = 0; i--}
      }  
      flag = true;
      while (flag) {
        flag = false;
        for (i=2; i>=0; i--) {
          if (el[i] > 0 && el[i+1] == 0) {el[i+1] = el[i]; el[i] = 0; flag = true}
        }
      }
    })
  }
  else if (direction == down) {
    for (j=0; j<4; j++) {
      flag = true;
      while (flag) {
        flag = false;
        for (i=2; i>=0; i--) {
          if (field[i][j] > 0 && field[i+1][j] == 0) {field[i+1][j] = field[i][j]; field[i][j] = 0; flag = true}
        }
      }
      for (i=2; i>=0; i--) {
        if (field[i][j] > 0 && field[i][j] == field[i+1][j]) {field[i+1][j] = field[i+1][j]*2; score = score + field[i+1][j]; field[i][j] = 0; i--}
      }  
      flag = true;
      while (flag) {
        flag = false;
        for (i=2; i>=0; i--) {
          if (field[i][j] > 0 && field[i+1][j] == 0) {field[i+1][j] = field[i][j]; field[i][j] = 0; flag = true}
        }
      }
    }  
  }
  else if (direction == left) {
    field.forEach(function (el) {
      flag = true;
      while (flag) {
        flag = false;
        for (i=1; i<4; i++) {
          if (el[i] > 0 && el[i-1] == 0) {el[i-1] = el[i]; el[i] = 0; flag = true}
        }
      }
      for (i=1; i<4; i++) {
        if (el[i] > 0 && el[i] == el[i-1]) {el[i-1] = el[i-1]*2; score = score + el[i-1]; el[i] = 0; i++}
      }  
      flag = true;
      while (flag) {
        flag = false;
        for (i=1; i<4; i++) {
          if (el[i] > 0 && el[i-1] == 0) {el[i-1] = el[i]; el[i] = 0; flag = true}
        }
      }
    })
  }
}

function playSound(number) {
  var audio = new Audio();
  audio.src = 'sound' + number + '.mp3';
  audio.autoplay = true;
}

document.onkeydown = checkKey;

function checkKey(e) {

  if (game_off == true) {return;}
  refreshListScore();
  if (e.keyCode == '38') { // up 
    moveAll(up);
    playSound(7);
    refreshField();
    addNumber(2);
    refreshField();
  } else if (e.keyCode == '39') { // right
    moveAll(right);
    playSound(2);
    refreshField();
    addNumber(2);
    refreshField();
  } else if (e.keyCode == '37') { // left 
    moveAll(left);
    playSound(7);
    refreshField();
    addNumber(2);
    refreshField();
  } else if (e.keyCode == '40') { // down
    moveAll(down);
    playSound(2);
    refreshField();
    addNumber(2);
    refreshField();
  }
}

const btn_up = document.querySelector('.up');
btn_up.addEventListener('click', function() {

  if (game_off == true) {return;}
  refreshListScore();

  moveAll(up);
  playSound(7);
  refreshField();
  addNumber(2);
  refreshField();
});

const btn_right = document.querySelector('.right');
btn_right.addEventListener('click', function() {

  if (game_off == true) {return;}
  refreshListScore();

  moveAll(right);
  playSound(2);
  refreshField();
  addNumber(2);
  refreshField();
});

const btn_left = document.querySelector('.left');
btn_left.addEventListener('click', function() {

  if (game_off == true) {return;}
  refreshListScore();

  moveAll(left);
  playSound(7);
  refreshField();
  addNumber(2);
  refreshField();
});

const btn_down = document.querySelector('.down');
btn_down.addEventListener('click', function() {
  
  if (game_off == true) {return;}
  refreshListScore();

  moveAll(down);
  playSound(7);
  refreshField();
  addNumber(2);
  refreshField();
});

const new_game = document.querySelector('.new_game');
new_game.addEventListener('click', function() {
  field = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  score = 0;
  game_off = false;

  document.querySelector('.winner').style.visibility = 'hidden';
  addNumber(1);
  refreshField();  
});
