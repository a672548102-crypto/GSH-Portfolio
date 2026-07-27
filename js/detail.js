/* =====================================
 GSH Portfolio
 detail.js
 Stable Final Version
===================================== */



document.addEventListener(
"DOMContentLoaded",
()=>{



loadDetail();



});









/* ===============================
读取案例ID
=============================== */


function loadDetail(){





const params =

new URLSearchParams(
window.location.search
);






let id =

params.get("id") || "01";






id =

String(id)
.padStart(2,"0");








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

.then(cases=>{





const data =

cases.find(item=>{


return (

String(item.id)
.padStart(2,"0")

===

id

);


});








if(!data){



showError();


return;


}








renderDetail(
data,
id
);





})



.catch(err=>{


console.error(
"详情加载失败:",
err
);



showError();



});



}












/* ===============================
渲染页面
=============================== */


function renderDetail(data,id){







// 标题


setText(
"caseTitle",
data.title || "未命名案例"
);







// 类型


setText(
"caseDesc",
data.type || data.category || "短视频运营案例"
);









// 数据


setText(
"views",
data.views || "0"
);



setText(
"likes",
data.likes || "0"
);



setText(
"comments",
data.comments || "0"
);









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

douyin.textContent=

"暂无抖音链接";



}





}









// 项目介绍


setText(

"projectInfo",

`

${data.title || "该案例"}

属于

${data.type || "短视频项目"}。


主要负责：

${data.role || "选题策划、脚本设计、视频剪辑、账号运营"}。


项目过程中完成内容规划、
视频制作、发布运营以及数据复盘优化。


`

);









// 职责


setText(

"caseRole",

data.role ||

"负责短视频策划、剪辑制作、账号运营以及数据分析。"

);











// 图表


loadCharts(id);





}














/* ===============================
设置文字
=============================== */


function setText(id,text){





const el =

document.getElementById(id);






if(el){


el.textContent=text;


}




}














/* ===============================
加载数据图
=============================== */


function loadCharts(id){





const charts=[



{

id:"dataImage",

src:`assets/charts/data-${id}.png`

},




{

id:"ctrImage",

src:`assets/charts/ctr-${id}.png`

},




{

id:"lossImage",

src:`assets/charts/loss-${id}.png`

}



];







charts.forEach(item=>{






const img =

document.getElementById(
item.id
);







if(img){



img.src=item.src;



img.onerror=()=>{


img.style.display="none";


};



}





});




}












/* ===============================
错误提示
=============================== */


function showError(){



const title =

document.getElementById(
"caseTitle"
);





if(title){



title.textContent=

"案例不存在";


}





}
