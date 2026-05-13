import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const fraudTypes = [
  { value: "phone_bank", label: "Звонок из «банка»/МВД/ФСБ", baseChance: 62 },
  { value: "phishing", label: "Фишинг / кража аккаунта", baseChance: 55 },
  { value: "fake_investment", label: "Фейковые инвестиции / брокер", baseChance: 48 },
  { value: "marketplace", label: "Обман на маркетплейсе", baseChance: 71 },
  { value: "crypto", label: "Крипто-пирамида", baseChance: 38 },
  { value: "fake_shop", label: "Фейковый интернет-магазин", baseChance: 65 },
];

const amountRanges = [
  { value: "under_50k", label: "До 50 000 ₽", modifier: +5 },
  { value: "50k_300k", label: "50 000 — 300 000 ₽", modifier: +8 },
  { value: "300k_1m", label: "300 000 — 1 000 000 ₽", modifier: +12 },
  { value: "over_1m", label: "Более 1 000 000 ₽", modifier: +15 },
];

const timeRanges = [
  { value: "1day", label: "В тот же день", modifier: +20 },
  { value: "3days", label: "В течение 3 дней", modifier: +12 },
  { value: "week", label: "В течение недели", modifier: +5 },
  { value: "month", label: "В течение месяца", modifier: -5 },
  { value: "later", label: "Позже месяца", modifier: -15 },
];

const evidences = [
  { value: "screenshots", label: "Скриншоты переписки", modifier: +8 },
  { value: "receipts", label: "Квитанции о переводе", modifier: +10 },
  { value: "police", label: "Заявление в полицию", modifier: +12 },
  { value: "recordings", label: "Записи звонков", modifier: +15 },
];

type Step = 1 | 2 | 3 | 4 | "result";

