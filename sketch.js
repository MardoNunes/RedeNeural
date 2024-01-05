function setup(){
    createCanvas(500, 500);
    background(0);

    var r = new RedeNeural(1, 3, 1);
    var arr = [1,2];
    Matrix.arrayToMatrix(arr);
    r.feedforward(arr);

}

function draw(){

}