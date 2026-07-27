/*
=====================================
GSH Portfolio
design-works.js
加载美工设计作品数据
=====================================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{

const grid =
document.getElementById(
"designGrid"
);

if(!grid){

console.warn(
"没有找到设计作品容器"
);

return;

}

fetch("./assets/data/design.json")

.then(res=>{

if(!res.ok){

throw new Error(
"design.json 加载失败"
);

}

return res.json();

})

.then(works=>{

if(!works || works.length === 0){

grid.innerHTML = `

<div style="text-align:center;padding:60px 20px;color:#888;grid-column:1/-1;">

<h3>暂无设计作品</h3>

<p style="margin-top:10px;">请将作品数据放入 assets/data/design.json</p>

</div>

`;

return;

}

grid.innerHTML = works.map(item=>{

// 根据类型设置不同的 CSS 类
let typeClass = 'type-other';

if(item.type === '商品主图' || item.type === '电商主图'){

typeClass = 'type-product';

} else if(item.type === '礼盒包装' || item.type === '包装设计'){

typeClass = 'type-giftbox';

} else if(item.type === '瓜子包装'){

typeClass = 'type-packaging';

} else if(item.type === '海报设计'){

typeClass = 'type-poster';

} else if(item.type === 'AI源文件'){

typeClass = 'type-ai';

}

return `

<div class="design-card">

<div class="cover-box">

<img

src="${item.image}"

alt="${item.title}"

loading="lazy"

onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%231a1030%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%23666%22 font-size=%2220%22 font-family=%22sans-serif%22%3E暂无图片%3C/text%3E%3C/svg%3E'"

>

<span class="design-type ${typeClass}">

${item.type || '设计'}

</span>

</div>

<div class="design-info">

<h3>${item.title}</h3>

<p>${item.desc || ''}</p>

</div>

</div>

`;

}).join('');

})

.catch(err=>{

console.error(

"设计作品加载失败:",
err

);

grid.innerHTML = `

<div style="text-align:center;padding:60px 20px;color:#888;grid-column:1/-1;">

<h3>加载失败</h3>

<p style="margin-top:10px;">请检查 assets/data/design.json 是否存在</p>

</div>

`;

});

// =====================
// 移动端菜单
// =====================

const menu =
document.querySelector(
".menu-toggle"
);

const nav =
document.querySelector(
".nav-links"
);

if(menu && nav){

menu.addEventListener(
"click",
()=>{

nav.classList.toggle(
"open"
);

}

);

}

});
