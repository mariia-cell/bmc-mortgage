import { useState } from 'react'
import {
  Calculator, TrendingUp, Wallet, BarChart2, RefreshCw,
  ArrowRight, ChevronLeft, RotateCcw,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { D, pill } from '../tokens'

// ─── Menu items ───────────────────────────────────────────────────────────────
const MENU = [
  { id: 'monthly', title: 'Ежемесячный платёж',   desc: 'Быстрый расчёт по сумме, ставке и сроку',  Icon: Calculator },
  { id: 'max',     title: 'Максимальная сумма',    desc: 'По доходам и обязательствам',              Icon: TrendingUp },
  { id: 'budget',  title: 'Взнос и бюджет',        desc: 'Первоначальный взнос и бюджет покупки',    Icon: Wallet     },
  { id: 'compare', title: 'Сравнение сценариев',   desc: '2–3 варианта микса рядом',                 Icon: BarChart2  },
  { id: 'refi',    title: 'Рефинансирование',       desc: 'Стоит ли менять условия сейчас',           Icon: RefreshCw  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n))
}

function calcAnnuity(principal: number, annualRateTimes10: number, termYears: number) {
  const r = (annualRateTimes10 / 10) / 100 / 12
  const n = termYears * 12
  if (r === 0) return { monthly: principal / n, overpayment: 0 }
  const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  return { monthly, overpayment: monthly * n - principal }
}

function sliderPct(val: number, min: number, max: number) {
  return Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100))
}

// ─── SliderRow ────────────────────────────────────────────────────────────────
function SliderRow({
  label, displayValue, suffix, rawValue, pct,
  min, max, step, value, onSliderChange, onInputCommit,
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

  const inputSize = Math.max(editing ? draft.length : displayValue.replace(/\s/g, '').length, 2)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: D.body, lineHeight: '18px', letterSpacing: '0.01em' }}>
          {label}
        </span>
        <div style={{ background: D.resultBg, borderRadius: 10, padding: '5px 12px', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
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
              lineHeight: '22px', textAlign: 'right', padding: 0, minWidth: 0,
            }}
          />
          <span style={{ fontSize: 15, fontWeight: 600, color: D.body, lineHeight: '22px', flexShrink: 0 }}>
            {suffix}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
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

// ─── Shared sub-components ────────────────────────────────────────────────────
function CalcHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        background: D.blueBg, borderRadius: 16, padding: '6px 20px', width: 'fit-content',
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: D.blue, lineHeight: '16px' }}>{badge}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: D.text, lineHeight: '26px', letterSpacing: '-0.3px' }}>
          {title}
        </span>
        <span style={{ fontSize: 14, fontWeight: 400, color: D.muted, lineHeight: '20px' }}>
          {subtitle}
        </span>
      </div>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', borderRadius: 1 }} />
}

function Disclaimer() {
  return (
    <span style={{ fontSize: 12, fontWeight: 400, color: D.muted, lineHeight: '16px' }}>
      * Расчёты ориентировочные. За точным расчётом обратитесь к консультанту.
    </span>
  )
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ step, total = 3 }: { step: number; total?: number }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 100,
          background: i < step ? D.blue : '#e2e8f0',
          transition: 'background 0.3s ease',
        }} />
      ))}
    </div>
  )
}

// ─── CalcMonthly ──────────────────────────────────────────────────────────────
function CalcMonthly() {
  const [amount, setAmount] = useState(2_000_000)
  const [rate,   setRate]   = useState(45)   // ×10
  const [term,   setTerm]   = useState(25)

  const { monthly, overpayment } = calcAnnuity(amount, rate, term)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <CalcHeader
        badge="Ежемесячный платёж"
        title="Быстрый расчёт ипотечного платежа"
        subtitle="Укажите параметры — мгновенно узнайте размер платежа и общую переплату"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <div style={{ flex: 1 }}>
            <SliderRow
              label="Сумма кредита"
              displayValue={fmt(amount)} suffix="₪" rawValue={amount}
              pct={sliderPct(amount, 500_000, 5_000_000)}
              min={500_000} max={5_000_000} step={50_000} value={amount}
              onSliderChange={setAmount}
              onInputCommit={(n) => setAmount(Math.round(Math.min(5_000_000, Math.max(500_000, n))))}
            />
          </div>
          <div style={{ flex: 1 }}>
            <SliderRow
              label="Процентная ставка"
              displayValue={(rate / 10).toFixed(1)} suffix="%" rawValue={rate / 10}
              pct={sliderPct(rate, 10, 120)}
              min={10} max={120} step={1} value={rate}
              onSliderChange={setRate}
              onInputCommit={(n) => setRate(Math.round(Math.min(12, Math.max(1, n)) * 10))}
            />
          </div>
        </div>
        <SliderRow
          label="Срок"
          displayValue={String(term)} suffix="лет" rawValue={term}
          pct={sliderPct(term, 5, 30)}
          min={5} max={30} step={1} value={term}
          onSliderChange={setTerm}
          onInputCommit={(n) => setTerm(Math.round(Math.min(30, Math.max(5, n))))}
        />
      </div>

      <Divider />

      <div style={{ background: '#f2f5f8', borderRadius: 24, padding: '24px 28px' }}>
        <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: D.label, lineHeight: '16px', letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginBottom: 8 }}>
          Ежемесячный платёж
        </span>
        <span style={{ display: 'block', fontSize: 52, fontWeight: 700, color: D.text, lineHeight: '58px', fontVariantNumeric: 'tabular-nums', letterSpacing: '-1.5px', marginBottom: 4 }}>
          {fmt(monthly)} ₪
        </span>
        <span style={{ display: 'block', fontSize: 12, fontWeight: 500, color: D.muted, lineHeight: '18px' }}>
          Переплата: ~ {fmt(overpayment)} ₪
        </span>
      </div>

      <Disclaimer />
    </div>
  )
}

