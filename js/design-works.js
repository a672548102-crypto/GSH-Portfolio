/*
============================================================
GSH Portfolio · design-works.js
自动打平模式：每组作品的多张图片自动拆分为独立卡片
============================================================
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

            // ============================================================
            // 🎯 核心：把每组作品打平成单张图片列表
            // ============================================================

            const flatItems = [];

            works.forEach(group => {
                const images = group.images || [];
                // 如果只有一张图，直接作为一个独立卡片
                if (images.length === 1) {
                    flatItems.push({
                        id: group.id,
                        title: group.title,
                        desc: group.desc || '',
                        type: group.type || '',
                        image: images[0]
                    });
                } else {
                    // 多张图：每张图生成一个独立卡片，标题加上编号
                    images.forEach((img, index) => {
                        flatItems.push({
                            id: group.id + '-' + String(index + 1).padStart(2, '0'),
                            title: group.title + ' · ' + String(index + 1).padStart(2, '0'),
                            desc: group.desc || '',
                            type: group.type || '',
                            image: img
                        });
                    });
                }
            });

            // ============================================================
            // 渲染所有独立卡片
            // ============================================================

            renderFlatCards(flatItems);

            // 绑定点击事件（点击图片可以打开大图预览）
            bindCardClick(flatItems);
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

    // ============================================================
    // 渲染扁平卡片
    // ============================================================

    function renderFlatCards(items) {
        const grid = document.getElementById("designGrid");

        grid.innerHTML = items.map(item => {
            let typeClass = 'type-other';
            if (item.type === '商品主图' || item.type === '电商主图') typeClass = 'type-product';
            else if (item.type === '礼盒包装' || item.type === '包装设计') typeClass = 'type-giftbox';
            else if (item.type === '瓜子包装') typeClass = 'type-packaging';
            else if (item.type === '海报设计') typeClass = 'type-poster';

            return `
                <div class="design-card" data-id="${item.id}" data-image="${item.image}">
                    <div class="cover-box">
                        <img src="${item.image}" alt="${item.title}" loading="lazy" 
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e8e0d6%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%237a6a5a%22 font-size=%2220%22 font-family=%22sans-serif%22%3E暂无图片%3C/text%3E%3C/svg%3E'">
                        <span class="design-type ${typeClass}">${item.type || '设计'}</span>
                    </div>
                    <div class="design-info">
                        <h3>${item.title}</h3>
                        <p>${item.desc || ''}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ============================================================
    // 点击卡片 → 打开大图预览（轻量级）
    // ============================================================

    function bindCardClick(items) {
        const cards = document.querySelectorAll(".design-card");
        cards.forEach(card => {
            card.addEventListener("click", function() {
                const imageSrc = this.dataset.image;
                if (!imageSrc) return;

                // 使用轻量级图片预览（覆盖全屏）
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed; inset: 0; z-index: 9999;
                    background: rgba(13, 8, 5, 0.92);
                    backdrop-filter: blur(20px);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; padding: 40px;
                    animation: fadeIn 0.3s ease;
                `;

                const img = document.createElement('img');
                img.src = imageSrc;
                img.style.cssText = `
                    max-width: 90%; max-height: 90%;
                    object-fit: contain; border-radius: 16px;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
                `;

                const closeHint = document.createElement('div');
                closeHint.style.cssText = `
                    position: absolute; bottom: 40px; left: 50%;
                    transform: translateX(-50%);
                    color: #7a6a5a; font-size: 14px;
                    letter-spacing: 1px;
                `;
                closeHint.textContent = '点击任意处关闭';

                overlay.appendChild(img);
                overlay.appendChild(closeHint);
                document.body.appendChild(overlay);

                overlay.addEventListener('click', function() {
                    this.remove();
                });

                // ESC 键关闭
                document.addEventListener('keydown', function escHandler(e) {
                    if (e.key === 'Escape') {
                        overlay.remove();
                        document.removeEventListener('keydown', escHandler);
                    }
                });
            });
        });
    }

    // ============================================================
    // 移动端菜单
    // ============================================================

    document.querySelector('.menu-toggle')?.addEventListener('click', function() {
        document.querySelector('.nav-links')?.classList.toggle('open');
    });
});
