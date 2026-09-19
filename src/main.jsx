import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Mail,
  MapPin,
  Play,
  X,
} from "lucide-react";
import "./styles.css";

const AIGC_PROJECTS = [
  {
    id: "biezou",
    title: "《别走太快》",
    eyebrow: "AIGC 动画短片",
    description: "围绕儿童成长与陪伴展开的原创动画短片，从创意到成片完成完整生成与制作流程。",
    role: "导演 · 制作",
    result: "中国好创意浙江赛区二等奖",
    cover: { type: "image", src: "assets/posters/biezou-wide.png" },
    video: "media/biezou.mp4",
  },
  {
    id: "tianshi",
    title: "《天师传人》",
    eyebrow: "AIGC 短剧",
    description: "以东方幻想为题材的AIGC短剧代表作，由三人团队共同完成，计划于B站与红果双平台上线。",
    role: "制作",
    result: "B站 · 红果待上线",
    cover: { type: "sprite", src: "assets/stills/tianshi.jpg", col: 0, row: 2 },
    video: "media/tianshi.mp4",
  },
  {
    id: "beyond",
    title: "《超越生存》",
    eyebrow: "AI 概念短片",
    description: "2025年完成的三体主题AI短片，在Seedance发布前探索长叙事中的世界观、镜头与视觉一致性。",
    role: "AIGC 制作",
    result: "个人创作",
    cover: { type: "image", src: "assets/posters/beyond-survival.jpg" },
    video: "media/beyond-survival.mp4",
  },
  {
    id: "exile",
    title: "《流亡编码》",
    eyebrow: "AI 科幻短片",
    description: "个人首部AI短片，以赛博朋克世界中的身份与逃亡为核心，独立完成从构思到输出的全部环节。",
    role: "单人全流程",
    result: "AI 处女作",
    cover: { type: "sprite", src: "assets/stills/exile.jpg", col: 1, row: 1 },
    video: "media/exile-code.mp4",
  },
];

const PRODUCTION_PROJECTS = [
  {
    id: "ningchao",
    title: "宁巢公寓",
    eyebrow: "企业宣传片",
    description: "为宁巢公寓制作的品牌宣传视频，围绕空间、居住感受与品牌信息组织节奏。",
    role: "制作 · 剪辑",
    result: "商业项目",
    cover: { type: "sprite", src: "assets/stills/ningchao.jpg", col: 1, row: 1 },
    video: "media/ningchao.mp4",
  },
  {
    id: "anmuxi",
    title: "安慕希 TVC",
    eyebrow: "品牌赛事作品",
    description: "为安慕希品牌赛事创作的TVC参赛作品，以产品氛围和短时叙事为核心完成全流程制作。",
    role: "全流程制作",
    result: "品牌赛事参赛作品",
    cover: { type: "sprite", src: "assets/stills/anmuxi.jpg", col: 2, row: 1 },
    video: "media/anmuxi.mp4",
  },
  {
    id: "future",
    title: "《碰到未来》",
    eyebrow: "多媒体影像",
    description: "以人与未来技术的相遇为线索完成剧本与影像表达，并负责现场拍摄和后期制作。",
    role: "脚本 · 拍摄 · 后期",
    result: "浙江省大学生多媒体作品设计竞赛二等奖",
    cover: { type: "sprite", src: "assets/stills/future.jpg", col: 2, row: 1 },
    video: "media/future.mp4",
  },
  {
    id: "haining",
    title: "《海宁皮影》",
    eyebrow: "文化遗产影像",
    description: "以海宁皮影为主题的多媒体作品，通过现场影像和海报视觉呈现传统技艺的造型与表演语言。",
    role: "拍摄 · 海报设计",
    result: "中国好创意全国总决赛二等奖",
    cover: { type: "image", src: "assets/posters/haining-shadow.jpg" },
    video: "media/haining-shadow.mp4",
  },
];

const POSTERS = [
  { title: "《别走太快》竖版海报", src: "assets/posters/biezou-vertical.png", tall: true },
  { title: "《别走太快》横版海报", src: "assets/posters/biezou-wide.png" },
  { title: "《超越生存》海报", src: "assets/posters/beyond-survival.jpg", tall: true },
  { title: "《长治久安》黄米篇", src: "assets/posters/changzhi-millet.jpg" },
  { title: "《长治久安》青砖篇", src: "assets/posters/changzhi-brick.jpg" },
  { title: "《海宁皮影》海报", src: "assets/posters/haining-shadow.jpg", tall: true },
];

