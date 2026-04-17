import { useState, useEffect, useRef, useCallback } from "react";

/* ── Intersection Observer hook ── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
};

/* ── Translations ── */
const TX = {
  en: {
    nav: ["About","Skills","Services","Projects","Certificates","Contact"],
    navIds: ["about","skills","services","projects","certificates","contact"],
    badge: "Python Junior Backend Developer",
    heroDesc: "Building robust, scalable backend systems and clean APIs. Bridging the gap between ideas and production-ready architecture.",
    viewProjects: "View Projects",
    downloadCV: "Download CV",
    aboutLabel: "About Me",
    aboutTitle: "Who I Am",
    aboutP1: "I study Information Engineering (Network Engineering) and specialize in backend systems and scalable API development. Passionate about writing clean, maintainable code that scales.",
    aboutP2: "With hands-on experience in Python, Django, and modern backend tooling, I architect solutions that balance performance, reliability, and developer experience.",
    skillsLabel: "Technical Arsenal",
    skillsTitle: "Skills & Expertise",
    servLabel: "What I Offer",
    servTitle: "Services",
    projLabel: "Featured Work",
    projTitle: "Projects",
    certLabel: "Achievements",
    certTitle: "Certificates",
    expLabel: "Experience",
    expTitle: "Background",
    contactLabel: "Let's Connect",
    contactTitle: "Get In Touch",
    contactDesc: "Open to freelance projects, collaborations, and exciting opportunities.",
    s1t:"Backend Development", s1d:"Scalable REST APIs and microservices with Python & Django",
    s2t:"Database & Firebase", s2d:"PostgreSQL, SQL, Firebase — optimized schemas and real-time data",
    s3t:"Project Management", s3d:"End-to-end project coordination, Agile workflows, and team leadership",
    kafooStatus:"Coming Soon",
    kafooDesc:"A full marketplace backend system with API-based architecture, real-time inventory, secure authentication, and advanced product management.",
    viewDetails:"Explore Project",
    softSkills:["Communication","Teamwork & Collaboration","API Experience","MS Office Proficiency","Data Handling","Problem Solving"],
    expItems:[
      { year:"2024", title:"Backend Developer", sub:"Kafoo Market · Personal Project", desc:"Designed and developed a full marketplace API system using Django REST Framework, PostgreSQL, and Redis." },
      { year:"2023", title:"Information Engineering Student", sub:"University · Network Engineering", desc:"Studying core networking concepts alongside self-directed backend specialization." },
      { year:"2023", title:"API & Data Integration", sub:"Freelance & Personal Projects", desc:"Built REST API integrations, handled data pipelines, and worked with third-party services." },
    ],
    certs:[
      { img:"/certificates/cert-2.png" },
      { img:"/certificates/cert-1.jpg" },
      { img:"/certificates/cert-3.jpg" },
    ],
  },
  ar: {
    nav: ["عني","المهارات","الخدمات","المشاريع","الشهادات","تواصل"],
    navIds: ["about","skills","services","projects","certificates","contact"],
    badge: "مطور خلفية بايثون - مستوى مبتدئ",
    heroDesc: "أبني أنظمة خلفية قوية وقابلة للتوسع مع واجهات برمجية نظيفة. أحوّل الأفكار إلى بنية جاهزة للإنتاج.",
    viewProjects: "استعرض المشاريع",
    downloadCV: "تحميل السيرة الذاتية",
    aboutLabel: "عني",
    aboutTitle: "من أنا",
    aboutP1: "أدرس هندسة المعلومات (هندسة الشبكات) وأتخصص في أنظمة الخلفية وتطوير واجهات API قابلة للتوسع. شغوف بكتابة كود نظيف وقابل للصيانة.",
    aboutP2: "مع خبرة عملية في Python وDjango والأدوات الحديثة، أصمم حلولاً تجمع بين الأداء والموثوقية وتجربة المطور.",
    skillsLabel: "الترسانة التقنية",
    skillsTitle: "المهارات والخبرات",
    servLabel: "ما أقدمه",
    servTitle: "الخدمات",
    projLabel: "أبرز الأعمال",
    projTitle: "المشاريع",
    certLabel: "الإنجازات",
    certTitle: "الشهادات",
    expLabel: "الخبرة",
    expTitle: "الخلفية",
    contactLabel: "لنتواصل",
    contactTitle: "تواصل معي",
    contactDesc: "أرحب بمشاريع الفريلانس والتعاونات والفرص المثيرة.",
    s1t:"تطوير الخلفية", s1d:"واجهات REST قابلة للتوسع وخدمات مصغرة بـ Python & Django",
    s2t:"قواعد البيانات وFirebase", s2d:"PostgreSQL وSQL وFirebase — مخططات محسّنة وبيانات فورية",
    s3t:"إدارة المشاريع", s3d:"تنسيق المشاريع من البداية للنهاية وسير العمل Agile وقيادة الفريق",
    kafooStatus:"قريباً",
    kafooDesc:"نظام خلفية سوق إلكتروني متكامل بمعمارية قائمة على API، مخزون فوري، مصادقة آمنة، وإدارة منتجات متقدمة.",
    viewDetails:"استكشف المشروع",
    softSkills:["مهارات التواصل","العمل الجماعي","خبرة APIs","إتقان Office","معالجة البيانات","حل المشكلات"],
    expItems:[
      { year:"2024", title:"مطور خلفية", sub:"Kafoo Market · مشروع شخصي", desc:"صممت وطورت نظام API كامل للسوق الإلكتروني باستخدام Django REST Framework وPostgreSQL وRedis." },
      { year:"2023", title:"طالب هندسة معلومات", sub:"الجامعة · هندسة الشبكات", desc:"دراسة مفاهيم الشبكات الأساسية مع التخصص الذاتي في تطوير الخلفية." },
      { year:"2023", title:"تكامل API ومعالجة البيانات", sub:"مشاريع حرة وشخصية", desc:"بناء تكاملات REST API ومعالجة خطوط البيانات والعمل مع خدمات الطرف الثالث." },
    ],
   certs:[
      { img:"/certificates/cert-2.png" },
      { img:"/certificates/cert-1.jpg" },
      { img:"/certificates/cert-3.jpg" },
    ],
  }
};

const SKILLS_TECH = [
  { name:"Python", icon:"🐍", level:85, cat:"Language" },
  { name:"Django / DRF", icon:"🎯", level:80, cat:"Framework" },
  { name:"REST APIs", icon:"🔗", level:82, cat:"Architecture" },
  { name:"SQL / PostgreSQL", icon:"🗄️", level:75, cat:"Database" },
  { name:"Firebase", icon:"🔥", level:65, cat:"Database" },
  { name:"Git & GitHub", icon:"🌿", level:78, cat:"Tools" },
  { name:"Postman", icon:"📮", level:72, cat:"Tools" },
  { name:"Docker", icon:"🐳", level:60, cat:"DevOps" },
  { name:"C++", icon:"⚡", level:60, cat:"Language" },
  { name:"Networking", icon:"🌐", level:70, cat:"Infrastructure" },
  { name:"Clean Architecture", icon:"🏛️", level:72, cat:"Architecture" },
  { name:"MVC Pattern", icon:"🔄", level:75, cat:"Architecture" },
  { name:"Data Handling", icon:"📊", level:70, cat:"Skills" },
  { name:"MS Office", icon:"📋", level:80, cat:"Tools" },
];

