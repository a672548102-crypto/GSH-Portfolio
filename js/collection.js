/* =====================================
 GSH Portfolio
 collection.js
 Collection Final Stable
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{



const caseGrid = 
document.getElementById(
"caseGrid"
);



if(!caseGrid){

console.error(
"没有找到案例容器"
);

return;

}





let allCases = [];






/* ===============================
加载案例数据
================================ */


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


allCases = data || [];



renderCases(allCases);



})



.catch(err=>{


console.error(
"案例数据读取失败:",
err
);



caseGrid.innerHTML = `

<div class="empty">

案例数据加载失败

</div>

`;



});









/* ===============================
生成案例卡片
================================ */


function renderCases(cases){



let html = "";






if(!cases.length){


caseGrid.innerHTML = `

<div class="empty">

暂无案例

</div>

`;


return;


}







cases.forEach(item=>{





html += `

<div class="case-card"

data-video="${item.video || ''}">





<div class="cover-box">


<img

class="case-cover"

src="${item.cover || ''}"

alt="${item.title || '案例封面'}"

loading="lazy"

>


</div>









<div class="case-info">





<div class="case-number">

CASE ${String(item.id).padStart(2,"0")}

</div>








<div class="title-line">


<h3>

${item.title || "未命名案例"}

</h3>




<span class="type-tag">

${item.type || "短视频"}

</span>



</div>









<div class="tags">


<span>

${item.category || "案例"}

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






bindVideo();




}









/* ===============================
分类筛选
================================ */


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



renderCases(
allCases
);



return;


}







const result =

allCases.filter(item=>{


return item.category === type;


});






renderCases(result);




});


});









/* ===============================
视频播放
================================ */


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






// 点击详情按钮不播放

if(
e.target.closest(
".detail-link"
)

){


return;


}







const video =

this.dataset.video;






if(!video){


return;


}








player.pause();



player.currentTime = 0;



player.src = video;





modal.classList.add(
"active"
);





player.load();





player.play()

.catch(()=>{


console.log(
"等待用户点击播放"
);


});



});


});



}









/* ===============================
关闭弹窗
================================ */


function closeVideo(){



if(!player)
return;



player.pause();



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
e=>{


if(
e.target === modal
){


closeVideo();


}


});


}







document.addEventListener(
"keydown",
e=>{


if(
e.key === "Escape"
){


closeVideo();


}


});




});
