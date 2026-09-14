const MODULE_KEY='sdr-imobiliario-progress-v1';
const checks=[...document.querySelectorAll('.module-check')];
const bar=document.querySelector('.progress-bar');
const txt=document.querySelector('#progressText');
function state(){try{return JSON.parse(localStorage.getItem(MODULE_KEY)||'{}')}catch{return {}}}
function update(){const n=checks.filter(x=>x.checked).length;const p=checks.length?Math.round(n/checks.length*100):0;if(bar)bar.style.width=p+'%';if(txt)txt.textContent=p+'% concluído'}
const s=state();checks.forEach(c=>{c.checked=!!s[c.dataset.module];c.addEventListener('change',()=>{const n=state();n[c.dataset.module]=c.checked;localStorage.setItem(MODULE_KEY,JSON.stringify(n));update()})});update();
document.querySelector('#printBtn')?.addEventListener('click',()=>window.print());
document.querySelector('#resetBtn')?.addEventListener('click',()=>{if(confirm('Zerar o progresso deste treinamento?')){localStorage.removeItem(MODULE_KEY);checks.forEach(c=>c.checked=false);update()}});
const sections=[...document.querySelectorAll('section[id]')],links=[...document.querySelectorAll('.sidebar a')];
const obs=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+v.target.id))},{rootMargin:'-18% 0px -72% 0px',threshold:[0,.1,.25]});sections.forEach(s=>obs.observe(s));
document.querySelectorAll('.qr').forEach(el=>{const u=el.dataset.url;if(u&&typeof QRCode!=='undefined')new QRCode(el,{text:u,width:100,height:100,correctLevel:QRCode.CorrectLevel.M})});
const inputs=[...document.querySelectorAll('.score-input')],total=document.querySelector('#scoreTotal');function score(){const t=inputs.reduce((a,i)=>a+Math.max(0,Math.min(10,Number(i.value)||0)),0);if(total)total.textContent=t+'/100'}inputs.forEach(i=>i.addEventListener('input',score));score();
