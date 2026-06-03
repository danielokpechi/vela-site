// vela-shared.jsx — minimal, soft, coral-accented design system

window.velaTheme = function(dark) {
  return dark ? {
    bg: '#0F0F0F', surface: '#1A1A1A', surface2: '#242424',
    text: '#FFFFFF', mute: 'rgba(255,255,255,0.55)', mute2: 'rgba(255,255,255,0.32)',
    border: 'rgba(255,255,255,0.08)', borderStrong: 'rgba(255,255,255,0.15)',
    accent: '#3FB37F', onAccent: '#FFFFFF',
    btn: '#FFFFFF', onBtn: '#0F0F0F',
    success: '#3FB37F', warn: '#E85D24',
    display: '"Nunito", "Inter", system-ui',
    body: '"Inter", system-ui',
  } : {
    bg: '#FFFFFF', surface: '#F5F4F1', surface2: '#EDECE8',
    text: '#1A1A1A', mute: 'rgba(26,26,26,0.55)', mute2: 'rgba(26,26,26,0.30)',
    border: 'rgba(26,26,26,0.06)', borderStrong: 'rgba(26,26,26,0.12)',
    accent: '#2A9D6E', onAccent: '#FFFFFF',
    btn: '#1A1A1A', onBtn: '#FFFFFF',
    success: '#2A9D6E', warn: '#E85D24',
    display: '"Nunito", "Inter", system-ui',
    body: '"Inter", system-ui',
  };
};

window.VELA_CATS = {
  food:      { id: 'food',      label: 'Eating out',  emoji: '🍔', hue: 28 },
  groceries: { id: 'groceries', label: 'Groceries',   emoji: '🥕', hue: 130 },
  transport: { id: 'transport', label: 'Transport',   emoji: '🚇', hue: 230 },
  shopping:  { id: 'shopping',  label: 'Shopping',    emoji: '🛍', hue: 310 },
  bills:     { id: 'bills',     label: 'Bills',       emoji: '🧾', hue: 200 },
  social:    { id: 'social',    label: 'Social',      emoji: '🍻', hue: 350 },
  travel:    { id: 'travel',    label: 'Travel',      emoji: '✈️', hue: 260 },
  health:    { id: 'health',    label: 'Health',      emoji: '💊', hue: 160 },
  home:      { id: 'home',      label: 'Home',        emoji: '🏠', hue: 50 },
  coffee:    { id: 'coffee',    label: 'Coffee',      emoji: '☕', hue: 28 },
};

window.catColor = function(catId, dark = false, opts = {}) {
  const c = window.VELA_CATS[catId];
  if (!c) return '#999';
  const tw = (window.__velaHue) || 0;
  const h = (c.hue + tw + 360) % 360;
  const { tint = false, deep = false } = opts;
  if (tint) return `oklch(${dark ? 0.30 : 0.95} 0.04 ${h})`;
  if (deep) return `oklch(${dark ? 0.78 : 0.55} 0.14 ${h})`;
  return `oklch(${dark ? 0.72 : 0.65} 0.13 ${h})`;
};

