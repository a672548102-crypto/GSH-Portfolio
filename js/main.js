/*
=====================================
GSH Portfolio
main.js
暗金暖色网格 · 流光照射效果
=====================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{

initGridBackground();

startCounter();

initAvatar();

initMenu();

});


/*
=====================================
暗金暖色网格 + 流光照射背景
=====================================
*/


function initGridBackground(){

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
let time = 0;
let mouseX = -1000;
let mouseY = -1000;

// ---- 网格参数 ----
const GRID_SIZE = 68;          // 格子大小
const GAP = 6;                // 格子间距
const CORNER_RADIUS = 6;      // 圆角大小

// ---- 颜色配置（暗金暖色系） ----
const COLORS = {
// 暗态（未被照亮时几乎看不见）
dark: { r: 40, g: 32, b: 26, a: 0.04 },
// 亮态（被流光照射时的暖金色）
light: { r: 212, g: 165, b: 116 },
// 高亮（流光中心区域）
highlight: { r: 240, g: 208, b: 128 },
// 流光光晕
glow: { r: 212, g: 165, b: 116, a: 0.06 }
};

// ---- 流光参数 ----
let lightX = -300;
let lightY = 0;
const LIGHT_RADIUS = 380;
const LIGHT_SPEED = 0.6;
let lightDirection = 1;
let lightPhase = 0;

let cols, rows;

// ---- 窗口尺寸变化 ----
function resize(){
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
cols = Math.ceil(W / GRID_SIZE) + 4;
rows = Math.ceil(H / (GRID_SIZE * 0.866)) + 4;
}
window.addEventListener("resize", resize);
resize();

// ---- 鼠标/触摸追踪 ----
document.addEventListener("mousemove", function(e){
mouseX = e.clientX;
mouseY = e.clientY;
});

document.addEventListener("touchmove", function(e){
const t = e.touches[0];
if(t){
mouseX = t.clientX;
mouseY = t.clientY;
}
}, { passive: true });

document.addEventListener("touchstart", function(e){
const t = e.touches[0];
if(t){
mouseX = t.clientX;
mouseY = t.clientY;
}
}, { passive: true });

// ---- 工具：计算距离 ----
function distance(x1, y1, x2, y2){
const dx = x1 - x2;
const dy = y1 - y2;
return Math.sqrt(dx*dx + dy*dy);
}

// ---- 工具：亮度转颜色 ----
function getColor(brightness){
// brightness: 0-1
const r = Math.round(COLORS.dark.r + (COLORS.light.r - COLORS.dark.r) * brightness);
const g = Math.round(COLORS.dark.g + (COLORS.light.g - COLORS.dark.g) * brightness);
const b = Math.round(COLORS.dark.b + (COLORS.light.b - COLORS.dark.b) * brightness);
return { r, g, b };
}

// ---- 主绘制循环 ----
function draw(){

time++;

// ---- 流光运动（横向往返 + 上下波动） ----
lightPhase += 0.008;
const cycleWidth = W + 600;

// 横向：平滑往返
const progress = (time * LIGHT_SPEED) % (cycleWidth * 2);
if(progress < cycleWidth){
lightX = -300 + progress;
} else {
lightX = -300 + cycleWidth - (progress - cycleWidth);
}

// 上下：正弦波动
lightY = H * 0.45 + Math.sin(lightPhase) * H * 0.3 + Math.sin(lightPhase * 0.7 + 1.2) * H * 0.08;

// ---- 清除画布 ----
ctx.clearRect(0, 0, W, H);

// ---- 绘制深色暖底 ----
const bgGrad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.8);
bgGrad.addColorStop(0, '#1a1410');
bgGrad.addColorStop(0.5, '#0f0c0a');
bgGrad.addColorStop(1, '#080605');
ctx.fillStyle = bgGrad;
ctx.fillRect(0, 0, W, H);

// ---- 绘制网格方块（交错排列） ----
const halfGrid = GRID_SIZE / 2;
const size = GRID_SIZE - GAP;

for(let r = 0; r < rows; r++){
for(let c = 0; c < cols; c++){
// 交错偏移（砖墙效果）
const offsetX = (r % 2) * halfGrid;
const x = c * GRID_SIZE + offsetX - GRID_SIZE * 0.5;
const y = r * GRID_SIZE * 0.866 - GRID_SIZE * 0.5;

// 方块中心点
const cx = x + GRID_SIZE / 2;
const cy = y + GRID_SIZE / 2;

// ---- 计算流光亮度 ----
let brightness = 0;
const distToLight = distance(cx, cy, lightX, lightY);
if(distToLight < LIGHT_RADIUS){
brightness = 1 - (distToLight / LIGHT_RADIUS);
brightness = Math.pow(brightness, 1.6); // 更集中的光晕
brightness = Math.min(1, brightness * 1.2);
}

// ---- 鼠标影响（小范围高亮） ----
let mouseBright = 0;
const distToMouse = distance(cx, cy, mouseX, mouseY);
if(distToMouse < 120){
mouseBright = 1 - (distToMouse / 120);
mouseBright = Math.pow(mouseBright, 1.8) * 0.35;
}

const finalBright = Math.min(1, brightness + mouseBright);

// ---- 计算颜色 ----
let rColor, gColor, bColor, alpha;
if(finalBright < 0.01){
// 极暗态：几乎不可见
rColor = COLORS.dark.r;
gColor = COLORS.dark.g;
bColor = COLORS.dark.b;
alpha = 0.02;
} else {
// 根据亮度渐变到暖金色
const brightFactor = Math.min(1, finalBright * 1.1);
rColor = Math.round(COLORS.dark.r + (COLORS.light.r - COLORS.dark.r) * brightFactor);
gColor = Math.round(COLORS.dark.g + (COLORS.light.g - COLORS.dark.g) * brightFactor);
bColor = Math.round(COLORS.dark.b + (COLORS.light.b - COLORS.dark.b) * brightFactor);
alpha = 0.04 + 0.85 * brightFactor;

// 高亮区域（流光中心或鼠标悬停）颜色更暖更亮
if(finalBright > 0.5){
const highlightFactor = (finalBright - 0.5) * 2;
rColor = Math.round(rColor + (COLORS.highlight.r - rColor) * highlightFactor * 0.6);
gColor = Math.round(gColor + (COLORS.highlight.g - gColor) * highlightFactor * 0.6);
bColor = Math.round(bColor + (COLORS.highlight.b - bColor) * highlightFactor * 0.6);
}
}

// ---- 绘制圆角方块 ----
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

ctx.fillStyle = `rgba(${rColor}, ${gColor}, ${bColor}, ${alpha})`;
ctx.fill();

// ---- 高亮时发光效果 ----
if(finalBright > 0.2){
const glowIntensity = finalBright * 0.12;
ctx.shadowColor = `rgba(212, 165, 116, ${glowIntensity})`;
ctx.shadowBlur = 18;
ctx.fill();
ctx.shadowBlur = 0;
}

// ---- 非常亮时加一层内发光 ----
if(finalBright > 0.6){
const innerGlow = (finalBright - 0.6) * 0.15;
ctx.shadowColor = `rgba(240, 208, 128, ${innerGlow})`;
ctx.shadowBlur = 30;
ctx.fill();
ctx.shadowBlur = 0;
}
}
}

// ---- 绘制流光光晕（可见光雾） ----
const glowGrad = ctx.createRadialGradient(
lightX, lightY, 0,
lightX, lightY, LIGHT_RADIUS
);
glowGrad.addColorStop(0, 'rgba(212, 165, 116, 0.05)');
glowGrad.addColorStop(0.3, 'rgba(212, 165, 116, 0.025)');
glowGrad.addColorStop(0.7, 'rgba(180, 140, 100, 0.01)');
glowGrad.addColorStop(1, 'rgba(180, 140, 100, 0)');
ctx.fillStyle = glowGrad;
ctx.beginPath();
ctx.arc(lightX, lightY, LIGHT_RADIUS, 0, Math.PI * 2);
ctx.fill();

// ---- 流光核心光晕（更亮的光心） ----
const coreGrad = ctx.createRadialGradient(
lightX, lightY, 0,
lightX, lightY, LIGHT_RADIUS * 0.25
);
coreGrad.addColorStop(0, 'rgba(240, 208, 128, 0.02)');
coreGrad.addColorStop(1, 'rgba(212, 165, 116, 0)');
ctx.fillStyle = coreGrad;
ctx.beginPath();
ctx.arc(lightX, lightY, LIGHT_RADIUS * 0.25, 0, Math.PI * 2);
ctx.fill();

requestAnimationFrame(draw);
}

draw();

// ---- 窗口resize重新计算 ----
window.addEventListener("resize", resize);

// ---- 暴露调整参数（方便调试） ----
window.__gridConfig = {
GRID_SIZE,
GAP,
LIGHT_RADIUS,
LIGHT_SPEED
};

console.log('✨ 暗金暖色网格 + 流光照射已启动');
console.log('💡 调整参数: window.__gridConfig');
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

// 延迟启动，让背景先渲染
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

if(!menu) return;

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
