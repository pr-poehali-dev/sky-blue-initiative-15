import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const categories = ["Все схемы", "Телефон и звонки", "Интернет и фишинг", "Инвестиции", "Онлайн-торговля"];

const frauds = [
  {
    category: "Телефон и звонки",
    slug: "sluzhba-bezopasnosti-banka",
    title: "Звонок из «службы безопасности банка»",
    description: "Мошенники представляются сотрудниками банка и сообщают о «подозрительной операции». Убеждают перевести деньги на «защищённый счёт».",
    signs: ["Звонок с незнакомого номера", "Просят назвать CVV или код из SMS", "Торопят и создают панику"],
    cases: "2 400+ дел в 2024 году",
    icon: "Phone",
  },
  {
    category: "Телефон и звонки",
    slug: "sotrudnik-mvd-fsb",
    title: "«Сотрудник МВД» или ФСБ",
    description: "Звонят якобы из силовых структур, сообщают об «уголовном деле» или «утечке данных». Требуют денег для «закрытия дела».",
    signs: ["Угрозы уголовной ответственностью", "Требование секретности", "Просят снять наличные"],
    cases: "1 800+ дел в 2024 году",
    icon: "ShieldAlert",
  },
  {
    category: "Интернет и фишинг",
    slug: "fishing-gosuslugi",
    title: "Фишинговая ссылка от «Госуслуг»",
    description: "Приходит SMS или письмо со ссылкой на поддельный сайт Госуслуг. После ввода логина и пароля мошенники захватывают аккаунт и берут кредиты.",
    signs: ["Домен не gosuslugi.ru", "Запрос пароля в SMS", "Срочность: «аккаунт заблокирован»"],
    cases: "3 100+ дел в 2024 году",
    icon: "Link",
  },
  {
    category: "Интернет и фишинг",
    slug: "internet-magazin-obman",
    title: "Фейковый интернет-магазин",
    description: "Создаётся сайт-копия известного магазина или маркетплейса с невероятными скидками. После оплаты товар не приходит.",
    signs: ["Цены ниже рыночных в 2–3 раза", "Оплата только переводом на карту", "Нет реквизитов юрлица"],
    cases: "5 600+ дел в 2024 году",
    icon: "ShoppingCart",
  },
  {
    category: "Инвестиции",
    slug: "fejkovyj-broker-gazprom",
    title: "Инвестиции в фейковый «Газпром» или «Сбер»",
    description: "Создаётся сайт, копирующий бренд крупной компании. Обещают сверхдоходность. После внесения денег «брокер» исчезает.",
    signs: ["Гарантированная прибыль 30%+ в месяц", "Просят «налог» для вывода средств", "Нет лицензии ЦБ"],
    cases: "2 200+ дел в 2024 году",
    icon: "TrendingUp",
  },
  {
    category: "Инвестиции",
    slug: "kripto-piramida",
    title: "Крипто-пирамида",
    description: "Предлагают вложить деньги в «уникальный криптопроект» или «майнинг-пул». Первые вкладчики получают выплаты, остальные теряют всё.",
    signs: ["Реферальные программы с огромными %", "Нет прозрачности алгоритма", "Давление «только сегодня»"],
    cases: "1 400+ дел в 2024 году",
    icon: "Bitcoin",
  },
  {
    category: "Онлайн-торговля",
    slug: "avito-predoplata",
    title: "Обман с предоплатой на Авито/Юле",
    description: "Продавец просит предоплату или «залог» под предлогом брони. После перевода исчезает или отправляет не тот товар.",
    signs: ["Требование перевода вне платформы", "Отказ встретиться лично", "Спешка и давление"],
    cases: "8 900+ дел в 2024 году",
    icon: "Package",
  },
  {
    category: "Онлайн-торговля",
    slug: "falshivye-bilety",
    title: "Фальшивые билеты и путёвки",
    description: "Продают поддельные билеты на концерты, спектакли или туристические путёвки. Жертва обнаруживает обман только на кассе.",
    signs: ["Цена ниже официальной", "Нет чека и договора", "Продажа через личные мессенджеры"],
    cases: "1 200+ дел в 2024 году",
    icon: "Ticket",
  },
];

export default function FraudTypes() {
  const [activeCategory, setActiveCategory] = useState("Все схемы");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeCategory === "Все схемы"
    ? frauds
    : frauds.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="fixed z-50 pt-8 top-0 left-0 w-full">
        <header className="flex items-center justify-between container">
          <Link to="/" className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
          <Link to="/#contact">
            <Button size="sm">[Получить помощь]</Button>
          </Link>
        </header>
      </div>

      <div className="container max-w-5xl mx-auto pt-32 pb-24">
        {/* Hero */}
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            SEO-каталог · Виды мошенничества
          </p>
          <h1 className="text-4xl md:text-6xl font-sentient mb-6">
            Популярные схемы <br />
            <i className="font-light">обмана в России</i>
          </h1>
          <p className="font-mono text-sm text-foreground/60 max-w-[500px] leading-relaxed">
            Если вы стали жертвой одной из схем — знайте: деньги можно вернуть. Ознакомьтесь с вашей ситуацией и получите бесплатную консультацию.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors duration-200 ${
                activeCategory === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 text-foreground/50 hover:border-primary/40 hover:text-foreground/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((fraud) => (
            <div
              key={fraud.slug}
              className="border border-border/50 rounded-xl bg-black/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === fraud.slug ? null : fraud.slug)}
                className="w-full text-left p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={fraud.icon as "Phone"} size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs text-foreground/40 uppercase tracking-widest">
                        {fraud.category}
                      </span>
                      <Icon
                        name={expanded === fraud.slug ? "ChevronUp" : "ChevronDown"}
                        size={16}
                        className="text-foreground/40 flex-shrink-0"
                      />
                    </div>
                    <h3 className="font-sentient text-lg leading-snug">{fraud.title}</h3>
                    <p className="font-mono text-xs text-destructive/80 mt-2">{fraud.cases}</p>
                  </div>
                </div>
              </button>

              {expanded === fraud.slug && (
                <div className="px-6 pb-6 border-t border-border/30 pt-5 space-y-4">
                  <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                    {fraud.description}
                  </p>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Признаки мошенничества
                    </p>
                    <ul className="space-y-2">
                      {fraud.signs.map((sign, i) => (
                        <li key={i} className="flex items-start gap-2 font-mono text-sm text-foreground/60">
                          <Icon name="AlertTriangle" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/#contact">
                    <Button size="sm" className="w-full mt-2">
                      [Попал в эту ситуацию — получить помощь]
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
