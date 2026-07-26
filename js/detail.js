/* =====================================================
   GSH Portfolio
   detail.js
   案例详情页最终版
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


// ================================
// 获取案例ID
// ================================


const params =
new URLSearchParams(
window.location.search
);



let caseId =
params.get("id") || "01";



caseId =
String(caseId)
.padStart(2,"0");





// ================================
// 加载案例数据
// ================================


fetch(
"assets/data/cases.json"
)



.then(res=>res.json())


.then(cases=>{



const data =
cases.find(
item=>item.id===caseId
);



if(!data){


console.error(
"没有找到案例:",
caseId
);


return;


}





// ================================
// 标题信息
// ================================


const title =
document.getElementById(
"caseTitle"
);


if(title){

title.textContent =
data.title;

}





const desc =
document.getElementById(
"caseDesc"
);


if(desc){

desc.textContent =
data.type;

}







// ================================
// 数据展示
// ================================



const views =
document.getElementById(
"views"
);


if(views){

views.textContent =
data.views;

}




const likes =
document.getElementById(
"likes"
);


if(likes){

likes.textContent =
data.likes;

}





const comments =
document.getElementById(
"comments"
);


if(comments){

comments.textContent =
data.comments;

}









// ================================
// 视频加载
// ================================



const video =
document.getElementById(
"detailVideo"
);



if(video){



video.src =
data.video;



video.load();



video.addEventListener(
"error",
()=>{


console.error(
"视频加载失败:",
data.video
);


});



}









// ================================
// 项目介绍
// ================================



const projectInfo =
document.getElementById(
"projectInfo"
);



if(projectInfo){


projectInfo.textContent =


`${data.title}属于${data.type}，
主要负责${data.role}。
项目围绕短视频内容策划、
脚本设计、视频剪辑以及账号运营展开，
通过内容优化提升视频传播效果。`;



}










// ================================
// 投放数据截图
// ================================



const dataImage =
document.getElementById(
"dataImage"
);



if(dataImage){


dataImage.src =

`assets/charts/data-${caseId}.png`;



dataImage.alt =
"投放数据截图";



}








// ================================
// 点击率分析
// ================================



const ctrImage =
document.getElementById(
"ctrImage"
);



if(ctrImage){


ctrImage.src =

`assets/charts/ctr-${caseId}.png`;



ctrImage.alt =
"点击率分析";



}










// ================================
// 用户流失分析
// ================================



const lossImage =
document.getElementById(
"lossImage"
);



if(lossImage){


lossImage.src =

`assets/charts/loss-${caseId}.png`;



lossImage.alt =
"用户流失分析";



}










// ================================
// 我的职责
// ================================



const role =
document.getElementById(
"caseRole"
);



if(role){


role.textContent =
data.role;


}







});



});
