(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();function A(n){if(!n||isNaN(n))return"—";const s=Math.floor(n/6e4),o=Math.floor(n%6e4/1e3).toString().padStart(2,"0");return`${s}:${o}`}function m(n){return String(n).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}async function L(n){try{let u=function(i){i.preventDefault(),r.classList.remove("is-open"),r.remove(),t.removeEventListener("click",u)};var s=u;const o=await fetch(`https://sound-wave.b.goit.study/api/artists/${n}/albums`);if(!o.ok)throw new Error(`Request failed: ${o.status}`);const e=await o.json(),t=document.querySelector(".modal_close"),r=document.querySelector(".modal_window"),l=document.querySelector(".modal_artist"),f=document.querySelector(".modal_content img"),a=document.querySelectorAll(".modal_basic_info li p"),p=document.querySelector(".modal_text_biography"),y=document.querySelector(".genres"),d=document.querySelector(".albums_info ul");t.addEventListener("click",u),l.textContent=e.strArtist??"Unknown artist",f.src=e.strArtistThumb||"https://via.placeholder.com/300x300?text=No+Image",f.alt=e.strArtist??"Artist",e.intFormedYear&&e.intDiedYear?a[0].textContent=`${e.intFormedYear} - ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?a[0].textContent=`${e.intFormedYear} - present`:a[0].textContent="information missing",a[1].textContent=e.strGender||"Undefined",a[2].textContent=e.intMembers||"?",a[3].textContent=e.strCountry||"Undefined",p.textContent=e.strBiographyEN||"No biography available.",y.innerHTML=Array.isArray(e.genres)&&e.genres.length?e.genres.map(i=>`<li>${m(i)}</li>`).join(""):"<li>Unknown</li>",d.innerHTML="",Array.isArray(e.albumsList)&&e.albumsList.length?e.albumsList.forEach(i=>{const h=(Array.isArray(i.tracks)?i.tracks:[]).map(c=>{const b=c.movie?`<a href="${c.movie}" target="_blank" rel="noopener noreferrer" class="play-svg-link">
                 <svg width="21" height="15">
                   <use href="../img/modal/modal-icons.svg#icon-play"></use>
                 </svg>
               </a>`:"";return`
            <tr>
              <td>${m(c.strTrack||"")}</td>
              <td>${A(Number(c.intDuration))}</td>
              <td>${b}</td>
            </tr>
          `}).join(""),g=`
          <li>
            <table>
              <caption>${m(i.strAlbum||"Album")}${i.intYearReleased?` (${i.intYearReleased})`:""}</caption>
              <thead>
                <tr class="album_columns">
                  <th>Track</th>
                  <th>Time</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>${h}</tbody>
            </table>
          </li>
        `;d.insertAdjacentHTML("beforeend",g)}):d.innerHTML="<li>No albums found</li>"}catch(o){console.error("Помилка при завантаженні артиста:",o)}}document.addEventListener("DOMContentLoaded",()=>{L("65ada227af9f6d155db46908")});
//# sourceMappingURL=index.js.map
