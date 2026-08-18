/*
=====================================
GSH Portfolio · detail.js
兼容 analysis 对象 + 直接字段 两种格式
路径完全匹配你的目录结构
=====================================
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
        const item = data.find(d => String(d.id).padStart(2, '0') === caseId);
        if (!item) {
            document.querySelector('.detail-header h1').textContent = '案例未找到';
            return;
        }
        renderDetail(item);
    })
    .catch(err => {
        console.error(err);
        document.querySelector('.detail-header h1').textContent = '加载失败';
    });

// ===============================
// 渲染详情
// ===============================

function renderDetail(item) {
    // 标题
    document.querySelector('.detail-header h1').textContent = item.title || '未命名';
    document.querySelector('.detail-header p').textContent = item.type || '';

    // 视频
    const video = document.getElementById('detailVideo');
    if (item.video) {
        video.src = item.video;
        video.load();
    }

    // 数据卡片
    document.getElementById('views').textContent = item.views || '--';
    document.getElementById('likes').textContent = item.likes || '--';
    document.getElementById('comments').textContent = item.comments || '--';

    // 抖音链接
    const douyinLink = document.getElementById('douyinUrl');
    if (item.douyinUrl) {
        douyinLink.href = item.douyinUrl;
        douyinLink.textContent = item.douyinUrl;
    } else {
        douyinLink.textContent = '暂无链接';
        douyinLink.href = '#';
    }

    // 项目介绍
    const info = document.getElementById('projectInfo');
    if (item.role) {
        info.textContent = item.role;
    } else {
        info.textContent = '暂无项目介绍';
    }

    // ===== 分析图：兼容两种格式 =====
    let dataImg = '';
    let ctrImg = '';
    let lossImg = '';

    if (item.analysis && typeof item.analysis === 'object') {
        dataImg = item.analysis.data || '';
        ctrImg = item.analysis.ctr || '';
        lossImg = item.analysis.loss || '';
    } else {
        dataImg = item.dataImage || '';
        ctrImg = item.ctrImage || '';
        lossImg = item.lossImage || '';
    }

    // 渲染分析图
    const dataEl = document.getElementById('dataImage');
    const ctrEl = document.getElementById('ctrImage');
    const lossEl = document.getElementById('lossImage');

    if (dataImg) {
        dataEl.src = dataImg;
        dataEl.style.display = 'block';
        dataEl.parentElement.style.display = 'block';
    } else {
        dataEl.style.display = 'none';
        dataEl.parentElement.style.display = 'none';
    }

    if (ctrImg) {
        ctrEl.src = ctrImg;
        ctrEl.style.display = 'block';
        ctrEl.parentElement.style.display = 'block';
    } else {
        ctrEl.style.display = 'none';
        ctrEl.parentElement.style.display = 'none';
    }

    if (lossImg) {
        lossEl.src = lossImg;
        lossEl.style.display = 'block';
        lossEl.parentElement.style.display = 'block';
    } else {
        lossEl.style.display = 'none';
        lossEl.parentElement.style.display = 'none';
    }
}

// ===============================
// 移动端菜单
// ===============================

document.querySelector('.menu-toggle')?.addEventListener('click', function() {
    document.querySelector('.nav-links')?.classList.toggle('open');
});
