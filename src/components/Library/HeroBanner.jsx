import React from 'react';
import { motion } from 'framer-motion';

export const HERO_AUTHORS = [
  {
    author: 'Machado de Assis',
    title: 'Mestres do Realismo',
    sub: 'Século XIX no Brasil',
    count: 'Mais de 1.200 capítulos e edições históricas',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvbpjpQX_7nUMEKqIKl8XnMQL1ZQ46vs8pr7gShzs_Yq_01D2eOG0bw_urOQdncUKitJcxbcFIFactSGssQPXi-hJU6vwTedE3EFAi-Ijhrdb71C9s7RYWbywDjNOwAz0UfOWSdxRDjRDfZLM_GvPKNT5nKnoDwv0ykbNceZaF09YU6yI731Hq63_WjAmIzUJUPkiSI6XKnr_4KO3LFt2anG7DbFT84cOgLkM6pD5985Ov6FswErqHhw',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArBFmuv8zsWSJp9bM6z1I-Jjd2oLoJHFdxf9hd664wNKllUi4in4Fjle0n4WRXeKjb2dpzow6bSVEA3siYpR9vkCSHwztnAIR2yAQFKohkUSdqSzDp2XI1QRXEItAjIFgLR2z9siCSmZS0TKcg1WQQr4q62-bfrKCqQ41K6UJRshaxIfvFuAE4hc6pZVjJG0VKddcTHHRXh9FEKOP-wlXL1uaiHUmc-MQRtuoIdfKiM_euGip0YFWqYA'
  },
  {
    author: 'José de Alencar',
    title: 'Romantismo e Brasilidade',
    sub: 'Fundações Nacionais do Séc. XIX',
    count: '940 capítulos e romances indigenistas',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZaVdm2KMN-gveL0c3jbkiBqDeBphxO-NGdgmlaSjUlK2my2TVWbwLDwBMKYtypG-gW6bZSZTYm_ElSLO6mIOe2FS76KfWRu-ZA7HC7RdYSxsup01bsyh542hQpIhSPQGvs6rEOtIvbGReLJ9mNBkeg1iSGzQ7YSDYVS-gLCe2AybggSGQ8PHI3j0BexG3WF-Uf-1XQembrWh9YD_JdrV7BnaplF95L-nrJYW_YIY',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZaVdm2KMN-gveL0c3jbkiBqDeBphxO-NGdgmlaSjUlK2my2TVWbwLDwBMKYtypG-gW6bZSZTYm_ElSLO6mIOe2FS76KfWRu-ZA7HC7RdYSxsup01bsyh542hQpIhSPQGvs6rEOtIvbGReLJ9mNBkeg1iSGzQ7YSDYVS-gLCe2AybggSGQ8PHI3j0BexG3WF-Uf-1XQembrWh9YD_JdrV7BnaplF95L-nrJYW_YIY'
  },
  {
    author: 'Castro Alves',
    title: 'A Voz dos Escravos',
    sub: 'Poesia Condoreira & Liberdade',
    count: '320 poemas e manuscritos em versos',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX-c-103e86Ns4m8F4PuIjoyjzjh7Zp_w2_j871JxK23JDcOZfbe2vwFK8nOf2Eg_KrWDVY2IRh4DOBEJCJ-1rZefoAHwENauJeL1Rf4Flg2M0Xe5fh_lzm4G0NCVPkxCuP4LGdU_9D-Z9yP4eKCenFKyYImd0WtkaL01nQY8TshNPMykGx0TvmlF84h3IC__6aBPhM6JALW28Epg2P0ea98PEUvPMKWjQnNQE2pIl',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX-c-103e86Ns4m8F4PuIjoyjzjh7Zp_w2_j871JxK23JDcOZfbe2vwFK8nOf2Eg_KrWDVY2IRh4DOBEJCJ-1rZefoAHwENauJeL1Rf4Flg2M0Xe5fh_lzm4G0NCVPkxCuP4LGdU_9D-Z9yP4eKCenFKyYImd0WtkaL01nQY8TshNPMykGx0TvmlF84h3IC__6aBPhM6JALW28Epg2P0ea98PEUvPMKWjQnNQE2pIl'
  },
  {
    author: 'Aluísio Azevedo',
    title: 'O Cortiço e o Naturalismo',
    sub: 'O Fervo Urbano do Rio de Janeiro',
    count: '610 capítulos e crônicas sociais',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUlT1fhAB0eVkRPza4w1oXAvH0J8Qrv5ZJ2WZEAtBmaNcvkvTUuR2BHycT-vtHgNDzvEcCIbrJX4CfN3dyriG3Ti3rfKRHuUj6eQ-dTVGxLSBs_RbWnkRyHwoQFfkorzFynEA0bud5p8dttBMlYOAA9w9JqVLeWb0BY0hesLA3nAji_8Q74W8_HA96CuIlxs0JS4vvGRF6qhg7V0qd7WvXTmc5nBMSRFI0qTXYR27G',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUlT1fhAB0eVkRPza4w1oXAvH0J8Qrv5ZJ2WZEAtBmaNcvkvTUuR2BHycT-vtHgNDzvEcCIbrJX4CfN3dyriG3Ti3rfKRHuUj6eQ-dTVGxLSBs_RbWnkRyHwoQFfkorzFynEA0bud5p8dttBMlYOAA9w9JqVLeWb0BY0hesLA3nAji_8Q74W8_HA96CuIlxs0JS4vvGRF6qhg7V0qd7WvXTmc5nBMSRFI0qTXYR27G'
  },
  {
    author: 'Raul Pompeia',
    title: 'O Ateneu & Memórias',
    sub: 'Impressionismo Psicológico',
    count: '450 páginas de prosa primorosa',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfvhdE7IcNnlePyEqLFF8zyoBnQ6IyRWIhXPp_eKDrZGFF6fTuj29r0xiNDh4Bx9G5hotGacIV1LuP0Dj1EB-qCbtQqPKogRoI3lRoI-8nvyzlkNcz4R-zsoBBSCeqn1iio1jMCAFC-lNsCIbpIiGLyPIMTSadAt71o7Zf5XjcXma-PF8nOYAmb5gm6NtCMUR2zNa5UTJh_oRbB8WBxORQ4bmXx85aiQf4zG81lSH_',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfvhdE7IcNnlePyEqLFF8zyoBnQ6IyRWIhXPp_eKDrZGFF6fTuj29r0xiNDh4Bx9G5hotGacIV1LuP0Dj1EB-qCbtQqPKogRoI3lRoI-8nvyzlkNcz4R-zsoBBSCeqn1iio1jMCAFC-lNsCIbpIiGLyPIMTSadAt71o7Zf5XjcXma-PF8nOYAmb5gm6NtCMUR2zNa5UTJh_oRbB8WBxORQ4bmXx85aiQf4zG81lSH_'
  }
];

