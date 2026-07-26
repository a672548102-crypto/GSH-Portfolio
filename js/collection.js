const caseGrid =
document.getElementById("caseGrid");


// ===============================
// 读取案例数据
// ===============================

fetch("assets/data/cases.json")


.then(res=>res.json())


.then(cases=>{


let cards="";



cases.forEach(item=>{


cards += `

<div class="case-card"

data-video="${item.video}">


<img

class="case-cover"

src="${item.cover}"

loading="lazy">


<div class="case-info">


<div class="case-number">

CASE ${item.id}

</div>



<h3>

${item.title}

</h3>



<div class="tags">

<span>
${item.category}
</span>


<span>
${item.type}
</span>

</div>




<div class="data-box">


<div>

<strong>
${item.views}
</strong>

<p>
播放量
</p>

</div>



<div>

<strong>
${item.likes}
</strong>

<p>
点赞
</p>

</div>



<div>

<strong>
${item.comments}
</strong>

<p>
评论
</p>

</div>



</div>




<a

href="detail.html?id=${item.id}"

class="detail-link">

查看数据分析 →

</a>


</div>


</div>


`;



});



caseGrid.innerHTML=cards;



// 初始化播放功能

initVideo();


});






// ===============================
// 视频弹窗
// ===============================


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





function initVideo(){


document.querySelectorAll(
".case-card"
)

.forEach(card=>{


card.addEventListener(
"click",
(e)=>{


if(
e.target.closest(".detail-link")
){

return;

}



let src =
card.dataset.video;



player.src=src;



modal.classList.add(
"active"
);



player.load();



player.play().catch(()=>{});



});


});


}






// ===============================
// 关闭视频
// ===============================


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
e=>{


if(
e.key==="Escape"
){

closeVideo();

}


});
