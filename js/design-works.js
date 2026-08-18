/*
=====================================
GSH Portfolio · design-works.js
从 design.json 加载数据，路径匹配你的目录
=====================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("designGrid");
    if (!grid) {
        console.warn("没有找到设计作品容器");
        return;
    }

    fetch("./assets/data/design.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("design.json 加载失败，状态码 " + res.status);
            }
            return res.json();
        })
        .then(works => {
            if (!works || works.length === 0) {
                grid.innerHTML = `
                    <div style="text-align:center;padding:60px 20px;color:#7a6a5a;grid-column:1/-1;">
                        <h3>暂无设计作品</h3>
                        <p style="margin-top:10px;">请将作品数据放入 assets/data/design.json</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = works.map(item => {
                let typeClass = 'type-other';
                if (item.type === '商品主图' || item.type === '电商主图') typeClass = 'type-product';
                else if (item.type === '礼盒包装' || item.type === '包装设计') typeClass = 'type-giftbox';
                else if (item.type === '瓜子包装') typeClass = 'type-packaging';
                else if (item.type === '海报设计') typeClass = 'type-poster';

                const images = item.images || [];
                const coverImg = images.length > 0 ? images[0] : '';
                const imageCount = images.length;

                return `
                    <div class="design-card" data-id="${item.id}">
                        <div class="cover-box">
                            <img src="${coverImg}" alt="${item.title}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e8e0d6%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%237a6a5a%22 font-size=%2220%22 font-family=%22sans-serif%22%3E暂无封面%3C/text%3E%3C/svg%3E'">
                            <span class="design-type ${typeClass}">${item.type || '设计'}</span>
                            <span class="view-all-badge">📷 ${imageCount} 张</span>
                        </div>
                        <div class="design-info">
                            <h3>${item.title}</h3>
                            <p>${item.desc || ''}</p>
                            <span class="image-count">共 ${imageCount} 张作品</span>
                        </div>
                    </div>
                `;
            }).join('');

            // 绑定点击打开画廊
            const cards = document.querySelectorAll(".design-card");
            cards.forEach(card => {
                card.addEventListener("click", () => {
                    const id = card.dataset.id;
                    const data = works.find(item => item.id === id);
                    if (data) openGallery(data);
                });
            });
        })
        .catch(err => {
            console.error("设计作品加载失败:", err);
            grid.innerHTML = `
                <div style="text-align:center;padding:60px 20px;color:#c43b3b;grid-column:1/-1;">
                    <h3>⚠️ 数据加载失败</h3>
                    <p style="color:#7a6a5a;margin-top:10px;">${err.message}</p>
                    <p style="color:#b8a898;font-size:14px;margin-top:16px;">请检查 assets/data/design.json 是否存在且格式正确</p>
                </div>
            `;
        });

    // ===============================
    // 画廊模态框
    // ===============================

    const modal = document.getElementById("galleryModal");
    const galleryGrid = document.getElementById("galleryGrid");
    const galleryTitle = document.getElementById("galleryTitle");
    const galleryDesc = document.getElementById("galleryDesc");
    const galleryCount = document.getElementById("galleryCount");
    const galleryClose = document.getElementById("galleryClose");

    function openGallery(data) {
        const images = data.images || [];
        galleryTitle.textContent = data.title;
        galleryDesc.textContent = data.desc || '';
        galleryCount.textContent = `共 ${images.length} 张图片`;
        galleryGrid.innerHTML = images.map(img => `
            <div class="gallery-item">
                <img src="${img}" alt="${data.title}" loading="lazy" onerror="this.style.display='none'">
            </div>
        `).join('');
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeGallery() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    galleryClose.addEventListener("click", closeGallery);
    modal.addEventListener("click", function(e) {
        if (e.target === modal) closeGallery();
    });
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeGallery();
    });

    // ===============================
    // 移动端菜单
    // ===============================

    document.querySelector('.menu-toggle')?.addEventListener('click', function() {
        document.querySelector('.nav-links')?.classList.toggle('open');
    });
});
