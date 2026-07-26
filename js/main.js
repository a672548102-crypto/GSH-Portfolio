// 页面进入动画

document.addEventListener(
"DOMContentLoaded",
()=>{


document.body.classList.add(
"loaded"
);



});





// 移动端菜单

const menu =
document.querySelector(".menu-toggle");


const nav =
document.querySelector(".nav-links");



if(menu){

menu.onclick=()=>{


nav.classList.toggle("open");


}

}