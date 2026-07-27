/* =====================================
GSH Portfolio
collection.js
案例集最终稳定版
===================================== */


let casesData = [];





/* =====================
加载数据
===================== */


fetch("assets/data/cases.json")


.then(res=>{


if(!res.ok){

throw new Error(
"cases.json加载失败"
);

}


return res.json();


})



.then(data=>{


casesData=data;


renderCases(casesData);


})



.catch(err=>{


console.error(err);



document.querySelector("#caseGrid").innerHTML=`

<div class="no-data">

案例数据暂未找到

</div>

`;


});









/* =====================
渲染案例
===================== */


function renderCases(list){



const grid=document.querySelector("#caseGrid");



if(!grid)return;



grid.innerHTML="";





list.forEach(item=>{



const card=document.createElement("div");



card.className="case-card";





/*
只显示 type

不读取 category

*/


let typeName =
item.type || "类型暂未填写";








card.innerHTML=`

<div class="cover-box">


<img

class="case-cover"

src="${item.cover || ''}"

alt="${item.title || ''}"

>


</div>






<div class="case-info">





<div class="case-title">


<h3>

${item.title || "项目名称"}

</h3>



<span class="type-tag">

${typeName}

</span>



</div>









<p class="case-role">

${item.role || "项目描述暂未填写"}

</p>









<div class="case-data">


<span>

播放 ${item.views || "暂无"}

</span>



<span>

点赞 ${item.likes || "暂无"}

</span>



<span>

评论 ${item.comments || "暂无"}

</span>



</div>





</div>


`;







/* =====================
图片检测
===================== */


const img =
card.querySelector(".case-cover");



img.onerror=function(){


this.parentNode.innerHTML=`

<div class="no-data">

该数据暂未找到

</div>

`;



};







/* =====================
视频点击
===================== */


card.onclick=function(){


openVideo(
item.video
);


};







grid.appendChild(card);



});



}













/* =====================
分类筛选
===================== */


const filters=
document.querySelectorAll(".filter");




filters.forEach(btn=>{


btn.onclick=function(){



const current=
document.querySelector(".filter.active");



if(current){

current.classList.remove("active");

}




this.classList.add("active");





const type=this.dataset.filter;






if(type==="all"){


renderCases(casesData);


}

else{


const result =
casesData.filter(
item=>item.category===type
);



renderCases(result);


}



};



});















/* =====================
视频弹窗
===================== */


const modal=
document.querySelector("#videoModal");


const player=
document.querySelector("#player");


const closeBtn=
document.querySelector("#closeBtn");


const videoError=
document.querySelector("#videoError");










function openVideo(src){



if(!src){


showVideoError();


return;


}







player.style.display="block";


videoError.style.display="none";



player.src=src;



modal.classList.add("show");





player.play()

.catch(()=>{


});



}









function showVideoError(){



modal.classList.add("show");


player.style.display="none";


videoError.style.display="block";


}













/* =====================
关闭视频
===================== */


if(closeBtn){



closeBtn.onclick=function(){



modal.classList.remove("show");



player.pause();


player.currentTime=0;


player.src="";


};



}








/* 点击遮罩关闭 */


if(modal){


modal.onclick=function(e){



if(e.target===modal){


closeBtn.click();


}


};



}














/* =====================
手机导航
===================== */


const menuBtn =
document.querySelector(".menu-toggle");



const nav =
document.querySelector(".nav-links");





if(menuBtn && nav){



menuBtn.onclick=function(){



this.classList.toggle("active");



nav.classList.toggle("show");



};



}
