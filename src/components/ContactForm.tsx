import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

export function ContactForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    amount: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.description) {
      toast({
        title: "Заполните обязательные поля",
        description: "Имя, телефон и описание ситуации обязательны.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://functions.poehali.dev/cbd934c0-09f7-4f77-9771-b91109a55085", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast({
        title: "Заявка отправлена!",
        description: "Наш юрист свяжется с вами в течение 24 часов.",
      });
      setForm({ name: "", phone: "", amount: "", description: "" });
    } catch {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте снова или напишите нам напрямую.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-24 md:py-32">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Бесплатная консультация
          </p>
          <h2 className="text-4xl md:text-5xl font-sentient">
            Оставьте{" "}
            <i className="font-light">заявку</i>
          </h2>
          <p className="font-mono text-sm text-foreground/60 mt-4 max-w-[400px] mx-auto">
            Опишите вашу ситуацию — профильный юрист свяжется с вами в течение 24 часов
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-border/50 rounded-lg p-8 bg-black/40 backdrop-blur-sm space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-foreground/60">
                Ваше имя *
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Иван Иванов"
                className="bg-transparent border-border/60 focus:border-primary/60 font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-foreground/60">
                Телефон *
              </label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+7 (999) 000-00-00"
                className="bg-transparent border-border/60 focus:border-primary/60 font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-foreground/60">
              Сумма ущерба (₽)
            </label>
            <Input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Например: 150 000"
              className="bg-transparent border-border/60 focus:border-primary/60 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-foreground/60">
              Опишите ситуацию *
            </label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Расскажите, что произошло: как вас обманули, когда это случилось, какие есть доказательства..."
              rows={5}
              className="bg-transparent border-border/60 focus:border-primary/60 font-mono resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Icon name="Loader2" size={16} className="animate-spin" />
                Отправляем...
              </span>
            ) : (
              "[Отправить заявку]"
            )}
          </Button>

          <p className="font-mono text-xs text-foreground/40 text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </div>
    </section>
  );
}