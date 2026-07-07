import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { 
  CheckCircle2, Star, Smartphone, ChevronLeft, 
  ChevronRight, BookOpen, Pencil, Type, Lightbulb, Puzzle, FileText,
  Heart, Download, Zap, Crown, Gift, ClipboardList, FlaskConical, LayoutGrid, CalendarDays
} from 'lucide-react';

import SalesNotification from '@/components/SalesNotification';
import imgFonologica from '@assets/generated_images/atividade-fonologica.jpg';
import imgCaligrafia from '@assets/generated_images/atividade-caligrafia.jpg';
import imgLeitura from '@assets/generated_images/atividade-leitura.jpg';
import imgSilabas from '@assets/generated_images/atividade-silabas.jpg';
import imgAlfabeto from '@assets/generated_images/atividade-alfabeto.jpg';

const CLIENTES = 2389; // SUBSTITUIR por número real
const PRECO = "R$9,90"; // SUBSTITUIR por preço real
const PRECO_BASICO = "R$9,90"; // SUBSTITUIR por preço real
const PRECO_BASICO_DE = "R$19,90"; // SUBSTITUIR por preço original (riscado)
const PRECO_PREMIUM = "R$14,90"; // SUBSTITUIR por preço real
const PRECO_PREMIUM_DE = "R$39,90"; // SUBSTITUIR por preço original (riscado)

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

interface CtaButtonProps {
  className?: string;
}

interface TestimonialCardProps {
  name: string;
  city: string;
  initials: string;
  color: string;
  text: string;
}

const scrollToOferta = () => {
  document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
};

const CtaButton = ({ className = "" }: CtaButtonProps) => (
  <motion.button 
    onClick={scrollToOferta}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`w-full sm:w-auto bg-green-500 hover:bg-green-400 text-white font-heading font-bold text-lg md:text-xl py-4 px-8 md:px-10 rounded-full shadow-[0_8px_20px_-6px_rgba(34,197,94,0.6)] transition-all flex items-center justify-center gap-3 ${className}`}
  >
    <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" />
    <span>Quero agora por {PRECO}</span>
  </motion.button>
);

const TestimonialCard = ({ name, city, initials, color, text }: TestimonialCardProps) => (
  <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl shadow-sm border border-border flex flex-col gap-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />
    <div className="flex gap-1 text-amber-400">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
    </div>
    <p className="text-foreground/80 italic text-base md:text-lg leading-relaxed relative z-10">"{text}"</p>
    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-inner ${color}`}>
        {initials}
      </div>
      <div>
        <p className="font-heading font-bold text-base text-foreground">{name}</p>
        <p className="text-sm text-foreground/60">{city}</p>
      </div>
    </div>
  </motion.div>
);

const PreviewCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const slides = [
    { title: "Consciência Fonológica", desc: "Rimas, aliterações e sons iniciais", img: imgFonologica, accent: "from-amber-400 to-orange-400" },
    { title: "Caligrafia e Traçado", desc: "Traçados, labirintos e coordenação motora", img: imgCaligrafia, accent: "from-teal-400 to-cyan-400" },
    { title: "Leitura e Interpretação", desc: "Textos curtos com compreensão leitora", img: imgLeitura, accent: "from-rose-400 to-pink-400" },
    { title: "Sílabas e Palavras", desc: "Formação silábica e reconhecimento de palavras", img: imgSilabas, accent: "from-violet-400 to-indigo-400" },
    { title: "Reconhecimento do Alfabeto", desc: "Letras maiúsculas, minúsculas e seus sons", img: imgAlfabeto, accent: "from-emerald-400 to-green-400" },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-16 px-4 md:px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 py-6">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_80%] min-w-0 pl-4 md:flex-[0_0_42%] lg:flex-[0_0_33.33%]">
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-[2rem] overflow-hidden shadow-md border border-black/8 bg-white group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-[22rem] overflow-hidden">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* gradient overlay at bottom */}
                  <div className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${slide.accent} opacity-80`} />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="font-heading font-extrabold text-base leading-snug drop-shadow">{slide.title}</p>
                    <p className="text-xs font-semibold opacity-90 mt-0.5 drop-shadow">{slide.desc}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg border border-border text-foreground hover:text-primary transition-all z-10 hidden md:flex items-center justify-center hover:scale-110 active:scale-95">
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg border border-border text-foreground hover:text-primary transition-all z-10 hidden md:flex items-center justify-center hover:scale-110 active:scale-95">
        <ChevronRight className="w-7 h-7" />
      </button>
    </div>
  )
}

