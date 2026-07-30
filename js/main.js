/*
=====================================
GSH Portfolio
main.js
静态暗金网格（无动画，无流光）
=====================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{

initStaticGrid();

startCounter();

initAvatar();

initMenu();

});


/*
=====================================
静态暗金网格背景（无动画）
=====================================
*/


function initStaticGrid(){

const canvas =
document.getElementById(
"particleCanvas"
);

if(!canvas) return;

const ctx =
canvas.getContext(
"2d"
);

let W, H;

const GRID_SIZE = 68;
const GAP = 6;
const CORNER_RADIUS = 6;

// 暗金暖色
const GRID_COLOR = {
r: 212,
g: 165,
b: 116,
a: 0.12
};

let cols, rows;

function resize(){
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
cols = Math.ceil(W / GRID_SIZE) + 4;
rows = Math.ceil(H / (GRID_SIZE * 0.866)) + 4;
}
window.addEventListener("resize", resize);
resize();

function draw(){

ctx.clearRect(0, 0, W, H);

// 深色底
ctx.fillStyle = '#080605';
ctx.fillRect(0, 0, W, H);

// 绘制网格方块
const halfGrid = GRID_SIZE / 2;
const size = GRID_SIZE - GAP;

for(let r = 0; r < rows; r++){
for(let c = 0; c < cols; c++){
const offsetX = (r % 2) * halfGrid;
const x = c * GRID_SIZE + offsetX - GRID_SIZE * 0.5;
const y = r * GRID_SIZE * 0.866 - GRID_SIZE * 0.5;

const pad = GAP / 2;
const drawSize = size;
const radius = CORNER_RADIUS;

ctx.beginPath();
ctx.moveTo(x + pad + radius, y + pad);
ctx.lineTo(x + pad + drawSize - radius, y + pad);
ctx.quadraticCurveTo(x + pad + drawSize, y + pad, x + pad + drawSize, y + pad + radius);
ctx.lineTo(x + pad + drawSize, y + pad + drawSize - radius);
ctx.quadraticCurveTo(x + pad + drawSize, y + pad + drawSize, x + pad + drawSize - radius, y + pad + drawSize);
ctx.lineTo(x + pad + radius, y + pad + drawSize);
ctx.quadraticCurveTo(x + pad, y + pad + drawSize, x + pad, y + pad + drawSize - radius);
ctx.lineTo(x + pad, y + pad + radius);
ctx.quadraticCurveTo(x + pad, y + pad, x + pad + radius, y + pad);
ctx.closePath();

ctx.fillStyle = `rgba(${GRID_COLOR.r}, ${GRID_COLOR.g}, ${GRID_COLOR.b}, ${GRID_COLOR.a})`;
ctx.fill();
}
}

requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", resize);

console.log('✨ 静态暗金网格已启动');
}


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

if(!counters.length) return;

counters.forEach(counter=>{

const target =
Number(
counter.dataset.target
);

const unit =
counter.dataset.unit || "";

let current = 0;

const duration = 1500;
const step = target / (duration / 16);

function update(){
current += step;
if(current < target){
counter.innerText = Math.floor(current)+unit;
requestAnimationFrame(update);
}else{
counter.innerText = target+unit;
}
}

setTimeout(update, 300);

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

if(!avatar) return;

avatar.addEventListener(
"mousemove",
(e)=>{

const rect =
avatar.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
const rotateX = -(y-110)/15;
const rotateY = (x-110)/15;

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
avatar.style.transform = "scale(1)";
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

if(!menu) return;

menu.addEventListener(
"click",
()=>{
nav.classList.toggle("open");
menu.classList.toggle("active");
});

}


window.addEventListener(
"load",
()=>{
document.body.classList.add("loaded");
});