// ─── CalcMax — 3-step wizard ──────────────────────────────────────────────────
const DEAL_TYPES = ['Первая квартира', 'Улучшение', 'Инвестиция'] as const

const INIT_FORM = {
  income:         25_000,
  downpayment:   300_000,
  loans:               0,
  hasObligations: null as boolean | null,
  alimony:             0,
  leasing:             0,
  age:                33,
  dealType:  'Первая квартира',
}

function calcMaxBudget(f: typeof INIT_FORM) {
  const obligations = f.hasObligations ? f.alimony + f.leasing : 0
  const available   = Math.max(0, (f.income - f.loans - obligations) * 0.35)
  const termYears   = Math.max(5, Math.min(30, 75 - f.age))
  const r = 0.045 / 12
  const n = termYears * 12
  const maxLoan = available * (1 - Math.pow(1 + r, -n)) / r
  return {
    maxLoan:    Math.round(maxLoan),
    maxBudget:  Math.round(maxLoan + f.downpayment),
    termYears,
  }
}

function CalcMax() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INIT_FORM)

  const upd = (patch: Partial<typeof INIT_FORM>) => setForm(f => ({ ...f, ...patch }))
  const result = calcMaxBudget(form)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <CalcHeader
        badge="Максимальная сумма"
        title="Какую сумму одобрит банк?"
        subtitle="Рассчитаем ориентировочный максимум по доходам и обязательствам"
      />

      {step < 3 && <Stepper step={step} />}

      {/* ── Step 1: Financial base ── */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <SliderRow
            label="Ежемесячный доход (нетто)"
            displayValue={fmt(form.income)} suffix="₪" rawValue={form.income}
            pct={sliderPct(form.income, 5_000, 80_000)}
            min={5_000} max={80_000} step={500} value={form.income}
            onSliderChange={(v) => upd({ income: v })}
            onInputCommit={(n) => upd({ income: Math.min(80_000, Math.max(5_000, n)) })}
          />
          <SliderRow
            label="Первоначальный взнос"
            displayValue={fmt(form.downpayment)} suffix="₪" rawValue={form.downpayment}
            pct={sliderPct(form.downpayment, 100_000, 3_000_000)}
            min={100_000} max={3_000_000} step={50_000} value={form.downpayment}
            onSliderChange={(v) => upd({ downpayment: v })}
            onInputCommit={(n) => upd({ downpayment: Math.min(3_000_000, Math.max(100_000, n)) })}
          />
          <SliderRow
            label="Ежемесячные платежи по кредитам"
            displayValue={fmt(form.loans)} suffix="₪" rawValue={form.loans}
            pct={sliderPct(form.loans, 0, 15_000)}
            min={0} max={15_000} step={500} value={form.loans}
            onSliderChange={(v) => upd({ loans: v })}
            onInputCommit={(n) => upd({ loans: Math.min(15_000, Math.max(0, n)) })}
          />

          {/* Obligation cards */}
          <div>
            <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: D.body, marginBottom: 10, lineHeight: '18px' }}>
              Другие финансовые обязательства
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {([
                { val: false, label: 'Нет долгов',           sub: 'Без алиментов и лизинга' },
                { val: true,  label: 'Есть обязательства',   sub: 'Алименты, лизинг и др.'  },
              ] as const).map(({ val, label, sub }) => {
                const selected = form.hasObligations === val
                return (
                  <button
                    key={String(val)}
                    onClick={() => upd({ hasObligations: val })}
                    style={{
                      padding: '14px 16px', borderRadius: 16,
                      textAlign: 'left', cursor: 'pointer',
                      border: `2px solid ${selected ? D.blue : '#e2e8f0'}`,
                      background: selected ? D.blueBg : D.white,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: selected ? D.blue : D.text, marginBottom: 3, lineHeight: '18px' }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 400, color: D.muted, lineHeight: '16px' }}>
                      {sub}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={form.hasObligations === null}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 12, border: 'none',
              cursor: form.hasObligations === null ? 'not-allowed' : 'pointer',
              background: form.hasObligations === null ? '#e2e8f0' : D.blue,
              color: form.hasObligations === null ? D.muted : '#ffffff',
              fontSize: 14, fontWeight: 700, lineHeight: '20px',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            Дальше <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* ── Step 2: Details ── */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {form.hasObligations && (
            <>
              <SliderRow
                label="Алименты в месяц"
                displayValue={fmt(form.alimony)} suffix="₪" rawValue={form.alimony}
                pct={sliderPct(form.alimony, 0, 10_000)}
                min={0} max={10_000} step={200} value={form.alimony}
                onSliderChange={(v) => upd({ alimony: v })}
                onInputCommit={(n) => upd({ alimony: Math.min(10_000, Math.max(0, n)) })}
              />
              <SliderRow
                label="Лизинг / аренда авто"
                displayValue={fmt(form.leasing)} suffix="₪" rawValue={form.leasing}
                pct={sliderPct(form.leasing, 0, 5_000)}
                min={0} max={5_000} step={100} value={form.leasing}
                onSliderChange={(v) => upd({ leasing: v })}
                onInputCommit={(n) => upd({ leasing: Math.min(5_000, Math.max(0, n)) })}
              />
            </>
          )}

          <SliderRow
            label="Ваш возраст"
            displayValue={String(form.age)} suffix="лет" rawValue={form.age}
            pct={sliderPct(form.age, 20, 70)}
            min={20} max={70} step={1} value={form.age}
            onSliderChange={(v) => upd({ age: v })}
            onInputCommit={(n) => upd({ age: Math.min(70, Math.max(20, n)) })}
          />

          {/* Deal type chips */}
          <div>
            <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: D.body, marginBottom: 10, lineHeight: '18px' }}>
              Вид сделки
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {DEAL_TYPES.map((type) => {
                const selected = form.dealType === type
                return (
                  <button
                    key={type}
                    onClick={() => upd({ dealType: type })}
                    style={{
                      padding: '8px 18px', borderRadius: 20,
                      border: `1.5px solid ${selected ? D.blue : '#e2e8f0'}`,
                      background: selected ? D.blue : D.white,
                      color: selected ? '#ffffff' : D.body,
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setStep(1)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '13px 20px', borderRadius: 12, border: 'none',
                background: '#f1f5f9', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, color: D.body,
              }}
            >
              <ChevronLeft size={15} strokeWidth={2.5} /> Назад
            </button>
            <button
              onClick={() => setStep(3)}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12, border: 'none',
                background: D.blue, cursor: 'pointer',
                fontSize: 14, fontWeight: 700, color: '#ffffff', lineHeight: '20px',
              }}
            >
              Рассчитать <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Result ── */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#f2f5f8', borderRadius: 24, padding: '24px 28px' }}>
            <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: D.label, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
              Ориентировочный бюджет
            </span>
            <span style={{ display: 'block', fontSize: 44, fontWeight: 700, color: D.text, lineHeight: '52px', fontVariantNumeric: 'tabular-nums', letterSpacing: '-1.5px', marginBottom: 4 }}>
              ~ {fmt(result.maxBudget)} ₪
            </span>
            <span style={{ display: 'block', fontSize: 12, fontWeight: 500, color: D.muted }}>
              из которых ипотека: ~ {fmt(result.maxLoan)} ₪ · срок: {result.termYears} лет
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Доход',   val: fmt(form.income)      + ' ₪' },
              { label: 'Взнос',   val: fmt(form.downpayment) + ' ₪' },
            ].map(({ label, val }) => (
              <div key={label} style={{ background: D.white, border: '1px solid #e2e8f0', borderRadius: 16, padding: '16px 18px' }}>
                <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: D.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                  {label}
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: D.text }}>{val}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setStep(1); setForm(INIT_FORM) }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 24px', borderRadius: 12, border: 'none',
              background: '#f1f5f9', cursor: 'pointer',
              fontSize: 14, fontWeight: 600, color: D.body,
            }}
          >
            <RotateCcw size={14} strokeWidth={2.5} /> Пересчитать заново
          </button>

          <Disclaimer />
        </div>
      )}
    </div>
  )
}

