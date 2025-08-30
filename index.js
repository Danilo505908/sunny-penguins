import{S as L,N as A,P as C,a as S,i as $}from"./assets/vendor-cotWbADi.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const x="https://sound-wave.b.goit.study/api/feedbacks",f=document.querySelector(".swiper-wrapper"),g=document.getElementById("loader");let c=Number(localStorage.getItem("feedbackPage"))||1;async function E(r=1,n=10){g.style.display="block";try{const{data:e}=await S.get(x,{params:{page:r,limit:n}});return e.data}catch(e){return console.error("Error fetching feedbacks:",e),$.error({title:"Error",message:"Failed to load feedbacks"}),[]}finally{g.style.display="none"}}function k(r){const n=Math.round(r.rating);return`
    <div class="swiper-slide">
      <div class="feedback-card">
        <div class="rating-stars">
          ${Array.from({length:5},(e,o)=>`<svg class="star ${o<n?"filled":"empty"}" width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
               <path d="M9.07088 0.612343C9.41462 -0.204115 10.5854 -0.204114 10.9291 0.612346L12.9579 5.43123C13.1029 5.77543 13.4306 6.01061 13.8067 6.0404L19.0727 6.45748C19.9649 6.52814 20.3267 7.62813 19.6469 8.2034L15.6348 11.5987C15.3482 11.8412 15.223 12.2218 15.3106 12.5843L16.5363 17.661C16.744 18.5211 15.7969 19.201 15.033 18.7401L10.5245 16.0196C10.2025 15.8252 9.7975 15.8252 9.47548 16.0196L4.96699 18.7401C4.20311 19.201 3.25596 18.5211 3.46363 17.661L4.68942 12.5843C4.77698 12.2218 4.65182 11.8412 4.36526 11.5987L0.353062 8.2034C-0.326718 7.62813 0.0350679 6.52814 0.927291 6.45748L6.19336 6.0404C6.5695 6.01061 6.89716 5.77543 7.04207 5.43123L9.07088 0.612343Z" fill="currentColor"/>
            </svg>`).join("")}
        </div>
        <p class="message-text">"${r.descr}"</p>
        <p class="message-person">${r.name}</p>
      </div>
    </div>
  `}async function M(){const r=await E(c,10);if(!r.length){f.insertAdjacentHTML("beforeend","<p>No feedbacks found.</p>");return}f.innerHTML=r.map(k).join("");const n=new L(".swiper",{modules:[A,C],slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:(e,o)=>e<3?`<span class="${o}"></span>`:""}});n.on("slideChange",function(){const e=n.activeIndex+1;let o=0;e>=1&&e<=4?o=0:e>=5&&e<=9?o=1:o=2,document.querySelectorAll(".swiper-pagination-bullet").forEach(s=>s.classList.remove("swiper-pagination-bullet-active"));const t=document.querySelectorAll(".swiper-pagination-bullet");t[o]&&t[o].classList.add("swiper-pagination-bullet-active")}),c++,c>70&&(c=1),localStorage.setItem("feedbackPage",c)}M();function q(r){if(!r||isNaN(r))return"—";const n=Math.floor(r/6e4),e=Math.floor(r%6e4/1e3).toString().padStart(2,"0");return`${n}:${e}`}function p(r){return String(r).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}async function N(r){try{let m=function(i){i.preventDefault(),t.classList.remove("is-open"),t.remove(),o.removeEventListener("click",m)};const n=await fetch(`https://sound-wave.b.goit.study/api/artists/${r}/albums`);if(!n.ok)throw new Error(`Request failed: ${n.status}`);const e=await n.json(),o=document.querySelector(".modal_close"),t=document.querySelector(".modal_window"),s=document.querySelector(".modal_artist"),a=document.querySelector(".modal_content img"),l=document.querySelectorAll(".modal_basic_info li p"),y=document.querySelector(".modal_text_biography"),h=document.querySelector(".genres"),u=document.querySelector(".albums_info ul");o.addEventListener("click",m),s.textContent=e.strArtist??"Unknown artist",a.src=e.strArtistThumb||"https://via.placeholder.com/300x300?text=No+Image",a.alt=e.strArtist??"Artist",e.intFormedYear&&e.intDiedYear?l[0].textContent=`${e.intFormedYear} - ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?l[0].textContent=`${e.intFormedYear} - present`:l[0].textContent="information missing",l[1].textContent=e.strGender||"Undefined",l[2].textContent=e.intMembers||"?",l[3].textContent=e.strCountry||"Undefined",y.textContent=e.strBiographyEN||"No biography available.",h.innerHTML=Array.isArray(e.genres)&&e.genres.length?e.genres.map(i=>`<li>${p(i)}</li>`).join(""):"<li>Unknown</li>",u.innerHTML="",Array.isArray(e.albumsList)&&e.albumsList.length?e.albumsList.forEach(i=>{const b=(Array.isArray(i.tracks)?i.tracks:[]).map(d=>{const w=d.movie?`<a href="${d.movie}" target="_blank" rel="noopener noreferrer" class="play-svg-link">
                 <svg width="21" height="15">
                   <use href="../img/modal/modal-icons.svg#icon-play"></use>
                 </svg>
               </a>`:"";return`
            <tr>
              <td>${p(d.strTrack||"")}</td>
              <td>${q(Number(d.intDuration))}</td>
              <td>${w}</td>
            </tr>
          `}).join(""),v=`
          <li>
            <table>
              <caption>${p(i.strAlbum||"Album")}${i.intYearReleased?` (${i.intYearReleased})`:""}</caption>
              <thead>
                <tr class="album_columns">
                  <th>Track</th>
                  <th>Time</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>${b}</tbody>
            </table>
          </li>
        `;u.insertAdjacentHTML("beforeend",v)}):u.innerHTML="<li>No albums found</li>"}catch(n){console.error("Помилка при завантаженні артиста:",n)}}document.addEventListener("DOMContentLoaded",()=>{N("65ada227af9f6d155db46908")});
//# sourceMappingURL=index.js.map
