/* =====================================
 GSH Portfolio
 main.js
 Stable Final Version
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{



// 页面加载动画

document.body.classList.add(
"loaded"
);




// 数字动画

initCounter();



// 手机导航

initMobileMenu();



// 头像效果

initAvatar();



// 平滑滚动

initSmoothScroll();



});









/* ===============================
数字动画
=============================== */


function initCounter(){



const counters =

document.querySelectorAll(
".counter"
);





if(!counters.length)

return;







counters.forEach(counter=>{





const target =

Number(
counter.dataset.target
);





let start = 0;





const duration = 1800;





const startTime =

performance.now();









function update(time){






const progress =

Math.min(

(time-startTime)
/duration,

1

);







// 缓动效果

const value =

Math.floor(

target *

(1-Math.pow(1-progress,3))

);







counter.innerText =

value;







if(progress < 1){


requestAnimationFrame(
update
);


}else{


counter.innerText =
target;


}





}






requestAnimationFrame(
update
);






});



}













/* ===============================
移动端导航
=============================== */


function initMobileMenu(){





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
(e)=>{





e.stopPropagation();





nav.classList.toggle(
"show"
);




menu.classList.toggle(
"active"
);





});









// 点击导航自动关闭


nav.querySelectorAll(
"a"
)

.forEach(link=>{


link.addEventListener(
"click",
()=>{


nav.classList.remove(
"show"
);



menu.classList.remove(
"active"
);



});


});









// 点击页面关闭


document.addEventListener(
"click",
()=>{


nav.classList.remove(
"show"
);



menu.classList.remove(
"active"
);



});






}













/* ===============================
头像交互
=============================== */


function initAvatar(){





const avatar =

document.querySelector(
".avatar-ring"
);





if(!avatar)

return;







// PC鼠标


avatar.addEventListener(
"mouseenter",
()=>{


if(window.innerWidth > 768){


avatar.style.transform =
"scale(1.05)";


}


});








avatar.addEventListener(
"mouseleave",
()=>{


avatar.style.transform =
"scale(1)";


});









// 手机触摸


avatar.addEventListener(
"touchstart",
()=>{


avatar.style.transform =
"scale(1.03)";


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


},200);



},
{
passive:true
}

);





}













/* ===============================
平滑滚动
=============================== */


function initSmoothScroll(){





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

behavior:"smooth",

block:"start"

});





}





});






});



}
