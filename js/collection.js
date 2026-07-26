const caseGrid =
document.getElementById("caseGrid");


let allCases = [];



// ===============================
// 读取案例数据
// ===============================


fetch("assets/data/cases.json")


.then(res=>res.json())


.then(data=>{


allCases=data;


//首次显示全部

renderCases(allCases);


});







// ===============================
// 生成案例卡片
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

CASE ${String(item.id).padStart(2,"0")}

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



//重新绑定视频

bindVideo();



}







// ===============================
// 分类筛选
// ===============================


const filters =
document.querySelectorAll(".filter");



filters.forEach(btn=>{


btn.addEventListener(
"click",
()=>{



//按钮状态


filters.forEach(b=>{

b.classList.remove(
"active"
);

});



btn.classList.add(
"active"
);




//获取分类

const type =
btn.dataset.filter;



if(type==="all"){


renderCases(allCases);


return;


}




const result =
allCases.filter(item=>{


return item.category===type;


});



renderCases(result);



});


});









// ===============================
// 视频播放
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







function bindVideo(){



const cards =
document.querySelectorAll(
".case-card"
);



cards.forEach(card=>{



card.addEventListener(
"click",
function(e){



//点击详情按钮不播放

if(
e.target.closest(".detail-link")
){

return;

}





//关闭之前视频


player.pause();



player.currentTime=0;



//加载新视频


player.src =
this.dataset.video;



modal.classList.add(
"active"
);



player.load();



//播放

player.play()
.catch(()=>{});



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





closeBtn.addEventListener(
"click",
closeVideo
);





modal.addEventListener(
"click",
function(e){


if(e.target===modal){


closeVideo();


}


});







// ESC关闭


document.addEventListener(
"keydown",
function(e){


if(e.key==="Escape"){


closeVideo();


}


});
