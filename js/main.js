/*
=====================================
GSH Portfolio · main.js
首页数字滚动 + 移动端菜单 + 导航滚动效果
=====================================
*/

// ===============================
// 移动端菜单切换
// ===============================

document.querySelector('.menu-toggle')?.addEventListener('click', function() {
    document.querySelector('.nav-links')?.classList.toggle('open');
});

// ===============================
// 导航滚动加深
// ===============================

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
        navbar.style.background = 'rgba(247, 244, 235, 0.92)';
    } else {
        navbar.style.background = 'rgba(247, 244, 235, 0.72)';
    }
});

// ===============================
// 数字滚动计数
// ===============================

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const unit = counter.getAttribute('data-unit') || '';

    // 如果是小数（如 ROI 2.15），保留2位小数
    const isFloat = target % 1 !== 0;
    const duration = 1500;
    const startTime = performance.now();

    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad 缓出
        const eased = 1 - Math.pow(1 - progress, 2);
        const current = eased * target;

        if (isFloat) {
            counter.textContent = current.toFixed(2) + unit;
        } else {
            counter.textContent = Math.floor(current) + unit;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            // 最终值
            if (isFloat) {
                counter.textContent = target.toFixed(2) + unit;
            } else {
                counter.textContent = target + unit;
            }
        }
    }

    requestAnimationFrame(updateCount);
});
