class Puck {
    var this.x = width/2;
    var this.y = height/2;

    this.show = function () {
        fill(255, 0, 100);
        rect(this.x, this.y, 10, 10);
    }

}