const caseGrid =
document.getElementById("caseGrid");



let allCases = [];



// ===============================
// 读取cases.json
// ===============================

fetch("assets/data/cases.json")

.then(res=>res.json())

.then(data=>{


allCases=data;


//第一次加载全部

renderCases(allCases);



});





// ===============================
// 生成案例卡
// ===============================

function renderCases(cases){


let html="";



cases.forEach(item=>{


html += `


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



caseGrid.innerHTML=html;



bindVideo();



}







// ===============================
// 分类筛选
// ===============================


const filters =
document.querySelectorAll(".filter");



filters.forEach(btn=>{


btn.onclick=function(){


filters.forEach(b=>{

b.classList.remove("active");

});


this.classList.add("active");



let type =
this.dataset.filter;



if(type==="all"){


renderCases(allCases);


}else{


let result =
allCases.filter(item=>{

return item.category===type;


});


renderCases(result);


}



};



});








// ===============================
// 视频播放
// ===============================


const modal =
document.getElementById("videoModal");


const player =
document.getElementById("player");


const closeBtn =
document.getElementById("closeBtn");






function bindVideo(){



document.querySelectorAll(".case-card")

.forEach(card=>{


card.onclick=function(e){



if(
e.target.closest(".detail-link")
){

return;

}



player.pause();



player.src =
this.dataset.video;



modal.classList.add("active");


player.load();



player.play().catch(()=>{});



};



});



}







// ===============================
// 关闭视频
// ===============================


function closeVideo(){


player.pause();


player.currentTime=0;


player.removeAttribute("src");


player.load();


modal.classList.remove("active");


}



closeBtn.onclick=
closeVideo;



modal.onclick=function(e){


if(e.target===modal){

closeVideo();

}


};




document.addEventListener(
"keydown",
function(e){


if(e.key==="Escape"){


closeVideo();


}


});
