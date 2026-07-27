/* =====================================
 GSH Portfolio
 collection.js
 Case Page Final Stable
===================================== */


const caseGrid = document.getElementById("caseGrid");

const videoModal = document.getElementById("videoModal");

const player = document.getElementById("player");

const closeBtn = document.getElementById("closeBtn");



let casesData = [];





/* =====================
加载案例数据
===================== */


fetch("data/cases.json")


.then(res => {


if(!res.ok){

throw new Error("cases.json加载失败");

}


return res.json();


})


.then(data=>{


casesData=data;


renderCases(casesData);


})


.catch(err=>{


console.error(err);


caseGrid.innerHTML=`

<div class="no-data">

案例数据暂未找到

</div>

`;


});









/* =====================
生成案例
===================== */


function renderCases(list){


caseGrid.innerHTML="";



list.forEach(item=>{



const card=document.createElement("div");


card.className="case-card";





card.innerHTML=`

<div class="case-cover">


<img 

src="${item.cover || ''}"

alt="${item.title}"

>



<button class="play-btn">

▶

</button>



</div>





<div class="case-info">


<div class="case-title">


<h3>

${item.title}

</h3>



<span class="case-type">

${item.type || "类型暂未填写"}

</span>


</div>






<p class="case-role">

${item.role || "数据暂未填写"}

</p>






<div class="case-data">


<span>

播放 ${item.views || "--"}

</span>


<span>

点赞 ${item.likes || "--"}

</span>


<span>

评论 ${item.comments || "--"}

</span>



</div>



</div>

`;







/* 图片不存在处理 */


const img=card.querySelector("img");



img.onerror=function(){


img.style.display="none";


const noData=document.createElement("div");


noData.className="no-data";


noData.innerText="该数据暂未找到";



card.querySelector(".case-cover")

.appendChild(noData);



};









/* 点击播放 */


const playBtn=

card.querySelector(".play-btn");



playBtn.onclick=()=>{


openVideo(item.video);


};






caseGrid.appendChild(card);



});


}









/* =====================
打开视频
===================== */


function openVideo(src){



if(!src){


alert("该视频暂未上传");

return;


}




fetch(src,{method:"HEAD"})


.then(res=>{


if(!res.ok){


throw new Error();


}



showVideo(src);


})


.catch(()=>{


alert("该视频暂未上传");


});



}









function showVideo(src){


videoModal.classList.add("show");


player.src=src;


player.play().catch(()=>{});


}









/* =====================
关闭视频
===================== */


closeBtn.onclick=function(){



videoModal.classList.remove("show");


player.pause();


player.src="";


};







videoModal.onclick=function(e){


if(e.target===videoModal){


closeBtn.click();


}


};









/* =====================
分类筛选
===================== */


const filters=document.querySelectorAll(".filter");



filters.forEach(btn=>{


btn.onclick=function(){



filters.forEach(b=>{

b.classList.remove("active");

});



this.classList.add("active");





const type=this.dataset.filter;



if(type==="all"){


renderCases(casesData);


return;


}





const result=casesData.filter(item=>{


return item.category===type;


});




renderCases(result);



};


});









/* =====================
导航手机菜单
===================== */


const menuBtn=document.querySelector(".menu-toggle");


const nav=document.querySelector(".nav-links");



if(menuBtn){


menuBtn.onclick=function(){


this.classList.toggle("active");


nav.classList.toggle("show");


};


}
