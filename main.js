class DiceGame {
  constructor(container,maxScore=45) {
    this.container = document.querySelector(container);
    this.container.innerHTML = `
    <div class='header'>
        <h2 class='score-wrapper player1'>Score:<span class="score" id="player1Score">0</span><span class='bonus-score' id='player_1_bonus'></span></h2>
<h1 class='title'> Dice Lounge</h1>
    <h2 class='score-wrapper '>Score:<span class="score" id="player2Score">0</span><span class='bonus-score' id='player_2_bonus'></span></h2>

    </div>
    <div class='bonus-message'>fantastic</div>
    
  <h2 class="message">player1 turn</h2>
  
  <div class="player-boards-wrapper">
    <div class="player-board active--player" id="player1Board">-</div>
    <div class="player-board" id="player2Board">-</div>
  </div>
  <button class="btn" id="roll_dice_btn">Roll dice </button>
  <button class="btn" id="reset_btn">Reset Game</button>

`
    this.MESSAGE = this.container.querySelector('.message');
    this.player1Board = this.container.querySelector('#player1Board');
    this.player2Board = this.container.querySelector('#player2Board');
    this.player1ScoreElem = this.container.querySelector('#player1Score');
    this.player2ScoreElem = this.container.querySelector('#player2Score');
    this.rollDiceBtn = this.container.querySelector('#roll_dice_btn')
    this.resetBtn = this.container.querySelector('#reset_btn');
    this.player1Bonus = this.container.querySelector('#player_1_bonus');
    this.player2Bonus = this.container.querySelector('#player_2_bonus');
    this.bonusMessageElem = this.container.querySelector('.bonus-message');
    this.rollDiceBtn.addEventListener('click', () => {
      this.rollDice()
    });
    this.resetBtn.addEventListener('click', () => {
      this.resetGame()
    });
    alert('welcome to dice lounge, you will be playing with a smart Bot, so fasten your seat belts 😁, Each time you get a 6 dice, you get a bonus (10) added to your score, you can play it by simply hitting your keyboard\'s Enter key, one more thing, this game contains sounds');
    this.bonusScore = 10;
    
this.maxScore=maxScore;
    this.init();

  }
  init() {
    this.randomPlayer = Math.floor(Math.random() * 2) + 1;
    this.player1Score = 0
    this.player2Score = 0
    this.player1Turn = this.randomPlayer == 1 ? true : false;
    this.robotTurn = this.randomPlayer == 1 ? false : true;
    this.gameOver = false;
    this.checkInterval = null;
    this._message(this.randomPlayer == 1 ? 'your Turn' : 'robot\'s turn');
    if (this.robotTurn && !this.gameOver && !this.player1Turn) {
      this.rollDiceBtn.style.transform = 'scale(0)';
      setTimeout(() => {
        this._robotPlay();

      }, 800)
    }
    this.player1Board.innerHTML = '';
    this.player2Board.innerHTML = '';
    this.player1ScoreElem.textContent = this.player1Score;
    this.player2ScoreElem.textContent = this.player2Score;
  }
  rollDice() {
    const RANDOM_NUMBER = Math.floor(Math.random() * 6) + 1;
    if (this.player1Turn) {

      this.player1Score += RANDOM_NUMBER >= 6 ? (RANDOM_NUMBER + this.bonusScore) : RANDOM_NUMBER;
      this._showBonusScore(RANDOM_NUMBER,this.player1Bonus);
      this._htmlCreator('div', RANDOM_NUMBER, 'dice-circle', this.player1Board);
this._sounds().play('rolldice');
      this._message('robot\'s turn');
      this.player1ScoreElem.textContent = this.player1Score;
      this.robotTurn = !this.robotTurn;
      this.rollDiceBtn.style.transform = 'scale(0)';
      this.rollDiceBtn.blur();
      this.endGame(this.player1Score, this.player2Score)

      this.giveBonus(RANDOM_NUMBER)
    }
    this.player1Turn = !this.player1Turn;

    this.checkInterval = setInterval(() => {
      if (this.robotTurn && !this.player1Turn && !this.gameOver) {

        this._robotPlay()

      }
    }, 200);


  }

  giveBonus(diceNumber) {
    let bonusMessage = ''
    switch (diceNumber) {
      case 6:
        bonusMessage = "you got 6, that's awesome"
        break;
      case 1:
        bonusMessage = "oh! that's so poor"
        break;

    }
    if (bonusMessage !== '') {

      this._bonusMessage(bonusMessage)
    }
  }
  resetGame() {
    this.init();
    this.resetBtn.style.display = 'none'
    this.rollDiceBtn.style.display = 'block';
    if (!this.robotTurn) {
      this.rollDiceBtn.style.transform = 'scale(1)';
    }
    this._sounds().stop()


  }
  endGame(player1Score, player2Score) {
    if (player1Score >= this.maxScore) {
      this._message('you won');
      this._showAndHideBtn();
      this.gameOver = true;
this._sounds().play('gameover')
    }
    else if (player2Score >= this.maxScore) {
      this._message('robot won');
      this._showAndHideBtn();
      this.gameOver = true;
this._sounds().play('gameover')


    }

  }
  _showAndHideBtn() {
    this.rollDiceBtn.style.display = 'none'
    this.resetBtn.style.display = 'block';
    this.resetBtn.focus()
  }
  _htmlCreator(element, quantity = 0, classname = '', parent) {
    if (quantity > 0 && parent) {
      parent.innerHTML = '';
      for (let i = 0; i < quantity; i++) {
        const ELEMENT = document.createElement(element);
        ELEMENT.className = classname;
        parent.appendChild(ELEMENT);

      }
    }
  }
  _classNameChanger(elem, classname) {
    elem.className = classname;
  }
  _message(message) {
    this.MESSAGE.textContent = message

  }
  _bonusMessage(bonusMessage) {
    this.bonusMessageElem.classList.add('show');
    setTimeout(() => {
      this.bonusMessageElem.classList.remove('show');

    }, 1100)
    this.bonusMessageElem.textContent = bonusMessage;

  }
  _showBonusScore(score,player){
    if(score >= 6){
      player.classList.add('show');
      player.textContent='+'+this.bonusScore;
      this._sounds().play('bonus');
      setTimeout(()=>{
        
    player.classList.remove('show')
      },1000)
    }
  }
  _robotPlay() {
    const RANDOM_NUMBER = Math.floor(Math.random() * 6) + 1;

    clearInterval(this.checkInterval)
    this.robotTurn = !this.robotTurn;
    this.player1Turn = !this.player1Turn;
    setTimeout(() => {
    clearInterval(this.checkInterval)

      this.player2Score += RANDOM_NUMBER >= 6 ? (RANDOM_NUMBER + this.bonusScore) : RANDOM_NUMBER;
this._showBonusScore(RANDOM_NUMBER,this.player2Bonus);
      this._htmlCreator('div', RANDOM_NUMBER, 'dice-circle', this.player2Board);
      this.player2ScoreElem.textContent = this.player2Score;
      this.endGame(this.player1Score, this.player2Score)

    }, 1000);
    setTimeout(() => {
      if (!this.robotTurn && !this.gameOver) {
        this._message('your turn');
        this.rollDiceBtn.style.transform = 'scale(1)';
        this.rollDiceBtn.focus()
      }
    }, 1300)
  }
  _sounds(){
    const SOUND_PLAYER= new Audio();
    const SOUNDS={
          'bonus':'bonus-sound.wav',
      'rolldice':'rolldice-sound.mp3',
      'gameover':'gameover-sound.mp3',
  
    }
    return {
          
      'play'(sound) {
        SOUND_PLAYER.src=`./sounds/${SOUNDS[sound]}`;
        SOUND_PLAYER.play();
      },
      'stop'() {
        SOUND_PLAYER.pause();
        SOUND_PLAYER.currentTime=0;
      }
    }

    
  }
}

new DiceGame('#game_container')