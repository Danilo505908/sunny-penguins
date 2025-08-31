import{S as g,N as y,P as v,a as b,i as w}from"./assets/vendor-B3QObSWc.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();document.getElementById("loader-overlay");const x="https://sound-wave.b.goit.study/api/artists";let c=1;const f=8,L=document.getElementById("artists-list"),l=document.getElementById("load-more");async function h(e=1,t=8){try{l.textContent="Loading...";const n=await fetch(`${x}?page=${e}&limit=${t}`);if(!n.ok)throw new Error("Failed to fetch artists");const o=await n.json();console.log("API response:",o),Array.isArray(o.artists)?(E(o.artists),o.artists.length<t||e*t>=o.totalArtists?l.style.display="none":l.textContent="Load More"):console.error("Unexpected API structure:",o)}catch(n){console.error(n),alert("❌ Помилка завантаження артистів")}}function E(e){e.forEach(t=>{const n=document.createElement("div");n.classList.add("artist-card"),n.innerHTML=`
      <img src="${t.photo}" alt="${t.name}" class="artist-photo" />
      <div class="artist-content">
        <h3 class="artist-name">${t.name}</h3>
        <p class="artist-genres">${t.genres.join(", ")}</p>
        <p class="artist-description">${t.description||"No description available"}</p>
      </div>
    `,L.appendChild(n)})}l.addEventListener("click",()=>{c++,h(c,f)});h(c,f);const M=`<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>

        <symbol id="star-empty" viewBox="0 0 34 32">
            <title>star-empty</title>
            <path class="path-star-empty"
                  d="M33.412 12.395l-11.842-1.021-4.628-10.904-4.628 10.92-11.842 1.005 8.993 7.791-2.701 11.579 10.179-6.144 10.179 6.144-2.685-11.579 8.976-7.791zM16.941 22.541l-6.193 3.739 1.647-7.049-5.468-4.744 7.214-0.626 2.8-6.638 2.816 6.654 7.214 0.626-5.468 4.744 1.647 7.049-6.209-3.755z"/>
        </symbol>

        <symbol id="star-half" viewBox="0 0 34 32">
            <title>star-half</title>
            <path class="path-star-half"
                  d="M 33.412,12.395 21.57,11.374 16.942,0.47 12.314,11.39 0.472,12.395 9.465,20.186 6.764,31.765 16.943,25.621 27.122,31.765 24.437,20.186 33.413,12.395 Z M 16.941,22.541 c 0,0 -0.297971,-14.6455833 0,-15.318 l 2.816,6.654 7.214,0.626 -5.468,4.744 1.647,7.049 z"/>
            </symbol>

        <symbol id="star-filled" viewBox="0 0 34 32">
            <title>star-filled</title>
            <path class="path-star-filled"
                  d="M16.941 25.621l10.179 6.144-2.701-11.579 8.993-7.791-11.842-1.005-4.628-10.92-4.628 10.92-11.842 1.005 8.993 7.791-2.701 11.579z"/>
        </symbol>

    </defs>
