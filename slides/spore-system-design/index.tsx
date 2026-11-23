import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useSlidePageNumber,
} from '@open-slide/core';
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import poster from './assets/poster-02.jpg';
import qr from './assets/qr-mobile.png';
import qrMv3 from './assets/qr-mv3.png';
import qrGui from './assets/qr-gui.png';
import videoUrl from './assets/spore-v2-final.mp4';

export const design: DesignSystem = {
  palette: { bg: '#F7F4EF', text: '#171A21', accent: '#EC4899' },
  fonts: {
    display:
      '"Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC", system-ui, sans-serif',
    body: '"Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC", system-ui, sans-serif',
  },
  typeScale: { hero: 168, body: 34 },
  radius: 10,
};

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const transition: SlideTransition = {
  duration: 220,
  easing: EASE,
  enter: {
    duration: 220,
    easing: EASE,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const snap: SlideTransition = {
  duration: 0,
  enter: { duration: 0, keyframes: [{ opacity: 1 }, { opacity: 1 }] },
};

const C = {
  ink: '#171A21',
  muted: '#6B6F78',
  rule: '#DDD6CC',
  accent: '#EC4899',
  accentSoft: '#FBE3EF',
  teal: '#0F766E',
  blue: '#2F6FED',
  amber: '#B45309',
  green: '#047857',
  white: '#FFFFFF',
  paper2: '#F1ECE4',
  tintBlue: '#EAF0FD',
  tintAmber: '#FAEFE3',
  tintGreen: '#E7F2EE',
};

const F = {
  body: '"Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC", system-ui, sans-serif',
  mono: 'Consolas, "Cascadia Mono", monospace',
};

const mono = (size = 22): CSSProperties => ({ fontFamily: F.mono, fontSize: size });
const num = (n: number) => String(n).padStart(2, '0');

const base: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  boxSizing: 'border-box',
};

const pagePad: CSSProperties = { padding: '64px 120px 0' };

const Folio = ({ label = 'Spore Mobile · 系统详细设计', dark = false }: { label?: string; dark?: boolean }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 32,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 22,
        color: dark ? 'rgba(255,255,255,0.52)' : C.muted,
      }}
    >
      <span>{label}</span>
      <span style={{ fontFamily: F.mono }}>
        {num(current)} / {num(total)}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontSize: 24,
      letterSpacing: '0.16em',
      fontWeight: 600,
      color: C.accent,
    }}
  >
    {children}
  </div>
);

const Title = ({ children, size = 64 }: { children: ReactNode; size?: number }) => (
  <h1
    style={{
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.12,
      margin: '18px 0 0',
      letterSpacing: '-0.01em',
    }}
  >
    {children}
  </h1>
);

const Lead = ({ children }: { children: ReactNode }) => (
  <p style={{ fontSize: 30, lineHeight: 1.5, color: C.muted, margin: '16px 0 0' }}>
    {children}
  </p>
);

const Card = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      background: C.white,
      border: `1.5px solid ${C.rule}`,
      borderRadius: 14,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

const BceGlyph = ({
  kind,
  size = 108,
  color,
}: {
  kind: 'boundary' | 'control' | 'entity';
  size?: number;
  color?: string;
}) => {
  const stroke = color ?? (kind === 'boundary' ? C.blue : kind === 'control' ? C.amber : C.green);
  return (
    <svg width={size} height={size} viewBox="-60 -60 120 120" aria-hidden="true">
      <circle cx={0} cy={0} r={40} fill="none" stroke={stroke} strokeWidth={2.6} />
      {kind === 'boundary' && (
        <line x1={-46} y1={-22} x2={-46} y2={22} stroke={stroke} strokeWidth={2.6} />
      )}
      {kind === 'control' && (
        <>
          <path d="M 26 -31 A 40 40 0 0 0 -24 -32" fill="none" stroke={stroke} strokeWidth={2.6} />
          <polygon points="-24,-32 -35,-27 -24,-21" fill={stroke} />
        </>
      )}
      {kind === 'entity' && (
        <line x1={-40} y1={44} x2={40} y2={44} stroke={stroke} strokeWidth={2.6} />
      )}
    </svg>
  );
};

