// Objects
let canvas = {
    element: document.getElementById('canvas'),
    height: window.innerHeight,
    width: window.innerWidth,
    draw: function () {
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        document.body.prepend(this.element);
    },
    update: function () {
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.element.style.height = window.innerHeight + 'px';
        this.element.style.width = window.innerWidth + 'px';
    }
}

var ball = {
    draw: function (radius = 25) {
        let myCustomBall = Object.create(this);
        myCustomBall.element = document.createElement('div');
        myCustomBall.element.id +='ball';
        myCustomBall.element.style.backgroundColor =  '#d578ff';
        myCustomBall.radius = radius;
        myCustomBall.width = radius*2;
        myCustomBall.height = radius*2;
        myCustomBall.x = Math.floor(Math.random() * (canvas.width - radius * 2) + 1);
        myCustomBall.y = Math.floor(Math.random() * (canvas.height - radius * 2) + 1);
        myCustomBall.dx = this.toDirection();
        myCustomBall.dy = this.toDirection();
        myCustomBall.element.style.width = myCustomBall.width + 'px';
        myCustomBall.element.style.height = myCustomBall.height + 'px';
        myCustomBall.element.style.backgroundColor = myCustomBall.color;
        // Add ball to canvas
        canvas.element.appendChild(myCustomBall.element);
        return myCustomBall;
    },

    directions: [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6],
    
    toDirection: function () {
        return this.directions[Math.floor(Math.random()*this.directions.length)];
    },

    moveTo: function (x,y) {
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    },

    hitWall: function (x, y) {
        if (x < 0 || x > canvas.width - this.width) {
            this.dx = -this.dx;
        } 

        if (y < 0 || y > canvas.height - this.height) {
            this.dy = -this.dy;
        }
    },

    startMoving: function (x = this.x, y = this.y) {
        this.moveTo(x, y);
        let ball = this;
        setTimeout(function () {
            ball.hitWall(x ,y);
            ball.startMoving(x + ball.dx, y + ball.dy); 
        }, 1000/60);
    },

    speedUp: function() {
        if (Math.abs(this.dx) < 20 && Math.abs(this.dy) <20) {
            btnSlowDown.classList.remove('hidden');
            this.dx = Math.floor(1.5 * this.dx);
            this.dy = Math.floor(1.5 * this.dy);
        } else {
            btnSlowDown.classList.remove('hidden');
            btnSpeedUp.classList.add('hidden');
        }
    },
    
    slowDown: function() {
        if (Math.abs(this.dy) > 2 && Math.abs(this.dx) > 2) {
            btnSpeedUp.classList.remove('hidden');
            this.dx = Math.floor(this.dx / 1.5);
            this.dy = Math.floor(this.dy / 1.5);
        } else {
            btnSpeedUp.classList.remove('hidden');
            btnSlowDown.classList.add('hidden');
        }
    }
}

// Create
canvas.draw();
let newBall = ball.draw();
newBall.startMoving();
// Controller
let btnSpeedUp = document.getElementById('speedUp');
let btnSlowDown = document.getElementById('slowDown');
// Event
btnSpeedUp.addEventListener('click', function () {
    setTimeout(newBall.speedUp(), 1000/50);
})

btnSlowDown.addEventListener('click', function () {
    setTimeout(newBall.slowDown(), 1000/50);
})

document.addEventListener('keydown', function(e) {
    if (e.keyCode == '38' || e.keyCode == '39') {
        btnSpeedUp.click();
    }
    
    if (e.keyCode == '37' || e.keyCode == '40') {
        btnSlowDown.click();
    }
})

// Reload page when stop resizing
var rtime;
var timeout = false;
var delta = 200;
window.onresize = function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
};

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        window.location.reload()
    }               
}
