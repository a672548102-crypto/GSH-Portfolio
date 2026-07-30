/*
=====================================
GSH Portfolio
personal-video.js
个人视频单播放控制 + 移动端菜单
=====================================
*/


// ===============================
// 视频单播放控制
// ===============================

const videos =
document.querySelectorAll(
"video"
);

videos.forEach(video=>{

video.addEventListener(
"play",
()=>{

videos.forEach(item=>{

if(item !== video){

item.pause();

}

});

});

});


// ===============================
// 移动端菜单
// ===============================

const menuToggle =
document.querySelector(
".menu-toggle"
);

const navLinks =
document.querySelector(
".nav-links"
);

if (menuToggle && navLinks) {

menuToggle.addEventListener(
"click",
function() {

navLinks.classList.toggle(
"open"
);

}

);

}
