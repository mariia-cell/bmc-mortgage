import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Phone, MessageCircle, Mail, Clock, ArrowRight } from 'lucide-react'
import { D } from '../tokens'

// ─── Contact items data ───────────────────────────────────────────────────────
const CONTACTS = [
  {
    id: 'phone',
    label: 'Телефон',
    value: '+972 52 000 0000',
    Icon: Phone,
    iconBg: '#edf3ff',
    iconColor: D.blue,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'info@bmcgroup.co.il',
    Icon: Mail,
    iconBg: '#edf3ff',
    iconColor: D.blue,
  },
  {
    id: 'hours',
    label: 'Режим работы',
    value: 'Пн–Пт: 9:00–18:00, Вс: 10:00–15:00',
    Icon: Clock,
    iconBg: '#edf3ff',
    iconColor: D.blue,
  },
]

// ─── Input field ──────────────────────────────────────────────────────────────
function Field({
  label, id, placeholder,
  value, onChange,
  textarea = false,
  focused, onFocus, onBlur,
}: {
  label: string; id: string; placeholder: string
  value: string; onChange: (v: string) => void
  textarea?: boolean
  focused: boolean; onFocus: () => void; onBlur: () => void
}) {
  const inputStyle: CSSProperties = {
    width: '100%', background: D.white, borderRadius: 10,
    padding: '13px 16px',
    border: `1.5px solid ${focused ? D.blue : '#e2e8f0'}`,
    outline: 'none',
    fontSize: 15, fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 400, color: D.text, lineHeight: '19.2px',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
    resize: 'none' as const,
    ...(textarea ? { height: 133 } : {}),
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{
        fontSize: 13, fontWeight: 700, color: D.text,
        lineHeight: '19.5px', fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id} placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus} onBlur={onBlur}
          style={inputStyle}
        />
      ) : (
        <input
          type="text" id={id} placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus} onBlur={onBlur}
          style={inputStyle}
        />
      )}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [focused, setFocused]   = useState<string | null>(null)

  const set = (key: keyof typeof formData) => (v: string) =>
    setFormData((prev) => ({ ...prev, [key]: v }))

  return (
    <section style={{
      background: '#f9fcff',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div className="px-4 md:px-[100px]" style={{ maxWidth: 1353, margin: '0 auto', paddingTop: 60, paddingBottom: 60 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">

          {/* ── Left: form ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Heading */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Activity badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: D.blueBg, borderRadius: 100,
                padding: '7px 24px', width: 'fit-content',
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
                  17 заявок за последние 24 часа
                </span>
              </div>

              <h2 style={{
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontWeight: 800, fontSize: 40,
                lineHeight: '50px', letterSpacing: '-1px',
                color: D.text, margin: 0,
              }}>
                Получите бесплатный анализ вашей ипотеки
              </h2>

              <p style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 400, fontSize: 16,
                lineHeight: '27.2px', color: D.body,
                margin: 0,
              }}>
                Оставьте заявку — мы рассчитаем оптимальный маршрут и покажем, сколько вы можете сэкономить
              </p>
            </div>

            {/* Form fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field
                label="Ваше имя *" id="name"
                placeholder="Александр Иванов"
                value={formData.name} onChange={set('name')}
                focused={focused === 'name'}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
              <Field
                label="Телефон (WhatsApp) *" id="phone"
                placeholder="+972 50 000-0000"
                value={formData.phone} onChange={set('phone')}
                focused={focused === 'phone'}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
              />
              <Field
                label="Расскажите о вашей ситуации (необязательно)" id="message"
                placeholder={"Например: Хочу купить квартиру в Тель-Авиве,\nесть первоначальный взнос 25%..."}
                value={formData.message} onChange={set('message')}
                textarea
                focused={focused === 'message'}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                type="button"
                className="btn-primary"
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: D.blue, borderRadius: 12,
                  padding: '14px 28px',
                  border: 'none', cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: D.white, lineHeight: '22px' }}>
                  Получить консультацию бесплатно
                </span>
                <ArrowRight size={16} color={D.white} strokeWidth={2.5} />
              </button>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', lineHeight: '16px', textAlign: 'center' }}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </span>
            </div>
          </div>

          {/* ── Right: contacts + CTA card ── */}
          <div className="pt-0 lg:pt-[250px]" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            <span style={{ fontSize: 20, fontWeight: 700, color: D.text, lineHeight: '28px' }}>
              Или свяжитесь напрямую
            </span>

            {/* Contact list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CONTACTS.map(({ id, label, value, Icon, iconBg, iconColor }) => (
                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Icon badge */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                    background: iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} color={iconColor} strokeWidth={1.75} />
                  </div>
                  {/* Label + value */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: 13, fontWeight: 500,
                      color: '#8a99ad', lineHeight: '18px',
                    }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 20, fontWeight: 700, color: D.text, lineHeight: '28px' }}>
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dark CTA card — vertical on mobile, horizontal on desktop */}
            <div
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6"
              style={{ background: '#00254b', borderRadius: 16, padding: '24px 28px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: D.white, lineHeight: '22px' }}>
                  Нужна консультация<br />прямо сейчас?
                </span>
                <span style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 14, fontWeight: 400,
                  color: 'rgba(255,255,255,0.6)', lineHeight: '19px',
                }}>
                  Бесплатный анализ за 24 часа
                </span>
              </div>

              {/* WhatsApp button — full width on mobile */}
              <button
                type="button"
                className="w-full md:w-auto flex items-center justify-center gap-2 flex-shrink-0"
                style={{
                  background: '#deffe8', borderRadius: 10,
                  padding: '12px 20px',
                  border: 'none', cursor: 'pointer',
                  transition: 'filter 0.15s ease',
                  minHeight: 48,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.95)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                <MessageCircle size={16} color={D.green} strokeWidth={2} />
                <span style={{ fontSize: 14, fontWeight: 700, color: D.green, lineHeight: '21px' }}>
                  Написать в WhatsApp
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
