class Vehicle
{ 
    //sets up vehicle with no parents
    constructor(x, y, size){
        this.position = {x,y};
        this.size = size;
        this.hSize = size/2;
        this.maxSpeed = .1;
        this.maxForce = 5;
        this.maxX = window.innerWidth;
        this.maxY = window.innerHeight;
        x = 0;
        y = 0;
        this.velocity = {x,y};
        this.acceleration = {x,y};
    }

    //apply method
    apply(){
        this.acceleration = this.clamp(this.acceleration,this.maxForce);
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }

    //seek method (inbuilt arrive)
    seek(x,y){
        x -= this.position.x;
        y -= this.position.y;
        let desired = {x,y};
        desired.x -= this.velocity.x;
        desired.y -= this.velocity.y;
        desired = this.clamp(desired,this.maxSpeed);      
        this.applyForce(desired);
    }

    //flee method
    flee(x,y){
        x -= this.position.x;
        y -= this.position.y;
        x = -x;
        y = -y;
        let desired = {x,y};
        desired.x -= this.velocity.x;
        desired.y -= this.velocity.y;
        desired = this.clamp(desired,this.maxSpeed);
        this.applyForce(desired);
    }

    //separate
    separate(x,y){
        //make sure this isn't the same object
        if (x == this.position.x && y == this.position.y){
            return;
        }
        //if less than 100 pixels away
        if ((x-this.position.x)*(x-this.position.x)+(y-this.position.y)*(y-this.position.y) < 20000){
            this.flee(x,y);
        }
    }

    //friction
    friction(c){
        let x = -this.velocity.x * c;
        let y = -this.velocity.y * c;
        let desired = {x,y};
        this.applyForce(desired);
    }

    //apply force method
    applyForce(force){
        this.acceleration.x += force.x / (50/this.size);
        this.acceleration.y += force.y / (50/this.size);
    }

    //clamp vector
    clamp(vector, limit){
        let mag = Math.sqrt(vector.x*vector.x+vector.y*vector.y)
        if (mag > limit){
            vector.x /= mag;
            vector.y /= mag;
            vector.x *= limit;
            vector.y *= limit;
            return vector;
        }
        else{
            return vector;
        }  
    }

    //bounce
    bounce(){
        if (this.position.x >= window.innerWidth || this.position.x <= 0){
            this.velocity.x = - this.velocity.x;
        }
        if (this.position.y >= window.innerHeight || this.position.y <= 0){
            this.velocity.y = - this.velocity.y;
        }
    }

    //check collisions
    static isColliding(v1, p){
        let collision = false;
        for (let i = 0; i < p.length; i++){
            if((v1.position.x-p[i].position.x)*(v1.position.x-p[i].position.x)+(v1.position.y-p[i].position.y)*(v1.position.y-p[i].position.y) < (v1.hSize+p[i].hSize)*(v1.hSize+p[i].hSize)){
                collision = true;
            }
        }
        if (collision){
            return true;
        }
        return false;
    }

}