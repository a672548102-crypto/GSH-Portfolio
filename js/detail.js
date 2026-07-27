/* =====================================
 GSH Portfolio
 detail.js
 Case Detail Stable Version
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const params =
new URLSearchParams(
window.location.search
);



let caseId =
params.get("id") || "01";



caseId =
String(caseId)
.padStart(2,"0");





fetch("./assets/data/cases.json")

.then(res=>{


if(!res.ok){

throw new Error(
"cases.json加载失败"
);

}


return res.json();


})

.then(cases=>{



const data = cases.find(item=>{


return String(item.id)
.padStart(2,"0")
===caseId;


});





if(!data){


console.error(
"没有找到案例:",
caseId
);


return;


}





// 标题

const title =
document.getElementById(
"caseTitle"
);


if(title)
title.textContent =
data.title || "未命名案例";






// 类型

const desc =
document.getElementById(
"caseDesc"
);


if(desc)
desc.textContent =
data.type || "";








// 数据


const views =
document.getElementById(
"views"
);


if(views)
views.textContent =
data.views || "0";




const likes =
document.getElementById(
"likes"
);


if(likes)
likes.textContent =
data.likes || "0";





const comments =
document.getElementById(
"comments"
);


if(comments)
comments.textContent =
data.comments || "0";








// 视频


const video =
document.getElementById(
"detailVideo"
);


if(video && data.video){


video.src =
data.video;


video.load();


}








// 项目信息


const info =
document.getElementById(
"projectInfo"
);



if(info){


info.textContent =

`${data.title}

属于${data.type || "短视频项目"}，

主要负责：

${data.role || "视频策划、剪辑制作、账号运营"}

。

完成选题规划、内容制作、发布运营以及数据复盘优化。`;

}








// 职责


const role =
document.getElementById(
"caseRole"
);



if(role){


role.textContent =

data.role ||

"负责账号策划、视频剪辑、运营分析";


}








// 数据图


const charts = [

[
"dataImage",
`assets/charts/data-${caseId}.png`
],

[
"ctrImage",
`assets/charts/ctr-${caseId}.png`
],

[
"lossImage",
`assets/charts/loss-${caseId}.png`
]

];





charts.forEach(item=>{


const img =
document.getElementById(
item[0]
);


if(img){

img.src =
item[1];

}


});








// 抖音链接


const douyin =
document.getElementById(
"douyinLink"
);



if(douyin){


if(data.douyin){


douyin.href =
data.douyin;


douyin.textContent =
"打开抖音视频";


}else{


douyin.href="#";


douyin.textContent =
"待填写抖音链接";


}


}






})

.catch(err=>{


console.error(
"案例数据错误:",
err
);


});



});
