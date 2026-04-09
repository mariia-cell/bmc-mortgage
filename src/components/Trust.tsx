import { useState } from 'react'
import { CheckCircle2, Home, RefreshCw, Layers, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { D, pill } from '../tokens'

// ─── Cases data ───────────────────────────────────────────────────────────────
const CASES = [
  {
    id: 'buy',
    tab: 'Покупка',
    Icon: Home,
    situation:
      'Семья с двумя детьми искала квартиру в Нетании. Банк одобрил сумму на ₪350,000 ниже нужной — из-за нестандартного статуса занятости одного из супругов.',
    solution:
      'Пересмотрели структуру портфеля: разделили ипотеку на два трека с разными ставками. Предоставили дополнительные документы в три банка одновременно и выбрали лучший оффер.',
    metrics: [
      { label: 'Одобрено', value: '₪1,850,000', highlight: false },
      { label: 'Ежемесячный платёж', value: '₪6,200', highlight: false },
      { label: 'Экономия за 25 лет', value: '₪187,000', highlight: true },
    ],
  },
  {
    id: 'refi',
    tab: 'Рефинансирование',
    Icon: RefreshCw,
    situation:
      'Клиент оформил ипотеку 4 года назад по ставке 5.1%. Ставки на рынке снизились, но банк не предложил пересмотр — ни разу за всё время.',
    solution:
      'Провели аудит действующего портфеля, нашли оптимальный момент для рефинансирования. Параллельно переговорили с тремя банками и зафиксировали ставку до роста.',
    metrics: [
      { label: 'Новая ставка', value: '3.8%', highlight: false },
      { label: 'Снижение платежа', value: '₪1,100/мес', highlight: false },
      { label: 'Экономия за остаток', value: '₪264,000', highlight: true },
    ],
  },
  {
    id: 'mix',
    tab: 'Оптимизация микса',
    Icon: Layers,
    situation:
      'Инвестор приобретал второй объект. Стандартный портфель банка давал высокую переплату и концентрировал весь риск в плавающем треке.',
    solution:
      'Перераспределили доли между трекингом, фиксом и прайм: снизили общую переплату и застраховали портфель от резких скачков ставки.',
    metrics: [
      { label: 'Снижение переплаты', value: '₪143,000', highlight: true },
      { label: 'Риск снижен на', value: '40%', highlight: false },
      { label: 'Закрыт за', value: '1 день', highlight: false },
    ],
  },
]

// ─── Testimonials data (duplicated inside component for marquee) ──────────────
const REVIEWS = [
  {
    id: 1,
    name: 'Ирина К.',
    location: 'Тель-Авив',
    initials: 'ИК',
    avatarBg: '#edf3ff',
    avatarColor: D.blue,
    stars: 5,
    text: 'Не верила, что можно сэкономить столько на существующей ипотеке. BMC нашли то, что банк скрывал три года.',
  },
  {
    id: 2,
    name: 'Александр М.',
    location: 'Нетания',
    initials: 'АМ',
    avatarBg: '#e8faf0',
    avatarColor: '#0a9e4c',
    stars: 5,
    text: 'Всё прошло за три недели. Чётко, без лишних встреч и бюрократии. Настоящие профессионалы.',
  },
  {
    id: 3,
    name: 'Наталья и Дмитрий',
    location: 'Хайфа',
    initials: 'НД',
    avatarBg: '#f3eeff',
    avatarColor: '#6c3de8',
    stars: 5,
    text: 'Купили квартиру мечты — банк одобрил сумму, которую мы сами уже не рассчитывали получить.',
  },
  {
    id: 4,
    name: 'Роман Б.',
    location: 'Ришон-ле-Цион',
    initials: 'РБ',
    avatarBg: '#fff4e5',
    avatarColor: '#c2610a',
    stars: 5,
    text: 'Рефинансировали ипотеку. Платёж упал на ₪900 в месяц. Теперь советую BMC всем знакомым.',
  },
  {
    id: 5,
    name: 'Марина Л.',
    location: 'Беэр-Шева',
    initials: 'МЛ',
    avatarBg: '#edf3ff',
    avatarColor: D.blue,
    stars: 5,
    text: 'Объяснили всё от А до Я. За всё время работы не было ни одного непонятного момента.',
  },
  {
    id: 6,
    name: 'Олег и Светлана',
    location: 'Герцлия',
    initials: 'ОС',
    avatarBg: '#fff0f0',
    avatarColor: '#d0302a',
    stars: 5,
    text: 'Ипотека под 3.7%. Думали, это невозможно. Оказалось — просто нужен правильный советник.',
  },
]

// ─── Cases ────────────────────────────────────────────────────────────────────
function Cases() {
  const [active, setActive] = useState('buy')
  const [animKey, setAnimKey] = useState(0)

  const switchTab = (id: string) => {
    if (id === active) return
    setActive(id)
    setAnimKey((k) => k + 1)
  }

  const current = CASES.find((c) => c.id === active)!

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={pill}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blueDot, flexShrink: 0 }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
            Кейсы
          </span>
        </div>
        <h2
          className="text-3xl md:text-[40px]"
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontWeight: 800,
            lineHeight: '1.25', letterSpacing: '-1px',
            color: D.text, margin: 0,
          }}
        >
          Реальные результаты
        </h2>
        <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '30.6px', color: D.body, margin: 0 }}>
          Каждый кейс — это реальный клиент и конкретная экономия в шекелях
        </p>
      </div>

      {/* Tab switcher — scrollable slider on mobile */}
      <div className="relative">
        <div
          className="tabs-scroll flex gap-1.5 w-full lg:w-fit"
          style={{
            background: D.white,
            borderRadius: 16, padding: 6,
            boxShadow: D.shadow,
            scrollbarWidth: 'none' as const,
          }}
        >
          {CASES.map(({ id, tab, Icon }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => switchTab(id)}
                className="tab-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px',
                  borderRadius: 12,
                  border: 'none', cursor: 'pointer',
                  background: isActive ? D.blue : 'transparent',
                  whiteSpace: 'nowrap',
                  minHeight: 44,
                }}
              >
                <Icon size={15} color={isActive ? D.white : D.body} strokeWidth={2} />
                <span style={{
                  fontSize: 14, fontWeight: 600,
                  color: isActive ? D.white : D.body,
                  lineHeight: '20px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'color 0.2s ease',
                }}>
                  {tab}
                </span>
              </button>
            )
          })}
        </div>
        {/* Right fade mask — mobile only */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 lg:hidden"
          style={{ background: 'linear-gradient(to right, transparent, #ffffff)', borderRadius: '0 16px 16px 0' }}
        />
      </div>

      {/* Case content */}
      <div
        key={animKey}
        className="trust-tab-enter grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-12 p-5 md:p-[40px]"
        style={{
          background: D.white,
          borderRadius: 32,
          boxShadow: D.shadow,
          alignItems: 'start',
        }}
      >
        {/* Left: narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: D.muted,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              Ситуация
            </span>
            <p style={{ fontSize: 16, fontWeight: 400, color: D.body, lineHeight: '26px', margin: 0 }}>
              {current.situation}
            </p>
          </div>

          <div style={{ height: 1, background: '#f1f5f9' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: D.muted,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              Решение
            </span>
            <p style={{ fontSize: 16, fontWeight: 400, color: D.body, lineHeight: '26px', margin: 0 }}>
              {current.solution}
            </p>
          </div>
        </div>

        {/* Right: metrics */}
        <div style={{
          background: '#f7faff',
          borderRadius: 20, padding: '28px 24px',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: D.muted,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            fontFamily: 'Inter, system-ui, sans-serif',
            marginBottom: 10,
          }}>
            Результат
          </span>

          {current.metrics.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                background: m.highlight ? D.blue : D.white,
                borderRadius: 14,
                padding: '16px 20px',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2
                  size={14}
                  color={m.highlight ? 'rgba(255,255,255,0.7)' : D.blue}
                  strokeWidth={2}
                />
                <span style={{
                  fontSize: 12, fontWeight: 500,
                  color: m.highlight ? 'rgba(255,255,255,0.7)' : D.muted,
                  lineHeight: '16px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}>
                  {m.label}
                </span>
              </div>
              <span style={{
                fontSize: 28, fontWeight: 700,
                color: m.highlight ? D.white : D.text,
                lineHeight: '36px',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.5px',
              }}>
                {m.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  // Duplicate for seamless loop
  const items = [...REVIEWS, ...REVIEWS]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={pill}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blueDot, flexShrink: 0 }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
            Отзывы
          </span>
        </div>
        <h2 style={{
          fontFamily: 'Montserrat, system-ui, sans-serif',
          fontWeight: 800, fontSize: 40,
          lineHeight: '50px', letterSpacing: '-1px',
          color: D.text, margin: 0,
        }}>
          Что говорят клиенты
        </h2>
        <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '30.6px', color: D.body, margin: 0 }}>
          Более 300 семей уже доверили нам свою ипотеку
        </p>
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', marginLeft: -100, marginRight: -100 }}>
        <div className="marquee-track" style={{ gap: 20, paddingLeft: 100, paddingRight: 20 }}>
          {items.map((r, i) => (
            <div
              key={`${r.id}-${i}`}
              className="marquee-card"
              style={{
                width: 320, flexShrink: 0,
                background: D.white,
                borderRadius: 20,
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column', gap: 16,
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: r.stars }).map((_, si) => (
                  <Star key={si} size={14} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                ))}
              </div>

              {/* Text */}
              <p style={{
                fontSize: 14, fontWeight: 400,
                color: D.body, lineHeight: '22px',
                margin: 0,
                fontFamily: 'Inter, system-ui, sans-serif',
                flex: 1,
              }}>
                «{r.text}»
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: r.avatarBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    color: r.avatarColor,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}>
                    {r.initials}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{
                    fontSize: 14, fontWeight: 700, color: D.text, lineHeight: '18px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}>
                    {r.name}
                  </span>
                  <span style={{
                    fontSize: 12, fontWeight: 400, color: D.muted, lineHeight: '16px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}>
                    {r.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Trust() {
  return (
    <section style={{
      background: '#f9fcff',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden',
    }}>
      <div className="px-4 md:px-[100px]" style={{ maxWidth: 1353, margin: '0 auto', paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
          <Cases />
          <Testimonials />
        </div>
      </div>
    </section>
  )
}
