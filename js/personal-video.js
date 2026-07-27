/* =====================================
   个人视频单播放控制
===================================== */


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