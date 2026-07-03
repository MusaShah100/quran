// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ARABIC ALPHABET SPACE SHOOTER — TypeScript module
//  Import this into any TS/JS build (Vite, webpack, plain <script type="module">)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Types ──────────────────────────────────────────────────────
interface Vector2 {
  x: number;
  y: number;
}

interface LetterData {
  char: string;
  x: number;
  y: number;
  speed: number;
  radius: number;
  alive: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface ArabicSpaceShooterOptions {
  canvas: HTMLCanvasElement;
  scoreEl: HTMLElement;
  comboEl: HTMLElement;
  targetLetterEl: HTMLElement;
  restartButton?: HTMLElement | null;
}

// ── Constants ──────────────────────────────────────────────────
const ARABIC_ALPHABET: string[] = [
  'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ',
  'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
  'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق',
  'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'
];

const CANVAS_W = 800;
const CANVAS_H = 600;
const SPACESHIP_Y = 540;
const LETTER_RADIUS = 34;
const FALL_SPEED_MIN = 0.55;
const FALL_SPEED_MAX = 1.35;
const SPAWN_INTERVAL_MS = 1600;
const MAX_LETTERS = 12;
const BASE_POINTS = 10;
const COMBO_BONUS = 5;

// ── Helpers ────────────────────────────────────────────────────
function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// ── Main class ─────────────────────────────────────────────────
export class ArabicSpaceShooter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scoreEl: HTMLElement;
  private comboEl: HTMLElement;
  private targetLetterEl: HTMLElement;
  private restartButton?: HTMLElement | null;

  private score = 0;
  private combo = 0;
  private currentTarget = '';
  private letters: LetterData[] = [];
  private particles: Particle[] = [];
  private fireParticles: Particle[] = [];
  private gameOver = false;
  private spawnTimer = 0;
  private lastTimestamp = 0;
  private animationId: number | null = null;