// ─── CalcPlaceholder ──────────────────────────────────────────────────────────
const PLACEHOLDER_MAP = {
  budget:  { Icon: Wallet,    badge: 'Взнос и бюджет',       title: 'Первоначальный взнос и бюджет',    sub: 'Расчёт взноса и максимального бюджета покупки' },
  compare: { Icon: BarChart2, badge: 'Сравнение сценариев',  title: 'Сравнение ипотечных миксов',       sub: 'До 3 сценариев рядом — ставки, суммы, переплаты' },
  refi:    { Icon: RefreshCw, badge: 'Рефинансирование',     title: 'Выгодно ли рефинансировать?',      sub: 'Сравним текущие условия с рыночными предложениями' },
}

function CalcPlaceholder({ id }: { id: string }) {
  const m = PLACEHOLDER_MAP[id as keyof typeof PLACEHOLDER_MAP]
  if (!m) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <CalcHeader badge={m.badge} title={m.title} subtitle={m.sub} />
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 16, padding: '60px 32px',
        background: '#f8fafc', borderRadius: 24,
        border: '1.5px dashed #cbd5e1',
        minHeight: 260, textAlign: 'center',
      }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: D.blueBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <m.Icon size={22} color={D.blue} strokeWidth={1.75} />
        </div>
        <div>
          <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: D.text, marginBottom: 6, lineHeight: '22px' }}>
            Калькулятор в разработке
          </span>
          <span style={{ fontSize: 13, fontWeight: 400, color: D.muted, lineHeight: '20px', maxWidth: 280, display: 'block' }}>
            Будет готов в ближайшем обновлении. Обратитесь к консультанту — рассчитаем вручную.
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Calculators() {
  const [activeCalc, setActiveCalc] = useState('monthly')

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

        {/* Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={pill}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blue, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
              Инструменты
            </span>
          </div>
          <h2
            className="text-3xl md:text-[40px]"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif', fontWeight: 800, lineHeight: '1.25', letterSpacing: '-1px', color: D.text, margin: 0 }}
          >
            Наши калькуляторы ипотеки
          </h2>
          <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '30.6px', color: D.body, margin: 0 }}>
            Начните с расчёта — вы увидите реальные цифры до обращения в банк
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[393px_1fr] gap-4 lg:gap-6 items-start">

          {/* ── Left: menu ── */}
          <div>
            {/* Mobile pill-strip */}
            <div className="relative lg:hidden">
              <div
                className="tabs-scroll flex gap-1.5 w-full"
                style={{ background: D.white, borderRadius: 16, padding: 6, boxShadow: D.shadow, scrollbarWidth: 'none' as const }}
              >
                {MENU.map(({ id, title }) => {
                  const active = activeCalc === id
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveCalc(id)}
                      className="tab-btn flex-shrink-0 snap-start"
                      style={{
                        padding: '10px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                        fontSize: 13, fontWeight: 600, lineHeight: '18px',
                        background: active ? D.blue : 'transparent',
                        color: active ? '#ffffff' : D.body,
                        whiteSpace: 'nowrap', minHeight: 44,
                      }}
                    >
                      {title}
                    </button>
                  )
                })}
              </div>
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-10"
                style={{ background: 'linear-gradient(to right, transparent, #ffffff)', borderRadius: '0 16px 16px 0' }}
              />
            </div>

            {/* Desktop card list */}
            <div className="hidden lg:block" style={{ background: D.white, borderRadius: 30, boxShadow: D.shadow, padding: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU.map(({ id, title, desc, Icon }) => {
                  const active = activeCalc === id
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveCalc(id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '16px 18px', borderRadius: 22, width: '100%',
                        background: active ? D.white : 'transparent',
                        boxShadow: active ? D.shadow : 'none',
                        border: active ? '1px solid rgba(0,0,0,0.04)' : '1px solid transparent',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'background 0.15s ease, box-shadow 0.15s ease',
                      }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: active ? D.blueBg : '#f0f5f9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.15s ease',
                      }}>
                        <Icon size={17} color={active ? D.blue : D.body} strokeWidth={1.75} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: active ? D.blue : D.text, lineHeight: '18px', transition: 'color 0.15s ease' }}>
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
            </div>
          </div>

          {/* ── Right: calculator card ── */}
          <motion.div
            whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.10)', y: -2 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ background: D.white, borderRadius: 30, boxShadow: D.shadow, padding: '36px 36px 28px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCalc}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {activeCalc === 'monthly' && <CalcMonthly />}
                {activeCalc === 'max'     && <CalcMax />}
                {activeCalc === 'budget'  && <CalcPlaceholder id="budget" />}
                {activeCalc === 'compare' && <CalcPlaceholder id="compare" />}
                {activeCalc === 'refi'    && <CalcPlaceholder id="refi" />}
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