window.VIcon = function VIcon({ name, size = 22, fill = false, color = 'currentColor', stroke = 1.8 }) {
  const s = { width: size, height: size, display: 'block' };
  const sw = stroke;
  const paths = {
    home: fill
      ? <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" fill={color}/>
      : <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round"/>,
    chart: fill
      ? <g fill={color}><rect x="3" y="13" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="4" width="4" height="17" rx="1"/></g>
      : <g fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round"><rect x="3" y="13" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="4" width="4" height="17" rx="1"/></g>,
    target: fill
      ? <g><circle cx="12" cy="12" r="9" fill={color} opacity="0.15"/><circle cx="12" cy="12" r="6" fill="none" stroke={color} strokeWidth={sw}/><circle cx="12" cy="12" r="2" fill={color}/></g>
      : <g fill="none" stroke={color} strokeWidth={sw}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color}/></g>,
    settings: fill
      ? <g fill={color}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></g>
      : <g fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></g>,
    plus: <path d="M12 5v14M5 12h14" stroke={color} strokeWidth={sw} strokeLinecap="round"/>,
    mic: <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></g>,
    micF: <g fill={color}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/></g>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    chev:  <path d="M9 6l6 6-6 6" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>,
    chevD: <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    close: <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={sw} strokeLinecap="round"/>,
    check: <path d="M5 12l5 5L20 6" stroke={color} strokeWidth={sw + 0.4} fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    edit:  <path d="M4 20h4l11-11-4-4L4 16v4zM14 6l4 4" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    trash: <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></g>,
    sparkle: <g fill={color}><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" opacity="0.7"/></g>,
    sound: <g fill="none" stroke={color} strokeWidth={sw + 0.4} strokeLinecap="round"><path d="M5 9c2 1 2 5 0 6M9 7c3 1.5 3 8 0 10M13 5c4 2 4 12 0 14"/></g>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{paths[name]}</svg>;
};

// Tab bar — minimal: 3 items, with a center cutout for the FAB
window.VTabBar = function VTabBar({ active = 'home', onChange, theme }) {
  const t = theme;
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'ai', label: 'Insights', icon: 'sparkle' },
    { id: 'settings', label: 'You', icon: 'settings' },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '14px 18px 24px', background: t.bg,
      borderTop: `0.5px solid ${t.border}`,
    }}>
      {tabs.map(tab => {
        const on = tab.id === active;
        return (
          <div key={tab.id}
            onClick={() => onChange && onChange(tab.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, cursor: 'pointer', padding: '4px 0', userSelect: 'none',
            }}>
            <window.VIcon name={tab.icon} size={22} fill={on} color={on ? t.text : t.mute2} />
            <div style={{
              fontSize: 10, fontWeight: on ? 700 : 500, fontFamily: t.body,
              color: on ? t.text : t.mute2,
            }}>{tab.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// Category pill — small rounded chip with emoji + label (matches reference)
window.VCatPill = function VCatPill({ cat, theme, dark, withChev = false }) {
  const c = window.VELA_CATS[cat];
  const t = theme;
  if (!c) return null;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px 5px 6px', borderRadius: 100,
      background: t.bg, border: `1px solid ${t.borderStrong}`,
      fontSize: 12.5, fontWeight: 500, color: t.text, fontFamily: t.body,
    }}>
      <span style={{ fontSize: 14 }}>{c.emoji}</span>
      <span>{c.label}</span>
      {withChev && <window.VIcon name="chev" size={11} color={t.mute} stroke={2}/>}
    </div>
  );
};

window.VCatDot = function VCatDot({ cat, dark, size = 36 }) {
  const c = window.VELA_CATS[cat];
  if (!c) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2, flexShrink: 0,
      background: window.catColor(cat, dark, { tint: true }),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.46, lineHeight: 1,
    }}>{c.emoji}</div>
  );
};

