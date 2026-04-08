import { useState } from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { D, pill } from '../tokens'

const cardVariants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 1,
    category: 'Новичкам',
    categoryBg: '#e8faf0',
    categoryColor: '#0a9e4c',
    title: 'Как работает ипотека в Израиле',
    description: 'Разбираемся в базовых понятиях: мадад, прайм, маслул. Что нужно знать перед первым визитом в банк.',
    readingTime: '5 мин',
  },
  {
    id: 2,
    category: 'Рефинансирование',
    categoryBg: '#fff4e5',
    categoryColor: '#c2610a',
    title: 'Когда выгодно рефинансировать ипотеку',
    description: 'Три сигнала, что текущие условия устарели, и как посчитать реальную экономию до обращения в банк.',
    readingTime: '7 мин',
  },
  {
    id: 3,
    category: 'Стратегия',
    categoryBg: '#f3eeff',
    categoryColor: '#6c3de8',
    title: 'Смешанная ипотека: плюсы и минусы',
    description: 'Фиксированная и плавающая ставка в одном портфеле — как найти баланс между риском и переплатой.',
    readingTime: '6 мин',
  },
  {
    id: 4,
    category: 'Риски',
    categoryBg: '#fff0f0',
    categoryColor: '#d0302a',
    title: 'Типичные ошибки при оформлении ипотеки',
    description: 'Разбираем 5 самых дорогих ошибок заёмщиков — от неправильного выбора трека до игнорирования страховки.',
    readingTime: '4 мин',
  },
]

// ─── Card ──────────────────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: typeof ARTICLES[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: D.white,
        borderRadius: 24,
        padding: '28px 28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.10)'
          : '0 2px 12px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        cursor: 'default',
      }}
    >
      {/* Category badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        background: article.categoryBg,
        borderRadius: 100,
        padding: '5px 14px',
        width: 'fit-content',
      }}>
        <span style={{
          fontSize: 12, fontWeight: 600,
          color: article.categoryColor,
          lineHeight: '18px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          {article.category}
        </span>
      </div>

      {/* Title + description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <span style={{
          fontFamily: 'Montserrat, system-ui, sans-serif',
          fontSize: 18, fontWeight: 700,
          color: D.text, lineHeight: '26px',
        }}>
          {article.title}
        </span>
        <span style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 14, fontWeight: 400,
          color: D.body, lineHeight: '22px',
        }}>
          {article.description}
        </span>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 12,
        borderTop: '1px solid #f1f5f9',
      }}>
        {/* Reading time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={14} color={D.muted} strokeWidth={1.75} />
          <span style={{
            fontSize: 13, fontWeight: 500,
            color: D.muted, lineHeight: '18px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            {article.readingTime}
          </span>
        </div>

        {/* Read link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            fontSize: 13, fontWeight: 600,
            color: D.blue, lineHeight: '18px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            Читать
          </span>
          <ArrowRight size={13} color={D.blue} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function KnowledgeBase() {
  return (
    <section style={{
      background: D.bg,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div className="px-4 md:px-[100px]" style={{ maxWidth: 1353, margin: '0 auto', paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={pill}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: D.blueDot, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: D.blue, lineHeight: '20px' }}>
                База знаний
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontWeight: 800, fontSize: 40,
              lineHeight: '50px', letterSpacing: '-1px',
              color: D.text, margin: 0,
            }}>
              Статьи об ипотеке в Израиле
            </h2>

            <p style={{
              fontSize: 18, fontWeight: 400,
              lineHeight: '30.6px', color: D.body, margin: 0,
            }}>
              Разбираем сложные темы простым языком — чтобы вы принимали решения осознанно
            </p>
          </div>

          {/* Grid */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {ARTICLES.map((article) => (
              <motion.div
                key={article.id}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
