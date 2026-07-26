const caseGrid =
document.getElementById("caseGrid");


const totalCases = 30;



let cards = "";


//生成案例

for(let i=1;i<=totalCases;i++){


let num =
String(i).padStart(2,"0");



const types=[
"达人",
"厂家",
"口播",
"剧情",
"混剪"
];

let type=
types[(i-1)%5];

cards += `
<div
class="case-card"
data-type="${type}"
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

/* ===========================
   分类筛选
=========================== */

const filters=document.querySelectorAll(".filter");

filters.forEach(btn=>{

btn.addEventListener("click",()=>{

filters.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const type=btn.dataset.filter;

document.querySelectorAll(".case-card").forEach(card=>{

if(type==="all"){

card.style.display="block";

}else{

if(card.dataset.type===type){

card.style.display="block";

}else{

card.style.display="none";

}

}

});

});

});
