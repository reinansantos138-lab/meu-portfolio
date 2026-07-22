import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Download, Linkedin, Mail, Phone, ChevronRight, 
  Microscope, FlaskConical, Award, BookOpen, Briefcase, 
  Settings, CheckCircle2, ChevronUp, MapPin, Zap, Clock, FileText
} from 'lucide-react';

// --- Theme & Configuration ---
const theme = {
  colors: {
    primary: '#0F2537', // Azul petróleo
    accent: '#0066CC', // Azul científico
    light: '#F8FAFC',
    dark: '#1E293B',
    gray: '#64748B'
  }
};

// Hook for Intersection Observer (Scroll Reveal)
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Animated Section Wrapper
const RevealSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Animated Number Counter
const AnimatedNumber = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Início', id: 'home' },
    { name: 'Sobre', id: 'sobre' },
    { name: 'Experiência', id: 'experiencia' },
    { name: 'Competências', id: 'competencias' },
    { name: 'Formação', id: 'formacao' },
    { name: 'Projetos', id: 'projetos' },
    { name: 'Certificados', id: 'certificacoes' },
    { name: 'Contato', id: 'contato' },
  ];

  return (
    <div className="font-sans text-slate-800 bg-white antialiased selection:bg-[#0066CC] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollTo('home')}>
              <span className={`font-bold text-xl tracking-tighter ${isScrolled ? 'text-[#0F2537]' : 'text-slate-800'}`}>
                REINAN<span className="text-[#0066CC]">.</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-[#0066CC] ${
                    isScrolled ? 'text-slate-600' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <a 
                href="#contato"
                onClick={(e) => { e.preventDefault(); scrollTo('contato'); }}
                className="bg-[#0F2537] hover:bg-[#0066CC] text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Fale Comigo
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:text-[#0066CC] hover:bg-slate-50 rounded-md"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {}
      {/* HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 mb-12 lg:mb-0">
              <RevealSection>
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#0066CC] px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-blue-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066CC]"></span>
                  </span>
                  <span>CRQ Ativo: 073002024 (7ª Região)</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F2537] mb-6 leading-tight">
                  Precisão Analítica & <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F2537] to-[#0066CC]">Inovação Química</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl font-light leading-relaxed">
                  Engenheiro Químico e Técnico em Química. Especializado em técnicas instrumentais avançadas, controle de qualidade rigoroso e desenvolvimento de soluções para laboratórios de alta performance.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#contato" onClick={(e) => { e.preventDefault(); scrollTo('contato'); }} className="flex items-center justify-center bg-[#0F2537] hover:bg-[#0066CC] text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <Mail size={18} className="mr-2" /> Entrar em Contato
                  </a>
                  <a href="#" className="flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md">
                    <Download size={18} className="mr-2" /> Baixar CV
                  </a>
                </div>
                <div className="mt-10 flex items-center space-x-6 text-slate-500">
                  <a href="https://www.linkedin.com/in/reinan-souza" target="_blank" rel="noreferrer" className="hover:text-[#0066CC] transition-colors flex items-center">
                    <Linkedin size={20} className="mr-1" /> LinkedIn
                  </a>
                  <a href="http://lattes.cnpq.br/0068692627448514" target="_blank" rel="noreferrer" className="hover:text-[#0066CC] transition-colors flex items-center font-medium">
                    <BookOpen size={18} className="mr-1" /> Lattes
                  </a>
                </div>
              </RevealSection>
            </div>

            <div className="lg:col-span-6 relative">
              <RevealSection delay={200}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] bg-slate-100">
                  <img 
                    src="/perfil-hero.png" 
                    alt="Reinan Souza - Engenheiro Químico" 
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                  
                  {/* Floating glass card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Especialidade</p>
                      <p className="text-sm font-semibold text-[#0F2537]">Análises Instrumentais</p>
                    </div>
                    <div className="bg-[#0066CC]/10 p-2 rounded-full">
                      <Microscope className="text-[#0066CC]" size={20} />
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {}
      {/* NUMBERS / STATS SECTION */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <RevealSection delay={100} className="text-center px-4">
              <div className="text-4xl font-bold text-[#0F2537] mb-2"><AnimatedNumber end={5} suffix="+" /></div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Anos de Experiência</div>
            </RevealSection>
            <RevealSection delay={200} className="text-center px-4">
              <div className="text-4xl font-bold text-[#0F2537] mb-2"><AnimatedNumber end={15} suffix="+" /></div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Técnicas Dominadas</div>
            </RevealSection>
            <RevealSection delay={300} className="text-center px-4">
              <div className="text-4xl font-bold text-[#0F2537] mb-2"><AnimatedNumber end={100} suffix="%" /></div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Rigor Analítico</div>
            </RevealSection>
            <RevealSection delay={400} className="text-center px-4">
              <div className="text-4xl font-bold text-[#0F2537] mb-2"><AnimatedNumber end={2} /></div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Formações Principais</div>
            </RevealSection>
          </div>
        </div>
      </section>

      {}
      {/* ABOUT SECTION */}
      <section id="sobre" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            <div className="mb-12 lg:mb-0 order-2 lg:order-1 mt-12 lg:mt-0">
              <RevealSection>
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-video lg:aspect-square bg-slate-200 border border-slate-200">
                  <img 
                    src="/perfil-sobre.png" 
                    alt="Perfil Profissional - SENAI CIMATEC" 
                    className="object-cover w-full h-full object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-semibold text-lg flex items-center">
                      <Award className="mr-2" size={20} /> Perfil Analítico e Estratégico
                    </p>
                  </div>
                </div>
              </RevealSection>
            </div>

            <div className="order-1 lg:order-2">
              <RevealSection>
                <h2 className="text-sm font-bold text-[#0066CC] uppercase tracking-widest mb-3">Sobre Mim</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-[#0F2537] mb-6">Visão técnica alinhada à resolução de problemas complexos.</h3>
                
                <div className="prose prose-lg text-slate-600 mb-8">
                  <p>
                    Com sólida formação em <strong>Engenharia Química</strong> e <strong>Técnico em Química</strong>, desenvolvi minha carreira focada em análises físico-químicas em águas, efluentes e solos, garantindo a excelência operacional de laboratórios industriais e ambientais.
                  </p>
                  <p>
                    Minha abordagem combina o rigor científico necessário para o <strong>Controle de Qualidade (CQ)</strong> e Boas Práticas de Laboratório (BPL) com a facilidade em ferramentas de modelagem (HYSYS, DWSIM, Python). Sou um profissional inovador, pragmático e criativo, dedicado a contribuir com eficiência e rastreabilidade nos resultados analíticos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
                    <div className="bg-blue-50 p-2 rounded-lg text-[#0066CC]">
                      <Settings size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F2537] mb-1">Inovação e Processos</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Modelagem de processos e automação laboratorial focada em eficiência.</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
                    <div className="bg-blue-50 p-2 rounded-lg text-[#0066CC]">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F2537] mb-1">Qualidade Assegurada</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Rigor em BPL, curvas analíticas e validação de metodologias.</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {}
      {/* SKILLS SECTION */}
      <section id="competencias" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-[#0066CC] uppercase tracking-widest mb-3">Expertise</h2>
            <h3 className="text-3xl font-bold text-[#0F2537]">Competências Técnicas</h3>
            <p className="mt-4 text-slate-600">Domínio em metodologias instrumentais, softwares de simulação e gestão da qualidade laboratorial.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categoria 1 */}
            <RevealSection delay={100}>
              <div className="bg-slate-50 rounded-2xl p-8 h-full border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0F2537] mb-6 border border-slate-200">
                  <Microscope size={24} />
                </div>
                <h4 className="text-xl font-bold text-[#0F2537] mb-4">Técnicas Instrumentais</h4>
                <div className="flex flex-wrap gap-2">
                  {['Ion Chromatography', 'TOC / TIC / TNb', 'Gallery', 'UV-Vis', 'Colorimetria', 'Curvas Analíticas', 'Calibração', 'Validação'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm rounded-md font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            </RevealSection>

            {/* Categoria 2 */}
            <RevealSection delay={200}>
              <div className="bg-slate-50 rounded-2xl p-8 h-full border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0F2537] mb-6 border border-slate-200">
                  <FlaskConical size={24} />
                </div>
                <h4 className="text-xl font-bold text-[#0F2537] mb-4">Ensaios & Qualidade</h4>
                <div className="flex flex-wrap gap-2">
                  {['Controle de Qualidade', 'BPL', 'Águas e Efluentes', 'Solo', 'Clorofila', 'Fenóis', 'Cianeto', 'Nitrogênio', 'TPH', 'Sílica', 'Granulometria'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm rounded-md font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            </RevealSection>

            {/* Categoria 3 */}
            <RevealSection delay={300}>
              <div className="bg-[#0F2537] rounded-2xl p-8 h-full border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-6 border border-white/20">
                  <Settings size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Softwares & Soft Skills</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Python', 'HYSYS', 'DWSIM', 'MATLAB', 'Google Colab', 'Office'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-white/10 text-white border border-white/20 text-sm rounded-md font-medium">{skill}</span>
                  ))}
                </div>
                <div className="border-t border-white/20 pt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-300">
                  <span>• Organização</span>
                  <span>• Liderança Técnica</span>
                  <span>• Análise Crítica</span>
                  <span>• Inovação</span>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {}
      {/* EXPERIENCE SECTION */}
      <section id="experiencia" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#0066CC] uppercase tracking-widest mb-3">Trajetória</h2>
            <h3 className="text-3xl font-bold text-[#0F2537]">Experiência Profissional</h3>
          </RevealSection>

          <div className="relative border-l-2 border-blue-100 ml-3 md:ml-6 space-y-12 pb-8">
            
            {/* Experience Item 1 */}
            <RevealSection delay={100} className="relative pl-8 md:pl-10">
              <div className="absolute w-6 h-6 bg-[#0066CC] rounded-full -left-[13px] top-1 border-4 border-slate-50 shadow-sm"></div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <span className="text-sm font-bold text-[#0066CC] mb-1 block">Jul/2025 - o momento (1 ano)</span>
                <h4 className="text-xl font-bold text-[#0F2537]">Técnico de Laboratório I</h4>
                <h5 className="text-md font-medium text-slate-600 mb-4 flex items-center mt-1">
                  <Briefcase size={16} className="mr-2" /> SENAI CIMATEC
                </h5>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  Atuação com foco em técnicas instrumentais e controle analítico avançado, garantindo a rastreabilidade e qualidade dos resultados.
                </p>
                <ul className="space-y-2 text-sm text-slate-600 mb-4">
                  <li className="flex items-start"><ChevronRight size={16} className="text-[#0066CC] mt-0.5 mr-2 flex-shrink-0"/> Cromatografia de íons para determinação de ânions (fluoreto, clorito, brometo, cloreto, nitrito, nitrato, bromato, clorato, sulfato e fosfato).</li>
                  <li className="flex items-start"><ChevronRight size={16} className="text-[#0066CC] mt-0.5 mr-2 flex-shrink-0"/> Análise de carbono e nitrogênio (TIC, TOC, TNb e NT) e operação de analisador automático (Gallery).</li>
                  <li className="flex items-start"><ChevronRight size={16} className="text-[#0066CC] mt-0.5 mr-2 flex-shrink-0"/> Construção de curvas analíticas, calibração de equipamentos, interpretação e validação de resultados.</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">Cromatografia de Íons</span>
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">TOC/TIC/TNb</span>
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">Gallery</span>
                </div>
              </div>
            </RevealSection>

            {/* Experience Item 2 */}
            <RevealSection delay={200} className="relative pl-8 md:pl-10">
              <div className="absolute w-6 h-6 bg-slate-300 rounded-full -left-[13px] top-1 border-4 border-slate-50"></div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <span className="text-sm font-bold text-slate-500 mb-1 block">Jul/2024 - Jul/2025 (1 ano)</span>
                <h4 className="text-xl font-bold text-[#0F2537]">Estagiário Técnico em Química</h4>
                <h5 className="text-md font-medium text-slate-600 mb-4 flex items-center mt-1">
                  <Briefcase size={16} className="mr-2" /> SENAI CIMATEC
                </h5>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  Realização de análises físico-químicas em matrizes ambientais (água, efluentes e solo) com rigor metrológico.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start"><ChevronRight size={16} className="text-slate-400 mt-0.5 mr-2 flex-shrink-0"/> Ensaios de Nitrogênio, Cianeto total/livre, Clorofila a, Cianotoxinas, TPH em solo (Soxhlet) e Granulometria.</li>
                  <li className="flex items-start"><ChevronRight size={16} className="text-slate-400 mt-0.5 mr-2 flex-shrink-0"/> Análises clássicas: pH, Condutividade, Dureza, Cloro Residual, Fenóis e Sulfeto (iodométrico).</li>
                  <li className="flex items-start"><ChevronRight size={16} className="text-slate-400 mt-0.5 mr-2 flex-shrink-0"/> Calibração de equipamentos e execução de curva analítica (Varian Cary 50 | UV-Vis Spectrophotometer).</li>
                </ul>
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* LABORATORY / GALLERY SECTION */}
      <section id="laboratorio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            <div>
              <RevealSection>
                <h2 className="text-sm font-bold text-[#0066CC] uppercase tracking-widest mb-3">Atuação em Laboratório</h2>
                <h3 className="text-3xl font-bold text-[#0F2537] mb-6">Mãos na massa: <br/>Do preparo à interpretação de dados.</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  A excelência analítica exige mais do que conhecimento teórico; exige habilidade prática, precisão motora e atenção impecável aos detalhes. Minha vivência em bancada abrange desde o preparo meticuloso de amostras complexas até a operação de softwares de controle de sistemas cromatográficos.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-lg text-[#0066CC] mr-4 flex-shrink-0 mt-1">
                      <Settings size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Automação Laboratorial</h4>
                      <p className="text-sm text-slate-500">Otimização de rotinas utilizando integrações de dados e programação (Python).</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-lg text-[#0066CC] mr-4 flex-shrink-0 mt-1">
                      <FlaskConical size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Resolução de Problemas (Troubleshooting)</h4>
                      <p className="text-sm text-slate-500">Identificação rápida de desvios em curvas de calibração e manutenção de primeiro nível em equipamentos.</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

            <div className="mt-12 lg:mt-0 relative group">
              <RevealSection delay={200}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                  <img 
                    src="/perfil-laboratorio.png" 
                    alt="Atuação em Laboratório - Pipetagem" 
                    className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#0F2537]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white font-bold text-xl mb-2">Precisão Analítica</p>
                      <p className="text-slate-200 text-sm max-w-xs mx-auto">Preparo de amostras e padrões com extrema exatidão para Cromatografia.</p>
                    </div>
                  </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] [background-size:10px_10px] -z-10 rounded-xl"></div>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {}
      {/* EDUCATION SECTION */}
      <section id="formacao" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#0066CC] uppercase tracking-widest mb-3">Acadêmico</h2>
            <h3 className="text-3xl font-bold text-[#0F2537]">Formação Acadêmica</h3>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Degree 1 */}
            <RevealSection delay={100}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
                <div className="relative z-10 flex-grow">
                  <div className="w-12 h-12 bg-[#0F2537] rounded-xl flex items-center justify-center text-white mb-6">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-[#0F2537]">Engenharia Química</h4>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">2018 - 2022</span>
                  </div>
                  <p className="text-[#0066CC] font-semibold text-sm mb-4">Centro Universitário Ruy Barbosa Wyden (Uniruy)</p>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    Formação com foco em processos industriais, operações unitárias e fenômenos de transporte. Experiência no desenvolvimento de projetos envolvendo cinética química, cálculo de reatores e termodinâmica aplicada. Evolução acadêmica consistente com alto desempenho nos períodos finais (CR: 7,74).
                  </p>
                </div>
                <div className="relative z-10 mt-auto pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">TCC / Destaque</span>
                  <p className="text-sm text-slate-700 mt-1 font-medium italic">"Estudo do cenário produtivo de biodiesel, derivado da biomassa, no Brasil."</p>
                </div>
              </div>
            </RevealSection>

            {/* Degree 2 */}
            <RevealSection delay={200}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col">
                <div className="relative z-10 flex-grow">
                  <div className="w-12 h-12 bg-[#0F2537] rounded-xl flex items-center justify-center text-white mb-6">
                    <Microscope size={24} />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-[#0F2537]">Técnico em Química</h4>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">2023 - 2024</span>
                  </div>
                  <p className="text-[#0066CC] font-semibold text-sm mb-4">SENAI - Lauro de Freitas</p>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    Aulas práticas laboratoriais intensivas em análises químicas e microbiológicas. Especialização no controle e manipulação de substâncias, além de análises instrumentais com uso de equipamentos laboratoriais avançados. Excelência acadêmica (CR: 9,3).
                  </p>
                </div>
                <div className="relative z-10 mt-auto pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">TCC / Destaque</span>
                  <p className="text-sm text-slate-700 mt-1 font-medium italic">"Transformando Resíduos em Energia: O potencial do Cupuaçu para Produção de Hidrogênio."</p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* PROJETOS SECTION */}
      <section id="projetos" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#0066CC] uppercase tracking-widest mb-3">Pesquisa & Inovação</h2>
            <h3 className="text-3xl font-bold text-[#0F2537]">Projetos de Destaque</h3>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Projeto 1 */}
            <RevealSection delay={100}>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-[#0066CC] transition-colors h-full flex flex-col">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#0F2537] mb-4 shadow-sm">
                  <Zap size={20} />
                </div>
                <h4 className="font-bold text-[#0F2537] mb-2">Produção de Hidrogênio via Biomassa</h4>
                <p className="text-sm text-slate-600 mb-4 flex-grow">
                  Estudo de viabilidade focado na transformação de resíduos do Cupuaçu para a geração de energia limpa (TCC Técnico).
                </p>
                <span className="text-xs font-bold text-[#0066CC] mt-auto">#Sustentabilidade #EnergiaLimpa</span>
              </div>
            </RevealSection>

            {/* Projeto 2 */}
            <RevealSection delay={200}>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-[#0066CC] transition-colors h-full flex flex-col">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#0F2537] mb-4 shadow-sm">
                  <FileText size={20} />
                </div>
                <h4 className="font-bold text-[#0F2537] mb-2">Cenário Produtivo de Biodiesel</h4>
                <p className="text-sm text-slate-600 mb-4 flex-grow">
                  Análise técnica e econômica da produção de biodiesel derivado da biomassa no Brasil, avaliando potenciais e gargalos (TCC Engenharia).
                </p>
                <span className="text-xs font-bold text-[#0066CC] mt-auto">#Biomassa #EngenhariaQuímica</span>
              </div>
            </RevealSection>

            {/* Projeto 3 */}
            <RevealSection delay={300}>
              <div className="bg-[#0F2537] rounded-xl p-6 border border-slate-700 shadow-md h-full flex flex-col text-white">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white mb-4">
                  <Settings size={20} />
                </div>
                <h4 className="font-bold mb-2">Modelagem & Simulação</h4>
                <p className="text-sm text-slate-300 mb-4 flex-grow">
                  Aplicações e estudos independentes de modelagem de processos e termodinâmica utilizando softwares como HYSYS, DWSIM e scripts em Python/MATLAB.
                </p>
                <span className="text-xs font-bold text-blue-300 mt-auto">#Simulação #HYSYS #Python</span>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CERTIFICAÇÕES SECTION */}
      <section id="certificacoes" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#0066CC] uppercase tracking-widest mb-3">Qualificações</h2>
            <h3 className="text-3xl font-bold text-[#0F2537]">Cursos & Certificações</h3>
          </RevealSection>

          <div className="space-y-6">
            {[
              { title: "Inglês", inst: "Plataforma Kultivi", hrs: "115h", date: "Jan - Dez 2025" },
              { title: "NR6 - Aquisição, uso e conservação de EPIs", inst: "Certificação de Segurança", hrs: "4h", date: "Ago 2025" },
              { title: "Escola de Cromatografia a Gás", inst: "Analítica", hrs: "4h", date: "Nov - Dez 2024" },
              { title: "Assistente de Operações Logísticas", inst: "SENAI", hrs: "200h", date: "Mar - Mai 2021" },
              { title: "Assistente de Controle de Qualidade", inst: "SENAI", hrs: "180h", date: "Set - Nov 2020" },
              { title: "Auxiliar de Manutenção Elétrica e Hidráulica (Comandos Elétricos)", inst: "CSDL", hrs: "224h", date: "Mar - Jun 2019" }
            ].map((cert, index) => (
              <RevealSection key={index} delay={index * 100}>
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-all">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-10 h-10 bg-blue-50 text-[#0066CC] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F2537] text-md">{cert.title}</h4>
                      <p className="text-sm text-slate-500">{cert.inst}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400 font-medium md:text-right">
                    <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full"><Clock size={14} className="mr-1.5" /> {cert.hrs}</span>
                    <span className="min-w-[120px]">{cert.date}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contato" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 transform skew-x-12 translate-x-32 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#0066CC] uppercase tracking-widest mb-3">Conexão</h2>
            <h3 className="text-3xl font-bold text-[#0F2537]">Vamos conversar?</h3>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Estou aberto a oportunidades desafiadoras na área química, projetos de P&D e atuações laboratoriais.
            </p>
          </RevealSection>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <RevealSection delay={100} className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#0066CC] flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Email Profissional</h4>
                  <a href="mailto:reinansantos138@gmail.com" className="text-lg font-semibold text-[#0F2537] hover:text-[#0066CC] transition-colors">
                    reinansantos138@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#0066CC] flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Telefone / WhatsApp</h4>
                  <a href="https://wa.me/5571983144388" target="_blank" rel="noreferrer" className="text-lg font-semibold text-[#0F2537] hover:text-[#0066CC] transition-colors">
                    (71) 98314-4388
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#0066CC] flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Localização</h4>
                  <p className="text-lg font-semibold text-[#0F2537]">
                    Rua Pacheco de Oliveira, 117<br/>
                    <span className="text-sm font-normal text-slate-600">Salvador - BA, Brasil</span>
                  </p>
                </div>
              </div>
            </RevealSection>

            {/* Quick Contact Box (Visual) */}
            <RevealSection delay={200}>
              <div className="bg-[#0F2537] rounded-2xl p-8 shadow-xl border border-slate-700 text-white relative">
                <h4 className="text-xl font-bold mb-4">Conecte-se online</h4>
                <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                  Para informações detalhadas sobre publicações, histórico completo e rede de contatos, visite meus perfis profissionais.
                </p>
                
                <div className="space-y-4">
                  <a href="https://www.linkedin.com/in/reinan-souza" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all group">
                    <span className="flex items-center font-medium">
                      <Linkedin size={20} className="mr-3 text-blue-400" /> LinkedIn
                    </span>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                  
                  <a href="http://lattes.cnpq.br/0068692627448514" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all group">
                    <span className="flex items-center font-medium">
                      <BookOpen size={20} className="mr-3 text-emerald-400" /> Currículo Lattes
                    </span>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                </div>

                <a 
                  href="https://wa.me/5571983144388" 
                  target="_blank" rel="noreferrer"
                  className="mt-8 w-full block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
                >
                  Mensagem no WhatsApp
                </a>
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-white font-bold text-lg tracking-tighter">
              REINAN<span className="text-[#0066CC]">.</span>
            </span>
            <p className="text-sm mt-1">Engenheiro Químico & Técnico | CRQ: 073002024</p>
          </div>
          
          <div className="text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Reinan Souza dos Santos.</p>
            <p className="mt-1">Todos os direitos reservados. Design de Alta Performance.</p>
          </div>
        </div>
        
        {/* Back to top button */}
        <button 
          onClick={() => scrollTo('home')}
          className="fixed bottom-6 right-6 p-3 bg-white text-[#0F2537] shadow-xl rounded-full border border-slate-200 hover:bg-[#0F2537] hover:text-white transition-all z-50 group"
          aria-label="Voltar ao topo"
        >
          <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}