export default function HeroBanner({ currentAuthor, onSelectAuthor }) {
  return (
    <div 
      className="relative bg-slate-950 text-white rounded-3xl p-7 sm:p-8 overflow-hidden shadow-dark-hero flex flex-col justify-between min-h-[360px] border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-2xl group/hero"
      id="hero-banner"
    >
      {/* Fundo com Textura & Gradiente Suave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-40 filter contrast-125 saturate-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-43354-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-amber-950/30" />
      </div>

      {/* Brilho Âmbar Sutil */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none hero-glow-pulse z-0" />

      {/* Retrato do Autor com Efeito de Mesclagem (mix-blend-luminosity) */}
      <div className="absolute -right-6 top-0 bottom-0 w-3/5 pointer-events-none z-0 overflow-hidden">
        <img 
          alt={`Retrato de ${currentAuthor.author}`}
          className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-70 mix-blend-luminosity transition-all duration-700 ease-out group-hover/hero:scale-105 group-hover/hero:opacity-85" 
          src={currentAuthor.img}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Conteúdo Tipográfico Superior do Banner */}
      <div className="relative z-10 max-w-[260px] sm:max-w-[280px]">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.1] uppercase transition-all duration-500">
          {currentAuthor.title}
        </h1>
        <p className="font-sans text-xs text-slate-300 mt-2 font-medium tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
          {currentAuthor.sub}
        </p>
      </div>

      {/* Contador Inferior */}
      <div className="relative z-10 pt-16">
        <p className="text-[11px] font-sans text-slate-400 font-normal transition-colors group-hover/hero:text-slate-300">
          {currentAuthor.count}
        </p>
      </div>

      {/* Barra Inferior de Avatares Redondos para Alternância */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
        {HERO_AUTHORS.map((item) => {
          const isActive = item.author === currentAuthor.author;
          return (
            <button
              key={item.author}
              onClick={() => onSelectAuthor(item)}
              className={
                isActive
                  ? "flex items-center gap-2 bg-slate-800/90 rounded-full pl-1 pr-3 py-1 border border-amber-400/80 shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-slate-700 focus:outline-none"
                  : "group/av relative w-8 h-8 rounded-full bg-slate-800 overflow-hidden shrink-0 border border-slate-700/60 hover:border-amber-400 transition-all duration-300 hover:scale-115 focus:outline-none cursor-pointer"
              }
              title={item.author}
            >
              <img 
                src={item.avatar} 
                alt={item.author}
                className={`w-full h-full object-cover ${isActive ? 'w-7 h-7 rounded-full object-top border border-amber-400' : 'filter grayscale sepia-[0.3] transition-transform duration-300 group-hover/av:scale-110'}`}
              />
              {isActive && (
                <span className="text-[11px] font-medium text-white tracking-wide">
                  {item.author}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

