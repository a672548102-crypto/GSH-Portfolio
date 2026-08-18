/*
============================================================
GSH Portfolio · detail.js
修复：图片路径映射到 assets/charts/
兼容 analysis 对象 + 直接字段 两种格式
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
        document.querySelector('.detail-header h1').textContent = '加载失败';
        document.getElementById('projectInfo').textContent = '数据加载失败，请检查 assets/data/cases.json';
    });

// ===============================
// 工具：修正图片路径
// 将 assets/data/ 或 assets/analysis/ 替换为 assets/charts/
// ===============================

function fixImagePath(path) {
    if (!path) return '';
    // 如果已经是 charts 路径，直接返回
    if (path.includes('assets/charts/')) return path;
    // 替换 data 或 analysis 为 charts
    return path.replace(/assets\/(data|analysis)\//, 'assets/charts/');
}

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
    // 🎯 核心修复：提取图片路径并修正
    // ============================================================

    let dataImg = '';
    let ctrImg = '';
    let lossImg = '';

    // 格式1：analysis 对象（第1-10条、第31-34条）
    if (item.analysis && typeof item.analysis === 'object') {
        dataImg = fixImagePath(item.analysis.data || '');
        ctrImg = fixImagePath(item.analysis.ctr || '');
        lossImg = fixImagePath(item.analysis.loss || '');
    }

    // 格式2：直接字段（第11-30条）
    if (!dataImg && item.dataImage) dataImg = fixImagePath(item.dataImage);
    if (!ctrImg && item.ctrImage) ctrImg = fixImagePath(item.ctrImage);
    if (!lossImg && item.lossImage) lossImg = fixImagePath(item.lossImage);

    // 兜底：如果还没有，尝试从 analysis 里再捞一次
    if (!dataImg && item.analysis) {
        dataImg = fixImagePath(item.analysis.data || item.analysis.dataImage || '');
        ctrImg = fixImagePath(item.analysis.ctr || item.analysis.ctrImage || '');
        lossImg = fixImagePath(item.analysis.loss || item.analysis.lossImage || '');
    }

    // ============================================================
    // 渲染分析图
    // ============================================================

    const dataEl = document.getElementById('dataImage');
    const ctrEl = document.getElementById('ctrImage');
    const lossEl = document.getElementById('lossImage');

    // 辅助函数：设置图片或隐藏容器
    function setImage(el, src, containerSelector) {
        const container = el?.closest('.chart-box') || el?.parentElement;
        if (src && src.trim() !== '') {
            el.src = src;
            el.style.display = 'block';
            if (container) container.style.display = 'block';
            // 显示整个 analysis-card
            const card = container?.closest('.analysis-card');
            if (card) card.style.display = 'block';
            return true;
        } else {
            if (el) el.style.display = 'none';
            if (container) container.style.display = 'none';
            const card = container?.closest('.analysis-card');
            if (card) card.style.display = 'none';
            return false;
        }
    }

    const hasData = setImage(dataEl, dataImg);
    const hasCtr = setImage(ctrEl, ctrImg);
    const hasLoss = setImage(lossEl, lossImg);

    // 如果所有图都没有，显示友好的提示
    if (!hasData && !hasCtr && !hasLoss) {
        const firstCard = document.querySelector('.analysis-card');
        if (firstCard) {
            firstCard.style.display = 'block';
            const chartBox = firstCard.querySelector('.chart-box');
            if (chartBox) {
                chartBox.style.display = 'block';
                chartBox.innerHTML = `
                    <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#7a6a5a;padding:40px;text-align:center;">
                        <div>
                            <p style="font-size:24px;margin-bottom:12px;">📊</p>
                            <p>该案例暂无分析数据截图</p>
                            <p style="font-size:12px;color:#5a4a3a;">请将图片放在 assets/charts/ 目录下</p>
                        </div>
                    </div>
                `;
            }
        }
    }

    // 控制台输出调试信息
    console.log('🔍 案例ID:', caseId);
    console.log('📊 数据图:', dataImg || '❌ 无');
    console.log('📈 点击率图:', ctrImg || '❌ 无');
    console.log('📉 流失量图:', lossImg || '❌ 无');
}

// ===============================
// 移动端菜单
// ===============================

document.querySelector('.menu-toggle')?.addEventListener('click', function() {
    document.querySelector('.nav-links')?.classList.toggle('open');
});
