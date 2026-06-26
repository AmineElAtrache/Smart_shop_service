import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  Bell,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Database,
  Gauge,
  MessageCircle,
  Network,
  Pause,
  Play,
  Radio,
  RefreshCw,
  Route,
  Search,
  Send,
  Server,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Terminal,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import './styles.css'

const marketplaces = ['Jumia', 'Avito', 'Electroplanet', 'Electrosalam', 'Biougnach', 'Decathlon', 'Defacto', 'Ikea', 'Marjane', 'Mafiaway Store', 'Moteur.ma', 'Mubawab', 'Mymarket', 'UltraPC']

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
    action: 'Start free',
    href: 'https://t.me/Dalil_Souqbot'
  },
  {
    name: 'Premium',
    price: '29 MAD',
    note: 'per month',
    badge: 'Best value',
    featured: true,
    features: ['Hourly deal watch', 'Priority scraping', 'Saved preferences', 'Faster answers', 'WhatsApp access when enabled'],
    action: 'Continue to payment',
    href: '#top'
  }
]

const liveExamples = [
  {
    sentence: 'bghit hp omen f fes b 6000dh',
    entities: [
      ['product', 'omen'],
      ['brand', 'HP'],
      ['city', 'Fes'],
      ['budget', '6000 MAD']
    ],
    query: 'HP omen laptop near Fes, max budget 6000 MAD',
    products: [
      ['Avito', 'HP OMEN 15', '6200 MAD', '91'],
      ['Avito', 'HP OMEN 16', '7500 MAD', '78'],
      ['Mafiaway', 'HP gaming laptop', '6800 MAD', '74']
    ],
    response: 'Best first pick: HP OMEN 15 from Avito at 6200 MAD. It is slightly above budget, but it has the strongest match and score.'
  },
  {
    sentence: 'kan9leb 3la telaja f rabat tkoun jdida w maghalyach',
    entities: [
      ['product', 'fridge'],
      ['city', 'Rabat'],
      ['condition', 'new'],
      ['intent', 'search']
    ],
    query: 'new fridge in Rabat, affordable options',
    products: [
      ['Electrosalam', 'Samsung fridge', '3199 MAD', '88'],
      ['Jumia', 'Beko refrigerator', '2890 MAD', '83'],
      ['Electroplanet', 'LG fridge', '3990 MAD', '77']
    ],
    response: 'I found new fridge options around Rabat. Best value is the Samsung option from Electrosalam because the price and availability are stronger.'
  },
  {
    sentence: 'bghit tomobile golf kehla 3endi 50000dh',
    entities: [
      ['product', 'car'],
      ['brand', 'Golf'],
      ['color', 'black'],
      ['budget', '50000 MAD']
    ],
    query: 'black Volkswagen Golf, max budget 50000 MAD',
    products: [
      ['Moteur.ma', 'Volkswagen Golf 6', '52000 MAD', '86'],
      ['Avito', 'Golf diesel black', '49000 MAD', '81'],
      ['Moteur.ma', 'Golf 5', '45500 MAD', '73']
    ],
    response: 'Best choice to open first: Volkswagen Golf 6 around 52000 MAD. If budget is strict, check the Avito Golf at 49000 MAD second.'
  }
]

