import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, MessageCircle, ArrowRight, Menu, X } from 'lucide-react'
import cityBg from '../assets/city-bg.svg'
import { D, pill } from '../tokens'

// ─── BMC Logo ─────────────────────────────────────────────────────────────────
function BMCLogo() {
  return (
    <svg width="101" height="29" viewBox="0 0 143 41" fill="none" aria-label="BMC">
      <path d="M36.837 5.66976L37.36 7.19539C38.4095 10.2611 37.8667 13.0689 35.9913 15.6603C35.4719 16.3816 34.9688 17.103 34.4314 17.8081C34.2059 18.102 34.251 18.2661 34.5053 18.5186C35.544 19.5321 36.6008 20.5365 37.571 21.6186C38.6061 22.7763 39.2229 24.1955 39.6016 25.6833C39.8496 26.6568 39.9899 27.6546 40.0199 28.6588C40.0794 30.9148 39.4014 33.0031 38.323 34.9705C37.2032 37.0717 35.5952 38.8732 33.6343 40.2237C32.9132 40.7192 32.0566 40.98 31.1817 40.9703C20.9628 40.9703 10.7438 40.9703 0.52485 40.9703C0.128114 40.9703 0.0127005 40.8386 0.0127005 40.4491C0.0223184 31.4324 0.0223184 22.4156 0.0127005 13.3989C0.0127005 12.9481 0.193034 12.8308 0.60059 12.8363C2.0595 12.8579 3.5166 12.8561 4.9737 12.8651C5.57602 12.8651 5.57963 12.8651 5.57963 13.4674V29.7408C5.57963 31.454 5.57963 33.1672 5.57963 34.8804C5.57963 35.443 5.63012 35.4971 6.19998 35.4971C9.79225 35.4971 13.3827 35.4971 16.975 35.4971C19.4997 35.4971 22.0243 35.5386 24.549 35.5656C26.4047 35.5855 28.1359 35.2158 29.7066 34.141C31.9842 32.5775 33.2195 29.5785 32.6821 26.8591C32.3701 25.2757 31.6001 23.9304 30.5902 22.7366C29.5082 21.4581 28.3379 20.2444 27.1765 19.0289C26.8735 18.7116 26.8862 18.5096 27.1242 18.1615C28.2351 16.5385 29.3297 14.9155 30.3937 13.2637C31.1565 12.0807 31.0681 10.8057 30.6083 9.54155C29.9771 7.81575 28.8536 6.52815 27.0719 5.97092C26.3121 5.73923 25.5219 5.62253 24.7276 5.62468C16.7928 5.60484 8.85811 5.62468 0.923389 5.62468C0.78826 5.61656 0.652766 5.61656 0.517637 5.62468C0.1209 5.66796 -0.00353089 5.49304 7.57991e-05 5.10532C0.016907 3.57247 0.016907 2.03963 7.57991e-05 0.506784C7.57991e-05 0.124474 0.144344 -0.0143815 0.503209 0.0126687C0.624034 0.0216854 0.744858 0.0126687 0.863879 0.0126687C18.7627 0.0126687 36.6603 0.00905693 54.5567 0.00184355C54.7917 -0.00936437 55.0262 0.0306333 55.2442 0.119065C55.4622 0.207498 55.6583 0.342256 55.819 0.513999C57.1499 1.88093 58.4591 3.27312 59.8621 4.56071C61.7521 6.29553 63.7213 7.94378 65.6599 9.6245C67.7338 11.4278 69.8076 13.2186 71.8815 15.0255C72.1303 15.2437 72.2998 15.2816 72.5685 15.0526C75.7406 12.3476 78.9704 9.69664 82.0848 6.92129C84.4291 4.8276 86.6491 2.57522 88.9122 0.382352C89.0299 0.258874 89.1724 0.161635 89.3303 0.0969969C89.4881 0.0323591 89.6579 0.00178212 89.8283 0.00725887C107.335 0.0144723 124.842 0.0144723 142.349 0.00725887C142.987 0.00725887 142.996 0.0180739 142.996 0.672688C142.996 2.09853 142.996 3.52559 142.996 4.95384C142.996 5.60665 142.986 5.61206 142.345 5.61206C137.146 5.61206 131.947 5.65714 126.748 5.62107C123.234 5.59582 120.209 6.80046 117.551 9.02579C115.748 10.528 114.264 12.288 113.348 14.4557C112.938 15.4998 112.61 16.5742 112.367 17.6692C111.975 19.2453 111.979 20.8557 112.156 22.4589C112.376 24.3863 112.999 26.2456 113.986 27.9158C115.371 30.2945 117.167 32.2691 119.596 33.618C121.633 34.7669 123.93 35.3747 126.269 35.3835C131.588 35.4033 136.908 35.3835 142.228 35.3835C143 35.3835 143 35.3835 143 36.1788C143 37.5908 142.989 39.0028 143 40.4148C143 40.8188 142.888 40.9558 142.459 40.9558C135.487 40.9432 128.514 40.9558 121.54 40.9378C119.897 40.9378 118.348 40.4238 116.851 39.8107C112.413 38.0074 109.332 34.7613 107.202 30.5595C105.296 26.7942 104.607 22.7781 104.93 18.598C105.151 15.9203 105.889 13.3108 107.103 10.9139C107.892 9.32695 108.771 7.79591 109.939 6.44701C110.085 6.22939 110.206 5.99586 110.3 5.75091C110.049 5.68988 109.793 5.64888 109.535 5.62829C104.877 5.62829 100.219 5.62828 95.5594 5.61025C94.9588 5.5938 94.3741 5.80437 93.9219 6.19995C90.3658 9.17547 86.8041 12.145 83.2371 15.1085C79.6954 18.0551 76.1542 21.0006 72.6136 23.9449C72.289 24.2172 72.0834 24.1378 71.8039 23.9124C67.8365 20.7265 63.8692 17.5448 59.9018 14.3673C56.4153 11.5721 52.9253 8.77633 49.4316 5.97994C49.128 5.72889 48.7434 5.59685 48.3496 5.60845C44.6978 5.61927 41.046 5.60845 37.3943 5.61927C37.2392 5.62468 37.0805 5.64993 36.837 5.66976Z" fill="#003149"/>
      <path d="M97.4012 11.4171V40.3752C97.4012 40.9667 97.4012 40.9685 96.8134 40.9685C94.68 40.9685 92.5466 40.9577 90.4133 40.9775C89.9697 40.9775 89.8542 40.8314 89.8542 40.4076C89.8651 32.8047 89.8651 25.2018 89.8542 17.5989C89.8457 17.4437 89.8774 17.2889 89.9462 17.1496C90.0151 17.0103 90.1189 16.8911 90.2474 16.8037C92.4619 15.132 94.6656 13.444 96.8729 11.7633C97.0045 11.6587 97.1434 11.5848 97.4012 11.4171Z" fill="#003149"/>
      <path d="M47.1533 11.4279C47.642 11.7885 48.0369 12.0771 48.4246 12.3728C50.3813 13.8624 52.3415 15.3483 54.2819 16.8577C54.4759 17.0272 54.5951 17.2663 54.6137 17.5232C54.6293 25.1682 54.636 32.8138 54.6336 40.4599C54.6336 40.8459 54.5326 40.9811 54.1268 40.9775C51.9496 40.9595 49.7717 40.9595 47.5933 40.9775C47.211 40.9775 47.1118 40.8459 47.1118 40.4834C47.119 30.9737 47.119 21.4653 47.1118 11.9581C47.119 11.8246 47.1352 11.693 47.1533 11.4279Z" fill="#003149"/>
    </svg>
  )
}

