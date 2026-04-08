import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import faqIllustration from '../assets/faq-illustration.svg'
import { D, pill } from '../tokens'

// ─── Support card ──────────────────────────────────────────────────────────────
function SupportCard() {
  return (
    <div style={{
      position: 'sticky', top: 32,
      background: '#ffffff',
      borderRadius: 24,
      boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
      padding: '40px',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <span style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 24, fontWeight: 700,
        color: '#0f172a', lineHeight: '32px',
      }}>
        Не нашли ответ<br />на свой вопрос?
      </span>
      <span style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 14, fontWeight: 400,
        color: '#64748b', lineHeight: '22px',
      }}>
        Напишите нам — ответим в течение часа в рабочее время
      </span>
      <button
        type="button"
        style={{
          display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center',
          background: D.blue,
          borderRadius: 12, padding: '14px 28px',
          border: 'none', cursor: 'pointer',
          width: '100%',
          marginTop: 8,
          transition: 'filter 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
      >
        <span style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 15, fontWeight: 700,
          color: '#ffffff', lineHeight: '22px',
        }}>
          Задать вопрос
        </span>
      </button>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    id: 1,
    question: 'Сколько стоят ваши услуги?',
    answer:
      'Первичная консультация и анализ вашей ситуации — бесплатно. Вознаграждение за сопровождение фиксируется заранее и прозрачно прописывается в договоре. Оно не зависит от того, в каком банке вы оформите ипотеку — мы работаем в ваших интересах, а не в интересах банка.',
  },
  {
    id: 2,
    question: 'Нужен ли мне ипотечный советник? Я могу обратиться в банк напрямую.',
    answer:
      'Можете — но банк предложит только свои продукты и не будет торговаться сам с собой. Советник сравнивает офферы нескольких банков, структурирует портфель под ваши цели и ведёт переговоры о ставке. По нашей статистике, клиенты с советником экономят в среднем от 80 000 до 200 000 шекелей за срок кредита.',
  },
  {
    id: 3,
    question: 'Сколько банков вы охватываете?',
    answer:
      'Мы работаем со всеми ведущими банками Израиля: Leumi, Hapoalim, Mizrahi-Tefahot, Discount, First International и рядом специализированных ипотечных учреждений. Это позволяет получить реальную конкуренцию между банками и выбрать лучший оффер.',
  },
  {
    id: 4,
    question: 'Можно ли рефинансировать существующую ипотеку?',
    answer:
      'Да, и это одно из наших ключевых направлений. Мы проводим аудит текущего портфеля, рассчитываем точку безубыточности с учётом штрафов за досрочное погашение и находим момент, когда рефинансирование принесёт реальную экономию. Многие клиенты экономят от 500 до 1200 шекелей в месяц.',
  },
  {
    id: 5,
    question: 'Работаете ли вы с новыми репатриантами?',
    answer:
      'Да, и это отдельная специализация. У новых репатриантов есть особые льготы по ипотеке, но банки не всегда о них информируют. Мы знаем все программы для новых репатриантов, помогаем с документами и сопровождаем процесс с учётом языкового барьера.',
  },
  {
    id: 6,
    question: 'Сколько времени занимает весь процесс?',
    answer:
      'С нашей поддержкой — от 2 до 4 недель: анализ ситуации, подбор банков, предварительное одобрение и финальное подписание. Самостоятельно тот же путь обычно занимает 6–10 недель из-за очередей и отсутствия переговорных рычагов.',
  },
  {
    id: 7,
    question: 'Что такое «ипотечный маршрут» (מסלול)?',
    answer:
      'Маслул — это трек внутри ипотечного портфеля с определёнными параметрами: ставкой, привязкой к индексу и сроком фиксации. Израильская ипотека почти всегда состоит из нескольких маслулим. Правильное распределение между ними определяет и размер платежа, и суммарную переплату за весь срок.',
  },
  {
    id: 8,
    question: 'Можно ли получить консультацию дистанционно?',
    answer:
      'Да, мы работаем полностью онлайн. Консультация проходит в Zoom или по телефону, документы передаются через защищённые каналы. Клиенты из любой точки мира — включая тех, кто ещё только планирует алию — могут получить полное сопровождение.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ background: '#f9fcff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="px-4 md:px-[100px]" style={{ maxWidth: 1353, margin: '0 auto', paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={pill}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blueDot, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
                FAQ
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: 800, fontSize: 40,
              lineHeight: '50px', letterSpacing: '-1px',
              color: D.text, margin: 0,
            }}>
              Часто задаваемые вопросы
            </h2>
            <p style={{
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: 600, fontSize: 16,
              lineHeight: '27.2px', color: 'rgba(15,23,42,0.55)', margin: 0,
            }}>
              Отвечаем на ключевые вопросы об ипотеке в Израиле.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">

            {/* Left: accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQS.map((faq) => {
                const isOpen = open === faq.id
                return (
                  <div
                    key={faq.id}
                    className="faq-item"
                    style={{
                      background: D.white,
                      borderRadius: 14,
                      boxShadow: isOpen
                        ? '0 6px 24px rgba(0,0,0,0.08)'
                        : '0 2px 12px rgba(0,0,0,0.05)',
                      transition: 'box-shadow 0.25s ease',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : faq.id)}
                      style={{
                        width: '100%', display: 'flex',
                        alignItems: 'center', justifyContent: 'space-between',
                        gap: 16, padding: '24px',
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', textAlign: 'left',
                        minHeight: 71,
                      }}
                    >
                      <span style={{
                        fontFamily: 'Montserrat, system-ui, sans-serif',
                        fontSize: 15, fontWeight: 700,
                        color: D.text, lineHeight: '21px',
                      }}>
                        {faq.question}
                      </span>
                      <div style={{
                        width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                        background: isOpen ? D.blueBg : '#f1f5f9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s ease',
                      }}>
                        <ChevronDown
                          size={15}
                          color={isOpen ? D.blue : D.body}
                          strokeWidth={2.5}
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.25s ease',
                          }}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.2 },
                          }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{
                            fontSize: 14, fontWeight: 400,
                            color: D.body, lineHeight: '24px',
                            margin: 0, padding: '0 24px 22px',
                            fontFamily: 'Inter, system-ui, sans-serif',
                          }}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Right: support card */}
            <SupportCard />

          </div>

        </div>
      </div>
    </section>
  )
}