const diagramNodes = [
  { id: 'user', x: 40, y: 34, icon: MessageCircle, title: 'User', tech: 'WhatsApp / Frontend', logo: ['WA', '#22c55e', 'https://cdn.simpleicons.org/whatsapp'] },
  { id: 'gateway', x: 260, y: 34, icon: Send, title: 'User Proxy Gateway', tech: 'WhatsApp Cloud API', logo: ['META', '#0668e1', 'https://cdn.simpleicons.org/meta'] },
  { id: 'orchestrator', x: 48, y: 250, icon: Route, title: 'Orchestrator Agent', tech: 'Cache + task router', logo: ['K', '#111827', 'https://cdn.simpleicons.org/apachekafka'] },
  { id: 'ner', x: 280, y: 250, icon: BrainCircuit, title: 'NER Model Service', tech: 'XLM-RoBERTa', logo: ['HF', '#f59e0b', 'https://cdn.simpleicons.org/huggingface'] },
  { id: 'cache', x: 512, y: 250, icon: Database, title: 'Global Cache', tech: 'Redis Tier 1', logo: ['RD', '#dc2626', 'https://cdn.simpleicons.org/redis'] },
  { id: 'scraper-jumia', x: 222, y: 438, icon: Network, title: 'Jumia Pool', tech: 'Scrapy providers', logo: ['JM', '#f59e0b', 'https://www.google.com/s2/favicons?domain=jumia.ma&sz=64'] },
  { id: 'scraper-avito', x: 444, y: 438, icon: Cpu, title: 'Avito Pool', tech: 'Playwright providers', logo: ['AV', '#16a34a', 'https://www.google.com/s2/favicons?domain=avito.ma&sz=64'] },
  { id: 'scraper-other', x: 666, y: 438, icon: Server, title: 'Other Providers', tech: 'Electro / Moteur / Mafiaway', logo: ['SC', '#16a34a', 'https://www.google.com/s2/favicons?domain=scrapy.org&sz=64'] },
  { id: 'decision', x: 666, y: 606, icon: Gauge, title: 'Decision Agent', tech: '100-point scoring', logo: ['100', '#0f766e', ''] },
  { id: 'generator', x: 888, y: 438, icon: Bot, title: 'Agent Generator', tech: 'Groq + template guard', logo: ['GQ', '#f97316', 'https://www.google.com/s2/favicons?domain=groq.com&sz=64'] },
  { id: 'scheduler', x: 888, y: 606, icon: Clock, title: 'Ambient Scheduler', tech: 'Daily / premium hourly', logo: ['24h', '#2563eb', 'https://cdn.simpleicons.org/googlecalendar'] },
  { id: 'governance', x: 1034, y: 250, icon: Shield, title: 'Governance Agent', tech: 'Bus monitor + audit', logo: ['OPA', '#b91c1c', 'https://cdn.simpleicons.org/openpolicyagent'] },
  { id: 'response', x: 1034, y: 34, icon: Radio, title: 'Response Out', tech: 'WhatsApp delivery', logo: ['WA', '#22c55e', 'https://cdn.simpleicons.org/whatsapp'] }
]

const diagramTopics = [
  'msg.inbound',
  'ner.extracted',
  'scrape.task.assigned',
  'scrape.raw',
  'decision.ranked',
  'response.outbound',
  'ambient.watch',
  'gov.audit'
]

const diagramLinks = [
  { id: 'user-gateway', d: 'M 170 84 L 260 84' },
  { id: 'gateway-bus', d: 'M 350 120 C 350 142 350 154 350 176' },
  { id: 'bus-orchestrator', d: 'M 140 176 C 140 205 140 225 140 250' },
  { id: 'orchestrator-ner', d: 'M 178 304 L 280 304' },
  { id: 'orchestrator-cache', d: 'M 178 330 C 290 366 430 366 512 330' },
  { id: 'orchestrator-scrapers', d: 'M 130 360 C 250 404 462 406 754 438' },
  { id: 'scrapers-decision', d: 'M 352 490 L 444 490 M 574 490 L 666 490 M 730 552 L 730 606' },
  { id: 'decision-generator', d: 'M 796 650 C 860 630 900 552 952 552' },
  { id: 'generator-response', d: 'M 1018 490 C 1080 420 1122 300 1122 150' },
  { id: 'response-user', d: 'M 1034 84 C 790 4 364 4 170 84' },
  { id: 'scheduler-loop', d: 'M 968 606 C 1050 568 1060 456 1034 368' },
  { id: 'governance-watch', d: 'M 1034 304 C 912 214 782 184 650 176' }
]

