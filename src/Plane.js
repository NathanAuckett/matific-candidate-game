import { Component } from "./Component.js";
import { Parachuter } from "./Parachuter.js";

export class Plane extends Component {
    constructor(gameManager, x, y){
        super(gameManager);
        this.x = x;
        this.y = y;
        this.width = 128;
        this.height = 64;

        this.spd = 2;

        this.parachutersMax = 5;
        this.parachutersPool = [];

        this.dropFrequency = 2500;

        this.dropLogic = function(){
            if (this.x > this.width * 0.75 && this.x < this.gameManager.width - this.width * 0.75){
                if (this.parachutersPool.length < this.parachutersMax){
                    this.parachutersPool.push(gameManager.componentAdd(new Parachuter(gameManager, this.x + this.width / 2, this.y + this.height)));
                }
                else{
                    for (const parachuter of this.parachutersPool){
                        if (!parachuter.active){
                            parachuter.reset(this.x + this.width / 2, this.y + this.height);
                            break;
                        }
                    }
                }
                this.dropInterval = setTimeout(() => {this.dropLogic()}, this.dropFrequency);
            }
            else{
                this.dropInterval = setTimeout(() => {this.dropLogic()}, 1000 * Math.random());
            }
        }

        setTimeout(() => {
            this.dropLogic();
        }, this.dropFrequency);
    }

    step(){
        this.x -= this.spd;
        if (this.x < -this.width){
            this.x = this.gameManager.width + 200;
        }
    }
    draw(){
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}