export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState("All");
  const scrollY = useScrollY();
  const tx = TX[lang];
  const isRTL = lang === "ar";

  const [heroRef, heroIn] = useInView(0.05);
  const [aboutRef, aboutIn] = useInView(0.15);
  const [skillsRef, skillsIn] = useInView(0.1);
  const [servRef, servIn] = useInView(0.15);
  const [projRef, projIn] = useInView(0.15);
  const [certRef, certIn] = useInView(0.1);
  const [expRef, expIn] = useInView(0.15);
  const [contactRef, contactIn] = useInView(0.15);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  const skillCats = ["All", ...Array.from(new Set(SKILLS_TECH.map(s => s.cat)))];
  const filteredSkills = activeSkillCat === "All" ? SKILLS_TECH : SKILLS_TECH.filter(s => s.cat === activeSkillCat);

  /* Mouse parallax for galaxy orbs */
  const galaxyRef = useRef(null);
  const handleMouseMove = useCallback((e) => {
    if (!galaxyRef.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    galaxyRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ fontFamily: isRTL ? "'Noto Kufi Arabic',sans-serif" : "'DM Serif Display',serif" }}>
      <GlobalStyles />
      <CursorFollower />

      {/* ── NAV ── */}
      <nav className={`nav${scrollY > 60 ? " nav--scrolled" : ""}`}>
        <MRLogo />
        <ul className="nav__links">
          {tx.nav.map((item, i) => (
            <li key={i}><a className="nav__a" onClick={() => scrollTo(tx.navIds[i])} href={`#${tx.navIds[i]}`}>{item}</a></li>
          ))}
        </ul>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <button className="lang-btn" onClick={() => setLang(l => l==="en"?"ar":"en")}>
            {lang==="en"?"عربي":"EN"}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(true)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mob-menu">
          <button className="mob-close" onClick={() => setMenuOpen(false)}>✕</button>
          {tx.nav.map((item, i) => (
            <a key={i} className="mob-link" onClick={() => scrollTo(tx.navIds[i])} href={`#${tx.navIds[i]}`}>{item}</a>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="hero" id="hero" ref={heroRef}>
        {/* Galaxy background */}
        <div className="hero__bg">
          <div ref={galaxyRef} className="galaxy-orbs">
            <div className="orb orb--1"/>
            <div className="orb orb--2"/>
            <div className="orb orb--3"/>
            <div className="orb orb--4"/>
          </div>
          <div className="hero__grid"/>
          <div className="hero__noise"/>
          <Stars />
        </div>

        <div className={`hero__content${heroIn?" hero__content--in":""}`}>
          <div className="hero__badge">
            <span className="badge__pulse"/>
            <span>{tx.badge}</span>
          </div>

          {/* MR monogram large */}
          <div className="hero__monogram">MR</div>

          <h1 className="hero__name">
            <span className="hero__first">Majd Ahmad</span>
            <span className="hero__last">Alrslan</span>
          </h1>

          <div className="hero__rule"/>
          <p className="hero__desc">{tx.heroDesc}</p>

          <div className="hero__btns">
            <button className="btn btn--primary" onClick={() => scrollTo("projects")}>
              <span>▶</span> {tx.viewProjects}
            </button>
            <a className="btn btn--cv" href="/Majd_Alrslan_CV.pdf" download>
              <span>⬇</span> {tx.downloadCV}
            </a>
          </div>

          {/* Floating tech tags */}
          <div className="hero__tags">
            {["Python","FastApi","REST API","PostgreSQL","Docker"].map((t,i) => (
              <span key={t} className="hero__tag" style={{ animationDelay:`${i*0.15}s` }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-hint__line"/>
          <span className="scroll-hint__txt">scroll</span>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════ */}
      <section id="about" className="section section--about" ref={aboutRef}>
        <div className="inner">
          <SectionLabel num="01" txt={tx.aboutLabel} />
          <h2 className="section__title">{tx.aboutTitle}</h2>
          <div className={`about__grid${aboutIn?" in":""}`}>
            <div className="about__visual">
              <div className="about__ring-wrap">
                <div className="about__ring r1"/>
                <div className="about__ring r2"/>
                <div className="about__ring r3"/>
                <div className="about__core">
                  <span className="about__avatar">👨‍💻</span>
                  <span className="about__name-tag">Majd.dev</span>
                </div>
              </div>
              <div className="about__stats">
                {[
                  { v:"1+", l: isRTL?"سنة خبرة":"Year Exp." },
                  { v:"5+", l: isRTL?"مشروع":"Projects" },
                  { v:"14+", l: isRTL?"تقنية":"Tech Stack" },
                  { v:"∞", l: isRTL?"شغف":"Passion" },
                ].map((s,i)=>(
                  <div key={i} className="stat">
                    <div className="stat__num">{s.v}</div>
                    <div className="stat__lbl">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about__text">
              <p className="about__p">{tx.aboutP1}</p>
              <p className="about__p">{tx.aboutP2}</p>
              <div className="about__chips">
                {["Python","Django","REST API","PostgreSQL","Firebase","Docker","Git","Networking","C++"].map(c=>(
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
              <a className="btn btn--cv btn--sm" href="/Majd_Alrslan_CV.pdf" download style={{marginTop:28,display:"inline-flex"}}>
                <span>⬇</span> {tx.downloadCV}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════
          SKILLS
      ════════════════════════════════════════ */}
      <section id="skills" className="section section--dark" ref={skillsRef}>
        <div className="inner">
          <SectionLabel num="02" txt={tx.skillsLabel} />
          <h2 className="section__title">{tx.skillsTitle}</h2>

          {/* Filter tabs */}
          <div className="skill-cats">
            {skillCats.map(c => (
              <button key={c} className={`cat-btn${activeSkillCat===c?" cat-btn--active":""}`} onClick={() => setActiveSkillCat(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="skills__grid">
            {filteredSkills.map((sk, i) => (
              <div key={sk.name} className={`skill-card${skillsIn?" skill-card--in":""}`} style={{ transitionDelay:`${i*0.06}s` }}>
                <div className="skill-card__top">
                  <span className="skill-card__icon">{sk.icon}</span>
                  <div>
                    <div className="skill-card__name">{sk.name}</div>
                    <div className="skill-card__cat">{sk.cat}</div>
                  </div>
                  <div className="skill-card__pct">{sk.level}%</div>
                </div>
                <div className="skill-track">
                  <div className="skill-bar" style={{ width: skillsIn ? `${sk.level}%` : "0%", transitionDelay:`${i*0.08+0.3}s` }}/>
                </div>
              </div>
            ))}
          </div>

          {/* Soft skills */}
          <div className="soft-skills__wrap">
            <h3 className="soft-skills__title">{isRTL?"المهارات الشخصية":"Soft Skills"}</h3>
            <div className="soft-skills__grid">
              {tx.softSkills.map((s, i) => (
                <div key={i} className={`soft-card${skillsIn?" soft-card--in":""}`} style={{ transitionDelay:`${i*0.08+0.4}s` }}>
                  <span className="soft-card__icon">{["💬","🤝","🔗","💼","📊","🧠"][i]}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section id="services" className="section" ref={servRef}>
        <div className="inner">
          <SectionLabel num="03" txt={tx.servLabel} />
          <h2 className="section__title">{tx.servTitle}</h2>
          <div className="services__grid">
            {[
              { icon:"⚙️", t:tx.s1t, d:tx.s1d, tags:["Python","Django","REST","FastAPI"] },
              { icon:"🗄️", t:tx.s2t, d:tx.s2d, tags:["PostgreSQL","Firebase","Redis","SQL"] },
              { icon:"📋", t:tx.s3t, d:tx.s3d, tags:["Agile","Git","Jira","Teams"] },
            ].map((sv, i) => (
              <div
                key={i}
                className={`srv-card${servIn?" srv-card--in":""}`}
                style={{ transitionDelay:`${i*0.15}s` }}
                onMouseMove={e => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${((e.clientX-r.left)/r.width*100)}%`);
                  e.currentTarget.style.setProperty("--my", `${((e.clientY-r.top)/r.height*100)}%`);
                }}
              >
                <div className="srv-card__icon">{sv.icon}</div>
                <h3 className="srv-card__title">{sv.t}</h3>
                <p className="srv-card__desc">{sv.d}</p>
                <div className="srv-card__tags">
                  {sv.tags.map(t=><span key={t} className="srv-tag">{t}</span>)}
                </div>
                <div className="srv-card__glow"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════ */}
      <section id="projects" className="section section--dark" ref={projRef}>
        <div className="inner">
          <SectionLabel num="04" txt={tx.projLabel} />
          <h2 className="section__title">{tx.projTitle}</h2>

          <div className={`proj-card${projIn?" proj-card--in":""}`}>
            {/* Coming soon ribbon */}
            <div className="proj-ribbon">{tx.kafooStatus}</div>

            <div className="proj-card__preview">
              <div className="proj-preview__bg"/>
              <div className="proj-preview__window">
                <div className="window__bar">
                  <div className="w-dot" style={{background:"#ff5f57"}}/>
                  <div className="w-dot" style={{background:"#febc2e"}}/>
                  <div className="w-dot" style={{background:"#28c840"}}/>
                  <div className="w-url"/>
                </div>
                <div className="window__body">
                  <div className="w-header"/>
                  {[90,70,80,60,85].map((w,i)=>(
                    <div key={i} className="w-line" style={{width:`${w}%`, animationDelay:`${i*0.3}s`}}/>
                  ))}
                  <div className="w-cards">
                    {[1,2,3].map(i=><div key={i} className="w-card"/>)}
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="proj-float proj-float--tl">
                <span>🐍</span> Python
              </div>
              <div className="proj-float proj-float--br">
                <span>🔗</span> REST API
              </div>
            </div>

            <div className="proj-card__body">
              <div className="proj-eyebrow">Featured Project · Backend System</div>
              <h3 className="proj-title">Kafoo Market</h3>
              <div className="proj-status">
                <span className="status-dot"/>
                {tx.kafooStatus} — In Development
              </div>
              <p className="proj-desc">{tx.kafooDesc}</p>
              <div className="proj-stack">
                {["Django REST","PostgreSQL","Redis","Docker","JWT","Celery"].map(t=>(
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
              <div className="proj-features">
                {(isRTL?["نظام مصادقة JWT","مخزون فوري Redis","تكامل بوابات دفع","بحث وفلترة متقدم","نشر Docker"]:
                  ["JWT Auth System","Real-time Redis Cache","Payment Integration","Advanced Search & Filter","Docker Deployment"]).map((f,i)=>(
                  <div key={i} className="proj-feat"><span>▸</span>{f}</div>
                ))}
              </div>
              <button className="btn btn--primary" onClick={() => setModal(true)}>
                {tx.viewDetails} →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════
          CERTIFICATES
      ════════════════════════════════════════ */}
      <section id="certificates" className="section" ref={certRef}>
        <div className="inner">
          <SectionLabel num="05" txt={tx.certLabel} />
          <h2 className="section__title">{tx.certTitle}</h2>
          <div className="certs__grid">
            {tx.certs.map((c, i) => (
              <div key={i} className={`cert-card${certIn?" cert-card--in":""}`} style={{ transitionDelay:`${i*0.1}s` }}>
                <div className="cert-card__shine"/>
                <img src={c.img} alt={c.title} className="cert-card__img" />
                
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════
          EXPERIENCE / SOFT SKILLS
      ════════════════════════════════════════ */}
      <section id="experience" className="section section--dark" ref={expRef}>
        <div className="inner">
          <SectionLabel num="06" txt={tx.expLabel} />
          <h2 className="section__title">{tx.expTitle}</h2>
          <div className="exp__timeline">
            {tx.expItems.map((e, i) => (
              <div key={i} className={`tl-item${expIn?" tl-item--in":""}`} style={{ transitionDelay:`${i*0.2}s` }}>
                <div className="tl-year">{e.year}</div>
                <div className="tl-line">
                  <div className="tl-dot"/>
                  {i < tx.expItems.length-1 && <div className="tl-connector"/>}
                </div>
                <div className="tl-body">
                  <h4 className="tl-title">{e.title}</h4>
                  <div className="tl-sub">{e.sub}</div>
                  <p className="tl-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
      <section id="contact" className="section section--contact" ref={contactRef}>
        <div className="contact__glow"/>
        <div className="inner">
          <SectionLabel num="07" txt={tx.contactLabel} />
          <h2 className="section__title">{tx.contactTitle}</h2>
          <p className="contact__desc">{tx.contactDesc}</p>

          <div className={`contact__links${contactIn?" contact__links--in":""}`}>
            {[
              { icon:"📸", label:"Instagram", handle:"@majdalrslan6", href:"https://www.instagram.com/majdalrslan6?igsh=aDAxNzF5NGN0YXZw", color:"#E1306C" },
              { icon:"📘", label:"Facebook", handle:"Majd Alrslan", href:"https://www.facebook.com/share/1AK3ontAEw/", color:"#1877F2" },
              { icon:"✈️", label:"Telegram", handle:"@Majdalrslan", href:"https://t.me/Majdalrslan", color:"#229ED9" },
              { icon:"💬", label:"WhatsApp", handle:"+963 0937631797", href:"https://wa.me/9630937631797", color:"#25D366" },
            ].map((cl, i) => (
              <a
                key={i} href={cl.href} target="_blank" rel="noopener noreferrer"
                className="cl-card" style={{ "--accent": cl.color, transitionDelay:`${i*0.1}s` }}
              >
                <div className="cl-card__icon">{cl.icon}</div>
                <div className="cl-card__body">
                  <div className="cl-card__label">{cl.label}</div>
                  <div className="cl-card__handle">{cl.handle}</div>
                </div>
                <div className="cl-card__arrow">→</div>
                <div className="cl-card__bar"/>
              </a>
            ))}
          </div>

          {/* CV highlight */}
          <div className={`cv-block${contactIn?" cv-block--in":""}`}>
            <div className="cv-block__left">
              <div className="cv-block__icon">📄</div>
              <div>
                <div className="cv-block__title">{isRTL?"السيرة الذاتية":"Curriculum Vitae"}</div>
                <div className="cv-block__sub">{isRTL?"جاهزة للتنزيل — PDF":"Ready to download — PDF format"}</div>
              </div>
            </div>
            <a href="/Majd_Alrslan_CV.pdf" download className="btn btn--cv">
              <span>⬇</span> {tx.downloadCV}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <MRLogo small />
        <div className="footer__text">© 2024 Majd Ahmad Alrslan — All rights reserved</div>
        <div className="footer__links">
          {[
            { icon:"📸", href:"https://www.instagram.com/majdalrslan6?igsh=aDAxNzF5NGN0YXZw" },
            { icon:"📘", href:"https://www.facebook.com/share/1AK3ontAEw/" },
            { icon:"✈️", href:"https://t.me/Majdalrslan" },
            { icon:"💬", href:"https://wa.me/9630937631797" },
          ].map((l,i)=>(
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="footer__icon">{l.icon}</a>
          ))}
        </div>
      </footer>

      {/* ── PROJECT MODAL ── */}
      <div className={`modal-ov${modal?" modal-ov--open":""}`} onClick={e=>{ if(e.target.classList.contains("modal-ov")) setModal(false); }}>
        <div className="modal-box">
          <button className="modal-close" onClick={()=>setModal(false)}>✕</button>
          <div className="modal-eyebrow">Backend Architecture</div>
          <h3 className="modal-title">Kafoo Market</h3>
          <div className="modal-status"><span className="status-dot"/>Coming Soon — Active Development</div>
          <p className="modal-text">
            {isRTL
              ? "منصة تجارة إلكترونية متكاملة مبنية بمعمارية نظيفة. تتميز بنظام مصادقة متطور، إدارة مخزون فورية، ومحرك بحث متقدم."
              : "A full-featured e-commerce platform built on clean architecture principles. Features advanced auth, real-time inventory management, and a powerful search engine."}
          </p>
          <div className="modal-arch">
            {["API Layer","Auth & JWT","Business Logic","Data Access","PostgreSQL + Redis"].map((l,i)=>(
              <div key={i} className="arch-layer" style={{ opacity: 0.4 + i*0.14 }}>
                <span>{l}</span>
                <div className="arch-bar" style={{ width:`${100-i*12}%` }}/>
              </div>
            ))}
          </div>
          <ul className="modal-list">
            {(isRTL?["معمارية نظيفة وقابلة للتوسع","JWT + دور المستخدم","Redis للتخزين المؤقت","مدفوعات آمنة","CI/CD pipeline","توثيق Swagger"]:
              ["Clean, scalable architecture","JWT auth + role-based access","Redis caching layer","Secure payment processing","CI/CD pipeline","Full Swagger docs"]).map((f,i)=>(
              <li key={i}><span>▸</span> {f}</li>
            ))}
          </ul>
          <div className="modal-stack">
            {["Django REST","PostgreSQL","Redis","Docker","JWT","Celery","Swagger"].map(t=>(
              <span key={t} className="proj-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function MRLogo({ small }) {
  return (
    <div className={`mr-logo${small?" mr-logo--sm":""}`}>
      <div className="mr-logo__inner">
        <span className="mr-logo__m">M</span>
        <span className="mr-logo__r">R</span>
      </div>
      <div className="mr-logo__dot"/>
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: 0.5 + Math.random() * 1.5,
    d: 2 + Math.random() * 6,
    del: Math.random() * 8,
    moveX: (Math.random() - 0.5) * 40,
    moveY: (Math.random() - 0.5) * 40,
  }));

  return (
    <div className="stars">
      {stars.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.r,
            height: s.r,
            "--move-x": `${s.moveX}px`,
            "--move-y": `${s.moveY}px`,
            animationDuration: `${s.d}s, ${s.d * 6}s`,
            animationDelay: `${s.del}s, ${s.del}s`,
          }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ num, txt }) {
  return (
    <div className="sec-label">
      <span className="sec-label__num">{num}</span>
      <span className="sec-label__dash">—</span>
      <span className="sec-label__txt">{txt}</span>
    </div>
  );
}

function Separator() {
  return <div className="separator"/>;
}

function CursorFollower() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX+"px"; dot.current.style.top = e.clientY+"px"; }
      if (ring.current) setTimeout(() => { ring.current.style.left = e.clientX+"px"; ring.current.style.top = e.clientY+"px"; }, 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <>
    <div className="cur-dot" ref={dot}/>
    <div className="cur-ring" ref={ring}/>
  </>;
}

function GlobalStyles() {
  return <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=Noto+Kufi+Arabic:wght@300;400;600;700&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --g: #0a5c3a; --gb: #10b97a; --gg: #00ffa3;
      --gd: #064d2f; --g2: #00c87a;
      --gold: #c9a227; --goldb: #f0c040; --goldg: #ffe066; --goldd: #9a7a10;
      --dark: #020c07; --dark2: #061a0f; --dark3: #0d2818;
      --glass: rgba(10,92,58,0.11); --glass2: rgba(201,162,39,0.07);
      --border: rgba(16,185,122,0.18); --borderg: rgba(201,162,39,0.22);
      --txt: #e8f5ef; --txt2: rgba(232,245,239,0.55); --txt3: rgba(232,245,239,0.3);
      --r: 8px;
    }
    html{scroll-behavior:smooth}
    body{background:var(--dark);color:var(--txt);overflow-x:hidden;cursor:none}
    button{cursor:none}a{cursor:none}

    /* Scrollbar */
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:var(--dark)}
    ::-webkit-scrollbar-thumb{background:linear-gradient(var(--gb),var(--gold));border-radius:2px}

    /* Cursor */
    .cur-dot{width:7px;height:7px;background:var(--goldb);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);box-shadow:0 0 10px var(--goldg),0 0 20px rgba(240,192,64,0.4)}
    .cur-ring{width:28px;height:28px;border:1.5px solid rgba(201,162,39,0.45);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:all 0.12s ease}

    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:22px 52px;display:flex;align-items:center;justify-content:space-between;transition:all 0.4s ease}
    .nav--scrolled{background:rgba(2,12,7,0.93);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);padding:14px 52px}
    .nav__links{display:flex;gap:38px;list-style:none}
    .nav__a{font-family:'Syne',sans-serif;font-size:12px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--txt2);text-decoration:none;position:relative;transition:color 0.3s ease}
    .nav__a::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--gb),var(--goldb));transform:scaleX(0);transition:transform 0.3s ease}
    .nav__a:hover{color:var(--goldb)}
    .nav__a:hover::after{transform:scaleX(1)}
    .lang-btn{font-family:'Syne',sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;background:var(--glass2);border:1px solid var(--borderg);color:var(--goldb);padding:6px 14px;border-radius:20px;transition:all 0.3s ease}
    .lang-btn:hover{background:rgba(201,162,39,0.18);box-shadow:0 0 16px rgba(201,162,39,0.25)}
    .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none}
    .hamburger span{width:22px;height:2px;background:var(--goldb);display:block}
    .mob-menu{position:fixed;inset:0;background:rgba(2,12,7,0.97);backdrop-filter:blur(24px);z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px}
    .mob-close{position:absolute;top:24px;right:28px;background:none;border:none;color:var(--goldb);font-size:26px}
    .mob-link{font-family:'Syne',sans-serif;font-size:26px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--txt2);text-decoration:none;transition:color 0.3s}
    .mob-link:hover{color:var(--goldb)}

    /* MR LOGO */
    .mr-logo{display:flex;align-items:center;gap:5px;position:relative}
    .mr-logo__inner{display:flex;align-items:center;background:linear-gradient(135deg,var(--dark2),var(--gd));border:1px solid var(--borderg);border-radius:6px;padding:4px 10px;position:relative;overflow:hidden}
    .mr-logo__inner::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,162,39,0.08),transparent)}
    .mr-logo__m{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--goldb);line-height:1;letter-spacing:-1px}
    .mr-logo__r{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--gb);line-height:1;letter-spacing:-1px;margin-left:-1px}
    .mr-logo__dot{width:5px;height:5px;border-radius:50%;background:var(--goldb);box-shadow:0 0 8px var(--goldg);margin-bottom:12px}
    .mr-logo--sm .mr-logo__m,.mr-logo--sm .mr-logo__r{font-size:16px}

    /* HERO */
    .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:0 52px}
    .hero__bg{position:absolute;inset:0}
    .galaxy-orbs{position:absolute;inset:-20%;transition:transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)}
    .orb{position:absolute;border-radius:50%;filter:blur(80px);animation:orbPulse ease-in-out infinite}
    .orb--1{width:700px;height:700px;top:5%;left:-10%;background:radial-gradient(circle,rgba(0,200,122,0.22) 0%,rgba(10,92,58,0.1) 50%,transparent 70%);animation-duration:14s;animation-delay:0s}
    .orb--2{width:600px;height:600px;top:30%;right:-5%;background:radial-gradient(circle,rgba(201,162,39,0.18) 0%,rgba(154,122,16,0.06) 50%,transparent 70%);animation-duration:18s;animation-delay:3s}
    .orb--3{width:400px;height:400px;bottom:10%;left:30%;background:radial-gradient(circle,rgba(0,255,163,0.1) 0%,transparent 60%);animation-duration:22s;animation-delay:6s}
    .orb--4{width:350px;height:350px;top:60%;right:20%;background:radial-gradient(circle,rgba(240,192,64,0.1) 0%,transparent 60%);animation-duration:16s;animation-delay:9s}
    @keyframes orbPulse{0%,100%{transform:scale(1) rotate(0deg);opacity:0.7}33%{transform:scale(1.08) rotate(120deg);opacity:1}66%{transform:scale(0.95) rotate(240deg);opacity:0.8}}
    .hero__grid{position:absolute;inset:0;background-image:linear-gradient(rgba(16,185,122,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,122,0.04) 1px,transparent 1px);background-size:72px 72px}
    .hero__noise{position:absolute;inset:0;opacity:0.3;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")}

    /* Stars */
    .stars{position:absolute;inset:0;pointer-events:none}
   .star{
  position:absolute;
  background:#fff;
  border-radius:50%;
  animation:
    starTwinkle ease-in-out infinite alternate,
    starMove linear infinite;
}
    @keyframes starTwinkle{0%{opacity:0.1;transform:scale(0.8)}100%{opacity:0.9;transform:scale(1.2)}}
    @keyframes starMove{
  0%{
    transform: translate(0,0);
  }
  100%{
    transform: translate(var(--move-x), var(--move-y));
  }
}

    .hero__content{position:relative;z-index:2;text-align:center;max-width:960px;opacity:0;transform:translateY(40px);transition:all 1s ease}
    .hero__content--in{opacity:1;transform:translateY(0)}
    .hero__badge{display:inline-flex;align-items:center;gap:9px;background:var(--glass2);border:1px solid var(--borderg);padding:8px 20px;border-radius:28px;font-family:'Syne',sans-serif;font-size:11px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--goldb);margin-bottom:28px}
    .badge__pulse{width:7px;height:7px;border-radius:50%;background:var(--goldb);box-shadow:0 0 10px var(--goldg);animation:blink 2s ease infinite}
    @keyframes blink{0%,100%{opacity:1;box-shadow:0 0 10px var(--goldg)}50%{opacity:0.4;box-shadow:none}}
    .hero__monogram{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;letter-spacing:8px;color:var(--txt3);text-transform:uppercase;margin-bottom:8px;animation:fadeIn 1s 0.2s ease both}
    .hero__name{font-size:clamp(56px,9.5vw,120px);font-weight:400;letter-spacing:-3px;line-height:0.88;margin-bottom:24px;animation:fadeUp 1s 0.3s ease both}
    .hero__first{display:block;background:linear-gradient(135deg,#e8f5ef 0%,var(--gb) 50%,#c5f0de 100%);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 7s ease infinite}
    .hero__last{display:block;background:linear-gradient(135deg,var(--gold) 0%,var(--goldb) 60%,#fffde7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-style:italic}
    @keyframes shimmer{0%,100%{background-position:0%}50%{background-position:100%}}
    .hero__rule{width:140px;height:1px;margin:0 auto 22px;background:linear-gradient(90deg,transparent,var(--gb),var(--goldb),transparent);animation:fadeIn 1s 0.6s ease both}
    .hero__desc{font-size:clamp(15px,1.8vw,18px);color:var(--txt2);line-height:1.85;max-width:580px;margin:0 auto 40px;font-weight:300;animation:fadeUp 1s 0.7s ease both}
    .hero__btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;animation:fadeUp 1s 0.9s ease both;margin-bottom:32px}
    .hero__tags{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;animation:fadeUp 1s 1.1s ease both}
    .hero__tag{padding:6px 16px;background:rgba(10,92,58,0.2);border:1px solid var(--border);border-radius:20px;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1.5px;color:var(--gb);animation:floatTag 4s ease-in-out infinite alternate}
    .hero__tag:nth-child(2){animation-delay:0.4s}.hero__tag:nth-child(3){animation-delay:0.8s}.hero__tag:nth-child(4){animation-delay:1.2s}.hero__tag:nth-child(5){animation-delay:1.6s}
    @keyframes floatTag{0%{transform:translateY(0)}100%{transform:translateY(-6px)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}

    /* BUTTONS */
    .btn{display:inline-flex;align-items:center;gap:9px;font-family:'Syne',sans-serif;font-size:12px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;border:none;border-radius:4px;padding:14px 32px;transition:all 0.3s ease;text-decoration:none}
    .btn--primary{background:linear-gradient(135deg,var(--g),var(--gb));color:#fff;box-shadow:0 8px 30px rgba(10,92,58,0.45)}
    .btn--primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(0,255,163,0.28)}
    .btn--cv{background:linear-gradient(135deg,var(--goldd),var(--gold));color:#fff;box-shadow:0 8px 30px rgba(201,162,39,0.35)}
    .btn--cv:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(240,192,64,0.3)}
    .btn--sm{padding:10px 24px;font-size:11px}

    /* Scroll hint */
    .scroll-hint{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;animation:fadeIn 1.5s 1.5s ease both}
    .scroll-hint__line{width:1px;height:48px;background:linear-gradient(var(--gb),transparent);animation:scrollPulse 2s ease infinite}
    .scroll-hint__txt{font-family:'Syne',sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--txt3)}
    @keyframes scrollPulse{0%,100%{opacity:0.3}50%{opacity:1}}

    /* SEPARATOR */
    .separator{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--border),var(--borderg),var(--border),transparent)}

    /* SECTIONS */
    .section{padding:120px 52px;position:relative}
    .section--dark{background:linear-gradient(180deg,var(--dark2) 0%,rgba(6,26,15,0.5) 50%,var(--dark) 100%)}
    .section--about{background:linear-gradient(180deg,var(--dark) 0%,var(--dark2) 100%)}
    .section--contact{background:var(--dark2);position:relative;overflow:hidden}
    .inner{max-width:1200px;margin:0 auto}
    .sec-label{display:flex;align-items:center;gap:10px;margin-bottom:14px}
    .sec-label__num{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;color:var(--goldb);letter-spacing:3px}
    .sec-label__dash{color:var(--gb);font-size:14px}
    .sec-label__txt{font-family:'Syne',sans-serif;font-size:11px;font-weight:500;letter-spacing:4px;text-transform:uppercase;color:var(--txt3)}
    .section__title{font-size:clamp(36px,5vw,68px);font-weight:400;letter-spacing:-1.5px;line-height:1;background:linear-gradient(135deg,var(--txt),var(--gb));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:60px}

    /* ABOUT */
    .about__grid{display:grid;grid-template-columns:1fr 1.1fr;gap:80px;align-items:center;opacity:0;transform:translateY(30px);transition:all 0.9s ease}
    .about__grid.in{opacity:1;transform:translateY(0)}
    .about__ring-wrap{width:280px;height:280px;position:relative;margin:0 auto 32px}
    .about__ring{position:absolute;border-radius:50%;border:1px solid}
    .r1{inset:0;border-color:rgba(16,185,122,0.2);animation:spin 20s linear infinite}
    .r2{inset:20px;border-color:rgba(201,162,39,0.15);border-style:dashed;animation:spin 14s linear infinite reverse}
    .r3{inset:40px;border-color:rgba(16,185,122,0.12);animation:spin 30s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    .about__core{position:absolute;inset:55px;border-radius:50%;background:radial-gradient(circle,rgba(10,92,58,0.5) 0%,rgba(6,26,15,0.8) 100%);border:1px solid var(--border);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;box-shadow:0 0 60px rgba(10,92,58,0.25),inset 0 0 40px rgba(0,200,122,0.05)}
    .about__avatar{font-size:48px}
    .about__name-tag{font-family:'Syne',sans-serif;font-size:10px;letter-spacing:2px;color:var(--gb)}
    .about__stats{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .stat{background:var(--glass);border:1px solid var(--border);border-radius:var(--r);padding:18px;text-align:center;transition:all 0.3s ease}
    .stat:hover{border-color:var(--borderg);box-shadow:0 8px 24px rgba(201,162,39,0.1)}
    .stat__num{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;background:linear-gradient(135deg,var(--gb),var(--goldb));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .stat__lbl{font-size:11px;color:var(--txt3);margin-top:4px;font-family:'Syne',sans-serif;letter-spacing:1px}
    .about__p{font-size:16px;line-height:1.9;color:var(--txt2);margin-bottom:18px;font-weight:300}
    .about__chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px}
    .chip{padding:5px 14px;background:var(--glass);border:1px solid var(--border);border-radius:20px;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;color:var(--gb);transition:all 0.3s ease}
    .chip:hover{border-color:var(--goldb);color:var(--goldb)}

    /* SKILLS */
    .skill-cats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:36px}
    .cat-btn{font-family:'Syne',sans-serif;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;padding:7px 18px;background:var(--glass);border:1px solid var(--border);border-radius:20px;color:var(--txt3);transition:all 0.3s ease}
    .cat-btn--active,.cat-btn:hover{background:rgba(16,185,122,0.15);border-color:var(--gb);color:var(--gb)}
    .skills__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-bottom:60px}
    .skill-card{background:var(--glass);border:1px solid var(--border);border-radius:var(--r);padding:22px;position:relative;overflow:hidden;opacity:0;transform:translateY(20px);transition:opacity 0.5s ease,transform 0.5s ease,border-color 0.3s ease}
    .skill-card--in{opacity:1;transform:translateY(0)}
    .skill-card:hover{border-color:rgba(16,185,122,0.35)}
    .skill-card__top{display:flex;align-items:center;gap:12px;margin-bottom:14px}
    .skill-card__icon{font-size:22px}
    .skill-card__name{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:var(--txt)}
    .skill-card__cat{font-size:10px;letter-spacing:2px;color:var(--txt3);font-family:'Syne',sans-serif;text-transform:uppercase}
    .skill-card__pct{margin-left:auto;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--goldb)}
    .skill-track{height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden}
    .skill-bar{height:100%;background:linear-gradient(90deg,var(--gb),var(--goldb));border-radius:2px;width:0;transition:width 1.2s cubic-bezier(0.4,0,0.2,1);position:relative}
    .skill-bar::after{content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);width:5px;height:5px;border-radius:50%;background:var(--goldb);box-shadow:0 0 8px var(--goldg)}
    .soft-skills__title{font-family:'Syne',sans-serif;font-size:18px;font-weight:600;color:var(--txt2);margin-bottom:20px;letter-spacing:1px}
    .soft-skills__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
    .soft-card{display:flex;align-items:center;gap:12px;padding:16px 20px;background:linear-gradient(135deg,var(--glass),var(--glass2));border:1px solid var(--border);border-radius:var(--r);font-family:'Syne',sans-serif;font-size:13px;font-weight:500;color:var(--txt2);opacity:0;transform:translateY(16px);transition:opacity 0.5s ease,transform 0.5s ease,border-color 0.3s ease}
    .soft-card--in{opacity:1;transform:translateY(0)}
    .soft-card:hover{border-color:var(--borderg);color:var(--goldb)}
    .soft-card__icon{font-size:18px}

    /* SERVICES */
    .services__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
    .srv-card{background:linear-gradient(135deg,var(--glass),var(--glass2));border:1px solid var(--border);border-radius:12px;padding:38px;position:relative;overflow:hidden;opacity:0;transform:translateY(28px);transition:opacity 0.6s ease,transform 0.6s ease,border-color 0.3s ease,box-shadow 0.3s ease}
    .srv-card--in{opacity:1;transform:translateY(0)}
    .srv-card::before{content:'';position:absolute;inset:0;border-radius:12px;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(201,162,39,0.1) 0%,transparent 55%);opacity:0;transition:opacity 0.4s ease}
    .srv-card:hover{border-color:var(--borderg);box-shadow:0 20px 60px rgba(0,0,0,0.25),0 0 40px rgba(201,162,39,0.07);transform:translateY(-4px)}
    .srv-card:hover::before{opacity:1}
    .srv-card__icon{font-size:32px;margin-bottom:22px;display:block}
    .srv-card__title{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--txt);margin-bottom:12px;letter-spacing:0.5px}
    .srv-card__desc{font-size:14px;line-height:1.75;color:var(--txt2);margin-bottom:22px;font-weight:300}
    .srv-card__tags{display:flex;gap:8px;flex-wrap:wrap}
    .srv-tag{padding:4px 12px;background:rgba(10,92,58,0.25);border:1px solid var(--border);border-radius:12px;font-family:'Syne',sans-serif;font-size:10px;letter-spacing:1.5px;color:var(--gb)}
    .srv-card__glow{position:absolute;bottom:-40px;right:-40px;width:120px;height:120px;background:radial-gradient(circle,rgba(201,162,39,0.12),transparent);border-radius:50%;pointer-events:none}

    /* PROJECTS */
    .proj-card{background:var(--glass);border:1px solid var(--border);border-radius:16px;overflow:hidden;opacity:0;transform:scale(0.97);transition:all 0.8s ease;position:relative}
    .proj-card--in{opacity:1;transform:scale(1)}
    .proj-ribbon{position:absolute;top:24px;right:24px;z-index:10;padding:6px 16px;background:linear-gradient(135deg,var(--goldd),var(--gold));color:#fff;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-radius:20px;box-shadow:0 4px 16px rgba(201,162,39,0.35)}
    .proj-card__preview{height:340px;position:relative;overflow:hidden;background:linear-gradient(135deg,var(--dark2),var(--dark3))}
    .proj-preview__bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 70% at 30% 40%,rgba(10,92,58,0.5) 0%,transparent 60%),radial-gradient(ellipse 50% 50% at 70% 60%,rgba(201,162,39,0.15) 0%,transparent 50%)}
    .proj-preview__window{position:absolute;inset:28px;background:rgba(2,12,7,0.85);border-radius:10px;border:1px solid var(--border);overflow:hidden;transition:transform 0.4s ease}
    .proj-card:hover .proj-preview__window{transform:scale(1.02) translateY(-4px)}
    .window__bar{height:30px;background:rgba(255,255,255,0.04);display:flex;align-items:center;padding:0 14px;gap:6px;border-bottom:1px solid var(--border)}
    .w-dot{width:9px;height:9px;border-radius:50%}
    .w-url{flex:1;height:14px;border-radius:3px;background:rgba(255,255,255,0.05);margin-left:10px}
    .window__body{padding:18px;display:flex;flex-direction:column;gap:10px}
    .w-header{height:32px;border-radius:4px;background:linear-gradient(90deg,rgba(16,185,122,0.3),rgba(201,162,39,0.15));margin-bottom:6px}
    .w-line{height:7px;border-radius:2px;background:rgba(255,255,255,0.06);animation:lineLoad 2s ease-in-out infinite alternate}
    @keyframes lineLoad{0%{opacity:0.4}100%{opacity:1}}
    .w-cards{display:flex;gap:10px;margin-top:8px}
    .w-card{flex:1;height:48px;border-radius:6px;background:linear-gradient(135deg,rgba(10,92,58,0.3),rgba(201,162,39,0.1));border:1px solid var(--border)}
    .proj-float{position:absolute;z-index:5;background:rgba(2,12,7,0.85);border:1px solid var(--borderg);border-radius:8px;padding:7px 14px;display:flex;align-items:center;gap:7px;font-family:'Syne',sans-serif;font-size:11px;font-weight:600;letter-spacing:1px;color:var(--goldb);backdrop-filter:blur(8px)}
    .proj-float--tl{top:48px;left:48px}
    .proj-float--br{bottom:48px;right:48px}
    .proj-card__body{padding:44px}
    .proj-eyebrow{font-family:'Syne',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--goldb);margin-bottom:12px}
    .proj-title{font-size:clamp(28px,4vw,46px);font-weight:400;font-style:italic;background:linear-gradient(135deg,var(--txt),var(--gb));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px}
    .proj-status{display:flex;align-items:center;gap:8px;margin-bottom:18px;font-family:'Syne',sans-serif;font-size:12px;letter-spacing:2px;color:var(--goldb)}
    .status-dot{width:7px;height:7px;border-radius:50%;background:var(--goldb);box-shadow:0 0 10px var(--goldg);animation:blink 2s ease infinite}
    .proj-desc{font-size:15px;line-height:1.85;color:var(--txt2);margin-bottom:24px;font-weight:300}
    .proj-stack{display:flex;gap:9px;flex-wrap:wrap;margin-bottom:24px}
    .proj-tag{padding:5px 14px;background:rgba(10,92,58,0.25);border:1px solid var(--border);border-radius:20px;font-family:'Syne',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gb)}
    .proj-features{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:32px}
    .proj-feat{display:flex;align-items:center;gap:8px;font-family:'Syne',sans-serif;font-size:12px;color:var(--txt2);letter-spacing:0.5px}
    .proj-feat span{color:var(--gb)}

    /* CERTIFICATES */
    .cert-card__img{
  width:100%;
  height:180px;
  object-fit:cover;
  border-radius:8px;
  margin-bottom:16px;
  border:1px solid rgba(201,162,39,0.3);
  box-shadow:0 10px 30px rgba(0,0,0,0.3);
  transition:transform 0.4s ease, box-shadow 0.4s ease;
}

.cert-card:hover .cert-card__img{
  transform:scale(1.05);
  box-shadow:0 20px 50px rgba(201,162,39,0.2);
}
    .certs__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
    .cert-card{background:linear-gradient(135deg,var(--glass),rgba(201,162,39,0.05));border:1px solid var(--borderg);border-radius:12px;padding:32px;position:relative;overflow:hidden;opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease,box-shadow 0.3s ease;cursor:none}
    .cert-card--in{opacity:1;transform:translateY(0)}
    .cert-card:hover{box-shadow:0 16px 48px rgba(201,162,39,0.12),0 0 0 1px rgba(201,162,39,0.3)}
    .cert-card__shine{position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(201,162,39,0.06),transparent);transform:skewX(-20deg);transition:left 0.6s ease;pointer-events:none}
    .cert-card:hover .cert-card__shine{left:150%}
    .cert-card__icon{font-size:36px;display:block;margin-bottom:16px}
    .cert-card__year{font-family:'Syne',sans-serif;font-size:10px;letter-spacing:3px;color:var(--goldb);margin-bottom:8px;text-transform:uppercase}
    .cert-card__title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--txt);margin-bottom:8px;line-height:1.3}
    .cert-card__issuer{font-size:13px;color:var(--txt2);margin-bottom:20px;font-weight:300}
    .cert-card__badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;background:rgba(10,92,58,0.25);border:1px solid var(--border);border-radius:20px;font-family:'Syne',sans-serif;font-size:10px;letter-spacing:2px;color:var(--gb)}

    /* EXPERIENCE */
    .exp__timeline{display:flex;flex-direction:column;gap:0}
    .tl-item{display:grid;grid-template-columns:80px 36px 1fr;gap:0 24px;opacity:0;transform:translateX(-24px);transition:all 0.7s ease}
    .tl-item--in{opacity:1;transform:translateX(0)}
    .tl-year{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--goldb);padding-top:3px;text-align:right}
    .tl-line{display:flex;flex-direction:column;align-items:center}
    .tl-dot{width:12px;height:12px;border-radius:50%;background:var(--gb);border:2px solid var(--dark);box-shadow:0 0 12px var(--gb),0 0 24px rgba(0,255,163,0.3);flex-shrink:0;margin-top:2px}
    .tl-connector{flex:1;width:1px;background:linear-gradient(var(--border),transparent);margin:8px 0}
    .tl-body{padding-bottom:44px}
    .tl-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:var(--txt);margin-bottom:5px}
    .tl-sub{font-family:'Syne',sans-serif;font-size:11px;letter-spacing:2px;color:var(--goldb);margin-bottom:10px;text-transform:uppercase}
    .tl-desc{font-size:14px;line-height:1.75;color:var(--txt2);font-weight:300}

    /* CONTACT */
    .contact__glow{position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:800px;height:400px;background:radial-gradient(ellipse,rgba(10,92,58,0.12) 0%,transparent 70%);pointer-events:none}
    .contact__desc{font-size:17px;color:var(--txt2);margin-bottom:48px;font-weight:300;line-height:1.8;max-width:500px}
    .contact__links{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:48px;opacity:0;transform:translateY(24px);transition:all 0.8s ease}
    .contact__links--in{opacity:1;transform:translateY(0)}
    .cl-card{display:flex;align-items:center;gap:18px;padding:20px 24px;background:var(--glass);border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--txt);position:relative;overflow:hidden;transition:all 0.3s ease}
    .cl-card::before{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:var(--accent, var(--gb));transform:scaleX(0);transition:transform 0.3s ease;transform-origin:left}
    .cl-card:hover{border-color:var(--accent,var(--gb));transform:translateX(4px);box-shadow:0 8px 32px rgba(0,0,0,0.2)}
    .cl-card:hover::before{transform:scaleX(1)}
    .cl-card__icon{font-size:24px;width:48px;height:48px;background:rgba(255,255,255,0.04);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .cl-card__label{font-family:'Syne',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--txt3);margin-bottom:4px}
    .cl-card__handle{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:var(--txt)}
    .cl-card__arrow{margin-left:auto;color:var(--txt3);font-size:18px;transition:transform 0.3s ease}
    .cl-card:hover .cl-card__arrow{transform:translateX(4px);color:var(--accent,var(--gb))}
    .cl-card__bar{position:absolute;bottom:0;left:0;right:0;height:1px}
    .cv-block{display:flex;align-items:center;justify-content:space-between;padding:28px 32px;background:linear-gradient(135deg,rgba(201,162,39,0.07),var(--glass2));border:1px solid var(--borderg);border-radius:12px;opacity:0;transform:translateY(20px);transition:all 0.8s 0.3s ease;flex-wrap:wrap;gap:20px}
    .cv-block--in{opacity:1;transform:translateY(0)}
    .cv-block__left{display:flex;align-items:center;gap:18px}
    .cv-block__icon{font-size:36px}
    .cv-block__title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--txt);margin-bottom:4px}
    .cv-block__sub{font-size:13px;color:var(--txt3)}

    /* MODAL */
    .modal-ov{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,0.88);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;padding:24px;opacity:0;pointer-events:none;transition:opacity 0.3s ease}
    .modal-ov--open{opacity:1;pointer-events:all}
    .modal-box{background:var(--dark2);border:1px solid var(--borderg);border-radius:16px;padding:48px;max-width:660px;width:100%;position:relative;max-height:85vh;overflow-y:auto;transform:scale(0.9);transition:transform 0.3s ease}
    .modal-ov--open .modal-box{transform:scale(1)}
    .modal-close{position:absolute;top:20px;right:20px;width:36px;height:36px;border-radius:50%;background:var(--glass);border:1px solid var(--border);color:var(--txt2);font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease}
    .modal-close:hover{border-color:var(--gold);color:var(--goldb)}
    .modal-eyebrow{font-family:'Syne',sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--goldb);margin-bottom:10px}
    .modal-title{font-size:36px;font-weight:400;font-style:italic;background:linear-gradient(135deg,var(--txt),var(--gb));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px}
    .modal-status{display:flex;align-items:center;gap:8px;margin-bottom:20px;font-family:'Syne',sans-serif;font-size:12px;letter-spacing:2px;color:var(--goldb)}
    .modal-text{font-size:14px;line-height:1.85;color:var(--txt2);margin-bottom:28px}
    .modal-arch{display:flex;flex-direction:column;gap:8px;margin-bottom:28px;padding:20px;background:rgba(0,0,0,0.2);border-radius:8px;border:1px solid var(--border)}
    .arch-layer{display:flex;align-items:center;gap:16px;font-family:'Syne',sans-serif;font-size:12px;letter-spacing:1px;color:var(--gb)}
    .arch-bar{height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gb),var(--goldb));flex-shrink:0}
    .modal-list{list-style:none;margin-bottom:28px}
    .modal-list li{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);font-size:14px;color:var(--txt2)}
    .modal-list li span{color:var(--gb)}
    .modal-stack{display:flex;gap:8px;flex-wrap:wrap}

    /* FOOTER */
    .footer{padding:36px 52px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;background:var(--dark)}
    .footer__text{font-family:'Syne',sans-serif;font-size:12px;letter-spacing:1px;color:var(--txt3)}
    .footer__links{display:flex;gap:12px}
    .footer__icon{width:36px;height:36px;background:var(--glass);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--txt2);text-decoration:none;transition:all 0.3s ease}
    .footer__icon:hover{border-color:var(--gold);transform:translateY(-2px)}

    /* RESPONSIVE */
    @media(max-width:900px){
      .about__grid{grid-template-columns:1fr}.about__visual{display:none}
      .services__grid{grid-template-columns:1fr}
      .proj-features{grid-template-columns:1fr}
      .contact__links{grid-template-columns:1fr}
    }
    @media(max-width:768px){
      .nav__links{display:none}.hamburger{display:flex}
      .section{padding:80px 24px}.hero{padding:0 24px}
      .nav{padding:16px 24px}.nav--scrolled{padding:12px 24px}
      .footer{padding:28px 24px}
    }
  `}</style>
}