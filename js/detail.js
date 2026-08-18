/*
============================================================
GSH Portfolio · detail.js
纯目录版 + 页面级错误显示（方便排查）
============================================================
*/

const urlParams = new URLSearchParams(window.location.search);
const caseId = urlParams.get('id') || '01';

// ===============================
// 加载案例数据
// ===============================

fetch('assets/data/cases.json')
    .then(res => {
        if (!res.ok) throw new Error('cases.json 加载失败');
        return res.json();
    })
    .then(data => {
        const item = data.find(d => String(d.id).padStart(2, '0') === String(caseId).padStart(2, '0'));
        if (!item) {
            document.querySelector('.detail-header h1').textContent = '案例未找到';
            return;
        }
        renderDetail(item);
    })
    .catch(err => {
        console.error('加载失败:', err);
        document.querySelector('.detail-header h1').textContent = '⚠️ 数据加载失败';
        document.getElementById('projectInfo').textContent = '加载失败：' + err.message;
    });

// ===============================
// 渲染详情
// ===============================

function renderDetail(item) {
    // ----- 标题 -----
    document.querySelector('.detail-header h1').textContent = item.title || '未命名';
    document.querySelector('.detail-header p').textContent = item.type || '';

    // ----- 视频 -----
    const video = document.getElementById('detailVideo');
    if (item.video) {
        video.src = item.video;
        video.load();
    }

    // ----- 数据卡片 -----
    document.getElementById('views').textContent = item.views || '--';
    document.getElementById('likes').textContent = item.likes || '--';
    document.getElementById('comments').textContent = item.comments || '--';

    // ----- 抖音链接 -----
    const douyinLink = document.getElementById('douyinUrl');
    if (item.douyinUrl) {
        douyinLink.href = item.douyinUrl;
        douyinLink.textContent = item.douyinUrl;
    } else {
        douyinLink.textContent = '暂无链接';
        douyinLink.href = '#';
    }

    // ----- 项目介绍 -----
    const info = document.getElementById('projectInfo');
    if (item.role) {
        info.textContent = item.role;
    } else {
        info.textContent = '暂无项目介绍';
    }

    // ============================================================
    // 图片路径（由 id 驱动）
    // ============================================================

    const paddedId = String(caseId).padStart(2, '0');

    const dataImg = `assets/charts/data-${paddedId}.png`;
    const ctrImg = `assets/charts/ctr-${paddedId}.png`;
    const lossImg = `assets/charts/loss-${paddedId}.png`;

    // ============================================================
    // 设置图片（带页面级错误提示）
    // ============================================================

    const dataEl = document.getElementById('dataImage');
    const ctrEl = document.getElementById('ctrImage');
    const lossEl = document.getElementById('lossImage');

    function setImageWithErrorDisplay(el, src, label, containerSelector) {
        const container = el?.closest('.chart-box') || el?.parentElement;
        if (!el || !container) {
            console.warn(`元素 ${label} 未找到`);
            return;
        }

        // 清空容器可能存在的旧内容，恢复 img 标签
        // 但最好保留 img，我们只设置 src
        el.src = src;
        el.style.display = 'block';
        el.alt = label;

        // 确保容器显示
        container.style.display = 'block';
        const card = container.closest('.analysis-card');
        if (card) card.style.display = 'block';

        // 监听加载失败，在页面上显示详细错误
        el.onerror = function() {
            this.style.display = 'none';
            // 在容器中显示错误信息和完整路径
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#e8a87c;padding:30px;text-align:center;background:rgba(13,8,5,0.5);border-radius:12px;">
                    <p style="font-size:18px;margin-bottom:8px;">🖼️ 图片加载失败</p>
                    <p style="font-size:13px;color:#a89480;word-break:break-all;max-width:100%;background:rgba(0,0,0,0.3);padding:8px 16px;border-radius:8px;font-family:monospace;">
                        ${src}
                    </p>
                    <p style="font-size:12px;color:#7a6a5a;margin-top:8px;">💡 请检查该路径下是否存在图片</p>
                </div>
            `;
            container.style.display = 'block';
            const card = container.closest('.analysis-card');
            if (card) card.style.display = 'block';
        };
    }

    setImageWithErrorDisplay(dataEl, dataImg, '投放数据');
    setImageWithErrorDisplay(ctrEl, ctrImg, '点击率');
    setImageWithErrorDisplay(lossEl, lossImg, '流失量');

    // 控制台输出
    console.log('🔍 案例ID:', paddedId);
    console.log('📊 数据图路径:', dataImg);
    console.log('📈 点击率图路径:', ctrImg);
    console.log('📉 流失量图路径:', lossImg);
    console.log('💡 请在浏览器新标签页打开以上路径，验证图片是否存在');
}

// ===============================
// 移动端菜单
// ===============================

document.querySelector('.menu-toggle')?.addEventListener('click', function() {
    document.querySelector('.nav-links')?.classList.toggle('open');
});
