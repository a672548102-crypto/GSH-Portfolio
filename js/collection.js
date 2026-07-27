/* =====================================
GSH Portfolio
collection.js
案例集最终版
===================================== */



let casesData = [];





// =======================
// 获取案例数据
// =======================


fetch("data/cases.json")

.then(res=>{


if(!res.ok){

throw new Error("cases.json不存在");

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









// =======================
// 渲染案例
// =======================


function renderCases(list){



const grid=document.querySelector("#caseGrid");



grid.innerHTML="";




list.forEach(item=>{



const card=document.createElement("div");


card.className="case-card";





card.innerHTML=`

<div class="cover-box">


<img

src="${item.cover}"

class="case-cover"

alt="${item.title}"

onerror="this.parentNode.innerHTML='<div class=no-data>该数据暂未找到</div>'"

>


</div>






<div class="case-info">





<div class="case-title">


<h3>

${item.title}

</h3>



<span class="type-tag">

${item.type}

</span>


</div>







<p class="case-role">


${item.role}

</p>







<div class="case-data">


<span>

播放 ${item.views}

</span>


<span>

点赞 ${item.likes}

</span>


<span>

评论 ${item.comments}

</span>


</div>





</div>


`;






// 点击播放

card.addEventListener(
"click",
()=>{


openVideo(item.video);


}

);






grid.appendChild(card);



});



}











// =======================
// 分类筛选
// =======================



const filters=document.querySelectorAll(".filter");




filters.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


document
.querySelector(".filter.active")
.classList.remove("active");



btn.classList.add("active");





const type=btn.dataset.filter;






if(type==="all"){


renderCases(casesData);


}

else{


const result=casesData.filter(
item=>item.category===type
);



renderCases(result);


}



}

);



});











// =======================
// 视频弹窗
// =======================



const modal=document.querySelector("#videoModal");

const player=document.querySelector("#player");

const closeBtn=document.querySelector("#closeBtn");

const videoError=document.querySelector("#videoError");








function openVideo(src){



if(!src){


showVideoError();


return;


}




player.src=src;


videoError.style.display="none";



modal.classList.add("show");



player.play()
.catch(()=>{});



}







function showVideoError(){


modal.classList.add("show");


player.style.display="none";


videoError.style.display="block";


}





//关闭


closeBtn.onclick=function(){



modal.classList.remove("show");



player.pause();


player.currentTime=0;


player.src="";


player.style.display="block";



};







//点击黑色区域关闭


modal.addEventListener(
"click",
e=>{


if(e.target===modal){


closeBtn.click();


}



});










// =======================
// 手机导航
// =======================


const menuBtn=document.querySelector(".menu-toggle");


const nav=document.querySelector(".nav-links");



if(menuBtn){



menuBtn.onclick=()=>{


menuBtn.classList.toggle("active");


nav.classList.toggle("show");


};



}




