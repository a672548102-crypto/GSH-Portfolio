/* =====================================
 GSH Portfolio
 detail.js
 Detail Final Version
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






// 统一两位编号


caseId =

String(caseId)
.padStart(2,"0");








fetch(
"assets/data/cases.json"
)



.then(res=>res.json())



.then(cases=>{





const data =

cases.find(item=>{


return String(item.id)
.padStart(2,"0")
===caseId;



});







if(!data){


console.error(
"案例不存在"
);


return;


}








/* =====================
标题
===================== */



document.getElementById(
"caseTitle"
).innerText =

data.title || "案例详情";







document.getElementById(
"caseDesc"
).innerText =

data.type || "短视频案例分析";









/* =====================
数据
===================== */



document.getElementById(
"views"
).innerText =

data.views || "-";






document.getElementById(
"likes"
).innerText =

data.likes || "-";






document.getElementById(
"comments"
).innerText =

data.comments || "-";









/* =====================
视频
===================== */


const video =

document.getElementById(
"detailVideo"
);





video.src =

data.video;



video.load();









/* =====================
抖音链接
===================== */


const douyin =

document.getElementById(
"douyinLink"
);





if(data.douyin){



douyin.href =

data.douyin;



douyin.innerText =

data.douyin;



}else{



douyin.href="#";


douyin.innerText=

"请填写抖音视频链接";



}









/* =====================
项目介绍
===================== */



document.getElementById(
"projectInfo"
).innerText =



`
${data.title}

属于${data.type || "短视频项目"}。

主要负责：

${data.role || "内容策划、视频剪辑、账号运营"}

完成选题规划、
脚本设计、
视频制作以及数据优化。
`;









/* =====================
三张数据图
===================== */





const chartPath =

"assets/charts/";





document.getElementById(
"dataImage"
).src =

`${chartPath}data-${caseId}.png`;






document.getElementById(
"ctrImage"
).src =

`${chartPath}ctr-${caseId}.png`;







document.getElementById(
"lossImage"
).src =

`${chartPath}loss-${caseId}.png`;











/* =====================
职责
===================== */



document.getElementById(
"caseRole"
).innerText =

data.role ||

"负责项目策划、剪辑制作、运营分析";









})


.catch(err=>{


console.error(
"detail数据加载失败:",
err
);



});



});