// ─── Animation variants ───────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as const

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.65, delay: 0.25, ease: EASE } },
}

// ─── Calculator constants ─────────────────────────────────────────────────────
const MIN = 2000
const MAX = 20000

const TABS = [
  { label: 'Покупка жилья' },
  { label: 'Есть предложение' },
  { label: 'Есть ипотека' },
  { label: 'Нерезидент' },
]

function calcProperty(monthly: number) {
  const r = 0.045 / 12
  const n = 25 * 12
  return (monthly * (1 - Math.pow(1 + r, -n)) / r) / 0.75
}

function fmt(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n))
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const [monthly, setMonthly] = useState(6500)
  const [tab, setTab]         = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const pct      = ((monthly - MIN) / (MAX - MIN)) * 100
  const property = calcProperty(monthly)

  return (
    <>
      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative"
        style={{ background: 'transparent' }}
      >
        {/* Main header row */}
        <div
          className="px-4 py-4 md:px-[100px] md:py-[22px] max-w-[1353px] mx-auto flex items-center justify-between"
        >
          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-8 md:gap-12">
            <BMCLogo />
            <nav className="hidden md:flex items-center gap-10">
              {['Калькуляторы', 'Услуги', 'Информация', 'Контакты'].map((item) => (
                <a key={item} href="#" className="nav-link" style={{
                  fontSize: 15, fontWeight: 500, color: D.body,
                  textDecoration: 'none', lineHeight: '21px', whiteSpace: 'nowrap',
                }}>
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: desktop buttons + mobile burger */}
          <div className="flex items-center gap-3 md:gap-4">
            <a href="#" className="btn-ghost hidden md:flex items-center gap-2" style={{
              background: D.greenBg, borderRadius: 10, padding: '10px 14px',
              fontSize: 14, fontWeight: 600, color: D.green, textDecoration: 'none',
            }}>
              <MessageCircle size={15} strokeWidth={2} />
              WhatsApp
            </a>
            <a href="#" className="btn-primary hidden md:flex items-center" style={{
              background: D.blue, borderRadius: 12, padding: '10px 22px',
              fontSize: 14, fontWeight: 700, color: D.white, textDecoration: 'none',
            }}>
              Консультация
            </a>
            {/* Burger — mobile only */}
            <button
              className="flex md:hidden items-center justify-center"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 8, borderRadius: 8,
              }}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {menuOpen
                ? <X size={24} color={D.text} strokeWidth={2} />
                : <Menu size={24} color={D.text} strokeWidth={2} />
              }
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden"
              style={{
                background: '#ffffff',
                borderTop: `1px solid #e2e8f0`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                padding: '16px 20px 24px',
                display: 'flex', flexDirection: 'column', gap: 0,
                zIndex: 50, position: 'relative',
              }}
            >
              {['Калькуляторы', 'Услуги', 'Информация', 'Контакты'].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 16, fontWeight: 500, color: D.body,
                    textDecoration: 'none', lineHeight: '21px',
                    padding: '13px 0',
                    borderBottom: `1px solid #f1f5f9`,
                    display: 'block',
                  }}
                >
                  {item}
                </a>
              ))}
              <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: D.greenBg, color: D.green, borderRadius: 12,
                  padding: '13px 20px', fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  minHeight: 48,
                }}>
                  <MessageCircle size={16} strokeWidth={2} />
                  WhatsApp
                </a>
                <a href="#" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: D.blue, color: D.white, borderRadius: 12,
                  padding: '13px 20px', fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  minHeight: 48,
                }}>
                  Консультация
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Hero ── */}
      <section
        className="px-4 md:px-[100px] overflow-x-hidden relative max-w-[1353px] mx-auto min-h-[85vh]"
      >
        {/* City illustration — desktop only, stays absolutely positioned */}
        <img
          src={cityBg}
          alt=""
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: 'absolute',
            right: 0, bottom: 0,
            width: 1350, height: 'auto',
            transform: 'translateX(430px) translateY(140px)',
            opacity: 0.44,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        />

        {/* Two-column content */}
        <div
          className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-12 pb-12 md:pt-[88px] md:pb-[80px] relative z-10"
        >

          {/* ── Left column ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="w-full lg:w-[560px] lg:shrink-0"
            style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            {/* Heading */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <motion.h1
                variants={fadeUp}
                className="text-[36px] md:text-[48px] lg:text-[62px]"
                style={{
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                  fontWeight: 800,
                  lineHeight: 1.08, letterSpacing: '-1.5px',
                  color: D.text, margin: 0,
                }}
              >
                Ипотека,<br />
                которая играет<br />
                по вашим правилам
              </motion.h1>

              <motion.div
                variants={fadeUp}
                style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 420 }}
              >
                <span className="text-sm md:text-base" style={{ fontWeight: 400, color: '#4B5563', lineHeight: 1.65 }}>
                  Мы помогаем выбрать лучшие условия из десятков предложений банков Израиля.
                </span>
                <span className="text-sm md:text-base" style={{ fontWeight: 400, color: '#4B5563', lineHeight: 1.65 }}>
                  Бесплатный анализ за 24 часа. Без похода в банк.
                </span>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                className="btn-primary w-full lg:w-auto"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: D.blue, borderRadius: 12, padding: '15px 28px',
                  fontSize: 15, fontWeight: 700, color: D.white, lineHeight: '22px',
                  border: 'none', cursor: 'pointer', minHeight: 48,
                }}
              >
                Проконсультироваться индивидуально
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
              <span style={{ fontSize: 12, fontWeight: 500, color: D.muted, lineHeight: '15.6px', paddingLeft: 2 }}>
                Бесплатно · Без обязательств
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right column: Calculator ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="w-full lg:flex-1 lg:min-w-0"
            style={{ position: 'relative', zIndex: 10 }}
          >
            {/* ── Tabs — scrollable on mobile ── */}
            <div className="tabs-scroll" style={{
              background: '#f1f5f9',
              borderRadius: 18,
              padding: 5,
              display: 'flex',
              gap: 2,
              marginBottom: 12,
              position: 'relative', zIndex: 10,
              overflowX: 'auto',
              scrollbarWidth: 'none' as const,
            }}>
              {TABS.map((t, i) => {
                const active = tab === i
                return (
                  <button
                    key={t.label}
                    onClick={() => setTab(i)}
                    className="tab-btn"
                    style={{
                      flex: '1 0 auto',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px 8px',
                      borderRadius: 13,
                      background: active ? '#ffffff' : 'transparent',
                      boxShadow: active
                        ? '0 1px 4px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)'
                        : 'none',
                      border: 'none', cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Home
                      size={13}
                      color={active ? D.blue : '#94a3b8'}
                      strokeWidth={active ? 2 : 1.75}
                      style={{ flexShrink: 0 }}
                    />
                    <span style={{
                      fontSize: 13, fontWeight: active ? 600 : 500,
                      color: active ? D.text : '#94a3b8',
                      lineHeight: '18px',
                      transition: 'color 0.2s ease',
                    }}>
                      {t.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* ── Calculator card ── */}
            <div
              className="p-5 md:p-[32px]"
              style={{
                background: D.white,
                borderRadius: 24,
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                position: 'relative', zIndex: 10,
                display: 'flex', flexDirection: 'column', gap: 24,
              }}
            >

              {/* Header: pill + title + subtitle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={pill}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blue, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
                    Конвертер Аренды
                  </span>
                </div>
                <span style={{
                  fontSize: 20, fontWeight: 700, color: D.text,
                  lineHeight: '26px', letterSpacing: '-0.3px',
                }}>
                  Узнать доступный бюджет
                </span>
                <span style={{ fontSize: 14, fontWeight: 400, color: D.muted, lineHeight: '20px' }}>
                  Настройте сумму, которую вы готовы комфортно платить в месяц (например, вашу текущую аренду).
                </span>
              </div>

              {/* Slider row */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 13, fontWeight: 500, color: D.body,
                    lineHeight: '18px', letterSpacing: '0.01em',
                  }}>
                    Готов платить в месяц:
                  </span>
                  <div style={{
                    background: '#f3f4f6', borderRadius: 10, padding: '5px 12px',
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                  }}>
                    <span style={{
                      fontSize: 16, fontWeight: 700, color: D.text,
                      fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.4px',
                      lineHeight: '22px',
                    }}>
                      {fmt(monthly)}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: D.body, lineHeight: '22px' }}>
                      ₪
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={MIN} max={MAX} step={500}
                  value={monthly}
                  onChange={(e) => setMonthly(Number(e.target.value))}
                  style={{
                    width: '100%', height: 4, borderRadius: 100,
                    background: `linear-gradient(to right, ${D.blue} ${pct}%, ${D.track} ${pct}%)`,
                    appearance: 'none', WebkitAppearance: 'none',
                    outline: 'none', cursor: 'pointer',
                    display: 'block', margin: '6px 0',
                  }}
                />
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(0,0,0,0.06)' }} />

              {/* Result */}
              <div style={{
                background: '#f2f5f8', borderRadius: 24, padding: '24px 28px',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: D.label,
                    lineHeight: '16px', letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>
                    Ориентировочная стоимость жилья
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: D.muted, lineHeight: '16px' }}>
                    При взносе 25%
                  </span>
                </div>
                <span
                  className="text-[32px] md:text-[40px]"
                  style={{
                    fontWeight: 700, color: D.text,
                    lineHeight: 1.2, fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-1.5px',
                  }}
                >
                  ~ {fmt(property)} ₪
                </span>
              </div>

              <span style={{ fontSize: 12, fontWeight: 400, color: D.muted, lineHeight: '16px' }}>
                * Расчёты ориентировочные. За точным расчётом обратитесь к консультанту.
              </span>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  )
}
