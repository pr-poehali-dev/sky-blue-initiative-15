import Icon from "@/components/ui/icon";

const stories = [
  {
    tag: "Телефонное мошенничество",
    amount: "1 200 000 ₽",
    returned: true,
    text: "Пенсионерка перевела деньги «сотруднику ФСБ». Мы оспорили транзакции через ЦБ, доказали факт социальной инженерии и добились полного возврата через суд.",
    duration: "4 месяца",
    city: "Москва",
  },
  {
    tag: "Фейковые инвестиции",
    amount: "830 000 ₽",
    returned: true,
    text: "Клиент вложил деньги в «брокера», копирующего интерфейс «Газпром Инвестиции». Заблокировали счета мошенников, взыскали ущерб и судебные расходы.",
    duration: "6 месяцев",
    city: "Санкт-Петербург",
  },
  {
    tag: "Фишинг Госуслуги",
    amount: "340 000 ₽",
    returned: true,
    text: "Мошенники получили доступ к аккаунту и оформили кредит. Признали сделку недействительной, банк списал долг, частично вернули похищенные средства.",
    duration: "3 месяца",
    city: "Екатеринбург",
  },
  {
    tag: "Кредит «под давлением»",
    amount: "560 000 ₽",
    returned: true,
    text: "Клиент под психологическим давлением оформил кредит и перевёл деньги. Оспорили кабальную сделку, добились расторжения кредитного договора.",
    duration: "5 месяцев",
    city: "Казань",
  },
];

export function SuccessStories() {
  return (
    <section id="stories" className="relative z-10 py-24 md:py-32">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Реальные результаты
          </p>
          <h2 className="text-4xl md:text-5xl font-sentient">
            Истории <i className="font-light">успеха</i>
          </h2>
          <p className="font-mono text-sm text-foreground/60 mt-4 max-w-[440px] mx-auto">
            Все данные обезличены. Имена и детали изменены по согласию клиентов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((s, i) => (
            <div
              key={i}
              className="group border border-border/50 rounded-xl p-7 bg-black/40 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {s.tag}
                </span>
                {s.returned && (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-green-400">
                    <Icon name="CheckCircle2" size={14} />
                    Возврат
                  </span>
                )}
              </div>

              <div className="font-sentient text-3xl text-white">
                {s.amount}
              </div>

              <p className="font-mono text-sm text-foreground/60 leading-relaxed flex-1">
                {s.text}
              </p>

              <div className="flex items-center gap-6 pt-2 border-t border-border/30">
                <span className="flex items-center gap-1.5 font-mono text-xs text-foreground/40">
                  <Icon name="Clock" size={13} />
                  {s.duration}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-foreground/40">
                  <Icon name="MapPin" size={13} />
                  {s.city}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-mono text-sm text-foreground/40">
            За 2024–2025 год наши юристы помогли вернуть более{" "}
            <span className="text-primary">47 млн рублей</span>{" "}
            пострадавшим от мошенников
          </p>
        </div>
      </div>
    </section>
  );
}
