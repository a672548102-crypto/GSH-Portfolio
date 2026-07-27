/* =====================================
GSH Portfolio V7.0
main.js
Final Fix
===================================== */



document.addEventListener(
"DOMContentLoaded",
()=>{


// 页面加载

document.body.classList.add(
"loaded"
);



// 数字动画

startCounter();



// 头像交互

avatarEffect();



// 手机导航

mobileMenu();



});







/* =====================
数字递增
===================== */


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



let current = 0;



const duration = 1200;



const step =
target /
(duration / 16);




function update(){


current += step;



if(current < target){


counter.innerText =
Math.floor(current);



requestAnimationFrame(update);



}else{


counter.innerText =
target;



}


}



update();



});



}








/* =====================
头像效果
===================== */


function avatarEffect(){


const avatar =
document.querySelector(
".avatar-ring"
);



if(!avatar)
return;




// PC


if(window.innerWidth > 768){



avatar.addEventListener(
"mouseenter",
()=>{


avatar.style.transform =
"scale(1.05)";


});




avatar.addEventListener(
"mouseleave",
()=>{


avatar.style.transform =
"scale(1)";


});



}






// 手机触摸


if(window.innerWidth <= 768){



avatar.addEventListener(
"touchstart",
()=>{


avatar.style.transform =
"scale(1.04)";


},
{
passive:true
}

);





avatar.addEventListener(
"touchend",
()=>{


setTimeout(()=>{


avatar.style.transform =
"scale(1)";


},150);



},
{
passive:true
}

);



}




}








/* =====================
移动端导航
===================== */


function mobileMenu(){



const menu =
document.querySelector(
".menu-toggle"
);



const nav =
document.querySelector(
".nav-links"
);





if(!menu || !nav)
return;





menu.addEventListener(
"click",
()=>{


nav.classList.toggle(
"show"
);



menu.classList.toggle(
"active"
);



});





}








/* =====================
平滑滚动
===================== */


document
.querySelectorAll(
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
