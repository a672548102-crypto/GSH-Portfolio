/* =====================================
 GSH Portfolio
 main.js
 Final Version
===================================== */



document.addEventListener(
"DOMContentLoaded",
()=>{


// 页面进入

document.body.classList.add(
"loaded"
);



// 数字动画

startCounter();



// 手机菜单

mobileMenu();



// 头像效果

avatarEffect();



});









/* =====================================
 数字递增
===================================== */


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



// 动画速度

const duration = 1200;


const step =
target /
(duration / 16);







function update(){



current += step;



if(current < target){



counter.innerText =

Math.floor(current)
+
unit;



requestAnimationFrame(
update
);



}else{



counter.innerText =

target
+
unit;



}



}




update();





});



}













/* =====================================
 手机导航
===================================== */


function mobileMenu(){



const menu =
document.querySelector(
".menu-toggle"
);



const nav =
document.querySelector(
".nav-links"
);





if(!menu || !nav){

return;

}





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













/* =====================================
 头像悬浮效果
===================================== */


function avatarEffect(){



const avatar =
document.querySelector(
".avatar-ring"
);



if(!avatar){

return;

}







avatar.addEventListener(
"mousemove",
(e)=>{



const rect =
avatar.getBoundingClientRect();



const x =
e.clientX - rect.left;



const y =
e.clientY - rect.top;





const rotateX =
-(y - rect.height/2)
/15;



const rotateY =
(x - rect.width/2)
/15;






avatar.style.transform =

`

scale(1.04)

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












/* =====================================
 平滑滚动
===================================== */


document.querySelectorAll(
'a[href^="#"]'
)

.forEach(link=>{


link.addEventListener(
"click",
function(e){



const target =
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth"

});


}



});



});
