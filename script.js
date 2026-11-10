(() => {
 const resources = window.UNIEXAM_RESOURCES || [];
 const grid = document.getElementById('resourceGrid');
 if (!grid) return;
 const input = document.getElementById('searchInput');
 const field = document.getElementById('fieldFilter');
 const count = document.getElementById('resultCount');
 const empty = document.getElementById('emptyState');
 let active = 'all';
 function render(){
   const q = (input.value || '').trim().toLowerCase();
   const list = resources.filter(r => (active === 'all' || r.field === active) && (!field.value || r.field === field.value) && [r.title,r.field,r.type,r.description].join(' ').toLowerCase().includes(q));
   grid.innerHTML = list.map(r => `<article class="resource-card">
     <div class="resource-top"><span class="resource-icon">${r.icon || '▤'}</span><span class="resource-type">${escapeHtml(r.type)}</span></div>
     <h3>${escapeHtml(r.title)}</h3><div class="resource-meta">${escapeHtml(r.field)} · ${escapeHtml(r.year)}</div>
     <p class="resource-meta">${escapeHtml(r.description)}</p>
     <div class="resource-bottom"><span class="resource-tag">UNIEXAM MAROC</span>${r.url ? `<a class="resource-link" href="${safeUrl(r.url)}" target="_blank" rel="noopener">فتح المورد ←</a>` : `<span class="resource-link muted-link">قريباً</span>`}</div>
   </article>`).join('');
   count.textContent = `${list.length} مورد`;
   empty.hidden = list.length !== 0;
 }
 function escapeHtml(s){return String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function safeUrl(s){try{const u=new URL(s,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'#';}catch{return '#';}}
 input.addEventListener('input',render);
 field.addEventListener('change',render);
 document.getElementById('searchButton').addEventListener('click',render);
 document.querySelectorAll('.filter-chip').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;document.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('selected',x===b));render();}));
 document.querySelectorAll('.field-card').forEach(a=>a.addEventListener('click',()=>{active=a.dataset.field;field.value=active;document.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('selected',x.dataset.filter===active));}));
 const toggle=document.getElementById('menuToggle'), nav=document.getElementById('mainNav');
 toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
 document.getElementById('year').textContent=new Date().getFullYear();
 render();
})();