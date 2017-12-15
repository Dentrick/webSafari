class Vehicle
{ 
    //sets up vehicle with no parents
    constructor(x, y, size){
        this.position = {x,y};
        this.size = size;
        this.maxSpeed = .1;
        this.maxForce = .5;
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
        console.log(this.acceleration);
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
        x += this.position.x;
        y += this.position.y;
        let desired = {x,y};
        desired.x -= this.velocity.x;
        desired.y -= this.velocity.y;
        desired = this.clamp(desired,this.maxSpeed);
        this.applyForce(desired);
    }

    //friction
    friction(){
        let x = -this.velocity.x * .01;
        let y = -this.velocity.y * .01;
        let desired = {x,y};
        this.applyForce(desired);
    }

    //apply force method
    applyForce(force){
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
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

}