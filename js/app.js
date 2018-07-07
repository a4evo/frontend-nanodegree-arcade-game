// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
  constructor() {
		this.rows = [63, 146, 229];
		this.sprite = 'images/enemy-bug.png';
		this.x = random(-300, -100);
		this.y = this.rows[random(0, 2)];
		this.speed = random(2, 3)/3;
		this.won = false;
	}  
	
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.		
			this.x = this.x + 101 * this.speed * (0.85 + 0.15 * player.level) * dt;
		  if (this.x > 505) {
				allEnemies.push(new Enemy(this.y));
				allEnemies.splice(allEnemies.indexOf(this),1);
			}
		
	}

// Draw the enemy on the screen, required method for game
	render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.moveToStart();
		this.level = 1;
		this.lifes = 1;
	}
	update() {
		//meeting with enemie
		for (const enemie of allEnemies) {
			
			if (		(enemie.x >= this.x - 50) 
				  && 	(enemie.x <= this.x + 60) 
					&& 	(enemie.y + 5 == this.y)
				  &&	(this.lifes > 0)) {
				this.fail();
			}
		}
		
		//TODO win
		if (this.y < 0 && !this.won) {	
			this.won = true;
			this.win();
					
		}
		
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	handleInput(keyCode) {
		switch (keyCode) {
			case "up":
				this.y = this.y > 0 ? this.y - 83 : this.y;
				break;
			case "down":
				this.y = this.y < 400 ? this.y + 83 : this.y;
				break;
			case "left":
				this.x = this.x > 0 ? this.x - 101 : this.x;
				break;
			case "right":
				this.x = this.x < 404 ? this.x + 101 : this.x;
				break;				
		}
	}
	
	moveToStart() {		
		this.x = 202;
		this.y = 400;
	}

	win() {		
		setTimeout(function() {
				alert("WIN!!!!");	
				
		}, 100);
		let thisPlayer = this;
		setTimeout(function() {
			thisPlayer.moveToStart();
			thisPlayer.won = false;
			thisPlayer.level ++;				
		}, 500);		
		
	}
	
	fail() {
		
		this.lifes --;
		setTimeout(function() {
				alert("FAIL!!!!");					
		}, 100);
		let thisPlayer = this;
		setTimeout(function() {
			thisPlayer.moveToStart();
			thisPlayer.lifes = 1;
			thisPlayer.level = 1;				
		}, 500);	
	}
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()]; 
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//random numbers generator
function random(min, max) {
	return Math.round(min + Math.random()*(max+1-min));
}