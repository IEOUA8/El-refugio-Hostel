import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Users, Mail, Phone, MessageSquare, Baby, MessageCircle, Home,
  ShieldCheck, Clock, Moon, Loader2, ArrowRight, ArrowLeft, Minus, Plus, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/customSupabaseClient';

const Reservation = ({ cabinName = 'General' }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    comments: ''
  });

  const today = new Date().toISOString().split('T')[0];

  const nights = (() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const diff = (new Date(formData.checkOut) - new Date(formData.checkIn)) / 86400000;
    return diff > 0 ? Math.round(diff) : 0;
  })();

  const steps = [
    { label: t('reservation.stepStay'), icon: Calendar },
    { label: t('reservation.stepGuest'), icon: Users },
    { label: t('reservation.stepConfirm'), icon: Check },
  ];

  // Validación por paso para habilitar "Siguiente"
  const stepValid = [
    nights > 0,
    formData.name.trim() && /\S+@\S+\.\S+/.test(formData.email) && formData.phone.trim(),
    true,
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        // 1. Guardar en Base de Datos (Para registro interno)
        const { error: dbError } = await supabase
            .from('reservations')
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    check_in: formData.checkIn,
                    check_out: formData.checkOut,
                    adults: parseInt(formData.adults),
                    children: parseInt(formData.children),
                    comments: formData.comments,
                    cabin: cabinName
                }
            ]);

        if (dbError) {
            console.error('Error guardando reserva en DB:', dbError);
            // No detenemos el flujo si falla la DB, priorizamos WhatsApp
        }

        // 2. Construir mensaje de WhatsApp
        const message = `Hola, quiero realizar una reserva en *El Refugio*:

🏠 *Alojamiento:* ${cabinName}
👤 *Nombre:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Teléfono:* ${formData.phone}
📅 *Entrada:* ${formData.checkIn}
📅 *Salida:* ${formData.checkOut}
👥 *Adultos:* ${formData.adults}
👶 *Niños:* ${formData.children}
📝 *Comentarios:* ${formData.comments || 'Ninguno'}

Quedo atento a la confirmación y detalles de pago.`;

        // 3. Crear URL de WhatsApp
        // Número destino: +57 318 947 5883
        const whatsappUrl = `https://wa.me/573189475883?text=${encodeURIComponent(message)}`;

        toast({
          title: "Abriendo WhatsApp...",
          description: "Por favor envía el mensaje para completar tu solicitud.",
          duration: 3000,
        });

        // 4. Abrir WhatsApp en nueva pestaña
        window.open(whatsappUrl, '_blank');

        // Limpiar formulario
        setFormData({
            name: '',
            email: '',
            phone: '',
            checkIn: '',
            checkOut: '',
            adults: '2',
            children: '0',
            comments: ''
        });
        setStep(0);

    } catch (err) {
        console.error('Error inesperado:', err);
        toast({
          title: "Error",
          description: "Hubo un problema al procesar la solicitud.",
          variant: "destructive"
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeCount = (field, delta, min, max) => {
    setFormData(prev => {
      const next = Math.min(max, Math.max(min, parseInt(prev[field]) + delta));
      return { ...prev, [field]: String(next) };
    });
  };

  const goNext = () => {
    if (step < steps.length - 1 && stepValid[step]) {
      setDirection(1);
      setStep(step + 1);
    }
  };
  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#c0e69b] focus:ring-1 focus:ring-[#c0e69b]/40 transition-colors';
  const labelClass = 'text-sm text-gray-300 flex items-center';

  const stepVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  const Stepper = ({ field, min, max, icon: Icon, label }) => (
    <div className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
      <span className="flex items-center gap-2 text-gray-200">
        <Icon size={18} className="text-[#c0e69b]" /> {label}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => changeCount(field, -1, min, max)}
          disabled={parseInt(formData[field]) <= min}
          aria-label={`Menos ${label}`}
          className="focus-ring w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center text-lg text-white tabular-nums">{formData[field]}</span>
        <button
          type="button"
          onClick={() => changeCount(field, 1, min, max)}
          disabled={parseInt(formData[field]) >= max}
          aria-label={`Más ${label}`}
          className="focus-ring w-9 h-9 rounded-full bg-[#307458]/40 border border-[#307458]/50 flex items-center justify-center text-white hover:bg-[#307458]/60 active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <section id="reservar" ref={ref} className="py-20 px-4 relative overflow-hidden bg-[#858E78]/10">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          className="w-full h-full object-cover dark-filter"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable={false}
          src="https://images.unsplash.com/photo-1568821353308-1d1f2a679666?w=1200&q=55&auto=format" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-white font-semibold">
            {t('reservation.title')}
          </h2>
          <div className="w-24 h-1 bg-[#307458] mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            {t('reservation.subtitle')}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-dark rounded-3xl p-6 md:p-8"
        >
          {/* Cabecera: qué se reserva + noches */}
          <div className="flex items-center justify-between gap-3 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#307458]/25 border border-[#307458]/40 flex items-center justify-center flex-shrink-0">
                <Home size={20} className="text-[#c0e69b]" />
              </span>
              <div>
                <p className="text-xs text-gray-400 font-light">{t('reservation.reservingFor')}</p>
                <p className="text-white font-semibold leading-tight">{cabinName}</p>
              </div>
            </div>
            {nights > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-[#c0e69b] whitespace-nowrap">
                <Moon size={14} />
                {nights} {nights === 1 ? t('reservation.nights') : t('reservation.nightsPlural')}
              </span>
            )}
          </div>

          {/* Indicador de pasos */}
          <div className="flex items-center justify-between gap-2 py-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const done = i < step;
              const active = i === step;
              return (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2 min-w-0">
                    <motion.span
                      animate={{
                        backgroundColor: active || done ? 'rgba(48,116,88,0.55)' : 'rgba(255,255,255,0.05)',
                        borderColor: active ? '#c0e69b' : done ? 'rgba(48,116,88,0.6)' : 'rgba(255,255,255,0.1)',
                        scale: active ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0"
                    >
                      {done ? <Check size={16} className="text-[#c0e69b]" /> : <Icon size={16} className={active ? 'text-[#c0e69b]' : 'text-gray-400'} />}
                    </motion.span>
                    <span className={`text-xs font-light truncate hidden sm:block ${active ? 'text-white' : 'text-gray-400'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-[#c0e69b]/60 origin-left"
                        animate={{ scaleX: i < step ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Contenido de pasos */}
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              {/* Paso 1: Estancia */}
              {step === 0 && (
                <motion.div
                  key="stay"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={labelClass}>
                        <Calendar size={16} className="mr-2 text-[#c0e69b]" />
                        {t('reservation.form.checkIn')}
                      </label>
                      <input type="date" name="checkIn" min={today} value={formData.checkIn} onChange={handleChange} required className={`${inputClass} [color-scheme:dark]`} />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        <Calendar size={16} className="mr-2 text-[#c0e69b]" />
                        {t('reservation.form.checkOut')}
                      </label>
                      <input type="date" name="checkOut" min={formData.checkIn || today} value={formData.checkOut} onChange={handleChange} required className={`${inputClass} [color-scheme:dark]`} />
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#c0e69b]/80">{t('reservation.guests')}</p>
                    <Stepper field="adults" min={1} max={4} icon={Users} label={t('reservation.adults')} />
                    <Stepper field="children" min={0} max={3} icon={Baby} label={t('reservation.children')} />
                  </div>
                </motion.div>
              )}

              {/* Paso 2: Datos */}
              {step === 1 && (
                <motion.div
                  key="guest"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className={labelClass}>
                      <Users size={16} className="mr-2 text-[#c0e69b]" />
                      {t('reservation.form.name')}
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      <Mail size={16} className="mr-2 text-[#c0e69b]" />
                      {t('reservation.form.email')}
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      <Phone size={16} className="mr-2 text-[#c0e69b]" />
                      {t('reservation.form.phone')}
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} />
                  </div>
                </motion.div>
              )}

              {/* Paso 3: Confirmar */}
              {step === 2 && (
                <motion.div
                  key="confirm"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  {/* Resumen */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2.5">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#c0e69b]/80 mb-1">{t('reservation.summary')}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2"><Calendar size={14} className="text-[#c0e69b]" /> {t('reservation.stepStay')}</span>
                      <span className="text-white font-light">{formData.checkIn} → {formData.checkOut}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2"><Moon size={14} className="text-[#c0e69b]" /> {t('reservation.nightsPlural')}</span>
                      <span className="text-white font-light">{nights}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2"><Users size={14} className="text-[#c0e69b]" /> {t('reservation.guests')}</span>
                      <span className="text-white font-light">{formData.adults} {t('reservation.adults').toLowerCase()} · {formData.children} {t('reservation.children').toLowerCase()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2"><Mail size={14} className="text-[#c0e69b]" /> {formData.name}</span>
                      <span className="text-white font-light truncate max-w-[50%]">{formData.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>
                      <MessageSquare size={16} className="mr-2 text-[#c0e69b]" />
                      {t('reservation.form.comments')}
                    </label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      rows="3"
                      className={`${inputClass} resize-none`}
                      placeholder={t('reservation.form.placeholderComments')}
                    ></textarea>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navegación entre pasos */}
          <div className="flex items-center gap-3 pt-6 mt-2 border-t border-white/10">
            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="focus-ring flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                <ArrowLeft size={18} /> {t('reservation.back')}
              </button>
            )}

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!stepValid[step]}
                className="btn-custom focus-ring flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {t('reservation.next')} <ArrowRight size={18} />
              </button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="focus-ring flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-6 rounded-2xl text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100 disabled:cursor-not-allowed font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    <span>{t('reservation.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <MessageCircle size={22} />
                    <span>{t('reservation.form.submit')}</span>
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Fila de confianza */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400 font-light mt-6">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#c0e69b]" /> {t('reservation.trustNoPrepay')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle size={15} className="text-[#c0e69b]" /> {t('reservation.trustConfirm')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} className="text-[#c0e69b]" /> {t('reservation.trustFast')}
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Reservation;
