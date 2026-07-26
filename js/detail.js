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
String(caseId).padStart(2,"0");





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

console.log(
"案例不存在:",
caseId
);

return;

}





// 标题


document.querySelector(
"#caseTitle"
).textContent=data.title;



document.querySelector(
"#caseDesc"
).textContent=data.type;





// 视频


const video =
document.getElementById(
"detailVideo"
);



if(video){


video.src=data.video;


video.load();


}






// 项目介绍


const project =
document.getElementById(
"projectInfo"
);



if(project){

project.textContent =
data.project || "暂无项目介绍";

}






// 职责


const role =
document.getElementById(
"roleText"
);



if(role){

role.textContent =
data.role;

}



// =======================
// 投放数据
// =======================


document.getElementById(
"views"
).textContent=data.views;


document.getElementById(
"likes"
).textContent=data.likes;


document.getElementById(
"comments"
).textContent=data.comments;



document.getElementById(
"shares"
).textContent=data.shares || "--";



document.getElementById(
"collect"
).textContent=data.collect || "--";



document.getElementById(
"date"
).textContent=data.date || "--";



// 三张分析图


const dataImg =
document.getElementById(
"dataImage"
);


if(dataImg){

dataImg.src =
data.dataImage;

}





const ctrImg =
document.getElementById(
"ctrImage"
);


if(ctrImg){

ctrImg.src =
data.ctrImage;

}






const lossImg =
document.getElementById(
"lossImage"
);


if(lossImg){

lossImg.src =
data.lossImage;

}



});



});
