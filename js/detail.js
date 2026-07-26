document.addEventListener(
"DOMContentLoaded",
function(){



// ===============================
// 获取案例ID
// ===============================


const params =
new URLSearchParams(
window.location.search
);


let caseId =
params.get("id") || "01";


// 保证两位数

caseId =
String(caseId)
.padStart(2,"0");





// ===============================
// 读取案例数据
// ===============================


fetch(
"assets/data/cases.json"
)


.then(
res=>res.json()
)


.then(
cases=>{



const data =
cases.find(
item=>item.id===caseId
);





if(!data){

console.log(
"未找到案例:",
caseId
);

return;

}





// ===============================
// 基础信息
// ===============================



document.querySelector(
"#caseTitle"
).textContent =
data.title;



document.querySelector(
"#caseDesc"
).textContent =
data.type;





// 项目介绍

const info =
document.querySelector(
"#projectInfo"
);


if(info){

info.textContent =
`${data.title}属于${data.type}，
主要负责${data.role}，
通过内容策划、视频制作以及运营优化完成项目。`;

}






// ===============================
// 数据
// ===============================


const views =
document.querySelector(
"#views"
);


if(views)
views.textContent=data.views;




const likes =
document.querySelector(
"#likes"
);


if(likes)
likes.textContent=data.likes;





const comments =
document.querySelector(
"#comments"
);


if(comments)
comments.textContent=data.comments;






const collect =
document.querySelector(
"#collect"
);


if(collect)
collect.textContent =
data.collect || "-";









// ===============================
// 视频加载
// ===============================


const video =
document.getElementById(
"detailVideo"
);



if(video){



video.src =
data.video;


video.load();




video.addEventListener(
"canplay",
()=>{


console.log(
"视频加载成功:",
data.video
);


});



video.addEventListener(
"error",
()=>{


console.log(
"视频加载失败:",
data.video
);


});



}









// ===============================
// 三张分析图片
// ===============================


const dataImg =
document.getElementById(
"dataImage"
);



const ctrImg =
document.getElementById(
"ctrImage"
);



const lossImg =
document.getElementById(
"lossImage"
);







if(dataImg){


dataImg.src =
`assets/analysis/${caseId}-data.png`;

}




if(ctrImg){


ctrImg.src =
`assets/analysis/${caseId}-ctr.png`;

}




if(lossImg){


lossImg.src =
`assets/analysis/${caseId}-loss.png`;

}









// ===============================
// 我的职责
// ===============================


const role =
document.getElementById(
"caseRole"
);



if(role){

role.textContent =
data.role;

}









// ===============================
// 返回按钮
// ===============================


const backBtn =
document.querySelector(
".back-btn"
);



if(backBtn){


backBtn.onclick=function(e){


e.preventDefault();


window.location.href =
"collection.html";


};


}





}

);



});
