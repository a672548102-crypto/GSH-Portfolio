/*
=====================================
GSH Portfolio
main.js
Final Tech Version（无粒子）
=====================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{

startCounter();

// 删除 initParticles(); 调用

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
