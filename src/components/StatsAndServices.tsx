import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

const services = [
  {
    icon: "MessageCircle",
    title: "Бесплатная консультация",
    description: "Юрист оценит вашу ситуацию, объяснит перспективы дела и предложит стратегию — без предоплаты.",
    cta: "Получить консультацию",
    href: "#contact",
    accent: false,
  },
  {
    icon: "RotateCcw",
    title: "Помощь в возврате денег",
    description: "Подаём претензии в банк, заявления в ЦБ и прокуратуру. Оспариваем транзакции и добиваемся компенсации.",
    cta: "Вернуть деньги",
    href: "#contact",
    accent: true,
  },
  {
    icon: "Scale",
    title: "Защита в суде",
    description: "Представляем ваши интересы в судах всех инстанций. Доводим дело до исполнения решения.",
    cta: "Подать иск",
    href: "#contact",
    accent: false,
  },
];

export function StatsAndServices() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const billions = useCountUp(285, 2200, visible);
  const victims = useCountUp(1100000, 2000, visible);
  const percent = useCountUp(74, 1800, visible);

  return (
    <section className="relative z-10 pt-8 pb-24 md:pb-32">
      {/* Stats banner */}
      <div ref={ref} className="container max-w-5xl mx-auto mb-20">
        <div className="border border-destructive/30 rounded-xl p-8 md:p-12 bg-destructive/5 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-transparent pointer-events-none" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-destructive mb-6">
            Масштаб проблемы в России — 2025
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <div>
              <div className="font-sentient text-5xl md:text-6xl text-white mb-2">
                {billions} <span className="text-destructive">млрд</span>
              </div>
              <p className="font-mono text-sm text-foreground/60">
                рублей похищено у россиян за год
              </p>
            </div>
            <div>
              <div className="font-sentient text-5xl md:text-6xl text-white mb-2">
                {(victims / 1000000).toFixed(1)} <span className="text-destructive">млн</span>
              </div>
              <p className="font-mono text-sm text-foreground/60">
                пострадавших ежегодно обращаются в полицию
              </p>
            </div>
            <div>
              <div className="font-sentient text-5xl md:text-6xl text-white mb-2">
                {percent} <span className="text-destructive">%</span>
              </div>
              <p className="font-mono text-sm text-foreground/60">
                случаев — деньги можно вернуть при грамотной защите
              </p>
            </div>
          </div>
          <p className="font-mono text-xs text-foreground/40 mt-8">
            По данным ЦБ РФ, МВД России и независимых исследований, 2024–2025 гг.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Наши услуги
          </p>
          <h2 className="text-4xl md:text-5xl font-sentient">
            Как мы <i className="font-light">помогаем</i>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`group border rounded-xl p-7 flex flex-col gap-5 transition-all duration-300 ${
                s.accent
                  ? "border-primary/60 bg-primary/5 hover:bg-primary/10"
                  : "border-border/50 bg-black/40 hover:border-primary/30"
              } backdrop-blur-sm`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                s.accent ? "border-primary bg-primary/20" : "border-border/60 group-hover:border-primary/50"
              } transition-colors duration-300`}>
                <Icon name={s.icon as "Scale"} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-sentient text-xl mb-3">{s.title}</h3>
                <p className="font-mono text-sm text-foreground/60 leading-relaxed">{s.description}</p>
              </div>
              <a href={s.href}>
                <Button
                  variant={s.accent ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                >
                  [{s.cta}]
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
