import { useState } from 'react'
import { Calculator, TrendingUp, Wallet, BarChart2, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { D, pill } from '../tokens'

// ─── Menu items ───────────────────────────────────────────────────────────────
const MENU = [
  { id: 'monthly', title: 'Ежемесячный платёж',   desc: 'Быстрый расчёт по сумме, ставке и сроку',    Icon: Calculator },
  { id: 'max',     title: 'Максимальная сумма',    desc: 'По доходам и обязательствам',                Icon: TrendingUp },
  { id: 'budget',  title: 'Взнос и бюджет',        desc: 'Первоначальный взнос и бюджет покупки',      Icon: Wallet     },
  { id: 'compare', title: 'Сравнение сценариев',   desc: '2–3 варианта микса рядом',                   Icon: BarChart2  },
  { id: 'refi',    title: 'Рефинансирование',       desc: 'Стоит ли менять условия сейчас',             Icon: RefreshCw  },
]

function fmt(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n))
}

function calcAnnuity(principal: number, annualRateTimes10: number, termYears: number) {
  const r = (annualRateTimes10 / 10) / 100 / 12  // monthly rate
  const n = termYears * 12                         // total months
  if (r === 0) return { monthly: principal / n, overpayment: 0 }
  const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const overpayment = monthly * n - principal
  return { monthly, overpayment }
}

