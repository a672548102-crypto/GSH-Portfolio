/*
=====================================
GSH Portfolio
collection.js
V5.8 Project Collection
=====================================
*/


const caseGrid =
document.getElementById("caseGrid");


let allCases = [];





// ===============================
// 加载案例数据
// ===============================


fetch("assets/data/cases.json")


.then(res=>res.json())


.then(data=>{


allCases = data;


renderCases(allCases);


})


.catch(err=>{


console.error(
"cases.json读取失败:",
err
);


});








// ===============================
// 渲染案例
// ===============================


function renderCases(cases){


let html="";



cases.forEach(item=>{


html += `


<div class="case-card"

data-video="${item.video}">





<div class="cover-box">


<img

class="case-cover"

src="${item.cover}"

loading="lazy"

alt="${item.title}">





<div class="hover-play">


<div class="play-circle">

▶

</div>


</div>



</div>








<div class="case-info">





<div class="case-number">

CASE ${String(item.id).padStart(2,"0")}

</div>







<div class="title-line">



<h3>

${item.title}

</h3>



<span class="case-type">

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





caseGrid.innerHTML = html;




bindVideo();



}











// ===============================
// 分类筛选
// ===============================



const filters =

document.querySelectorAll(
".filter"
);





filters.forEach(btn=>{


btn.addEventListener(
"click",
()=>{





filters.forEach(item=>{


item.classList.remove(
"active"
);


});






btn.classList.add(
"active"
);







const type =

btn.dataset.filter;








if(type==="all"){


renderCases(allCases);


return;


}








const result =

allCases.filter(item=>{


return item.category === type;


});







renderCases(result);




});


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









function bindVideo(){



const cards =

document.querySelectorAll(
".case-card"
);







cards.forEach(card=>{



card.onclick=function(e){





// 点击详情按钮不播放

if(
e.target.closest(".detail-link")
){

return;

}






const videoPath =

this.dataset.video;







player.pause();


player.currentTime=0;







player.src = videoPath;






modal.classList.add(
"active"
);







player.load();








player.play()

.catch(()=>{


console.log(
"等待用户操作"
);


});







};






});



}












// ===============================
// 关闭视频
// ===============================



function closeVideo(){


if(!player)return;



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









if(closeBtn){


closeBtn.addEventListener(
"click",
closeVideo
);


}








if(modal){


modal.addEventListener(
"click",
(e)=>{


if(e.target===modal){


closeVideo();


}


});


}









document.addEventListener(
"keydown",
(e)=>{


if(e.key==="Escape"){


closeVideo();


}


});
