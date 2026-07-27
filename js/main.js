/* =====================================
GSH Portfolio
main.js
Final Tech Version
===================================== */



document.addEventListener(
"DOMContentLoaded",
()=>{


// 页面加载动画

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
数字递增动画
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



const suffix =

counter.dataset.suffix || "";



let current = 0;



// 根据数字大小调整速度

let speed;



if(target > 1000000){


speed = target / 120;


}

else{


speed = target / 80;


}






function update(){



current += speed;




if(current < target){



counter.innerText =

formatNumber(
Math.floor(current)
)
+
suffix;



requestAnimationFrame(
update
);



}

else{


counter.innerText =

formatNumber(target)
+
suffix;



}



}



update();



});



}









/* =====================================
数字格式化
===================================== */


function formatNumber(num){



if(num >= 10000000){


return (

(num / 10000000)
.toFixed(0)

+
"千万"

);



}



if(num >=10000){


return (

(num / 10000)
.toFixed(0)

+
"万"

);



}



return num;



}









/* =====================================
移动端导航
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







// 点击导航关闭


nav.querySelectorAll(
"a"
)

.forEach(link=>{


link.addEventListener(
"click",
()=>{


nav.classList.remove(
"open"
);



});



});




}










/* =====================================
头像轻微3D效果
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

e.clientX -
rect.left;



const y =

e.clientY -
rect.top;





const rotateX =

-(y -
rect.height/2)
/
25;



const rotateY =

(x -
rect.width/2)
/
25;





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

"scale(1) rotateX(0) rotateY(0)";



});



}









/* =====================================
页面滚动显示
===================================== */


const observer =

new IntersectionObserver(

(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);


}


});


},

{

threshold:.15

}

);




document.querySelectorAll(
".advantage-card,.stats,.hero-content"
)

.forEach(
(el)=>{


observer.observe(el);



});
