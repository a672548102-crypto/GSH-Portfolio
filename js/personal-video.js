/* =====================================
 GSH Portfolio
 personal-video.js
 Stable Final Version
===================================== */



document.addEventListener(
"DOMContentLoaded",
()=>{


loadVideos();


});









/* ===============================
加载视频数据
=============================== */


function loadVideos(){





const grid =

document.getElementById(
"videoGrid"
);






if(!grid)

return;








fetch(
"assets/data/videos.json"
)

.then(res=>{


if(!res.ok){


throw new Error(
"videos.json加载失败"
);


}



return res.json();



})

.then(data=>{





renderVideos(
grid,
data
);






})

.catch(err=>{


console.error(
"视频数据错误:",
err
);



grid.innerHTML=`

<div class="empty-tip">

视频作品加载失败

</div>

`;



});





}














/* ===============================
生成视频卡片
=============================== */


function renderVideos(grid,videos){






grid.innerHTML="";







if(!videos || videos.length===0){



grid.innerHTML=`

<div class="empty-tip">

暂无视频作品

</div>

`;

return;


}








const videoList=[];







videos.forEach(item=>{





const card =

document.createElement(
"div"
);



card.className=

"video-card";







const videoSrc =

item.video ||

"";







card.innerHTML=`

<div class="video-cover-box">



<video

class="video-cover"

${videoSrc ? `src="${videoSrc}"` : ""}

poster="${item.cover || ""}"

preload="metadata"

playsinline>

</video>



<div class="video-play">

▶

</div>



</div>









<div class="video-info">



<h3>

${item.title || "抖音作品"}

</h3>





<p>

${item.desc || "短视频创作案例"}

</p>








<div class="video-data">





<div>

<strong>

${item.views || "0"}

</strong>

<span>

播放

</span>

</div>





<div>

<strong>

${item.likes || "0"}

</strong>

<span>

点赞

</span>

</div>






<div>

<strong>

${item.comments || "0"}

</strong>

<span>

评论

</span>

</div>






</div>








<a

class="douyin-btn"

href="${item.douyin || '#'}"

target="_blank"

rel="noopener noreferrer">

查看抖音作品

</a>






</div>

`;










grid.appendChild(card);






const video =

card.querySelector(
"video"
);




const play =

card.querySelector(
".video-play"
);





if(video){


videoList.push(video);



}





/* 点击播放 */


if(play && video){



play.onclick=()=>{





if(video.paused){


pauseOther(
videoList,
video
);



video.play();


play.style.opacity="0";



}else{


video.pause();


play.style.opacity="1";



}



};



}





});








}














/* ===============================
暂停其它视频
=============================== */


function pauseOther(list,current){





list.forEach(video=>{


if(video!==current){


video.pause();



}



});



}
