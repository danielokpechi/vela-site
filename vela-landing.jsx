// vela-landing.jsx — fully responsive landing page.

window.VLanding = function VLanding() {
  const t = window.velaTheme(false);
  const GREEN = '#2A9D6E';
  const DEEP = '#1F7B55';
  const INK = '#1A1A1A';
  const CREAM = '#F5F4F1';
  const PAGE = '#EFEDE8';
  const PAPER = '#FFFFFF';
  const MUTE = 'rgba(26,26,26,0.58)';
  const SUBTLE_BORDER = 'rgba(26,26,26,0.07)';

  const [open, setOpen] = React.useState(null);
  const [inputMode, setInputMode] = React.useState('speak');
  const [navOpen, setNavOpen] = React.useState(false);
  const [aboutFilter, setAboutFilter] = React.useState('all');

  // ── Responsive ─────────────────────────────────────────────────
  const [winW, setWinW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const isMobile = winW < 640;
  const isTablet = winW < 1024;

  // Inject carousel scroll keyframe once
  React.useEffect(() => {
    if (!document.getElementById('vela-marquee-style')) {
      const s = document.createElement('style');
      s.id = 'vela-marquee-style';
      s.textContent = [
        '@keyframes velaMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}',
        '@keyframes velaFadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}',
        '.vela-hero-in{animation:velaFadeUp 0.75s cubic-bezier(.2,.9,.4,1) both}',
        '[data-vela-reveal]{opacity:0;transform:translateY(24px);transition:opacity 0.65s ease,transform 0.65s cubic-bezier(.2,.9,.4,1)}',
        '.vela-lift{transition:transform 0.22s cubic-bezier(.2,.8,.4,1),box-shadow 0.22s ease}',
        '.vela-lift:hover{transform:translateY(-5px)!important;box-shadow:0 22px 44px -10px rgba(15,15,15,0.13)!important}',
      ].join('');
      document.head.appendChild(s);
    }
  }, []);

  // Scroll-reveal: set inline styles directly so React reconciliation won't undo them
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const delay = parseInt(e.target.dataset.velaDelay || '0', 10);
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
        }, delay);
        io.unobserve(e.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-vela-reveal]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ─────────────────────────────────────────────────────────────
  // ATOMS
  // ─────────────────────────────────────────────────────────────

  const Mark = ({ size = 40, color = GREEN, innerColor = CREAM }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" style={{ display: 'block' }}>
      <path d="M18 22 L50 78 L82 22" fill="none" stroke={color}
        strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="82" cy="22" r="9" fill={color} />
      <circle cx="82" cy="22" r="4" fill={innerColor} />
    </svg>
  );

  const MarkInTile = ({ stroke = '#fff', innerColor = GREEN, w = 120 }) => (
    <svg viewBox="0 0 100 100" width={w} height={w} aria-hidden="true">
      <path d="M22 30 L50 76 L78 30" fill="none" stroke={stroke}
        strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="78" cy="30" r="9" fill={stroke} />
      <circle cx="78" cy="30" r="4" fill={innerColor} />
    </svg>
  );

  // Responsive font size helper
  const rfs = (desktop, tablet, mobile) =>
    isMobile ? mobile : isTablet ? tablet : desktop;

  const SplitH = ({ a, b, size = 76, align = 'left' }) => {
    const fs = isMobile ? Math.min(size, 36) : isTablet ? Math.min(size, 52) : size;
    return (
      <h2 style={{
        fontSize: fs, fontWeight: 800, fontFamily: t.display,
        letterSpacing: isMobile ? -1.0 : -2.4, lineHeight: 1.05, color: INK, margin: 0,
        textWrap: 'balance', textAlign: align,
      }}>
        {a}<br /><span style={{ color: GREEN }}>{b}</span>
      </h2>
    );
  };

  const OneH = ({ children, size = 64, align = 'center' }) => {
    const fs = isMobile ? Math.min(size, 34) : isTablet ? Math.min(size, 48) : size;
    return (
      <h2 style={{
        fontSize: fs, fontWeight: 800, fontFamily: t.display,
        letterSpacing: isMobile ? -1.0 : -2.0, lineHeight: 1.06, color: INK, margin: 0,
        textWrap: 'balance', textAlign: align,
      }}>{children}</h2>
    );
  };

  const G = ({ children }) => <span style={{ color: GREEN }}>{children}</span>;

  const Sub = ({ children, max = 480, align = 'left' }) => (
    <p style={{
      fontSize: isMobile ? 15 : 18, color: MUTE, lineHeight: 1.55,
      maxWidth: max, marginTop: isMobile ? 14 : 22,
      marginInline: align === 'center' ? 'auto' : 0,
      textAlign: align,
    }}>{children}</p>
  );

  const CheckList = ({ items, color = GREEN }) => (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: isMobile ? 20 : 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: isMobile ? 14 : 16, color: INK, fontWeight: 500 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 24, height: 24, borderRadius: 12,
            border: `1.5px solid ${color}`, flexShrink: 0,
          }}>
            <window.VIcon name="check" size={12} color={color} stroke={2.4} />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );

  const StoreBadge = ({ tone = 'ink' }) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 11,
      padding: '12px 22px', borderRadius: 14,
      background: tone === 'ink' ? INK : PAPER,
      color: tone === 'ink' ? '#fff' : INK,
      border: tone === 'ink' ? 'none' : `1px solid ${SUBTLE_BORDER}`,
      cursor: 'pointer',
    }}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill={tone === 'ink' ? '#fff' : INK} aria-hidden="true">
        <path d="M17.05 12.04c-.02-2.07 1.69-3.06 1.77-3.11-.97-1.41-2.47-1.6-3.01-1.62-1.28-.13-2.5.75-3.15.75-.66 0-1.66-.74-2.73-.72-1.4.02-2.7.82-3.42 2.07-1.46 2.54-.37 6.3 1.05 8.36.7 1.01 1.52 2.15 2.6 2.11 1.04-.04 1.44-.68 2.7-.68 1.25 0 1.61.68 2.71.66 1.12-.02 1.83-1.02 2.51-2.04.79-1.17 1.12-2.31 1.14-2.37-.03-.01-2.18-.84-2.2-3.32zm-2.08-6.1c.57-.69.96-1.66.85-2.62-.83.03-1.83.55-2.42 1.24-.53.61-.99 1.59-.87 2.54.93.07 1.87-.47 2.44-1.16z" />
      </svg>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 500, opacity: 0.78, letterSpacing: 0.4 }}>Download on the</div>
        <div style={{ fontSize: 17, fontWeight: 700, marginTop: -1, letterSpacing: -0.3 }}>App Store</div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // PHONE — clean device mock w/ optional soft hand-fade vignette
  // ─────────────────────────────────────────────────────────────
  const Phone = ({ children, w = 290, h = 580, screenBg = '#fff', tilt = 0, fade = 'none' }) => (
    <div style={{
      position: 'relative', display: 'inline-block',
      transform: tilt ? `rotate(${tilt}deg)` : 'none',
    }}>
      {/* halo behind */}
      <div style={{
        position: 'absolute', inset: '-40px -40px -20px',
        background: `radial-gradient(ellipse 60% 50% at 50% 55%, rgba(15,15,15,0.12) 0%, transparent 65%)`,
        pointerEvents: 'none', filter: 'blur(8px)',
      }} />
      <div style={{
        width: w, height: h, borderRadius: 44, padding: 7,
        background: '#0F0F0F',
        boxShadow: '0 50px 100px -28px rgba(15,15,15,0.32), 0 0 0 1px rgba(15,15,15,0.05)',
        position: 'relative',
      }}>
        {/* dynamic island */}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 92, height: 28, borderRadius: 20, background: '#000', zIndex: 5,
        }} />
        {/* screen */}
        <div style={{
          width: '100%', height: '100%', borderRadius: 38, overflow: 'hidden',
          background: screenBg, position: 'relative',
        }}>{children}</div>
      </div>
      {fade === 'bottom' && (
        <div style={{
          position: 'absolute', left: -60, right: -60, bottom: -20, height: '38%',
          background: 'linear-gradient(180deg, transparent 0%, var(--cardBg, #fff) 88%)',
          pointerEvents: 'none', borderRadius: 44,
        }} />
      )}
      {fade === 'all' && (
        <div style={{
          position: 'absolute', inset: '-60px -100px -40px',
          background: 'radial-gradient(ellipse 60% 75% at 50% 55%, transparent 30%, var(--cardBg, #fff) 78%)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // SECTION WRAPPERS
  // ─────────────────────────────────────────────────────────────

  const Card = ({ children, style = {}, bg = PAPER, py, px, id }) => {
    const _py = py != null ? py : (isMobile ? 40 : 88);
    const _px = px != null ? px : (isMobile ? 20 : 88);
    return (
      <div id={id} data-vela-reveal="" style={{
        background: bg, borderRadius: isMobile ? 20 : 32,
        padding: `${_py}px ${_px}px`,
        marginBottom: isMobile ? 12 : 22,
        ...style,
        '--cardBg': bg,
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }}>{children}</div>
      </div>
    );
  };

  const Plain = ({ children, py = 96, style = {} }) => {
    const hPad = isMobile ? 16 : 56;
    const vPad = isMobile ? Math.round(py * 0.5) : py;
    return (
      <section style={{ padding: `${vPad}px ${hPad}px`, ...style }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>{children}</div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // PHONE SCREENS
  // ─────────────────────────────────────────────────────────────

  const HomeScreen = ({ scale = 1 }) => (
    <div style={{ padding: '54px 22px 0', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11.5, color: 'rgba(15,15,15,0.5)', fontWeight: 500 }}>April 2026</div>
        <div style={{
          width: 30, height: 30, borderRadius: 15, background: CREAM,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <window.VIcon name="settings" size={15} color={INK} stroke={1.5} />
        </div>
      </div>
      <div style={{
        fontSize: 58, fontWeight: 800, color: INK, fontFamily: t.display,
        letterSpacing: -2.6, marginTop: 14, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
      }}>
        £1,240<span style={{ fontSize: 28, color: 'rgba(15,15,15,0.35)' }}>.50</span>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(15,15,15,0.5)', marginTop: 6 }}>of £2,000 budget</div>
      <div style={{ height: 7, background: CREAM, borderRadius: 4, marginTop: 16, overflow: 'hidden' }}>
        <div style={{ width: '62%', height: '100%', background: GREEN, borderRadius: 4 }} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
        {[
          { e: '🥕', a: '£80', bg: '#E8F3EE' },
          { e: '🍔', a: '£50', bg: '#FFE9DE' },
          { e: '🚇', a: '£20', bg: '#E4ECFF' },
          { e: '🛍', a: '£12', bg: '#F2E2F2' },
        ].map((c, i) => (
          <div key={i} style={{
            flex: 1, padding: '10px 6px', borderRadius: 12, background: c.bg, textAlign: 'center',
          }}>
            <div style={{ fontSize: 18 }}>{c.e}</div>
            <div style={{ fontSize: 10, fontWeight: 700, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>{c.a}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 22, fontSize: 11, fontWeight: 700, color: 'rgba(15,15,15,0.5)', letterSpacing: 0.4 }}>TODAY</div>
      {[
        { e: '☕', n: 'Flat White', c: 'Eating out', a: '£4.20' },
        { e: '🥗', n: 'Lunch — Pret', c: 'Eating out', a: '£9.45' },
        { e: '🚇', n: 'Tube — Z1-2', c: 'Transport', a: '£3.40' },
      ].map((x, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
          borderBottom: i < 2 ? '0.5px solid rgba(15,15,15,0.06)' : 'none',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 16, background: CREAM,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
          }}>{x.e}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{x.n}</div>
            <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.5)' }}>{x.c}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{x.a}</div>
        </div>
      ))}
    </div>
  );

  const AddByVoiceScreen = () => (
    <div style={{ padding: '54px 24px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 14, background: CREAM,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <window.VIcon name="close" size={13} color="rgba(15,15,15,0.5)" stroke={2} />
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'rgba(15,15,15,0.5)', marginTop: 16, fontStyle: 'italic', letterSpacing: 0.2, lineHeight: 1.4 }}>
        Listening…
      </div>
      <div style={{
        fontSize: 26, fontWeight: 800, color: INK, fontFamily: t.display,
        marginTop: 4, letterSpacing: -1, lineHeight: 1.2,
      }}>
        "Steak night,<br />seventy-eight quid"
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 28, height: 60 }}>
        {[20, 36, 48, 28, 56, 40, 24, 44, 36, 52, 28, 20, 32, 48, 36, 20].map((h, i) => (
          <div key={i} style={{
            width: 4, height: h, background: GREEN, borderRadius: 2,
            opacity: 0.4 + (i % 3) * 0.2,
          }} />
        ))}
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 36, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(15,15,15,0.4)', letterSpacing: 0.3, textTransform: 'uppercase' }}>Parsed</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 18px', borderRadius: 100,
          background: CREAM, fontSize: 14, fontWeight: 700,
        }}>
          <span style={{ fontSize: 18 }}>🍔</span> Eating out
          <span style={{ width: 1, height: 14, background: 'rgba(15,15,15,0.15)' }} />
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>£78.00</span>
        </div>
      </div>
    </div>
  );

  const AddManualScreen = () => (
    <div style={{ padding: '54px 22px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(15,15,15,0.5)' }}>Cancel</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>Save</div>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.45)', marginTop: 22, letterSpacing: 0.4, fontWeight: 700, textTransform: 'uppercase' }}>Amount</div>
      <div style={{
        fontSize: 52, fontWeight: 800, color: INK, fontFamily: t.display,
        letterSpacing: -2.2, marginTop: 2, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
        display: 'flex', alignItems: 'baseline', gap: 4,
      }}>
        <span style={{ fontSize: 26, color: 'rgba(15,15,15,0.4)' }}>£</span>78<span style={{ fontSize: 26, color: 'rgba(15,15,15,0.4)' }}>.00</span>
        <span style={{
          display: 'inline-block', width: 2, height: 36, background: GREEN, marginLeft: 2,
          animation: 'velaBlink 1s steps(2) infinite',
        }} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 22, color: INK }}>Note</div>
      <div style={{
        marginTop: 6, padding: '10px 14px', borderRadius: 12, background: CREAM,
        fontSize: 13, color: INK, fontWeight: 500,
      }}>Steak night with Lena</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
        <div style={{
          padding: '7px 12px', borderRadius: 100, background: GREEN, color: '#fff',
          fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span>🍔</span> Eating out
        </div>
        <div style={{ padding: '7px 12px', borderRadius: 100, background: CREAM, fontSize: 12, fontWeight: 600, color: MUTE }}>Today</div>
      </div>
      <div style={{
        marginTop: 'auto', padding: '12px 8px 24px', background: '#D8D6D1',
        marginInline: -22, marginBottom: 0,
      }}>
        {[
          ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
          ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
          ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        ].map((row, ri) => (
          <div key={ri} style={{
            display: 'flex', gap: 4, marginTop: ri ? 6 : 0,
            justifyContent: 'center', paddingInline: ri === 1 ? 14 : 0,
          }}>
            {ri === 2 && (
              <div style={{ background: '#A8A7A3', color: '#fff', borderRadius: 5, width: 28, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⇧</div>
            )}
            {row.map(k => (
              <div key={k} style={{
                flex: 1, height: 32, borderRadius: 5, background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 500, color: INK,
                boxShadow: '0 1px 0 rgba(0,0,0,0.18)',
              }}>{k}</div>
            ))}
            {ri === 2 && (
              <div style={{ background: '#A8A7A3', color: '#fff', borderRadius: 5, width: 28, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⌫</div>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
          <div style={{ background: '#A8A7A3', color: '#fff', borderRadius: 5, paddingInline: 10, height: 32, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center' }}>123</div>
          <div style={{ flex: 1, height: 32, borderRadius: 5, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: INK }}>space</div>
          <div style={{ background: GREEN, color: '#fff', borderRadius: 5, paddingInline: 12, height: 32, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center' }}>return</div>
        </div>
      </div>
    </div>
  );

  const BudgetScreen = () => (
    <div style={{ padding: '54px 22px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', alignSelf: 'flex-start', borderRadius: 100, background: CREAM, fontSize: 11.5, fontWeight: 700 }}>
        <span style={{ fontSize: 14 }}>🍔</span> Eating out
      </div>
      <div style={{ marginTop: 20, fontSize: 14, fontWeight: 700, color: INK }}>Monthly budget</div>
      <div style={{ fontSize: 56, fontWeight: 800, fontFamily: t.display, letterSpacing: -2.4, lineHeight: 1, marginTop: 6 }}>£150</div>
      <div style={{ fontSize: 12, color: 'rgba(15,15,15,0.5)', marginTop: 6 }}>£82.40 spent · £67.60 left</div>
      <div style={{ height: 10, background: CREAM, borderRadius: 5, marginTop: 18, overflow: 'hidden', position: 'relative' }}>
        <div style={{ width: '54%', height: '100%', background: GREEN, borderRadius: 5 }} />
        {[25, 50, 75].map(p => (
          <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'rgba(255,255,255,0.4)' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'rgba(15,15,15,0.4)', fontVariantNumeric: 'tabular-nums' }}>
        <span>£0</span><span>£50</span><span>£100</span><span>£150</span>
      </div>
      <div style={{ marginTop: 30, fontSize: 12, fontWeight: 700, color: 'rgba(15,15,15,0.5)', letterSpacing: 0.3, textTransform: 'uppercase' }}>This week</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 14, height: 84 }}>
        {[28, 14, 42, 22, 36, 60, 30].map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: h, background: i === 5 ? GREEN : '#E8F3EE', borderRadius: 6 }} />
            <div style={{ fontSize: 9, color: 'rgba(15,15,15,0.4)' }}>{'MTWTFSS'[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const InsightScreen = () => (
    <div style={{ padding: '54px 18px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 16, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.4 }}>Insights</div>
      <div style={{ marginTop: 18, padding: 16, borderRadius: 18, background: '#fff', boxShadow: `0 0 0 1px ${SUBTLE_BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mark size={14} color="#fff" innerColor={GREEN} />
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: 0.3, textTransform: 'uppercase' }}>Pattern found</div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK, lineHeight: 1.35 }}>You spend 2× more on coffee on Mondays.</div>
        <div style={{ fontSize: 12, color: 'rgba(15,15,15,0.55)', marginTop: 6, lineHeight: 1.4 }}>Avg £8.40 vs £4.20 the rest of the week, over the last 8 weeks.</div>
      </div>
      <div style={{ marginTop: 12, padding: 16, borderRadius: 18, background: CREAM }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>April vs March</div>
        <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.55)', marginTop: 4 }}>You're £124 ahead on groceries.</div>
      </div>
      <div style={{
        marginTop: 'auto', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 16px', borderRadius: 100,
        background: '#fff', boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`,
      }}>
        <div style={{ flex: 1, fontSize: 12.5, color: 'rgba(15,15,15,0.55)' }}>How did my spending change this year?</div>
        <div style={{ width: 30, height: 30, borderRadius: 15, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <window.VIcon name="arrow" size={14} color="#fff" stroke={2.4} />
        </div>
      </div>
    </div>
  );

  const SharedScreen = () => (
    <div style={{ padding: '54px 18px 0', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: '#FFE9DE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤝</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.3 }}>Shared with Lena</div>
          <div style={{ fontSize: 10.5, color: 'rgba(15,15,15,0.5)' }}>2 people · synced</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.5)', marginTop: 22 }}>Total this month</div>
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: t.display, letterSpacing: -1.8, lineHeight: 1, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
        £1,842<span style={{ fontSize: 22, color: 'rgba(15,15,15,0.35)' }}>.10</span>
      </div>
      <div style={{ marginTop: 22, padding: 14, borderRadius: 18, background: '#fff', boxShadow: `0 0 0 1px ${SUBTLE_BORDER}` }}>
        {[
          { who: 'Lena', e: '🛒', n: "Tesco big shop", a: '£64.20', when: '2h' },
          { who: 'You', e: '⛽', n: 'Petrol', a: '£42.00', when: '4h' },
          { who: 'Lena', e: '🍕', n: 'Date night', a: '£38.50', when: 'Yesterday' },
        ].map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
            borderTop: i > 0 ? '0.5px solid rgba(15,15,15,0.06)' : 'none',
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{r.e}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>{r.n}</div>
              <div style={{ fontSize: 10, color: 'rgba(15,15,15,0.5)' }}>
                <span style={{ color: r.who === 'You' ? INK : GREEN, fontWeight: 700 }}>{r.who}</span> · {r.when}
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{r.a}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ═════════════════════════════════════════════════════════════
  // PAGE
  // ═════════════════════════════════════════════════════════════
  return (
    <div style={{ background: PAGE, color: INK, fontFamily: t.body, minHeight: '100%' }}>

      {/* ──────────────────── NAV ──────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        background: 'rgba(239,237,232,0.78)',
        borderBottom: `0.5px solid ${SUBTLE_BORDER}`,
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          padding: isMobile ? '14px 20px' : '18px 56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mark size={isMobile ? 26 : 32} />
            <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, letterSpacing: -1, fontFamily: t.display }}>vela</div>
          </div>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: 32, fontSize: 14, color: MUTE, fontWeight: 600 }}>
              {['Voice', 'Features', 'Reviews', 'FAQ'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} onClick={e => {
                  e.preventDefault();
                  document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }} style={{ cursor: 'pointer', textDecoration: 'none', color: MUTE }}>{l}</a>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile ? '8px 14px' : '10px 18px',
              borderRadius: 100, background: INK, color: '#fff',
              fontSize: isMobile ? 12 : 13.5, fontWeight: 700, cursor: 'pointer',
            }}>
              Download
            </div>
            {/* Hamburger — mobile only */}
            {isMobile && (
              <div onClick={() => setNavOpen(o => !o)} style={{
                width: 36, height: 36, borderRadius: 10, background: CREAM,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
                cursor: 'pointer',
              }}>
                <span style={{ width: 16, height: 1.5, background: INK, borderRadius: 2, display: 'block', transition: 'all 0.2s', transform: navOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
                <span style={{ width: 16, height: 1.5, background: INK, borderRadius: 2, display: 'block', opacity: navOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
                <span style={{ width: 16, height: 1.5, background: INK, borderRadius: 2, display: 'block', transition: 'all 0.2s', transform: navOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile nav drawer */}
        {isMobile && navOpen && (
          <div style={{
            background: 'rgba(239,237,232,0.97)', borderTop: `0.5px solid ${SUBTLE_BORDER}`,
            padding: '16px 20px 20px',
          }}>
            {['Voice', 'Features', 'Reviews', 'FAQ'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={e => {
                e.preventDefault();
                setNavOpen(false);
                document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }} style={{
                display: 'block', padding: '14px 0', fontSize: 17, fontWeight: 600, color: INK,
                borderBottom: `0.5px solid ${SUBTLE_BORDER}`, cursor: 'pointer', textDecoration: 'none',
              }}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ──────────────────── HERO ──────────────────── */}
      <Plain py={88} style={{ paddingTop: isMobile ? 40 : 64, paddingBottom: isMobile ? 32 : 48 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? 40 : 56,
          alignItems: 'center',
          minHeight: isMobile ? 'auto' : 560,
        }}>
          <div className="vela-hero-in" style={{ animationDelay: '0.1s' }}>
            <h1 style={{
              fontSize: isMobile ? 52 : isTablet ? 72 : 96,
              fontWeight: 800,
              letterSpacing: isMobile ? -2 : -3.4,
              lineHeight: 0.97,
              fontFamily: t.display,
              margin: 0, color: INK,
            }}>
              Track every expense.<br />
              <span style={{ color: GREEN }}>Effortlessly.</span>
            </h1>
            <p style={{
              fontSize: isMobile ? 16 : 21, color: MUTE, lineHeight: 1.5,
              marginTop: isMobile ? 18 : 28, maxWidth: 460, fontWeight: 400,
            }}>
              Speak it, type it, or let it log itself. Vela hears you, parses it, files it — so tracking finally takes seconds, not minutes.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: isMobile ? 28 : 40, alignItems: 'center', flexWrap: 'wrap' }}>
              <StoreBadge />
              <div style={{ fontSize: 12.5, color: MUTE, lineHeight: 1.45 }}>
                iPhone &amp; iPad<br />iOS 16 +
              </div>
            </div>
          </div>

          {/* Hero phone */}
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: isMobile ? 'auto' : 620,
            paddingBottom: isMobile ? 20 : 0,
            '--cardBg': PAGE,
          }}>
            <div style={{ transform: 'rotate(-4deg)' }}>
              <Phone w={300} h={600} fade="bottom">
                <HomeScreen />
              </Phone>
            </div>
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 180,
              background: `linear-gradient(180deg, transparent 0%, ${PAGE} 80%)`,
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </Plain>

      {/* ──────────────── HOW IT WORKS ──────────────── */}
      <Plain py={56} style={{ paddingTop: isMobile ? 32 : 64, paddingBottom: isMobile ? 40 : 80 }}>
        <div style={{
          background: PAPER, borderRadius: isMobile ? 20 : 32,
          padding: isMobile ? '40px 20px' : '64px 56px',
          position: 'relative', overflow: 'hidden',
          boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`,
        }}>
          <div style={{
            position: 'absolute', top: -120, right: -120, width: 360, height: 360,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${GREEN}22 0%, transparent 60%)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -160, left: -120, width: 380, height: 380,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${GREEN}1a 0%, transparent 60%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 56, position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 100, background: `${GREEN}1a`,
              fontSize: 12, fontWeight: 700, color: GREEN, marginBottom: 18, letterSpacing: 0.2,
              whiteSpace: 'nowrap',
            }}>
              <Mark size={14} /> How it works
            </div>
            <h3 style={{
              fontSize: isMobile ? 28 : isTablet ? 32 : 38,
              fontWeight: 800, fontFamily: t.display,
              letterSpacing: isMobile ? -0.8 : -1.4, margin: 0, color: INK, lineHeight: 1.1,
              textWrap: 'balance',
            }}>
              Three habits, <G>one loop.</G>
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 12 : 24,
            position: 'relative',
          }}>
            {[
              {
                n: '01',
                illo: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 100, background: '#E8F3EE', fontSize: 13, fontWeight: 700 }}>
                      <span style={{ fontSize: 15 }}>🥕</span> Groceries
                    </div>
                    <div style={{ padding: '8px 14px', borderRadius: 100, background: '#fff', boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`, fontSize: 13, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>£34.95</div>
                  </div>
                ),
                t: 'Enter effortlessly',
                d: 'Type, speak, or let automations do it. No forms, no friction.',
              },
              {
                n: '02',
                illo: (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 14px)', gap: 4 }}>
                    {Array.from({ length: 21 }).map((_, i) => {
                      const filled = i < 12 && (i + Math.floor(i / 7)) % 2 === 0;
                      return <div key={i} style={{
                        width: 14, height: 14, borderRadius: 3,
                        background: filled ? GREEN : 'transparent',
                        border: `1.5px solid ${filled ? GREEN : 'rgba(15,15,15,0.12)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{filled && <window.VIcon name="check" size={9} color="#fff" stroke={3} />}</div>;
                    })}
                  </div>
                ),
                t: 'Build the habit',
                d: 'When logging takes seconds, you actually do it. Consistency just happens.',
              },
              {
                n: '03',
                illo: (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
                    {[
                      { e: '🥕', h: 56, bg: '#E8F3EE' },
                      { e: '🍔', h: 40, bg: '#FFE9DE' },
                      { e: '🚇', h: 28, bg: '#E4ECFF' },
                      { e: '🛍', h: 18, bg: '#F2E2F2' },
                    ].map((c, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 28, height: c.h, borderRadius: 6, background: c.bg }} />
                        <div style={{ fontSize: 14 }}>{c.e}</div>
                      </div>
                    ))}
                  </div>
                ),
                t: 'See the full picture',
                d: 'Spot patterns, ask questions, understand where your money actually goes.',
              },
            ].map((c, i) => (
              <div key={i} className="vela-lift" data-vela-reveal="" data-vela-delay={i * 100} style={{
                position: 'relative',
                padding: isMobile ? '24px 20px' : '32px 28px',
                borderRadius: 22,
                background: CREAM,
                display: 'flex', flexDirection: 'column', gap: 16,
                minHeight: isMobile ? 'auto' : 240,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: GREEN, fontFamily: t.display, letterSpacing: -0.2 }}>{c.n}</div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 14, background: PAPER,
                    boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <window.VIcon name="arrow" size={13} color={INK} stroke={2} />
                  </div>
                </div>
                <div style={{ minHeight: isMobile ? 'auto' : 64, display: 'flex', alignItems: 'center' }}>{c.illo}</div>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontSize: isMobile ? 18 : 21, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.5 }}>{c.t}</div>
                  <div style={{ fontSize: 14, color: MUTE, lineHeight: 1.55, marginTop: 8 }}>{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Plain>

      {/* ─────────── FEATURES HEADER ─────────── */}
      <div id="features" style={{ textAlign: 'center', padding: isMobile ? '16px 20px 0' : '20px 0 0' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 16px', borderRadius: 100, background: '#fff',
          boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`,
          fontSize: 13, fontWeight: 700, color: INK, fontFamily: t.body,
        }}>Features</div>
        <h2 style={{
          fontSize: isMobile ? 34 : isTablet ? 48 : 64,
          fontWeight: 800, fontFamily: t.display,
          letterSpacing: isMobile ? -1.2 : -2.2,
          lineHeight: 1.06, marginTop: isMobile ? 16 : 26, color: INK, textWrap: 'balance',
          padding: isMobile ? '0 4px' : 0,
        }}>
          Everything you need,<br />nothing you don't.
        </h2>
        <p style={{ fontSize: isMobile ? 15 : 17, color: MUTE, marginTop: isMobile ? 12 : 18, maxWidth: 540, marginInline: 'auto', lineHeight: 1.55 }}>
          Track expenses in real time without jumping between tools or spreadsheets.
        </p>
      </div>

      <div style={{ padding: isMobile ? '32px 12px 12px' : '60px 22px 22px' }}>

        {/* ─────────── VOICE ─────────── */}
        <Card id="voice">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '0.95fr 1.05fr',
            gap: isMobile ? 32 : 64,
            alignItems: 'center',
          }}>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', '--cardBg': PAPER }}>
              <Phone w={280} h={560} fade="bottom">
                {inputMode === 'speak' ? <AddByVoiceScreen /> : <AddManualScreen />}
              </Phone>
            </div>
            <div>
              <div style={{
                display: 'inline-flex', padding: 4, borderRadius: 100,
                background: CREAM, marginBottom: 18,
              }}>
                {['speak', 'manual'].map(m => {
                  const on = inputMode === m;
                  return (
                    <div key={m} onClick={() => setInputMode(m)} style={{
                      padding: '8px 18px', borderRadius: 100,
                      background: on ? INK : 'transparent',
                      color: on ? '#fff' : MUTE,
                      fontSize: 13, fontWeight: 700, cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}>{m}</div>
                  );
                })}
              </div>
              <SplitH a={inputMode === 'speak' ? 'Speak your expenses.' : 'Or just type it.'}
                b={inputMode === 'speak' ? 'Done in seconds.' : 'Old-school still works.'}
                size={64} />
              <Sub>
                {inputMode === 'speak'
                  ? 'Tell Vela about your day: "I just went to the cinema for £19, the popcorn was £4." Natural speech becomes organised data — amount, merchant, category — instantly.'
                  : 'Prefer to tap? The manual form is just as quick — amount, note, category, done. Vela remembers your last picks so the next entry is even faster.'}
              </Sub>
              <CheckList items={inputMode === 'speak' ? [
                'Natural language processing',
                'Auto-detects amount, merchant, date & tags',
                'Hands-free, single-tap tracking',
              ] : [
                'Big tap targets, designed for one-handed use',
                'Smart defaults from your recent entries',
                'Logged in three taps, every time',
              ]} />
            </div>
          </div>
        </Card>

        {/* ─────────── APPLE PAY ─────────── */}
        <Card>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
            gap: isMobile ? 32 : 64,
            alignItems: 'center',
          }}>
            <div>
              <SplitH a="Pay with Apple Pay." b="Log automatically." size={62} />
              <Sub>
                Every time you tap to pay, Vela logs the expense. No more forgetting, no end-of-day catch-up. Your spending is tracked the moment it happens.
              </Sub>
              <CheckList items={[
                'Instant post-payment automation',
                'Zero-effort tracking',
                'Works with Apple Shortcuts™',
              ]} />
              <div style={{
                marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 8,
                color: INK, fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>
                Show all ways to automate
                <span style={{
                  width: 22, height: 22, borderRadius: 11, background: CREAM,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <window.VIcon name="chevD" size={12} color={INK} stroke={2.4} />
                </span>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', '--cardBg': PAPER, minHeight: isMobile ? 200 : 'auto' }}>
              <div style={{ position: 'relative', display: 'inline-block', transform: 'rotate(-6deg)' }}>
                <div style={{
                  position: 'absolute', inset: '-30px',
                  background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(15,15,15,0.08) 0%, transparent 65%)`,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  width: isMobile ? 200 : 240, height: isMobile ? 120 : 150,
                  borderRadius: 22,
                  background: 'linear-gradient(180deg, #fff 0%, #F5F4F1 100%)',
                  boxShadow: '0 30px 60px -20px rgba(15,15,15,0.2), 0 0 0 1px rgba(15,15,15,0.05)',
                  position: 'relative', padding: 20,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(15,15,15,0.5)' }}>VELA · UK</div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, fontFamily: t.display, marginTop: isMobile ? 10 : 18, letterSpacing: -0.6 }}>£12.40</div>
                  <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.5)', marginTop: 2 }}>Tap your phone to pay</div>
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    width: 32, height: 32, borderRadius: 16, background: '#0F4FAA',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <window.VIcon name="sound" size={14} color="#fff" />
                  </div>
                </div>
                {!isMobile && (
                  <div style={{ position: 'absolute', top: -40, right: -60, transform: 'rotate(20deg)' }}>
                    <div style={{
                      width: 90, height: 170, borderRadius: 18, padding: 5, background: '#0F0F0F',
                      boxShadow: '0 20px 40px -10px rgba(15,15,15,0.3)',
                    }}>
                      <div style={{
                        width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden',
                        background: 'linear-gradient(180deg, #2A9D6E 0%, #1F7B55 100%)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: 8, color: '#fff',
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85 }}>Hold near</div>
                        <div style={{
                          width: 30, height: 30, borderRadius: 8,
                          background: 'rgba(255,255,255,0.18)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: '1.5px solid rgba(255,255,255,0.5)',
                        }}>
                          <window.VIcon name="sound" size={16} color="#fff" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{
                  position: 'absolute', bottom: isMobile ? -40 : -50, left: isMobile ? 0 : -10,
                  background: '#fff', padding: '10px 14px', borderRadius: 14,
                  boxShadow: `0 10px 24px -6px rgba(15,15,15,0.15), 0 0 0 1px ${SUBTLE_BORDER}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                  transform: 'rotate(6deg)',
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 11, background: GREEN,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <window.VIcon name="check" size={12} color="#fff" stroke={2.4} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700 }}>Logged £12.40</div>
                    <div style={{ fontSize: 9.5, color: MUTE }}>Shopping · just now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ─────────── ASK VELA ─────────── */}
        <Card>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
            gap: isMobile ? 32 : 64,
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 360, position: 'relative' }}>
                <div style={{
                  background: '#fff', padding: 18, borderRadius: 22,
                  boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`,
                  marginBottom: 14,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 12, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mark size={14} color="#fff" innerColor={GREEN} />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: 0.3, textTransform: 'uppercase' }}>Vela</div>
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.5, color: INK }}>
                    You spent <b>£487 on dining</b> this month — that's 22% above your average. Most of it was on Fridays.
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                    {['Set a budget', 'Show breakdown'].map(c => (
                      <div key={c} style={{
                        padding: '7px 12px', borderRadius: 100,
                        background: CREAM, fontSize: 12, fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}>{c}</div>
                    ))}
                  </div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '14px 16px', borderRadius: 100,
                  background: '#fff', boxShadow: `0 8px 24px -8px rgba(15,15,15,0.12), 0 0 0 1px ${SUBTLE_BORDER}`,
                }}>
                  <div style={{ flex: 1, fontSize: 14, color: 'rgba(15,15,15,0.55)' }}>
                    How did my spending change over the year?
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: 18, background: GREEN,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 8px 16px -4px ${GREEN}66`, flexShrink: 0,
                  }}>
                    <window.VIcon name="arrow" size={16} color="#fff" stroke={2.4} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <OneH align="left" size={62}>Ask your finances <G>anything.</G></OneH>
              <Sub>
                Get insights that were never possible before. Vela can analyse your finances on demand and give you tailored answers, patterns, and recommendations.
              </Sub>
              <CheckList items={[
                'Fast answers to any question',
                'Pattern insights you wouldn\'t spot manually',
                'Trend analysis across months and years',
              ]} />
            </div>
          </div>
        </Card>

        {/* ─────────── SET LIMITS ─────────── */}
        <Card>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
            gap: isMobile ? 32 : 64,
            alignItems: 'center',
          }}>
            <div>
              <SplitH a="Set limits." b="Stay on track." size={64} />
              <Sub>
                Define spending limits for any category and watch your progress in real time. Know exactly where you stand — <i>before</i> you overspend, not after.
              </Sub>
              <CheckList items={[
                'Visual progress per category',
                'Home Screen widgets at a glance',
                'See what\'s left while adding expenses',
              ]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', '--cardBg': PAPER }}>
              <Phone w={280} h={560} tilt={isMobile ? 0 : 3} fade="bottom">
                <BudgetScreen />
              </Phone>
            </div>
          </div>
        </Card>

        {/* ─────────── MINIMALIST DESIGN ─────────── */}
        <Card>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '0.95fr 1.05fr',
            gap: isMobile ? 32 : 64,
            alignItems: 'center',
          }}>
            {/* On mobile show text first */}
            {isMobile && (
              <div>
                <SplitH a="Minimalist design." b="Great UX." size={64} />
                <Sub>
                  No bloat, no overwhelming dashboards, no feature creep. Just the essentials you actually need, designed to be a joy to use every single day.
                </Sub>
                <CheckList items={[
                  'Clean, focused interface',
                  'No unnecessary complexity',
                  'Delightful daily experience',
                ]} />
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', '--cardBg': PAPER }}>
              <Phone w={280} h={560} tilt={isMobile ? 0 : -3} fade="bottom">
                <HomeScreen />
              </Phone>
            </div>
            {!isMobile && (
              <div>
                <SplitH a="Minimalist design." b="Great UX." size={64} />
                <Sub>
                  No bloat, no overwhelming dashboards, no feature creep. Just the essentials you actually need, designed to be a joy to use every single day.
                </Sub>
                <CheckList items={[
                  'Clean, focused interface',
                  'No unnecessary complexity',
                  'Delightful daily experience',
                ]} />
              </div>
            )}
          </div>
        </Card>

        {/* ─────────── TRACK TOGETHER ─────────── */}
        <Card>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
            gap: isMobile ? 32 : 64,
            alignItems: 'center',
          }}>
            <div>
              <OneH align="left" size={62}>Track together.</OneH>
              <Sub>
                Split expenses with a partner. Shared lists keep you both in sync — automatically, in real time. Decide what to share and what to keep private.
              </Sub>
              <CheckList items={[
                'Real-time automatic sync',
                'Choose per list: shared or private',
                'Shared insights across both of you',
              ]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', '--cardBg': PAPER }}>
              <Phone w={270} h={540} tilt={isMobile ? 0 : 4} fade="bottom">
                <SharedScreen />
              </Phone>
              {!isMobile && (
                <div style={{ position: 'absolute', top: -20, left: 10, transform: 'rotate(-12deg)' }}>
                  <div style={{
                    width: 110, height: 200, borderRadius: 22, padding: 5, background: '#0F0F0F',
                    boxShadow: '0 24px 40px -10px rgba(15,15,15,0.25)',
                  }}>
                    <div style={{
                      width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden',
                      background: '#1A1A1A', padding: '20px 12px',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff',
                    }}>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: 0.3 }}>HOW MUCH</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: 0.3 }}>IS LEFT?</div>
                      <div style={{ marginTop: 10, position: 'relative', width: 56, height: 56 }}>
                        <svg viewBox="0 0 48 48" width="56" height="56">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
                          <circle cx="24" cy="24" r="20" fill="none" stroke={GREEN} strokeWidth="5"
                            strokeDasharray="80 200" strokeLinecap="round" transform="rotate(-90 24 24)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ─────────── UNLIMITED WAYS TO TRACK ─────────── */}
        <Card>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
            <OneH size={56}>Unlimited ways to track.</OneH>
            <Sub max={600} align="center">
              Vela on iOS connects to <b>Apple Shortcuts™</b>, turning any trigger into an expense entry. Set it once, track forever.
            </Sub>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 10 : 16,
          }}>
            {[
              { icon: 'home', t: 'Apple Pay Automation', d: 'Logs your expenses right after you pay.' },
              { icon: 'sparkle', t: 'Photo → Transaction', d: 'Snap a receipt; OCR extracts the details.' },
              { icon: 'micF', t: 'Action Button Voice', d: 'Press the side button, speak your expense, done.' },
              { icon: 'chart', t: 'Screenshot → Entry', d: 'Screenshot a purchase confirmation; it becomes an entry.' },
              { icon: 'arrow', t: 'Email Automation', d: 'Turn bank e-mails into transactions automatically.' },
              { icon: 'sound', t: 'Message Trigger', d: 'Turn bank SMS notifications into transactions.' },
            ].map((f, i) => (
              <div key={i} className="vela-lift" data-vela-reveal="" data-vela-delay={i * 80} style={{
                padding: isMobile ? 18 : 24, borderRadius: 20, background: PAPER,
                border: `1px solid ${SUBTLE_BORDER}`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: CREAM,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <window.VIcon name={f.icon} size={22} color={INK} stroke={1.8} />
                </div>
                <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.4, marginTop: isMobile ? 12 : 18 }}>{f.t}</div>
                <div style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.55, marginTop: 6 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* ─────────── REVIEWS ─────────── */}
        <Card id="reviews" py={isMobile ? 48 : 88}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 100, background: CREAM,
              fontSize: 12, fontWeight: 700, color: INK, marginBottom: 18,
            }}>From the beta</div>
            <OneH size={56}>What early users say.</OneH>
            <p style={{ fontSize: 15, color: MUTE, marginTop: 16 }}>Honest feedback from our TestFlight cohort.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 10 : 16,
          }}>
            {[
              { t: 'Voice input is the unlock', b: "Said 'lunch 12' walking out of Pret. It was logged before I got back to my desk. The friction is just gone.", who: 'Marcus T.', stars: 5 },
              { t: 'Finally, calm finance', b: "Other apps shout at me with red numbers. Vela just shows me what I spent. That's enough — and it's a lot.", who: 'Eline V.', stars: 5 },
              { t: 'My partner & I both use it', b: "Shared list with my husband. We both log, both see totals. No more 'who paid for groceries?' arguments.", who: 'Sara K.', stars: 4 },
            ].map((r, i) => (
              <div key={i} className="vela-lift" data-vela-reveal="" data-vela-delay={i * 100} style={{
                padding: isMobile ? 20 : 26, borderRadius: 20, background: CREAM,
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[...Array(r.stars)].map((_, j) => <span key={j} style={{ color: '#E9A23B', fontSize: 14 }}>★</span>)}
                  {[...Array(5 - r.stars)].map((_, j) => <span key={j} style={{ color: 'rgba(15,15,15,0.15)', fontSize: 14 }}>★</span>)}
                </div>
                <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.3, marginTop: 14, lineHeight: 1.25 }}>{r.t}</div>
                <div style={{ fontSize: 14, color: MUTE, lineHeight: 1.55, marginTop: 10, flex: 1 }}>{r.b}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 18 }}>{r.who} <span style={{ color: MUTE, fontWeight: 500, marginLeft: 4 }}>· TestFlight beta</span></div>
              </div>
            ))}
          </div>
        </Card>

        {/* ─────────── FAQ ─────────── */}
        <Card id="faq" py={isMobile ? 48 : 88}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>
            <OneH size={56}>Questions, <G>answered.</G></OneH>
          </div>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {[
              { q: 'Does Vela connect to my bank account?', a: "No — you log expenses by voice, manually, or via Apple Pay automation. No bank connection means no security risk and nothing to disconnect when your bank changes their API." },
              { q: 'Is my data private and secure?', a: 'All data is encrypted in transit and at rest. You can export or delete everything at any time from Settings.' },
              { q: 'What happens after the 7-day trial?', a: "You're moved to the free plan automatically. No charge, no card on file to forget about." },
              { q: 'Is there an Android version?', a: "Not yet. Vela is iPhone & iPad only for now — we're focused on getting the iOS experience right before we expand. Android is on the roadmap for later this year." },
              { q: 'Can I export my data?', a: 'Yes — export to CSV from Settings. Available on the Premium plan.' },
              { q: 'Does it work offline?', a: "Yes — all data is stored locally first. It syncs to the cloud when you're back online." },
            ].map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    borderTop: i === 0 ? `0.5px solid rgba(15,15,15,0.1)` : 'none',
                    borderBottom: '0.5px solid rgba(15,15,15,0.1)',
                    padding: isMobile ? '18px 0' : '22px 0', cursor: 'pointer',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, color: INK, letterSpacing: -0.2 }}>{f.q}</div>
                    <div style={{
                      width: 32, height: 32, borderRadius: 16,
                      background: isOpen ? GREEN : CREAM, color: isOpen ? '#fff' : INK,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, lineHeight: 1, flexShrink: 0,
                      transition: 'all 0.2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    }}>+</div>
                  </div>
                  {isOpen && (
                    <div style={{
                      marginTop: 14, fontSize: 15.5, color: MUTE,
                      lineHeight: 1.6, maxWidth: 620,
                    }}>{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ─────────── ABOUT ─────────── */}
      {(() => {
        const MICHAEL_IMGS = [
          'images/photo 1.2.JPG',
          'images/Photo 2.2.jpg',
          'images/photo_3.2_.jpg',
        ];
        const DANIEL_IMGS = [
          'images/photo 1.1.JPG',
          'images/photo 2.1.JPG',
          'images/photo_3.1.jpg',
        ];
        const US_IMGS = [
          'images/together.jpg',
          'images/together 2.jpg',
          'images/together arsenal.jpg',
          'images/together_city.jpg',
        ];
        const ALL_IMGS = [
          'images/photo 1.1.JPG',
          'images/photo 1.2.JPG',
          'images/photo 2.1.JPG',
          'images/Photo 2.2.jpg',
          'images/photo_3.1.jpg',
          'images/photo_3.2_.jpg',
          ...US_IMGS,
        ];

        const imgSet = aboutFilter === 'michael' ? MICHAEL_IMGS
          : aboutFilter === 'daniel' ? DANIEL_IMGS
            : aboutFilter === 'us' ? US_IMGS
              : ALL_IMGS;

        const marqueeImgs = [...imgSet, ...imgSet];

        const IMG_H = isMobile ? 220 : 300;
        const IMG_W = isMobile ? 160 : 220;
        const IMG_GAP = isMobile ? 12 : 16;

        const NamePill = ({ filterId, children }) => {
          const active = aboutFilter === filterId;
          return (
            <span onClick={() => setAboutFilter(active ? 'all' : filterId)} style={{
              display: 'inline-block',
              padding: '1px 10px 2px',
              borderRadius: 100,
              border: `1.5px solid ${active ? INK : 'rgba(26,26,26,0.28)'}`,
              background: active ? INK : 'transparent',
              color: active ? '#fff' : INK,
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              transition: 'all 0.15s',
              verticalAlign: 'baseline',
              userSelect: 'none',
            }}>{children}</span>
          );
        };

        return (
          <Plain py={isMobile ? 60 : 100}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 44 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 16px', borderRadius: 100, background: '#fff',
                boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`,
                fontSize: 13, fontWeight: 700, color: INK,
              }}>About us</div>
            </div>

            {/* Rolling carousel — always animating, content changes with name clicks */}
            <div style={{
              marginLeft: isMobile ? -20 : -56,
              marginRight: isMobile ? -20 : -56,
              overflow: 'hidden',
              marginBottom: isMobile ? 40 : 60,
            }}>
              <div key={aboutFilter} style={{
                display: 'flex',
                gap: IMG_GAP,
                paddingLeft: isMobile ? 20 : 56,
                animation: `velaMarquee ${imgSet.length * 5}s linear infinite`,
                width: 'max-content',
              }}>
                {marqueeImgs.map((src, i) => (
                  <div key={i} style={{
                    width: IMG_W, height: IMG_H, flexShrink: 0,
                    borderRadius: isMobile ? 14 : 18, overflow: 'hidden',
                    background: CREAM,
                  }}>
                    <img src={src} alt="" style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      display: 'block',
                    }} onError={e => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bio paragraphs with inline clickable name pills */}
            <div data-vela-reveal="" style={{
              maxWidth: 640, margin: '0 auto',
              fontSize: isMobile ? 16 : 18,
              color: MUTE,
              lineHeight: 1.85,
              textAlign: 'center',
            }}>
              <p style={{ marginBottom: isMobile ? 18 : 24 }}>
                Just two people who somehow met by chance, definitely not by spending years living in the same house together because they’re brothers, and ended up building a money tracking app to solve their own money problems.              </p>
              <p style={{ marginBottom: isMobile ? 18 : 24 }}>
                First, there's <NamePill filterId="michael">Michael</NamePill>, iOS developer, software engineer, and one half of this surprisingly functional duo.
              </p>
              <p style={{ marginBottom: isMobile ? 18 : 24 }}>
                Then there's <NamePill filterId="daniel">Daniel</NamePill>, software developer, product manager, design guy, and the reason things don't just work, but actually look good too.
              </p>
              <p>
                And then there's <NamePill filterId="us">us</NamePill>, two first class Computer Science graduates, brothers by birth, builders by choice, trying to make managing money feel a little less painful.
              </p>
            </div>
          </Plain>
        );
      })()}

      {/* ─────────── FINAL CTA ─────────── */}
      <Plain py={120} style={{ textAlign: 'center' }}>
        <div data-vela-reveal="">
          <OneH size={68}>Start tracking <G>effortlessly.</G></OneH>
          <p style={{ fontSize: isMobile ? 16 : 18, color: MUTE, marginTop: isMobile ? 16 : 22, maxWidth: 540, marginInline: 'auto', lineHeight: 1.5 }}>
            Try Premium free for 7 days. No card required. Cancel any time.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: isMobile ? 24 : 36 }}>
            <StoreBadge />
          </div>
        </div>
      </Plain>

      {/* ─────────── FOOTER ─────────── */}
      <footer style={{
        background: '#0F0F0F', color: '#fff',
        padding: isMobile ? '48px 20px 24px' : '72px 56px 32px',
        marginTop: isMobile ? 16 : 32,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -160, right: -120, width: 480, height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${GREEN}40 0%, transparent 65%)`,
          pointerEvents: 'none', filter: 'blur(20px)',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, right: -40, opacity: 0.06, pointerEvents: 'none',
          transform: 'rotate(-12deg)',
        }}>
          <Mark size={isMobile ? 180 : 320} color="#fff" innerColor="#0F0F0F" />
        </div>

        <div style={{
          maxWidth: 1180, margin: '0 auto', position: 'relative',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? 32 : 48,
        }}>
          <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Mark size={32} color={GREEN} innerColor="#0F0F0F" />
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: t.display, letterSpacing: -1, color: '#fff' }}>vela</div>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: 300 }}>
              The expense tracker that gets out of your way.
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 18,
              padding: '6px 12px', borderRadius: 100,
              background: `${GREEN}22`, color: GREEN,
              fontSize: 12, fontWeight: 700, letterSpacing: 0.3,
              whiteSpace: 'nowrap',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: GREEN }} />
              Live on the App Store
            </div>
          </div>
          {[
            {
              h: 'LEGAL', links: [
                { label: 'Terms of Service', href: 'legal.html#terms' },
                { label: 'Privacy Policy', href: 'legal.html#privacy' },
                { label: 'Cookie Policy', href: 'legal.html#cookie' },
                { label: 'EULA', href: 'legal.html#eula' },
              ]
            },
            {
              h: 'CONTACT', links: [
                { label: 'FAQ', href: '#faq' },
                { label: 'hello@vela.app', href: 'mailto:hello@vela.app' },
                { label: 'Twitter / X', href: '#' },
                { label: 'Instagram', href: '#' },
              ]
            },
            {
              h: 'DOWNLOAD', links: [
                { label: 'App Store', href: '#' },
                { label: 'Press kit', href: '#' },
                { label: 'Changelog', href: '#' },
              ]
            },
          ].map(c => (
            <div key={c.h}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: GREEN, letterSpacing: 0.7, marginBottom: 18 }}>{c.h}</div>
              {c.links.map(x => (
                <a key={x.label} href={x.href} style={{
                  display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.78)',
                  padding: '6px 0', cursor: 'pointer', textDecoration: 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.78)'}
                >{x.label}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          maxWidth: 1180, margin: '40px auto 0', paddingTop: 22,
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 8 : 0,
          fontSize: 12.5, color: 'rgba(255,255,255,0.45)',
          position: 'relative',
        }}>
          <div>© 2026 Vela. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>Made with</span>
            <span style={{ color: GREEN, fontSize: 14 }}>♦</span>
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>in London</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
