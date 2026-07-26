document.addEventListener('DOMContentLoaded',()=>{


const params =
new URLSearchParams(location.search);


let caseId =
params.get("id") || "01";


caseId =
String(caseId).padStart(2,"0");



fetch("assets/data/cases.json")


.then(res=>res.json())


.then(cases=>{


const data =
cases.find(
item=>item.id===caseId
);



if(!data){

console.log(
"没有找到案例",
caseId
);

return;

}



//标题

document.querySelector("#caseTitle").textContent=data.title;


document.querySelector("#caseDesc").textContent=data.type;



//数据


document.querySelector("#views").textContent=data.views;


document.querySelector("#likes").textContent=data.likes;


document.querySelector("#comments").textContent=data.comments;



//项目介绍

const info =
document.querySelector("#projectInfo");


if(info){

info.textContent=

`本案例属于${data.type}，主要负责${data.role}。通过内容策划、视频制作以及后期优化，实现短视频传播效果提升。`;

}




//视频


const video =
document.querySelector("#detailVideo");



if(video){


video.src=data.video;


video.load();



console.log(
"当前视频:",
data.video
);



}




});



});
