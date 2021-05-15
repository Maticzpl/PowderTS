import { Vector2 } from "../Canvas-Engine/src/engine/base_types";
import {Drawable} from "../Canvas-Engine/src/engine/object2D";
import {Particle} from "./particle";
import {Renderer} from "./render";
import {Physics} from "./physics";

export const WorldSize = new Vector2(400,300);
export var ctx:CanvasRenderingContext2D;

export class World{
    constructor(){
        this.particles = new Array(WorldSize.y);

        for (let index = 0; index < this.particles.length; index++) {            
            this.particles[index] = new Array(WorldSize.x).fill(undefined);
        }
    }

    //Itterator
    private getItterVal(i : number){ 
        let y = Math.floor(i/WorldSize.x);
        let x = i - Math.floor(i/WorldSize.x)*WorldSize.x;

        let out = this.particles[y][x];
        return out;
    }
    [Symbol.iterator] = () => {
        let i = 0;
        return{
            next:()=>{
                return{
                    done: (i >= (WorldSize.x * WorldSize.y - 1)),
                    value: this.getItterVal(i++)                        
                }
            }
        }
    }

    particles:Array<Array<Particle | undefined>>;

    
}

export var world = new World();

export class WorldManager extends Drawable{  
    constructor(){
        super();
        this.paused = false;
    }

    onUpdate(){      
    }
    
    onRender(){
        super.onRender();

        
        if(!this.paused)
            Physics.step(world);

            
        ctx = this.ctx;
        Renderer.drawFrame(world);
    }    


    addPart(part: Particle){        
        world.particles[part.position.y][part.position.x] = part;
    }

    paused:boolean;
}



//TODO: Multithreading if i fancy
/*
use this to test if supported

if (typeof(Worker) !== "undefined") {
   //great, your browser supports web workers
} else {
   //not supported
}

*/