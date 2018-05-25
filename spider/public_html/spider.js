

function rectangle()
{
  var canvas = document.getElementById("pointeur"); 
  var context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle="blue";  
   context.fillStyle="red";
  context.lineWidth="2";   
  context.rect(500,100,300,150);
  context.stroke();
  context.fill();
}

window.onload=rectangle;


