const caseGrid =
document.getElementById("caseGrid");


const totalCases = 30;



let cards = "";


//生成案例

for(let i=1;i<=totalCases;i++){


let num =
String(i).padStart(2,"0");



cards += `


<div class="case-card"

data-video="assets/videos/videos-${num}.mp4">



<img

class="case-cover"

src="assets/covers/cover-${num}.png"

decoding="async"

loading="lazy">



<div class="case-info">



<div class="case-number">

CASE ${num}

</div>



<h3>

短视频案例 ${i}

</h3>



<div class="tags">

<span>
策划
</span>


<span>
剪辑
</span>


<span>
运营
</span>

</div>




<div class="data-box">


<div>

<strong>
128W+
</strong>

<p>
播放量
</p>

</div>



<div>

<strong>
3.2W
</strong>

<p>
点赞
</p>


</div>



<div>

<strong>
42%
</strong>

<p>
完播率
</p>


</div>


</div>




<a

href="detail.html?id=${num}"

class="detail-link">

查看数据分析 →

</a>



</div>



</div>


`;

}


//一次性写入

caseGrid.innerHTML = cards;





// 视频弹窗


const modal =
document.getElementById(
"videoModal"
);


const player =
document.getElementById(
"player"
);


const closeBtn =
document.getElementById(
"closeBtn"
);





// 点击案例播放视频

document.querySelectorAll(
".case-card"
)

.forEach(card=>{


card.addEventListener(
"click",
(e)=>{


// 点击详情按钮不播放

if(
e.target.closest(".detail-link")
){

return;

}



let src =
card.dataset.video;



player.src = src;



modal.classList.add(
"active"
);



player.load();



setTimeout(()=>{


player.play()
.catch(err=>{

console.log(
"播放失败",
err
);

});


},100);



});


});





//关闭视频


function closeVideo(){


player.pause();


player.currentTime=0;


player.removeAttribute(
"src"
);


player.load();


modal.classList.remove(
"active"
);


}



closeBtn.onclick =
closeVideo;




modal.onclick=(e)=>{


if(
e.target===modal
){

closeVideo();

}

};





// ESC关闭


document.addEventListener(
"keydown",
(e)=>{


if(
e.key==="Escape"
){

closeVideo();

}


});