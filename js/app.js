// Enemies our player must avoid
class Enemy {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	constructor() {
		this.rows = [58, 141, 224];
		this.sprite = 'images/enemy-bug.png';
		this.x = random(-300, -100);
		this.y = this.rows[random(0, 2)];
		this.speed = random(2, 3) / 3;
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.		
		this.x = this.x + 101 * this.speed * (0.9 + 0.1 * player.level) * dt;
		if (this.x > 505) {
			allEnemies.push(new Enemy(this.y));
			allEnemies.splice(allEnemies.indexOf(this), 1);
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
		this.lifeSprite = 'images/Heart.png';
		this.moveToStart();
		this.level = 1;
		this.lifes = 3;
		this.message = {
			has: true,
			text: "Start"
		};
		this.block = true;
	}
	update() {
		//meeting with enemie scenario
		for (const enemie of allEnemies) {

			if ((enemie.x >= this.x - 50) &&
				(enemie.x <= this.x + 60) &&
				(enemie.y == this.y) &&
				!this.block) {

				this.fail();
			}
		}

		//win scenario
		if (this.y < 0 && !this.block) {
			this.win();
		}

	}
	render() {
		//render player
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

		//render lifes
		ctx.font = 'bold 32px Iceland';
		ctx.fillText("Level " + this.level, 10, 40);

		let i = this.lifes,
			x = 460;
		while (i > 0) {
			ctx.drawImage(Resources.get(this.lifeSprite), x, 0, 101 / 3, 171 / 3);
			x -= 35;
			i--;
		}

		//render messages
		if (this.message.has) {
			this.block = true;
			this.showMessage();
		}
	}
	
	handleInput(keyCode) {
		if (!this.block) {
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
	}

	//player char moves to start point on field
	moveToStart() {
		this.x = 202;
		this.y = 390;
	}

	//win scenario
	win() {
		this.block = true;
		let thisPlayer = this;

		setTimeout(function () {
			thisPlayer.message.has = true,
				thisPlayer.message.text = "Next level!";
		}, 0);

		setTimeout(function () {
			thisPlayer.moveToStart();
			thisPlayer.level++;
			if (thisPlayer.level % 5 == 0) {
				thisPlayer.lifes++;
				thisPlayer.message.has = true,
					thisPlayer.message.text = "+ life";
			}
		}, 0);

	}
	
	//fail scenario
	fail() {

		this.block = true;
		let thisPlayer = this;

		if (this.lifes > 1) {
			//loose life
			setTimeout(function () {
				thisPlayer.message.has = true,
					thisPlayer.message.text = "Life lost!!!!";
			}, 0);

			setTimeout(function () {
				thisPlayer.lifes--;
				thisPlayer.moveToStart();
			}, 0);
		} else {
			//loose game and start again
			setTimeout(function () {
				thisPlayer.message.has = true,
					thisPlayer.message.text = "Game Over";
			}, 0);

			setTimeout(function () {
				thisPlayer.moveToStart();
				thisPlayer.lifes = 3;
				thisPlayer.level = 1;
				thisPlayer.message.has = true,
					thisPlayer.message.text = "New Game";
			}, 0);
		}
	}

	
	//draw message popups on canvas
	showMessage() {
		ctx.fillStyle = "red";
		ctx.fillRect(123, 198, 254, 204);
		ctx.fillStyle = "yellow";
		ctx.fillRect(125, 200, 250, 200);
		ctx.textAlign = "center";
		ctx.fillStyle = "black";
		ctx.fillText(this.message.text, 250, 300);

		let thisPlayer = this;
		setTimeout(function () {
			thisPlayer.message.has = false;
			thisPlayer.message.text = "";
			thisPlayer.block = false;
		}, 1000);
		ctx.textAlign = "left";
	}
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for(var i = 0; i < 4; i++) {
	allEnemies.push(new Enemy);
}
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
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
	return Math.round(min + Math.random() * (max + 1 - min));
}