const VERIFIED_AWARDS = [
  {
    title: "中国好创意全国总决赛二等奖",
    work: "《海宁皮影》· 文化遗产类",
    date: "2026",
    certificate: "assets/certificates/haining.jpg",
  },
  {
    title: "中国好创意浙江赛区二等奖",
    work: "《别走太快》· 动画短片类",
    date: "2026",
    certificate: "assets/certificates/biezou.png",
  },
  {
    title: "浙江省大学生多媒体作品设计竞赛二等奖",
    work: "《碰到未来》",
    date: "2025",
    certificate: "assets/certificates/future.jpg",
  },
  {
    title: "浙江省大学生多媒体作品设计竞赛二等奖",
    work: "《缺失的烟火》",
    date: "2025",
    certificate: "assets/certificates/fireworks.jpg",
  },
];

const OTHER_AWARDS = [
  "旺仔首届AI创作大赛 · 佳作奖",
  "“浙江有礼·礼润秀洲”广告征集 · 优秀作品",
  "嘉兴大学第七届大学生乡村振兴创意大赛 · 三等奖《扣善居》",
];

const SKILLS = [
  {
    title: "AIGC 创作",
    body: "独立完成创意、脚本拆解、分镜、图像与视频生成及素材迭代。",
    tools: "ChatGPT · Seedance · 即梦 · 可灵 · Midjourney",
  },
  {
    title: "后期制作",
    body: "熟练完成剪辑、调色、声音处理和成片输出。",
    tools: "DaVinci Resolve · 剪映 · Photoshop",
  },
  {
    title: "拍摄执行",
    body: "具备现场拍摄、导演和素材管理能力，可直接衔接后期。",
    tools: "拍摄 · 导演 · 素材管理",
  },
  {
    title: "AI 辅助开发",
    body: "使用AI完成网页、工具和创意项目原型，建立可运行的展示体验。",
    tools: "Codex · Vibe Coding",
  },
];

