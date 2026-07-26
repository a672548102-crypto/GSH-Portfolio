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
"案例不存在"
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







// 数据


views.textContent=data.views;

likes.textContent=data.likes;

comments.textContent=data.comments;

collect.textContent=data.collect || "-";







// 视频


const video =
document.getElementById(
"detailVideo"
);



video.src =
data.video;


video.load();






// 项目介绍


document.getElementById(
"projectInfo"
).textContent=


`${data.title}属于${data.type}，
主要负责${data.role}，
完成内容策划、视频制作以及运营优化。`;







// 三张图片


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








// 职责


document.getElementById(
"caseRole"
).textContent=data.role;



});



});