// ─── Slider row with editable badge ──────────────────────────────────────────
function SliderRow({
  label,
  displayValue,    // formatted string shown when not editing (e.g. "2 000 000")
  suffix,          // symbol rendered outside the <input> (₪, %, лет)
  rawValue,        // natural number to pre-fill the input on focus (e.g. 4.5 for rate)
  pct,
  min, max, step, value,
  onSliderChange,
  onInputCommit,   // called with the parsed natural value on blur / Enter
}: {
  label: string
  displayValue: string
  suffix: string
  rawValue: number
  pct: number
  min: number; max: number; step: number; value: number
  onSliderChange: (v: number) => void
  onInputCommit: (natural: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft,   setDraft]   = useState('')

  const commit = () => {
    const n = parseFloat(draft.replace(/\s/g, '').replace(',', '.'))
    if (!isNaN(n) && n > 0) onInputCommit(n)
    setEditing(false)
  }

  // Width in chars: when editing use draft length, otherwise stripped display value
  const inputSize = Math.max(
    editing ? draft.length : displayValue.replace(/\s/g, '').length,
    2
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* Label + editable badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: D.body, lineHeight: '18px', letterSpacing: '0.01em' }}>
          {label}
        </span>

        <div style={{
          background: D.resultBg, borderRadius: 10, padding: '5px 12px',
          display: 'inline-flex', alignItems: 'center', gap: 3,
        }}>
          <input
            type="text"
            size={inputSize}
            value={editing ? draft : displayValue}
            onFocus={() => { setDraft(String(rawValue)); setEditing(true) }}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              fontSize: 16, fontWeight: 700, color: D.text,
              fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.4px',
              lineHeight: '22px', textAlign: 'right', padding: 0,
              minWidth: 0,
            }}
          />
          <span style={{ fontSize: 15, fontWeight: 600, color: D.body, lineHeight: '22px', flexShrink: 0 }}>
            {suffix}
          </span>
        </div>
      </div>

      {/* Range track */}
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onSliderChange(Number(e.target.value))}
        style={{
          width: '100%', height: 4, borderRadius: 100,
          background: `linear-gradient(to right, ${D.blue} ${pct}%, ${D.track} ${pct}%)`,
          appearance: 'none', WebkitAppearance: 'none',
          outline: 'none', cursor: 'pointer', display: 'block',
        }}
      />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Calculators() {
  const [activeCalc, setActiveCalc] = useState('monthly')
  const [amount, setAmount] = useState(2_000_000)
  const [rate,   setRate]   = useState(45)   // ×10 → 45 = 4.5%
  const [term,   setTerm]   = useState(25)

  const pctAmount = ((amount - 500_000) / (5_000_000 - 500_000)) * 100
  const pctRate   = ((rate   - 10)      / (120 - 10))             * 100
  const pctTerm   = ((term   - 5)       / (30  - 5))              * 100

  const { monthly, overpayment } = calcAnnuity(amount, rate, term)

  const activeMenu = MENU.find((m) => m.id === activeCalc)!

  return (
    <section
      className="px-4 md:px-[100px]"
      style={{
        maxWidth: 1353, margin: '0 auto',
        paddingTop: 60, paddingBottom: 60,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Approach heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={pill}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blue, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
              Инструменты
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
            Наши калькуляторы ипотеки
          </h2>

          <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '30.6px', color: D.body, margin: 0 }}>
            Начните с расчёта — вы увидите реальные цифры до обращения в банк
          </p>
        </div>

        {/* Grid: left menu (393px) + right calc (1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[393px_1fr] gap-4 lg:gap-6 items-start">

          {/* ── Left: menu panel ── */}
          <div style={{ background: D.white, borderRadius: 30, boxShadow: D.shadow, padding: 8, position: 'relative' }}>
            <div
              className="tabs-scroll flex flex-row lg:flex-col gap-3 lg:gap-1 pb-3 lg:pb-0"
              style={{ scrollbarWidth: 'none' as const }}
            >
              {MENU.map(({ id, title, desc, Icon }) => {
                const active = activeCalc === id
                return (
                  <button
                    key={id}
                    onClick={() => setActiveCalc(id)}
                    className="flex-shrink-0 w-[78vw] sm:w-[300px] lg:w-full snap-start"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 14px',
                      borderRadius: 22,
                      background: active ? D.white : 'transparent',
                      boxShadow: active ? D.shadow : 'none',
                      border: active ? '1px solid rgba(0,0,0,0.04)' : '1px solid transparent',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    {/* Icon badge */}
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: active ? D.blueBg : '#f0f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.15s ease',
                    }}>
                      <Icon size={17} color={active ? D.blue : D.body} strokeWidth={1.75} />
                    </div>

                    {/* Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <span style={{
                        fontSize: 14, fontWeight: 700,
                        color: active ? D.blue : D.text,
                        lineHeight: '18px',
                        transition: 'color 0.15s ease',
                      }}>
                        {title}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: D.muted, lineHeight: '16px' }}>
                        {desc}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
            {/* Right fade mask — mobile only */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 lg:hidden"
              style={{ background: 'linear-gradient(to right, transparent, #ffffff)', borderRadius: '0 30px 30px 0' }}
            />
          </div>

          {/* ── Right: calculator card ── */}
          <motion.div
            whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.10)', y: -2 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              background: D.white, borderRadius: 30, boxShadow: D.shadow,
              padding: '36px 36px 28px',
              display: 'flex', flexDirection: 'column', gap: 28,
            }}
          >

            {/* Badge + title + desc */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: D.blueBg, borderRadius: 16,
                padding: '6px 20px', width: 'fit-content',
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: D.blue, lineHeight: '16px' }}>
                  {activeMenu.title}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{
                  fontSize: 20, fontWeight: 700, color: D.text,
                  lineHeight: '26px', letterSpacing: '-0.3px',
                }}>
                  Быстрый расчёт ипотечного платежа
                </span>
                <span style={{ fontSize: 14, fontWeight: 400, color: D.muted, lineHeight: '20px' }}>
                  Укажите параметры — мгновенно узнайте размер ежемесячного платежа и общую переплату
                </span>
              </div>
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

              {/* Row: сумма + ставка */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div style={{ flex: 1 }}>
                  <SliderRow
                    label="Сумма кредита"
                    displayValue={fmt(amount)}
                    suffix="₪"
                    rawValue={amount}
                    pct={pctAmount}
                    min={500_000} max={5_000_000} step={50_000}
                    value={amount}
                    onSliderChange={setAmount}
                    onInputCommit={(n) => setAmount(Math.round(Math.min(5_000_000, Math.max(500_000, n))))}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <SliderRow
                    label="Процентная ставка"
                    displayValue={(rate / 10).toFixed(1)}
                    suffix="%"
                    rawValue={rate / 10}
                    pct={pctRate}
                    min={10} max={120} step={1}
                    value={rate}
                    onSliderChange={setRate}
                    onInputCommit={(n) => setRate(Math.round(Math.min(12, Math.max(1, n)) * 10))}
                  />
                </div>
              </div>

              {/* Full-width: срок */}
              <SliderRow
                label="Срок"
                displayValue={String(term)}
                suffix="лет"
                rawValue={term}
                pct={pctTerm}
                min={5} max={30} step={1}
                value={term}
                onSliderChange={setTerm}
                onInputCommit={(n) => setTerm(Math.round(Math.min(30, Math.max(5, n))))}
              />
            </div>

            {/* Separator */}
            <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', borderRadius: 1 }} />

            {/* Result block */}
            <div style={{ background: '#f2f5f8', borderRadius: 24, padding: '24px 28px' }}>
              {/* Label */}
              <span style={{
                display: 'block',
                fontSize: 12, fontWeight: 600, color: D.label,
                lineHeight: '16px', letterSpacing: '0.02em', textTransform: 'uppercase',
                whiteSpace: 'nowrap', marginBottom: 8,
              }}>
                Ежемесячный платёж
              </span>
              {/* Amount */}
              <span style={{
                display: 'block',
                fontSize: 52, fontWeight: 700, color: D.text,
                lineHeight: '58px', fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-1.5px', marginBottom: 4,
              }}>
                {fmt(monthly)} ₪
              </span>
              {/* Overpayment — below amount */}
              <span style={{
                display: 'block',
                fontSize: 12, fontWeight: 500, color: D.muted, lineHeight: '18px',
              }}>
                Переплата: ~ {fmt(overpayment)} ₪
              </span>
            </div>

            {/* Disclaimer */}
            <span style={{ fontSize: 12, fontWeight: 400, color: D.muted, lineHeight: '16px' }}>
              * Расчёты ориентировочные. За точным расчётом обратитесь к консультанту.
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
