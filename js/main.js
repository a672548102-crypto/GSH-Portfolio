// =====================================
// 页面加载动画
// =====================================


document.addEventListener(
"DOMContentLoaded",
()=>{


document.body.classList.add(
"loaded"
);



startCounter();



});






// =====================================
// 数字递增动画
// =====================================


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



let current=0;



const speed =
target / 80;




const update = ()=>{


current += speed;



if(current < target){


counter.innerText =
Math.floor(current);



requestAnimationFrame(update);



}else{


counter.innerText =
target;


}


};



update();



});



}








// =====================================
// 移动端菜单
// =====================================


const menu =
document.querySelector(
".menu-toggle"
);



const nav =
document.querySelector(
".nav-links"
);



if(menu){



menu.addEventListener(
"click",
()=>{


nav.classList.toggle(
"open"
);



menu.classList.toggle(
"active"
);



}

);


}






// =====================================
// 平滑滚动
// =====================================


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






// =====================================
// 头像鼠标光效
// =====================================


const avatar =
document.querySelector(
".avatar-ring"
);



if(avatar){



avatar.addEventListener(
"mousemove",
(e)=>{


const rect =
avatar.getBoundingClientRect();



const x =
e.clientX - rect.left;



const y =
e.clientY - rect.top;



avatar.style.transform =

`
scale(1.08)
rotateX(${-(y-130)/20}deg)
rotateY(${(x-130)/20}deg)
`;



});





avatar.addEventListener(
"mouseleave",
()=>{


avatar.style.transform=
"scale(1)";


});


}
