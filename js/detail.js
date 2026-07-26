document.addEventListener('DOMContentLoaded', function() {


const urlParams =
new URLSearchParams(window.location.search);


let caseId =
urlParams.get("id") || "01";


caseId =
String(caseId).padStart(2,"0");
// ========================================
// 读取案例JSON
// ========================================

fetch("assets/data/cases.json")


.then(res => res.json())


.then(cases => {


const data =
cases.find(
item => item.id === caseId
);



if(!data){

console.log("没有找到案例:"+caseId);

return;

}

    // ========================================
    // 填充页面
    // ========================================
    document.querySelector("#caseTitle").textContent = data.title;
    document.querySelector("#caseDesc").textContent = data.type;

    const typeEl = document.querySelector("#caseType");
    if (typeEl) typeEl.textContent = data.type;

    const roleEl = document.querySelector("#caseRole");
    if (roleEl) roleEl.textContent = data.role;

    const viewsEl = document.querySelector("#views");
    if (viewsEl) viewsEl.textContent = data.views;

    const likesEl = document.querySelector("#likes");
    if (likesEl) likesEl.textContent = data.likes;

    const commentsEl = document.querySelector("#comments");
    if (commentsEl) commentsEl.textContent = data.comments;

    const collectEl = document.querySelector("#collect");
    if (collectEl) collectEl.textContent = data.collect;

    const completionEl = document.querySelector("#completion");
    if (completionEl) completionEl.textContent = data.completion;

// ========================================
// 视频加载
// ========================================

const video = document.getElementById("detailVideo");


if(video){


const videoPath = data.video;


console.log(
"当前加载视频:",
videoPath
);



video.src = videoPath;


video.load();



video.addEventListener(
"canplay",
()=>{

console.log(
"✅ 视频加载成功:",
videoPath
);

});



video.addEventListener(
"error",
()=>{

console.log(
"❌ 视频加载失败:",
videoPath
);

});


}
    // ========================================
    // 返回按钮
    // ========================================
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'collection.html';
        });
    }

});


});