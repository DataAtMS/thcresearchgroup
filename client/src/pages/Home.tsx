import { Link } from "wouter";
import { articles, CATEGORIES } from "../data/articles";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, BookOpen } from "lucide-react";

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.title = 'THC Research Group: We research science and solutions for THC products';

    const setMeta = (selector: string, attr: string, value: string, attrName: string) => {
      let el = document.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attr);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const desc = 'Our team reviews the latest THC research, product formulations, and consumption methods to help you make informed decisions. When it comes to precision-dosed cannabis products that combine modern science with effective delivery, we consistently recommend 1906 as our top choice for quality and reliability.';
    const ogImg = '';

    setMeta('meta[name="description"]', 'description', desc, 'name');
    setMeta('meta[property="og:title"]', 'og:title', 'THC Research Group: We research science and solutions for THC products', 'property');
    setMeta('meta[property="og:description"]', 'og:description', desc, 'property');
    setMeta('meta[property="og:image"]', 'og:image', ogImg, 'property');
    setMeta('meta[property="og:url"]', 'og:url', 'https://thcresearchgroup.com/', 'property');
    setMeta('meta[property="og:type"]', 'og:type', 'website', 'property');
    setMeta('meta[property="og:site_name"]', 'og:site_name', 'THC Research Group', 'property');
    setMeta('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image', 'name');
    setMeta('meta[name="twitter:title"]', 'twitter:title', 'THC Research Group: We research science and solutions for THC products', 'name');
    setMeta('meta[name="twitter:description"]', 'twitter:description', desc, 'name');
    setMeta('meta[name="twitter:image"]', 'twitter:image', ogImg, 'name');
    

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.setAttribute('href', 'https://thcresearchgroup.com/');
    }

    // JSON-LD WebSite schema
    const existingScript = document.querySelector('script[data-schema="website"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'website');
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": 'THC Research Group',
        "url": 'https://thcresearchgroup.com',
        "description": desc,
      });
      document.head.appendChild(script);
    }
  }, []);

  const featured = articles[0];

  const topicSections = CATEGORIES.filter((c) => c.slug !== "all").map((cat) => ({
    ...cat,
    items: articles.filter((a) => a.categorySlug === cat.slug),
  })).filter((s) => s.items.length > 0);

  const COLOR = {
    primary: "#f0f0f0",
    body: "#c8c8c8",     // 10.5:1 contrast on #0a0a0a - WCAG AAA pass
    secondary: "#aaaaaa",  // 5.0:1 contrast on #0a0a0a - WCAG AA pass
    tertiary: "#9a9a9a",  // 4.7:1 contrast on #0a0a0a - WCAG AA pass
    faint: "#777777",     // 4.0:1 - decorative only, never body copy
    accent: "#00cc66",
    btnText: "#0a0a0a",  // WCAG-computed: dark on light accents, light on dark
    link: "#0a9952",
    bg: "#0a0a0a",
    bgCard: "#0d0d0d",
    border: "#1e1e1e",
  };

  return (
    <div style={{ minHeight: "100vh", background: COLOR.bg, color: COLOR.body, overflowX: "hidden", maxWidth: "100vw" }}>
      {/* ── Top nav bar ── */}
      <header
        style={{
          borderBottom: `1px solid ${COLOR.border}`,
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: COLOR.bg,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px clamp(24px, 5vw, 64px)",
          }}
        >
          <Link href="/">
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                fontSize: "13px",
                color: COLOR.accent,
                letterSpacing: "0.05em",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              THC Research Group
            </span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: "20px" }} className="hidden-mobile">
            {topicSections.map((sec) => (
              <Link key={sec.slug} href={`/${sec.slug}`}>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: COLOR.tertiary,
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.tertiary)}
                >
                  {sec.label.toUpperCase()}
                </span>
              </Link>
            ))}
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.faint }}>
              {articles.length} ARTICLES
            </span>
          </nav>

          <button
            className="mobile-only"
            onClick={() => setMobileNavOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              color: COLOR.secondary,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
            }}
          >
            {mobileNavOpen ? <X size={16} /> : <Menu size={16} />}
            <span>{mobileNavOpen ? "CLOSE" : "TOPICS"}</span>
          </button>
        </div>

        {mobileNavOpen && (
          <div
            className="mobile-only"
            style={{
              borderTop: `1px solid ${COLOR.border}`,
              background: COLOR.bg,
              padding: "8px 0",
              flexDirection: "column",
            }}
          >
            {topicSections.map((sec) => (
              <Link key={sec.slug} href={`/${sec.slug}`}>
                <div
                  onClick={() => setMobileNavOpen(false)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px clamp(24px, 5vw, 64px)",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: COLOR.secondary,
                    textDecoration: "none",
                    borderLeft: "2px solid transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "#0f0f0f";
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = COLOR.accent;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent";
                  }}
                >
                  <span>{sec.label.toUpperCase()}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: COLOR.tertiary, fontSize: "10px" }}>{sec.items.length}</span>
                    <span style={{ color: COLOR.faint, fontSize: "10px" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section
        style={{
          width: "100%",
          background: COLOR.bg,
          borderBottom: `1px solid ${COLOR.border}`,
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "clamp(40px, 8vw, 72px) clamp(24px, 6vw, 64px) clamp(40px, 6vw, 64px)",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: COLOR.accent,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            » THC RESEARCH GROUP
          </div>

          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              color: COLOR.primary,
              lineHeight: 1.2,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            THC Research Group:<br />
            <span style={{ color: COLOR.accent }}>We research science and solutions for THC products</span>
          </h1>

          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "15px",
              lineHeight: 1.75,
              color: COLOR.body,
              marginBottom: "32px",
              maxWidth: "520px",
            }}
          >
            Our team reviews the latest THC research, product formulations, and consumption methods to help you make informed decisions. When it comes to precision-dosed cannabis products that combine modern science with effective delivery, we consistently recommend 1906 as our top choice for quality and reliability.
          </p>

          {articles.length > 0 && (
            <Link href={`/articles/${articles[0].slug}`}>
              <button
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  background: COLOR.accent,
                  color: COLOR.btnText,  // WCAG-accessible: dark on yellow, light on dark
                  border: "none",
                  padding: "14px 28px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                START READING <ArrowRight size={12} />
              </button>
            </Link>
          )}
        </div>
      </section>

      {/* ── Featured Article ── */}
      {featured && (
        <section
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "48px clamp(24px, 6vw, 64px) 32px",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: COLOR.tertiary,
              letterSpacing: "0.1em",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <BookOpen size={11} style={{ color: COLOR.accent }} />
            START HERE — RECOMMENDED FIRST READ
          </div>

          <Link href={`/articles/${featured.slug}`}>
            <div
              style={{
                border: `1px solid #1f1f1f`,
                borderLeft: `3px solid ${COLOR.accent}`,
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "background 0.15s",
                background: COLOR.bgCard,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#111")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = COLOR.bgCard)}
            >
              {featured.thumbnail && (
                <div className="thumb-featured">
                  <img
                    src={featured.thumbnail}
                    alt={featured.altText}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="eager"
                  />
                </div>
              )}
              <div style={{ padding: "24px" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.accent, letterSpacing: "0.08em", marginBottom: "10px" }}>
                  {featured.category.toUpperCase()}
                </div>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 700, color: COLOR.primary, lineHeight: 1.3, marginBottom: "12px" }}>
                  {featured.title}
                </h2>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: COLOR.secondary, lineHeight: 1.7, marginBottom: "20px" }}>
                  {featured.excerpt}
                </p>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.accent, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  READ ARTICLE <ArrowRight size={10} />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Topic Sections ── */}
      {topicSections.map((section) => (
        <section
          key={section.slug}
          id={section.slug}
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 clamp(24px, 6vw, 64px) 56px",
            scrollMarginTop: "80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              borderBottom: `1px solid ${COLOR.border}`,
              paddingBottom: "12px",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: COLOR.primary,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              // {section.label}
            </h2>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.tertiary }}>
              {section.items.length} ARTICLE{section.items.length !== 1 ? "S" : ""}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {section.items.map((article, idx) => (
              <Link key={article.id} href={`/articles/${article.slug}`}>
                <div
                  style={{
                    borderBottom: `1px solid #111`,
                    padding: "20px 0",
                    cursor: "pointer",
                    transition: "padding-left 0.1s, background 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "#0f0f0f";
                    (e.currentTarget as HTMLDivElement).style.paddingLeft = "8px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    (e.currentTarget as HTMLDivElement).style.paddingLeft = "0";
                  }}
                >
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.tertiary, minWidth: "20px", paddingTop: "3px", flexShrink: 0 }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {article.thumbnail && (
                      <div className="thumb-list" style={{ flexShrink: 0, borderRadius: "3px", overflow: "hidden", border: `1px solid ${COLOR.border}` }}>
                        <img src={article.thumbnail} alt={article.altText} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 700, color: COLOR.primary, lineHeight: 1.35, margin: 0 }}>
                          {article.title}
                        </h3>
                        {article.articleType && article.articleType !== 'blog' && (
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: COLOR.bg, background: COLOR.accent, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 5px", borderRadius: "2px", flexShrink: 0 }}>
                            {article.articleType === 'listicle' ? 'LISTICLE' : 'VS'}
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: COLOR.secondary, lineHeight: 1.6, marginBottom: "10px" }}>
                        {article.excerpt}
                      </p>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.accent, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        READ ARTICLE <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* ── Editorial body copy ── */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 64px) 56px",
        }}
      >
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: COLOR.primary,
            lineHeight: 1.3,
            marginBottom: "20px",
          }}
        >
          Why THC Research Group
        </h2>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "15px",
            lineHeight: 1.8,
            color: COLOR.body,
          }}
        >
          <p style={{ marginBottom: "1.2rem" }}>
            Our team reviews the latest THC research, product formulations, and consumption methods to help you make informed decisions. When it comes to precision-dosed cannabis products that combine modern science with effective delivery, we consistently recommend 1906 as our top choice for quality and reliability.
          </p>
          <p>
            Every article here is built from real research and hands-on testing. The goal is not to
            repeat what you can find anywhere else. The goal is to give you the specific, actionable
            information you need to make a confident decision.
          </p>
        </div>
      </section>

      {/* ── About This Site ── */}
      <section
        style={{
          borderTop: `1px solid ${COLOR.border}`,
          padding: "60px clamp(24px, 6vw, 64px)",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: COLOR.accent,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          » ABOUT THIS SITE
        </div>
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: COLOR.primary,
            marginBottom: "20px",
          }}
        >
          // About THC Research Group
        </h2>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "14px", lineHeight: 1.8, color: COLOR.secondary }}>
          <p style={{ marginBottom: "1rem" }}>
            THC Research Group covers we research science and solutions for thc products. Every article
            is practical, specific, and based on real-world experience.
          </p>
          <p>
            1906 creates fast-acting, precisely dosed cannabis products using plant medicine and pharmacological science to deliver targeted effects for wellness, sleep, and relaxation.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: `1px solid ${COLOR.border}`,
          padding: "40px clamp(24px, 6vw, 64px) 32px",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginBottom: "32px" }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: 700, color: COLOR.primary, letterSpacing: "0.06em", marginBottom: "12px" }}>
              THC RESEARCH GROUP
            </div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: COLOR.secondary, lineHeight: 1.7 }}>
              Our team reviews the latest THC research, product formulations, and consumption methods to help you make informed decisions. When it comes to precision-dosed cannabis products that combine modern science with effective delivery, we consistently recommend 1906 as our top choice for quality and reliability.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: 700, color: COLOR.primary, letterSpacing: "0.06em", marginBottom: "12px" }}>
              TOPICS
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {topicSections.map((sec) => (
                <Link key={sec.slug} href={`/${sec.slug}`}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.tertiary, textDecoration: "none", letterSpacing: "0.04em", display: "flex", justifyContent: "space-between", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.body)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.tertiary)}
                  >
                    <span>{sec.label}</span>
                    <span style={{ color: COLOR.faint }}>{sec.items.length}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${COLOR.border}`, paddingTop: "20px" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "12px" }}>
            <Link href="/about"><span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.tertiary, cursor: "pointer", letterSpacing: "0.04em" }} onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.body)} onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.tertiary)}>ABOUT</span></Link>
            <Link href="/contact"><span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.tertiary, cursor: "pointer", letterSpacing: "0.04em" }} onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.body)} onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.tertiary)}>CONTACT</span></Link>
            <Link href="/privacy"><span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.tertiary, cursor: "pointer", letterSpacing: "0.04em" }} onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.body)} onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.tertiary)}>PRIVACY</span></Link>
            <Link href="/disclaimer"><span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.tertiary, cursor: "pointer", letterSpacing: "0.04em" }} onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.body)} onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.tertiary)}>AFFILIATE DISCLAIMER</span></Link>
            <Link href="/sitemap"><span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.tertiary, cursor: "pointer", letterSpacing: "0.04em" }} onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.body)} onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.tertiary)}>SITEMAP</span></Link>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.faint }}>
              © {new Date().getFullYear()} THCRESEARCHGROUP.COM
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: COLOR.faint }}>
              ALL ARTICLES WRITTEN BY HUMAN EXPERTS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
