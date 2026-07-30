/*
=====================================
GSH Portfolio
personal-video.css
个人视频页面 + 统一导航
=====================================
*/

*{
margin:0;
padding:0;
box-sizing:border-box;
}



body{

background:#06030e;

color:#ede8ff;

font-family:
Inter,
Arial,
sans-serif;

}

.container{

max-width:1200px;

margin:auto;

padding:0 28px;

}


/* =====================
导航（统一）
===================== */

.navbar{

position:fixed;

top:0;

left:0;

width:100%;

height:72px;

z-index:999;

background:

rgba(5,3,11,.55);

backdrop-filter:

blur(25px);

border-bottom:

1px solid rgba(255,255,255,.08);

}

.nav-container{

height:100%;

display:flex;

align-items:center;

justify-content:space-between;

}

/* ===== 统一 LOGO 样式 ===== */
.logo{

font-size:24px;

font-weight:900;

color:white;

text-decoration:none !important;

letter-spacing:1px;

}

.logo span{

color:#c4b5fd;

font-size:18px;

margin-left:4px;

}

@media(max-width:768px){
.logo{
font-size:20px;
}
.logo span{
font-size:15px;
}
}

.nav-links{

display:flex;

align-items:center;

gap:32px;

list-style:none;

}

.nav-links a{

color:#aaa;

text-decoration:none;

font-size:15px;

transition:.3s;

}

.nav-links a:hover,

.nav-links .active{

color:white;

}

/* ===== 统一菜单按钮 ===== */
.menu-toggle{
display:none;
flex-direction:column;
gap:5px;
background:none;
border:none;
cursor:pointer;
padding:6px 4px;
}
.menu-toggle span{
display:block;
width:26px;
height:2px;
background:white;
border-radius:2px;
transition:.3s;
}


/* =====================
标题
===================== */

.page-header{

padding-top:140px;

padding-bottom:60px;

text-align:center;

}

.tag{

color:#a78bfa;

font-size:13px;

letter-spacing:2px;

margin-bottom:15px;

}

h1{

font-size:42px;

}

.page-header p{

color:#b4abc9;

margin-top:15px;

}


/* =====================
视频
===================== */

.video-grid{

display:grid;

grid-template-columns:

repeat(2,1fr);

gap:40px;

padding-bottom:100px;

}

.video-card{

background:
rgba(109,40,217,.08);

border:

1px solid rgba(139,92,246,.2);

border-radius:20px;

padding:20px;

}

.video-card video{

width:100%;

height:auto;

display:block;

border-radius:14px;

background:#000;

object-fit:contain;

}

.video-card h3{

margin-top:20px;

}

.video-card p{

color:#b4abc9;

margin-top:10px;

}


footer{

text-align:center;

padding:30px;

color:#71678f;

}


/* =====================
手机
===================== */

@media(max-width:768px){

.container{

padding:0 16px;

}

.nav-links{
display:none;
position:absolute;
top:72px;
left:0;
width:100%;
background:
rgba(5,3,11,.95);
backdrop-filter:
blur(25px);
flex-direction:column;
padding:20px 28px;
gap:16px;
border-bottom:
1px solid rgba(255,255,255,.08);
}

.nav-links.open{
display:flex;
}

.menu-toggle{
display:flex;
}

.nav-links a{
font-size:14px;
}

.video-grid{

grid-template-columns:1fr;

}

h1{

font-size:30px;

}

}
