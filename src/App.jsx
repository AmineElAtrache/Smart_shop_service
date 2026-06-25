import { ArrowRight, Bell, CheckCircle2, Clock, Code2, MessageCircle, Search, ShieldCheck, ShoppingBag, Sparkles, Star, Store, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import './styles.css'

const marketplaces = ['Jumia', 'Avito', 'Electroplanet', 'Electrosalam', 'Mafiaway Store', 'Moteur.ma']

const steps = [
  {
    icon: MessageCircle,
    title: 'Ask like you talk',
    text: 'Send one natural message in Darija, Arabic, French, or English. No filters, no forms, no complicated search.'
  },
  {
    icon: Search,
    title: 'We search for you',
    text: 'Smart Shopper checks trusted Moroccan marketplaces and turns messy listings into clean options.'
  },
  {
    icon: Star,
    title: 'Get the best shortlist',
    text: 'You receive a small ranked list with prices, links, sources, and the reason behind the best choice.'
  }
]

const benefits = [
  'Understands mixed Darija, French, Arabic, and English messages.',
  'Compares products across multiple Moroccan shopping sources.',
  'Filters noisy results so the user sees a useful shortlist.',
  'Can watch prices and notify the user later when a better option appears.'
]

const premiumPlans = [
  {
    name: 'Starter',
    price: 'Free',
    note: 'For simple searches',
    badge: 'Try first',
    features: ['Telegram access', 'Manual searches', 'Daily price watch', 'Top 3 ranked results'],
    action: 'Start free'
  },
  {
    name: 'Premium',
    price: '29 MAD',
    note: 'per month',
    badge: 'Best value',
    featured: true,
    features: ['Hourly deal watch', 'Priority scraping', 'Saved preferences', 'Faster answers', 'WhatsApp access when enabled'],
    action: 'Continue to payment'
  }
]

const developerTopics = [
  'User gateway',
  'NER model service',
  'Orchestrator agent',
  'Scraper agents',
  'Decision agent',
  'Response generator',
  'Ambient scheduler',
  'Governance monitor'
]

function App() {
  const page = window.location.pathname.replace(/\/$/, '')
  return page === '/developer' ? <DeveloperCuriosityPage /> : <HomePage />
}

function HomePage() {
  return (
    <main className="app-shell">
      <Header />
      <section className="hero-section" id="top">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container hero-content">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="eyebrow"><Sparkles size={16} /> Smart shopping assistant for Morocco</span>
            <h1>Shop smarter from one simple message.</h1>
            <p>
              Tell Smart Shopper what you want, your budget, and your city. It searches, compares, ranks,
              and sends back the clearest buying options without making you jump between websites.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#demo">
                See how it feels <ArrowRight size={18} />
              </a>
              <a className="secondary-link" href="#premium">Explore premium</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="demo-band" id="demo">
        <div className="container demo-grid">
          <motion.div
            className="phone-preview"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="phone-top">
              <span className="signal-dot" />
              <strong>Smart Shopper</strong>
              <span>now</span>
            </div>
            <div className="chat-bubble user">bghit hp omen f fes, budget 6000dh</div>
            <div className="chat-bubble bot">
              I found a strong match near your budget. Best first pick: HP OMEN 15 at 6200 MAD from Avito.
            </div>
            <div className="result-list">
              <OfferCard name="HP OMEN 15" price="6200 MAD" source="Avito" score="91" />
              <OfferCard name="HP OMEN Laptop 16" price="7500 MAD" source="Avito" score="78" />
              <OfferCard name="HP OMEN Desktop" price="2000 MAD" source="Avito" score="64" />
            </div>
          </motion.div>

          <div className="demo-copy">
            <span className="section-kicker">Built for normal shopping moments</span>
            <h2>No search tricks needed.</h2>
            <p>
              A user can write the way they actually speak: mixed language, short product names, city,
              color, budget, or only a rough idea. Smart Shopper turns that into a useful search and a
              human-style answer.
            </p>
            <div className="trust-row">
              <TrustItem icon={MessageCircle} label="Darija friendly" />
              <TrustItem icon={Store} label="Multi-marketplace" />
              <TrustItem icon={ShieldCheck} label="Ranked choices" />
            </div>
          </div>
        </div>
      </section>

      <section className="container section" id="how">
        <div className="section-heading">
          <span className="section-kicker">How it works</span>
          <h2>From message to decision in three calm steps.</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <motion.article
              className="step-card"
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45 }}
            >
              <step.icon size={24} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="soft-section" id="benefits">
        <div className="container benefit-grid">
          <div>
            <span className="section-kicker">Why users will care</span>
            <h2>Less scrolling. Better choices. More confidence.</h2>
            <p>
              Smart Shopper is not another marketplace. It is the small assistant between the user and
              the buying decision: it compares, explains, and keeps watching when the user does not want
              to search again tomorrow.
            </p>
          </div>
          <div className="benefit-list">
            {benefits.map((item) => (
              <div className="benefit-item" key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section marketplace-section">
        <div className="section-heading compact">
          <span className="section-kicker">Shopping sources</span>
          <h2>Designed to grow source by source.</h2>
          <p>We can start with the websites already connected, then add more providers as the product grows.</p>
        </div>
        <div className="marketplace-cloud">
          {marketplaces.map((market) => (
            <span key={market}>{market}</span>
          ))}
        </div>
      </section>

      <section className="premium-section" id="premium">
        <div className="container premium-grid">
          <div>
            <span className="section-kicker">Premium</span>
            <h2>Upgrade when the deal matters.</h2>
            <p>
              Free users can search when they need something. Premium users can let Smart Shopper keep
              checking, remember preferences, and react faster when a strong offer appears.
            </p>
            <div className="payment-note">
              <Bell size={19} />
              <span>Payment flow placeholder now. Stripe, CMI, or local payment can be connected next.</span>
            </div>
          </div>
          <div className="pricing-grid">
            {premiumPlans.map((plan) => (
              <article className={plan.featured ? 'pricing-card featured' : 'pricing-card'} key={plan.name}>
                <div className="plan-badge">{plan.badge}</div>
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.note}</span>
                </div>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><CheckCircle2 size={18} /> {feature}</li>
                  ))}
                </ul>
                <a className={plan.featured ? 'pay-button primary' : 'pay-button'} href="#top">
                  {plan.action} <ArrowRight size={18} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <h2>One message should be enough to start shopping well.</h2>
          <p>Telegram is the first channel. WhatsApp can reuse the same backend when the gateway is added.</p>
          <a className="primary-link" href="#top">Back to top <ArrowRight size={18} /></a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Header() {
  return (
    <header className="site-header">
      <nav className="container nav-bar" aria-label="Main navigation">
        <a className="brand" href="/">
          <span><ShoppingBag size={20} /></span>
          Smart Shopper
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#benefits">Benefits</a>
          <a href="#premium">Premium</a>
          <a href="/developer">Developer curiosity</a>
        </div>
        <a className="nav-cta" href="#demo">View demo</a>
      </nav>
    </header>
  )
}

function OfferCard({ name, price, source, score }) {
  return (
    <article className="offer-card">
      <div>
        <strong>{name}</strong>
        <span>{source}</span>
      </div>
      <div>
        <strong>{price}</strong>
        <span>{score}/100</span>
      </div>
    </article>
  )
}

function TrustItem({ icon: Icon, label }) {
  return (
    <div className="trust-item">
      <Icon size={19} />
      <span>{label}</span>
    </div>
  )
}

function DeveloperCuriosityPage() {
  return (
    <main className="developer-page">
      <header className="developer-header">
        <nav className="container nav-bar" aria-label="Developer navigation">
          <a className="brand" href="/">
            <span><ShoppingBag size={20} /></span>
            Smart Shopper
          </a>
          <a className="nav-cta" href="/">Back to service</a>
        </nav>
      </header>

      <section className="container developer-hero">
        <span className="eyebrow"><Code2 size={16} /> Developer curiosity</span>
        <h1>The architecture room is warming up.</h1>
        <p>
          This page will become the technical tour: agents, Kafka topics, scraping pools, NER service,
          governance, deployment, and the full architecture image. For now, it stays separate so normal
          visitors get a clean service page first.
        </p>
      </section>

      <section className="container developer-grid" aria-label="Upcoming architecture topics">
        {developerTopics.map((topic, index) => (
          <article className="developer-card" key={topic}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{topic}</h2>
            <p>Details, diagrams, responsibilities, and run commands will be added here later.</p>
          </article>
        ))}
      </section>

      <section className="container developer-note">
        <div>
          <Clock size={22} />
          <strong>Next content to add</strong>
        </div>
        <p>
          When you validate the public website, we can add the real architecture flow, agent-by-agent
          explanation, Docker services, and deployment path on this page.
        </p>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand" href="/">
          <span><Zap size={20} /></span>
          Smart Shopper
        </a>
        <p>Built for faster, clearer shopping decisions in Morocco.</p>
        <a href="/developer">Developer curiosity</a>
      </div>
    </footer>
  )
}

export default App