export function Calculator() {
  const [step, setStep] = useState<Step>(1);
  const [fraudType, setFraudType] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);

  const toggleEvidence = (val: string) => {
    setSelectedEvidence(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const calcChance = () => {
    const base = fraudTypes.find(f => f.value === fraudType)?.baseChance ?? 50;
    const amountMod = amountRanges.find(a => a.value === amount)?.modifier ?? 0;
    const timeMod = timeRanges.find(t => t.value === time)?.modifier ?? 0;
    const evidenceMod = selectedEvidence.reduce((acc, ev) => {
      return acc + (evidences.find(e => e.value === ev)?.modifier ?? 0);
    }, 0);
    return Math.min(Math.max(base + amountMod + timeMod + evidenceMod, 12), 94);
  };

  const chance = step === "result" ? calcChance() : 0;

  const getChanceColor = (c: number) => {
    if (c >= 65) return "text-green-400";
    if (c >= 40) return "text-primary";
    return "text-destructive";
  };

  const getChanceLabel = (c: number) => {
    if (c >= 65) return "Высокие шансы на возврат";
    if (c >= 40) return "Умеренные шансы — стоит попробовать";
    return "Сложное дело, но есть варианты";
  };

  const reset = () => {
    setStep(1);
    setFraudType("");
    setAmount("");
    setTime("");
    setSelectedEvidence([]);
  };

  return (
    <section id="calculator" className="relative z-10 py-24 md:py-32">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Бесплатная оценка
          </p>
          <h2 className="text-4xl md:text-5xl font-sentient">
            Калькулятор <i className="font-light">шансов</i>
          </h2>
          <p className="font-mono text-sm text-foreground/60 mt-4 max-w-[420px] mx-auto">
            Оцените вероятность возврата денег за 1 минуту — на основе 4 000+ судебных решений
          </p>
        </div>

        <div className="border border-border/50 rounded-xl bg-black/40 backdrop-blur-sm overflow-hidden">
          {/* Progress */}
          {step !== "result" && (
            <div className="flex border-b border-border/30">
              {([1, 2, 3, 4] as const).map(n => (
                <div
                  key={n}
                  className={`flex-1 h-1 transition-colors duration-300 ${
                    n <= (step as number) ? "bg-primary" : "bg-border/30"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="p-8">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-1">Шаг 1 из 4</p>
                  <h3 className="font-sentient text-2xl mb-5">Какой вид мошенничества?</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {fraudTypes.map(f => (
                    <button
                      key={f.value}
                      onClick={() => { setFraudType(f.value); setStep(2); }}
                      className={`text-left px-5 py-3.5 rounded-lg border font-mono text-sm transition-all duration-200 ${
                        fraudType === f.value
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/40 text-foreground/60 hover:border-primary/40 hover:text-foreground/90"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-1">Шаг 2 из 4</p>
                  <h3 className="font-sentient text-2xl mb-5">Сумма ущерба?</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {amountRanges.map(a => (
                    <button
                      key={a.value}
                      onClick={() => { setAmount(a.value); setStep(3); }}
                      className={`text-left px-5 py-3.5 rounded-lg border font-mono text-sm transition-all duration-200 ${
                        amount === a.value
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/40 text-foreground/60 hover:border-primary/40 hover:text-foreground/90"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="font-mono text-xs text-foreground/40 hover:text-foreground/60 flex items-center gap-1.5 mt-2">
                  <Icon name="ArrowLeft" size={13} /> Назад
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-1">Шаг 3 из 4</p>
                  <h3 className="font-sentient text-2xl mb-5">Как быстро обратились в банк?</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {timeRanges.map(t => (
                    <button
                      key={t.value}
                      onClick={() => { setTime(t.value); setStep(4); }}
                      className={`text-left px-5 py-3.5 rounded-lg border font-mono text-sm transition-all duration-200 ${
                        time === t.value
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/40 text-foreground/60 hover:border-primary/40 hover:text-foreground/90"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="font-mono text-xs text-foreground/40 hover:text-foreground/60 flex items-center gap-1.5 mt-2">
                  <Icon name="ArrowLeft" size={13} /> Назад
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-1">Шаг 4 из 4</p>
                  <h3 className="font-sentient text-2xl mb-2">Какие есть доказательства?</h3>
                  <p className="font-mono text-sm text-foreground/40 mb-5">Выберите всё, что у вас есть</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {evidences.map(e => (
                    <button
                      key={e.value}
                      onClick={() => toggleEvidence(e.value)}
                      className={`text-left px-5 py-3.5 rounded-lg border font-mono text-sm transition-all duration-200 flex items-center justify-between ${
                        selectedEvidence.includes(e.value)
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/40 text-foreground/60 hover:border-primary/40 hover:text-foreground/90"
                      }`}
                    >
                      {e.label}
                      {selectedEvidence.includes(e.value) && (
                        <Icon name="Check" size={14} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(3)} className="font-mono text-xs text-foreground/40 hover:text-foreground/60 flex items-center gap-1.5">
                    <Icon name="ArrowLeft" size={13} /> Назад
                  </button>
                  <Button className="flex-1" onClick={() => setStep("result")}>
                    [Рассчитать шансы]
                  </Button>
                </div>
              </div>
            )}

            {step === "result" && (
              <div className="text-center space-y-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">
                    Предварительная оценка
                  </p>
                  <div className={`font-sentient text-8xl mb-3 ${getChanceColor(chance)}`}>
                    {chance}%
                  </div>
                  <p className={`font-mono text-sm font-semibold ${getChanceColor(chance)}`}>
                    {getChanceLabel(chance)}
                  </p>
                </div>

                <div className="w-full bg-border/20 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      chance >= 65 ? "bg-green-400" : chance >= 40 ? "bg-primary" : "bg-destructive"
                    }`}
                    style={{ width: `${chance}%` }}
                  />
                </div>

                <p className="font-mono text-sm text-foreground/60 max-w-[360px] mx-auto leading-relaxed">
                  Это предварительная оценка на основе похожих дел. Точный прогноз даст юрист после изучения деталей.
                </p>

                <div className="space-y-3 pt-2">
                  <a href="#contact">
                    <Button className="w-full">[Получить бесплатную консультацию юриста]</Button>
                  </a>
                  <button
                    onClick={reset}
                    className="font-mono text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    Пройти заново
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
