import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import Sitemap from "./pages/Sitemap";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import { Link } from "wouter";

function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#00cc66", letterSpacing: "0.12em", marginBottom: "16px" }}>
          404 — NOT FOUND
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#f0f0f0", marginBottom: "16px" }}>
          Page not found
        </h1>
        <Link href="/">
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#00cc66", cursor: "pointer", letterSpacing: "0.06em" }}>
            ← BACK TO THC RESEARCH GROUP
          </span>
        </Link>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/articles/:slug" component={ArticlePage} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/cannabinoid-science" component={CategoryPage} />
      <Route path="/thc-pills" component={CategoryPage} />
      <Route path="/effects-and-benefits" component={CategoryPage} />
      <Route path="/thc-brands" component={CategoryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}
