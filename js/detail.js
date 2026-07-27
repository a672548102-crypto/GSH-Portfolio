/* =====================================
 GSH Portfolio
 detail.js
 Case Detail Final
===================================== */



document.addEventListener(
"DOMContentLoaded",
()=>{






// 获取URL参数


const params =

new URLSearchParams(
window.location.search
);



let caseId =

params.get("id") || "01";





caseId =

String(caseId)
.padStart(2,"0");








// 读取案例数据


fetch(
"assets/data/cases.json"
)



.then(res=>res.json())



.then(cases=>{






const data =

cases.find(
item=>

String(item.id).padStart(2,"0")
===caseId

);






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
).textContent =

data.title;






document.getElementById(
"caseDesc"
).textContent =

data.type;









/* =====================
数据
===================== */


document.getElementById(
"views"
).textContent =

data.views || "-";





document.getElementById(
"likes"
).textContent =

data.likes || "-";





document.getElementById(
"comments"
).textContent =

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
项目介绍
===================== */


document.getElementById(
"projectInfo"
).textContent =



`${data.title}

属于${data.type}类型项目，

主要负责${data.role || "内容策划、视频剪辑、账号运营"}

，

完成选题规划、视频制作以及数据优化。`;









/* =====================
职责
===================== */


document.getElementById(
"caseRole"
).textContent =

data.role ||

"负责视频策划、拍摄剪辑、账号运营以及数据复盘";










/* =====================
三张数据图
===================== */



document.getElementById(
"dataImage"
).src =

`assets/charts/data-${caseId}.png`;






document.getElementById(
"ctrImage"
).src =

`assets/charts/ctr-${caseId}.png`;






document.getElementById(
"lossImage"
).src =

`assets/charts/loss-${caseId}.png`;









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



douyin.textContent =

"打开抖音视频";



}else{



douyin.href="#";


douyin.textContent =

"待填写抖音链接";



}









})



.catch(err=>{


console.error(
"案例加载失败:",
err
);



});



});
