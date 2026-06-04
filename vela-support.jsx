// vela-support.jsx — support page matching the landing design system

window.VSupport = function VSupport() {
  const t = window.velaTheme(false);
  const GREEN = '#2A9D6E';
  const INK = '#1A1A1A';
  const CREAM = '#F5F4F1';
  const PAGE = '#EFEDE8';
  const PAPER = '#FFFFFF';
  const MUTE = 'rgba(26,26,26,0.58)';
  const SUBTLE_BORDER = 'rgba(26,26,26,0.07)';

  const [open, setOpen] = React.useState(null);
  const [navOpen, setNavOpen] = React.useState(false);

  const [winW, setWinW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const isMobile = winW < 640;

  React.useEffect(() => {
    if (!document.getElementById('vela-support-style')) {
      const s = document.createElement('style');
      s.id = 'vela-support-style';
      s.textContent = [
        '@keyframes velaFadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}',
        '.vela-in{animation:velaFadeUp 0.7s cubic-bezier(.2,.9,.4,1) both}',
      ].join('');
      document.head.appendChild(s);
    }
  }, []);

  const Mark = ({ size = 40, color = GREEN, innerColor = CREAM }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" style={{ display: 'block' }}>
      <path d="M18 22 L50 78 L82 22" fill="none" stroke={color}
        strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="82" cy="22" r="9" fill={color} />
      <circle cx="82" cy="22" r="4" fill={innerColor} />
    </svg>
  );

  const faqs = [
    {
      q: 'How do I add an expense by voice?',
      a: 'Tap the green mic button on the home screen and speak naturally — e.g. "Lunch at Pret, £8.50." Vela will parse the amount, merchant, and category automatically. Tap confirm to save.',
    },
    {
      q: 'Does Vela connect to my bank account?',
      a: 'No. You log expenses by voice or manually. No bank connection means no security risk and nothing to break when your bank changes their API.',
    },
    {
      q: 'Will there be Apple Pay automatic logging?',
      a: 'Yes — automatic logging after every Apple Pay tap is on the roadmap for v2. We\'ll announce it when it\'s ready.',
    },
    {
      q: 'How do I share expenses with a partner?',
      a: 'Go to Settings → Shared Lists → Invite someone. Enter their email or share a link. Once they accept, you\'ll both see the shared list in real time.',
    },
    {
      q: 'What happens after the 7-day free trial?',
      a: 'You\'re moved to the free plan automatically — no charge, no card on file to forget about. Core tracking features remain free. Premium features require a subscription.',
    },
    {
      q: 'How do I export my data?',
      a: 'Go to Settings → Export → CSV. You\'ll get a file with all your transactions. This feature is available on the Premium plan.',
    },
    {
      q: 'Can I use Vela offline?',
      a: 'Yes — all data is stored locally first. Everything syncs to the cloud when you\'re back online. You won\'t lose anything.',
    },
    {
      q: 'How do I delete my account and data?',
      a: 'Go to Settings → Account → Delete Account. This permanently removes all your data from our servers. This action cannot be undone.',
    },
    {
      q: 'Is there an Android version?',
      a: 'Not yet. Vela is iPhone and iPad only for now. We\'re focused on getting the iOS experience right first. Android is on the roadmap.',
    },
    {
      q: 'How do I cancel my Premium subscription?',
      a: 'Open the iOS Settings app → Apple ID → Subscriptions → Vela → Cancel. Subscriptions are managed directly through Apple, not through the app.',
    },
  ];

  const topics = [
    { icon: 'mic', label: 'Voice & entry', desc: 'Adding expenses by voice or manually' },
    { icon: 'chart', label: 'Budgets', desc: 'Setting and tracking spending limits' },
    { icon: 'sparkle', label: 'Insights & AI', desc: 'Understanding your spending patterns' },
    { icon: 'settings', label: 'Account & billing', desc: 'Subscription, export, and data' },
  ];

  return (
    <div style={{ background: PAGE, color: INK, fontFamily: t.body, minHeight: '100vh' }}>

      {/* NAV */}
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
          <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Mark size={isMobile ? 26 : 32} />
            <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, letterSpacing: -1, fontFamily: t.display, color: INK }}>vela</div>
          </a>

          {!isMobile && (
            <div style={{ display: 'flex', gap: 32, fontSize: 14, color: MUTE, fontWeight: 600 }}>
              {[['Home', 'index.html'], ['Legal', 'legal.html'], ['Support', 'support.html']].map(([l, href]) => (
                <a key={l} href={href} style={{
                  cursor: 'pointer', textDecoration: 'none',
                  color: l === 'Support' ? INK : MUTE,
                  fontWeight: l === 'Support' ? 700 : 600,
                }}>{l}</a>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href="mailto:velaspends@gmail.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile ? '8px 14px' : '10px 18px',
              borderRadius: 100, background: INK, color: '#fff',
              fontSize: isMobile ? 12 : 13.5, fontWeight: 700,
              textDecoration: 'none',
            }}>
              Contact us
            </a>
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

        {isMobile && navOpen && (
          <div style={{
            background: 'rgba(239,237,232,0.97)', borderTop: `0.5px solid ${SUBTLE_BORDER}`,
            padding: '16px 20px 20px',
          }}>
            {[['Home', 'index.html'], ['Legal', 'legal.html'], ['Support', 'support.html']].map(([l, href]) => (
              <a key={l} href={href} style={{
                display: 'block', padding: '14px 0', fontSize: 17, fontWeight: 600, color: INK,
                borderBottom: `0.5px solid ${SUBTLE_BORDER}`, textDecoration: 'none',
              }}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div style={{
        maxWidth: 1180, margin: '0 auto',
        padding: isMobile ? '52px 20px 40px' : '88px 56px 64px',
        textAlign: 'center',
      }}>
        <div className="vela-in" style={{ animationDelay: '0.05s' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: '#fff', boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`,
            fontSize: 13, fontWeight: 700, color: INK, marginBottom: 24,
          }}>Support</div>
          <h1 style={{
            fontSize: isMobile ? 44 : 72,
            fontWeight: 800, fontFamily: t.display,
            letterSpacing: isMobile ? -1.6 : -2.8,
            lineHeight: 1.04, color: INK, margin: 0,
          }}>
            We're here<br />
            <span style={{ color: GREEN }}>to help.</span>
          </h1>
          <p style={{
            fontSize: isMobile ? 16 : 19, color: MUTE, lineHeight: 1.55,
            marginTop: isMobile ? 16 : 24, maxWidth: 480, marginInline: 'auto',
          }}>
            Find answers to common questions, or reach out directly — we reply within 24 hours.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '0 12px 80px' : '0 22px 120px' }}>

        {/* TOPIC TILES */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? 10 : 16,
          marginBottom: isMobile ? 40 : 64,
        }}>
          {topics.map((tp, i) => (
            <div key={i} style={{
              background: PAPER, borderRadius: isMobile ? 18 : 22,
              padding: isMobile ? '20px 16px' : '28px 24px',
              border: `1px solid ${SUBTLE_BORDER}`,
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: CREAM,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <window.VIcon name={tp.icon} size={22} color={INK} stroke={1.8} />
              </div>
              <div>
                <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, fontFamily: t.display, letterSpacing: -0.3 }}>{tp.label}</div>
                <div style={{ fontSize: 12.5, color: MUTE, lineHeight: 1.5, marginTop: 4 }}>{tp.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{
          background: PAPER, borderRadius: isMobile ? 20 : 32,
          padding: isMobile ? '36px 20px' : '64px 56px',
          boxShadow: `0 0 0 1px ${SUBTLE_BORDER}`,
          marginBottom: isMobile ? 12 : 22,
        }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ marginBottom: isMobile ? 28 : 44 }}>
              <h2 style={{
                fontSize: isMobile ? 30 : 48, fontWeight: 800, fontFamily: t.display,
                letterSpacing: isMobile ? -1 : -1.8, color: INK, margin: 0,
              }}>
                Frequently asked<br /><span style={{ color: GREEN }}>questions.</span>
              </h2>
            </div>

            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    borderTop: i === 0 ? `0.5px solid rgba(26,26,26,0.1)` : 'none',
                    borderBottom: '0.5px solid rgba(26,26,26,0.1)',
                    padding: isMobile ? '18px 0' : '22px 0',
                    cursor: 'pointer',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 700, color: INK, letterSpacing: -0.2, lineHeight: 1.35 }}>{f.q}</div>
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
                      marginTop: 14, fontSize: 15, color: MUTE,
                      lineHeight: 1.65, maxWidth: 620,
                    }}>{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTACT CARD */}
        <div style={{
          background: INK, borderRadius: isMobile ? 20 : 32,
          padding: isMobile ? '40px 24px' : '64px 72px',
          position: 'relative', overflow: 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 32 : 48,
        }}>
          {/* glow */}
          <div style={{
            position: 'absolute', top: -120, right: -100, width: 400, height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${GREEN}55 0%, transparent 65%)`,
            pointerEvents: 'none', filter: 'blur(20px)',
          }} />
          <div style={{ position: 'absolute', bottom: -60, right: -30, opacity: 0.05, pointerEvents: 'none', transform: 'rotate(-12deg)' }}>
            <Mark size={isMobile ? 160 : 280} color="#fff" innerColor={INK} />
          </div>

          <div style={{ position: 'relative', maxWidth: 520 }}>
            <h2 style={{
              fontSize: isMobile ? 30 : 44, fontWeight: 800, fontFamily: t.display,
              letterSpacing: isMobile ? -1 : -1.6, color: '#fff', margin: 0, lineHeight: 1.1,
            }}>
              Still need help?<br />
              <span style={{ color: GREEN }}>Just email us.</span>
            </h2>
            <p style={{
              fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.55, marginTop: isMobile ? 14 : 20, maxWidth: 400,
            }}>
              We're a small team and we read every message. You'll hear back within 24 hours, usually much sooner.
            </p>
          </div>

          <div style={{ position: 'relative', flexShrink: 0 }}>
            <a href="mailto:velaspends@gmail.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: isMobile ? '14px 24px' : '16px 30px',
              borderRadius: 100,
              background: GREEN, color: '#fff',
              fontSize: isMobile ? 15 : 17, fontWeight: 700,
              textDecoration: 'none',
              boxShadow: `0 16px 32px -8px ${GREEN}88`,
              whiteSpace: 'nowrap',
            }}>
              <window.VIcon name="arrow" size={18} color="#fff" stroke={2.4} />
              velaspends@gmail.com
            </a>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 12, textAlign: 'center' }}>
              Average reply time: under 24h
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        background: '#0F0F0F', color: '#fff',
        padding: isMobile ? '48px 20px 24px' : '72px 56px 32px',
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
          gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? 32 : 48,
        }}>
          <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, textDecoration: 'none' }}>
              <Mark size={32} color={GREEN} innerColor="#0F0F0F" />
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: t.display, letterSpacing: -1, color: '#fff' }}>vela</div>
            </a>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: 300 }}>
              The expense tracker that gets out of your way.
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
                { label: 'velaspends@gmail.com', href: 'mailto:velaspends@gmail.com' },
              ]
            },
            {
              h: 'PRODUCT', links: [
                { label: 'Home', href: 'index.html' },
                { label: 'Support', href: 'support.html' },
                { label: 'App Store', href: '#' },
              ]
            },
          ].map(c => (
            <div key={c.h}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: GREEN, letterSpacing: 0.7, marginBottom: 18 }}>{c.h}</div>
              {c.links.map(x => (
                <a key={x.label} href={x.href} style={{
                  display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.78)',
                  padding: '6px 0', textDecoration: 'none',
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
