//made by Adrian Chiavelli

let lost = false;
let score = 0;
let enemyTimer = 100;
let h = new Vehicle(Math.random() * window.innerWidth,Math.random() * window.innerHeight,50);
let p = [new Vehicle(Math.random() * window.innerWidth,Math.random() * window.innerHeight,55)];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 18);
    frameRate(60);

}
    
function draw() {
    newEnemy();
    background(50,50,50);
    stroke(0,0,0);
    fill(255,255,255);
    //herbivore
    if (!lost){
        VehicleCodeH(h);
        score+=p.length;
    } 
    stroke(0,0,0);
    fill(255,0,0);
    //predator
    console.log(p.length);
    for(let i = 0; i < p.length; i++){
        VehicleCodeP(p[i]);
    } 
    ifLoss();
    let s = document.querySelector("q");
    s.innerHTML = score;
}

//code for player
function VehicleCodeH(Vehicle){
    Vehicle.seek(mouseX, mouseY);
    Vehicle.friction(.005);
    Vehicle.bounce();
    Vehicle.apply();
    ellipse(Vehicle.position.x, Vehicle.position.y, Vehicle.size);   
    ellipse(Vehicle.position.x, Vehicle.position.y, Vehicle.size/2);
}

//code for predator
function VehicleCodeP(Vehicle){
    Vehicle.seek(h.position.x, h.position.y);
    for(let i = 0; i < p.length; i++){
        Vehicle.separate(p[i].position.x, p[i].position.y);
    }
    Vehicle.friction(.005);
    Vehicle.bounce();
    Vehicle.apply();
    ellipse(Vehicle.position.x, Vehicle.position.y, Vehicle.size);
}

function ifLoss(){
    if(Vehicle.isColliding(h, p)){
        lost = true;
        let p = document.querySelector("p");
        p.innerHTML = "webSafari 3.0 - You have Lost with a score of <q></q>. Press F5 or refresh to restart.";
        p.style.color = "red";
    }
}

function newEnemy(){
    if(enemyTimer <= 0){
        v = new Vehicle(Math.random() * window.innerWidth, Math.random() * window.innerHeight,55);
        p.push(v);
        enemyTimer = (1000*p.length)/(score+1) + 1000;
    }
    else{
        enemyTimer--;
    }
}