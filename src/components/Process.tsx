import processIllustration from '../assets/process-illustration.svg'
import { motion } from 'framer-motion'
import { D, pill } from '../tokens'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    title: 'Анализ ситуации и бюджета',
    desc: 'Изучаем ваши доходы, статус и финансовые цели для расчёта.',
  },
  {
    num: '02',
    title: 'Подбор вариантов ипотеки',
    desc: 'Формируем оптимальную структуру ипотечного портфеля.',
  },
  {
    num: '03',
    title: 'Сравнение предложений банков',
    desc: 'Получаем и сравниваем офферы от нескольких банков.',
  },
  {
    num: '04',
    title: 'Сопровождение до подписания',
    desc: 'Ведём процесс до финального подписания договора.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Process() {
  return (
    <section style={{
      background: '#f9fcff',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div className="px-4 md:px-[100px]" style={{ maxWidth: 1353, margin: '0 auto', paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>

          {/* ── Heading — centered ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 14,
            alignItems: 'center', textAlign: 'center',
          }}>
            <div style={pill}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blueDot, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
                Процесс
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: 800, fontSize: 40,
              lineHeight: '50px', letterSpacing: '-1px',
              color: D.text, margin: 0,
            }}>
              4 шага к вашей ипотеке
            </h2>

            <p style={{
              fontSize: 18, fontWeight: 400,
              lineHeight: '30.6px', color: D.body,
              margin: 0,
            }}>
              Прозрачный процесс без скрытых условий и лишних визитов в банк
            </p>
          </div>

          {/* ── Content grid: steps (5) + illustration (7) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-center">

            {/* Left: steps list */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="gap-5 md:gap-6"
                  style={{
                    display: 'flex', flexDirection: 'row',
                    paddingBottom: i < STEPS.length - 1 ? 40 : 0,
                    position: 'relative',
                  }}
                >
                  {/* Number badge + connector line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div
                      className="w-11 h-11 md:w-14 md:h-14"
                      style={{
                        borderRadius: 16, flexShrink: 0,
                        background: D.blueBg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <span style={{
                        fontSize: 18, fontWeight: 600, color: D.blue, lineHeight: '1',
                      }}>
                        {step.num}
                      </span>
                    </div>
                    {/* Vertical connector — only between steps */}
                    {i < STEPS.length - 1 && (
                      <div style={{
                        width: 1, flex: 1, marginTop: 8,
                        background: 'linear-gradient(to bottom, rgba(0,101,244,0.2), rgba(0,101,244,0.04))',
                      }} />
                    )}
                  </div>

                  {/* Title + description */}
                  <div className="pt-2 md:pt-[14px]" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      className="text-base md:text-xl"
                      style={{
                        fontWeight: 700,
                        color: D.text, lineHeight: '28px',
                        marginBottom: 6,
                      }}
                    >
                      {step.title}
                    </span>
                    <span style={{
                      fontSize: 16, fontWeight: 400,
                      color: D.body, lineHeight: '24px',
                    }}>
                      {step.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: illustration — desktop only */}
            <div className="hidden lg:flex justify-end items-center">
              <img
                src={processIllustration}
                alt="Процесс получения ипотеки"
                style={{
                  width: '100%',
                  maxWidth: 700,
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