const contentPills = [
  { text: "Consciência Fonológica", icon: <Type className="w-5 h-5" />, color: "bg-amber-100 text-amber-900 border-amber-200" },
  { text: "Leitura e Interpretação", icon: <BookOpen className="w-5 h-5" />, color: "bg-rose-100 text-rose-900 border-rose-200" },
  { text: "Escrita Criativa", icon: <Pencil className="w-5 h-5" />, color: "bg-sky-100 text-sky-900 border-sky-200" },
  { text: "Sílabas e Palavras", icon: <Puzzle className="w-5 h-5" />, color: "bg-indigo-100 text-indigo-900 border-indigo-200" },
  { text: "Vogais e Consoantes", icon: <Type className="w-5 h-5" />, color: "bg-emerald-100 text-emerald-900 border-emerald-200" },
  { text: "Ditados Divertidos", icon: <FileText className="w-5 h-5" />, color: "bg-orange-100 text-orange-900 border-orange-200" },
  { text: "Atividades de Cópia", icon: <Pencil className="w-5 h-5" />, color: "bg-teal-100 text-teal-900 border-teal-200" },
  { text: "Reconhecimento de Letras", icon: <Lightbulb className="w-5 h-5" />, color: "bg-purple-100 text-purple-900 border-purple-200" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <SalesNotification />
      
      {/* 1. HERO */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-32 px-4 relative">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            
            <motion.div variants={fadeIn} className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-border/60 mb-8">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700">M</div>
                <div className="w-7 h-7 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-pink-700">A</div>
                <div className="w-7 h-7 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-green-700">J</div>
              </div>
              <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-current" /> 
                {CLIENTES} professoras já baixaram
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-[2.5rem] md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.15] mb-8">
              Chega de passar horas <span className="text-primary relative inline-block">
                planejando
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
              </span> o que ensinar amanhã.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-foreground/80 max-w-2xl mb-12 font-medium leading-relaxed">
              Tenha em mãos 150 atividades prontas para imprimir, focadas em alfabetização e alinhadas à BNCC.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 sm:gap-10 mb-12 text-left sm:text-center w-full sm:w-auto px-4 sm:px-0">
              <div className="flex items-center gap-3 font-semibold text-foreground/90"><CheckCircle2 className="w-6 h-6 text-secondary" /> PDF em alta resolução</div>
              <div className="flex items-center gap-3 font-semibold text-foreground/90"><CheckCircle2 className="w-6 h-6 text-secondary" /> Pronto para imprimir</div>
              <div className="flex items-center gap-3 font-semibold text-foreground/90"><CheckCircle2 className="w-6 h-6 text-secondary" /> Acesso imediato</div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="w-full sm:w-auto flex flex-col items-center gap-4">
              <CtaButton />
              <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-sm font-bold text-primary uppercase tracking-widest">
                  Oferta por tempo limitado
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. PREVIEW DO MATERIAL */}
      <section className="py-24 px-4 bg-white border-t border-border/40 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            Uma espiadinha no material
          </motion.h2>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="text-lg text-foreground/70 mb-8"
          >
            Atividades lúdicas, bonitas e prontas para aplicar.
          </motion.p>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn}>
            <PreviewCarousel />
          </motion.div>
        </div>
      </section>

      {/* 3. DESCRIÇÃO DO CONTEÚDO */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-3xl md:text-4xl font-extrabold mb-6"
          >
            O que você vai encontrar
          </motion.h2>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-lg md:text-xl text-foreground/80 mb-14 max-w-3xl mx-auto leading-relaxed"
          >
            Um material completo de alfabetização e letramento, cuidadosamente criado para o 1º ao 3º ano. Totalmente focado no desenvolvimento real do aluno.
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {contentPills.map((pill, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold shadow-sm border ${pill.color} hover:-translate-y-1 transition-transform`}
              >
                <div className="bg-white/50 p-2 rounded-xl">
                  {pill.icon}
                </div>
                {pill.text}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROVA SOCIAL EM ÍCONES */}
      <section className="py-16 px-4 bg-white border-y border-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: "⭐", text: `${CLIENTES} avaliações positivas` },
              { icon: "🔓", text: "Acesso vitalício" },
              { icon: "✅", text: "Garantia de 7 dias" },
              { icon: "📱", text: "Acesso em qualquer dispositivo" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="bg-background text-4xl p-4 rounded-2xl border border-border shadow-sm flex items-center justify-center w-20 h-20">
                  {item.icon}
                </div>
                <span className="font-bold text-base md:text-lg text-foreground/90">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AUTORIDADE */}
      <section className="py-24 px-4 bg-background text-center relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-3xl md:text-4xl font-extrabold mb-14"
          >
            Material elaborado por <span className="text-secondary">especialistas em educação</span>
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-5 justify-center mb-12 max-w-2xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="bg-white border border-border p-5 rounded-2xl flex-1 flex flex-col items-center gap-3 shadow-sm text-center"
            >
              <div className="bg-secondary/10 p-3 rounded-xl">
                <BookOpen className="w-7 h-7 text-secondary" />
              </div>
              <p className="font-extrabold text-base">Conteúdo profissional alinhado à BNCC</p>
              <p className="text-foreground/70 text-sm">Todas as atividades possuem códigos e objetivos claros para facilitar o seu diário de classe.</p>
            </motion.div>
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="bg-white border border-border p-5 rounded-2xl flex-1 flex flex-col items-center gap-3 shadow-sm text-center"
            >
              <div className="bg-primary/10 p-3 rounded-xl">
                <Smartphone className="w-7 h-7 text-primary" />
              </div>
              <p className="font-extrabold text-base">Acesse de qualquer lugar, a qualquer hora</p>
              <p className="text-foreground/70 text-sm">Baixe o PDF diretamente no seu celular ou computador. Imprima só o que for usar no dia.</p>
            </motion.div>
          </div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex justify-center">
            <CtaButton />
          </motion.div>
        </div>
      </section>

      {/* 6. PARA QUEM É */}
      <section className="py-24 px-4 bg-primary/5 border-y border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 text-center md:text-left">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mb-8 mx-auto md:mx-0 rotate-3"
              >
                <Heart className="w-12 h-12 text-primary" />
              </motion.div>
              <motion.h2 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight"
              >
                Para quem é este material?
              </motion.h2>
              <motion.p 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-xl text-foreground/80 mb-8 font-medium"
              >
                Feito com carinho para professoras de anos iniciais (1º ao 3º ano) que:
              </motion.p>
            </div>
            <div className="flex-1 space-y-5 w-full">
              {[
                "Não têm tempo para criar atividades do zero todos os dias",
                "Precisam de variedade para manter a turma engajada",
                "Querem focar sua energia em ensinar, não apenas em planejar",
                "Sentem que as ideias estão acabando e precisam de inspiração"
              ].map((point, i) => (
                <motion.div 
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-border flex items-start gap-5 hover:border-primary/30 transition-colors"
                >
                  <div className="mt-0.5 bg-secondary/10 p-2 rounded-full text-secondary shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-lg text-foreground/90">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. ESCOLHA SUA OFERTA */}
      <section id="oferta" className="py-24 px-4 bg-background border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Escolha sua oferta</h2>
            <p className="text-lg text-foreground/70 font-medium">Acesso imediato após a compra. Garantia de 7 dias.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* CARD BÁSICO */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="bg-white border border-border rounded-3xl p-8 flex flex-col gap-6 shadow-sm"
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-1">Pacote Básico</p>
                <p className="text-sm text-foreground/40 line-through">{PRECO_BASICO_DE}</p>
                <p className="text-5xl font-extrabold text-foreground leading-none mt-1">
                  {PRECO_BASICO}
                </p>
                <p className="text-sm text-foreground/50 mt-1">pagamento único</p>
              </div>

              <ul className="flex flex-col gap-3">
                {[
                  { icon: <FileText className="w-5 h-5" />, text: "150 Atividades escolares para anos iniciais" },
                  { icon: <Zap className="w-5 h-5" />, text: "Acesso Imediato" },
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Garantia de 7 dias" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-secondary shrink-0">{item.icon}</span>
                    <span className="font-semibold text-foreground/80 text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="w-full border-2 border-primary text-primary font-heading font-bold text-base py-4 px-6 rounded-2xl transition-all hover:bg-primary hover:text-white flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Quero o Pacote Básico por {PRECO_BASICO}
              </motion.button>
            </motion.div>

            {/* CARD PREMIUM */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="relative bg-[#0f172a] text-white rounded-3xl p-8 flex flex-col gap-6 shadow-xl ring-2 ring-secondary"
            >
              {/* Badge Mais vendido */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <span className="bg-secondary text-white text-xs font-extrabold uppercase tracking-widest px-5 py-2 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" /> Mais vendido
                </span>
                <span className="text-[11px] font-semibold text-foreground/60 bg-white/90 px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                  +500 pessoas já escolheram essa oferta
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-1">Pacote Premium</p>
                <p className="text-sm text-white/30 line-through">{PRECO_PREMIUM_DE}</p>
                <p className="text-5xl font-extrabold leading-none mt-1">{PRECO_PREMIUM}</p>
                <p className="text-sm text-white/40 mt-1">pagamento único</p>
              </div>

              <ul className="flex flex-col gap-3">
                {[
                  { icon: <FileText className="w-5 h-5" />, text: "150 Atividades escolares para anos iniciais", base: true },
                  { icon: <Zap className="w-5 h-5" />, text: "Acesso Imediato", base: true },
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Garantia de 7 dias", base: true },
                  { icon: <Gift className="w-5 h-5" />, text: "Kit de Alfabetização Completo", base: false },
                  { icon: <ClipboardList className="w-5 h-5" />, text: "Kit de Avaliações Prontas", base: false },
                  { icon: <LayoutGrid className="w-5 h-5" />, text: "Kit de Recursos para Sala de Aula", base: false },
                  { icon: <CalendarDays className="w-5 h-5" />, text: "Planejamento Anual Completo (BNCC)", base: false },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-0.5 shrink-0 ${item.base ? "text-white/50" : "text-secondary"}`}>{item.icon}</span>
                    <span className={`font-semibold text-sm ${item.base ? "text-white/60" : "text-white"}`}>
                      {!item.base && <span className="text-secondary font-bold">+ </span>}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="w-full bg-green-500 hover:bg-green-400 text-white font-heading font-bold text-base py-4 px-6 rounded-2xl shadow-[0_8px_20px_-6px_rgba(34,197,94,0.5)] transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Quero o Pacote Premium por {PRECO_PREMIUM}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. DEPOIMENTOS */}
      <section className="py-24 px-4 bg-background border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-3xl md:text-4xl font-extrabold text-center mb-16"
          >
            O que as professoras estão dizendo
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Fernanda Lima" 
              city="Goiânia-GO" 
              initials="FL" 
              color="bg-pink-500" 
              text="Comprei ontem e já imprimi as atividades da semana toda. Me salvou um tempo absurdo! A qualidade visual das folhas é linda, as crianças amaram."
            />
            <TestimonialCard 
              name="Carla Souza" 
              city="São Paulo-SP" 
              initials="CS" 
              color="bg-blue-500" 
              text="Excelente material. Tudo bem separadinho por tema, super fácil de achar o que eu preciso dar na aula. Pelo preço, entregou muito mais do que eu esperava."
            />
            <TestimonialCard 
              name="Márcia Rodrigues" 
              city="Fortaleza-CE" 
              initials="MR" 
              color="bg-green-500" 
              text="Minha turma do 2º ano estava com dificuldade em algumas sílabas complexas. As atividades focadas nisso foram perfeitas. Recomendo para todas as colegas."
            />
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-foreground text-background py-12 px-4 text-center border-t-8 border-primary">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 opacity-90">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-heading font-extrabold text-xl tracking-tight">150 Atividades</span>
          </div>
          <p className="text-background/50 font-medium text-sm">
            © 2026 150 Atividades para Anos Iniciais. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
