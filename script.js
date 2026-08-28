/* ============================================
   FRANCIS FX ACADEMY - SITE INTERACTIONS (DARK)
   Clean, modular, and beginner-friendly JavaScript
   ============================================ */

// Helper to query safely
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* -----------------------------
   NAVIGATION & MOBILE MENU
   ----------------------------- */
function toggleMenu(){
    const nav = $('#navList');
    const toggle = $('#navToggle');
    if(!nav) return;
    const open = nav.classList.toggle('open');
    toggle && toggle.setAttribute('aria-expanded', open);
}

// close when clicking nav links
document.addEventListener('click', e => {
    const link = e.target.closest('[data-nav]');
    if(link){
        const nav = $('#navList');
        if(nav && nav.classList.contains('open')) nav.classList.remove('open');
    }
});

/* -----------------------------
   SMOOTH SCROLL
   ----------------------------- */
function scrollToSection(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth',block:'start'});
}

/* -----------------------------
   COURSE INTERACTIONS
   ----------------------------- */
function enroll(level){
    showToast(`Enrollment flow started for ${level}. Payment handled securely (demo).`,'info');
    // simulate adding activity and progress
    addActivity(`Started enrollment for ${level} course`);
}

function viewLessons(level){
    showToast(`Showing lessons for ${level} (demo).`,'info');
    addActivity(`Viewed lessons: ${level}`);
}

function openPayment(){
    showToast('Payment dialog (demo): use your preferred provider or integrated checkout.','info');
}

/* -----------------------------
   CONTACT FORM
   ----------------------------- */
function handleContact(e){
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if(!name||!email||!subject||!message){
        showToast('Please complete all fields','error');
        return;
    }

    // Simple demo: store contact in localStorage (would be sent to server in real app)
    const contacts = JSON.parse(localStorage.getItem('ffx_contacts')||'[]');
    contacts.unshift({name,email,subject,message,date:new Date().toISOString()});
    localStorage.setItem('ffx_contacts',JSON.stringify(contacts));

    showToast('Message sent. We will reply to your email.', 'success');
    addActivity(`Contact form submitted: ${subject}`);
    form.reset();
}

/* -----------------------------
   STUDENT DASHBOARD & PROGRESS
   ----------------------------- */
function loadProgress(){
    const prog = JSON.parse(localStorage.getItem('ffx_progress')||'{}');
    const pB = prog.beginner||0; const pI = prog.intermediate||0; const pA = prog.advanced||0;
    setProgress('barBeginner','pctBeginner',pB);
    setProgress('barIntermediate','pctIntermediate',pI);
    setProgress('barAdvanced','pctAdvanced',pA);
    const name = prog.name||'Student Name';
    $('#studentName') && ($('#studentName').textContent = name);
    $('#currentLevel') && ($('#currentLevel').textContent = prog.level||'Beginner');
}

function setProgress(barId, pctId, value){
    const bar = document.getElementById(barId);
    const pct = document.getElementById(pctId);
    if(bar) bar.style.width = Math.max(0,Math.min(100,value)) + '%';
    if(pct) pct.textContent = Math.round(value)+'%';
}

function continueLearning(){
    // pick current level and simulate progress + activity
    const level = $('#currentLevel').textContent || 'Beginner';
    incrementProgressFor(level,8);
    addActivity(`Continued learning: ${level}`);
    showToast('Progress saved locally. Keep learning!', 'success');
}

function incrementProgressFor(level,amount){
    const prog = JSON.parse(localStorage.getItem('ffx_progress')||'{}');
    if(!prog.beginner) prog.beginner=0; if(!prog.intermediate) prog.intermediate=0; if(!prog.advanced) prog.advanced=0;
    if(level.toLowerCase().includes('begin')) prog.beginner = Math.min(100,(prog.beginner||0)+amount);
    if(level.toLowerCase().includes('inter')) prog.intermediate = Math.min(100,(prog.intermediate||0)+amount);
    if(level.toLowerCase().includes('advanced')) prog.advanced = Math.min(100,(prog.advanced||0)+amount);
    localStorage.setItem('ffx_progress', JSON.stringify(prog));
    loadProgress();
}

function resetProgress(){
    localStorage.removeItem('ffx_progress');
    showToast('Progress reset (local demo).','info');
    loadProgress();
    addActivity('Progress reset by user');
}

/* -----------------------------
   ACTIVITY FEED
   ----------------------------- */
function addActivity(text){
    const list = document.getElementById('activityList');
    const items = JSON.parse(localStorage.getItem('ffx_activity')||'[]');
    items.unshift({text, date:new Date().toLocaleString()});
    localStorage.setItem('ffx_activity', JSON.stringify(items.slice(0,20)));
    renderActivity();
}

function renderActivity(){
    const list = document.getElementById('activityList');
    if(!list) return;
    const items = JSON.parse(localStorage.getItem('ffx_activity')||'[]');
    if(items.length===0){ list.innerHTML = '<li>No activity yet — start a lesson to populate this feed.</li>'; return; }
    list.innerHTML = items.map(i=>`<li><strong>${i.text}</strong><div class="muted" style="font-size:12px">${i.date}</div></li>`).join('');
}

/* -----------------------------
   TOAST / NOTIFICATION
   ----------------------------- */
function showToast(message, type='info'){
    const el = document.createElement('div');
    el.className = 'ffx-toast ffx-'+type;
    el.textContent = message;
    Object.assign(el.style,{position:'fixed',right:'20px',bottom:'20px',background:(type==='success'? '#10b981': type==='error'? '#ef4444':'#06b6d4'),color:'#001',padding:'12px 16px',borderRadius:'10px',zIndex:6000,boxShadow:'0 8px 30px rgba(2,6,23,0.6)',maxWidth:'360px'});
    document.body.appendChild(el);
    setTimeout(()=>{el.style.opacity=0;el.style.transform='translateY(10px)';},4200);
    setTimeout(()=>el.remove(),4600);
}

/* -----------------------------
   INIT
   ----------------------------- */
function init(){
    loadProgress();
    renderActivity();
    // footer year
    const fy = document.getElementById('footerYear'); if(fy) fy.textContent = new Date().getFullYear();
    // sample onboarding data if none
    if(!localStorage.getItem('ffx_progress')){
        localStorage.setItem('ffx_progress', JSON.stringify({beginner:8,intermediate:0,advanced:0,level:'Beginner',name:'Student Name'}));
    }
}

window.addEventListener('DOMContentLoaded', init);

/* -----------------------------
   Accessibility: close menus on Esc
   ----------------------------- */
window.addEventListener('keydown', e=>{
    if(e.key==='Escape'){
        const nav = $('#navList'); if(nav && nav.classList.contains('open')) nav.classList.remove('open');
    }
});

/* -----------------------------
   Keep code readable and well-commented for beginners
   ----------------------------- */

/* End of file */
