/*
============================================================
GSH Portfolio · detail.js
纯目录版：图片路径完全由 id 驱动
assets/charts/data-01.png、ctr-01.png、loss-01.png
============================================================
*/

const urlParams = new URLSearchParams(window.location.search);
const caseId = urlParams.get('id') || '01';

// ===============================
// 加载案例数据（只取文字信息）
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
        document.querySelector('.detail-header h1').textContent = '加载失败';
        document.getElementById('projectInfo').textContent = '数据加载失败，请检查 assets/data/cases.json';
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
    } else {
        video.parentElement.innerHTML = '<p style="padding:40px;text-align:center;color:#7a6a5a;">暂无视频</p>';
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
    // 🎯 纯目录版：图片路径完全由 id 驱动
    // case id "01" → assets/charts/data-01.png
    // case id "01" → assets/charts/ctr-01.png
    // case id "01" → assets/charts/loss-01.png
    // ============================================================

    const paddedId = String(caseId).padStart(2, '0');

    const dataImg = `assets/charts/data-${paddedId}.png`;
    const ctrImg = `assets/charts/ctr-${paddedId}.png`;
    const lossImg = `assets/charts/loss-${paddedId}.png`;

    // ============================================================
    // 渲染分析图
    // ============================================================

    const dataEl = document.getElementById('dataImage');
    const ctrEl = document.getElementById('ctrImage');
    const lossEl = document.getElementById('lossImage');

    // 辅助：设置图片
    function setImage(el, src, label) {
        const container = el?.closest('.chart-box') || el?.parentElement;
        if (el) {
            el.src = src;
            el.style.display = 'block';
            el.alt = label;
        }
        if (container) {
            container.style.display = 'block';
            // 显示父级 analysis-card
            const card = container.closest('.analysis-card');
            if (card) card.style.display = 'block';
        }
    }

    // 直接设置三张图（不判断是否存在，让浏览器自然加载）
    setImage(dataEl, dataImg, '投放数据');
    setImage(ctrEl, ctrImg, '点击率分析');
    setImage(lossEl, lossImg, '用户流失分析');

    // 如果图片加载失败，显示占位提示
    [dataEl, ctrEl, lossEl].forEach((el, index) => {
        if (el) {
            el.onerror = function() {
                this.style.display = 'none';
                const container = this.closest('.chart-box') || this.parentElement;
                if (container) {
                    container.innerHTML = `
                        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#7a6a5a;padding:40px;text-align:center;">
                            <div>
                                <p style="font-size:20px;margin-bottom:8px;">🖼️</p>
                                <p>图片加载失败</p>
                                <p style="font-size:12px;color:#5a4a3a;">请确认 assets/charts/ 目录下存在对应图片</p>
                            </div>
                        </div>
                    `;
                    container.style.display = 'block';
                    const card = container.closest('.analysis-card');
                    if (card) card.style.display = 'block';
                }
            };
        }
    });

    // 控制台输出（方便排查）
    console.log('🔍 案例ID:', paddedId);
    console.log('📊 数据图:', dataImg);
    console.log('📈 点击率图:', ctrImg);
    console.log('📉 流失量图:', lossImg);
}

// ===============================
// 移动端菜单
// ===============================

document.querySelector('.menu-toggle')?.addEventListener('click', function() {
    document.querySelector('.nav-links')?.classList.toggle('open');
});
