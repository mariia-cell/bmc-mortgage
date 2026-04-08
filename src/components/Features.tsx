import { CircleCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { D, pill } from '../tokens'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
const stagger = (delay = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

// ─── Data ─────────────────────────────────────────────────────────────────────
const BULLETS = [
  'Независимый анализ от 12+ банков',
  'Экономия до ₪200,000 на переплатах',
  'Полное сопровождение на русском языке',
]

const STATS = [
  { value: '500+',  label: 'семей сэкономили\nв среднем ₪143,000' },
  { value: '12',    label: 'лет опыта\nна рынке Израиля' },
  { value: '3500+', label: 'клиентам помогли\nс ипотекой по всей стране' },
  { value: '98%',   label: 'одобрение\nзаявок' },
]

const BANKS = [
  { abbr: 'BAP', name: 'Bank Hapoalim',  color: '#dc2626' },
  { abbr: 'BL',  name: 'Bank Leumi',     color: '#1e40af' },
  { abbr: 'MTB', name: 'Bank Mizrahi',   color: '#065f46' },
  { abbr: 'BD',  name: 'Bank Discount',  color: '#7c3aed' },
  { abbr: 'BOJ', name: 'Bank Jerusalem', color: '#92400e' },
  { abbr: 'MRC', name: 'Bank Mercantile',color: '#0e7490' },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Features() {
  return (
    <section
      className="px-4 md:px-[100px]"
      style={{
        maxWidth: 1353, margin: '0 auto',
        paddingTop: 40, paddingBottom: 60,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >

      {/* Bullets row */}
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center pb-10 md:pb-[60px]">
        {BULLETS.map((text) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CircleCheck size={18} color={D.blue} strokeWidth={2} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 16, fontWeight: 400, color: D.body, lineHeight: '30.6px' }}>
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* Main section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 60, paddingTop: 20 }}>

        {/* Approach block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center' }}>

          <div style={pill}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blueDot, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
              Наш подход
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontWeight: 800, fontSize: 40,
            lineHeight: '50px', letterSpacing: '-1px',
            color: D.text, margin: 0,
          }}>
            Банк работает в своих интересах.<br />
            Мы — в ваших.
          </h2>

          <p style={{
            fontSize: 18, fontWeight: 400,
            lineHeight: '30.6px', color: D.body,
            margin: 0, maxWidth: 715,
          }}>
            Более 12 лет мы помогаем людям принимать правильные финансовые решения
          </p>
        </div>

        {/* Stats row */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          style={{ maxWidth: 1000, margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          {STATS.map((s) => (
            <motion.div
              key={s.value}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}
            >
              <span style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 56, fontWeight: 600,
                lineHeight: '36px', color: D.blue,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {s.value}
              </span>
              <span style={{
                fontSize: 14, fontWeight: 400,
                lineHeight: '20px', color: D.body,
                whiteSpace: 'pre-line',
              }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{
            textAlign: 'center',
            fontSize: 14, fontWeight: 600,
            lineHeight: '18.2px', color: D.muted,
            margin: 0,
          }}>
            Работаем со всеми ведущими банками Израиля
          </p>

          <motion.div
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-wrap lg:flex-nowrap gap-3 lg:gap-4"
          >
            {BANKS.map((bank) => (
              <motion.div
                key={bank.abbr}
                variants={fadeUp}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex-[1_1_calc(50%-6px)] lg:flex-1"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '0 16px 0 12px', height: 54,
                  borderRadius: 12,
                  border: `1px solid ${D.track}`,
                  background: 'transparent',
                }}
              >
                {/* Colored logo badge */}
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: bank.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>
                    {bank.abbr}
                  </span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: D.text, lineHeight: '18px' }}>
                  {bank.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
