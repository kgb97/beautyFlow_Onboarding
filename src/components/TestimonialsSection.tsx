import { useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { TestimonialsService, type PublicTestimonialDto } from '../services/testimonialsService';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<PublicTestimonialDto[]>([]);

  useEffect(() => {
    TestimonialsService.getTestimonials().then(setTestimonials).catch(() => {});
  }, []);

  // Nunca mostramos testimonios inventados: si todavía no hay ninguno aprobado, la
  // sección simplemente no se renderiza.
  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials section">
      <div className="container">
        <ScrollReveal animation="slide-up">
          <div className="section-header text-center">
            <h2>Lo que dicen los salones que ya usan iziSalon</h2>
          </div>
        </ScrollReveal>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} animation="slide-up" delay={i + 1}>
              <div className="glass-panel testimonial-card">
                <Quote size={28} className="testimonial-quote-icon" />
                <div className="testimonial-stars">
                  {Array.from({ length: 5 }).map((_, n) => (
                    <Star key={n} size={14} fill={n < t.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="testimonial-content">"{t.content}"</p>
                <div className="testimonial-author">
                  <strong>{t.authorName}</strong>
                  <span>{t.authorRole}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