  // bound handlers so we can add/remove listeners cleanly
  private onClick = (e: MouseEvent) => this.handleTap(e.clientX, e.clientY);
  private onTouch = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) this.handleTap(touch.clientX, touch.clientY);
  };
  private onRestartClick = () => this.reset();

  constructor(options: ArabicSpaceShooterOptions) {
    this.canvas = options.canvas;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context from canvas');
    this.ctx = ctx;
    this.scoreEl = options.scoreEl;
    this.comboEl = options.comboEl;
    this.targetLetterEl = options.targetLetterEl;
    this.restartButton = options.restartButton;

    this.setupEvents();
  }

  /** Start (or restart) the game. Call this once after construction. */
  public start(): void {
    this.reset();
  }

  /** Clean up listeners and stop the animation loop. Call on unmount. */
  public destroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.canvas.removeEventListener('click', this.onClick);
    this.canvas.removeEventListener('touchstart', this.onTouch);
    this.restartButton?.removeEventListener('click', this.onRestartClick);
  }

  // ── Setup ────────────────────────────────────────────────────
  private setupEvents(): void {
    this.canvas.addEventListener('click', this.onClick);
    this.canvas.addEventListener('touchstart', this.onTouch, { passive: false });
    this.restartButton?.addEventListener('click', this.onRestartClick);
  }

  private pickNewTarget(): string {
    let newChar = randomFrom(ARABIC_ALPHABET);
    while (newChar === this.currentTarget && ARABIC_ALPHABET.length > 1) {
      newChar = randomFrom(ARABIC_ALPHABET);
    }
    return newChar;
  }

  private reset(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.score = 0;
    this.combo = 0;
    this.letters = [];
    this.particles = [];
    this.fireParticles = [];
    this.gameOver = false;
    this.spawnTimer = 0;
    this.currentTarget = this.pickNewTarget();

    for (let i = 0; i < 3; i++) this.spawnLetter();

    this.updateHUD();
    this.lastTimestamp = performance.now();
    this.animationId = requestAnimationFrame((t) => this.gameLoop(t));
  }

  // ── Spawning ─────────────────────────────────────────────────
  private spawnLetter(): void {
    if (this.gameOver) return;
    if (this.letters.length >= MAX_LETTERS) return;

    const useTarget = Math.random() < 0.90;
    const char = useTarget ? this.currentTarget : randomFrom(ARABIC_ALPHABET);

    const sameCount = this.letters.filter(l => l.char === char).length;
    if (sameCount > 2) return;

    const x = randFloat(LETTER_RADIUS + 10, CANVAS_W - LETTER_RADIUS - 10);
    const speed = randFloat(FALL_SPEED_MIN, FALL_SPEED_MAX);

    this.letters.push({
      char,
      x,
      y: -LETTER_RADIUS - 10,
      speed,
      radius: LETTER_RADIUS,
      alive: true
    });
  }

  private spawnFire(from: Vector2, to: Vector2, count = 40): void {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy) || 1;
    const baseVx = (dx / dist) * 4.5;
    const baseVy = (dy / dist) * 4.5;

    for (let i = 0; i < count; i++) {
      const angleSpread = randFloat(-0.9, 0.9);
      const speedSpread = randFloat(2.5, 7.5);
      const spreadX = (Math.random() - 0.5) * 3;
      const spreadY = (Math.random() - 0.5) * 3;

      this.fireParticles.push({
        x: from.x + (Math.random() - 0.5) * 16,
        y: from.y + (Math.random() - 0.5) * 16,
        vx: baseVx + Math.sin(angleSpread) * speedSpread + spreadX,
        vy: baseVy + Math.cos(angleSpread) * speedSpread + spreadY,
        life: 1.0,
        maxLife: randFloat(0.5, 1.2),
        size: randFloat(5, 18),
        color: randomFrom(['#ff6a00', '#ff9a00', '#ffcc00', '#ff4400', '#ffdd55'])
      });
    }

    for (let i = 0; i < 12; i++) {
      this.fireParticles.push({
        x: from.x + (Math.random() - 0.5) * 10,
        y: from.y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 3,
        vy: -randFloat(2, 6),
        life: 1.0,
        maxLife: randFloat(0.2, 0.6),
        size: randFloat(4, 12),
        color: '#fffbe6'
      });
    }
  }

  private spawnExplosion(pos: Vector2, count = 30): void {
    for (let i = 0; i < count; i++) {
      const angle = randFloat(0, Math.PI * 2);
      const speed = randFloat(1.5, 6);
      this.particles.push({
        x: pos.x,
        y: pos.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        life: 1.0,
        maxLife: randFloat(0.5, 1.4),
        size: randFloat(4, 16),
        color: randomFrom(['#4fc3f7', '#29b6f6', '#03a9f4', '#81d4fa', '#b3e5fc'])
      });
    }
  }

  // ── Hit handling ─────────────────────────────────────────────
  private onCorrectHit(letter: LetterData): void {
    this.combo += 1;
    const bonus = Math.floor(this.combo / 3) * COMBO_BONUS;
    const points = BASE_POINTS + bonus;
    this.score += points;

    const from = { x: CANVAS_W / 2, y: SPACESHIP_Y - 10 };
    const to = { x: letter.x, y: letter.y };
    this.spawnFire(from, to, 50);
    this.spawnExplosion({ x: letter.x, y: letter.y }, 40);

    letter.alive = false;
    this.currentTarget = this.pickNewTarget();
    this.updateHUD();
  }

  private onWrongHit(letter: LetterData): void {
    this.combo = 0;
    for (let i = 0; i < 16; i++) {
      const angle = randFloat(0, Math.PI * 2);
      const speed = randFloat(1, 3.5);
      this.particles.push({
        x: letter.x,
        y: letter.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3,
        life: 1.0,
        maxLife: randFloat(0.4, 0.9),
        size: randFloat(4, 10),
        color: '#ff1744'
      });
    }
    this.updateHUD();
  }

  private handleTap(clientX: number, clientY: number): void {
    if (this.gameOver) return;

    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const canvasX = (clientX - rect.left) * scaleX;
    const canvasY = (clientY - rect.top) * scaleY;

    for (let i = this.letters.length - 1; i >= 0; i--) {
      const l = this.letters[i];
      if (!l.alive) continue;
      const dx = canvasX - l.x;
      const dy = canvasY - l.y;
      const dist = Math.hypot(dx, dy);
      if (dist < l.radius + 8) {
        if (l.char === this.currentTarget) {
          this.onCorrectHit(l);
        } else {
          this.onWrongHit(l);
        }
        return;
      }
    }
  }

  private updateHUD(): void {
    this.scoreEl.textContent = String(this.score);
    this.comboEl.textContent = String(this.combo);
    this.targetLetterEl.textContent = this.currentTarget;
  }

  // ── Game loop ────────────────────────────────────────────────
  private gameLoop(timestamp: number): void {
    if (this.gameOver) {
      this.render();
      return;
    }

    const dt = Math.min((timestamp - this.lastTimestamp) / 16.667, 3);
    this.lastTimestamp = timestamp;

    this.spawnTimer += dt;
    if (this.spawnTimer >= SPAWN_INTERVAL_MS / 16.667) {
      this.spawnTimer = 0;
      this.spawnLetter();
      if (Math.random() < 0.30) this.spawnLetter();
    }

    for (const l of this.letters) {
      if (!l.alive) continue;
      l.y += l.speed * dt;
      if (l.y > CANVAS_H + 60) {
        if (l.char === this.currentTarget) {
          this.gameOver = true;
          for (let i = 0; i < 40; i++) {
            this.particles.push({
              x: l.x,
              y: CANVAS_H - 20,
              vx: (Math.random() - 0.5) * 8,
              vy: -randFloat(2, 7),
              life: 1.0,
              maxLife: randFloat(0.8, 1.8),
              size: randFloat(4, 14),
              color: '#ff6b6b'
            });
          }
          this.updateHUD();
          this.render();
          return;
        } else {
          l.alive = false;
        }
      }
    }

    this.letters = this.letters.filter(l => l.alive);

    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 0.08 * dt;
      p.life -= dt / p.maxLife / 1.6;
    }
    this.particles = this.particles.filter(p => p.life > 0);

    for (const p of this.fireParticles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 0.04 * dt;
      p.life -= dt / p.maxLife / 1.8;
      p.size *= 0.995;
    }
    this.fireParticles = this.fireParticles.filter(p => p.life > 0 && p.size > 0.5);

    this.render();
    this.animationId = requestAnimationFrame((t) => this.gameLoop(t));
  }

  // ── Rendering ────────────────────────────────────────────────
  private render(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background stars
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 100; i++) {
      const sx = (i * 137.5 + 42) % CANVAS_W;
      const sy = (i * 97.3 + 13) % CANVAS_H;
      const size = ((i * 31) % 3) + 1;
      ctx.beginPath();
      ctx.arc(sx, sy, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Floating letters
    for (const l of this.letters) {
      if (!l.alive) continue;
      const isTarget = l.char === this.currentTarget;

      const grad = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, l.radius + 14);
      if (isTarget) {
        grad.addColorStop(0, 'rgba(0, 200, 255, 0.25)');
        grad.addColorStop(1, 'rgba(0, 200, 255, 0)');
      } else {
        grad.addColorStop(0, 'rgba(255, 100, 100, 0.15)');
        grad.addColorStop(1, 'rgba(255, 100, 100, 0)');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.radius + 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = isTarget ? 'rgba(0, 200, 255, 0.5)' : 'rgba(255, 100, 100, 0.2)';
      ctx.shadowBlur = isTarget ? 30 : 12;

      const bgGrad = ctx.createRadialGradient(l.x - 8, l.y - 10, 4, l.x, l.y, l.radius);
      if (isTarget) {
        bgGrad.addColorStop(0, '#1a3a5a');
        bgGrad.addColorStop(0.7, '#0d1f33');
        bgGrad.addColorStop(1, '#06101c');
      } else {
        bgGrad.addColorStop(0, '#4a1a2a');
        bgGrad.addColorStop(0.7, '#2a0f1a');
        bgGrad.addColorStop(1, '#15080c');
      }
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = isTarget ? 'rgba(0, 220, 255, 0.7)' : 'rgba(255, 120, 120, 0.4)';
      ctx.lineWidth = isTarget ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.radius, 0, Math.PI * 2);
      ctx.stroke();

      if (isTarget) {
        ctx.strokeStyle = 'rgba(0, 220, 255, 0.25)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.radius + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.shadowBlur = 0;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${l.radius * 1.2}px "Arial", "Segoe UI", sans-serif`;
      ctx.fillStyle = isTarget ? '#e8f8ff' : '#ffd0d0';
      ctx.shadowColor = isTarget ? 'rgba(0,200,255,0.6)' : 'rgba(255,100,100,0.3)';
      ctx.shadowBlur = 16;
      ctx.fillText(l.char, l.x, l.y + 2);
      ctx.shadowBlur = 0;

      if (isTarget) {
        ctx.font = '12px sans-serif';
        ctx.fillStyle = 'rgba(0, 220, 255, 0.7)';
        ctx.textBaseline = 'bottom';
        ctx.fillText('\u{1F3AF}', l.x, l.y - l.radius - 6);
      }
    }

    // Spaceship
    const shipX = CANVAS_W / 2;
    const shipY = SPACESHIP_Y;

    const glow = ctx.createRadialGradient(shipX, shipY + 16, 4, shipX, shipY + 24, 50);
    glow.addColorStop(0, 'rgba(0, 180, 255, 0.35)');
    glow.addColorStop(0.6, 'rgba(0, 100, 255, 0.12)');
    glow.addColorStop(1, 'rgba(0, 50, 255, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(shipX, shipY + 24, 60, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = 'rgba(0, 150, 255, 0.3)';
    ctx.shadowBlur = 30;

    const hullGrad = ctx.createLinearGradient(shipX, shipY - 20, shipX, shipY + 12);
    hullGrad.addColorStop(0, '#3a7bd5');
    hullGrad.addColorStop(0.5, '#2a5fa8');
    hullGrad.addColorStop(1, '#1a3f7a');
    ctx.fillStyle = hullGrad;
    ctx.beginPath();
    ctx.ellipse(shipX, shipY, 60, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const domeGrad = ctx.createRadialGradient(shipX - 12, shipY - 20, 4, shipX, shipY - 8, 24);
    domeGrad.addColorStop(0, '#6aafff');
    domeGrad.addColorStop(0.7, '#2a7fd5');
    domeGrad.addColorStop(1, '#1a4f8a');
    ctx.fillStyle = domeGrad;
    ctx.beginPath();
    ctx.ellipse(shipX, shipY - 8, 34, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(150, 220, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const cockpit = ctx.createRadialGradient(shipX - 6, shipY - 14, 2, shipX, shipY - 8, 14);
    cockpit.addColorStop(0, 'rgba(180, 240, 255, 0.6)');
    cockpit.addColorStop(0.5, 'rgba(60, 180, 255, 0.2)');
    cockpit.addColorStop(1, 'rgba(0, 80, 200, 0)');
    ctx.fillStyle = cockpit;
    ctx.beginPath();
    ctx.ellipse(shipX, shipY - 8, 22, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 32px "Arial", "Segoe UI", sans-serif';
    ctx.fillStyle = '#e8f8ff';
    ctx.shadowColor = 'rgba(0, 200, 255, 0.8)';
    ctx.shadowBlur = 24;
    ctx.fillText(this.currentTarget, shipX, shipY - 6);
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(100, 200, 255, 0.15)';
    ctx.beginPath();
    ctx.rect(shipX - 12, shipY - 24, 24, 6);
    ctx.fill();

    // Fire particles
    for (const p of this.fireParticles) {
      const alpha = Math.max(0, p.life);
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 20;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.life * 0.8), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Explosion particles
    for (const p of this.particles) {
      const alpha = Math.max(0, p.life);
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.life * 0.9), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Game over overlay
    if (this.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 52px "Segoe UI", sans-serif';
      ctx.fillStyle = '#ff6b6b';
      ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
      ctx.shadowBlur = 40;
      ctx.fillText('\u{1F4A5} Game Over', CANVAS_W / 2, CANVAS_H / 2 - 20);

      ctx.font = '24px "Segoe UI", sans-serif';
      ctx.fillStyle = '#b8d0f0';
      ctx.shadowBlur = 10;
      ctx.fillText(`Score: ${this.score}  \u2022  Combo: ${this.combo}`, CANVAS_W / 2, CANVAS_H / 2 + 50);

      ctx.font = '18px "Segoe UI", sans-serif';
      ctx.fillStyle = '#8899bb';
      ctx.fillText('Click "Restart" to try again', CANVAS_W / 2, CANVAS_H / 2 + 100);
      ctx.shadowBlur = 0;
    }

    if (!this.gameOver) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.font = '14px "Segoe UI", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillText('Click the letter that matches the one on your ship', CANVAS_W / 2, CANVAS_H - 6);
    }
  }
}