// Expense row — much simpler, no swipe chrome unless dragging
window.VExpenseRow = function VExpenseRow({ exp, theme, dark, onDelete, onEdit }) {
  const t = theme;
  const cat = window.VELA_CATS[exp.cat];
  const [swipe, setSwipe] = React.useState(0);
  const startX = React.useRef(null);

  const onPD = (e) => { startX.current = e.clientX; };
  const onPM = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    setSwipe(Math.max(-72, Math.min(0, dx)));
  };
  const onPU = () => {
    setSwipe(swipe < -40 ? -72 : 0);
    startX.current = null;
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {swipe < 0 && (
        <div onClick={() => { onDelete && onDelete(exp.id); setSwipe(0); }}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 72,
          background: t.warn, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: t.body }}>
          Delete
        </div>
      )}
      <div
        onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerCancel={onPU}
        onClick={() => Math.abs(swipe) < 5 && onEdit && onEdit(exp)}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 22px', background: t.bg, position: 'relative',
          transform: `translateX(${swipe}px)`,
          transition: startX.current ? 'none' : 'transform 0.22s cubic-bezier(.2,.7,.3,1)',
          cursor: 'pointer',
        }}>
        <div style={{ fontSize: 22, lineHeight: 1, width: 32, textAlign: 'center' }}>{cat.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 15, fontWeight: 600, color: t.text, fontFamily: t.body,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            letterSpacing: -0.1,
          }}>{exp.name}</div>
          <div style={{ fontSize: 12, color: t.mute, marginTop: 1, fontFamily: t.body }}>
            {cat.label}
          </div>
        </div>
        <div style={{
          fontSize: 15, fontWeight: 700, color: t.text, fontFamily: t.body,
          fontVariantNumeric: 'tabular-nums', letterSpacing: -0.2,
        }}>{window.velaFmt(exp.amount)}</div>
      </div>
    </div>
  );
};

// Pill toggle — soft segmented control
window.VPillToggle = function VPillToggle({ options, value, onChange, theme, size = 'md' }) {
  const t = theme;
  const padY = size === 'sm' ? 6 : 8;
  const padX = size === 'sm' ? 12 : 16;
  const fs = size === 'sm' ? 12 : 13;
  return (
    <div style={{
      display: 'inline-flex', padding: 3, background: t.surface, borderRadius: 100,
    }}>
      {options.map(o => {
        const on = o.id === value;
        return (
          <div key={o.id} onClick={() => onChange && onChange(o.id)}
            style={{
              padding: `${padY}px ${padX}px`, borderRadius: 100,
              fontSize: fs, fontWeight: on ? 700 : 500, fontFamily: t.body,
              color: on ? t.text : t.mute,
              background: on ? t.bg : 'transparent',
              boxShadow: on ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
              cursor: 'pointer', transition: 'all 0.15s',
              letterSpacing: -0.1,
            }}>{o.label}</div>
        );
      })}
    </div>
  );
};

// Floating Action Button — green mic that, on tap, expands a small chooser:
// "Voice" or "Type". Replaces the old Quick Add bar.
window.VFAB = function VFAB({ theme, onChoose }) {
  const t = theme;
  const [open, setOpen] = React.useState(false);

  const Choice = ({ icon, label, onClick }) => (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 18px 10px 12px', borderRadius: 100,
      background: t.bg, border: `1px solid ${t.border}`,
      boxShadow: '0 8px 22px -8px rgba(0,0,0,0.14)',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 17, background: t.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <window.VIcon name={icon} size={16} color="#fff" stroke={2.4}/>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontFamily: t.body }}>{label}</div>
    </div>
  );

  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'absolute', inset: 0, zIndex: 9,
          background: 'transparent',
        }}/>
      )}
      <div style={{
        position: 'absolute', right: 22, bottom: 96, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
      }}>
        {open && (
          <>
            <Choice icon="micF" label="Speak it" onClick={() => { setOpen(false); onChoose && onChoose('voice'); }}/>
            <Choice icon="edit"  label="Type it"  onClick={() => { setOpen(false); onChoose && onChoose('type'); }}/>
          </>
        )}
        <div onClick={() => setOpen(o => !o)} style={{
          width: 60, height: 60, borderRadius: 30, background: t.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open
            ? `0 0 0 6px ${t.accent}25, 0 12px 28px -8px ${t.accent}66`
            : `0 12px 28px -8px ${t.accent}66`,
          cursor: 'pointer', transition: 'all 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>
          {open
            ? <window.VIcon name="plus" size={26} color="#fff" stroke={2.4}/>
            : <window.VIcon name="micF" size={26} color="#fff"/>}
        </div>
      </div>
    </>
  );
};

Object.assign(window, {});
