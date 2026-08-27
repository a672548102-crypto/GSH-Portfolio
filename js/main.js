/*
=====================================
GSH Portfolio · main.js
首页数字滚动 + 移动端菜单 + 导航滚动效果
=====================================
*/

// ===============================
// 等待 DOM 加载完成后再执行
// ===============================

document.addEventListener('DOMContentLoaded', function() {

    // ===============================
    // 移动端菜单切换
    // ===============================

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();  // 防止冒泡影响其他点击
            navLinks.classList.toggle('open');
        });

        // 点击页面其他区域关闭菜单（提升移动端体验）
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('open');
            }
        });
    } else {
        console.warn('菜单元素未找到，请检查 HTML 结构');
    }

    // ===============================
    // 导航滚动加深
    // ===============================

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.style.background = 'rgba(247, 244, 235, 0.92)';
            } else {
                navbar.style.background = 'rgba(247, 244, 235, 0.72)';
            }
        });
    }

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

}); // DOMContentLoaded 结束