</svg>
`,B=`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    <symbol id="icon-caret-right" viewBox="0 0 31 32">
      <path fill="currentColor" d="M11.52 24.96 21.76 16 11.52 7.04v17.92z"/>
    </symbol>
    <symbol id="icon-close" viewBox="0 0 32 32">
      <path fill="currentColor" d="m21.589 8.459-5.657 5.656-5.656-5.656-1.885 1.885L14.047 16l-5.656 5.656 1.885 1.885 5.656-5.656 5.657 5.656 1.885-1.885L17.818 16l5.656-5.656-1.885-1.885z"/>
    </symbol>
    <symbol id="icon-down-arrow-alt" viewBox="0 0 31 32">
      <path fill="currentColor" d="m23.945 16.611-1.81-1.81-5.495 5.495V8.026h-2.56v12.27l-5.495-5.495-1.81 1.81 8.585 8.585 8.585-8.585z"/>
    </symbol>
    <symbol id="icon-menu-alt-right" viewBox="0 0 32 32">
      <path fill="currentColor" d="M5.333 8h21.333v2.667H5.333V8zm5.334 6.667h16v2.667h-16v-2.667zm6.666 6.666h9.333V24h-9.333v-2.667z"/>
    </symbol>
    <symbol id="icon-Facebook" viewBox="0 0 31 32">
      <path fill="currentColor" d="M28.16 16.51c0-7.112-5.731-12.878-12.8-12.878S2.56 9.398 2.56 16.51c0 6.428 4.681 11.756 10.8 12.722v-8.999h-3.25V16.51h3.25v-2.837c0-3.228 1.911-5.01 4.835-5.01 1.401 0 2.865.252 2.865.252v3.169h-1.614c-1.59 0-2.086.993-2.086 2.011v2.416h3.55l-.567 3.723H17.36v8.999c6.119-.966 10.8-6.294 10.8-12.722z"/>
    </symbol>
    <symbol id="icon-Instagram" viewBox="0 0 31 32">
      <path fill="currentColor" d="M15.36 6.676c3.078 0 3.442.014 4.652.068 1.125.05 1.732.238 2.137.396.522.204.897.447 1.292.842.395.395.638.77.842 1.292.158.405.346 1.012.396 2.137.054 1.21.068 1.574.068 4.652s-.014 3.442-.068 4.652c-.05 1.125-.238 1.732-.396 2.137-.204.522-.447.897-.842 1.292-.395.395-.77.638-1.292.842-.405.158-1.012.346-2.137.396-1.21.054-1.574.068-4.652.068s-3.442-.014-4.652-.068c-1.125-.05-1.732-.238-2.137-.396-.522-.204-.897-.447-1.292-.842-.395-.395-.638-.77-.842-1.292-.158-.405-.346-1.012-.396-2.137-.054-1.21-.068-1.574-.068-4.652s.014-3.442.068-4.652c.05-1.125.238-1.732.396-2.137.204-.522.447-.897.842-1.292.395-.395.77-.638 1.292-.842.405-.158 1.012-.346 2.137-.396 1.21-.054 1.574-.068 4.652-.068zm0-2.676c-3.127 0-3.52.014-4.75.07-1.23.055-2.07.252-2.807.537-.758.295-1.404.692-2.047 1.335-.643.643-1.04 1.289-1.335 2.047-.285.737-.482 1.577-.537 2.807-.055 1.23-.07 1.623-.07 4.75s.015 3.52.07 4.75c.055 1.23.252 2.07.537 2.807.295.758.692 1.404 1.335 2.047.643.643 1.289 1.04 2.047 1.335.737.285 1.577.482 2.807.537 1.23.055 1.623.07 4.75.07s3.52-.015 4.75-.07c1.23-.055 2.07-.252 2.807-.537.758-.295 1.404-.692 2.047-1.335.643-.643 1.04-1.289 1.335-2.047.285-.737.482-1.577.537-2.807.055-1.23.07-1.623.07-4.75s-.015-3.52-.07-4.75c-.055-1.23-.252-2.07-.537-2.807-.295-.758-.692-1.404-1.335-2.047-.643-.643-1.289-1.04-2.047-1.335-.737-.285-1.577-.482-2.807-.537-1.23-.055-1.623-.07-4.75-.07z"/>
    </symbol>
    <symbol id="icon-Youtube" viewBox="0 0 31 32">
      <path fill="currentColor" d="M27.639 9.981a3.199 3.199 0 0 0-2.255-2.261c-2.004-.55-10.024-.559-10.024-.559s-8.018-.009-10.024.517a3.272 3.272 0 0 0-2.261 2.275c-.529 2.004-.534 6.162-.534 6.162s-.005 4.178.52 6.162a3.204 3.204 0 0 0 2.257 2.259c2.025.55 10.022.559 10.022.559s8.019.009 10.024-.516a3.221 3.221 0 0 0 2.262-2.257c.53-2.003.534-6.159.534-6.159s.026-4.179-.521-6.184zm-14.844 9.987.006-7.68 6.665 3.846-6.671 3.834z"/>
    </symbol>
    <symbol id="icon-logo" viewBox="0 0 110 32">
      <path fill="currentColor" d="M16.403.142c.434-.05.936.047 1.354.174.945.288 1.714.905 2.169 1.785.474.902.564 1.957.252 2.927-.397 1.196-1.247 1.797-2.309 2.35l.012 3.489c.759.231 1.498.495 2.187.894 1.584.919 2.669 2.467 3.123 4.23a7.205 7.205 0 0 1-.76 5.459c-.887 1.493-2.3 2.597-3.993 3.019-2.211.552-4.086-.047-5.986-1.176a156.6 156.6 0 0 0-2.489 2.725c.366.864.487 1.77.244 2.687-.237.897-.866 1.666-1.67 2.121-.901.51-1.928.603-2.916.321-.981-.281-1.805-.889-2.284-1.801-.472-.897-.511-1.949-.206-2.907.348-1.089 1.057-1.759 2.053-2.257 1.072-.419 1.958-.281 3.005.096.872-.917 1.693-1.88 2.574-2.789-.968-1.898-1.281-3.515-.778-5.606-1.096-.511-2.153-1.108-3.249-1.62-.586.61-1.301 1.028-2.142 1.169-1.003.169-2.061-.105-2.885-.694a3.671 3.671 0 0 1-1.486-2.493c-.135-.97.12-2.038.741-2.803.64-.789 1.634-1.265 2.637-1.37a3.727 3.727 0 0 1 2.734.836c.976.818 1.258 1.834 1.376 3.045 1.039.637 2.229 1.129 3.312 1.698 1.409-1.665 2.439-2.191 4.492-2.824l.002-3.463a4.767 4.767 0 0 1-1.055-.561 3.715 3.715 0 0 1-1.473-2.501 3.76 3.76 0 0 1 .779-2.782C14.446.669 15.353.282 16.404.143zm4.528 17.225a4.35 4.35 0 1 0-8.663.76 4.35 4.35 0 0 0 8.662-.76zm81.176-5.409c.708.001 1.415.011 2.124.029l-.004 3.742c.546-.424 1.14-.739 1.831-.843.933-.141 1.884.1 2.637.669.908.687 1.384 1.844 1.523 2.949.175 1.401-.154 2.749-1.019 3.866-.574.554-1.263.941-2.057 1.072-1.165.191-2.088-.216-2.998-.894anese.004.817-2.032-.003-.001-11.404zm3.64 4.904c-.632.21-1.07.51-1.378 1.118-.342.675-.365 1.508-.099 2.211.204.538.585 1.004 1.118 1.244.385`,d="star-rating-sprite";if(!document.getElementById(d)){const e=document.createElement("div");e.id=d,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.overflow="hidden",e.innerHTML=M,document.body.prepend(e)}const I="https://sound-wave.b.goit.study/api/feedbacks",u=document.querySelector(".swiper-wrapper"),p=document.getElementById("loader");let r=Number(localStorage.getItem("feedbackPage"))||1;function z(e){const t=Math.round(e),n=Array.from({length:5},(o,s)=>`
      <svg class="star ${s<t?"filled":"empty"}" aria-hidden="true" width="20" height="20">
        <use href="#star-filled"></use>
      </svg>
    `).join("");return`
    <div class="rating star-svg value-${t}" aria-label="Rating ${t} out of 5">
      <div class="star-container">${n}</div>
    </div>
  `}function S(e){return`
    <div class="swiper-slide">
      <div class="feedback-card">
        ${z(e.rating)}
        <p class="message-text">"${e.descr}"</p>
        <p class="message-person">${e.name}</p>
      </div>
    </div>
  `}async function $(e=1,t=10){p.style.display="block";try{const{data:n}=await b.get(I,{params:{page:e,limit:t}});return n.data}catch(n){return console.error("Error fetching feedbacks:",n),w.error({title:"Error",message:"Failed to load feedbacks"}),[]}finally{p.style.display="none"}}async function C(){const e=await $(r,10);if(!e.length){u.insertAdjacentHTML("beforeend","<p>No feedbacks found.</p>");return}u.innerHTML=e.map(S).join("");const t=new g(".swiper",{modules:[y,v],slidesPerView:1,autoHeight:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".message-cont .swiper-pagination",clickable:!0,renderBullet:(n,o)=>n<3?`<span class="custom-bullet ${o}" data-index="${n}"></span>`:""}});t.on("slideChange",()=>{const n=t.slides.length,o=t.activeIndex,s=document.querySelectorAll(".custom-bullet");s.forEach(i=>i.classList.remove("swiper-pagination-bullet-active")),o===0?s[0].classList.add("swiper-pagination-bullet-active"):o===n-1?s[2].classList.add("swiper-pagination-bullet-active"):s[1].classList.add("swiper-pagination-bullet-active")}),document.addEventListener("click",n=>{const o=n.target.closest(".custom-bullet");if(!o)return;const s=t.slides.length;o.dataset.index==="0"?t.slideTo(0):o.dataset.index==="2"?t.slideTo(s-1):t.slideTo(1)}),r++,r>70&&(r=1),localStorage.setItem("feedbackPage",r)}C();const m="main-icon-sprite";if(!document.getElementById(m)){const e=document.createElement("div");e.id=m,e.style.position="absolute",e.style.width="0",e.style.height="0",e.style.overflow="hidden",e.innerHTML=B,document.body.prepend(e)}
//# sourceMappingURL=index.js.map
