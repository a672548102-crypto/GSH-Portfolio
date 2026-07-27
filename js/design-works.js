/* =====================================
 GSH Portfolio
 design-works.js
 Stable Final Version
===================================== */



document.addEventListener(
"DOMContentLoaded",
()=>{


loadDesignWorks();



});









/* ===============================
加载美工作品
=============================== */


function loadDesignWorks(){





const grid =

document.getElementById(
"workGrid"
);






if(!grid)

return;







fetch(
"assets/data/design.json"
)

.then(res=>{


if(!res.ok){


throw new Error(
"design.json加载失败"
);


}



return res.json();



})

.then(data=>{





renderWorks(
grid,
data
);




})

.catch(err=>{


console.error(
"美工作品加载失败:",
err
);



grid.innerHTML=`

<div class="empty-tip">

作品加载失败

</div>

`;



});



}













/* ===============================
生成作品
=============================== */


function renderWorks(grid,works){





grid.innerHTML="";







if(!works || works.length===0){



grid.innerHTML=`

<div class="empty-tip">

暂无设计作品

</div>

`;



return;


}









works.forEach((item,index)=>{






const card =

document.createElement(
"div"
);





card.className=

"work-card";








const image =

item.image ||

item.cover ||

item.img ||

item.src ||

"";








card.innerHTML=`

<img

src="${image}"

alt="${item.title || '设计作品'}"

loading="lazy"

>



<div class="work-info">



<h3>

${item.title || "设计作品"}

</h3>





<p>

${item.desc || "电商视觉设计作品"}

</p>



</div>

`;












// 图片错误处理


const img =

card.querySelector(
"img"
);





if(img){



img.onerror=()=>{


img.src=

"assets/images/default.jpg";


};



}








grid.appendChild(card);






});




}
