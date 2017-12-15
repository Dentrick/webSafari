 //made by Adrian Chiavelli

let v = new Vehicle(Math.random() * window.innerWidth,Math.random() * window.innerHeight,50);

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 18);
}
    
function draw() {
    background(50.50,50);
    stroke(0,0,0);
    VehicleCode(v);
}

function VehicleCode(Vehicle){
    Vehicle.seek(mouseX, mouseY);
    Vehicle.friction();
    Vehicle.apply();
    ellipse(Vehicle.position.x, Vehicle.position.y, Vehicle.size);   
    ellipse(Vehicle.position.x, Vehicle.position.y, Vehicle.size/2);
}