/*
=====================================
GSH Portfolio
main.js
Final Tech Version
=====================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{


startCounter();


initParticles();


initAvatar();


initMenu();


});






/*
=====================================
数字递增
=====================================
*/


function startCounter(){


const counters =
document.querySelectorAll(
".counter"
);



counters.forEach(counter=>{


const target =
Number(
counter.dataset.target
);


const unit =
counter.dataset.unit || "";



let current = 0;



const duration = 1500;


const step =
target /
(duration / 16);





function update(){


current += step;



if(current < target){


counter.innerText =
Math.floor(current)+unit;



requestAnimationFrame(update);



}else{


counter.innerText =
target+unit;


}



}



update();



});



}









/*
=====================================
科技粒子背景
=====================================
*/


function initParticles(){



const canvas =
document.getElementById(
"particleCanvas"
);



if(!canvas)
return;



const ctx =
canvas.getContext(
"2d"
);



let width =
canvas.width =
window.innerWidth;



let height =
canvas.height =
window.innerHeight;



const particles=[];



const count =
window.innerWidth < 768
?
35
:
80;





for(let i=0;i<count;i++){



particles.push({


x:
Math.random()*width,


y:
Math.random()*height,


size:
Math.random()*2+1,


speedX:
(Math.random()-.5)*0.4,


speedY:
(Math.random()-.5)*0.4



});


}






function draw(){



ctx.clearRect(
0,
0,
width,
height
);




particles.forEach(
(p,i)=>{



p.x += p.speedX;

p.y += p.speedY;





if(
p.x<0 ||
p.x>width
)
p.speedX*=-1;



if(
p.y<0 ||
p.y>height
)
p.speedY*=-1;







ctx.beginPath();



ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);



ctx.fillStyle =
"rgba(139,92,246,.7)";



ctx.fill();





/*
粒子连线
*/


particles.forEach(
(q,j)=>{


if(i!==j){



const dx =
p.x-q.x;



const dy =
p.y-q.y;



const distance =
Math.sqrt(
dx*dx+dy*dy
);





if(distance<120){



ctx.beginPath();



ctx.moveTo(
p.x,
p.y
);



ctx.lineTo(
q.x,
q.y
);



ctx.strokeStyle =
"rgba(0,217,255,.12)";



ctx.stroke();



}



}



});



});





requestAnimationFrame(draw);



}




draw();






window.addEventListener(
"resize",
()=>{


width =
canvas.width =
window.innerWidth;


height =
canvas.height =
window.innerHeight;



});


}









/*
=====================================
头像3D效果
=====================================
*/


function initAvatar(){



const avatar =
document.querySelector(
".avatar-ring"
);



if(!avatar)
return;




avatar.addEventListener(
"mousemove",
(e)=>{


const rect =
avatar.getBoundingClientRect();



const x =
e.clientX -
rect.left;



const y =
e.clientY -
rect.top;



const rotateX =
-(y-110)/15;



const rotateY =
(x-110)/15;





avatar.style.transform =

`
scale(1.06)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
`;



});







avatar.addEventListener(
"mouseleave",
()=>{


avatar.style.transform =
"scale(1)";


});



}









/*
=====================================
移动菜单
=====================================
*/


function initMenu(){



const menu =
document.querySelector(
".menu-toggle"
);



const nav =
document.querySelector(
".nav-links"
);



if(!menu)
return;




menu.addEventListener(
"click",
()=>{


nav.classList.toggle(
"open"
);


menu.classList.toggle(
"active"
);



});


}









/*
=====================================
页面淡入
=====================================
*/


window.addEventListener(
"load",
()=>{


document.body.classList.add(
"loaded"
);



});
