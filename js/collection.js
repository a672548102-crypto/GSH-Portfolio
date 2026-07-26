/* =====================================
   GSH Portfolio
   collection.js
   Final Version
===================================== */



const caseGrid =
document.getElementById("caseGrid");



let allCases = [];




// =====================================
// 读取案例数据
// =====================================


fetch("assets/data/cases.json")


.then(res=>res.json())


.then(data=>{


allCases = data;


// 默认显示全部

renderCases(allCases);


})

.catch(err=>{


console.error(
"cases.json读取失败:",
err
);


});









// =====================================
// 生成案例卡片
// =====================================


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





<!-- 播放按钮 -->


<div class="play-mask">


<div class="play-icon">

▶

</div>


<p>

播放案例

</p>


</div>







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






caseGrid.innerHTML = html;




//重新绑定播放

bindVideo();



}











// =====================================
// 分类筛选
// =====================================



const filters =

document.querySelectorAll(
".filter"
);





filters.forEach(btn=>{



btn.addEventListener(
"click",
function(){





filters.forEach(b=>{


b.classList.remove(
"active"
);


});





this.classList.add(
"active"
);





const type =

this.dataset.filter;







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












// =====================================
// 视频弹窗
// =====================================



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











// =====================================
// 绑定视频播放
// =====================================


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







// 关闭之前视频


player.pause();


player.currentTime=0;







// 当前视频


const videoPath =

this.dataset.video;







console.log(
"播放:",
videoPath
);







player.src = videoPath;






modal.classList.add(
"active"
);







player.load();







player.play()

.catch(()=>{


console.log(
"等待用户播放"
);


});







};






});



}











// =====================================
// 关闭视频
// =====================================



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








//关闭按钮


if(closeBtn){


closeBtn.addEventListener(
"click",
closeVideo
);


}








//点击黑色区域关闭


if(modal){


modal.addEventListener(
"click",
function(e){



if(e.target===modal){


closeVideo();


}



});


}










// ESC关闭


document.addEventListener(
"keydown",
function(e){



if(e.key==="Escape"){


closeVideo();


}



});
