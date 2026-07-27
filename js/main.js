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



});







/* =====================================
数字递增动画
===================================== */


function startCounter(){


const counters =
document.querySelectorAll(
".counter"
);



// 如果没有counter直接退出

if(!counters.length){

return;

}



counters.forEach(counter=>{


const text =
counter.innerText.trim();





// 判断数字单位


let number =
parseFloat(
text
);



let suffix="";



if(text.includes("万")){


suffix="万";



number =
parseFloat(text.replace("万",""));



}



if(text.includes("+")){


suffix="+";



number =
parseFloat(text.replace("+",""));



}






let current=0;



const step =
number / 80;







function update(){



current += step;



if(current < number){



counter.innerText =

Math.floor(current)
+
suffix;



requestAnimationFrame(
update
);



}else{



counter.innerText =

number
+
suffix;



}



}




update();



});



}










/* =====================================
移动端导航
===================================== */


const menu =
document.querySelector(
".menu-toggle"
);



const nav =
document.querySelector(
".nav-links"
);



if(menu && nav){



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
平滑滚动
===================================== */


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










/* =====================================
头像轻微悬浮效果
===================================== */


const avatar =
document.querySelector(
".avatar-frame"
);



if(avatar){



avatar.addEventListener(
"mouseenter",
()=>{


avatar.style.transition=
".4s";


});





avatar.addEventListener(
"mouseleave",
()=>{


avatar.style.transform=
"scale(1)";


});



}
