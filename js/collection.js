/* =====================================
 GSH Portfolio
 collection.js
 Stable Final Version
===================================== */



const caseGrid =

document.getElementById(
"caseGrid"
);



let allCases = [];









/* ===============================
初始化
=============================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


loadCases();


initModal();



});












/* ===============================
读取案例数据
=============================== */


function loadCases(){





if(!caseGrid)

return;






fetch(
"assets/data/cases.json"
)

.then(res=>{


if(!res.ok){

throw new Error(
"cases.json加载失败"
);

}



return res.json();


})

.then(data=>{



allCases=data;



renderCases(
allCases
);



initFilter();



})

.catch(err=>{


console.error(
err
);



caseGrid.innerHTML=`

<div class="empty-tip">

案例数据加载失败

</div>

`;



});



}













/* ===============================
生成案例卡片
=============================== */


function renderCases(list){





if(!list.length){



caseGrid.innerHTML=`

<div class="empty-tip">

暂无案例

</div>

`;

return;


}








let html="";








list.forEach(item=>{





html += `



<div class="case-card"

data-video="${item.video || ''}">








<div class="cover-box">





<img

class="case-cover"

src="${item.cover || ''}"

alt="${item.title || '案例'}"

loading="lazy"

>





<div class="hover-play">

<span>

▶

</span>

</div>





</div>









<div class="case-info">








<div class="case-number">

CASE ${String(item.id).padStart(2,"0")}

</div>









<h3>

${item.title || "未命名案例"}

</h3>








<div class="tags">

<span>

${item.category || item.type || "案例"}

</span>

</div>








<div class="data-box">








<div>

<strong>

${item.views || "-"}

</strong>


<p>

播放量

</p>


</div>








<div>

<strong>

${item.likes || "-"}

</strong>


<p>

点赞

</p>


</div>








<div>

<strong>

${item.comments || "-"}

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







bindCards();




}














/* ===============================
筛选
=============================== */


function initFilter(){





const buttons =

document.querySelectorAll(
".filter"
);






buttons.forEach(btn=>{





btn.onclick=()=>{






buttons.forEach(b=>

b.classList.remove(
"active"
)

);





btn.classList.add(
"active"
);






const type =

btn.dataset.filter;







if(type==="all"){


renderCases(
allCases
);


return;


}









const result =

allCases.filter(item=>{


return (

item.category===type ||

item.type===type

);


});







renderCases(
result
);



};





});



}














/* ===============================
绑定卡片
=============================== */


function bindCards(){





document.querySelectorAll(
".case-card"
)

.forEach(card=>{





card.addEventListener(
"click",
(e)=>{





// 点击详情按钮不播放

if(
e.target.closest(
".detail-link"
)

){

return;


}







const video =

card.dataset.video;







if(!video)

return;








openVideo(video);






});






});



}














/* ===============================
视频弹窗
=============================== */


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









function openVideo(src){





if(!modal || !player)

return;






player.src=src;



modal.classList.add(
"active"
);



player.load();





// PC尝试播放

if(window.innerWidth>768){


player.play()

.catch(()=>{});


}




}









function closeVideo(){





if(!player || !modal)

return;






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












function initModal(){






if(closeBtn){


closeBtn.onclick=

closeVideo;


}







if(modal){



modal.onclick=(e)=>{


if(e.target===modal){


closeVideo();


}



};



}







document.addEventListener(
"keydown",
e=>{


if(e.key==="Escape"){


closeVideo();


}



});



}
