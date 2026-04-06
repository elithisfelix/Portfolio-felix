
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  

    feather.replace();

    /* ============ LOADER ============ */
    window.addEventListener('load',()=>{document.body.style.overflow='hidden';setTimeout(()=>{document.getElementById('loader').classList.add('hidden');document.body.style.overflow=''},1500)});

    /* ============ CURSOR + TRAIL (8 POINTS) ============ */
    const cDot=document.getElementById('cDot');
    const trailBox=document.getElementById('trailBox');
    const TRAIL_N=8;const trails=[];
    for(let i=0;i<TRAIL_N;i++){const d=document.createElement('div');d.className='cur-trail';const s=10-i;d.style.width=s+'px';d.style.height=s+'px';d.style.opacity=(1-i/TRAIL_N)*.5;trailBox.appendChild(d);trails.push({el:d,x:0,y:0})}
    let mx=-100,my=-100;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cDot.style.left=mx-5+'px';cDot.style.top=my-5+'px'});
    function animTrail(){let px=mx,py=my;trails.forEach((t,i)=>{const sp=.15-i*.012;t.x+=(px-t.x)*Math.max(sp,.03);t.y+=(py-t.y)*Math.max(sp,.03);const s=10-i;t.el.style.left=t.x-s/2+'px';t.el.style.top=t.y-s/2+'px';px=t.x;py=t.y});requestAnimationFrame(animTrail)}
    animTrail();
    document.querySelectorAll('a,button,input,textarea,.stat-c,.read-card,.exp-c,.pf-sc,.badge-group,.ct-link,.tick,.srv-card').forEach(el=>{el.addEventListener('mouseenter',()=>cDot.style.transform='scale(2)');el.addEventListener('mouseleave',()=>cDot.style.transform='scale(1)')});

    /* ============ SCROLL BAR ============ */
    const sBar=document.getElementById('sBar');
    window.addEventListener('scroll',()=>{const p=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;sBar.style.width=p+'%'});

    /* ============ MENU MOBILE ============ */
    const ham=document.getElementById('ham'),nL=document.getElementById('navLinks');
    ham.addEventListener('click',()=>{ham.classList.toggle('on');nL.classList.toggle('open')});
    function closeM(){ham.classList.remove('on');nL.classList.remove('open')}

    /* ============ THEME TOGGLE ============ */
    const tBtn=document.getElementById('themeBtn'),html=document.documentElement;
    const sT=localStorage.getItem('theme')||'dark';html.setAttribute('data-theme',sT);tBtn.textContent=sT==='dark'?'🌙':'☀️';
    tBtn.addEventListener('click',()=>{const c=html.getAttribute('data-theme');const n=c==='dark'?'light':'dark';html.setAttribute('data-theme',n);localStorage.setItem('theme',n);tBtn.textContent=n==='dark'?'🌙':'☀️'});

    /* ============ LANGUAGE SWITCH ============ */
    const phrasesI18n={
      en:["Sales & CRM professional","Marketing & digital operations","B2B prospecting and client work","Based in Dublin · open to work"],
      fr:["Profil vente & CRM","Marketing & opérations digitales","Prospection B2B et relation client","Basé à Dublin · ouvert aux opportunités"]
    };
    let curLang='en';
    const phrases=["Sales & CRM professional","Marketing & digital operations","B2B prospecting and client work","Based in Dublin · open to work"];
    function setLang(lang){
      curLang=lang;
      html.setAttribute('data-lang',lang);
      html.setAttribute('lang',lang==='fr'?'fr':'en');
      localStorage.setItem('lang',lang);
      document.getElementById('btnFr').classList.toggle('active',lang==='fr');
      document.getElementById('btnEn').classList.toggle('active',lang==='en');
      document.getElementById('btnFr').setAttribute('aria-pressed',lang==='fr');
      document.getElementById('btnEn').setAttribute('aria-pressed',lang==='en');
      document.querySelectorAll('[data-ph-en]').forEach(el=>{el.placeholder=el.getAttribute('data-ph-'+lang)});
      document.querySelectorAll('.section-title').forEach((t,i)=>{
        const key='data-text-'+lang;
        if(t.getAttribute(key)){
          const txt=t.getAttribute(key);
          t.innerHTML=txt.replace(/\.$/,'')+'<span class="dot">.</span>';
          if(typeof scr!=='undefined'&&scr[i])scr[i].orig=txt.replace(/\.$/,'');
        }
      });
      phrases.length=0;
      phrasesI18n[lang].forEach(p=>phrases.push(p));
      pI=0;cI=0;del=false;
    }

    /* ============ TYPEWRITER ============ */
    let pI=0,cI=0,del=false;const tOut=document.getElementById('typed');
    function typeE(){const ph=phrases[pI];if(!del){tOut.textContent=ph.substring(0,cI+1);cI++;if(cI===ph.length){del=true;setTimeout(typeE,2000);return}setTimeout(typeE,55)}else{tOut.textContent=ph.substring(0,cI-1);cI--;if(cI===0){del=false;pI=(pI+1)%phrases.length;setTimeout(typeE,400);return}setTimeout(typeE,28)}}
    if(tOut) typeE();

    /* ============ PARTICLES + MOUSE REPULSION ============ */
    const cv=document.getElementById('pCanvas'),cx=cv.getContext('2d');let pts=[];
    let cmx=-9999,cmy=-9999;
    document.querySelector('.hero').addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();cmx=e.clientX-r.left;cmy=e.clientY-r.top});
    document.querySelector('.hero').addEventListener('mouseleave',()=>{cmx=-9999;cmy=-9999});
    function rsz(){const h=document.querySelector('.hero');cv.width=h.offsetWidth;cv.height=h.offsetHeight}
    function mkPts(){pts=[];const n=Math.floor((cv.width*cv.height)/20000);for(let i=0;i<n;i++)pts.push({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.5+.5,px:0,py:0})}
    function drawP(){cx.clearRect(0,0,cv.width,cv.height);const ac=getComputedStyle(html).getPropertyValue('--accent').trim()||'#00ff87';pts.forEach((p,i)=>{const dx=p.x-cmx,dy=p.y-cmy,d=Math.sqrt(dx*dx+dy*dy);if(d<100&&d>0){const f=Math.min(2,(100-d)/50),a=Math.atan2(dy,dx);p.px+=Math.cos(a)*f;p.py+=Math.sin(a)*f}p.px*=.95;p.py*=.95;p.x+=p.vx+p.px;p.y+=p.vy+p.py;if(p.x<0||p.x>cv.width)p.vx*=-1;if(p.y<0||p.y>cv.height)p.vy*=-1;cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);cx.fillStyle=ac+'50';cx.fill();for(let j=i+1;j<pts.length;j++){const ddx=p.x-pts[j].x,ddy=p.y-pts[j].y,dd=Math.sqrt(ddx*ddx+ddy*ddy);if(dd<110){cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(pts[j].x,pts[j].y);const op=Math.floor((1-dd/110)*20);cx.strokeStyle=ac+op.toString(16).padStart(2,'0');cx.lineWidth=.5;cx.stroke()}}});requestAnimationFrame(drawP)}
    rsz();mkPts();drawP();window.addEventListener('resize',()=>{rsz();mkPts()});

    /* ============ COUNTERS ============ */
    function animC(){document.querySelectorAll('.stat-num').forEach(el=>{const t=+el.dataset.target;let c=0;const s=()=>{if(c<t){c++;el.textContent=c+'+';setTimeout(s,150)}};s()})}
    setTimeout(animC,1800);

    /* ============ SCROLL REVEAL ============ */
    const rvObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.rv').forEach(el=>rvObs.observe(el));

    /* ============ LANG BARS + SKILL BARS ============ */
    const barObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.style.width=e.target.dataset.w+'%'})},{threshold:.3});
    document.querySelectorAll('.lang-fill').forEach(b=>barObs.observe(b));

    (function(){
      const legBarObs=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;const b=e.target,w=b.dataset.w;if(w){b.style.width=w+'%';b.classList.add('animated')}legBarObs.unobserve(b)})},{threshold:.3});
      document.querySelectorAll('.pf-legend .leg-bar').forEach(b=>legBarObs.observe(b));
    })();


    /* ============ TIMELINE ============ */
    const tlItems=document.querySelectorAll('.tl-item'),tlFill=document.getElementById('tlFill'),tlEl=document.getElementById('tl');
    const tlObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');updTL()}})},{threshold:.3,rootMargin:'0px 0px -60px 0px'});
    tlItems.forEach(i=>tlObs.observe(i));
    function updTL(){if(!tlEl||!tlFill)return;const v=document.querySelectorAll('.tl-item.vis');if(!v.length){tlFill.style.height='0%';return}const last=v[v.length-1];const tr=tlEl.getBoundingClientRect(),ir=last.getBoundingClientRect();const h=ir.top-tr.top+ir.height*.5;tlFill.style.height=Math.min(h/tlEl.offsetHeight*100,100)+'%'}

    /* ============ BACK TO TOP ============ */
    const btt=document.getElementById('btt');
    window.addEventListener('scroll',()=>{btt.classList.toggle('vis',window.scrollY>300)});
    btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));


    /* ============ KONAMI ============ */
    const kCode=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];let kI=0;
    document.addEventListener('keydown',e=>{if(e.key===kCode[kI]){kI++;if(kI===kCode.length){kI=0;fireConf()}}else kI=0});
    function fireConf(){const c=document.getElementById('confC'),m=document.getElementById('eMsg');const cols=['#00ff87','#f97316','#a855f7','#3b82f6','#ef4444','#eab308'];for(let i=0;i<80;i++){const p=document.createElement('div');p.className='conf';p.style.left=Math.random()*100+'%';p.style.background=cols[Math.floor(Math.random()*cols.length)];p.style.animationDelay=Math.random()*2+'s';p.style.animationDuration=(2+Math.random()*2)+'s';const s=6+Math.random()*10;p.style.width=s+'px';p.style.height=s+'px';p.style.borderRadius=Math.random()>.5?'50%':'2px';c.appendChild(p)}m.classList.add('show');setTimeout(()=>{m.classList.remove('show');c.innerHTML=''},4000)}

    /* ============ SCRAMBLE TEXT ============ */
    class Scramble{constructor(el){this.el=el;this.orig=el.textContent;this.chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';this.on=false}
    run(){if(this.on)return;this.on=true;const t=this.orig,len=t.length;let f=0;const tick=()=>{let o='';let done=true;for(let i=0;i<len;i++){if(t[i]===' ')o+=' ';else if(f*16>=i*40)o+=t[i];else{o+=this.chars[Math.floor(Math.random()*this.chars.length)];done=false}}this.el.textContent=o;f++;if(!done)requestAnimationFrame(tick);else{this.el.innerHTML=this.orig.replace(/\.$/,'')+'<span class="dot">.</span>';this.on=false}};requestAnimationFrame(tick)}}
    const scr=[];document.querySelectorAll('.section-title').forEach(t=>{t.dataset.orig=t.textContent;scr.push(new Scramble(t))});
    const scrObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const i=[...document.querySelectorAll('.section-title')].indexOf(e.target);if(i!==-1&&scr[i])scr[i].run();scrObs.unobserve(e.target)}})},{threshold:.5});
    document.querySelectorAll('.section-title').forEach(el=>scrObs.observe(el));

    /* ============ NEWSLETTER FORM ============ */
    function handleNL(e){e.preventDefault();const b=document.getElementById('nlBtn');const o=b.innerHTML;b.innerHTML=curLang==='fr'?'✅ Inscrit !':'✅ Subscribed!';b.style.background='#22c55e';setTimeout(()=>{b.innerHTML=o;b.style.background='';e.target.reset()},2500)}

    /* ============ TILT 3D ============ */
    document.querySelectorAll('.exp-c,.pf-sc,.read-card,.stat-c,.srv-card').forEach(c=>{c.classList.add('tilt-c');const g=document.createElement('div');g.className='tilt-g';c.appendChild(g);
    c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=((e.clientX-r.left)/r.width-.5)*2,y=((e.clientY-r.top)/r.height-.5)*2;c.style.transform=`perspective(800px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`;g.style.background=`radial-gradient(circle at ${(x+1)*50}% ${(y+1)*50}%,rgba(255,255,255,.1) 0%,transparent 60%)`});
    c.addEventListener('mouseleave',()=>{c.style.transform='';c.style.transition='transform .5s ease,border-color .3s,box-shadow .3s'});
    c.addEventListener('mouseenter',()=>{c.style.transition='transform .12s ease,border-color .3s,box-shadow .3s'})});

    /* ============ MAGNETIC BUTTONS ============ */
    document.querySelectorAll('.btn,.ct-link,.srv-btn').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=e.clientX-cx,dy=e.clientY-cy,d=Math.sqrt(dx*dx+dy*dy);if(d<80){const s=1-d/80,mx=Math.max(-15,Math.min(15,dx*s*.35)),my=Math.max(-15,Math.min(15,dy*s*.35));el.style.transform=`translate(${mx}px,${my}px)`;el.style.transition='transform .15s ease-out'}});
    el.addEventListener('mouseleave',()=>{el.style.transform='';el.style.transition='transform .6s cubic-bezier(.34,1.56,.64,1)'})});

    /* ============ INIT LANGUAGE (after all components) ============ */
    (function initLang(){
      const saved=localStorage.getItem('lang');
      const detected=saved||(navigator.language.startsWith('fr')?'fr':'en');
      setLang(detected);
    })();
    feather.replace();

    (function lockHeroProfilePhoto(){
      var w=document.querySelector('.hero-profile');
      if(!w)return;
      w.style.setProperty('animation','none','important');
      var ring=w.querySelector('.photo-ring');
      var inner=w.querySelector('.photo-inner');
      var img=w.querySelector('img');
      [ring,inner,img].forEach(function(el){
        if(el)el.style.setProperty('animation','none','important');
      });
      if(ring)ring.style.setProperty('transform','rotate(0deg)','important');
      if(inner)inner.style.setProperty('transform','rotate(0deg)','important');
      if(img)img.style.setProperty('transform','rotate(0deg) scale(1)','important');
    })();
  