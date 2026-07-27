/* =====================================
 GSH Portfolio
 personal-video.js
 Douyin Works Stable Version
===================================== */



document.addEventListener(
"DOMContentLoaded",
()=>{



const videoGrid =
document.getElementById(
"videoGrid"
);





/*
加载抖音作品数据
*/


fetch("./assets/data/videos.json")

.then(res=>{


if(!res.ok){

throw new Error(
"videos.json不存在"
);

}


return res.json();


})

.then(videos=>{



if(!videoGrid){


return;


}





videos.forEach((item,index)=>{





const card =
document.createElement(
"div"
);


card.className =
"video-card";





card.innerHTML =

`

<div class="video-cover-box">


<video
class="video-cover"
src="${item.video || ''}"
poster="${item.cover || ''}"
controls
preload="metadata">
</video>


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

>

查看抖音作品

</a>



</div>


`;





videoGrid.appendChild(card);




});




/*
视频单播放
*/


const videos =
document.querySelectorAll(
"video"
);



videos.forEach(video=>{


video.addEventListener(
"play",
()=>{


videos.forEach(other=>{


if(other !== video){


other.pause();


}


});


});


});




})



.catch(err=>{


console.error(

"抖音作品加载失败:",
err

);



});




});
