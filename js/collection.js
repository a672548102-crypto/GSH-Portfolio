/*
=====================================
GSH Portfolio · collection.js
从 cases.json 加载数据，路径匹配你的目录
=====================================
*/

const caseGrid = document.getElementById("caseGrid");
let allCases = [];

// ===============================
// 加载案例数据
// ===============================

fetch("assets/data/cases.json")
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}：cases.json 加载失败`);
        }
        return res.json();
    })
    .then(data => {
        if (!Array.isArray(data)) {
            throw new Error("数据格式错误：cases.json 不是数组");
        }
        allCases = data;
        renderCases(allCases);
    })
    .catch(err => {
        console.error("案例数据加载失败:", err);
        caseGrid.innerHTML = `
            <div style="text-align:center;padding:80px 20px;color:#7a6a5a;grid-column:1/-1;">
                <h2 style="font-size:24px;margin-bottom:16px;color:#c43b3b;">⚠️ 数据加载失败</h2>
                <p>错误：${err.message}</p>
                <p style="color:#b8a898;font-size:14px;margin-top:16px;">请检查 assets/data/cases.json 是否存在且格式正确</p>
            </div>
        `;
    });

// ===============================
// 渲染案例
// ===============================

function renderCases(cases) {
    if (!cases || cases.length === 0) {
        caseGrid.innerHTML = `
            <div style="text-align:center;padding:80px 20px;color:#7a6a5a;grid-column:1/-1;">
                <h2 style="font-size:20px;margin-bottom:12px;">📭 暂无案例数据</h2>
                <p>请往 assets/data/cases.json 中添加数据</p>
            </div>
        `;
        return;
    }

    let html = "";
    cases.forEach(item => {
        const idStr = String(item.id).padStart(2, "0");
        html += `
            <div class="case-card" data-video="${item.video || ''}" data-id="${item.id}">
                <div class="cover-box">
                    <img class="case-cover" src="${item.cover || ''}" loading="lazy" alt="${item.title || '案例'}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e8e0d6%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%237a6a5a%22 font-size=%2220%22 font-family=%22sans-serif%22%3E暂无封面%3C/text%3E%3C/svg%3E'">
                    <div class="hover-play"><div class="play-circle">▶</div></div>
                </div>
                <div class="case-info">
                    <div class="case-number">CASE ${idStr}</div>
                    <div class="title-line">
                        <h3>${item.title || '未命名'}</h3>
                        <span class="case-type">${item.type || item.category || ''}</span>
                    </div>
                    <div class="data-box">
                        <div><strong>${item.views || '--'}</strong><p>播放量</p></div>
                        <div><strong>${item.likes || '--'}</strong><p>点赞</p></div>
                        <div><strong>${item.comments || '--'}</strong><p>评论</p></div>
                    </div>
                    <a href="detail.html?id=${idStr}" class="detail-link">查看数据分析 →</a>
                </div>
            </div>
        `;
    });

    caseGrid.innerHTML = html;
    bindVideo();
}

// ===============================
// 视频弹窗播放
// ===============================

const modal = document.getElementById("videoModal");
const player = document.getElementById("player");
const closeBtn = document.getElementById("closeBtn");

function bindVideo() {
    const cards = document.querySelectorAll(".case-card");
    cards.forEach(card => {
        card.addEventListener("click", function(e) {
            if (e.target.closest(".detail-link")) return;
            const videoPath = this.dataset.video;
            if (!videoPath) {
                console.warn("该案例没有视频路径");
                return;
            }
            player.src = videoPath;
            player.load();
            modal.classList.add("active");
            setTimeout(() => {
                player.play().catch(() => {});
            }, 200);
        });
    });
}

// ===============================
// 关闭视频
// ===============================

function closeVideo() {
    player.pause();
    player.currentTime = 0;
    player.removeAttribute("src");
    player.load();
    modal.classList.remove("active");
}

if (closeBtn) closeBtn.addEventListener("click", closeVideo);
if (modal) {
    modal.addEventListener("click", function(e) {
        if (e.target === modal) closeVideo();
    });
}
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeVideo();
});

// ===============================
// 分类筛选
// ===============================

const filters = document.querySelectorAll(".filter");
filters.forEach(btn => {
    btn.addEventListener("click", function() {
        filters.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
        const type = this.dataset.filter;
        if (type === "all") {
            renderCases(allCases);
            return;
        }
        const result = allCases.filter(item => item.category === type);
        renderCases(result);
    });
});
