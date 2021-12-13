// table
const width = 700;
const height = 400;

// puck
const puckSize = 15;
const puckSpeed = 3;

// paddle
const paddleHeight = 100;
const paddleWidth = 20;
const paddleSpeed = 5;

// init
var puck = new Puck();
var lpaddle = new leftPaddle();
var rpaddle = new rightPaddle();

function setup() {
    createCanvas(width, height);
}

function draw() {
    background(50);
    puck.update();
    lpaddle.show();
    rpaddle.show();
    puck.show();
}

function keyPressed() {
    switch(keyCode){
        case UP_ARROW: rpaddle.up(); break;
        case DOWN_ARROW: rpaddle.down(); break;
        case 65: lpaddle.up(); break;
        case 90: lpaddle.down(); break;
    }
}

function keyReleased() {
    switch(keyCode) {
        case UP_ARROW: 
        case DOWN_ARROW:
                    rpaddle.stop(); break;
        case 65:
        case 90:
                    lpaddle.stop(); break;
        }
}


function Puck() {
    this.x = width/2;
    this.y = height/2;
    this.xspeed  = puckSpeed;
    this.yspeed  = puckSpeed;

    this.update = function() {
        this.edge();
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    this.reset = function() {
        this.x = width/2;
        this.y = height/2;
    }

    this.edge = function() {
        if (this.x <= 0) this.reset();
        if (this.x >= width) this.reset();
        if(this.y < 1 || this.y >= height) {
            this.yspeed *= -1;
        }
        if(this.x < 1 || this.x >= width) {
            this.xspeed *= -1;
        }
        if(this.x > lpaddle.x && this.x < (lpaddle.x + paddleWidth)) {
            if (this.y > lpaddle.y && this.y < (lpaddle.y + 100)) {
                this.yspeed *= -1; this.xspeed *= -1;
            }
        }
        if(this.x > rpaddle.x && this.x < (rpaddle.x + paddleWidth)) {
            if (this.y > rpaddle.y && this.y < (rpaddle.y + 100)) {
                this.yspeed *= -1; this.xspeed *= -1;
            }
        }
    }

    this.show = function () {
        fill(255, 0, 100);
        ellipse(this.x, this.y, puckSize, puckSize);
    }

}

function leftPaddle() {
    this.x = 40;
    this.y = 0;
    this.direction = 0;
    this.show = function() {
        fill(255);
        if(this.y >= 0 && this.direction < 0)
            this.y += this.direction;
        if(this.y < (height - paddleHeight) && this.direction > 0)
            this.y += this.direction;
        rect(this.x, this.y, paddleWidth, paddleHeight);
    }
    this.up = function() {
        this.direction = -1 * paddleSpeed;
    }
    this.down = function() {
        this.direction = paddleSpeed;
    }
    this.stop = function() {
        this.direction = 0;
    }
}

function rightPaddle() {
    this.x = width - 60;
    this.y = 1;
    this.direction = 0;
    this.show = function() {
        fill(0);
        if(this.y >= 0 && this.direction < 0)
            this.y += this.direction;
        if(this.y < (height - paddleHeight) && this.direction > 0)
            this.y += this.direction;
        rect(this.x, this.y, paddleWidth, paddleHeight);
    }
    this.up = function() {
        this.direction = -1 * paddleSpeed;
    }
    this.down = function() {
        this.direction = paddleSpeed;
    }
    this.stop = function() {
        this.direction = 0;
    }
}