/* =====================================
 GSH Portfolio
 design-works.js
 Design Works Stable Version
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{





const workGrid =
document.getElementById(
"workGrid"
);





if(!workGrid){


console.warn(
"没有找到作品容器"
);


return;


}







/*
加载美工作品数据
*/


fetch("./assets/data/design.json")

.then(res=>{


if(!res.ok){


throw new Error(
"design.json加载失败"
);


}



return res.json();


})

.then(works=>{






works.forEach((item,index)=>{





const card =
document.createElement(
"div"
);



card.className =
"work-card";






card.innerHTML =



`

<img

src="${item.image || item.cover || ''}"

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





workGrid.appendChild(card);




});






})



.catch(err=>{


console.error(

"美工作品加载失败:",
err

);



});



});