const projectLogoGroups = [
  {
    title: 'Shopping providers - 14 connected spiders',
    logos: [
      ['Jumia', '??', 'JM', '#f59e0b', 'https://www.google.com/s2/favicons?domain=jumia.ma&sz=64'],
      ['Avito', '???', 'AV', '#16a34a', 'https://www.google.com/s2/favicons?domain=avito.ma&sz=64'],
      ['Biougnach', '??', 'BG', '#0f766e', 'https://www.google.com/s2/favicons?domain=biougnach.ma&sz=64'],
      ['Decathlon', '??', 'DC', '#2563eb', 'https://www.google.com/s2/favicons?domain=decathlon.ma&sz=64'],
      ['Defacto', '??', 'DF', '#7c3aed', 'https://www.google.com/s2/favicons?domain=defacto.com&sz=64'],
      ['Electroplanet', '?', 'EP', '#2563eb', 'https://www.google.com/s2/favicons?domain=electroplanet.ma&sz=64'],
      ['Electrosalam', '??', 'ES', '#0f766e', 'https://www.google.com/s2/favicons?domain=electrosalam.ma&sz=64'],
      ['Ikea', '??', 'IK', '#facc15', 'https://www.google.com/s2/favicons?domain=ikea.com&sz=64'],
      ['Marjane', '???', 'MJ', '#dc2626', 'https://www.google.com/s2/favicons?domain=marjane.ma&sz=64'],
      ['Mafiaway Store', '??', 'MW', '#111827', 'https://www.google.com/s2/favicons?domain=mafiawaystore.com&sz=64'],
      ['Moteur.ma', '??', 'MO', '#b91c1c', 'https://www.google.com/s2/favicons?domain=moteur.ma&sz=64'],
      ['Mubawab', '??', 'MB', '#0891b2', 'https://www.google.com/s2/favicons?domain=mubawab.ma&sz=64'],
      ['Mymarket', '??', 'MM', '#18a058', 'https://www.google.com/s2/favicons?domain=mymarket.ma&sz=64'],
      ['UltraPC', '???', 'UP', '#4338ca', 'https://www.google.com/s2/favicons?domain=ultrapc.ma&sz=64']
    ]
  },
  {
    title: 'AI and scraping',
    logos: [
      ['Hugging Face', '??', 'HF', '#f59e0b', 'https://cdn.simpleicons.org/huggingface'],
      ['XLM-RoBERTa', '??', 'XL', '#7c3aed', 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg'],
      ['Groq', '?', 'GQ', '#f97316', 'https://www.google.com/s2/favicons?domain=groq.com&sz=64'],
      ['Playwright', '??', 'PW', '#22c55e', 'https://cdn.simpleicons.org/playwright'],
      ['Scrapy', '???', 'SC', '#16a34a', 'https://www.google.com/s2/favicons?domain=scrapy.org&sz=64']
    ]
  },
  {
    title: 'Data and platform',
    logos: [
      ['Kafka', '??', 'K', '#111827', 'https://cdn.simpleicons.org/apachekafka'],
      ['Redis', '??', 'RD', '#dc2626', 'https://cdn.simpleicons.org/redis'],
      ['MongoDB', '??', 'DB', '#16a34a', 'https://cdn.simpleicons.org/mongodb'],
      ['Docker', '??', 'DK', '#2563eb', 'https://cdn.simpleicons.org/docker'],
      ['Kubernetes', '??', 'K8s', '#326ce5', 'https://cdn.simpleicons.org/kubernetes']
    ]
  },
  {
    title: 'Channels and monitoring',
    logos: [
      ['WhatsApp Business', '??', 'WA', '#22c55e', 'https://cdn.simpleicons.org/whatsapp'],
      ['Meta Cloud API', '??', 'MT', '#0668e1', 'https://cdn.simpleicons.org/meta'],
      ['Prometheus', '??', 'PR', '#e6522c', 'https://cdn.simpleicons.org/prometheus'],
      ['Grafana', '??', 'GF', '#f97316', 'https://cdn.simpleicons.org/grafana']
    ]
  }
]

const diagramMemory = [
  {
    id: 'global',
    title: 'Tier 1 - Global shared memory',
    color: '#18a058',
    text: 'Redis cache shared by all agents for product JSON, prices, health, and robots metadata.',
    logos: [
      ['Redis', 'RD', '#dc2626', 'https://cdn.simpleicons.org/redis'],
      ['Kafka', 'K', '#111827', 'https://cdn.simpleicons.org/apachekafka']
    ],
    rows: ['products:{site}:{sku}', 'prices:{sku}:history', 'sites:{domain}:health']
  },
  {
    id: 'user',
    title: 'Tier 2 - Per-user shared memory',
    color: '#2563eb',
    text: 'Redis + MongoDB memory for preferences, budget, previous searches, and active watches.',
    logos: [
      ['Redis', 'RD', '#dc2626', 'https://cdn.simpleicons.org/redis'],
      ['MongoDB', 'DB', '#16a34a', 'https://cdn.simpleicons.org/mongodb']
    ],
    rows: ['user:{id}:prefs', 'user:{id}:budget', 'user:{id}:watches']
  },
  {
    id: 'private',
    title: 'Tier 3 - Private behavior memory',
    color: '#7c3aed',
    text: 'Private profile used only by the generator for tone, language, and recent interaction style.',
    logos: [
      ['MongoDB', 'DB', '#16a34a', 'https://cdn.simpleicons.org/mongodb'],
      ['Groq', 'GQ', '#f97316', 'https://www.google.com/s2/favicons?domain=groq.com&sz=64']
    ],
    rows: ['behaviors:{user_id}', 'tone + language', 'last interactions']
  }
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
                <a className={plan.featured ? 'pay-button primary' : 'pay-button'} href={plan.href}>
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
  const [exampleIndex, setExampleIndex] = useState(0)
  const example = liveExamples[exampleIndex]

  return (
    <main className="developer-page">
      <header className="developer-header">
        <nav className="container nav-bar" aria-label="Developer navigation">
          <a className="brand" href="/">
            <span><ShoppingBag size={20} /></span>
            Smart Shopper
          </a>
          <div className="nav-links developer-nav-links">
            <a href="#live-flow">Live diagram</a>
          </div>
          <a className="nav-cta" href="/">Back to service</a>
        </nav>
      </header>

      <section className="developer-hero-v2">
        <div className="container developer-hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="eyebrow"><Code2 size={16} /> Developer curiosity</span>
            <h1>Watch the architecture run live.</h1>
            <p>
              This page turns the PFA architecture into a living control room: Kafka topics light up,
              agents activate, memory tiers read and write, governance audits the bus, and the final
              response appears from the same sentence.
            </p>
            <div className="dev-hero-actions">
              <a className="primary-link" href="#live-flow">Run the diagram <ArrowRight size={18} /></a>
              <a className="secondary-link" href="#live-flow">Explore the flow</a>
            </div>
          </motion.div>

          <motion.div
            className="dev-console"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="console-top">
              <span />
              <span />
              <span />
              <strong>smart-shopper/events</strong>
            </div>
            <div className="console-line"><span>topic</span> msg.inbound</div>
            <div className="console-line"><span>request</span> req_7fa2</div>
            <div className="console-line"><span>message</span> {example.sentence}</div>
            <div className="console-line success"><span>status</span> pipeline live</div>
          </motion.div>
        </div>
      </section>

      <section className="live-flow-section full-architecture-page" id="live-flow">
        <LiveArchitectureDiagram
          example={example}
          exampleIndex={exampleIndex}
          setExampleIndex={setExampleIndex}
        />
      </section>
    </main>
  )
}

function makePipelineStages(example, cacheMode) {
  const cacheHit = cacheMode === 'hit'
  const entities = example.entities.map(([type, value]) => `${type}=${value}`).join(', ')

  return [
    {
      key: 'message',
      title: 'User sends message',
      topic: 'msg.inbound',
      active: ['user', 'gateway'],
      links: ['user-gateway', 'gateway-bus'],
      memory: [],
      status: 'Gateway publishes the incoming WhatsApp message to Kafka.',
      log: 'User message accepted and wrapped with request_id, user_id, timestamp, and channel metadata.',
      payload: `msg.inbound { request_id: 'req_7fa2', channel: 'whatsapp', text: '${example.sentence}' }`
    },
    {
      key: 'ner',
      title: 'NER extracts entities',
      topic: 'ner.extracted',
      active: ['orchestrator', 'ner'],
      links: ['bus-orchestrator', 'orchestrator-ner'],
      memory: ['user'],
      status: 'The orchestrator calls the XLM-RoBERTa NER service as a tool.',
      log: `Entities detected: ${entities}.`,
      payload: `ner.extracted { entities: [${entities}], confidence: 0.98 }`
    },
    {
      key: 'cache',
      title: cacheHit ? 'Cache hit' : 'Cache miss',
      topic: cacheHit ? 'products cache' : 'scrape.task.assigned',
      active: ['orchestrator', 'cache'],
      links: ['orchestrator-cache'],
      memory: ['global', 'user'],
      status: cacheHit ? 'Fresh cached products found. Scraping is skipped.' : 'No fresh cache found. The orchestrator creates provider tasks.',
      log: cacheHit ? 'Redis Tier 1 returns fresh products for this query.' : 'Redis Tier 1 has no fresh product set, so the system fans out scraping tasks.',
      payload: cacheHit ? `cache.hit { source: 'redis', ttl: 'fresh', skip_scraping: true }` : `scrape.task.assigned { providers: 14, query: '${example.query}' }`
    },
    {
      key: 'scrape',
      title: cacheHit ? 'Scrapers skipped' : 'Scrapers run in parallel',
      topic: cacheHit ? 'cache.fast_path' : 'scrape.raw',
      active: cacheHit ? ['orchestrator', 'decision'] : ['scraper-jumia', 'scraper-avito', 'scraper-other'],
      links: cacheHit ? ['orchestrator-scrapers'] : ['orchestrator-scrapers', 'scrapers-decision'],
      memory: cacheHit ? ['global'] : [],
      status: cacheHit
        ? 'Fresh products are already in Redis, so scraper pools stay cold and the system saves time.'
        : 'Scraping tasks are assigned to Jumia, Avito, Electro, Moteur, and other providers in parallel.',
      log: cacheHit ? 'Fast path uses cached normalized listings.' : 'Marketplace providers return raw products, prices, sources, availability, and links.',
      payload: cacheHit ? `cache.fast_path { products: 3, latency: 'low' }` : `scrape.raw { providers_done: 14, normalized_products: ${example.products.length} }`
    },
    {
      key: 'decision',
      title: 'Decision ranks results',
      topic: 'decision.ranked',
      active: ['decision'],
      links: ['scrapers-decision'],
      memory: ['global'],
      status: 'Products are deduplicated, normalized, scored, and ranked.',
      log: 'Decision score: price 36/40, trust 27/30, quality 17/20, availability 8/10.',
      payload: `decision.ranked { top_score: 88, items: ${example.products.length}, scoring: 'price/trust/quality/availability' }`
    },
    {
      key: 'generator',
      title: 'Generator writes response',
      topic: 'response.outbound',
      active: ['generator', 'response'],
      links: ['decision-generator', 'generator-response'],
      memory: ['private'],
      status: 'Groq-backed generation creates a natural answer with validation guards.',
      log: 'The response follows the user language, includes source, price, score, link, and buying advice.',
      payload: `response.outbound { language: 'user_style', validator: 'passed', channel: 'whatsapp' }`
    },
    {
      key: 'ambient',
      title: 'Ambient watch scheduled',
      topic: 'ambient.watch',
      active: ['scheduler'],
      links: ['scheduler-loop'],
      memory: ['user'],
      status: 'A watch can re-trigger later, daily for free users or hourly for premium users.',
      log: 'The scheduler stores the watch and will publish a new task when the watch wakes up.',
      payload: `ambient.watch { cadence: '24h_free_or_1h_premium', expires_after: '7d' }`
    },
    {
      key: 'governance',
      title: 'Governance audits everything',
      topic: 'gov.audit',
      active: ['governance'],
      links: ['governance-watch'],
      memory: [],
      status: 'Policy checks, robots rules, rate limits, and anti-abuse audit complete.',
      log: 'Governance monitored the full event chain and wrote audit logs for observability.',
      payload: `gov.audit { pii: 'clean', robots: 'checked', rate_limit: 'ok' }`
    }
  ]
}

function LiveArchitectureDiagram({ example, exampleIndex, setExampleIndex }) {
  const [activeStep, setActiveStep] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [cacheMode, setCacheMode] = useState('miss')
  const stages = useMemo(() => makePipelineStages(example, cacheMode), [example, cacheMode])
  const stage = stages[activeStep]

  useEffect(() => {
    if (!isRunning) return undefined
    const timer = window.setInterval(() => {
      setActiveStep((step) => (step + 1) % stages.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [isRunning, stages.length])

  const previousStages = stages.slice(0, activeStep)
  const completedNodes = new Set(previousStages.flatMap((item) => item.active))
  const activeNodes = new Set(stage.active)
  const completedLinks = new Set(previousStages.flatMap((item) => item.links))
  const activeLinks = new Set(stage.links)
  const completedTopics = new Set(previousStages.map((item) => item.topic))
  const activeMemory = new Set(stage.memory)
  const generatorStageIndex = stages.findIndex((item) => item.key === 'generator')
  const showFinalMessage = activeStep >= generatorStageIndex

  const chooseExample = (index) => {
    setExampleIndex(index)
    setActiveStep(0)
    setIsRunning(true)
  }

  const runAgain = () => {
    setActiveStep(0)
    setIsRunning(true)
  }

  return (
    <div className="architecture-theater">
      <div className="section-heading compact">
        <span className="section-kicker">Live architecture</span>
        <h2>The full system working in front of you.</h2>
        <p>Choose a sentence, press run, and watch the event-driven agent pipeline move from user message to final response.</p>
      </div>

      <div className="arch-control-bar">
        <div className="arch-input-shell">
          <Terminal size={18} />
          <input value={example.sentence} readOnly aria-label="Selected user sentence" />
        </div>
        <select
          aria-label="Cache mode"
          value={cacheMode}
          onChange={(event) => {
            setCacheMode(event.target.value)
            setActiveStep(0)
            setIsRunning(true)
          }}
        >
          <option value="miss">Cache miss - full pipeline</option>
          <option value="hit">Cache hit - fast path</option>
        </select>
        <button className="arch-run-button" type="button" onClick={() => setIsRunning((value) => !value)}>
          {isRunning ? <Pause size={17} /> : <Play size={17} />}
          {isRunning ? 'Pause' : 'Run'}
        </button>
        <button className="arch-reset-button" type="button" onClick={runAgain} aria-label="Restart architecture flow">
          <RefreshCw size={17} />
        </button>
      </div>

      <div className="example-switcher arch-examples">
        {liveExamples.map((item, index) => (
          <button
            className={index === exampleIndex ? 'example-button active' : 'example-button'}
            key={item.sentence}
            onClick={() => chooseExample(index)}
            type="button"
          >
            {item.sentence}
          </button>
        ))}
      </div>

      <div className="arch-stage-track" aria-label="Architecture flow order">
        {stages.map((item, index) => {
          const state = index === activeStep ? 'active' : index < activeStep ? 'done' : ''

          return (
            <button
              className={state ? `arch-stage-pill ${state}` : 'arch-stage-pill'}
              key={item.key}
              onClick={() => {
                setActiveStep(index)
                setIsRunning(false)
              }}
              type="button"
            >
              <span>{index + 1}</span>
              <strong>{item.title}</strong>
              <small>{item.topic}</small>
            </button>
          )
        })}
      </div>


      <div className="live-architecture-grid diagram-only">
        <div className="live-architecture-canvas">
          <div className="arch-canvas-inner">
            <svg className="arch-link-svg" viewBox="0 0 1210 850" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="arrow-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
              </defs>
              {diagramLinks.map((link) => (
                <path
                  className={activeLinks.has(link.id) ? 'arch-link active' : completedLinks.has(link.id) ? 'arch-link done' : 'arch-link'}
                  d={link.d}
                  key={link.id}
                  markerEnd="url(#arrow-head)"
                />
              ))}
            </svg>

            <div className="arch-zone-label entry">Entry</div>
            <div className="arch-zone-label bus">Kafka message bus</div>
            <div className="arch-zone-label agents">Agents</div>
            <div className="arch-zone-label memory">Three-tier memory</div>

            <div className="arch-kafka-bus">
              <div className="bus-title"><Activity size={16} /> Apache Kafka backbone</div>
              <div className="topic-row">
                {diagramTopics.map((topic) => (
                  <span
                    className={stage.topic === topic || completedTopics.has(topic) ? 'topic-chip live' : 'topic-chip'}
                    key={topic}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {diagramNodes.map((node) => (
              <DiagramNode
                completed={completedNodes.has(node.id)}
                active={activeNodes.has(node.id)}
                key={node.id}
                node={node}
                showDecisionScore={node.id === 'decision' && stage.key === 'decision'}
              />
            ))}

            <div className={`arch-packet step-${activeStep}`} key={`${activeStep}-${cacheMode}`} />

            <div className={`arch-floating-event step-${activeStep}`} key={`event-${activeStep}-${cacheMode}`}>
              <span>Kafka message</span>
              <strong>{stage.topic}</strong>
              <code>{stage.payload}</code>
            </div>

            {showFinalMessage && (
              <div className="arch-final-message">
                <span>Final response preview</span>
                <strong>{example.response}</strong>
              </div>
            )}

            <div className="arch-memory-zone">
              {diagramMemory.map((tier) => {
                const isTierActive = activeMemory.has(tier.id)

                return (
                  <div className={isTierActive ? 'arch-memory-tier active' : 'arch-memory-tier'} key={tier.id}>
                    <div className="memory-title" style={{ '--tier-color': tier.color }}>
                      <span />
                      <strong>{tier.title}</strong>
                      <b>{isTierActive ? 'In use' : 'Ready'}</b>
                    </div>
                    <div className="memory-logo-row">
                      {tier.logos.map(([name, short, color, logo]) => (
                        <span className="memory-logo-chip" style={{ '--memory-logo-color': color }} key={name}>
                          <img
                            alt=""
                            loading="lazy"
                            src={logo}
                            onError={(event) => {
                event.currentTarget.style.display = 'none'
                event.currentTarget.parentElement?.classList.add('logo-failed')
              }}
                          />
                          <em>{short}</em>
                          <small>{name}</small>
                        </span>
                      ))}
                    </div>
                    <p>{tier.text}</p>
                    {tier.rows.map((row) => (
                      <code key={row}>{row}</code>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <ProjectLogoWall />
    </div>
  )
}

function ProjectLogoWall() {
  return (
    <section className="technology-showcase" aria-label="Smart Shopper technology and provider logos">
      <div className="technology-heading">
        <span className="section-kicker">Technology stack</span>
        <h2>Smart Shopper technology stack</h2>
      </div>
      <div className="project-logo-wall">
        {projectLogoGroups.map((group) => (
        <section className="project-logo-group" key={group.title}>
          <h3>{group.title}</h3>
          <div>
            {group.logos.map(([name, emoji, short, color, logo]) => (
              <span className="project-logo-chip" style={{ '--brand-color': color }} key={name}>
                <b className="logo-mark">
                  <span className="logo-fallback">{emoji}</span>
                  <img
                    alt=""
                    loading="lazy"
                    src={logo}
                    onError={(event) => {
                event.currentTarget.style.display = 'none'
                event.currentTarget.parentElement?.classList.add('logo-failed')
              }}
                  />
                  <em>{short}</em>
                </b>
                <small>{name}</small>
              </span>
            ))}
          </div>
        </section>
        ))}
      </div>
    </section>
  )
}

function DiagramNode({ node, active, completed, showDecisionScore }) {
  const Icon = node.icon
  const className = [
    'arch-node',
    active ? 'active' : completed ? 'completed' : '',
    node.id === 'decision' ? 'decision-node' : ''
  ].filter(Boolean).join(' ')

  return (
    <article className={className} style={{ left: node.x, top: node.y }}>
      <div className="node-head">
        <div className="node-icon"><Icon size={20} /></div>
        <span className="node-brand" style={{ '--node-brand-color': node.logo[1] }}>
          {node.logo[2] && (
            <img
              alt=""
              loading="lazy"
              src={node.logo[2]}
              onError={(event) => {
                event.currentTarget.style.display = 'none'
                event.currentTarget.parentElement?.classList.add('logo-failed')
              }}
            />
          )}
          <em>{node.logo[0]}</em>
        </span>
      </div>
      <h3>{node.title}</h3>
      <p>{node.tech}</p>
      <small>{active ? 'Active' : completed ? 'Done' : 'Standby'}</small>
      {showDecisionScore && (
        <div className="node-decision-score">
          <span>Decision score</span>
          <strong>88 / 100</strong>
          <em>price 36 / trust 27 / quality 17 / availability 8</em>
        </div>
      )}
    </article>
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
