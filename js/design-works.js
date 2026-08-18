/*
============================================================
GSH Portfolio · design-works.js
功能：分类筛选 + 分页（每页12张）
主题：暗夜鎏金 · 皮革
============================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("designGrid");
    if (!grid) {
        console.warn("没有找到设计作品容器");
        return;
    }

    // ============================================================
    // 状态管理
    // ============================================================

    let allItems = [];          // 所有扁平化后的图片数据
    let filteredItems = [];     // 当前分类筛选后的数据
    let currentCategory = '全部';
    let currentPage = 1;
    const pageSize = 12;        // 每页12张图片

    // 分类列表（按顺序显示）
    const categories = ['全部', '详情页', '电商主图', 'AI设计', '产品包装', '直播间切片', '精修'];

    // ============================================================
    // 加载数据
    // ============================================================

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
            // 扁平化数据：每组作品拆分成单张图片，携带 category
            // ============================================================

            works.forEach(group => {
                const images = group.images || [];
                const category = group.category || '其他';
                const type = group.type || '';
                const groupTitle = group.title || '未命名';
                const groupDesc = group.desc || '';

                images.forEach((img, index) => {
                    allItems.push({
                        id: group.id + '-' + String(index + 1).padStart(2, '0'),
                        title: groupTitle + (images.length > 1 ? ' · ' + String(index + 1).padStart(2, '0') : ''),
                        desc: groupDesc,
                        type: type,
                        category: category,
                        image: img
                    });
                });
            });

            // 初始状态：显示全部
            filteredItems = [...allItems];
            renderCategoryButtons();
            renderPage();
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
    // 渲染分类按钮
    // ============================================================

    function renderCategoryButtons() {
        const filterBox = document.querySelector('.filter-box');
        if (!filterBox) return;

        // 计算每个分类的数量
        const countMap = {};
        allItems.forEach(item => {
            countMap[item.category] = (countMap[item.category] || 0) + 1;
        });

        filterBox.innerHTML = categories.map(cat => {
            const count = cat === '全部' ? allItems.length : (countMap[cat] || 0);
            const active = cat === currentCategory ? 'active' : '';
            return `
                <button class="filter ${active}" data-category="${cat}">
                    ${cat}
                    <span style="font-size:11px;opacity:0.6;margin-left:4px;">(${count})</span>
                </button>
            `;
        }).join('');

        // 绑定点击事件
        filterBox.querySelectorAll('.filter').forEach(btn => {
            btn.addEventListener('click', function() {
                const cat = this.dataset.category;
                currentCategory = cat;
                currentPage = 1;

                // 筛选数据
                if (cat === '全部') {
                    filteredItems = [...allItems];
                } else {
                    filteredItems = allItems.filter(item => item.category === cat);
                }

                // 重新渲染
                document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderPage();
            });
        });
    }

    // ============================================================
    // 渲染当前页（分页）
    // ============================================================

    function renderPage() {
        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / pageSize) || 1;

        // 确保当前页不超出范围
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        // 计算当前页的数据
        const start = (currentPage - 1) * pageSize;
        const end = Math.min(start + pageSize, totalItems);
        const pageItems = filteredItems.slice(start, end);

        // 渲染卡片
        renderCards(pageItems);

        // 渲染分页控件
        renderPagination(totalPages);
    }

    // ============================================================
    // 渲染卡片
    // ============================================================

    function renderCards(items) {
        const grid = document.getElementById("designGrid");

        if (items.length === 0) {
            grid.innerHTML = `
                <div style="text-align:center;padding:80px 20px;color:#7a6a5a;grid-column:1/-1;">
                    <p style="font-size:20px;margin-bottom:10px;">📭</p>
                    <p>该分类下暂无作品</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = items.map(item => {
            let typeClass = 'type-other';
            if (item.type === '商品主图' || item.type === '电商主图') typeClass = 'type-product';
            else if (item.type === '礼盒包装' || item.type === '包装设计') typeClass = 'type-giftbox';
            else if (item.type === '瓜子包装') typeClass = 'type-packaging';
            else if (item.type === '海报设计') typeClass = 'type-poster';
            else if (item.type === '直播间切片') typeClass = 'type-live';
            else if (item.type === '精修') typeClass = 'type-retouch';

            return `
                <div class="design-card" data-id="${item.id}" data-image="${item.image}">
                    <div class="cover-box">
                        <img src="${item.image}" alt="${item.title}" loading="lazy" 
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e8e0d6%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%237a6a5a%22 font-size=%2220%22 font-family=%22sans-serif%22%3E暂无图片%3C/text%3E%3C/svg%3E'">
                        <span class="design-type ${typeClass}">${item.type || '设计'}</span>
                        <span class="category-badge">${item.category || ''}</span>
                    </div>
                    <div class="design-info">
                        <h3>${item.title}</h3>
                        <p>${item.desc || ''}</p>
                    </div>
                </div>
            `;
        }).join('');

        // 绑定点击预览
        bindCardClick();
    }

    // ============================================================
    // 渲染分页控件
    // ============================================================

    function renderPagination(totalPages) {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let html = '';

        // 上一页
        html += `
            <button class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
                ←
            </button>
        `;

        // 页码
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1) {
            html += `<button class="page-btn" data-page="1">1</button>`;
            if (startPage > 2) html += `<span class="page-ellipsis">…</span>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) html += `<span class="page-ellipsis">…</span>`;
            html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        // 下一页
        html += `
            <button class="page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
                →
            </button>
        `;

        // 显示总数
        html += `
            <span class="page-info">共 ${filteredItems.length} 张作品</span>
        `;

        pagination.innerHTML = html;

        // 绑定分页点击
        pagination.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const page = parseInt(this.dataset.page);
                if (page && page >= 1 && page <= totalPages && page !== currentPage) {
                    currentPage = page;
                    renderPage();
                    // 滚动到顶部
                    document.querySelector('.design-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ============================================================
    // 点击卡片 → 大图预览
    // ============================================================

    function bindCardClick() {
        const cards = document.querySelectorAll(".design-card");
        cards.forEach(card => {
            card.addEventListener("click", function() {
                const imageSrc = this.dataset.image;
                if (!imageSrc) return;

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
                closeHint.textContent = '点击任意处关闭 · ESC';

                overlay.appendChild(img);
                overlay.appendChild(closeHint);
                document.body.appendChild(overlay);

                overlay.addEventListener('click', function() { this.remove(); });
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
