/*
============================================================
GSH Portfolio · design-works.js
支持多文件类型：.ai / .pdf / .png / .jpg
8个分类：AI设计、产品包装、店铺主图、海报、精修、礼盒设计、详情页、直播间
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

    let allItems = [];
    let filteredItems = [];
    let currentCategory = '全部';
    let currentPage = 1;
    const pageSize = 12;

    const categories = ['全部', '产品包装', 'AI设计', '店铺主图', '海报', '精修', '礼盒设计', '详情页', '直播间'];

    const fileTypeConfig = {
        'ai': { icon: '🎨', label: 'AI源文件', color: '#9B59B6' },
        'pdf': { icon: '📄', label: 'PDF文档', color: '#E74C3C' },
        'png': { icon: '🖼️', label: '图片', color: '#2ECC71' },
        'jpg': { icon: '🖼️', label: '图片', color: '#2ECC71' },
        'jpeg': { icon: '🖼️', label: '图片', color: '#2ECC71' },
        'webp': { icon: '🖼️', label: '图片', color: '#2ECC71' }
    };

    // ============================================================
    // 🎯 核心修改：同时检查 fileType 和文件扩展名
    // ============================================================

    function isImageFile(fileType, filePath) {
        // 1. 先检查 fileType 是否为标准图片格式
        if (['png', 'jpg', 'jpeg', 'webp'].includes(fileType?.toLowerCase())) {
            return true;
        }
        // 2. 再检查文件路径的扩展名
        if (filePath) {
            const ext = filePath.split('.').pop()?.toLowerCase();
            if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
                return true;
            }
        }
        return false;
    }

    function getTypeClass(type) {
        const map = {
            '产品包装': 'type-packaging',
            'AI设计': 'type-ai',
            '店铺主图': 'type-product',
            '海报': 'type-poster',
            '精修': 'type-retouch',
            '礼盒设计': 'type-giftbox',
            '详情页': 'type-detail',
            '直播间': 'type-live'
        };
        return map[type] || 'type-other';
    }

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
        .then(data => {
            if (!data || data.length === 0) {
                grid.innerHTML = `
                    <div style="text-align:center;padding:60px 20px;color:#7a6a5a;grid-column:1/-1;">
                        <h3>暂无设计作品</h3>
                        <p style="margin-top:10px;">请将作品数据放入 assets/data/design.json</p>
                    </div>
                `;
                return;
            }

            allItems = data.map(item => ({
                id: item.id,
                title: item.title || '未命名',
                desc: item.desc || '',
                type: item.type || '设计',
                category: item.category || '其他',
                file: item.file || item.image || '',
                fileType: item.fileType || 'png'
            }));

            allItems = allItems.filter(item => item.file && item.file.trim() !== '');

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
        const filterBox = document.getElementById('categoryFilter');
        if (!filterBox) return;

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
                    <span class="count">(${count})</span>
                </button>
            `;
        }).join('');

        filterBox.querySelectorAll('.filter').forEach(btn => {
            btn.addEventListener('click', function() {
                const cat = this.dataset.category;
                currentCategory = cat;
                currentPage = 1;

                if (cat === '全部') {
                    filteredItems = [...allItems];
                } else {
                    filteredItems = allItems.filter(item => item.category === cat);
                }

                document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderPage();
            });
        });
    }

    // ============================================================
    // 渲染当前页
    // ============================================================

    function renderPage() {
        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / pageSize) || 1;

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const start = (currentPage - 1) * pageSize;
        const end = Math.min(start + pageSize, totalItems);
        const pageItems = filteredItems.slice(start, end);

        renderCards(pageItems);
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
            // ============================================================
            // 🎯 核心修改：传入 file 路径，让函数同时检查扩展名
            // ============================================================
            const isImage = isImageFile(item.fileType, item.file);
            const config = fileTypeConfig[item.fileType?.toLowerCase()] || { icon: '🖼️', label: '图片', color: '#2ECC71' };
            const typeClass = getTypeClass(item.type);

            let previewContent = '';

            if (isImage) {
                // 图片：显示缩略图
                previewContent = `<img src="${item.file}" alt="${item.title}" loading="lazy" 
                                       onerror="this.style.display='none';this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:48px;color:#7a6a5a;\\'>📎</div>'">`;
            } else {
                // AI 或 PDF 文件：显示文字提示
                const fileTypeName = item.fileType === 'ai' ? 'AI 源文件' : 'PDF 文档';
                const openSoftware = item.fileType === 'ai' ? 'Adobe Illustrator' : 'Adobe Acrobat 或 浏览器';
                previewContent = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:20px;text-align:center;color:#a89480;">
                        <div style="font-size:40px;margin-bottom:10px;">${config.icon}</div>
                        <div style="font-size:14px;font-weight:600;color:#d4c8b8;margin-bottom:4px;">${fileTypeName}</div>
                        <div style="font-size:11px;color:#7a6a5a;line-height:1.7;max-width:90%;">
                            点击后即可下载<br>可在 ${openSoftware} 中打开预览
                        </div>
                    </div>
                `;
            }

            return `
                <div class="design-card" 
                     data-id="${item.id}" 
                     data-file="${item.file}" 
                     data-filetype="${item.fileType}"
                     data-isimage="${isImage}">
                    <div class="cover-box">
                        ${previewContent}
                        <span class="design-type ${typeClass}">${item.type || '设计'}</span>
                        <span class="file-badge" style="background:${config.color};">${config.label}</span>
                        <span class="category-badge">${item.category || ''}</span>
                    </div>
                    <div class="design-info">
                        <h3>${item.title}</h3>
                        <p>${item.desc || ''}</p>
                    </div>
                </div>
            `;
        }).join('');

        bindCardClick();
    }

    // ============================================================
    // 点击卡片
    // ============================================================

    function bindCardClick() {
        document.querySelectorAll(".design-card").forEach(card => {
            card.addEventListener("click", function() {
                const file = this.dataset.file;
                const isImage = this.dataset.isimage === 'true';

                if (!file) return;

                if (isImage) {
                    openImagePreview(file);
                } else {
                    downloadFile(file);
                }
            });
        });
    }

    // ============================================================
    // 图片预览
    // ============================================================

    function openImagePreview(src) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(13, 8, 5, 0.92);
            backdrop-filter: blur(20px);
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; padding: 40px;
        `;

        const img = document.createElement('img');
        img.src = src;
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
    }

    // ============================================================
    // 文件下载
    // ============================================================

    function downloadFile(filePath) {
        const fileName = filePath.split('/').pop();
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // ============================================================
    // 分页控件
    // ============================================================

    function renderPagination(totalPages) {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let html = '';
        html += `<button class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>←</button>`;

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
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) html += `<span class="page-ellipsis">…</span>`;
            html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        html += `<button class="page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>→</button>`;
        html += `<span class="page-info">共 ${filteredItems.length} 个文件</span>`;

        pagination.innerHTML = html;

        pagination.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const page = parseInt(this.dataset.page);
                if (page && page >= 1 && page <= totalPages && page !== currentPage) {
                    currentPage = page;
                    renderPage();
                    document.querySelector('.design-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
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
