import Icon from "@/components/ui/icon";

const steps = [
  {
    number: "01",
    icon: "FileText",
    title: "Опишите ситуацию",
    description:
      "Заполните короткую форму: расскажите, что произошло, укажите сумму ущерба и контакты. Это займёт не более 5 минут.",
  },
  {
    number: "02",
    icon: "UserCheck",
    title: "Получите юриста",
    description:
      "Система подберёт профильного адвоката с опытом в вашем типе дела. Он свяжется с вами в течение 24 часов.",
  },
  {
    number: "03",
    icon: "ShieldCheck",
    title: "Начните защиту",
    description:
      "Юрист оценит перспективы дела, поможет собрать доказательства и представит ваши интересы в суде или переговорах.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative z-10 py-24 md:py-32">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Для пострадавших
          </p>
          <h2 className="text-4xl md:text-5xl font-sentient">
            Как это{" "}
            <i className="font-light">работает</i>
          </h2>
          <p className="font-mono text-sm text-foreground/60 mt-4 max-w-[440px] mx-auto">
            Три простых шага от обращения до начала защиты ваших прав
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%_-_16px)] w-8 h-px bg-border z-10" />
              )}

              <div className="border border-border/50 rounded-lg p-6 bg-black/40 backdrop-blur-sm hover:border-primary/40 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-4xl font-bold text-foreground/10">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-300">
                    <Icon name={step.icon as "FileText"} size={18} className="text-primary" />
                  </div>
                </div>
                <h3 className="font-sentient text-xl mb-3">{step.title}</h3>
                <p className="font-mono text-sm text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
