// vela-landing.jsx — Marketing landing page for Vela.
// Anchored in the final Spark V brand: chevron+spark mark, Vela Green, cream/ink palette.

window.VLanding = function VLanding() {
  const t = window.velaTheme(false);
  const GREEN = t.accent;        // #2A9D6E
  const DEEP  = '#1F7B55';
  const INK   = '#0F0F0F';
  const CREAM = '#F5F4F1';
  const PAPER = '#FFFFFF';

  const [open, setOpen] = React.useState(null);
  const [plan, setPlan] = React.useState('yearly');

  // ── Section wrapper ──────────────────────────────────────────────
  const Section = ({ children, bg = PAPER, py = 120, style = {} }) => (
    <section style={{ background: bg, padding: `${py}px 56px` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', ...style }}>{children}</div>
    </section>
  );

  const SectionLabel = ({ n, children }) => (
    <div style={{
      fontSize: 11, fontWeight: 700, color: 'rgba(15,15,15,0.55)',
      letterSpacing: 0.7, textTransform: 'uppercase', fontFamily: t.body,
      marginBottom: 18,
    }}>
      <span style={{ color: GREEN }}>{n}</span> · {children}
    </div>
  );

  const H = ({ children, size = 80, color = INK }) => (
    <h2 style={{
      fontSize: size, fontWeight: 800, letterSpacing: size > 60 ? -2.6 : -1.4,
      lineHeight: 1.02, margin: 0, fontFamily: t.display, color,
      textWrap: 'balance',
    }}>{children}</h2>
  );

  const G = ({ children }) => <span style={{ color: GREEN }}>{children}</span>;

  // ── Spark V mark ─────────────────────────────────────────────────
  const Mark = ({ size = 40, color = GREEN, innerColor = CREAM, withSpark = true }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" style={{ display: 'block' }}>
      <path d="M18 22 L50 78 L82 22" fill="none" stroke={color}
            strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
      {withSpark && <circle cx="82" cy="22" r="9" fill={color}/>}
      {withSpark && <circle cx="82" cy="22" r="4" fill={innerColor}/>}
    </svg>
  );

  // App-icon variant — chevron shifted up so spark sits comfortably inside tile
  const MarkInTile = ({ stroke = '#fff', innerColor = GREEN, w = 120 }) => (
    <svg viewBox="0 0 100 100" width={w} height={w} aria-hidden="true">
      <path d="M22 30 L50 76 L78 30" fill="none" stroke={stroke}
            strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="78" cy="30" r="9" fill={stroke}/>
      <circle cx="78" cy="30" r="4" fill={innerColor}/>
    </svg>
  );

  // ── Buttons ──────────────────────────────────────────────────────
  const Btn = ({ children, kind = 'ink', full, size = 'md' }) => {
    const map = {
      ink:    { bg: INK,   fg: '#fff', bd: 'none' },
      green:  { bg: GREEN, fg: '#fff', bd: 'none' },
      ghost:  { bg: 'transparent', fg: INK, bd: '1.5px solid rgba(15,15,15,0.18)' },
      cream:  { bg: CREAM, fg: INK, bd: 'none' },
    }[kind];
    const sz = size === 'lg'
      ? { padding: '17px 28px', fontSize: 15.5 }
      : { padding: '13px 22px', fontSize: 14 };
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderRadius: 100, background: map.bg, color: map.fg, border: map.bd,
        fontWeight: 700, cursor: 'pointer', fontFamily: t.body, ...sz,
        width: full ? '100%' : 'auto', whiteSpace: 'nowrap',
      }}>{children}</div>
    );
  };

  const StoreBadge = ({ store, dark = true }) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '11px 20px', borderRadius: 14,
      background: dark ? INK : PAPER, color: dark ? '#fff' : INK,
      border: dark ? 'none' : '1px solid rgba(15,15,15,0.12)',
      cursor: 'pointer',
    }}>
      <div style={{ fontSize: 22, lineHeight: 1 }}>{store === 'apple' ? '' : '▶'}</div>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 500, opacity: 0.75, letterSpacing: 0.4 }}>
          {store === 'apple' ? 'Download on the' : 'GET IT ON'}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: -1, letterSpacing: -0.3 }}>
          {store === 'apple' ? 'App Store' : 'Google Play'}
        </div>
      </div>
    </div>
  );

  // ── Mini phone ───────────────────────────────────────────────────
  const Phone = ({ children, w = 280, h = 560, screenBg = '#fff' }) => (
    <div style={{
      width: w, height: h, borderRadius: 42, padding: 7,
      background: '#0F0F0F',
      boxShadow: '0 36px 64px -24px rgba(15,15,15,0.25), 0 0 0 1px rgba(15,15,15,0.06)',
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
        width: 86, height: 26, borderRadius: 18, background: '#000', zIndex: 5,
      }}/>
      <div style={{
        width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden',
        background: screenBg, position: 'relative',
      }}>{children}</div>
    </div>
  );

  // ── Star row ─────────────────────────────────────────────────────
  const Stars = ({ n = 5, size = 12 }) => (
    <div style={{ display: 'flex', gap: 1 }}>
      {[...Array(n)].map((_, i) => <span key={i} style={{ color: '#E9A23B', fontSize: size }}>★</span>)}
    </div>
  );

  // ═════════════════════════════════════════════════════════════════
  return (
    <div style={{ background: PAPER, color: INK, fontFamily: t.body, minHeight: '100%' }}>

      {/* ───────────────────────── NAV ───────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        background: 'rgba(255,255,255,0.78)',
        borderBottom: '0.5px solid rgba(15,15,15,0.06)',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto', padding: '16px 56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mark size={30}/>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.8, fontFamily: t.display }}>vela</div>
          </div>
          <div style={{ display: 'flex', gap: 30, fontSize: 13.5, color: 'rgba(15,15,15,0.65)', fontWeight: 600 }}>
            {['Voice', 'Features', 'Pricing', 'Reviews', 'FAQ'].map(l => (
              <div key={l} style={{ cursor: 'pointer' }}>{l}</div>
            ))}
          </div>
          <Btn kind="ink">Try free for 7 days</Btn>
        </div>
      </nav>

      {/* ───────────────────────── HERO ───────────────────────── */}
      <Section bg={CREAM} py={92} style={{
        display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center',
      }}>
        <div>
          {/* Rating row — new app, modest framing */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28,
            padding: '7px 14px 7px 10px', borderRadius: 100,
            background: '#fff', border: '1px solid rgba(15,15,15,0.06)',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '3px 9px', borderRadius: 100, background: GREEN, color: '#fff',
              fontSize: 11, fontWeight: 800, letterSpacing: 0.3,
            }}>NEW</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(15,15,15,0.7)' }}>Launching on the App Store</div>
          </div>

          <h1 style={{
            fontSize: 104, fontWeight: 800, letterSpacing: -3.8, lineHeight: 0.96,
            fontFamily: t.display, margin: 0, color: INK,
          }}>
            Speak it.<br/><G>Done.</G>
          </h1>
          <p style={{
            fontSize: 21, color: 'rgba(15,15,15,0.62)', lineHeight: 1.5, marginTop: 26,
            maxWidth: 480, fontWeight: 400,
          }}>
            Vela hears you, parses it, files it. Voice-first expense tracking that takes 5 seconds — no taps, no spreadsheets, no guilt.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, alignItems: 'center' }}>
            <StoreBadge store="apple"/>
            <div style={{ fontSize: 12.5, color: 'rgba(15,15,15,0.5)', maxWidth: 140, lineHeight: 1.4 }}>
              iPhone &amp; iPad<br/>iOS 16 +
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 24, fontSize: 13, color: 'rgba(15,15,15,0.55)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <window.VIcon name="check" size={14} color={GREEN}/> Free to download
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <window.VIcon name="check" size={14} color={GREEN}/> No bank connection
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <window.VIcon name="check" size={14} color={GREEN}/> Private by default
            </div>
          </div>
        </div>

        {/* Hero phone with floating chips */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Phone w={310} h={600}>
            <div style={{ padding: '54px 22px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11.5, color: 'rgba(15,15,15,0.5)', fontWeight: 500 }}>April 2026</div>
                <div style={{ width: 30, height: 30, borderRadius: 15, background: CREAM,
                              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <window.VIcon name="settings" size={15} color={INK} stroke={1.5}/>
                </div>
              </div>
              <div style={{
                fontSize: 56, fontWeight: 800, color: INK, fontFamily: t.display,
                letterSpacing: -2.6, marginTop: 14, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              }}>
                £1,240<span style={{ fontSize: 28, color: 'rgba(15,15,15,0.35)' }}>.50</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(15,15,15,0.5)', marginTop: 6 }}>of £2,000 budget</div>
              <div style={{ height: 7, background: CREAM, borderRadius: 4, marginTop: 16, overflow: 'hidden' }}>
                <div style={{ width: '62%', height: '100%', background: GREEN, borderRadius: 4 }}/>
              </div>
              <div style={{
                marginTop: 26, fontSize: 11, fontWeight: 700,
                color: 'rgba(15,15,15,0.45)', letterSpacing: 0.4,
              }}>TODAY</div>
              {[
                { e:'☕', n:'Flat White', c:'Eating out', a:'£4.20' },
                { e:'🥗', n:'Lunch — Pret', c:'Eating out', a:'£9.45' },
                { e:'🚇', n:'Tube — Z1-2', c:'Transport', a:'£3.40' },
                { e:'🛒', n:"Sainsbury's", c:'Groceries', a:'£28.10' },
              ].map((x, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0',
                  borderBottom: i < 3 ? '0.5px solid rgba(15,15,15,0.06)' : 'none',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 17, background: CREAM,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{x.e}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{x.n}</div>
                    <div style={{ fontSize: 11.5, color: 'rgba(15,15,15,0.5)' }}>{x.c}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{x.a}</div>
                </div>
              ))}
            </div>
          </Phone>

          {/* Floating voice bubble — top */}
          <div style={{
            position: 'absolute', top: 40, right: -10,
            background: GREEN, color: '#fff',
            padding: '11px 18px', borderRadius: 100,
            fontSize: 14, fontWeight: 700,
            boxShadow: '0 14px 28px -8px rgba(42,157,110,0.45)',
            display: 'flex', alignItems: 'center', gap: 9,
          }}>
            <window.VIcon name="micF" size={15} color="#fff"/>
            "coffee, 4 quid"
          </div>

          {/* Floating success — bottom */}
          <div style={{
            position: 'absolute', bottom: 80, left: -16,
            background: '#fff', padding: '12px 16px', borderRadius: 16,
            boxShadow: '0 14px 28px -8px rgba(15,15,15,0.14), 0 0 0 1px rgba(15,15,15,0.04)',
            display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 12, background: GREEN, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <window.VIcon name="check" size={14} color="#fff" stroke={2.4}/>
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: INK }}>Logged in 2.4s</div>
              <div style={{ fontSize: 10.5, color: 'rgba(15,15,15,0.5)' }}>Eating out · £4.20</div>
            </div>
          </div>

          {/* Tiny mark in corner */}
          <div style={{
            position: 'absolute', top: 0, left: 0, opacity: 0.5,
          }}>
            <Mark size={32} color="rgba(15,15,15,0.3)" innerColor={CREAM}/>
          </div>
        </div>
      </Section>

      {/* ───────────── LAUNCH STRIP ───────────── */}
      <section style={{
        background: INK, color: '#fff', padding: '22px 56px',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18,
          fontSize: 14, color: 'rgba(255,255,255,0.85)', flexWrap: 'wrap',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 100,
            background: '#3FB37F', color: '#0F0F0F', fontSize: 11, fontWeight: 800, letterSpacing: 0.3,
          }}>LIVE</span>
          <span style={{ fontWeight: 600 }}>Vela 1.0 is on the App Store today.</span>
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>·</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Built in London.</span>
        </div>
      </section>

      {/* ───────────── 01 · VOICE — THE SIGNATURE ───────────── */}
      <Section bg={PAPER} py={130} style={{ textAlign: 'center' }}>
        <SectionLabel n="01">The signature</SectionLabel>
        <H size={88}>Voice to entry<br/>in <G>five seconds</G>.</H>
        <p style={{
          fontSize: 19, color: 'rgba(15,15,15,0.6)', lineHeight: 1.5, marginTop: 22,
          maxWidth: 560, marginInline: 'auto',
        }}>
          Hold the mic. Talk like a person. Vela parses amount, merchant, and category — instantly.
        </p>

        {/* Mic + wave + category demo */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 32, marginTop: 64, marginBottom: 56,
        }}>
          <div style={{
            width: 96, height: 96, borderRadius: 48, background: GREEN,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 22px 36px -10px ${GREEN}66`,
          }}>
            <window.VIcon name="micF" size={42} color="#fff"/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {[16, 28, 42, 58, 42, 28, 16, 22, 36, 22, 14].map((h, i) => (
              <div key={i} style={{
                width: 5, height: h, background: GREEN, borderRadius: 3,
                opacity: 0.3 + (i % 3) * 0.25,
              }}/>
            ))}
          </div>
          <div style={{
            width: 96, height: 96, borderRadius: 48, background: '#FFE9DE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 44,
          }}>🍔</div>
        </div>

        {/* Speech bubble above phone */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
            background: INK, color: '#fff',
            padding: '14px 26px', borderRadius: 26,
            fontSize: 17, fontWeight: 700,
            boxShadow: '0 18px 32px -10px rgba(15,15,15,0.20)',
            zIndex: 5,
          }}>
            "Steak night, 78 bucks"
            <div style={{
              position: 'absolute', bottom: -8, left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 16, height: 16, background: INK,
            }}/>
          </div>

          <Phone w={300} h={440}>
            <div style={{ padding: '54px 22px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 14, background: CREAM,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <window.VIcon name="close" size={13} color="rgba(15,15,15,0.5)" stroke={2}/>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
                <div style={{
                  padding: '6px 12px', borderRadius: 100, background: CREAM,
                  fontSize: 12, fontWeight: 600, color: 'rgba(15,15,15,0.6)',
                }}>Today ⌄</div>
                <div style={{
                  padding: '6px 12px', borderRadius: 100, background: CREAM,
                  fontSize: 12, fontWeight: 600, color: 'rgba(15,15,15,0.6)',
                }}>Once ⌄</div>
              </div>
              <div style={{
                fontSize: 30, fontWeight: 800, color: INK, fontFamily: t.display,
                marginTop: 28, letterSpacing: -1.2,
              }}>Steak night</div>
              <div style={{
                fontSize: 50, fontWeight: 800, color: INK, fontFamily: t.display,
                marginTop: 4, letterSpacing: -2.4, fontVariantNumeric: 'tabular-nums', lineHeight: 1,
              }}>78.00</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 14px', marginTop: 26, borderRadius: 100,
                border: '1.5px solid rgba(15,15,15,0.1)', fontSize: 13, fontWeight: 600,
              }}>
                <span style={{ fontSize: 16 }}>🍔</span> Eating out
                <window.VIcon name="chev" size={11} color="rgba(15,15,15,0.4)" stroke={2}/>
              </div>
            </div>
          </Phone>

          {/* Floating spark — visually echo the logo */}
          <div style={{
            position: 'absolute', top: 80, right: 60,
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', padding: '8px 14px', borderRadius: 100,
            boxShadow: '0 10px 24px -8px rgba(15,15,15,0.12), 0 0 0 1px rgba(15,15,15,0.04)',
            fontSize: 12, fontWeight: 700,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: GREEN }}/>
            AI · parsed
          </div>
        </div>
      </Section>

      {/* ───────────── 02 · MULTIPLE LISTS ───────────── */}
      <Section bg={CREAM} py={120} style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Phone w={290} h={520} screenBg="#fff">
            <div style={{ padding: '54px 18px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { e:'🥕', a:'£80.20', bg:'#E8F3EE' },
                  { e:'🍔', a:'£50.39', bg:'#FFE9DE' },
                  { e:'🚇', a:'£20.01', bg:'#E4ECFF' },
                  { e:'🛍', a:'£12.00', bg:'#F2E2F2' },
                ].map((c, i) => (
                  <div key={i} style={{
                    flex: 1, padding: '10px 4px', borderRadius: 14,
                    background: c.bg, textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 20 }}>{c.e}</div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, marginTop: 4,
                      fontVariantNumeric: 'tabular-nums',
                    }}>{c.a}</div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 16, padding: 16, borderRadius: 20, background: '#fff',
                boxShadow: '0 6px 16px rgba(15,15,15,0.06), 0 0 0 1px rgba(15,15,15,0.04)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.3 }}>Your lists</div>
                  <div style={{ display: 'flex', gap: 10, color: 'rgba(15,15,15,0.4)' }}>
                    <window.VIcon name="plus" size={14} color="currentColor" stroke={2.2}/>
                    <window.VIcon name="edit" size={14} color="currentColor" stroke={2}/>
                  </div>
                </div>
                {[
                  { e:'🤝', n:'Shared with Lena', sub:'2 people', sel:true },
                  { e:'💼', n:'Business', sub:'Only you' },
                  { e:'✈️', n:'Tokyo trip', sub:'Until 28 May' },
                ].map((l, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
                    borderTop: i > 0 ? '0.5px solid rgba(15,15,15,0.06)' : 'none',
                    marginTop: i === 0 ? 12 : 0,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 18, background: CREAM,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                    }}>{l.e}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700 }}>{l.n}</div>
                      <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.5)' }}>{l.sub}</div>
                    </div>
                    {l.sel && (
                      <div style={{
                        width: 20, height: 20, borderRadius: 10, background: GREEN,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <window.VIcon name="check" size={12} color="#fff" stroke={2.4}/>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Phone>
        </div>
        <div>
          <SectionLabel n="02">Lists</SectionLabel>
          <H size={72}>One app, <G>many wallets</G>.</H>
          <p style={{
            fontSize: 18, color: 'rgba(15,15,15,0.6)', lineHeight: 1.55, marginTop: 22, maxWidth: 460,
          }}>
            Track with your partner. Keep work separate. Pull a trip into its own list and total it instantly. Everything syncs in real time.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            {[
              { e:'🤝', l:'Shared', s:'Real-time sync' },
              { e:'💼', l:'Private', s:'Only you' },
              { e:'✈️', l:'Trip', s:'Time-boxed' },
            ].map(c => (
              <div key={c.l} style={{
                flex: 1, padding: 16, borderRadius: 18, background: PAPER,
                border: '1px solid rgba(15,15,15,0.06)',
              }}>
                <div style={{ fontSize: 26 }}>{c.e}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 10 }}>{c.l}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(15,15,15,0.5)', marginTop: 2 }}>{c.s}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────── 03 · RECURRENCE ───────────── */}
      <Section bg={PAPER} py={120} style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
      }}>
        <div>
          <SectionLabel n="03">Recurrence</SectionLabel>
          <H size={72}>Set it once.<br/><G>Forget it forever.</G></H>
          <p style={{
            fontSize: 18, color: 'rgba(15,15,15,0.6)', lineHeight: 1.55, marginTop: 22, maxWidth: 460,
          }}>
            Subscriptions, gym, rent. Tell Vela the cadence and they appear on schedule — no manual entry, no missed bills.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 32 }}>
            <div style={{
              padding: '10px 18px', borderRadius: 100, background: CREAM,
              fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                display: 'inline-flex', width: 18, height: 18, borderRadius: 9,
                background: GREEN, color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 11,
              }}>↻</span>
              Monthly
            </div>
            <div style={{
              padding: '10px 18px', borderRadius: 100, background: CREAM,
              fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                display: 'inline-flex', width: 18, height: 18, borderRadius: 9,
                background: INK, color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 11,
              }}>↻</span>
              Weekly
            </div>
            <div style={{
              padding: '10px 18px', borderRadius: 100, background: CREAM,
              fontSize: 13, fontWeight: 700, color: 'rgba(15,15,15,0.55)',
            }}>+ custom</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Phone w={290} h={500}>
            <div style={{ padding: '54px 18px 0' }}>
              <div style={{
                padding: 16, borderRadius: 20, background: '#fff',
                boxShadow: '0 6px 16px rgba(15,15,15,0.06), 0 0 0 1px rgba(15,15,15,0.04)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.3 }}>Recurring</div>
                  <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.5)' }}>3 active</div>
                </div>
                {[
                  { e:'🏋', n:'Gym membership', sub:'Monthly · 1st', a:'£39.00', bg:'#E8F3EE' },
                  { e:'🎬', n:'Netflix', sub:'Monthly · 14th', a:'£14.99', bg:'#FFE0E0' },
                  { e:'🥑', n:'HelloFresh', sub:'Weekly · Wed', a:'£59.99', bg:'#EAF6D8' },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
                    borderTop: i > 0 ? '0.5px solid rgba(15,15,15,0.06)' : 'none',
                  }}>
                    <div style={{ position: 'relative', width: 36, height: 36 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 18, background: r.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
                      }}>{r.e}</div>
                      <div style={{
                        position: 'absolute', bottom: -3, right: -3,
                        width: 16, height: 16, borderRadius: 8,
                        background: '#fff', border: '2px solid #fff',
                        boxShadow: '0 2px 4px rgba(15,15,15,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, color: GREEN, fontWeight: 800,
                      }}>↻</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700 }}>{r.n}</div>
                      <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.5)' }}>{r.sub}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{r.a}</div>
                  </div>
                ))}
                <div style={{
                  marginTop: 12, padding: '10px 12px', borderRadius: 12,
                  background: CREAM, fontSize: 11.5, color: 'rgba(15,15,15,0.6)',
                  display: 'flex', justifyContent: 'space-between', fontWeight: 600,
                }}>
                  <span>Next 30 days</span>
                  <span style={{ fontWeight: 800, color: INK, fontVariantNumeric: 'tabular-nums' }}>£293.95</span>
                </div>
              </div>
            </div>
          </Phone>
        </div>
      </Section>

      {/* ───────────── 04 · TAGS ───────────── */}
      <Section bg={CREAM} py={120} style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Phone w={290} h={500}>
            <div style={{ padding: '54px 18px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.5)' }}>Total tagged</div>
              <div style={{
                fontSize: 42, fontWeight: 800, color: INK, fontFamily: t.display,
                letterSpacing: -1.8, marginTop: 2, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              }}>
                £487<span style={{ fontSize: 22, color: 'rgba(15,15,15,0.4)' }}>.20</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                <span style={{
                  padding: '5px 12px', background: GREEN, color: '#fff',
                  borderRadius: 100, fontSize: 11.5, fontWeight: 700,
                }}>#tokyo</span>
                <span style={{
                  padding: '5px 12px', background: '#fff', borderRadius: 100,
                  fontSize: 11.5, fontWeight: 600, color: 'rgba(15,15,15,0.6)',
                }}>this month ⌄</span>
              </div>
              <div style={{ marginTop: 22, fontSize: 11, fontWeight: 700, color: 'rgba(15,15,15,0.5)' }}>2 MAY</div>
              {[
                { e:'🍣', n:'Sushi Jiro', tags:['#tokyo','#dinner'], a:'£68.40', bg:'#FFE9DE' },
                { e:'🚄', n:'JR Pass', tags:['#tokyo','#transport'], a:'£124.00', bg:'#E4ECFF' },
                { e:'🏨', n:'Hotel Park', tags:['#tokyo','#stay'], a:'£198.00', bg:'#F2E2F2' },
              ].map((r, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0',
                  borderTop: i > 0 ? '0.5px solid rgba(15,15,15,0.06)' : 'none',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 16, background: r.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
                  }}>{r.e}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700 }}>{r.n}</div>
                    <div style={{ fontSize: 9.5, color: 'rgba(15,15,15,0.5)', display: 'flex', gap: 4, marginTop: 1 }}>
                      {r.tags.map((tg, j) => <span key={j}>{tg}</span>)}
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{r.a}</div>
                </div>
              ))}
            </div>
          </Phone>
        </div>
        <div>
          <SectionLabel n="04">Tags</SectionLabel>
          <H size={72}>Filter by <G>anything</G>.</H>
          <p style={{
            fontSize: 18, color: 'rgba(15,15,15,0.6)', lineHeight: 1.55, marginTop: 22, maxWidth: 460,
          }}>
            Tag any expense with anything — #tokyo, #birthday, #visa, #reimbursable. Filter, total, find them in seconds.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28, maxWidth: 440 }}>
            {[
              { t: '#tokyo', n: 32 },
              { t: '#reimbursable', n: 14 },
              { t: '#birthday', n: 7 },
              { t: '#date-night', n: 11 },
              { t: '#visa', n: 9 },
              { t: '#work', n: 28 },
              { t: '#wedding', n: 5 },
            ].map(tag => (
              <span key={tag.t} style={{
                padding: '9px 14px', background: PAPER, borderRadius: 100,
                fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6,
                border: '1px solid rgba(15,15,15,0.06)',
              }}>
                {tag.t}
                <span style={{
                  fontSize: 11, color: 'rgba(15,15,15,0.45)', fontVariantNumeric: 'tabular-nums',
                }}>{tag.n}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────── 05 · APP ICON / "ON YOUR HOME SCREEN" ───────────── */}
      <Section bg={INK} py={120} style={{ color: '#fff', textAlign: 'center' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
          letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 18,
        }}>
          <span style={{ color: '#3FB37F' }}>05</span> · On your phone
        </div>
        <H size={84} color="#fff">A green dot you'll<br/><G>actually open</G>.</H>
        <p style={{
          fontSize: 19, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginTop: 22,
          maxWidth: 540, marginInline: 'auto',
        }}>
          A tile designed to live in your dock, not bury itself in a folder.
        </p>

        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
          gap: 36, marginTop: 72,
        }}>
          {/* Phone with home screen */}
          <Phone w={300} h={580} screenBg="#1A1A1A">
            <div style={{
              padding: '52px 22px 32px', height: '100%',
              background: 'linear-gradient(180deg, #4A6FA5 0%, #7B5BA1 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, width: '100%' }}>
                {[
                  { bg: '#FF6B5B' }, { bg: '#4FC3F7' }, { bg: '#FFD54F' }, { bg: '#222' },
                  { bg: '#7E57C2' }, { vela: true }, { bg: '#66BB6A' }, { bg: '#EC407A' },
                ].map((tile, i) => tile.vela ? (
                  <div key={i} style={{
                    aspectRatio: '1', borderRadius: 16, background: GREEN,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 24px -8px rgba(42,157,110,0.6), 0 0 0 2px rgba(255,255,255,0.15)',
                    transform: 'scale(1.06)',
                  }}>
                    <MarkInTile w={36}/>
                  </div>
                ) : (
                  <div key={i} style={{ aspectRatio: '1', borderRadius: 16, background: tile.bg, opacity: 0.85 }}/>
                ))}
              </div>
              <div style={{
                textAlign: 'center', marginTop: 28, fontSize: 11,
                color: 'rgba(255,255,255,0.85)', fontWeight: 600,
              }}>Friday · 7 May</div>
            </div>
          </Phone>

          {/* Icon ladder */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <div style={{
              width: 132, height: 132, borderRadius: 30, background: GREEN,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 24px 40px -14px rgba(42,157,110,0.5)',
            }}><MarkInTile w={82}/></div>
            <div style={{
              width: 132, height: 132, borderRadius: 30, background: CREAM,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 20px 32px -12px rgba(0,0,0,0.4)',
            }}>
              <svg viewBox="0 0 100 100" width="82" height="82">
                <path d="M22 30 L50 76 L78 30" fill="none" stroke={INK} strokeWidth="13"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="78" cy="30" r="9" fill={GREEN}/>
                <circle cx="78" cy="30" r="4" fill={CREAM}/>
              </svg>
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── 06 · PRICING ───────────── */}
      <Section bg={CREAM} py={120}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionLabel n="06">Pricing</SectionLabel>
          <H size={80}>Premium, but only<br/>if you <G>love it</G>.</H>
          <p style={{ fontSize: 18, color: 'rgba(15,15,15,0.6)', marginTop: 18 }}>
            7 days free. Cancel anytime. No card on file.
          </p>
        </div>

        <div style={{
          maxWidth: 560, margin: '0 auto', padding: 32,
          background: PAPER, borderRadius: 32,
          boxShadow: '0 30px 60px -24px rgba(15,15,15,0.12), 0 0 0 1px rgba(15,15,15,0.04)',
        }}>
          {/* Review quote */}
          <div style={{ textAlign: 'center', paddingBottom: 22, borderBottom: '0.5px solid rgba(15,15,15,0.08)' }}>
            <Stars size={14}/>
            <div style={{
              fontSize: 22, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.5,
              marginTop: 12, lineHeight: 1.25,
            }}>
              "The first finance app that uses <G>AI well</G>."
            </div>
            <div style={{ fontSize: 12, color: 'rgba(15,15,15,0.5)', marginTop: 8 }}>
              Jordi E. · TestFlight beta
            </div>
          </div>

          {/* Plan cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 22 }}>
            {[
              { id: 'yearly', label: 'Yearly', price: '£24.99', sub: '£2.08 / mo', save: 'Save 30%' },
              { id: 'monthly', label: 'Monthly', price: '£2.99', sub: 'per month' },
            ].map(p => {
              const sel = plan === p.id;
              return (
                <div key={p.id} onClick={() => setPlan(p.id)} style={{
                  padding: 20, borderRadius: 22, background: CREAM,
                  border: sel ? `2px solid ${GREEN}` : '2px solid transparent',
                  cursor: 'pointer', position: 'relative',
                  transition: 'border-color 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                      fontSize: 15, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.3,
                    }}>{p.label}</div>
                    {p.save && (
                      <div style={{
                        padding: '4px 9px', background: GREEN, color: '#fff',
                        borderRadius: 100, fontSize: 10.5, fontWeight: 800, letterSpacing: 0.2,
                      }}>{p.save}</div>
                    )}
                  </div>
                  <div style={{
                    fontSize: 32, fontWeight: 800, fontFamily: t.display,
                    letterSpacing: -1.2, marginTop: 18, lineHeight: 1,
                  }}>{p.price}</div>
                  <div style={{ fontSize: 11.5, color: 'rgba(15,15,15,0.5)', marginTop: 4 }}>{p.sub}</div>
                  {sel && (
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      width: 20, height: 20, borderRadius: 10, background: GREEN,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <window.VIcon name="check" size={12} color="#fff" stroke={2.4}/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Features */}
          <div style={{ marginTop: 22 }}>
            {[
              { e: '🎙', n: 'Unlimited voice inputs', d: 'Speak it. Vela files it.' },
              { e: '✨', n: 'AI category detection', d: 'The right category, every time.' },
              { e: '🤝', n: 'Shared lists', d: 'Track with your partner in real time.' },
              { e: '⚡', n: 'Apple Pay automation', d: 'Tap to pay → expense logged automatically.' },
              { e: '🏷', n: 'Tags & filters', d: 'Pull any view together in two taps.' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0',
                borderTop: i > 0 ? '0.5px solid rgba(15,15,15,0.06)' : 'none',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 12, background: CREAM,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>{f.e}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{f.n}</div>
                  <div style={{ fontSize: 12, color: 'rgba(15,15,15,0.55)', marginTop: 1 }}>{f.d}</div>
                </div>
                <window.VIcon name="check" size={16} color={GREEN} stroke={2.4}/>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 22 }}>
            <Btn kind="ink" full size="lg">Try free for 7 days</Btn>
          </div>
          <div style={{
            fontSize: 11.5, color: 'rgba(15,15,15,0.5)', textAlign: 'center',
            marginTop: 12, lineHeight: 1.5,
          }}>
            No payment due today. Billing starts after the trial unless you cancel.
          </div>
        </div>
      </Section>

      {/* ───────────── 07 · EARLY FEEDBACK ───────────── */}
      <Section bg={PAPER} py={120}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionLabel n="07">From the beta</SectionLabel>
          <H size={80}>What early users<br/>are <G>saying</G>.</H>
          <p style={{ fontSize: 16, color: 'rgba(15,15,15,0.55)', marginTop: 18 }}>
            Honest feedback from our TestFlight cohort.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { t:'Voice input is the unlock', b:"Said 'lunch 12' walking out of Pret. It was logged before I got back to my desk. The friction is just\u2026 gone.", who:'Marcus T.', role:'TestFlight beta', stars:5 },
            { t:'Finally, calm finance', b:"Other apps shout at me with red numbers. Vela just shows me what I spent. That's enough \u2014 and it's a lot.", who:'Eline V.', role:'TestFlight beta', stars:5 },
            { t:'My partner & I both use it', b:"Shared list with my husband. We both log, both see totals. No more 'who paid for groceries?' arguments.", who:'Sara K.', role:'TestFlight beta', stars:4 },
          ].map((r, i) => (
            <div key={i} style={{
              padding: 28, borderRadius: 22, background: CREAM,
              display: 'flex', flexDirection: 'column',
            }}>
              <Stars n={r.stars} size={14}/>
              <div style={{
                fontSize: 18, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.3,
                marginTop: 14, marginBottom: 10, lineHeight: 1.2,
              }}>{r.t}</div>
              <div style={{
                fontSize: 14, color: 'rgba(15,15,15,0.65)', lineHeight: 1.55, marginBottom: 18,
                flex: 1,
              }}>{r.b}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 12.5, color: INK, fontWeight: 700 }}>{r.who}</div>
                <div style={{ fontSize: 11, color: 'rgba(15,15,15,0.45)' }}>{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────── 08 · FAQ ───────────── */}
      <Section bg={CREAM} py={120}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel n="08">FAQ</SectionLabel>
          <H size={72}>Questions, <G>answered</G>.</H>
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {[
            { q:'Does Vela connect to my bank account?', a:"No — you log expenses by voice, manually, or via Apple Pay automation. No bank connection means no security risk and nothing to disconnect when your bank changes their API." },
            { q:'Is my data private and secure?', a:'All data is encrypted in transit and at rest. You can export or delete everything at any time from Settings.' },
            { q:'What happens after the 7-day trial?', a:"You're moved to the free plan automatically. No charge, no card on file to forget about." },
            { q:'Is there an Android version?', a:"Not yet. Vela is iPhone & iPad only for now — we're focused on getting the iOS experience right before we expand. Android is on the roadmap for later this year." },
            { q:'Can I export my data?', a:'Yes — export to CSV from Settings. Available on the Premium plan.' },
            { q:'Does it work offline?', a:"Yes — all data is stored locally first. It syncs to the cloud when you're back online." },
          ].map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  borderTop: i === 0 ? '0.5px solid rgba(15,15,15,0.1)' : 'none',
                  borderBottom: '0.5px solid rgba(15,15,15,0.1)',
                  padding: '22px 0', cursor: 'pointer',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: INK, letterSpacing: -0.2 }}>{f.q}</div>
                  <div style={{
                    width: 32, height: 32, borderRadius: 16,
                    background: isOpen ? GREEN : PAPER, color: isOpen ? '#fff' : INK,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 400, lineHeight: 1,
                    transition: 'all 0.2s',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    flexShrink: 0,
                  }}>+</div>
                </div>
                {isOpen && (
                  <div style={{
                    marginTop: 14, fontSize: 15.5, color: 'rgba(15,15,15,0.62)',
                    lineHeight: 1.6, maxWidth: 620,
                  }}>{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ───────────── 09 · FINAL CTA ───────────── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background:
          'radial-gradient(ellipse 80% 60% at 20% 0%, #3FB37F 0%, transparent 60%),' +
          'radial-gradient(ellipse 70% 70% at 100% 100%, #1F7B55 0%, transparent 55%),' +
          'linear-gradient(135deg, #2A9D6E 0%, #1F7B55 100%)',
        color: '#fff', padding: '96px 56px',
      }}>
        {/* Repeating chevron texture */}
        <svg width="100%" height="100%" style={{
          position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none',
        }} aria-hidden="true">
          <defs>
            <pattern id="chevPat" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M20 30 L60 90 L100 30" fill="none" stroke="#fff" strokeWidth="8"
                    strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="100" cy="30" r="6" fill="#fff"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chevPat)"/>
        </svg>

        {/* Huge watermark mark, bleeding off-edge top-right */}
        <div style={{
          position: 'absolute', top: -100, right: -100, opacity: 0.18, pointerEvents: 'none',
          transform: 'rotate(-8deg)',
        }}>
          <svg viewBox="0 0 100 100" width="400" height="400" aria-hidden="true">
            <path d="M18 22 L50 78 L82 22" fill="none" stroke="#fff"
                  strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="82" cy="22" r="9" fill="#fff"/>
          </svg>
        </div>

        {/* Soft glow */}
        <div style={{
          position: 'absolute', bottom: -200, left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}/>

        <div style={{
          maxWidth: 1180, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2,
        }}>
          {/* Mark in white tile */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 84, height: 84, borderRadius: 22, background: '#fff',
            marginBottom: 26,
            boxShadow: '0 22px 44px -14px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.4)',
          }}>
            <Mark size={50} color={GREEN} innerColor={'#fff'}/>
          </div>

          <h2 style={{
            fontSize: 80, fontWeight: 900, fontFamily: t.display,
            letterSpacing: -3, lineHeight: 0.96, color: '#fff', margin: 0,
            textShadow: '0 4px 32px rgba(0,0,0,0.12)',
          }}>
            Speak it.<br/>Done.
          </h2>

          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.85)', marginTop: 22,
            maxWidth: 480, marginInline: 'auto', lineHeight: 1.5, fontWeight: 500,
          }}>
            Free to download. Premium free for 7 days. No card required.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <StoreBadge store="apple"/>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '11px 20px', borderRadius: 14,
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(10px)', color: '#fff',
              fontSize: 13, fontWeight: 600,
            }}>
              <window.VIcon name="sound" size={16} color="#fff"/>
              Android coming later this year
            </div>
          </div>

          {/* Three tiny stats / proof points */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 44, marginTop: 44,
            flexWrap: 'wrap',
          }}>
            {[
              { k: '2.4s', v: 'Average log time' },
              { k: '£0',   v: 'To get started' },
              { k: 'iOS 16+', v: 'iPhone & iPad' },
            ].map(s => (
              <div key={s.v} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 28, fontWeight: 800, fontFamily: t.display,
                  letterSpacing: -1, color: '#fff', lineHeight: 1,
                }}>{s.k}</div>
                <div style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 5,
                  letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 600,
                }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer style={{
        background: INK, color: '#fff',
        padding: '64px 56px 32px',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Mark size={32} color="#fff" innerColor={INK}/>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.8 }}>vela</div>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: 300 }}>
              Speak it. Done.<br/>Voice-first expense tracking, made with care in London.
            </div>
          </div>
          {[
            { h:'Product', l:['Voice', 'Lists', 'Recurrence', 'Tags', 'Pricing'] },
            { h:'Company', l:['About', 'Press kit', 'Contact', 'Changelog'] },
            { h:'Legal',   l:['Privacy', 'Terms', 'Cookies'] },
          ].map(c => (
            <div key={c.h}>
              <div style={{
                fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.45)',
                letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 14,
              }}>{c.h}</div>
              {c.l.map(x => (
                <div key={x} style={{
                  fontSize: 13.5, color: 'rgba(255,255,255,0.85)',
                  padding: '6px 0', cursor: 'pointer',
                }}>{x}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          maxWidth: 1180, margin: '40px auto 0', paddingTop: 24,
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12.5, color: 'rgba(255,255,255,0.45)',
        }}>
          <div>© 2026 Vela.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <span style={{ cursor: 'pointer' }}>Twitter</span>
            <span style={{ cursor: 'pointer' }}>Instagram</span>
            <span style={{ cursor: 'pointer' }}>hello@vela.app</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
