//made by Adrian Chiavelli

let h = new Vehicle(Math.random() * window.innerWidth,Math.random() * window.innerHeight,50);
let p1 = new Vehicle(Math.random() * window.innerWidth,Math.random() * window.innerHeight,55);
let p2 = new Vehicle(Math.random() * window.innerWidth,Math.random() * window.innerHeight,55);
let p3 = new Vehicle(Math.random() * window.innerWidth,Math.random() * window.innerHeight,55);

let lost = false;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 18);
}
    
function draw() {
    background(50,50,50);
    stroke(0,0,0);
    //herbivore
    if (!lost){
        VehicleCodeH(h);
    } 
    stroke(255,0,0);
    //predator
    VehicleCodeP(p1);
    VehicleCodeP(p2);
    VehicleCodeP(p3);
    ifLoss();
}

function VehicleCodeH(Vehicle){
    Vehicle.seek(mouseX, mouseY);
    Vehicle.friction(.005);
    Vehicle.bounce();
    Vehicle.apply();
    ellipse(Vehicle.position.x, Vehicle.position.y, Vehicle.size);   
    ellipse(Vehicle.position.x, Vehicle.position.y, Vehicle.size/2);
}

function VehicleCodeP(Vehicle){
    Vehicle.seek(h.position.x, h.position.y);
    Vehicle.separate(p1.position.x, p1.position.y);
    Vehicle.separate(p2.position.x, p2.position.y);
    Vehicle.separate(p3.position.x, p3.position.y);
    Vehicle.friction(.005);
    Vehicle.bounce();
    Vehicle.apply();
    ellipse(Vehicle.position.x, Vehicle.position.y, Vehicle.size);   
}

function ifLoss(){
    if(Vehicle.isColliding(h, p1)||Vehicle.isColliding(h, p2)||Vehicle.isColliding(h, p3)){
        lost = true;
        let p = document.querySelector("p");
        p.innerHTML = "webSafari 2.0 - You have Lost. press F5 or refresh to restart";
        p.style.color = "red";
    }
}