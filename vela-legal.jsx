// vela-legal.jsx — Legal documents page

window.VLegal = function VLegal() {
  const t = window.velaTheme(false);
  const GREEN = '#2A9D6E';
  const INK   = '#1A1A1A';
  const CREAM = '#F5F4F1';
  const PAGE  = '#EFEDE8';
  const MUTE  = 'rgba(26,26,26,0.58)';
  const SUBTLE_BORDER = 'rgba(26,26,26,0.07)';

  const [winW, setWinW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const isMobile = winW < 640;

  // Read hash on mount and on hash change
  const hashDoc = () => {
    const h = window.location.hash.replace('#', '');
    return ['terms', 'privacy', 'cookie', 'eula'].includes(h) ? h : 'terms';
  };
  const [active, setActive] = React.useState(hashDoc);
  React.useEffect(() => {
    const onHash = () => setActive(hashDoc());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (id) => {
    window.location.hash = id;
    setActive(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Mark = ({ size = 32, color = GREEN, innerColor = CREAM }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" style={{ display: 'block' }}>
      <path d="M18 22 L50 78 L82 22" fill="none" stroke={color}
            strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="82" cy="22" r="9" fill={color}/>
      <circle cx="82" cy="22" r="4" fill={innerColor}/>
    </svg>
  );

  const TABS = [
    { id: 'terms',   label: 'Terms of Service' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'cookie',  label: 'Cookie Policy' },
    { id: 'eula',    label: 'EULA' },
  ];

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, fontFamily: t.display,
        color: INK, marginBottom: 12, letterSpacing: -0.4 }}>{title}</h2>
      <div style={{ fontSize: 15, color: MUTE, lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  const P = ({ children }) => (
    <p style={{ marginBottom: 12 }}>{children}</p>
  );

  const Ul = ({ items }) => (
    <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{item}</li>)}
    </ul>
  );

  const UPDATED = 'Last updated: 16 May 2026';

  // ── DOCUMENTS ──────────────────────────────────────────────────

  const Terms = () => (
    <div>
      <div style={{ fontSize: 13, color: MUTE, marginBottom: 36 }}>{UPDATED}</div>

      <Section title="1. Acceptance of Terms">
        <P>By downloading, installing, or using the Vela application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the App.</P>
        <P>These Terms apply to all users of the App, including those who access the App via the Apple App Store. Vela ("we", "us", "our") reserves the right to modify these Terms at any time. Continued use of the App after changes constitutes acceptance.</P>
      </Section>

      <Section title="2. Description of Service">
        <P>Vela is a personal expense tracking application for iOS. The App allows you to log, categorise, and review personal financial transactions. Vela does not connect to any bank account, payment network, or financial institution on your behalf.</P>
      </Section>

      <Section title="3. Eligibility">
        <P>You must be at least 13 years of age to use the App. By using the App you represent that you meet this requirement and that you have the right, authority, and capacity to enter into these Terms.</P>
      </Section>

      <Section title="4. User Accounts and Data">
        <P>All expense data you enter into Vela is stored locally on your device and, if iCloud sync is enabled, in your personal iCloud container. We do not have access to your financial data.</P>
        <P>You are responsible for maintaining the security of your device and any credentials associated with your Apple ID.</P>
      </Section>

      <Section title="5. Subscriptions and Payments">
        <P>Vela offers a 7-day free trial followed by optional paid subscription plans. All payments are processed by Apple through the App Store. Subscription pricing and renewal terms are displayed at the point of purchase.</P>
        <P>You may cancel your subscription at any time through your Apple ID subscription settings. Cancellation takes effect at the end of the current billing period. We do not issue refunds for partial billing periods.</P>
      </Section>

      <Section title="6. Prohibited Conduct">
        <P>You agree not to:</P>
        <Ul items={[
          'Reverse-engineer, decompile, or disassemble the App',
          'Use the App for any unlawful purpose',
          'Attempt to gain unauthorised access to any part of the App or its infrastructure',
          'Reproduce, distribute, or create derivative works of the App without our written consent',
        ]}/>
      </Section>

      <Section title="7. Intellectual Property">
        <P>All content, design, code, and trademarks within the App are owned by or licensed to Vela. These Terms do not grant you any right to use our branding or intellectual property.</P>
      </Section>

      <Section title="8. Disclaimers">
        <P>The App is provided "as is" without warranties of any kind, express or implied. We do not warrant that the App will be error-free, uninterrupted, or free of harmful components.</P>
        <P>Vela is not a financial adviser. Nothing in the App constitutes financial, legal, or tax advice.</P>
      </Section>

      <Section title="9. Limitation of Liability">
        <P>To the fullest extent permitted by law, Vela shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App, even if we have been advised of the possibility of such damages.</P>
      </Section>

      <Section title="10. Governing Law">
        <P>These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</P>
      </Section>

      <Section title="11. Contact">
        <P>Questions about these Terms may be directed to <a href="mailto:velaspends@gmail.com" style={{ color: GREEN }}>velaspends@gmail.com</a>.</P>
      </Section>
    </div>
  );

  const Privacy = () => (
    <div>
      <div style={{ fontSize: 13, color: MUTE, marginBottom: 36 }}>{UPDATED}</div>

      <Section title="1. Introduction">
        <P>This Privacy Policy explains how Vela ("we", "us", "our") handles information when you use the Vela iOS application. We are committed to protecting your privacy. Our core principle: your financial data belongs to you, not us.</P>
      </Section>

      <Section title="2. Information We Collect">
        <P><strong>Data you enter:</strong> Expense amounts, categories, notes, and dates are stored locally on your device. If you enable iCloud Sync, this data is stored in your private iCloud container and is not accessible to us.</P>
        <P><strong>Analytics (optional):</strong> With your permission, we collect anonymised, aggregated crash reports and usage metrics (e.g. which features are tapped) via Apple's App Store Connect analytics framework. This data contains no personally identifiable information.</P>
        <P><strong>Purchase data:</strong> Apple notifies us of subscription status (active / expired) through App Store Server Notifications. We do not receive your payment details.</P>
      </Section>

      <Section title="3. How We Use Information">
        <Ul items={[
          'To provide and improve the App',
          'To verify subscription status',
          'To respond to support requests you initiate',
          'To detect and fix crashes',
        ]}/>
        <P>We do not sell, rent, or share your data with third-party advertisers.</P>
      </Section>

      <Section title="4. Data Storage and Security">
        <P>Expense data lives on-device and in your iCloud container. We apply AES-256 encryption for any data transmitted to our servers (subscription validation only). We retain server-side logs for a maximum of 30 days for security purposes.</P>
      </Section>

      <Section title="5. Third-Party Services">
        <P>The App integrates with:</P>
        <Ul items={[
          'Apple App Store — payment processing and subscription management',
          'Apple iCloud — optional device sync (governed by Apple\'s Privacy Policy)',
          'Apple HealthKit / Shortcuts — optional automation (data stays on-device)',
        ]}/>
      </Section>

      <Section title="6. Children's Privacy">
        <P>The App is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, contact us and we will delete it.</P>
      </Section>

      <Section title="7. Your Rights">
        <P>Under UK GDPR and applicable data protection law you have the right to:</P>
        <Ul items={[
          'Access the personal data we hold about you',
          'Request correction of inaccurate data',
          'Request deletion of your data',
          'Object to or restrict processing',
          'Lodge a complaint with the ICO (ico.org.uk)',
        ]}/>
        <P>Exercise your rights by emailing <a href="mailto:velaspends@gmail.com" style={{ color: GREEN }}>velaspends@gmail.com</a>. We will respond within 30 days.</P>
      </Section>

      <Section title="8. Data Retention">
        <P>Your expense data is retained on-device until you delete the App or clear your data from Settings. Server-side subscription records are retained for the duration of your subscription plus 12 months for accounting purposes.</P>
      </Section>

      <Section title="9. Changes to This Policy">
        <P>We may update this policy periodically. We will notify you via an in-app banner when material changes occur. Continued use of the App constitutes acceptance of the revised policy.</P>
      </Section>

      <Section title="10. Contact">
        <P>Data controller: Vela, London, United Kingdom. Email: <a href="mailto:velaspends@gmail.com" style={{ color: GREEN }}>velaspends@gmail.com</a>.</P>
      </Section>
    </div>
  );

  const Cookie = () => (
    <div>
      <div style={{ fontSize: 13, color: MUTE, marginBottom: 36 }}>{UPDATED}</div>

      <Section title="1. What Are Cookies?">
        <P>Cookies are small text files placed on your device when you visit a website. This Cookie Policy applies to the Vela marketing website (vela.app) only — the iOS App itself does not use cookies.</P>
      </Section>

      <Section title="2. Cookies We Use">
        <P><strong>Strictly necessary cookies</strong> — required for the website to function (e.g. security tokens, session state). These cannot be disabled.</P>
        <P><strong>Analytics cookies</strong> — anonymous, aggregated data that helps us understand how visitors use our website (page views, referral source). We use privacy-first analytics that do not track individual users across sites. No consent required under UK PECR for aggregated analytics.</P>
        <P>We do not use advertising, retargeting, or social media tracking cookies.</P>
      </Section>

      <Section title="3. Cookie List">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 16 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${SUBTLE_BORDER}` }}>
                {['Name', 'Purpose', 'Duration', 'Type'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['_session', 'Maintain session state', 'Session', 'Necessary'],
                ['_csrf',    'CSRF protection',         'Session', 'Necessary'],
                ['_va_id',   'Anonymous page analytics','1 year',  'Analytics'],
              ].map(([name, purpose, duration, type], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${SUBTLE_BORDER}`, background: i % 2 === 0 ? 'transparent' : `${CREAM}66` }}>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 13 }}>{name}</td>
                  <td style={{ padding: '10px 12px' }}>{purpose}</td>
                  <td style={{ padding: '10px 12px' }}>{duration}</td>
                  <td style={{ padding: '10px 12px' }}>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Managing Cookies">
        <P>You can control and delete cookies through your browser settings. Disabling strictly necessary cookies will affect website functionality. Disabling analytics cookies has no impact on your browsing experience.</P>
        <P>For guidance on managing cookies in your browser, visit <a href="https://www.aboutcookies.org" style={{ color: GREEN }} target="_blank" rel="noopener noreferrer">aboutcookies.org</a>.</P>
      </Section>

      <Section title="5. Contact">
        <P>Questions about cookies: <a href="mailto:velaspends@gmail.com" style={{ color: GREEN }}>velaspends@gmail.com</a>.</P>
      </Section>
    </div>
  );

  const Eula = () => (
    <div>
      <div style={{ fontSize: 13, color: MUTE, marginBottom: 36 }}>{UPDATED}</div>

      <Section title="1. Grant of Licence">
        <P>Subject to the terms of this End User Licence Agreement ("EULA"), Vela grants you a limited, non-exclusive, non-transferable, revocable licence to download and use the Vela iOS application ("App") on Apple-branded devices that you own or control, solely for your personal, non-commercial purposes.</P>
      </Section>

      <Section title="2. Apple as Third-Party Beneficiary">
        <P>You acknowledge that this EULA is between you and Vela only, not with Apple Inc. Apple is not responsible for the App or its content. However, Apple and its subsidiaries are third-party beneficiaries of this EULA, and Apple has the right to enforce it against you as a third-party beneficiary.</P>
      </Section>

      <Section title="3. Scope of Licence">
        <P>This licence does not permit you to:</P>
        <Ul items={[
          'Use the App on any device not owned or controlled by you',
          'Distribute, sublicense, lease, lend, or sell the App to third parties',
          'Modify, reverse-engineer, decompile, or create derivative works of the App',
          'Remove any proprietary notices or labels on the App',
          'Use the App for any commercial purpose',
        ]}/>
      </Section>

      <Section title="4. Ownership">
        <P>The App is licensed to you, not sold. Vela retains all intellectual property rights in and to the App, including all copyrights, patents, trademarks, and trade secrets.</P>
      </Section>

      <Section title="5. Maintenance and Support">
        <P>Vela is solely responsible for providing maintenance and support for the App as described in these Terms and this EULA. Apple has no obligation to furnish any maintenance or support services for the App.</P>
      </Section>

      <Section title="6. Warranty">
        <P>Vela warrants that the App will perform substantially in accordance with its description for 90 days from the date of download. In the event of a breach of this warranty, your sole remedy is a refund of the purchase price, to the maximum extent permitted by applicable law. Apple has no warranty obligations with respect to the App.</P>
      </Section>

      <Section title="7. Product Claims">
        <P>Vela, not Apple, is responsible for addressing any claims you have relating to the App, including: product liability claims; claims that the App fails to conform to any applicable legal or regulatory requirement; and claims arising under consumer protection or similar legislation.</P>
      </Section>

      <Section title="8. Intellectual Property Infringement">
        <P>In the event of a third-party claim that the App infringes that third party's intellectual property rights, Vela, not Apple, will be solely responsible for the investigation, defence, settlement, and discharge of any such claim.</P>
      </Section>

      <Section title="9. Legal Compliance">
        <P>You represent and warrant that (a) you are not located in a country that is subject to a US Government embargo or designated as a "terrorist supporting" country, and (b) you are not listed on any US Government list of prohibited or restricted parties.</P>
      </Section>

      <Section title="10. Termination">
        <P>This licence is effective until terminated. Your rights under this EULA will terminate automatically if you fail to comply with any of its terms. Upon termination, you must cease all use of the App and destroy all copies.</P>
      </Section>

      <Section title="11. Governing Law">
        <P>This EULA is governed by the laws of England and Wales, excluding its conflict-of-law provisions.</P>
      </Section>

      <Section title="12. Contact">
        <P><a href="mailto:velaspends@gmail.com" style={{ color: GREEN }}>velaspends@gmail.com</a></P>
      </Section>
    </div>
  );

  const DOCS = { terms: Terms, privacy: Privacy, cookie: Cookie, eula: Eula };
  const ActiveDoc = DOCS[active];

  const TITLES = {
    terms:   'Terms of Service',
    privacy: 'Privacy Policy',
    cookie:  'Cookie Policy',
    eula:    'End User Licence Agreement',
  };

  return (
    <div style={{ background: PAGE, color: INK, fontFamily: t.body, minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        background: 'rgba(239,237,232,0.88)',
        borderBottom: `0.5px solid ${SUBTLE_BORDER}`,
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          padding: isMobile ? '14px 20px' : '18px 56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="Vela Landing.html" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Mark size={isMobile ? 26 : 32}/>
            <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, letterSpacing: -1, fontFamily: t.display, color: INK }}>vela</div>
          </a>
          <div style={{ fontSize: 13, color: MUTE, fontWeight: 600 }}>Legal</div>
        </div>
      </nav>

      {/* ── BODY ── */}
      <div style={{
        maxWidth: 1180, margin: '0 auto',
        padding: isMobile ? '32px 20px 80px' : '56px 56px 120px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
        gap: isMobile ? 32 : 64,
        alignItems: 'start',
      }}>

        {/* Sidebar */}
        <div style={{ position: isMobile ? 'static' : 'sticky', top: 90 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: 0.8, marginBottom: 14 }}>LEGAL DOCUMENTS</div>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => navigate(tab.id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: isMobile ? '10px 14px' : '11px 14px',
              marginBottom: 4, borderRadius: 10,
              background: active === tab.id ? '#fff' : 'transparent',
              boxShadow: active === tab.id ? `0 0 0 1px ${SUBTLE_BORDER}, 0 2px 8px rgba(0,0,0,0.06)` : 'none',
              border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: active === tab.id ? 700 : 500,
              color: active === tab.id ? INK : MUTE,
              fontFamily: t.body,
              transition: 'all 0.15s',
            }}>{tab.label}</button>
          ))}

          {!isMobile && (
            <div style={{ marginTop: 40, padding: '18px 14px', background: `${GREEN}12`, borderRadius: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: GREEN, marginBottom: 8 }}>Questions?</div>
              <div style={{ fontSize: 13, color: MUTE, lineHeight: 1.5 }}>
                Email us at{' '}
                <a href="mailto:velaspends@gmail.com" style={{ color: GREEN, textDecoration: 'none', fontWeight: 600 }}>velaspends@gmail.com</a>
              </div>
            </div>
          )}
        </div>

        {/* Document content */}
        <div style={{
          background: '#fff', borderRadius: isMobile ? 20 : 24,
          padding: isMobile ? '28px 20px' : '52px 64px',
          boxShadow: '0 0 0 1px rgba(26,26,26,0.05), 0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <h1 style={{
            fontSize: isMobile ? 28 : 38, fontWeight: 800, fontFamily: t.display,
            letterSpacing: isMobile ? -0.8 : -1.4, color: INK, marginBottom: 8,
          }}>{TITLES[active]}</h1>
          <ActiveDoc/>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `0.5px solid ${SUBTLE_BORDER}`,
        padding: isMobile ? '28px 20px' : '32px 56px',
        textAlign: 'center',
        fontSize: 13, color: MUTE,
      }}>
        <a href="Vela Landing.html" style={{ color: GREEN, textDecoration: 'none', fontWeight: 600 }}>← Back to Vela</a>
        <span style={{ margin: '0 16px', opacity: 0.4 }}>|</span>
        © 2026 Vela. All rights reserved.
      </footer>
    </div>
  );
};
