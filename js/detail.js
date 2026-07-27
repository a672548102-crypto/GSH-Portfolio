 /*
 =====================================
 GSH Portfolio
 detail.js
 V5.8 Detail Page
 =====================================
 */



document.addEventListener(
"DOMContentLoaded",
()=>{



// ===============================
// 获取案例ID
// ===============================


const params =

new URLSearchParams(
window.location.search
);



let caseId =

params.get("id") || "1";




// 统一格式

caseId =

String(caseId)
.padStart(2,"0");









// ===============================
// 读取JSON
// ===============================


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
"案例不存在:",
caseId
);


return;


}







// ===============================
// 基础信息
// ===============================



document.getElementById(
"caseTitle"
).textContent =

data.title;






document.getElementById(
"caseDesc"
).textContent =

`${data.category} / ${data.type}`;








// ===============================
// 数据
// ===============================



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








// ===============================
// 视频
// ===============================


const video =

document.getElementById(
"detailVideo"
);



video.src =

data.video;



video.load();









// ===============================
// 项目介绍
// ===============================


document.getElementById(
"projectInfo"
).textContent =



`${data.title}

属于${data.type}项目，

主要负责${data.role || "内容策划、视频剪辑以及账号运营"}。

通过内容分析和数据优化，

持续提升视频传播效果。`;









// ===============================
// 图表
// ===============================



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









// ===============================
// 职责
// ===============================



document.getElementById(
"caseRole"
).textContent =


data.role ||


"负责视频策划、剪辑制作、账号运营以及数据复盘。";







})



.catch(err=>{


console.error(
"案例数据加载失败:",
err
);


});



});
