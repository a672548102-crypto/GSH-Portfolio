/* =====================================
 GSH Portfolio V6.1
 collection.js
 案例集数据渲染
===================================== */


const caseGrid = document.getElementById("caseGrid");

const modal = document.getElementById("videoModal");

const player = document.getElementById("player");

const closeBtn = document.getElementById("closeBtn");


let allCases = [];


const noDataImage =
"assets/images/no-data.png";





/*
加载数据
*/

async function loadCases(){


try{


const res =
await fetch("data/cases.json");



if(!res.ok){

throw new Error(
"cases.json读取失败"
);

}



allCases =
await res.json();



renderCases(allCases);



}catch(err){


console.error(err);



caseGrid.innerHTML=`

<div class="no-data">

案例数据暂未找到

</div>

`;


}


}









/*
渲染案例
*/


function renderCases(data){


caseGrid.innerHTML="";



data.forEach(item=>{



const card =
document.createElement("div");



card.className =
"case-card";





card.innerHTML=`

<div class="cover-box">


<img

class="case-cover"

src="${item.cover}"

alt="${item.title}"

onerror="
this.onerror=null;
this.src='${noDataImage}'
"

>


</div>





<div class="case-info">



<!-- 标题+类型 同行 -->

<div class="case-title-row">


<h3>

${item.title}

</h3>



<span class="case-type">

${item.type}

</span>


</div>






<p class="case-role">

${item.role}

</p>







<div class="case-data">



<div>

<strong>

${item.views || "暂无"}

</strong>

<span>

播放

</span>

</div>





<div>

<strong>

${item.likes || "暂无"}

</strong>

<span>

点赞

</span>

</div>





<div>

<strong>

${item.comments || "暂无"}

</strong>

<span>

评论

</span>

</div>



</div>







<button

class="play-btn"

data-video="${item.video || ''}"

>

查看视频

</button>





</div>


`;



caseGrid.appendChild(card);



});





bindVideo();



}









/*
视频播放
*/


function bindVideo(){


document
.querySelectorAll(".play-btn")
.forEach(btn=>{


btn.onclick=function(){


const src =
this.dataset.video;



if(!src){


alert(
"视频暂未上传"
);


return;


}





player.src=src;



player.onerror=function(){


alert(
"该视频暂未找到"
);


};



modal.classList.add(
"show"
);



player.play();



}



});


}









/*
关闭视频
*/


closeBtn.onclick=function(){


modal.classList.remove(
"show"
);



player.pause();



player.removeAttribute(
"src"
);



}







modal.onclick=function(e){


if(e.target===modal){


closeBtn.click();


}


}









/*
分类筛选
*/


document
.querySelectorAll(".filter")
.forEach(btn=>{


btn.onclick=function(){



document
.querySelectorAll(".filter")
.forEach(b=>{


b.classList.remove(
"active"
);


});




this.classList.add(
"active"
);




const filter =
this.dataset.filter;



if(filter==="all"){


renderCases(
allCases
);


}else{


const result =
allCases.filter(item=>

item.category===filter

);



renderCases(
result
);


}



}



});










loadCases();