const LabelBox = ({
  kind,
  title,
  en,
  duty,
  height = 198,
}: {
  kind: 'boundary' | 'control' | 'entity';
  title: string;
  en: string;
  duty: string;
  height?: number;
}) => {
  const tint = kind === 'boundary' ? C.tintBlue : kind === 'control' ? C.tintAmber : C.tintGreen;
  const color = kind === 'boundary' ? C.blue : kind === 'control' ? C.amber : C.green;
  return (
    <div
      style={{
        border: `2px solid ${C.ink}`,
        background: C.white,
        height,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: tint,
          borderBottom: `1.5px solid ${C.ink}`,
          padding: '8px 16px 10px',
        }}
      >
        <div style={{ ...mono(19), color }}>{`<<${kind}>>`}</div>
        <div style={{ fontSize: 33, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
      </div>
      <div
        style={{
          padding: '5px 16px',
          borderBottom: `1.5px solid ${C.ink}`,
          ...mono(15),
          color: C.muted,
        }}
      >
        {en}
      </div>
      <div style={{ padding: '10px 16px', fontSize: 23, lineHeight: 1.35 }}>{duty}</div>
    </div>
  );
};

const Dot = ({ color }: { color: string }) => (
  <span
    style={{
      display: 'inline-block',
      width: 12,
      height: 12,
      borderRadius: 6,
      background: color,
      marginRight: 10,
    }}
  />
);

const Arrow = ({
  x1,
  y1,
  x2,
  y2,
  dashed,
  marker = 'seqArrow',
  color = C.ink,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  marker?: string;
  color?: string;
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke={color}
    strokeWidth={1.8}
    strokeDasharray={dashed ? '7 6' : undefined}
    markerEnd={`url(#${marker})`}
  />
);

/* ------------------------------------------------------------------ P01 */

const SporeMark = () => (
  <svg width={460} height={460} viewBox="0 0 460 460" aria-hidden="true">
    <circle cx={230} cy={230} r={196} fill="none" stroke={C.rule} strokeWidth={2} />
    <circle cx={230} cy={230} r={150} fill="none" stroke={C.rule} strokeWidth={2} />
    <circle cx={230} cy={230} r={104} fill="none" stroke={C.accentSoft} strokeWidth={10} />
    <circle cx={230} cy={230} r={104} fill="none" stroke={C.accent} strokeWidth={2} />
    <circle cx={230} cy={230} r={40} fill={C.accent} opacity={0.9} />
    <circle cx={230} cy={230} r={12} fill={C.white} />
  </svg>
);

const Cover: Page = () => (
  <div style={{ ...base, display: 'flex', alignItems: 'center', padding: '0 150px', gap: 60 }}>
    <div style={{ flex: 1 }}>
      <Eyebrow>信息系统 · 作业10 · 系统详细设计</Eyebrow>
      <div
        style={{ fontSize: 196, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.035em', margin: '26px 0 16px', translate: '-20.63px -26px' }}
      >
        Spore
      </div>
      <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.22 }}>
        手机端截图搜题系统
        <br />
        详细设计
      </div>
      <div style={{ marginTop: 34, fontSize: 27, color: C.muted }}>
        BCE 抽取 · PIM 类图 · 接口契约 · E-R 与数据表 · UI 原型
      </div>
      <div style={{ marginTop: 74, fontSize: 24, color: C.muted }}>2026-12-07 第32组</div>
    </div>
    <SporeMark />
  </div>
);

/* ------------------------------------------------------------------ P02 */

const Glance: Page = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'idle' | 'playing' | 'paused' | 'ended'>('idle');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm' && ref.current) {
        ref.current.muted = !ref.current.muted;
        setIsMuted(ref.current.muted);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    setIsMuted(false);
    void v.play();
    setState('playing');
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) play();
    else {
      v.pause();
      setState('paused');
    }
  };

  return (
    <div style={{ ...base, background: '#000' }}>
      <video
        ref={ref}
        src={videoUrl}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={toggle}
        onEnded={() => setState('ended')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 52,
          top: 38,
          fontSize: 22,
          color: 'rgba(255,255,255,0.94)',
          letterSpacing: '0.06em',
          background: 'rgba(0,0,0,0.42)',
          borderRadius: 20,
          padding: '6px 14px',
        }}
      >
        Spore · 产品演示 · 1′27″
      </div>
      {state !== 'playing' && state !== 'ended' && (
        <button
          onClick={play}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 116,
            height: 116,
            borderRadius: 58,
            background: 'rgba(10,10,10,0.42)',
            border: `3px solid ${C.accent}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="播放"
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '25px solid transparent',
              borderBottom: '25px solid transparent',
              borderLeft: `40px solid ${C.white}`,
              marginLeft: 10,
            }}
          />
        </button>
      )}
      {state === 'idle' && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(50% + 92px)',
            transform: 'translateX(-50%)',
            fontSize: 24,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          点击播放（有声）
        </div>
      )}
      {state === 'ended' && (
        <div
          style={{
            position: 'absolute',
            right: 60,
            bottom: 52,
            fontSize: 30,
            color: C.white,
            borderBottom: `2px solid ${C.accent}`,
            paddingBottom: 6,
          }}
        >
          继续 →
        </div>
      )}
      {state === 'playing' && (
        <div style={{ position: 'absolute', right: 44, bottom: 30, display: 'flex', alignItems: 'center', gap: 18 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const v = ref.current;
              if (!v) return;
              v.muted = !v.muted;
              setIsMuted(v.muted);
            }}
            style={{
              background: 'rgba(0,0,0,0.5)',
              color: C.white,
              border: '1.5px solid rgba(255,255,255,0.5)',
              borderRadius: 20,
              padding: '7px 16px',
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            声音：{isMuted ? '关' : '开'}
          </button>
          <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.62)' }}>M 静音 · 点击画面暂停</span>
        </div>
      )}
    </div>
  );
};
Glance.transition = snap;

/* ------------------------------------------------------------------ P03 */

const Scope: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>01 · 边界</Eyebrow>
    <Title>手机是主系统，其他端只是换了一层壳</Title>
    <div style={{ display: 'flex', gap: 36, marginTop: 26 }}>
      <Card style={{ width: 1120, height: 720, padding: 10 }}>
        <svg width={1100} height={700} viewBox="0 0 1100 700">
          <defs>
            <marker id="scopeArrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill={C.muted} />
            </marker>
          </defs>
          <rect x={330} y={240} width={420} height={240} rx={18} fill={C.tintBlue} stroke={C.blue} strokeWidth={2.5} />
          <text x={540} y={286} textAnchor="middle" fontSize={30} fontWeight={800} fill={C.ink} fontFamily={F.body}>
            Spore 手机端
          </text>
          {['悬浮球', '框选', '抽屉作答', '记录'].map((t, i) => (
            <g key={t}>
              <rect x={347 + i * 100} y={320} width={86} height={40} rx={20} fill={C.white} stroke={C.rule} />
              <text x={390 + i * 100} y={347} textAnchor="middle" fontSize={19} fill={C.ink} fontFamily={F.body}>
                {t}
              </text>
            </g>
          ))}
          <text x={540} y={410} textAnchor="middle" fontSize={20} fill={C.muted} fontFamily={F.body}>
            所有数据先落本机；同步是可选项
          </text>

          <circle cx={110} cy={360} r={46} fill={C.accentSoft} stroke={C.accent} strokeWidth={2.5} />
          <text x={110} y={428} textAnchor="middle" fontSize={22} fill={C.ink} fontFamily={F.body}>
            学生
          </text>
          <Arrow x1={160} y1={360} x2={326} y2={360} marker="scopeArrow" color={C.muted} />

          <rect x={840} y={170} width={220} height={86} rx={12} fill={C.white} stroke={C.ink} strokeWidth={2} />
          <text x={950} y={206} textAnchor="middle" fontSize={22} fill={C.ink} fontFamily={F.body}>
            大模型 API
          </text>
          <text x={950} y={236} textAnchor="middle" fontSize={17} fill={C.muted} fontFamily={F.body}>
            初答 / 追问 / 核实
          </text>
          <Arrow x1={754} y1={250} x2={836} y2={210} marker="scopeArrow" color={C.muted} />

          <rect x={840} y={330} width={220} height={86} rx={12} fill={C.paper2} stroke={C.teal} strokeWidth={2} strokeDasharray="8 6" />
          <text x={950} y={366} textAnchor="middle" fontSize={22} fill={C.ink} fontFamily={F.body}>
            Spore-Cloud
          </text>
          <text x={950} y={396} textAnchor="middle" fontSize={17} fill={C.muted} fontFamily={F.body}>
            可选 · 手动同步
          </text>
          <Arrow x1={754} y1={362} x2={836} y2={372} marker="scopeArrow" color={C.teal} dashed />

          {['录屏授权', '相册 / 文件', '通知'].map((t, i) => (
            <g key={t}>
              <rect x={310 + i * 170} y={600} width={150} height={46} rx={23} fill={C.white} stroke={C.rule} />
              <text x={385 + i * 170} y={630} textAnchor="middle" fontSize={19} fill={C.ink} fontFamily={F.body}>
                {t}
              </text>
            </g>
          ))}
          <Arrow x1={540} y1={596} x2={540} y2={486} marker="scopeArrow" color={C.muted} dashed />

          <rect x={600} y={40} width={200} height={62} rx={10} fill={C.white} stroke={C.muted} strokeWidth={1.6} strokeDasharray="7 5" />
          <text x={700} y={78} textAnchor="middle" fontSize={19} fill={C.muted} fontFamily={F.body}>
            MV3 扩展
          </text>
          <rect x={830} y={40} width={200} height={62} rx={10} fill={C.white} stroke={C.muted} strokeWidth={1.6} strokeDasharray="7 5" />
          <text x={930} y={78} textAnchor="middle" fontSize={19} fill={C.muted} fontFamily={F.body}>
            桌面 GUI
          </text>
          <text x={1010} y={130} textAnchor="end" fontSize={17} fill={C.muted} fontFamily={F.body}>
            同一套实体与交互
          </text>
          <path d="M 700 106 C 700 160, 620 170, 570 236" fill="none" stroke={C.rule} strokeWidth={1.6} strokeDasharray="6 6" />
          <path d="M 930 106 C 930 160, 760 180, 700 236" fill="none" stroke={C.rule} strokeWidth={1.6} strokeDasharray="6 6" />
        </svg>
      </Card>
      <div style={{ width: 664, paddingTop: 8 }}>
        {[
          ['1', '不打断', '球在屏幕上，点一下就能框选；答案从底部滑出，不跳应用。'],
          ['2', '可追溯', '每次作答落成一条会话，保留题图、初答、核实与检索小票。'],
          ['3', '可迁移', '本机 JSON 文件即可用；云端同步是可选增强。'],
        ].map(([n, t, d]) => (
          <div key={n} style={{ display: 'flex', gap: 18, marginBottom: 26 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: C.accent, width: 34 }}>{n}</div>
            <div>
              <div style={{ fontSize: 31, fontWeight: 700 }}>{t}</div>
              <div style={{ fontSize: 25, lineHeight: 1.5, color: C.muted, marginTop: 6 }}>{d}</div>
            </div>
          </div>
        ))}
        <div style={{ borderTop: `1.5px solid ${C.rule}`, paddingTop: 18, marginTop: 8 }}>
          <div style={{ fontSize: 23, color: C.muted, lineHeight: 1.55 }}>
            <b style={{ color: C.ink }}>不做：</b>题库检索、本地 OCR、模型训练。
          </div>
          <div style={{ fontSize: 23, color: C.muted, lineHeight: 1.55, marginTop: 10 }}>
            <b style={{ color: C.ink }}>另外两端：</b>MV3 与 GUI 复用同一套字段和文案，不单独设计。
          </div>
        </div>
      </div>
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P04 */

const BceMethod: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>02 · 方法</Eyebrow>
    <Title>BCE 怎么抽：三条识别规则</Title>
    <Steps>
      <Step>
        <div style={{ display: 'flex', gap: 30, marginTop: 22 }}>
          {[
            ['用户看得见、点得到', '边界类', C.blue, 'boundary'],
            ['点一下之后后台跑的流程', '控制类', C.amber, 'control'],
            ['关掉应用也要留下的数据', '实体类', C.green, 'entity'],
          ].map(([desc, name, color, kind]) => (
            <Card key={name as string} style={{ width: 520, height: 150, padding: '18px 22px', display: 'flex', gap: 18, alignItems: 'center' }}>
              <BceGlyph kind={kind as 'boundary'} size={82} color={color as string} />
              <div>
                <div style={{ fontSize: 30, fontWeight: 800 }}>{name as string}</div>
                <div style={{ fontSize: 21, color: C.muted, marginTop: 6 }}>{desc as string}</div>
              </div>
            </Card>
          ))}
        </div>
      </Step>
      <Step>
        <div style={{ display: 'flex', gap: 30, marginTop: 24 }}>
          {[
            ['边界', C.blue, 'boundary', ['悬浮球', '框选层', '答题抽屉', '记录页', '扫码页', '设置页'], '6'],
            ['控制', C.amber, 'control', ['截图服务', '答题引擎', '会话仓库', '科目仓库', '同步引擎', '检索工具链'], '6'],
            ['实体', C.green, 'entity', ['会话', '消息', '核实记录', '科目', '题图', '删除墓碑', '同步状态', '设置'], '8'],
          ].map(([name, color, kind, items, count]) => (
            <Card key={name as string} style={{ width: 520, height: 450, padding: '22px 24px', borderTop: `5px solid ${color as string}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <BceGlyph kind={kind as 'boundary'} size={70} color={color as string} />
                <div style={{ fontSize: 62, fontWeight: 900, color: color as string, lineHeight: 1 }}>{count as string}</div>
                <div style={{ fontSize: 26, color: C.muted }}>{name as string}类</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 12px', marginTop: 22 }}>
                {(items as string[]).map((t) => (
                  <div key={t} style={{ fontSize: 22, color: C.ink, display: 'flex', alignItems: 'center' }}>
                    <Dot color={color as string} />
                    {t}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Step>
      <Step>
        <div style={{ marginTop: 18, fontSize: 26, color: C.muted }}>
          所以呢：先按用户视角分三堆，再谈类图；三堆混在一起，后面每张图都会互相打架。
        </div>
      </Step>
    </Steps>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P05 */

const BceBoundary: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>03 · 边界类</Eyebrow>
    <Title>用户碰得到的六个面</Title>
    <div style={{ position: 'absolute', right: 120, top: 92, display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, color: C.muted }}>
      <BceGlyph kind="boundary" size={54} />
      Label 形式
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 34px', marginTop: 26 }}>
      <LabelBox kind="boundary" title="悬浮球" en="BallView" duty="常驻屏幕上；点一下取帧，长按可拖。" />
      <LabelBox kind="boundary" title="框选层" en="CropOverlayView" duty="冻结画面、拖框、确认或取消。" />
      <LabelBox kind="boundary" title="答题抽屉" en="AnswerPanel" duty="从底部滑出，显示流式回答与追问。" />
      <LabelBox kind="boundary" title="记录页" en="RecordActivity" duty="科目筛选、长列表、多选批量。" />
      <LabelBox kind="boundary" title="扫码页" en="QrLoginActivity" duty="扫配对码，拿局域网令牌。" />
      <LabelBox kind="boundary" title="设置页" en="SettingsActivity" duty="模型、外观、同步、日志入口。" />
    </div>
    <div style={{ marginTop: 22, fontSize: 26, color: C.muted }}>
      所以呢：界面只负责「显示」和「把点击转出去」，不判断业务，也不直接读写文件。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P06 */

const BceControl: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>03 · 控制类</Eyebrow>
    <Title>一次点击之后的六条流程</Title>
    <div style={{ position: 'absolute', right: 120, top: 92, display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, color: C.muted }}>
      <BceGlyph kind="control" size={54} />
      Label 形式
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 34px', marginTop: 26 }}>
      <LabelBox kind="control" title="截图服务" en="CaptureService" duty="常驻取帧、冻结画面、裁剪落盘。" />
      <LabelBox kind="control" title="答题引擎" en="AgentEngine" duty="初答 → 联网核实，支持追问与取消。" />
      <LabelBox kind="control" title="会话仓库" en="SessionStore" duty="一会话一文件，读写、删除、元数据。" />
      <LabelBox kind="control" title="科目仓库" en="SubjectsStore" duty="科目表的增删改，整表原子写。" />
      <LabelBox kind="control" title="同步引擎" en="SyncEngine" duty="本机改动推上去，别处改动拉回来。" />
      <LabelBox kind="control" title="检索工具链" en="SearchChain" duty="需要时查资料，给结论标来源。" />
    </div>
    <div style={{ marginTop: 22, fontSize: 26, color: C.muted }}>
      所以呢：同步引擎可以整体关掉，界面和数据都不变——这就是「单机也能用」的原因。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P07 */

const BceEntity: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>03 · 实体类</Eyebrow>
    <Title>关掉应用也要留下的八样东西</Title>
    <div style={{ position: 'absolute', right: 120, top: 92, display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, color: C.muted }}>
      <BceGlyph kind="entity" size={54} />
      Label 形式
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '22px 26px', marginTop: 24 }}>
      {[
        ['会话', 'Session', '一次搜题的完整对话与状态'],
        ['消息', 'Message', '会话里的一句提问或回答'],
        ['核实记录', 'Verification', '哪些结论查过、来源和结论'],
        ['科目', 'Subject', '会话的文件夹（v1 平铺）'],
        ['题图', 'Attachment', '框选出来的那张图'],
        ['删除墓碑', 'Tombstone', '删掉的东西的「死亡证明」'],
        ['同步状态', 'SyncState', '账号、两个书签、上次结果'],
        ['设置', 'Settings', '模型、外观、同步开关'],
      ].map(([zh, en, duty]) => (
        <div
          key={en}
          style={{
            height: 238,
            border: `2px solid ${C.ink}`,
            background: C.white,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ background: C.tintGreen, borderBottom: `1.5px solid ${C.ink}`, padding: '8px 14px' }}>
            <div style={{ ...mono(17), color: C.green }}>{'<<entity>>'}</div>
            <div style={{ fontSize: 30, fontWeight: 800 }}>{zh}</div>
          </div>
          <div style={{ ...mono(15), color: C.muted, padding: '5px 14px', borderBottom: `1.5px solid ${C.ink}` }}>{en}</div>
          <div style={{ padding: '9px 14px', fontSize: 22, lineHeight: 1.35 }}>{duty}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 20, fontSize: 25, color: C.muted }}>
      所以呢：实体只留「关掉也要在」的东西；选中态、红点这些临时状态不算实体。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P08 */

const Sequence: Page = () => {
  const actors = ['学生', '悬浮球', '截图服务', '框选层', '答题引擎', '答题抽屉', '会话仓库', '联网核实', '同步（可选）'];
  const steps = [
    '打开悬浮球（首次授权录屏，只授一次）',
    '点球，截图服务直接取一帧，不弹确认',
    '画面冻结，交给框选层',
    '拖框确认，裁剪成题目图',
    '答题引擎接手，把题目图交给模型',
    '抽屉从底部滑出，答案逐字显示',
    '需要时联网核实，并标注来源',
    '会话落盘：先占位，再补全，自动起名',
    '追问或核实写回同一会话；配对后才可同步',
  ];
  return (
    <div style={{ ...base, ...pagePad }}>
      <Eyebrow>04 · 协作</Eyebrow>
      <Title>一次搜题，手机里发生了什么</Title>
      <div style={{ display: 'flex', gap: 26, marginTop: 18 }}>
        <svg width={1330} height={840} viewBox="0 0 1330 840">
          <defs>
            <marker id="seqArrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill={C.ink} />
            </marker>
          </defs>
          {actors.map((a, i) => {
            const x = 70 + i * 145;
            return (
              <g key={a}>
                <rect x={x - 68} y={0} width={136} height={54} rx={8} fill={C.white} stroke={C.ink} strokeWidth={1.6} />
                <text x={x} y={35} textAnchor="middle" fontSize={19} fill={C.ink} fontFamily={F.body}>
                  {a}
                </text>
                <line x1={x} y1={54} x2={x} y2={820} stroke={C.rule} strokeWidth={1.4} strokeDasharray="6 7" />
              </g>
            );
          })}
          {steps.map((s, i) => {
            const y = 150 + i * 70;
            const pairs: [number, number][] = [
              [0, 1],
              [1, 2],
              [2, 3],
              [3, 4],
              [4, 5],
              [4, 5],
              [4, 7],
              [4, 6],
              [6, 8],
            ];
            const [from, to] = pairs[i];
            const x1 = 70 + from * 145;
            const x2 = 70 + to * 145;
            return (
              <g key={s}>
                <line x1={x1 + (x2 > x1 ? 10 : -10)} y1={y} x2={x2 + (x2 > x1 ? -10 : 10)} y2={y} stroke={C.ink} strokeWidth={1.8} markerEnd="url(#seqArrow)" />
                <circle cx={x1} cy={y} r={13} fill={C.accent} />
                <text x={x1} y={y + 6} textAnchor="middle" fontSize={14} fill={C.white} fontFamily={F.mono}>
                  {i + 1}
                </text>
              </g>
            );
          })}
          <text x={725} y={806} textAnchor="middle" fontSize={22} fill={C.muted} fontFamily={F.body}>
            图 1　一次搜题，手机里发生了什么（成功路径）
          </text>
        </svg>
        <div style={{ width: 312, paddingTop: 4 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ ...mono(18), color: C.accent, width: 22, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 20, lineHeight: 1.38 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <Folio />
    </div>
  );
};

/* ------------------------------------------------------------------ P09 */

const ClassBox = ({
  x,
  y,
  w,
  h,
  zh,
  en,
  tint,
  attrs,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  zh: string;
  en: string;
  tint: string;
  attrs: string[];
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={8} fill={C.white} stroke={C.ink} strokeWidth={2} />
    <path d={`M ${x} ${y + 56} L ${x + w} ${y + 56}`} stroke={C.ink} strokeWidth={1.6} />
    <rect x={x} y={y} width={w} height={56} rx={8} fill={tint} />
    <text x={x + 14} y={y + 26} fontSize={24} fontWeight={700} fill={C.ink} fontFamily={F.body}>
      {zh}
    </text>
    <text x={x + 14} y={y + 47} fontSize={14} fill={C.muted} fontFamily={F.mono}>
      {en}
    </text>
    {attrs.map((a, i) => (
      <text key={a} x={x + 14} y={y + 82 + i * 24} fontSize={17} fill={C.ink} fontFamily={F.mono}>
        {a}
      </text>
    ))}
  </g>
);

const PimClass: Page = () => (
  <div style={{ ...base, padding: '52px 120px 0' }}>
    <Eyebrow>05 · 类模型</Eyebrow>
    <Title size={56}>PIM 类模型（移动端）</Title>
    <Steps>
      <Step>
        <svg width={1680} height={860} viewBox="0 0 1680 860">
          <defs>
            <marker id="pimArrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill={C.ink} />
            </marker>
          </defs>
          <ClassBox x={140} y={40} w={420} h={148} zh="科目" en="Subject" tint={C.tintGreen} attrs={['name', 'parentId', 'sortOrder']} />
          <ClassBox x={140} y={218} w={420} h={196} zh="会话" en="Session" tint={C.tintGreen} attrs={['subjectId', 'title', 'status', 'fav', 'updated / touched']} />
          <ClassBox x={140} y={452} w={420} h={172} zh="消息" en="Message" tint={C.tintGreen} attrs={['role', 'kind', 'text', 'ts']} />

          <ClassBox x={700} y={40} w={400} h={148} zh="核实记录" en="Verification" tint={C.tintGreen} attrs={['verdict', 'note', 'tools']} />
          <ClassBox x={700} y={244} w={400} h={140} zh="题图" en="Attachment" tint={C.tintGreen} attrs={['path', 'mime', 'size']} />
          <ClassBox x={700} y={452} w={400} h={140} zh="删除墓碑" en="Tombstone" tint={C.tintGreen} attrs={['kind', 'targetId', 'ts']} />

          <ClassBox x={1240} y={80} w={420} h={172} zh="同步状态" en="SyncState" tint={C.paper2} attrs={['uid', 'pullCursor', 'pushCursor', 'lastSyncAt']} />
          <ClassBox x={1240} y={318} w={420} h={148} zh="设置" en="Settings" tint={C.paper2} attrs={['endpoint', 'model', 'theme']} />

          <path d="M 140 110 C 110 110, 110 18, 190 18 L 190 36" fill="none" stroke={C.ink} strokeWidth={1.8} markerEnd="url(#pimArrow)" />
          <text x={40} y={116} fontSize={16} fill={C.muted} fontFamily={F.mono}>parentId</text>

          <line x1={350} y1={188} x2={350} y2={214} stroke={C.ink} strokeWidth={1.8} markerEnd="url(#pimArrow)" />
          <text x={360} y={206} fontSize={16} fill={C.muted} fontFamily={F.mono}>1 : 0..*</text>

          <polygon points="350,414 362,404 374,414 362,424" fill={C.ink} />
          <line x1={350} y1={424} x2={350} y2={448} stroke={C.ink} strokeWidth={1.8} />
          <text x={380} y={432} fontSize={16} fill={C.muted} fontFamily={F.mono}>1 : 1..*</text>

          <path d="M 560 526 L 620 526 L 620 114 L 696 114" fill="none" stroke={C.ink} strokeWidth={1.8} markerEnd="url(#pimArrow)" />
          <text x={628} y={150} fontSize={16} fill={C.muted} fontFamily={F.mono}>0..1</text>

          <path d="M 560 486 L 660 486 L 660 314 L 696 314" fill="none" stroke={C.ink} strokeWidth={1.8} markerEnd="url(#pimArrow)" />
          <text x={604} y={356} fontSize={16} fill={C.muted} fontFamily={F.mono}>0..1</text>

          <path d="M 900 592 L 900 720 L 96 720 L 96 320 L 136 320" fill="none" stroke={C.ink} strokeWidth={1.8} strokeDasharray="8 7" markerEnd="url(#pimArrow)" />
          <text x={430} y={744} fontSize={17} fill={C.muted} fontFamily={F.body}>逻辑引用：按 kind + id 指向会话或科目</text>

          <text x={1240} y={520} fontSize={18} fill={C.muted} fontFamily={F.body}>一台设备一份，不参与内容关系</text>

          <g>
            <rect x={1250} y={640} width={360} height={128} rx={10} fill={C.accentSoft} />
            <text x={1270} y={676} fontSize={20} fontWeight={700} fill={C.ink} fontFamily={F.body}>怎么读这张图</text>
            <text x={1270} y={708} fontSize={16} fill={C.ink} fontFamily={F.body}>框 = 一类东西；线 = 有关系</text>
            <text x={1270} y={734} fontSize={16} fill={C.ink} fontFamily={F.body}>1 : 0..* = 一个对多个；实心菱形 = 整体与部分</text>
          </g>

          <text x={725} y={852} textAnchor="middle" fontSize={21} fill={C.muted} fontFamily={F.body}>
            图 2　移动端 PIM 实体类模型
          </text>
        </svg>
      </Step>
    </Steps>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P10 */

const PimRules: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>05 · 约束</Eyebrow>
    <Title>四条不能破的规则</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 22 }}>
      {[
        {
          n: '01',
          t: '科目是树，但手机只展开一层',
          rules: ['字段保留父子关系，别的端同步下来不丢形', '不能成环；移动只改父科目；同级用序号'],
          icon: (
            <svg width={120} height={120} viewBox="0 0 120 120">
              <rect x={44} y={8} width={32} height={20} fill={C.white} stroke={C.green} strokeWidth={2} />
              <rect x={12} y={62} width={32} height={20} fill={C.white} stroke={C.green} strokeWidth={2} />
              <rect x={76} y={62} width={32} height={20} fill={C.white} stroke={C.green} strokeWidth={2} />
              <path d="M60 28 V44 M60 44 H28 V62 M60 44 H92 V62" fill="none" stroke={C.muted} strokeWidth={1.6} />
            </svg>
          ),
        },
        {
          n: '02',
          t: '会话是一个整体',
          rules: ['一会话一文件；坏文件跳过，不拖垮列表', '写入先临时文件再改名，崩溃不留半个文件'],
          icon: (
            <svg width={120} height={120} viewBox="0 0 120 120">
              <rect x={8} y={20} width={64} height={80} rx={8} fill={C.white} stroke={C.green} strokeWidth={2} />
              <path d="M78 34 h26 v20 h-10 l-6 8 v-8 h-10 z" fill={C.white} stroke={C.green} strokeWidth={2} />
              <line x1={22} y1={44} x2={58} y2={44} stroke={C.rule} strokeWidth={3} />
              <line x1={22} y1={58} x2={58} y2={58} stroke={C.rule} strokeWidth={3} />
              <line x1={22} y1={72} x2={46} y2={72} stroke={C.rule} strokeWidth={3} />
            </svg>
          ),
        },
        {
          n: '03',
          t: '两个时间戳',
          rules: ['updated 决定列表顺序', 'touched 决定要不要同步：改名/收藏也抬'],
          icon: (
            <svg width={120} height={120} viewBox="0 0 120 120">
              <circle cx={42} cy={62} r={30} fill={C.white} stroke={C.green} strokeWidth={2} />
              <circle cx={82} cy={62} r={26} fill={C.white} stroke={C.amber} strokeWidth={2} />
              <path d="M42 44 V62 H56" fill="none" stroke={C.ink} strokeWidth={2} />
              <path d="M82 46 V62 H94" fill="none" stroke={C.ink} strokeWidth={2} />
            </svg>
          ),
        },
        {
          n: '04',
          t: '两个游标',
          rules: ['pullCursor 管「拉到哪」，pushCursor 管「推到哪」', '拉取绝不能动推送书签，否则本地改动被永久跳过'],
          icon: (
            <svg width={120} height={120} viewBox="0 0 120 120">
              <path d="M12 84 H60" stroke={C.green} strokeWidth={2.4} markerEnd="none" />
              <path d="M12 42 H60" stroke={C.amber} strokeWidth={2.4} markerEnd="none" />
              <polygon points="60,84 50,78 50,90" fill={C.green} />
              <polygon points="60,42 50,36 50,48" fill={C.amber} />
              <text x={68} y={48} fontSize={13} fill={C.muted} fontFamily={F.mono}>push</text>
              <text x={68} y={90} fontSize={13} fill={C.muted} fontFamily={F.mono}>pull</text>
            </svg>
          ),
        },
      ].map(({ n, t, rules, icon }) => (
        <Card key={n} style={{ height: 334, padding: '22px 26px', display: 'flex', gap: 22 }}>
          <div style={{ flexShrink: 0 }}>{icon}</div>
          <div>
            <div style={{ ...mono(18), color: C.accent }}>{n}</div>
            <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginTop: 4 }}>{t}</div>
            {rules.map((r) => (
              <div key={r} style={{ fontSize: 23, lineHeight: 1.45, color: C.muted, marginTop: 12 }}>
                <Dot color={C.green} />
                {r}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P11 */

const ClientApi: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>06 · 接口</Eyebrow>
    <Title>三层怎么对话</Title>
    <div style={{ display: 'flex', gap: 26, marginTop: 24 }}>
      {[
        ['界面层', '看得见的那层', ['把状态画出来', '把用户动作转出去', '把错误显示成人话'], '不判断对错，不碰文件'],
        ['流程层', '点一下之后', ['决定下一步', '支持取消、重来', '失败重试与降级'], '不画界面，不直接存文件'],
        ['数据层', '东西存在哪', ['按条件存取', '保证一次写入完整', '元数据与内容分开'], '不知道界面长什么样'],
      ].map(([t, sub, can, cannot]) => (
        <Card key={t as string} style={{ width: 540, padding: '24px 26px' }}>
          <div style={{ fontSize: 36, fontWeight: 800 }}>{t as string}</div>
          <div style={{ fontSize: 22, color: C.muted, marginTop: 4 }}>{sub as string}</div>
          <div style={{ marginTop: 18 }}>
            {(can as string[]).map((x) => (
              <div key={x} style={{ fontSize: 24, lineHeight: 1.5, marginBottom: 8 }}>
                <Dot color={C.green} />
                {x}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1.5px solid ${C.rule}`, fontSize: 22, color: C.muted }}>
            不能：{cannot as string}
          </div>
        </Card>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
      {['开始一题', '回答片段', '工具进度', '核实结果', '本轮完成', '出错'].map((t) => (
        <div key={t} style={{ padding: '10px 20px', borderRadius: 24, border: `1.5px solid ${C.accent}`, color: C.ink, fontSize: 22, background: C.accentSoft }}>
          {t}
        </div>
      ))}
    </div>
    <div style={{ marginTop: 24, fontSize: 25, color: C.muted, lineHeight: 1.6 }}>
      所以呢：界面永远不直接读写文件；所有写操作都能取消，连按悬浮球不会叠成两次作答。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P12 */

const CloudApi: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>07 · 可选同步</Eyebrow>
    <Title>手机怎么跟云端对账</Title>
    <Lead>只讲一次手动同步发生什么；云端内部是部署细节。</Lead>
    <div style={{ display: 'flex', gap: 34, marginTop: 22 }}>
      <div style={{ width: 1030 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, fontSize: 22, color: C.muted }}>
          <span style={{ fontWeight: 700, color: C.ink }}>手机本机</span>
          <span>→</span>
          <span style={{ color: C.teal }}>可选服务器（同一套表的远程副本）</span>
        </div>
        <Card style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 0.5fr', background: C.paper2, borderBottom: `1.5px solid ${C.rule}`, padding: '12px 18px', fontSize: 21, fontWeight: 700 }}>
            <div>你看到的动作</div>
            <div>背后发生什么</div>
            <div>要登录</div>
          </div>
          {[
            ['扫码配对', '手机扫电脑上的码，拿到一张局域网通行证', '否'],
            ['登录', '账号口令换一张通行证', '否'],
            ['立即同步（先推）', '把本机改动和题图成批送上去', '是'],
            ['立即同步（再拉）', '从上次的书签继续拿', '是'],
            ['换账号', '两个书签清零，重新对账', '是'],
            ['删除后同步', '送一条「删除证明」，不送内容', '是'],
          ].map(([a, b, c]) => (
            <div key={a} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 0.5fr', padding: '14px 18px', borderBottom: `1px solid ${C.rule}`, fontSize: 22 }}>
              <div style={{ fontWeight: 600 }}>{a}</div>
              <div style={{ color: C.muted }}>{b}</div>
              <div style={{ color: c === '是' ? C.accent : C.muted }}>{c}</div>
            </div>
          ))}
        </Card>
      </div>
      <div style={{ width: 620 }}>
        {[
          ['谁后改谁生效', '比较会话的 touched 或科目的 updated，严格更新才覆盖。'],
          ['删除留证明', '本机删了文件先记墓碑；同步时补一条「已删除」，对面才知道要删。'],
          ['两个书签分开', '拉取书签和推送书签互不覆盖；换账号必须同时清零。'],
        ].map(([t, d], i) => (
          <Card key={t} style={{ padding: '18px 22px', marginBottom: 16 }}>
            <div style={{ ...mono(16), color: C.accent }}>0{i + 1}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 2 }}>{t}</div>
            <div style={{ fontSize: 21, color: C.muted, lineHeight: 1.45, marginTop: 6 }}>{d}</div>
          </Card>
        ))}
        <div style={{ fontSize: 20, color: C.muted, lineHeight: 1.5, marginTop: 4 }}>
          服务器上就是同样的会话/科目表加附件目录；网关与微服务拆分不属于本设计。
        </div>
      </div>
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P13 */

const ErBox = ({
  x,
  y,
  w,
  h,
  zh,
  en,
  fields,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  zh: string;
  en: string;
  fields: string[];
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={6} fill={C.white} stroke={C.ink} strokeWidth={2} />
    <rect x={x} y={y} width={w} height={46} fill={C.tintBlue} stroke={C.ink} strokeWidth={1.5} />
    <text x={x + 12} y={y + 22} fontSize={21} fontWeight={700} fill={C.ink} fontFamily={F.body}>{zh}</text>
    <text x={x + 12} y={y + 38} fontSize={12} fill={C.muted} fontFamily={F.mono}>{en}</text>
    {fields.map((f, i) => (
      <text key={f} x={x + 12} y={y + 68 + i * 22} fontSize={16} fill={C.ink} fontFamily={F.mono}>{f}</text>
    ))}
  </g>
);

const Er: Page = () => (
  <div style={{ ...base, padding: '52px 120px 0' }}>
    <Eyebrow>08 · 数据</Eyebrow>
    <Title size={56}>E-R 图：数据之间怎么连</Title>
    <div style={{ display: 'flex', gap: 20, marginTop: 10 }}>
      <svg width={1600} height={880} viewBox="0 0 1600 880">
        <defs>
          <marker id="erArrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={C.ink} />
          </marker>
          <marker id="crow" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto">
            <path d="M2,0 L12,7 M2,7 L12,7 M2,14 L12,7" fill="none" stroke={C.ink} strokeWidth={1.6} />
          </marker>
        </defs>

        <ErBox x={120} y={50} w={380} h={140} zh="科目" en="SUBJECT" fields={['id  PK', 'parent_id  FK', 'name', 'sort_order']} />
        <ErBox x={120} y={300} w={380} h={170} zh="会话" en="SESSION" fields={['id  PK', 'subject_id  FK', 'title', 'status', 'fav']} />
        <ErBox x={120} y={580} w={380} h={170} zh="消息" en="MESSAGE" fields={['id  PK', 'session_id  FK', 'seq', 'role', 'text']} />

        <ErBox x={660} y={50} w={380} h={140} zh="核实记录" en="VERIFICATION" fields={['id  PK', 'message_id  FK', 'verdict', 'note']} />
        <ErBox x={660} y={300} w={380} h={140} zh="题图" en="ATTACHMENT" fields={['id  PK', 'message_id  FK', 'path', 'mime']} />
        <ErBox x={660} y={560} w={380} h={140} zh="删除墓碑" en="TOMBSTONE" fields={['id  PK', 'kind', 'target_id', 'ts']} />

        <ErBox x={1180} y={90} w={400} h={170} zh="同步状态" en="SYNC_STATE" fields={['id  PK', 'uid', 'pull_cursor', 'push_cursor']} />
        <ErBox x={1180} y={360} w={400} h={150} zh="设置" en="SETTINGS" fields={['id  PK', 'endpoint', 'model', 'theme']} />

        <path d="M120 110 C84 110, 84 26, 170 26 L 170 46" fill="none" stroke={C.ink} strokeWidth={1.8} markerEnd="url(#erArrow)" />
        <text x={26} y={118} fontSize={15} fill={C.muted} fontFamily={F.mono}>parent_id</text>

        <line x1={310} y1={190} x2={310} y2={296} stroke={C.ink} strokeWidth={1.8} markerStart="url(#crow)" markerEnd="url(#erArrow)" />
        <text x={322} y={240} fontSize={17} fill={C.muted} fontFamily={F.mono}>1 : N</text>

        <line x1={310} y1={470} x2={310} y2={576} stroke={C.ink} strokeWidth={1.8} markerStart="url(#crow)" markerEnd="url(#erArrow)" />
        <text x={322} y={526} fontSize={17} fill={C.muted} fontFamily={F.mono}>1 : N</text>

        <line x1={500} y1={650} x2={656} y2={650} stroke={C.ink} strokeWidth={1.8} markerStart="url(#crow)" markerEnd="url(#erArrow)" />
        <text x={524} y={638} fontSize={17} fill={C.muted} fontFamily={F.mono}>1 : 0..1</text>

        <line x1={500} y1={610} x2={656} y2={370} stroke={C.ink} strokeWidth={1.8} markerStart="url(#crow)" markerEnd="url(#erArrow)" />
        <text x={560} y={480} fontSize={17} fill={C.muted} fontFamily={F.mono}>1 : 0..1</text>

        <path d="M850 700 L 850 800 L 100 800 L 100 400 L 116 400" fill="none" stroke={C.ink} strokeWidth={1.8} strokeDasharray="8 7" markerEnd="url(#erArrow)" />
        <text x={500} y={786} fontSize={17} fill={C.muted} fontFamily={F.body}>逻辑引用（不建外键）</text>

        <text x={1180} y={540} fontSize={17} fill={C.muted} fontFamily={F.body}>一台设备一份，不参与业务关系</text>
        <text x={1180} y={612} fontSize={16} fill={C.muted} fontFamily={F.body}>图例：1—N 一对多　0..1 可选　虚线 = 逻辑引用</text>

        <g>
          <rect x={1180} y={680} width={300} height={120} rx={10} fill={C.accentSoft} />
          <text x={1200} y={714} fontSize={19} fontWeight={700} fill={C.ink} fontFamily={F.body}>读图顺序</text>
          <text x={1200} y={744} fontSize={16} fill={C.ink} fontFamily={F.body}>科目 → 会话 → 消息</text>
          <text x={1200} y={770} fontSize={16} fill={C.ink} fontFamily={F.body}>→ 核实 / 题图 / 墓碑</text>
        </g>

        <text x={700} y={862} textAnchor="middle" fontSize={21} fill={C.muted} fontFamily={F.body}>
          图 3　移动端数据 E-R 图（crow's foot）
        </text>
      </svg>
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P14 */

const Logical: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>08 · 逻辑</Eyebrow>
    <Title>从对象到表</Title>
    <div style={{ display: 'flex', gap: 34, marginTop: 22 }}>
      <div style={{ width: 1100, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          ['科目 → 会话', '一个科目下可以有多条会话；会话也可以不属于任何科目。'],
          ['科目 → 科目', '科目可以套科目；手机 v1 只显示一层，字段保留。'],
          ['会话 → 消息', '一条会话下有多条消息，按 seq 顺序编号。'],
          ['消息 → 核实', '一条回答最多有一条核实记录。'],
          ['消息 → 题图', '一条消息最多有一张题图。'],
          ['墓碑 → 会话/科目', '按「类型 + id」指向，不建外键。'],
        ].map(([t, d]) => (
          <Card key={t} style={{ padding: '15px 18px', height: 128 }}>
            <div style={{ fontSize: 25, fontWeight: 700 }}>{t}</div>
            <div style={{ fontSize: 20, color: C.muted, lineHeight: 1.4, marginTop: 6 }}>{d}</div>
          </Card>
        ))}
      </div>
      <div style={{ width: 540 }}>
        <Card style={{ padding: '22px 24px', marginBottom: 18 }}>
          <div style={{ fontSize: 27, fontWeight: 800 }}>三范式一句话</div>
          <div style={{ fontSize: 22, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
            每条信息只存一处；改昵称不用改会话表。八张表都满足 1NF / 2NF / 3NF。
          </div>
        </Card>
        <Card style={{ padding: '22px 24px' }}>
          <div style={{ fontSize: 27, fontWeight: 800 }}>消息为什么可以不内嵌</div>
          <div style={{ fontSize: 21, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
            手机现在是一会话一 JSON，消息整段存；这里把它显式成表，字段一一对应。好处是能按消息查询，代价是写入要事务。同步仍以会话为单位。
          </div>
        </Card>
      </div>
    </div>
    <div style={{ marginTop: 18, fontSize: 24, color: C.muted }}>
      所以呢：拆表是为了查询与约束，不是为了让同步变复杂；同步的最小单位始终是会话。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P15 */

const DataTable = ({
  title,
  note,
  widths,
  head,
  rows,
  rowHeight = 32,
  font = 22,
  titleSize = 28,
}: {
  title: string;
  note: string;
  widths: string[];
  head: string[];
  rows: string[][];
  rowHeight?: number;
  font?: number;
  titleSize?: number;
}) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
      <div style={{ fontSize: titleSize ?? 28, fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 20, color: C.muted }}>{note}</div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: widths.join(' '), border: `1.5px solid ${C.ink}`, borderBottom: 'none' }}>
      {head.map((h) => (
        <div key={h} style={{ padding: '4px 10px', background: C.paper2, fontSize: font - 1, fontWeight: 700, borderBottom: `1.5px solid ${C.ink}`, borderRight: `1px solid ${C.rule}` }}>
          {h}
        </div>
      ))}
      {rows.map((r, ri) =>
        r.map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            style={{
              padding: `2px 10px`,
              minHeight: rowHeight,
              boxSizing: 'border-box',
              fontSize: font,
              lineHeight: 1.25,
              borderBottom: `1px solid ${C.rule}`,
              borderRight: ci === r.length - 1 ? undefined : `1px solid ${C.rule}`,
              fontFamily: ci === 0 ? F.mono : F.body,
              color: ci === 0 ? C.ink : C.ink,
            }}
          >
            {cell}
          </div>
        )),
      )}
    </div>
  </div>
);

const TablesCore: Page = () => (
  <div style={{ ...base, padding: '38px 120px 0' }}>
    <Eyebrow>09 · 物理设计</Eyebrow>
    <Title size={46}>会话与消息：两张主表</Title>
    <div style={{ marginTop: 6 }}>
      <DataTable
        title="session（会话表）"
        note="一次搜题一行"
        widths={['200px', '170px', '210px', '1fr']}
        head={['字段', '类型', '约束', '说明']}
        rowHeight={28}
        font={20}
        rows={[
          ['id', 'VARCHAR(32)', 'PK', '时间戳，字典序 = 时间序'],
          ['subject_id', 'VARCHAR(32)', 'FK→subject, NULL', '空 = 未分组'],
          ['title', 'VARCHAR(128)', 'NOT NULL', '默认「新会话」'],
          ['status', 'VARCHAR(16)', 'NOT NULL', '作答中 / 已核实 / 完成 / 出错'],
          ['fav', 'TINYINT', '默认 0', '收藏只标记、不置顶'],
          ['created', 'BIGINT', 'NOT NULL', '创建时刻（毫秒）'],
          ['updated', 'BIGINT', 'NOT NULL', '列表排序用'],
          ['touched', 'BIGINT', 'NOT NULL', '同步用（改名/收藏也抬）'],
          ['deleted', 'TINYINT', '默认 0', '删除标记'],
        ]}
      />
      <DataTable
        title="message（消息表）"
        note="一句话一行"
        widths={['200px', '170px', '210px', '1fr']}
        head={['字段', '类型', '约束', '说明']}
        rowHeight={28}
        font={20}
        rows={[
          ['id', 'BIGINT', 'PK, AI', '自增'],
          ['session_id', 'VARCHAR(32)', 'FK→session', '归属会话'],
          ['seq', 'INT', 'NOT NULL', '会话内顺序'],
          ['role', 'VARCHAR(12)', 'NOT NULL', 'user / assistant'],
          ['kind', 'VARCHAR(12)', '默认空', 'answer / chat'],
          ['text', 'MEDIUMTEXT', '', '用户文本或追问回答'],
          ['think', 'MEDIUMTEXT', '', '模型思考'],
          ['ts', 'BIGINT', 'NOT NULL', '消息时刻'],
          ['has_image', 'TINYINT', '默认 0', '是否有题图'],
          ['image_path', 'VARCHAR(255)', 'NULL', '相对路径'],
        ]}
      />
    </div>
    <div style={{ fontSize: 19, color: C.muted }}>
      索引：message(session_id, seq) 唯一；session(subject_id, updated)；session(touched) 供同步扫描。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P16 */

const TablesSupport: Page = () => (
  <div style={{ ...base, padding: '34px 120px 0' }}>
    <Eyebrow>09 · 物理设计</Eyebrow>
    <Title size={44}>核实与支撑：六张表</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 8 }}>
      <div>
        <DataTable
          title="verification（核实记录）"
          note="一条回答最多一条"
          widths={['110px', '128px', '1fr']}
          head={['字段', '约束', '说明']}
          font={18}
          titleSize={23}
          rowHeight={29}
          rows={[
            ['id', 'PK', '自增'],
            ['message_id', 'FK, UQ', '指向回答'],
            ['ran', 'TINYINT', '是否跑过'],
            ['skipped', 'TINYINT', '用户跳过'],
            ['pending', 'TINYINT', '核实中'],
            ['verdict', 'VARCHAR(16)', '结论'],
            ['note', 'MEDIUMTEXT', '核实说明'],
            ['tools_json', 'JSON', '检索小票'],
          ]}
        />
        <DataTable
          title="subject（科目表）"
          note="文件夹，v1 平铺"
          widths={['110px', '128px', '1fr']}
          head={['字段', '约束', '说明']}
          font={18}
          titleSize={23}
          rowHeight={29}
          rows={[
            ['id', 'PK', '时间戳'],
            ['name', 'NOT NULL', '科目名'],
            ['parent_id', 'FK, NULL', '父子关系'],
            ['sort_order', 'NOT NULL', '同级排序'],
            ['status', '默认 1', '启用 / 停用'],
            ['created', 'NOT NULL', '创建时刻'],
            ['updated', 'NOT NULL', '修改时刻'],
          ]}
        />
      </div>
      <div>
        <DataTable
          title="attachment（题图）"
          note="只存指针"
          widths={['110px', '128px', '1fr']}
          head={['字段', '约束', '说明']}
          font={18}
          titleSize={23}
          rowHeight={29}
          rows={[
            ['id', 'PK', '自增'],
            ['message_id', 'FK', '归属消息'],
            ['path', 'NOT NULL', '相对路径'],
            ['mime', 'NULL', '图片类型'],
            ['size', 'NULL', '字节数'],
            ['created', 'NOT NULL', '写入时刻'],
          ]}
        />
        <DataTable
          title="tombstone（删除墓碑）"
          note="删除证明"
          widths={['110px', '128px', '1fr']}
          head={['字段', '约束', '说明']}
          font={18}
          titleSize={23}
          rowHeight={29}
          rows={[
            ['id', 'PK', '自增'],
            ['kind', 'NOT NULL', 'a 会话 / c 科目'],
            ['target_id', 'NOT NULL', '被删的 id'],
            ['ts', 'NOT NULL', '删除时刻'],
          ]}
        />
      </div>
      <div>
        <DataTable
          title="sync_state"
          note="一台设备一行"
          widths={['150px', '1fr']}
          head={['字段', '说明']}
          font={18}
          titleSize={23}
          rowHeight={29}
          rows={[
            ['uid', '账号 id'],
            ['api', '服务器地址'],
            ['nick', '昵称'],
            ['pull_cursor', '拉取书签'],
            ['push_cursor', '推送书签'],
            ['last_msg', '上次结果'],
          ]}
        />
        <DataTable
          title="settings"
          note="本机偏好"
          widths={['150px', '1fr']}
          head={['字段', '说明']}
          font={18}
          titleSize={23}
          rowHeight={29}
          rows={[
            ['endpoint', '模型服务'],
            ['model', '模型名'],
            ['theme', '外观'],
            ['auto_verify', '自动核实'],
            ['api_key', '只在本机 prefs'],
            ['max_tool_rounds', '检索轮数'],
          ]}
        />
      </div>
    </div>
    <div style={{ marginTop: 6, fontSize: 19, color: C.muted }}>
      索引：verification(message_id) 唯一；subject(parent_id)；attachment(message_id)；tombstone(kind,target_id) 唯一。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P17 */

const PhoneList = ({ multi }: { multi: boolean }) => (
  <div style={{ width: 300, height: 650, border: `2.5px solid ${C.ink}`, borderRadius: 34, background: C.white, position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
    <div style={{ height: 26 }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px', height: 36 }}>
      <div style={{ fontSize: 20, fontWeight: 800 }}>搜题记录</div>
      <div style={{ fontSize: 14, color: C.accent, border: `1px solid ${C.accent}`, borderRadius: 12, padding: '2px 8px' }}>
        批量选择
      </div>
    </div>
    <div style={{ display: 'flex', gap: 6, padding: '6px 12px', overflow: 'hidden' }}>
      {['未分组', '高数', '计网', '英语'].map((t, i) => (
        <div key={t} style={{ fontSize: 13, padding: '4px 9px', borderRadius: 12, background: i === 0 ? C.accent : C.paper2, color: i === 0 ? C.white : C.muted }}>
          {t}
        </div>
      ))}
    </div>
    <div style={{ padding: '0 12px' }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: 'flex', gap: 8, padding: '9px 0', borderBottom: `1px solid ${C.rule}`, alignItems: 'flex-start' }}>
          {multi && <div style={{ width: 16, height: 16, borderRadius: 8, border: `1.5px solid ${i < 2 ? C.accent : C.rule}`, background: i < 2 ? C.accent : C.white, flexShrink: 0, marginTop: 3 }} />}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ height: 9, width: 130, background: C.ink, borderRadius: 5 }} />
              <div style={{ fontSize: 11, color: C.muted }}>11-23</div>
            </div>
            <div style={{ height: 6, width: i % 2 ? 170 : 200, background: C.rule, borderRadius: 3, marginTop: 7 }} />
            <div style={{ height: 6, width: i % 2 ? 120 : 160, background: C.rule, borderRadius: 3, marginTop: 5 }} />
          </div>
          <div style={{ width: 30, height: 30, background: C.paper2, borderRadius: 4 }} />
        </div>
      ))}
    </div>
    {multi && (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: C.ink, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '10px 6px', fontSize: 12 }}>
        <span>已选 2</span>
        <span style={{ color: C.accent }}>全选</span>
        <span>收藏</span>
        <span>移入</span>
        <span>删除</span>
      </div>
    )}
  </div>
);

const UiRecords: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>10 · UI 原型 A</Eyebrow>
    <Title>搜题记录页：一屏找、筛、批量</Title>
    <div style={{ display: 'flex', gap: 40, marginTop: 20 }}>
      <div style={{ display: 'flex', gap: 34 }}>
        <div>
          <PhoneList multi={false} />
          <div style={{ textAlign: 'center', marginTop: 10, fontSize: 20, color: C.muted }}>列表态</div>
        </div>
        <div>
          <PhoneList multi />
          <div style={{ textAlign: 'center', marginTop: 10, fontSize: 20, color: C.muted }}>多选态</div>
        </div>
      </div>
      <div style={{ width: 900, paddingTop: 4 }}>
        {[
          ['①', 'chips 就是分组', '未分组 + 各科目；没有「全部」，各组总和就是全部。'],
          ['②', '一滑到底', '不做分页，滚动位置保留。'],
          ['③', '卡片只露两行摘要', '详情页看全文，列表不被长答案撑爆。'],
          ['④', '星标只标记、不置顶', '置顶会把新会话埋掉。'],
          ['⑤', '长按进多选', '底栏「全选」只作用当前可见行。'],
          ['⑥', '批量移入成功即退出', '删除有确认框，防误操作。'],
          ['⑦', '点卡片进详情', '底部输入框继续追问。'],
        ].map(([n, t, d]) => (
          <div key={n} style={{ display: 'flex', gap: 16, marginBottom: 17 }}>
            <div style={{ width: 34, height: 34, borderRadius: 17, background: C.accent, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{n}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{t}</div>
              <div style={{ fontSize: 21, color: C.muted, lineHeight: 1.4, marginTop: 2 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P18 */

const PhoneState = ({ kind }: { kind: 'ball' | 'crop' | 'drawer' }) => (
  <div style={{ width: 340, height: 720, border: `2.5px solid ${C.ink}`, borderRadius: 42, background: C.white, position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
    <div style={{ padding: '18px 18px 0' }}>
      <div style={{ height: 10, width: 150, background: C.rule, borderRadius: 5 }} />
      <div style={{ height: 8, width: 220, background: C.paper2, borderRadius: 4, marginTop: 14 }} />
      <div style={{ height: 8, width: 190, background: C.paper2, borderRadius: 4, marginTop: 8 }} />
      <div style={{ height: 8, width: 210, background: C.paper2, borderRadius: 4, marginTop: 8 }} />
    </div>
    {kind === 'ball' && (
      <>
        <div style={{ position: 'absolute', right: 10, top: 330, width: 52, height: 52, borderRadius: 26, background: C.accent, border: `2px solid ${C.white}`, boxShadow: `0 0 0 2px ${C.accentSoft}` }} />
        <div style={{ position: 'absolute', right: 6, top: 392, fontSize: 11, color: C.muted }}>点一下取帧</div>
      </>
    )}
    {kind === 'crop' && (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(23,26,33,0.55)' }} />
        <div style={{ position: 'absolute', left: 70, top: 230, width: 200, height: 150, background: C.white, boxShadow: '0 0 0 2px rgba(255,255,255,0.7)' }}>
          <div style={{ padding: 10 }}>
            <div style={{ height: 8, width: 150, background: C.rule }} />
            <div style={{ height: 8, width: 120, background: C.rule, marginTop: 8 }} />
            <div style={{ height: 8, width: 160, background: C.rule, marginTop: 8 }} />
          </div>
          {[[-6, -6], [194, -6], [-6, 144], [194, 144]].map(([l, t], i) => (
            <div key={i} style={{ position: 'absolute', left: l, top: t, width: 12, height: 12, background: C.accent, borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ position: 'absolute', left: 70, top: 390, fontSize: 12, color: C.white }}>200 × 150</div>
        <div style={{ position: 'absolute', left: 40, bottom: 28, display: 'flex', gap: 18 }}>
          <div style={{ padding: '8px 18px', borderRadius: 18, background: 'rgba(255,255,255,0.18)', color: C.white, fontSize: 14 }}>取消</div>
          <div style={{ padding: '8px 18px', borderRadius: 18, background: C.accent, color: C.white, fontSize: 14 }}>确认</div>
        </div>
      </>
    )}
    {kind === 'drawer' && (
      <>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 396, background: C.paper2, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTop: `2px solid ${C.ink}`, padding: '10px 16px', boxSizing: 'border-box' }}>
          <div style={{ width: 60, height: 5, borderRadius: 3, background: C.muted, margin: '0 auto 10px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.muted }}>
            <span>已核实 · 3 个来源</span>
            <span>会话　收藏　重命名　删除</span>
          </div>
          <div style={{ marginTop: 14, marginLeft: 8, background: C.white, borderRadius: 10, padding: '9px 11px', fontSize: 12, lineHeight: 1.5, border: `1px solid ${C.rule}` }}>
            <div style={{ height: 7, width: 210, background: C.rule, borderRadius: 4 }} />
            <div style={{ height: 7, width: 180, background: C.rule, borderRadius: 4, marginTop: 7 }} />
            <div style={{ height: 7, width: 200, background: C.rule, borderRadius: 4, marginTop: 7 }} />
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {['检索：极限', '来源 1', '来源 2'].map((t) => (
              <div key={t} style={{ fontSize: 10, padding: '3px 7px', border: `1px solid ${C.rule}`, borderRadius: 8, color: C.muted }}>{t}</div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, height: 38, borderRadius: 19, background: C.white, border: `1px solid ${C.rule}` }} />
            <div style={{ width: 72, height: 38, borderRadius: 19, background: C.accent }} />
          </div>
        </div>
      </>
    )}
  </div>
);

const UiMobile: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>10 · UI 原型 B</Eyebrow>
    <Title>点球 → 框选 → 抽屉</Title>
    <div style={{ display: 'flex', gap: 30, marginTop: 18 }}>
      {[
        ['A 悬浮球', 'ball'],
        ['B 冻结帧 + 框选', 'crop'],
        ['C 抽屉作答', 'drawer'],
      ].map(([label, kind], i) => (
        <div key={kind}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <PhoneState kind={kind as 'ball'} />
            {i < 2 && <div style={{ fontSize: 40, color: C.accent }}>→</div>}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: 22, color: C.muted }}>{label}</div>
        </div>
      ))}
      <div style={{ width: 420 }}>
        {[
          ['①', '单击即取帧', '不需要先打开应用。'],
          ['②', '冻结帧', '框选时内容不滚动。'],
          ['③', '四角手柄 + 尺寸', '小屏也能框准。'],
          ['④', '抽屉从底部滑入', '页面不跳转。'],
          ['⑤', '55% 高度', '答案在眼前，题目还看得见。'],
          ['⑥', '先快答、再核实', '核实结果带来源。'],
          ['⑦', '可拖动、可收起', '红点按会话已读水位点亮。'],
        ].map(([n, t, d]) => (
          <div key={n} style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: C.accent, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{n}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{t}</div>
              <div style={{ fontSize: 20, color: C.muted }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P19 */

const Principles: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>11 · 易用性</Eyebrow>
    <Title>六条原则，落在具体位置</Title>
    <div style={{ marginTop: 18, border: `1.5px solid ${C.ink}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 1.8fr 0.8fr', background: C.paper2, fontSize: 22, fontWeight: 700 }}>
        {['原则', '一句话定义', '系统落点', '原型标注'].map((h) => (
          <div key={h} style={{ padding: '10px 14px', borderRight: `1px solid ${C.rule}` }}>{h}</div>
        ))}
      </div>
      {[
        ['就近操作', '操作发生在注意力所在处', '悬浮球常驻；抽屉不跳页', '原型 A-⑦ / 原型 B-①'],
        ['渐进披露', '先给结论，再给证据', '初答 → 核实；工具调用折叠', '原型 B-⑥'],
        ['状态可见', '系统状态始终可感知', '流式光标、思考块、未读点', '原型 A-③ / 原型 B-⑤'],
        ['防错与可恢复', '误操作可撤销、失败可重试', '删除确认、返回取消、原子写', '原型 A-⑥'],
        ['一致性', '同一概念同一表现', 'MV3/GUI 同款术语与配色', '原型 B-⑦'],
        ['效率', '高频操作最短路径', 'chips、一滑到底、涂抹多选', '原型 A-② / 原型 A-⑤'],
      ].map((r) => (
        <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.6fr 1.8fr 0.8fr', borderTop: `1px solid ${C.rule}`, fontSize: 22 }}>
          {r.map((c, i) => (
            <div key={i} style={{ padding: '12px 14px', borderRight: i === 3 ? undefined : `1px solid ${C.rule}`, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? C.ink : C.muted }}>
              {c}
            </div>
          ))}
        </div>
      ))}
    </div>
    <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.5 }}>
      所以呢：界面不是「好看」，而是把一条 9 步的链路压成「点球 + 框选 + 看一眼」。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P26 */

const AiUsage: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>12 · 收尾 · 要求 5</Eyebrow>
    <Title>AI 出了四份草稿，三处是错的</Title>
    <Lead>要求 5 要说明 AI 用在哪、人怎么把关；下面是这次的真实记录，不是客套。</Lead>

    <div style={{ marginTop: 26, border: `1.5px solid ${C.ink}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.45fr 1.2fr 1.75fr', background: C.paper2, fontSize: 23, fontWeight: 700 }}>
        {['产物', 'AI 出的草稿', '人拿什么核'].map((h, i) => (
          <div key={h} style={{ padding: '10px 18px', borderRight: i === 2 ? undefined : `1px solid ${C.rule}` }}>{h}</div>
        ))}
      </div>
      {[
        ['实体清单', '8 个实体与字段初稿', '逐字段数 Session.java、SubjectsStore.java'],
        ['PIM 与接口', '分层、连线与方法名建议', '对着三层调用点核方向、多重性、命名'],
        ['表结构', '字段与索引候选', '对着真实 JSON 会话文件与 prefs 核落地形态'],
        ['页面文案', '压缩后的短句', '统一术语，逐句核事实'],
      ].map((r) => (
        <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '0.45fr 1.2fr 1.75fr', borderTop: `1px solid ${C.rule}`, fontSize: 23 }}>
          {r.map((c, i) => (
            <div key={i} style={{ padding: '11px 18px', borderRight: i === 2 ? undefined : `1px solid ${C.rule}`, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? C.ink : C.muted }}>{c}</div>
          ))}
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '28px 0 12px' }}>
      <div style={{ fontSize: 28, fontWeight: 700 }}>三处初稿与源码不符</div>
      <div style={{ fontSize: 21, color: C.muted }}>依据：Session.java · SporeSyncState.java · 真实会话文件</div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '0.18fr 1.15fr 1.95fr 0.9fr', border: `1.5px solid ${C.ink}`, fontSize: 22 }}>
      <div style={{ display: 'contents' }}>
        {['#', 'AI 初稿', '源码里的实际', '改到哪'].map((h, i) => (
          <div key={h} style={{ padding: '9px 16px', background: C.paper2, fontWeight: 700, borderRight: i === 3 ? undefined : `1px solid ${C.rule}` }}>{h}</div>
        ))}
      </div>
      {[
        ['01', '手机端存 SQLite / MySQL', '一会话一 JSON + prefs；表页只是关系化等价', '物理设计页加注'],
        ['02', '会话只用一个 updated', '另需 touched：改名 / 收藏要同步，但不许顶到列表最前', '约束页第 3 条'],
        ['03', '拉取顺手推进推送书签', '双游标：pullCursor 只管拉，pushCursor 只管推', '约束页第 4 条'],
      ].map((r) => (
        <div key={r[0]} style={{ display: 'contents' }}>
          {r.map((c, i) => (
            <div key={i} style={{ padding: '11px 16px', borderTop: `1px solid ${C.rule}`, borderRight: i === 3 ? undefined : `1px solid ${C.rule}`, color: i === 1 ? C.accent : i === 2 ? C.ink : C.muted, fontFamily: i === 0 ? F.mono : F.body, fontWeight: i === 2 ? 600 : 400 }}>{c}</div>
          ))}
        </div>
      ))}
    </div>

    <div style={{ marginTop: 26, fontSize: 24, color: C.muted, lineHeight: 1.5 }}>
      AI 提高的是起草速度；事实、术语和取舍，逐条回到源码确认。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P27 */

const ChangeLog: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>12 · 收尾</Eyebrow>
    <Title>修改记录与交付清单</Title>
    <Lead>版本表记下每次改动；交付物逐项对上第 5 条要求。</Lead>

    <div style={{ display: 'flex', gap: 60, marginTop: 30 }}>
      <div style={{ width: 1100 }}>
        <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>修改记录</div>
        <div style={{ display: 'grid', gridTemplateColumns: '0.42fr 2.3fr 0.55fr', border: `1.5px solid ${C.ink}`, fontSize: 23 }}>
          <div style={{ display: 'contents' }}>
            {['版本', '变更', '日期'].map((h, i) => (
              <div key={h} style={{ padding: '9px 16px', background: C.paper2, fontWeight: 700, borderRight: i === 2 ? undefined : `1px solid ${C.rule}` }}>{h}</div>
            ))}
          </div>
          {[
            ['v0.1', '20 页大纲与事实清单', '11-23'],
            ['v1.0', '视频页改全页、全量播放', '11-23'],
            ['v2.0', '改为手机为主、MV3 / GUI 为辅，全稿去代码化', '11-23'],
            ['v2.1', '新增分工页与四张章节页，扩为 25 页', '11-23'],
            ['v2.2', '收尾拆为三页：AI 说明、记录清单、致谢，扩为 27 页', '11-23'],
          ].map((r) => (
            <div key={r[0]} style={{ display: 'contents' }}>
              {r.map((c, i) => (
                <div key={i} style={{ padding: '12px 16px', borderTop: `1px solid ${C.rule}`, borderRight: i === 2 ? undefined : `1px solid ${C.rule}`, color: i === 0 ? C.ink : C.muted, fontFamily: i === 0 ? F.mono : F.body, fontWeight: i === 0 ? 700 : 400 }}>{c}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, fontSize: 23, color: C.muted, lineHeight: 1.6 }}>
          每一版先改事实、再改文案：先核对源码，再压成一句能讲的话。
        </div>
      </div>

      <div style={{ width: 500 }}>
        <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 14 }}>交付清单</div>
        {['类图与接口说明', 'E-R 图与数据表', '2 张 UI 原型', '设计说明', 'AI 说明与修改记录'].map((t) => (
          <div key={t} style={{ fontSize: 25, color: C.muted, marginBottom: 10 }}>
            <span style={{ color: C.accent, marginRight: 10 }}>✓</span>{t}
          </div>
        ))}
        <div style={{ marginTop: 26, paddingTop: 18, borderTop: `1.5px solid ${C.rule}` }}>
          <div style={{ ...mono(30), color: C.ink, fontWeight: 700 }}>27 页 / 4 棒 / 16 分钟</div>
          <div style={{ marginTop: 8, fontSize: 22, color: C.muted, lineHeight: 1.5 }}>
            收尾三页：说明、记录、致谢。
          </div>
        </div>
      </div>
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ P28 */

const QrCell = ({ title, repo, src }: { title: string; repo: string; src: string }) => (
  <div style={{ width: 185, textAlign: 'center' }}>
    <img
      src={src}
      alt={`${title}仓库二维码`}
      style={{ width: 185, height: 185, display: 'block', borderRadius: 8, imageRendering: 'pixelated' }}
    />
    <div style={{ marginTop: 10, fontSize: 21, fontWeight: 700 }}>{title}</div>
    <div style={{ marginTop: 2, fontSize: 14, color: 'rgba(255,255,255,0.45)', fontFamily: F.mono }}>
      {repo}
    </div>
  </div>
);

const Thanks: Page = () => (
  <div style={{ ...base, background: C.ink, color: C.white, display: 'flex', alignItems: 'center', padding: '0 150px', gap: 110 }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 24, letterSpacing: '0.2em', color: C.accent, fontWeight: 600 }}>
        SPORE MOBILE · 系统详细设计
      </div>
      <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', margin: '26px 0 18px' }}>
        谢谢
      </div>
      <div style={{ fontSize: 34, color: 'rgba(255,255,255,0.74)', lineHeight: 1.5 }}>
        设计讲到这里，欢迎提问。
      </div>
      <div style={{ marginTop: 52, paddingTop: 22, borderTop: '1.5px solid rgba(255,255,255,0.22)', fontSize: 23, color: 'rgba(255,255,255,0.5)' }}>
        2026-11-23 · 信息系统 · 作业10
      </div>
    </div>

    <div style={{ width: 404 }}>
      <div style={{ textAlign: 'center', fontSize: 17, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.42)', marginBottom: 24 }}>
        三端仓库
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <QrCell title="手机端" repo="Offblink/Spore-Mobile" src={qr} />
        <div style={{ display: 'flex', gap: 34 }}>
          <QrCell title="MV3 扩展" repo="Offblink/Spore" src={qrMv3} />
          <QrCell title="桌面端" repo="Offblink/Spore-GUI" src={qrGui} />
        </div>
      </div>
    </div>
    <Folio dark />
  </div>
);

/* ------------------------------------------------------------------ sections */

const SectionPage = ({
  n,
  title,
  lead,
  speaker,
  range,
  time,
  points,
}: {
  n: number;
  title: string;
  lead: string;
  speaker: string;
  range: string;
  time: string;
  points: string[];
}) => (
  <div
    style={{
      ...base,
      background: C.ink,
      color: C.white,
      padding: '0 150px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        position: 'absolute',
        right: -30,
        bottom: 96,
        fontSize: 430,
        fontWeight: 900,
        lineHeight: 1,
        color: 'rgba(255,255,255,0.045)',
        letterSpacing: '-0.04em',
      }}
    >
      0{n}
    </div>
    <div style={{ fontSize: 24, letterSpacing: '0.22em', color: C.accent, fontWeight: 600 }}>
      PART 0{n} / 04
    </div>
    <div style={{ fontSize: 96, fontWeight: 900, marginTop: 16, letterSpacing: '-0.02em' }}>{title}</div>
    <div style={{ fontSize: 33, color: 'rgba(255,255,255,0.66)', maxWidth: 1120, marginTop: 18, lineHeight: 1.5 }}>
      {lead}
    </div>
    <div style={{ display: 'flex', gap: 90, marginTop: 54 }}>
      {[
        ['讲者', speaker],
        ['负责页', range],
        ['预计', time],
      ].map(([k, v]) => (
        <div key={k}>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.12em' }}>{k}</div>
          <div style={{ fontSize: 34, fontWeight: 700, marginTop: 6 }}>{v}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 18, marginTop: 46 }}>
      {points.map((p) => (
        <div
          key={p}
          style={{
            padding: '10px 20px',
            border: '1.5px solid rgba(255,255,255,0.22)',
            borderRadius: 24,
            fontSize: 22,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          {p}
        </div>
      ))}
    </div>
    <Folio dark />
  </div>
);

const Division: Page = () => (
  <div style={{ ...base, ...pagePad }}>
    <Eyebrow>00 · 分工</Eyebrow>
    <Title>四棒接力：一人一段，交接不断</Title>
    <Lead>视频由第 1 棒播放；每段结尾一句交接，下一棒直接接。总时长约 16 分钟。</Lead>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 28 }}>
      {[
        {
          n: '01',
          who: '成员 A（姓名）',
          title: '需求与 BCE 抽取',
          pages: '05–10',
          time: '4′30″',
          items: ['边界与系统上下文', '三类对象与识别规则', '九步对象协作'],
          handoff: '「三类分完，下一棒收成类图。」',
        },
        {
          n: '02',
          who: '成员 B（姓名）',
          title: 'PIM 与接口',
          pages: '12–15',
          time: '3′00″',
          items: ['PIM 类图与四条约束', '三层接口约定', '一次同步对账'],
          handoff: '「接口定完，下一棒落到表里。」',
        },
        {
          n: '03',
          who: '成员 C（姓名）',
          title: '数据库设计',
          pages: '17–20',
          time: '2′45″',
          items: ['E-R 与关系模式', '两张主表', '六张支撑表与索引'],
          handoff: '「库好了，下一棒看用户看到的两屏。」',
        },
        {
          n: '04',
          who: '成员 D（姓名）',
          title: 'UI 与收尾',
          pages: '22–27',
          time: '3′30″',
          items: ['记录页与三态原型', '六条易用性原则', 'AI 说明与修改记录', '致谢与三端二维码'],
          handoff: '「设计讲完，欢迎提问。」',
        },
      ].map((p) => (
        <Card key={p.n} style={{ height: 560, padding: '24px 24px 22px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...mono(18), color: C.accent }}>PART {p.n}</div>
          <div style={{ fontSize: 25, color: C.muted, marginTop: 4 }}>{p.who}</div>
          <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.25, marginTop: 8 }}>{p.title}</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, alignItems: 'baseline' }}>
            <span style={{ ...mono(22), color: C.ink }}>{p.pages}</span>
            <span style={{ fontSize: 21, color: C.accent }}>{p.time}</span>
          </div>
          <div style={{ marginTop: 16, borderTop: `1.5px solid ${C.rule}`, paddingTop: 12 }}>
            {p.items.map((t) => (
              <div key={t} style={{ fontSize: 21, color: C.muted, lineHeight: 1.45 }}>
                <Dot color={C.accent} />
                {t}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', fontSize: 19, color: C.ink, lineHeight: 1.45 }}>{p.handoff}</div>
        </Card>
      ))}
    </div>
    <div style={{ marginTop: 18, fontSize: 21, color: C.muted }}>
      四个人轮着上：每棒 3–6 页；讲完停一秒，下一棒接话，不来回切。
    </div>
    <Folio />
  </div>
);

/* ------------------------------------------------------------------ export */

const Section1: Page = () => (
  <SectionPage
    n={1}
    title="需求与 BCE 抽取"
    lead="先划系统边界，再把界面、流程、数据分成三堆，最后用一次搜题把三者串起来。"
    speaker="成员 A（姓名）"
    range="P05–P10"
    time="约 4′30″"
    points={['边界与上下文', '6 / 6 / 8 三类对象', '九步对象协作']}
  />
);

const Section2: Page = () => (
  <SectionPage
    n={2}
    title="PIM 与接口"
    lead="把三类对象收成一张类图，再用三层约定说明它们怎么说话。"
    speaker="成员 B（姓名）"
    range="P12–P15"
    time="约 3′00″"
    points={['PIM 类图', '四条不能破的规则', '三层接口 + 一次同步']}
  />
);

const Section3: Page = () => (
  <SectionPage
    n={3}
    title="数据库设计"
    lead="从 E-R 到关系模式，再到能落地的两张主表与六张支撑表。"
    speaker="成员 C（姓名）"
    range="P17–P20"
    time="约 2′45″"
    points={['E-R 与基数', '关系模式与范式', '物理表与索引']}
  />
);

const Section4: Page = () => (
  <SectionPage
    n={4}
    title="UI 与收尾"
    lead="两张原型回答「为什么这么长」，然后用三页交代 AI 做了什么、改了什么。"
    speaker="成员 D（姓名）"
    range="P22–P27"
    time="约 3′30″"
    points={['记录页原型', '三态原型', '六条原则 + AI 记录 + 致谢']}
  />
);

export const notes: (string | undefined)[] = [
  '开场：我选的项目是自己做的手机截图搜题 App Spore。今天只讲设计：类怎么抽、数据怎么落、界面为什么这么长。',
  '先看一遍它实际怎么用，后面全部围绕这条链路拆设计。播完接一句：刚才那条链路，就是接下来 BCE 抽取的输入。',
  '先分工：四棒接力，一人一段；我是第 1 棒，从边界和 BCE 开始。',
  '第一棒：先划边界，再把界面、流程、数据分开。',
  '系统边界是球、框、抽屉、记录这四件事。模型和云端都是外部；MV3 和桌面只是同一套设计的另外两张皮。',
  'BCE 不是背定义：看得见的是边界，背后跑流程的是控制，要存下来的是实体。',
  '边界类举框选层：它只知道一个矩形和确认/取消，不知道题目、模型、科目是什么。',
  '控制类就是一次点击之后，后台按什么顺序干活。同步引擎可以整体关掉，所以单机也能用。',
  '实体就是关掉应用也要留下来的东西。选中态、红点这些临时状态不算实体。',
  '第 8 步是设计重点：先落占位文件，程序中途被杀也不会丢这次会话；内容回来后再补全。',
  '第二棒接手：三类对象已经分清，这一段把它们收成类图，再定义三层怎么说话。',
  '先指会话：这是唯一的内容聚合根；再指墓碑：它不是业务数据，是给同步看的删除证明。',
  '只讲为什么会错：拉取顺手改推送书签，用户的本地修改会静默消失；改名只抬 updated，别的设备就永远看不到改名。',
  '接口就是三层之间的约定：界面说用户点了确认，流程说我去办，数据说存好了。谁都不越界。',
  '用一句话解释双游标：拉取是「我看到哪了」，推送是「我送到哪了」；把前者写进后者，等于把没送出去的改动标记成已送。',
  '第三棒：接口定完，现在把对象落到表里。',
  '强调会话的 subject_id 可空：未分组是一等状态；墓碑是唯一故意不留外键的表。',
  '这页只解释一件事：对象图里的组合关系，落到表里可以拆开也可以合上；拆开不改变同步单位。',
  '只讲两处：updated 和 touched 不是一个东西；消息顺序用 seq 钉死，不靠时间戳。',
  '题图只存相对路径，文件在磁盘；令牌与 API Key 只在本机 prefs，不进表、不上云。',
  '第四棒：库设计完，最后看用户真正看到的两屏。',
  '指着 chips 说：科目是唯一的组织维度，因为搜题记录的规模用不上标签系统。',
  '手机端最重要的不是界面漂亮，是取图只要一次点击、答案不遮住题目。',
  '挑两条讲：防错（删除会话连题图一起删）与状态可见（长任务要让用户知道在跑）。',
  '这页不是感谢 AI：四份草稿，三处错；每处都能指出源码里的实际，和改到了哪一页。',
  '版本表最后一行就是今天这次改动：收尾拆成三页，全稿 27 页。交付五项都能指着页面说。',
  '三端仓库的二维码都在这一页：手机、MV3、桌面；设计稿到此结束，欢迎提问。',
];

export const meta: SlideMeta = {
  title: 'Spore 手机端 · 系统详细设计',
  createdAt: '2026-11-23T04:38:45.287Z',
};

export default [
  Cover,
  Glance,
  Division,
  Section1,
  Scope,
  BceMethod,
  BceBoundary,
  BceControl,
  BceEntity,
  Sequence,
  Section2,
  PimClass,
  PimRules,
  ClientApi,
  CloudApi,
  Section3,
  Er,
  Logical,
  TablesCore,
  TablesSupport,
  Section4,
  UiRecords,
  UiMobile,
  Principles,
  AiUsage,
  ChangeLog,
  Thanks,
] satisfies Page[];
