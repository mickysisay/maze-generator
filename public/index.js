
let cols,rows;
let w = 10;
let grid = [];
let current;
let stack =[];
const canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "black";
let context = canvas.getContext("2d");
window.onload= ()=>{
    canvasCreation();
}
function canvasCreation(){
    
    cols = Math.floor(canvas.width / w );
    rows = Math.floor(canvas.height / w);
     for(let j=0;j<rows;j++){
         for(let i=0;i<cols;i++){
             let newCell = new Cell(i,j);
           grid.push(newCell)
         // newCell.show();
         }
     }
     current = grid[0];
     stack.push(current);
     draw();
  
     
}
function draw(){
    //console.log(grid[1].show());
    draws();
  // draws();
    
    
}
function draws(){
    current.visited = true;
    
    for(let i=0;i<grid.length;i++){
        grid[i].show();
    }
    let now = setInterval(()=>{
    
    let next = current.checkNeighbours(); 
    
    if(next){
       // console.log(current);
       stack.push(current);
       current.visited=true;
       let current1=grid.indexOf(current);
       let next1 = grid.indexOf(next);
        removeWalls(current,next);
        
        
        next.visited = true;
        // console.log(current);
        // console.log(next);
        grid[current1] = current;
        grid[next1]= next;
        current = next;
        
        // console.log(grid[current1]);
        // console.log(grid[next1]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath()
        // for(let i=0;i<grid.length;i++){
        //   grid[i].show();
        // }
    }else if(stack.length>0){
        current = stack.pop();
        
    }
    else{
        for(let i=0;i<grid.length;i++){
          grid[i].show();
        }
        clearInterval(now);
    }
   },1)
    
}
function drawThings(){
    current.visited = true;
    
    for(let i=0;i<grid.length;i++){
        grid[i].show();
    }
    let now = setInterval(()=>{
    
    let next = current.checkNeighbours(); 
    let current1;
    let next1;
    if(next){
       // console.log(current);
       stack.push(current);
       current.visited=true;
        current1=grid.indexOf(current);
        next1 = grid.indexOf(next);
        removeWalls(current,next);
        
        
        next.visited = true;
        // console.log(current);
        // console.log(next);
        grid[current1] = current;
        grid[next1]= next;
        current = next;
        
        // console.log(grid[current1]);
        // console.log(grid[next1]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath()
        for(let i=0;i<grid.length;i++){
          if(i=== next1){
              //console.log(grid[i]);
              //grid[i].isCurrent = true;
            grid[i].current();
          }else{
              grid[i].show();
         } }
    }else if(stack.length>0){
        current = stack.pop();
       
        
    }
    else{
        clearInterval(now);
    }
   },50)
    
}
class Cell  {
   constructor(i,j){
       this.i =i;
       this.j = j; 
       this.walls = [true,true,true,true]
       this.visited = false;
       this.isCurrent = false;
   }
   current(){
    let x = this.i*w;
       let y = this.j*w;
    context.fillStyle = "#f0000f";
    context.fillRect(x,y,w,w);
   }
   show(){
       let x = this.i*w;
       let y = this.j*w;
      //horizontal lines
       //top
       if(this.walls[0]){
       context.moveTo(x,y);
       context.lineTo(x+w,y);
       context.strokeStyle = "#ffffff";
       context.stroke();
       }
       //bottom
       if(this.walls[2]){
       context.moveTo(x+w,y+w);
       context.lineTo(x,y+w);
       context.strokeStyle = "#ffffff";
       context.stroke();
       }
       //vertical lines
       //left
       if(this.walls[3]){
       context.moveTo(x,y+w);
       context.lineTo(x,y);
       context.strokeStyle = "#ffffff";
       context.stroke();
       }
       //right
       if(this.walls[1]){
       context.moveTo(x+w,y);
       context.lineTo(x+w,y+w);
       context.strokeStyle = "#ffffff";
       context.stroke();
       }
        
      if(this.isCurrent){
         // console.log(x,y);
        context.fillStyle = "#f000ff";
        context.fillRect(x,y,w,w);
       
      }else if(this.visited){
        context.fillStyle = "#ff00ff";
        context.fillRect(x,y,w,w);
       
      }
   }
   checkNeighbours(){
       let neighbour = [];
       let areVisited = {
         "top" : grid[index(this.i,this.j-1)], 
         "right" : grid[index(this.i+1,this.j)], 
         "bottom" : grid[index(this.i,this.j+1)], 
         "left" : grid[index(this.i-1,this.j)]
       }
      // console.log(index(this.i-1,this.j));
      for(let all in areVisited){
        
          try{
          if(!areVisited[all].visited){
              
              neighbour.push(areVisited[all])
          }}catch(e){

          }
      } 
      
    //  console.log(neighbour);
       if(neighbour.length>0){
           return neighbour[Math.floor(Math.random()*neighbour.length)];
       }else{
           return undefined;
       }
   }
}
function index(i,j){
    if(i<0 || j<0 || i >=cols || j >=rows){
        return -1;
    }

    return i+(j)*cols;
}
function removeWalls(a,b){
    let x = a.i -b.i;
    let y = a.j-b.j;
    if(x === 1){
        a.walls[3] =false;
        b.walls[1] = false;
    }else if(x === -1){
        a.walls[1]=false;
        b.walls[3]=false;
    }
    if(y === 1){
        a.walls[0] =false;
        b.walls[2] = false;
    }else if(y === -1){
        a.walls[2]=false;
        b.walls[0]=false;
    }
}