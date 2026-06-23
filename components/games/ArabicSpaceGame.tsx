'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ArabicSpaceGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    function resize() {
      if (!container || !cvs) return;
      cvs.width = container.clientWidth;
      cvs.height = container.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    const W = () => cvs!.width, H = () => cvs!.height;

    /* ── DATA ── */
    const LETTERS = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء'];
    const NAMES: Record<string, string> = { ا: 'أَلِف', ب: 'بَاء', ت: 'تَاء', ث: 'ثَاء', ج: 'جِيم', ح: 'حَاء', خ: 'خَاء', د: 'دَال', ذ: 'ذَال', ر: 'رَاء', ز: 'زَاي', س: 'سِين', ش: 'شِين', ص: 'صَاد', ض: 'ضَاد', ط: 'طَاء', ظ: 'ظَاء', ع: 'عَين', غ: 'غَين', ف: 'فَاء', ق: 'قَاف', ك: 'كَاف', ل: 'لاَم', م: 'مِيم', ن: 'نُون', ه: 'هَاء', و: 'وَاو', ي: 'يَاء', ء: 'هَمزَة' };
    const VOWELS = [
      { mark: '\u064E', name: 'فَتحة', hint: '(a)', color: '#FF6B6B', dark: '#3A0000' },
      { mark: '\u064F', name: 'ضَمّة', hint: '(u)', color: '#4ECDC4', dark: '#00221F' },
      { mark: '\u0650', name: 'كَسرة', hint: '(i)', color: '#A78BFA', dark: '#150030' },
      { mark: '\u0652', name: 'سُكون', hint: '(°)', color: '#86EFAC', dark: '#00220C' },
      { mark: '\u0651', name: 'شَدّة', hint: '(~)', color: '#FCD34D', dark: '#221500' },
      { mark: '\u064D', name: 'تنوين كسر', hint: '(in)', color: '#F472B6', dark: '#300020' },
      { mark: '\u064B', name: 'تنوين فتح', hint: '(an)', color: '#FB923C', dark: '#2A0E00' },
    ];

    /* ── STATE ── */
    const G: any = {
      frame: 0, screen: 'intro', score: 0,
      li: 0, floats: [], r1Phase: 'idle', celebT: 0,
      vShips: [], vFloat: null, vQueue: [], vDone: 0, vDelay: 0, r2IntroT: 0,
      projs: [], firing: false, shipAngle: 0,
      particles: [], feedbacks: [], stars: [],
      r1Btn: null, r2Btn: null, backBtn: null, playAgainBtn: null,
      hovR1: false, hovR2: false
    };
    for (let i = 0; i < 220; i++) G.stars.push({ x: Math.random() * 1920, y: Math.random() * 1080, r: Math.random() * 1.8 + .3, dy: Math.random() * .4 + .06, ph: Math.random() * Math.PI * 2 });

    /* ── UTILS ── */
    function rrect(x: number, y: number, w: number, h: number, r: number) {
      ctx!.beginPath();
      ctx!.moveTo(x + r, y); ctx!.lineTo(x + w - r, y); ctx!.arcTo(x + w, y, x + w, y + r, r);
      ctx!.lineTo(x + w, y + h - r); ctx!.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx!.lineTo(x + r, y + h); ctx!.arcTo(x, y + h, x, y + h - r, r);
      ctx!.lineTo(x, y + r); ctx!.arcTo(x, y, x + r, y, r); ctx!.closePath();
    }
    function shuffle(a: any[]) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
    function pickN(arr: any[], n: number, ex: any[] = []) { return shuffle(arr.filter(x => !ex.includes(x))).slice(0, n); }
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function inBtn(b: any, px: number, py: number) { return b && px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h; }

    /* ── BACKGROUND ── */
    function drawBg() {
      ctx!.fillStyle = '#00001C'; ctx!.fillRect(0, 0, W(), H());
      const neb = (cx: number, cy: number, cr: number, col: string) => { const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, cr); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx!.fillStyle = g; ctx!.fillRect(0, 0, W(), H()); };
      neb(W() * .76, H() * .26, W() * .44, 'rgba(40,0,80,.35)');
      neb(W() * .2, H() * .72, W() * .35, 'rgba(0,20,60,.3)');
    }
    function drawStars() {
      G.stars.forEach((s: any) => {
        s.y += s.dy; if (s.y > H()) { s.y = 0; s.x = Math.random() * W(); }
        const tw = .5 + .5 * Math.sin(G.frame * .04 + s.ph);
        ctx!.fillStyle = `rgba(255,255,255,${(tw * .7 + .3).toFixed(2)})`;
        ctx!.beginPath(); ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx!.fill();
      });
    }

    /* ── SHIP ── */
    function drawShip(x: number, y: number, color: string, sc = 1, angle = 0) {
      const s = sc, p = .6 + .4 * Math.sin(G.frame * .12);
      ctx!.save(); ctx!.translate(x, y); ctx!.rotate(angle);
      ctx!.shadowColor = color; ctx!.shadowBlur = 22 * p;
      ctx!.fillStyle = color;
      ctx!.beginPath(); ctx!.moveTo(0, -40 * s); ctx!.bezierCurveTo(11 * s, -24 * s, 13 * s, 4 * s, 11 * s, 20 * s); ctx!.lineTo(0, 24 * s); ctx!.lineTo(-11 * s, 20 * s); ctx!.bezierCurveTo(-13 * s, 4 * s, -11 * s, -24 * s, 0, -40 * s); ctx!.closePath(); ctx!.fill();
      ctx!.beginPath(); ctx!.moveTo(-9 * s, 4 * s); ctx!.lineTo(-36 * s, 28 * s); ctx!.lineTo(-28 * s, 34 * s); ctx!.lineTo(-7 * s, 18 * s); ctx!.closePath(); ctx!.fill();
      ctx!.beginPath(); ctx!.moveTo(9 * s, 4 * s); ctx!.lineTo(36 * s, 28 * s); ctx!.lineTo(28 * s, 34 * s); ctx!.lineTo(7 * s, 18 * s); ctx!.closePath(); ctx!.fill();
      ctx!.fillStyle = 'rgba(255,255,255,.22)';
      ctx!.beginPath(); ctx!.moveTo(-7 * s, 16 * s); ctx!.lineTo(-16 * s, 30 * s); ctx!.lineTo(-8 * s, 24 * s); ctx!.closePath(); ctx!.fill();
      ctx!.beginPath(); ctx!.moveTo(7 * s, 16 * s); ctx!.lineTo(16 * s, 30 * s); ctx!.lineTo(8 * s, 24 * s); ctx!.closePath(); ctx!.fill();
      ctx!.strokeStyle = 'rgba(255,255,255,.15)'; ctx!.lineWidth = 1.5; ctx!.beginPath(); ctx!.moveTo(0, -32 * s); ctx!.lineTo(0, 20 * s); ctx!.stroke();
      ctx!.shadowBlur = 0;
      const cg = ctx!.createRadialGradient(-2 * s, -20 * s, 0, 0, -16 * s, 8 * s); cg.addColorStop(0, 'rgba(220,245,255,.95)'); cg.addColorStop(1, 'rgba(80,160,220,.65)');
      ctx!.fillStyle = cg; ctx!.beginPath(); ctx!.ellipse(0, -17 * s, 5.5 * s, 9 * s, 0, 0, Math.PI * 2); ctx!.fill();
      ctx!.shadowColor = '#FF6600'; ctx!.shadowBlur = 18 * p;
      const eg = ctx!.createRadialGradient(0, 26 * s, 0, 0, 30 * s, 11 * s);
      eg.addColorStop(0, `rgba(255,200,50,${(.9 * p).toFixed(2)})`); eg.addColorStop(.5, `rgba(255,100,0,${(.65 * p).toFixed(2)})`); eg.addColorStop(1, 'rgba(255,40,0,0)');
      ctx!.fillStyle = eg; ctx!.beginPath(); ctx!.ellipse(0, 24 * s + 5 * p * s, 6 * s, Math.max(0.1, (11 + 6 * p) * s), 0, 0, Math.PI * 2); ctx!.fill();
      ctx!.restore();
    }

    /* ── BUBBLE ── */
    function drawBubble(x: number, y: number, text: string, sz: number, fill: string, stroke: string, alpha = 1, shake = 0) {
      const hw = sz * .78, hh = sz * .78, ox = shake > 0 ? (Math.random() - .5) * shake : 0;
      ctx!.save(); ctx!.globalAlpha = alpha;
      ctx!.shadowColor = stroke; ctx!.shadowBlur = 15;
      rrect(x - hw + ox, y - hh, hw * 2, hh * 2, 14); ctx!.fillStyle = fill; ctx!.fill();
      ctx!.strokeStyle = stroke; ctx!.lineWidth = 2.5; ctx!.stroke();
      ctx!.shadowBlur = 0; ctx!.fillStyle = '#FFF';
      let fs = Math.round(sz * .82);
      ctx!.font = `bold ${fs}px var(--font-amiri), 'Amiri', 'Segoe UI', Arial`;
      while (ctx!.measureText(text).width > hw * 1.8 && fs > 10) { fs--; ctx!.font = `bold ${fs}px var(--font-amiri), 'Amiri', 'Segoe UI', Arial`; }
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText(text, x + ox, y + sz * .04);
      ctx!.restore();
    }
    function drawBtn(x: number, y: number, w: number, h: number, lbl: string, fill: string, stroke: string) {
      ctx!.save(); ctx!.shadowColor = stroke; ctx!.shadowBlur = 16;
      rrect(x, y, w, h, 14); ctx!.fillStyle = fill; ctx!.fill(); ctx!.strokeStyle = stroke; ctx!.lineWidth = 2.5; ctx!.stroke();
      ctx!.shadowBlur = 0; ctx!.fillStyle = '#FFF'; ctx!.font = `bold ${Math.min(h * .42, 22)}px Arial`;
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText(lbl, x + w / 2, y + h / 2); ctx!.restore();
    }

    /* ── ROUND CARD ── */
    function drawRoundCard(x: number, y: number, w: number, h: number, num: string, titleAr: string, titleEn: string, desc: string, accent: string, shadowCol: string, hov: boolean, shipCol: string) {
      const r = 18, pulse = hov ? .5 + .5 * Math.sin(G.frame * .1) : 0;
      ctx!.save();
      if (hov) { ctx!.shadowColor = shadowCol; ctx!.shadowBlur = 40 * (.7 + pulse * .3); }
      rrect(x, y, w, h, r);
      const grd = ctx!.createLinearGradient(x, y, x, y + h);
      grd.addColorStop(0, hov ? 'rgba(255,255,255,.13)' : 'rgba(255,255,255,.06)');
      grd.addColorStop(1, 'rgba(0,0,10,.78)');
      ctx!.fillStyle = grd; ctx!.fill();
      ctx!.strokeStyle = accent; ctx!.lineWidth = hov ? 2.5 : 1.5; ctx!.globalAlpha = hov ? 1 : .75; ctx!.stroke();
      ctx!.shadowBlur = 0; ctx!.globalAlpha = 1;
      // top accent bar
      rrect(x, y, w, 6, r);
      const bar = ctx!.createLinearGradient(x, 0, x + w, 0); bar.addColorStop(0, 'rgba(0,0,0,0)'); bar.addColorStop(.5, accent); bar.addColorStop(1, 'rgba(0,0,0,0)');
      ctx!.fillStyle = bar; ctx!.fill();
      // ship
      drawShip(x + 60, y + h / 2, shipCol, .6);
      // number badge
      ctx!.shadowColor = accent; ctx!.shadowBlur = 14;
      rrect(x + 106, y + h / 2 - 24, 52, 48, 12);
      ctx!.fillStyle = 'rgba(255,255,255,.07)'; ctx!.fill();
      ctx!.strokeStyle = accent; ctx!.lineWidth = 2; ctx!.stroke();
      ctx!.shadowBlur = 0; ctx!.fillStyle = accent;
      ctx!.font = `bold ${Math.min(w * .052, 20)}px Arial`;
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText(num, x + 132, y + h / 2);
      // separator
      ctx!.strokeStyle = 'rgba(255,255,255,.1)'; ctx!.lineWidth = 1;
      ctx!.beginPath(); ctx!.moveTo(x + 172, y + 18); ctx!.lineTo(x + 172, y + h - 18); ctx!.stroke();
      // arabic title
      ctx!.fillStyle = accent; ctx!.shadowColor = accent; ctx!.shadowBlur = 8;
      ctx!.font = `bold ${Math.min(w * .06, 24)}px var(--font-amiri), 'Amiri', Arial`;
      ctx!.textAlign = 'left'; ctx!.fillText(titleAr, x + 184, y + h * .30);
      // english title
      ctx!.shadowBlur = 0; ctx!.fillStyle = 'rgba(255,255,255,.95)';
      ctx!.font = `bold ${Math.min(w * .046, 18)}px Arial`;
      ctx!.fillText(titleEn, x + 184, y + h * .51);
      // description (word wrap, 2 lines)
      ctx!.fillStyle = 'rgba(190,215,255,.6)'; ctx!.font = `${Math.min(w * .032, 12)}px Arial`;
      const words = desc.split(' '), maxW = w - 198, lh = 14;
      let line = '', lines = [], lx = x + 184, ly = y + h * .70;
      words.forEach(wd => { const t = line + wd + ' '; if (ctx!.measureText(t).width > maxW && line !== '') { lines.push(line); line = wd + ' '; } else line = t; });
      lines.push(line); lines.slice(0, 2).forEach((l, i) => ctx!.fillText(l.trim(), lx, ly + i * lh));
      if (hov) { ctx!.fillStyle = accent; ctx!.font = `bold ${Math.min(w * .046, 18)}px Arial`; ctx!.textAlign = 'right'; ctx!.fillText('→  Play', x + w - 18, y + h / 2); }
      ctx!.restore();
    }

    /* ── BACK BTN ── */
    function drawBackBtn() {
      const bw = 95, bh = 36, bx = 14, by = 58;
      ctx!.save(); ctx!.shadowColor = '#88AAFF'; ctx!.shadowBlur = 12;
      rrect(bx, by, bw, bh, 10); ctx!.fillStyle = 'rgba(10, 10, 40, .88)'; ctx!.fill();
      ctx!.strokeStyle = '#6688CC'; ctx!.lineWidth = 1.5; ctx!.stroke();
      ctx!.shadowBlur = 0; ctx!.fillStyle = '#AACCFF'; ctx!.font = 'bold 14px Arial';
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText('⬅ Menu', bx + bw / 2, by + bh / 2);
      G.backBtn = { x: bx, y: by, w: bw, h: bh }; ctx!.restore();
    }

    /* ── FX ── */
    function burst(x: number, y: number, col: string, n = 24) { for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, sp = Math.random() * 7 + 2; G.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: Math.random() * 5 + 2, color: col, life: 1 }); } }
    function popText(x: number, y: number, t: string, col: string) { G.feedbacks.push({ x, y, t, col, life: 1 }); }
    function tickParticles() {
      G.particles = G.particles.filter((p: any) => p.life > 0);
      G.particles.forEach((p: any) => { p.x += p.vx; p.y += p.vy; p.vy += .2; p.life -= .025; const r = Math.max(0.01, p.r * p.life); ctx!.save(); ctx!.globalAlpha = p.life; ctx!.fillStyle = p.color; ctx!.beginPath(); ctx!.arc(p.x, p.y, r, 0, Math.PI * 2); ctx!.fill(); ctx!.restore(); });
    }
    function tickFeedbacks() {
      G.feedbacks = G.feedbacks.filter((f: any) => f.life > 0);
      G.feedbacks.forEach((f: any) => { f.y -= 1.5; f.life -= .018; ctx!.save(); ctx!.globalAlpha = f.life; ctx!.fillStyle = f.col; ctx!.font = 'bold 26px Arial'; ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText(f.t, f.x, f.y); ctx!.restore(); });
    }

    /* ── PROJECTILE ── */
    function fireProj(sx: number, sy: number, tx: number, ty: number, correct: boolean) { G.firing = true; G.projs.push({ sx, sy: sy - 42, tx, ty, x: sx, y: sy - 42, prog: 0, speed: .055, correct, trail: [], done: false }); }
    function tickProjs() {
      G.projs = G.projs.filter((p: any) => !p.done);
      G.projs.forEach((pr: any) => {
        pr.trail.push({ x: pr.x, y: pr.y }); if (pr.trail.length > 14) pr.trail.shift();
        pr.prog += pr.speed; pr.x = lerp(pr.sx, pr.tx, pr.prog); pr.y = lerp(pr.sy, pr.ty, pr.prog);
        if (pr.prog >= 1) {
          pr.done = true; G.firing = false;
          if (pr.correct) { G.score += 5; burst(pr.tx, pr.ty, '#00FF88', 30); burst(pr.tx, pr.ty, '#FFD700', 14); popText(pr.tx, pr.ty - 58, '+5 ⭐', '#FFD700'); G.floats.forEach((fl: any) => { if (fl.isTarget) fl.hit = true; }); G.r1Phase = 'celeb'; G.celebT = 65; }
          else { burst(pr.tx, pr.ty, '#FF4444', 12); popText(pr.tx, pr.ty - 48, '✗ Try again!', '#FF6666'); G.floats.forEach((fl: any) => { if (!fl.hit && Math.abs(fl.x - pr.tx) < 55 && Math.abs(fl.y - pr.ty) < 55) fl.wf = 18; }); }
          return;
        }
        pr.trail.forEach((tp: any, i: number) => { const a = (i / pr.trail.length) * .55, r = Math.max(0.01, (1 + i * .25) * (i / pr.trail.length)); ctx!.save(); ctx!.globalAlpha = a; ctx!.fillStyle = pr.correct ? '#00FF88' : '#FF4444'; ctx!.shadowColor = pr.correct ? '#00FF88' : '#FF4444'; ctx!.shadowBlur = 6; ctx!.beginPath(); ctx!.arc(tp.x, tp.y, r, 0, Math.PI * 2); ctx!.fill(); ctx!.restore(); });
        ctx!.save(); ctx!.shadowColor = pr.correct ? '#00FFAA' : '#FF4444'; ctx!.shadowBlur = 22; ctx!.fillStyle = pr.correct ? '#AAFFCC' : '#FF8888'; ctx!.beginPath(); ctx!.arc(pr.x, pr.y, 6, 0, Math.PI * 2); ctx!.fill(); ctx!.restore();
        const pulse = .5 + .5 * Math.sin(G.frame * .28), rs = 42 + pulse * 7;
        const rc = pr.correct ? `rgba(0,255,136,${(.4 + pulse * .5).toFixed(2)})` : `rgba(255,68,68,${(.4 + pulse * .5).toFixed(2)})`;
        ctx!.save(); ctx!.strokeStyle = rc; ctx!.lineWidth = 2; ctx!.shadowColor = pr.correct ? '#00FF88' : '#FF4444'; ctx!.shadowBlur = 10;
        ctx!.beginPath(); ctx!.arc(pr.tx, pr.ty, rs, 0, Math.PI * 2); ctx!.stroke();
        const a1 = rs * .65, a2 = rs * 1.35;
        ctx!.beginPath(); ctx!.moveTo(pr.tx - a2, pr.ty); ctx!.lineTo(pr.tx - a1, pr.ty); ctx!.moveTo(pr.tx + a1, pr.ty); ctx!.lineTo(pr.tx + a2, pr.ty); ctx!.moveTo(pr.tx, pr.ty - a2); ctx!.lineTo(pr.tx, pr.ty - a1); ctx!.moveTo(pr.tx, pr.ty + a1); ctx!.lineTo(pr.tx, pr.ty + a2); ctx!.stroke(); ctx!.restore();
      });
    }

    /* ── HUD ── */
    function drawHUD() {
      ctx!.save();
      ctx!.shadowColor = '#FFD700'; ctx!.shadowBlur = 10; rrect(10, 10, 130, 38, 8); ctx!.fillStyle = 'rgba(0,0,20,.78)'; ctx!.fill(); ctx!.strokeStyle = '#FFD700'; ctx!.lineWidth = 1.5; ctx!.stroke();
      ctx!.shadowBlur = 0; ctx!.fillStyle = '#FFD700'; ctx!.font = 'bold 20px Arial'; ctx!.textAlign = 'left'; ctx!.textBaseline = 'middle'; ctx!.fillText(`⭐ ${G.score}`, 22, 29);
      const rl = G.screen === 'r1' ? '🚀 Round 1: Letters' : '✨ Round 2: Vowels';
      ctx!.shadowColor = '#88AAFF'; ctx!.shadowBlur = 8; rrect(W() / 2 - 108, 10, 216, 38, 8); ctx!.fillStyle = 'rgba(0,0,20,.78)'; ctx!.fill(); ctx!.strokeStyle = '#88AAFF'; ctx!.lineWidth = 1.5; ctx!.stroke();
      ctx!.shadowBlur = 0; ctx!.fillStyle = '#CCDDFF'; ctx!.font = 'bold 15px Arial'; ctx!.textAlign = 'center'; ctx!.fillText(rl, W() / 2, 29);
      if (G.screen === 'r1') { ctx!.shadowColor = '#AAFFAA'; ctx!.shadowBlur = 8; rrect(W() - 112, 10, 102, 38, 8); ctx!.fillStyle = 'rgba(0,0,20,.78)'; ctx!.fill(); ctx!.strokeStyle = '#AAFFAA'; ctx!.lineWidth = 1.5; ctx!.stroke(); ctx!.shadowBlur = 0; ctx!.fillStyle = '#AAFFAA'; ctx!.font = 'bold 18px Arial'; ctx!.textAlign = 'right'; ctx!.fillText(`${G.li + 1}/29`, W() - 16, 29); }
      ctx!.restore();
    }

    /* ── INTRO ── */
    function drawIntro() {
      ctx!.save(); ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';

      // Planet top-right
      const pr = Math.min(W() * .07, 58), pcx = W() * .9, pcy = H() * .1;
      const pg = ctx!.createRadialGradient(pcx - pr * .3, pcy - pr * .3, 0, pcx, pcy, pr);
      pg.addColorStop(0, '#3A6FAD'); pg.addColorStop(.65, '#162E5C'); pg.addColorStop(1, '#050D20');
      ctx!.fillStyle = pg; ctx!.beginPath(); ctx!.arc(pcx, pcy, pr, 0, Math.PI * 2); ctx!.fill();
      ctx!.save(); ctx!.beginPath(); ctx!.ellipse(pcx, pcy, pr * 1.6, pr * .26, -.32, 0, Math.PI * 2); ctx!.strokeStyle = 'rgba(130,200,255,.38)'; ctx!.lineWidth = 3; ctx!.stroke(); ctx!.restore();
      ctx!.fillStyle = 'rgba(200,230,255,.16)'; ctx!.beginPath(); ctx!.arc(pcx - pr * .32, pcy - pr * .28, pr * .22, 0, Math.PI * 2); ctx!.fill();
      // Small planet
      const pr2 = Math.min(W() * .032, 26), pcx2 = W() * .08, pcy2 = H() * .82;
      const pg2 = ctx!.createRadialGradient(pcx2 - pr2 * .3, pcy2 - pr2 * .3, 0, pcx2, pcy2, pr2);
      pg2.addColorStop(0, '#6B3AA0'); pg2.addColorStop(1, '#15062A');
      ctx!.fillStyle = pg2; ctx!.beginPath(); ctx!.arc(pcx2, pcy2, pr2, 0, Math.PI * 2); ctx!.fill();

      // Title glow backdrop
      const tbg = ctx!.createRadialGradient(W() / 2, H() * .09, 0, W() / 2, H() * .09, W() * .4);
      tbg.addColorStop(0, 'rgba(30,80,200,.22)'); tbg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx!.fillStyle = tbg; ctx!.fillRect(0, 0, W(), H() * .22);

      // Title
      ctx!.shadowColor = '#4488FF'; ctx!.shadowBlur = 40; ctx!.fillStyle = '#FFFFFF';
      ctx!.font = `bold ${Math.min(W() * .065, 52)}px Arial`; ctx!.fillText('🚀 Arabic Space Adventure', W() / 2, H() * .09);
      ctx!.shadowBlur = 0; ctx!.shadowColor = '#88CCFF'; ctx!.shadowBlur = 14;
      ctx!.fillStyle = '#AADDFF'; ctx!.font = `${Math.min(W() * .04, 28)}px var(--font-amiri), 'Amiri', 'Segoe UI', Arial`;
      ctx!.fillText('مُغَامَرَة الفَضَاء العَرَبِيَّة', W() / 2, H() * .185);
      ctx!.shadowBlur = 0;

      // Fancy divider
      const dw = W() * .65, dx = (W() - dw) / 2, dyy = H() * .237;
      const dlg = ctx!.createLinearGradient(dx, 0, dx + dw, 0); dlg.addColorStop(0, 'rgba(80,140,255,0)'); dlg.addColorStop(.5, 'rgba(100,170,255,.55)'); dlg.addColorStop(1, 'rgba(80,140,255,0)');
      ctx!.fillStyle = dlg; ctx!.fillRect(dx, dyy, dw, 1.5);
      [-.42, -.22, 0, .22, .42].forEach(f => { ctx!.fillStyle = 'rgba(120,180,255,.5)'; ctx!.beginPath(); ctx!.arc(W() / 2 + dw * f, dyy + .75, 2.5, 0, Math.PI * 2); ctx!.fill(); });
      ctx!.fillStyle = 'rgba(170,210,255,.6)'; ctx!.font = `${Math.min(W() * .027, 15)}px Arial`;
      ctx!.fillText('Choose your mission below to begin learning Arabic!', W() / 2, H() * .272);

      // Cards
      const cw = Math.min(W() * .88, 580), ch = Math.min(H() * .215, 150);
      const cx = (W() - cw) / 2, cy1 = H() * .30, cy2 = H() * .55;
      drawRoundCard(cx, cy1, cw, ch, '01', 'الحُرُوف العَرَبِيَّة', 'Round 1 — Arabic Letters (29 Letters)', 'Spot the matching letter among 3 floating bubbles. Master all 29 Arabic letters!', '#00DDFF', '#00AAFF', G.hovR1, '#00DDFF');
      drawRoundCard(cx, cy2, cw, ch, '02', 'الحَرَكَات العَرَبِيَّة', 'Round 2 — Arabic Vowels (7 Marks)', 'A vowelled letter flies past — tap the correct vowel spaceship! Learn all 7 vowel marks!', '#FFD700', '#FF9900', G.hovR2, '#FFD700');
      G.r1Btn = { x: cx, y: cy1, w: cw, h: ch }; G.r2Btn = { x: cx, y: cy2, w: cw, h: ch };

      // Exit Button
      const exW = 100, exH = 40, exX = 20, exY = 20;
      drawBtn(exX, exY, exW, exH, '✕ Exit', 'rgba(255, 50, 50, 0.2)', '#FF5555');
      G.exitBtn = { x: exX, y: exY, w: exW, h: exH };

      // Bottom ships with labels
      const sc = ['#FF6B6B', '#4ECDC4', '#A78BFA', '#86EFAC', '#FCD34D', '#F472B6', '#FB923C'];
      const vn = ['فَتحة', 'ضَمّة', 'كَسرة', 'سُكون', 'شَدّة', 'ت.كسر', 'ت.فتح'];
      for (let i = 0; i < 7; i++) {
        drawShip(W() * (i * .13 + .06), H() * .89, sc[i], .5);
        ctx!.fillStyle = sc[i]; ctx!.font = `${Math.min(W() * .018, 11)}px var(--font-amiri), 'Amiri', Arial`;
        ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText(vn[i], W() * (i * .13 + .06), H() * .965);
      }
      ctx!.restore();
    }

    /* ── ROUND 1 ── */
    function initR1() { G.screen = 'r1'; G.li = 0; G.r1Phase = 'idle'; G.floats = []; G.projs = []; G.firing = false; G.shipAngle = 0; spawnR1(); }
    function spawnR1() {
      if (G.li >= LETTERS.length) { G.screen = 'r2intro'; G.r2IntroT = 240; return; }
      G.r1Phase = 'active'; G.floats = []; G.projs = []; G.firing = false; G.shipAngle = 0;
      const t = LETTERS[G.li], dec = pickN(LETTERS, 2, [t]);
      const all = shuffle([t, ...dec]), ys = shuffle([H() * .22, H() * .44, H() * .64]);
      all.forEach((l, i) => G.floats.push({ x: W() + 70 + i * 200, y: ys[i], letter: l, isTarget: l === t, speed: 1.8, hit: false, wf: 0 }));
    }
    function drawR1() {
      const sz = Math.min(W() * .082, 60), sx = W() / 2, sy = H() - 95;
      if (G.projs.length > 0 && !G.projs[0].done) { const pr = G.projs[0], dx = pr.tx - sx, dy = pr.ty - sy; G.shipAngle += (Math.atan2(dx, -dy) * 0.55 - G.shipAngle) * 0.15; }
      else G.shipAngle *= 0.88;
      drawShip(sx, sy, '#4488FF', 1, G.shipAngle);
      drawBubble(sx, sy - sz - 14, LETTERS[G.li], sz, '#001133', '#4488FF');
      ctx!.fillStyle = 'rgba(100,160,255,.85)'; ctx!.font = `${Math.min(W() * .026, 17)}px var(--font-amiri), 'Amiri', 'Segoe UI', Arial`;
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText(NAMES[LETTERS[G.li]] || '', sx, sy + 58);
      const pw = W() * .55, ph = 8, px = (W() - pw) / 2, py = H() - 18;
      rrect(px, py, pw, ph, 4); ctx!.fillStyle = 'rgba(255,255,255,.12)'; ctx!.fill();
      rrect(px, py, pw * (G.li / 29), ph, 4); ctx!.fillStyle = '#4488FF'; ctx!.fill();
      if (G.r1Phase === 'celeb') {
        G.celebT--; ctx!.save(); ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
        ctx!.fillStyle = '#FFD700'; ctx!.shadowColor = '#FFD700'; ctx!.shadowBlur = 25;
        ctx!.font = `bold ${Math.min(W() * .062, 46)}px Arial`; ctx!.fillText('✅  Correct! +5', W() / 2, H() * .5); ctx!.restore();
        if (G.celebT <= 0) { G.li++; spawnR1(); } return;
      }
      let allGone = true;
      G.floats.forEach((fl: any) => {
        if (fl.hit) return; fl.x -= fl.speed; if (fl.x > -80) allGone = false; if (fl.x < -80) return;
        if (fl.wf > 0) fl.wf--; const flash = fl.wf > 0 && fl.wf % 6 < 3;
        drawBubble(fl.x, fl.y, fl.letter, sz, fl.isTarget ? '#001A0A' : '#1A000A', fl.isTarget ? '#00FF88' : '#FF4488', flash ? .35 : 1, fl.wf > 0 ? 3 : 0);
      });
      if (allGone && G.r1Phase === 'active') spawnR1();
    }

    /* ── R2 INTRO ── */
    function drawR2Intro() {
      ctx!.save(); ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
      ctx!.fillStyle = '#FFD700'; ctx!.shadowColor = '#FFD700'; ctx!.shadowBlur = 28;
      ctx!.font = `bold ${Math.min(W() * .07, 52)}px Arial`; ctx!.fillText('🎉  Round 1 Complete!', W() / 2, H() * .15);
      ctx!.shadowBlur = 0; ctx!.fillStyle = '#FFF'; ctx!.font = `${Math.min(W() * .036, 24)}px Arial`; ctx!.fillText('You know all 29 Arabic letters!', W() / 2, H() * .27);
      ctx!.fillStyle = '#AADDFF'; ctx!.fillText('Now match all 7 vowel marks  •  الحَرَكَات', W() / 2, H() * .37);
      VOWELS.forEach((v, i) => { const vx = W() * ((i + 1) / (VOWELS.length + 1)), vy = H() * .54; drawBubble(vx, vy, 'ب' + v.mark, 40, v.dark, v.color); ctx!.fillStyle = v.color; ctx!.font = `${Math.min(W() * .02, 11)}px var(--font-amiri), 'Amiri', Arial`; ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText(v.name, vx, vy + 48); ctx!.fillStyle = 'rgba(255,255,255,.5)'; ctx!.font = '11px Arial'; ctx!.fillText(v.hint, vx, vy + 60); });
      G.r2IntroT--; ctx!.fillStyle = 'rgba(255,255,255,.5)'; ctx!.font = '16px Arial'; ctx!.fillText(`Starting in ${Math.ceil(G.r2IntroT / 60)}…`, W() / 2, H() * .9);
      if (G.r2IntroT <= 0) startR2(); ctx!.restore(); drawBackBtn();
    }

    /* ── ROUND 2 ── */
    function startR2() {
      G.screen = 'r2'; G.vShips = [];
      const n = VOWELS.length, gap = W() / (n + 1);
      for (let i = 0; i < n; i++) G.vShips.push({ x: gap * (i + 1), y: H() - 85, vi: i, flash: 0, wf: 0 });
      G.vQueue = shuffle(Array.from({ length: n * 5 }, (_, i) => i % n));
      G.vDone = 0; G.vFloat = null; G.vDelay = 100;
    }
    function initR2Direct() { G.score = 0; startR2(); }
    function spawnVFloat() { const vi = G.vQueue[G.vDone], base = LETTERS[Math.floor(Math.random() * LETTERS.length)]; G.vFloat = { x: W() + 80, y: H() * .34, base, vi, text: base + VOWELS[vi].mark, speed: 2 }; }
    function drawR2() {
      const n = VOWELS.length, gap = W() / (n + 1), sc = Math.min(gap / 100, .72), sz = Math.min(gap * .52, 42);
      G.vShips.forEach((vs: any) => {
        const v = VOWELS[vs.vi]; let col = v.color;
        if (vs.flash > 0) { col = '#FFF'; vs.flash--; } else if (vs.wf > 0) { col = vs.wf % 6 < 3 ? '#FF4444' : '#FF8888'; vs.wf--; }
        drawShip(vs.x, vs.y, col, sc);
        drawBubble(vs.x, vs.y - sz - 8, 'ب' + v.mark, sz, v.dark, v.color);
        ctx!.fillStyle = v.color; ctx!.font = `${Math.min(gap * .13, 11)}px var(--font-amiri), 'Amiri', Arial`;
        ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText(v.name, vs.x, vs.y + 36 * sc + 10);
        ctx!.fillStyle = 'rgba(255,255,255,.5)'; ctx!.font = `${Math.min(gap * .11, 10)}px Arial`; ctx!.fillText(v.hint, vs.x, vs.y + 36 * sc + 22);
      });
      const total = G.vQueue.length;
      if (!G.vFloat) { G.vDelay--; if (G.vDelay <= 0 && G.vDone < total) spawnVFloat(); }
      if (G.vFloat) {
        G.vFloat.x -= G.vFloat.speed;
        if (G.vFloat.x < -90) { G.vDone++; G.vFloat = null; G.vDelay = 80; if (G.vDone >= total) G.screen = 'win'; }
        else { const v = VOWELS[G.vFloat.vi]; drawBubble(G.vFloat.x, G.vFloat.y, G.vFloat.text, Math.min(W() * .08, 55), v.dark, v.color); ctx!.fillStyle = 'rgba(255,255,255,.45)'; ctx!.font = '14px Arial'; ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle'; ctx!.fillText('Tap the matching vowel ship ↓', G.vFloat.x, G.vFloat.y + 68); }
      }
      const pw = W() * .58, ph = 8, px = (W() - pw) / 2, py = H() - 16;
      rrect(px, py, pw, ph, 4); ctx!.fillStyle = 'rgba(255,255,255,.12)'; ctx!.fill();
      rrect(px, py, pw * (G.vDone / total), ph, 4); ctx!.fillStyle = '#FF8800'; ctx!.fill();
    }

    /* ── WIN ── */
    function drawWin() {
      ctx!.save(); ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
      ctx!.fillStyle = '#FFD700'; ctx!.shadowColor = '#FFD700'; ctx!.shadowBlur = 35;
      ctx!.font = `bold ${Math.min(W() * .08, 62)}px Arial`; ctx!.fillText('🏆  You Did It!', W() / 2, H() * .18);
      ctx!.shadowBlur = 0; ctx!.fillStyle = '#FFF'; ctx!.font = `${Math.min(W() * .048, 34)}px Arial`; ctx!.fillText(`Final Score: ⭐ ${G.score}`, W() / 2, H() * .32);
      ctx!.fillStyle = '#AADDFF'; ctx!.font = `${Math.min(W() * .032, 22)}px Arial`; ctx!.fillText('You mastered Arabic Letters & Vowels!', W() / 2, H() * .43);
      ctx!.fillStyle = 'rgba(255,255,255,.85)'; ctx!.font = `${Math.min(W() * .04, 28)}px var(--font-amiri), 'Amiri', Arial`; ctx!.fillText('أَحسَنتَ!  مَرحَباً بِكَ!', W() / 2, H() * .54);
      const bw = 220, bh = 56, bx1 = W() / 2 - bw - 10, bx2 = W() / 2 + 10, by = H() * .66;
      drawBtn(bx1, by, bw, bh, '🔄  Play Again', '#442200', '#FFD700');
      drawBtn(bx2, by, bw, bh, '🏠  Main Menu', '#001133', '#4488FF');
      G.playAgainBtn = { x: bx1, y: by, w: bw, h: bh }; G.backBtn = { x: bx2, y: by, w: bw, h: bh };
      ctx!.restore();
    }

    /* ── INPUT ── */
    function onTap(px: number, py: number) {
      if (G.screen === 'intro') {
        if (inBtn(G.exitBtn, px, py)) { router.push('/games'); return; }
        if (inBtn(G.r1Btn, px, py)) { G.score = 0; initR1(); }
        if (inBtn(G.r2Btn, px, py)) { initR2Direct(); }
        return;
      }
      if (G.screen === 'win') { if (inBtn(G.playAgainBtn, px, py)) { G.score = 0; initR1(); } if (inBtn(G.backBtn, px, py)) { G.screen = 'intro'; G.projs = []; G.particles = []; G.feedbacks = []; } return; }
      if (inBtn(G.backBtn, px, py)) { G.screen = 'intro'; G.projs = []; G.particles = []; G.feedbacks = []; G.firing = false; return; }
      if (G.screen === 'r1' && G.r1Phase === 'active' && !G.firing) {
        const ht = Math.min(W() * .082, 60) * .78 + 14, sx = W() / 2, sy = H() - 95;
        G.floats.forEach((fl: any) => { if (fl.hit) return; if (Math.abs(px - fl.x) < ht && Math.abs(py - fl.y) < ht) fireProj(sx, sy, fl.x, fl.y, fl.isTarget); });
      }
      if (G.screen === 'r2' && G.vFloat) {
        const gap = W() / (VOWELS.length + 1), hitR = gap * .5;
        G.vShips.forEach((vs: any) => {
          if (Math.abs(px - vs.x) < hitR && Math.abs(py - vs.y) < 70) {
            if (vs.vi === G.vFloat.vi) { G.score += 5; burst(vs.x, vs.y - 30, VOWELS[vs.vi].color); popText(vs.x, vs.y - 90, '+5 ⭐', '#FFD700'); vs.flash = 25; G.vDone++; G.vFloat = null; G.vDelay = 70; if (G.vDone >= G.vQueue.length) setTimeout(() => G.screen = 'win', 400); }
            else { burst(vs.x, vs.y - 30, '#FF4444', 10); popText(vs.x, vs.y - 90, '✗ Wrong!', '#FF6666'); vs.wf = 22; }
          }
        });
      }
    }
    function onMove(px: number, py: number) {
      if (G.screen === 'intro') {
        G.hovR1 = inBtn(G.r1Btn, px, py);
        G.hovR2 = inBtn(G.r2Btn, px, py);
        const hovExit = inBtn(G.exitBtn, px, py);
        cvs!.style.cursor = (G.hovR1 || G.hovR2 || hovExit) ? 'pointer' : 'default';
      }
      else cvs!.style.cursor = 'default';
    }

    const handleClick = (e: MouseEvent) => onTap(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      onTap(t.clientX, t.clientY);
    };

    cvs.addEventListener('click', handleClick);
    cvs.addEventListener('mousemove', handleMouseMove);
    cvs.addEventListener('touchstart', handleTouchStart, { passive: false });

    /* ── LOOP ── */
    function loop() {
      G.frame++;
      drawBg(); drawStars();
      switch (G.screen) {
        case 'intro': drawIntro(); break;
        case 'r1': drawR1(); break;
        case 'r2intro': drawR2Intro(); break;
        case 'r2': drawR2(); break;
        case 'win': drawWin(); break;
      }
      tickProjs(); tickParticles(); tickFeedbacks();
      if (G.screen === 'r1' || G.screen === 'r2') { drawHUD(); drawBackBtn(); }
      animationFrameId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cvs.removeEventListener('click', handleClick);
      cvs.removeEventListener('mousemove', handleMouseMove);
      cvs.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-[#00001C]"
    >
      <canvas
        ref={canvasRef}
        className="block touch-none"
      />
    </div>
  );
}
