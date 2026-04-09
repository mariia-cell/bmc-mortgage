import { ArrowRight } from 'lucide-react'
import bannerIllustration from '../assets/banner-illustration.svg'
import { D } from '../tokens'

interface Props {
  onOpenForm?: () => void
}

export default function PreFooterBanner({ onOpenForm }: Props) {
  return (
    <section
      className="px-4 md:px-[100px]"
      style={{
        background: D.bg,
        fontFamily: 'Inter, system-ui, sans-serif',
        paddingTop: 60, paddingBottom: 60,
      }}
    >
      <div style={{ maxWidth: 1353, margin: '0 auto' }}>

        {/* Blue card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end" style={{
          background: D.blue,
          borderRadius: 40,
          overflow: 'hidden',
          minHeight: 346,
          position: 'relative',
        }}>

          {/* Left: text + button */}
          <div className="p-6 md:p-[52px] md:pl-[64px]" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            alignSelf: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2
                className="text-3xl md:text-[40px]"
                style={{
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                  fontWeight: 800,
                  lineHeight: '1.25', letterSpacing: '-1px',
                  color: '#ffffff', margin: 0,
                }}
              >
                Ваша ипотека — это стратегия,<br />не цифры
              </h2>
              <p style={{
                fontSize: 16, fontWeight: 400,
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '26px', margin: 0,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>
                Разберём ваш кейс за 15 минут и найдём способ сэкономить на процентах банка.
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={onOpenForm}
              className="prefooter-btn w-full lg:w-auto"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: '#ffffff',
                borderRadius: 12,
                padding: '14px 28px',
                border: 'none', cursor: 'pointer',
                minHeight: 48,
              }}
            >
              <span style={{
                fontSize: 15, fontWeight: 700,
                color: D.blue,
                lineHeight: '22px',
                fontFamily: 'Inter, system-ui, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                Получить консультацию бесплатно
              </span>
              <ArrowRight size={16} color={D.blue} strokeWidth={2.5} />
            </button>
          </div>

          {/* Right: illustration — desktop only */}
          <div className="hidden lg:block" style={{ alignSelf: 'flex-end', flexShrink: 0, lineHeight: 0 }}>
            <img
              src={bannerIllustration}
              alt=""
              aria-hidden="true"
              style={{
                width: 720,
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