function OceanBackdrop({ src, tone = "mid" }) {
  return (
    <div className={`ocean-backdrop ocean-backdrop--${tone}`} aria-hidden="true">
      <img src={src} alt="" />
      <div className="ocean-shade" />
      <div className="surface-light">
        <i />
        <i />
        <i />
      </div>
      <div className="water-particles">
        {Array.from({ length: 14 }, (_, index) => (
          <i
            key={index}
            style={{
              left: `${(index * 17 + 9) % 100}%`,
              top: `${(index * 29 + 7) % 100}%`,
              animationDuration: `${9 + index * 0.4}s`,
              animationDelay: `${index * -0.8}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SpriteCrop({ src, col = 0, row = 0, alt = "" }) {
  return (
    <span className="sprite-crop" role="img" aria-label={alt}>
      <img
        src={src}
        alt=""
        style={{ transform: `translate(${-col * 25}%, ${-row * (100 / 3)}%)` }}
      />
    </span>
  );
}

function Cover({ cover, title }) {
  if (cover.type === "sprite") {
    return <SpriteCrop src={cover.src} col={cover.col} row={cover.row} alt={`${title}画面`} />;
  }
  return <img className="cover-image" src={cover.src} alt={`${title}封面`} />;
}

function JellyfishCursor() {
  const jellyRef = useRef(null);
  const dotRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const precisePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!precisePointer.matches || reducedMotion.matches) return undefined;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    let targetX = -120;
    let targetY = -120;
    let currentX = -120;
    let currentY = -120;
    let velocityX = 0;
    let velocityY = 0;
    let lastTrailX = -120;
    let lastTrailY = -120;
    let lastTime = performance.now();
    let dpr = 1;
    const particles = [];
    let frame;

    document.documentElement.classList.add("has-jelly-cursor");

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const emitTrail = (x, y, strength = 1) => {
      particles.push({ type: "ripple", x, y, age: 0, life: 0.9, size: 8 + strength * 2 });
      particles.push({ type: "bloom", x, y, age: 0, life: 0.55, size: 26 + strength * 8 });
      const bubbleCount = strength > 1.5 ? 3 : 2;
      for (let index = 0; index < bubbleCount; index += 1) {
        particles.push({
          type: "bubble",
          x: x + (Math.random() - 0.5) * 26,
          y: y + (Math.random() - 0.5) * 18,
          vx: (Math.random() - 0.5) * 15,
          vy: -18 - Math.random() * 24,
          age: 0,
          life: 0.9 + Math.random() * 0.7,
          size: 1.5 + Math.random() * 3.2,
        });
      }
      if (particles.length > 120) particles.splice(0, particles.length - 120);
    };

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dotRef.current?.classList.add("is-visible");
      jellyRef.current?.classList.add("is-visible");
      canvas.classList.add("is-visible");
      glowRef.current?.classList.add("is-visible");
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      const travelled = Math.hypot(targetX - lastTrailX, targetY - lastTrailY);
      if (travelled > 44) {
        emitTrail(targetX, targetY, Math.min(2.4, travelled / 45));
        lastTrailX = targetX;
        lastTrailY = targetY;
      }
    };
    const hide = () => {
      dotRef.current?.classList.remove("is-visible");
      jellyRef.current?.classList.remove("is-visible");
      canvas.classList.remove("is-visible");
      glowRef.current?.classList.remove("is-visible");
    };

    const drawParticles = (delta) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.save();
      context.globalCompositeOperation = "screen";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.age += delta;
        const progress = particle.age / particle.life;
        if (progress >= 1) {
          particles.splice(index, 1);
          continue;
        }

        if (particle.type === "ripple") {
          const radius = particle.size + progress * 54;
          context.beginPath();
          context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
          context.strokeStyle = `rgba(137, 232, 245, ${(1 - progress) * 0.34})`;
          context.lineWidth = 1.15;
          context.stroke();
        } else if (particle.type === "bloom") {
          const radius = particle.size * (0.75 + progress * 1.5);
          const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius);
          gradient.addColorStop(0, `rgba(255, 116, 157, ${(1 - progress) * 0.13})`);
          gradient.addColorStop(0.42, `rgba(92, 222, 235, ${(1 - progress) * 0.09})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          context.fillStyle = gradient;
          context.fillRect(particle.x - radius, particle.y - radius, radius * 2, radius * 2);
        } else {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.strokeStyle = `rgba(211, 249, 255, ${(1 - progress) * 0.62})`;
          context.lineWidth = 0.9;
          context.stroke();
        }
      }
      context.restore();
    };

    const animate = (time) => {
      const delta = Math.min(0.034, (time - lastTime) / 1000);
      const frameScale = delta * 60;
      lastTime = time;

      velocityX = (velocityX + (targetX - currentX) * 0.042 * frameScale) * Math.pow(0.79, frameScale);
      velocityY = (velocityY + (targetY - currentY) * 0.042 * frameScale) * Math.pow(0.79, frameScale);
      currentX += velocityX * frameScale;
      currentY += velocityY * frameScale;

      const speed = Math.hypot(velocityX, velocityY);
      const bob = Math.sin(time * 0.0032) * 4.5;
      const tilt = Math.max(-14, Math.min(14, velocityX * 1.3));
      const stretch = Math.min(0.07, speed * 0.006);
      if (jellyRef.current) {
        jellyRef.current.style.transform = `translate3d(${currentX - 40}px, ${currentY - 30 + bob}px, 0) rotate(${tilt}deg) scale(${1 - stretch * 0.35}, ${1 + stretch})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 150}px, ${currentY - 150}px, 0)`;
        glowRef.current.style.setProperty("--reaction-strength", `${Math.min(1, 0.35 + speed * 0.045)}`);
      }
      drawParticles(delta);
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    document.documentElement.addEventListener("mouseleave", hide);
    frame = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("has-jelly-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", hide);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-water-fx" aria-hidden="true" />
      <span ref={glowRef} className="cursor-waterlight" aria-hidden="true" />
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <span ref={jellyRef} className="cursor-jelly" aria-hidden="true">
        <img src="assets/jellyfish.png" alt="" />
      </span>
    </>
  );
}

function Navigation() {
  return (
    <header className="site-nav">
      <a className="nav-mark" href="#top" aria-label="返回顶部">FELAX</a>
      <nav aria-label="主要导航">
        <a href="#about">关于</a>
        <a href="#works">作品</a>
        <a href="#awards">荣誉</a>
        <a href="#contact">联系</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero screen-section" id="top">
      <OceanBackdrop src="assets/ocean-shallow.png" tone="shallow" />
      <div className="hero-content">
        <p className="hero-cn">冯宇凡</p>
        <h1>FELAX</h1>
        <p className="hero-year">PORTFOLIO / 2026</p>
      </div>
      <a className="dive-link" href="#about">
        <span>继续下潜</span>
        <ArrowDown size={18} strokeWidth={1.5} />
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="about screen-section" id="about">
      <OceanBackdrop src="assets/ocean-mid.png" tone="mid" />
      <div className="section-shell about-layout">
        <div className="about-photo-wrap">
          <img className="about-photo" src="assets/portrait.jpg" alt="冯宇凡个人照片" />
          <span className="photo-caption">FENG YUFAN / FELAX</span>
        </div>
        <div className="about-copy">
          <div className="section-kicker">关于我</div>
          <p className="about-lead">
            嘉兴大学数字媒体艺术专业2027届本科生。以AIGC影像制作为核心，也承担拍摄、导演、后期与视觉设计，关注创意如何从脚本落到完整成片。
          </p>
          <div className="skill-list">
            {SKILLS.map((skill) => (
              <article className="skill-row" key={skill.title}>
                <h3>{skill.title}</h3>
                <div>
                  <p>{skill.body}</p>
                  <span>{skill.tools}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function useFlow(sectionRef, count) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const update = () => {
      frame = undefined;
      const section = sectionRef.current;
      if (!section || window.innerWidth <= 760) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      setValue(progress * (count - 1));
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count, sectionRef]);

  return value;
}

function FlowGallery({ id, projects, background, kicker, title, description, onOpen }) {
  const sectionRef = useRef(null);
  const flow = useFlow(sectionRef, projects.length);
  const activeIndex = Math.max(0, Math.min(projects.length - 1, Math.round(flow)));
  const active = projects[activeIndex];

  return (
    <section className="flow-section" id={id} ref={sectionRef} style={{ "--flow-count": projects.length }}>
      <div className="flow-sticky">
        <OceanBackdrop src={background} tone="deep" />
        <header className="flow-heading">
          <span>{kicker}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </header>
        <div className="flow-copy" aria-live="polite">
          <h2>{active.title}</h2>
          <dl>
            <div><dt>分工</dt><dd>{active.role}</dd></div>
            <div><dt>成果</dt><dd>{active.result}</dd></div>
          </dl>
        </div>
        <div className="flow-cards">
          {projects.map((project, index) => {
            const delta = index - flow;
            const distance = Math.abs(delta);
            const x = 66 + Math.sin(delta * 0.9) * 16;
            const y = 49 + delta * 34;
            const scale = Math.max(0.66, 1 - distance * 0.13);
            const opacity = Math.max(0, 1 - distance * 0.34);
            const blur = Math.min(5, distance * 1.35);
            return (
              <button
                className={`flow-card ${index === activeIndex ? "is-active" : ""}`}
                key={project.id}
                type="button"
                onClick={() => onOpen(project)}
                aria-label={`打开${project.title}`}
                style={{
                  "--card-x": `${x}%`,
                  "--card-y": `${y}%`,
                  "--card-scale": scale,
                  "--card-opacity": opacity,
                  "--card-blur": `${blur}px`,
                  "--card-z": projects.length - Math.round(distance),
                }}
              >
                <Cover cover={project.cover} title={project.title} />
                <span className="play-mark" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
                <span className="mobile-card-copy"><strong>{project.title}</strong><small>{project.role}</small></span>
              </button>
            );
          })}
        </div>
        <div className="flow-line" aria-hidden="true" />
      </div>
    </section>
  );
}

function Posters({ onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePoster = POSTERS[activeIndex];
  const changePoster = (step) => {
    setActiveIndex((current) => (current + step + POSTERS.length) % POSTERS.length);
  };

  return (
    <section className="poster-section screen-section" id="posters">
      <OceanBackdrop src="assets/ocean-deep.png" tone="abyss" />
      <div className="poster-layout">
        <header className="poster-heading">
          <p>平面视觉</p>
          <h2>海报作品</h2>
          <span>均由 Photoshop 完成</span>
        </header>
        <div className="poster-showcase">
          <button
            className={`poster-main ${activePoster.tall ? "is-tall" : ""}`}
            type="button"
            onClick={() => onOpen({ title: activePoster.title, image: activePoster.src })}
            aria-label={`放大${activePoster.title}`}
          >
            <img src={activePoster.src} alt={activePoster.title} />
          </button>
          <div className="poster-meta" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(POSTERS.length).padStart(2, "0")}</span>
            <h3>{activePoster.title}</h3>
            <div className="poster-controls">
              <button type="button" onClick={() => changePoster(-1)} aria-label="上一张海报"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => changePoster(1)} aria-label="下一张海报"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
        <div className="poster-thumbs" aria-label="选择海报">
          {POSTERS.map((poster, index) => (
            <button
              className={index === activeIndex ? "is-active" : ""}
              type="button"
              key={poster.src}
              onClick={() => setActiveIndex(index)}
              aria-label={`显示${poster.title}`}
              aria-pressed={index === activeIndex}
            >
              <img src={poster.src} alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Awards({ onOpen }) {
  return (
    <section className="awards screen-section" id="awards">
      <OceanBackdrop src="assets/ocean-deep.png" tone="abyss" />
      <div className="section-shell awards-layout">
        <div className="awards-primary">
          <div className="section-kicker">荣誉与成果</div>
          <h2>可核验获奖记录</h2>
          <div className="award-list">
            {VERIFIED_AWARDS.map((item) => (
              <button
                className="award-row"
                type="button"
                key={`${item.title}-${item.work}`}
                onClick={() => onOpen({ title: item.title, image: item.certificate })}
              >
                <Award size={21} strokeWidth={1.5} aria-hidden="true" />
                <span><strong>{item.title}</strong><small>{item.work}</small></span>
                <time>{item.date}</time>
              </button>
            ))}
          </div>
        </div>
        <aside className="other-awards">
          <p>其他荣誉</p>
          {OTHER_AWARDS.map((item) => <div key={item}>{item}</div>)}
        </aside>
      </div>
    </section>
  );
}

function CopyLine({ icon: Icon, label, value, copyValue = value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(copyValue);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button className="contact-line" type="button" onClick={copy}>
      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      <span><small>{label}</small><strong>{value}</strong></span>
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
}

function Contact() {
  return (
    <section className="contact screen-section" id="contact">
      <OceanBackdrop src="assets/ocean-deep.png" tone="abyss" />
      <div className="section-shell contact-layout">
        <div className="contact-copy">
          <div className="section-kicker">保持联系</div>
          <h2>让下一次创作<br />从这里开始</h2>
          <p>求职、项目合作与创作交流均可联系。</p>
          <div className="contact-list">
            <CopyLine icon={Mail} label="邮箱" value="3095086690@qq.com" />
            <div className="contact-line is-static">
              <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
              <span><small>所在地</small><strong>浙江 · 嘉兴</strong></span>
            </div>
          </div>
        </div>
        <div className="bilibili-block">
          <img src="assets/bilibili-qr.png" alt="虾做作AIGC的哔哩哔哩主页二维码" />
          <div><small>BILIBILI</small><strong>虾做作AIGC</strong><span>扫码查看持续更新的影像作品</span></div>
        </div>
      </div>
      <a className="back-top" href="#top" aria-label="返回顶部">
        <ChevronUp size={18} /><span>返回水面</span>
      </a>
      <footer>© 2026 FELAX / 冯宇凡</footer>
    </section>
  );
}

function Modal({ content, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!content) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [content, onClose]);

  if (!content) return null;
  const isProject = Boolean(content.video);
  return (
    <div className="modal-layer" role="presentation" onMouseDown={onClose}>
      <section
        className={`modal-panel ${isProject ? "is-project" : "is-image"}`}
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="关闭"><X size={22} /></button>
        {isProject ? (
          <>
            <div className="modal-media"><video src={content.video} controls preload="metadata" playsInline /></div>
            <div className="modal-copy">
              <p>{content.eyebrow}</p><h2>{content.title}</h2><span>{content.description}</span>
              <dl><div><dt>分工</dt><dd>{content.role}</dd></div><div><dt>成果</dt><dd>{content.result}</dd></div></dl>
            </div>
          </>
        ) : (
          <><img className="modal-image" src={content.image} alt={content.title} /><p className="modal-image-title">{content.title}</p></>
        )}
      </section>
    </div>
  );
}

function App() {
  const [modal, setModal] = useState(null);
  const closeModal = useMemo(() => () => setModal(null), []);
  return (
    <>
      <Navigation />
      <JellyfishCursor />
      <main>
        <Hero />
        <About />
        <FlowGallery
          id="works"
          projects={AIGC_PROJECTS}
          background="assets/ocean-mid.png"
          kicker="SELECTED WORKS"
          title="AIGC 影像创作"
          description="原创叙事、生成式影像与完整成片"
          onOpen={setModal}
        />
        <FlowGallery
          id="production"
          projects={PRODUCTION_PROJECTS}
          background="assets/ocean-deep.png"
          kicker="PRODUCTION"
          title="商业影像与实拍"
          description="品牌、空间与文化项目"
          onOpen={setModal}
        />
        <Posters onOpen={setModal} />
        <Awards onOpen={setModal} />
        <Contact />
      </main>
      <Modal content={modal} onClose={closeModal} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>,
);
