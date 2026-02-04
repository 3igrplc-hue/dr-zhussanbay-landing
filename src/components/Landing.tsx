"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Sparkles,
  ClipboardList,
  BadgeCheck,
  ArrowRight,
  Menu,
  X,
  Quote,
  Info,
} from "lucide-react";

type Lang = "ru" | "kz";

const phoneE164 = "77085824782"; // +7...
const phonePretty = "+7 708 582 47 82";

const whatsappLink = (lang: Lang) => {
  const text =
    lang === "ru"
      ? "Здравствуйте! Хочу записаться на консультацию к доктору Жусанбаю."
      : "Сәлеметсіз бе! Жусанбай дәрігерге қабылдауға жазылғым келеді.";
  return `https://wa.me/${phoneE164}?text=${encodeURIComponent(text)}`;
};

const telLink = `tel:+${phoneE164}`;

const copy = (lang: Lang) => {
  const ru = lang === "ru";
  return {
    langSwitch: ru ? { label: "KZ", href: "/kz" } : { label: "RU", href: "/ru" },

    eyebrow: ru ? "Уролог-андролог • Астана" : "Уролог-андролог • Астана",
    title: ru ? "Жусанбай Динмухамед" : "Жусанбай Дінмұхамед",
    subtitle: ru
      ? "Консультации и лечение для взрослых и детей. Аккуратный подход, конфиденциальность, понятный план действий."
      : "Ересектер мен балаларға кеңес және ем. Ұқыпты тәсіл, құпиялылық, нақты жоспар.",
    primaryCta: ru ? "Записаться в WhatsApp" : "WhatsApp арқылы жазылу",
    secondaryCta: ru ? "Позвонить" : "Қоңырау шалу",

    trustStats: ru
      ? [
          { k: "6 лет", v: "опыта в урологии" },
          { k: "10 000+", v: "обрезаний" },
          { k: "1000+", v: "успешных операций" },
          { k: "15 000+", v: "пациентов" },
        ]
      : [
          { k: "6 жыл", v: "тәжірибе" },
          { k: "10 000+", v: "сүндет" },
          { k: "1000+", v: "сәтті ота" },
          { k: "15 000+", v: "науқас" },
        ],

    nav: ru
      ? [
          ["#help", "Когда обратиться"],
          ["#services", "Услуги"],
          ["#process", "Как проходит приём"],
          ["#prep", "Подготовка"],
          ["#reviews", "Отзывы"],
          ["#prices", "Цены"],
          ["#clinic", "Клиника"],
          ["#faq", "FAQ"],
          ["#contact", "Контакты"],
        ]
      : [
          ["#help", "Қашан келу керек"],
          ["#services", "Қызметтер"],
          ["#process", "Қабылдау қалай өтеді"],
          ["#prep", "Дайындық"],
          ["#reviews", "Пікірлер"],
          ["#prices", "Бағалар"],
          ["#clinic", "Клиника"],
          ["#faq", "FAQ"],
          ["#contact", "Байланыс"],
        ],

    helpTitle: ru ? "Когда стоит обратиться" : "Қашан келу керек",
    helpLead: ru
      ? "Если что-то беспокоит — лучше уточнить у врача, чем терпеть и гадать."
      : "Алаңдататын белгі болса — созбай дәрігерге көрінген дұрыс.",
    symptomChips: ru
      ? [
          "снижение либидо",
          "бесплодие / планирование",
          "преждевременная эякуляция",
          "эректильная дисфункция",
          "частое/болезненное мочеиспускание",
          "простатит",
          "варикоцеле / гидроцеле",
          "аденома простаты",
          "изменение цвета мочи",
          "врождённые патологии",
        ]
      : [
          "құлшыныс төмендеуі",
          "бедеулік / бала жоспарлау",
          "тез бітіру (мезгілсіз эякуляция)",
          "эрекция әлсіздігі",
          "жақындыққа ниет жоқ",
          "кіші дәрет жиілеуі/ауырсынуы",
          "простатит",
          "варикоцеле / гидроцеле",
          "аденома",
          "туа біткен мәселе",
        ],

    whyTitle: ru ? "Почему выбирают" : "Неге таңдайды",
    whyCards: ru
      ? [
          {
            icon: ShieldCheck,
            t: "Конфиденциально и без осуждения",
            d: "Деликатные вопросы — нормально. Главное — решить проблему.",
          },
          {
            icon: ClipboardList,
            t: "Понятный план действий",
            d: "Объясняю просто: что это, почему, какие варианты и следующий шаг.",
          },
          {
            icon: BadgeCheck,
            t: "Опыт и практика",
            d: "Большой поток пациентов + хирургический опыт по показаниям.",
          },
          {
            icon: Clock,
            t: "Быстрая запись",
            d: "Через WhatsApp: время, подготовка, ответы на вопросы.",
          },
        ]
      : [
          {
            icon: ShieldCheck,
            t: "Құпия және кінәламай",
            d: "Нәзік тақырып — қалыпты. Мәселені дұрыс шешеміз.",
          },
          {
            icon: ClipboardList,
            t: "Нақты жоспар",
            d: "Себеп, нұсқа және келесі қадам — түсінікті.",
          },
          {
            icon: BadgeCheck,
            t: "Тәжірибе",
            d: "Науқас көп + көрсеткіш бойынша хирургиялық тәжірибе.",
          },
          {
            icon: Clock,
            t: "Жылдам жазылу",
            d: "WhatsApp: уақыт, дайындық, сұрақ-жауап.",
          },
        ],

    servicesTitle: ru ? "Услуги" : "Қызметтер",
    servicesLead: ru
      ? "Основные направления. Точный объём лечения и обследований определяется на консультации."
      : "Негізгі бағыттар. Нақты жоспар қабылдауда анықталады.",
    serviceGroups: ru
      ? [
          {
            name: "Для детей",
            icon: Stethoscope,
            items: ["Обрезание", "Крипторхизм", "Гипоспадия", "Скрытый половой член (СПЧ)", "Детские урологические жалобы"],
          },
          {
            name: "Для мужчин",
            icon: HeartPulse,
            items: [
              "Бесплодие и планирование",
              "Простатит и воспаления",
              "Сексуальные нарушения",
              "Гормональные вопросы (по показаниям)",
            ],
          },
          {
            name: "Операции",
            icon: Sparkles,
            items: ["Варикоцеле (в т.ч. микрохирургия)", "Гидроцеле", "Другие вмешательства по показаниям"],
          },
          {
            name: "Онлайн",
            icon: MessageCircle,
            items: ["Онлайн-консультация", "Разбор анализов/УЗИ", "План действий и рекомендации"],
          },
        ]
      : [
          {
            name: "Балаларға",
            icon: Stethoscope,
            items: ["Сүндеттеу", "Крипторхизм", "Гипоспадия", "Жасырын жыныс мүшесі (СПЧ)", "Балалар урологиялық шағымдары"],
          },
          {
            name: "Ерлерге",
            icon: HeartPulse,
            items: ["Бедеулік және жоспарлау", "Простатит және қабынулар", "Сексуальді бұзылыстар", "Гормон мәселелері (көрсеткіш бойынша)"],
          },
          {
            name: "Ота",
            icon: Sparkles,
            items: ["Варикоцеле (микрохирургия)", "Гидроцеле", "Басқа оталар (көрсеткіш бойынша)"],
          },
          {
            name: "Онлайн",
            icon: MessageCircle,
            items: ["Онлайн кеңес", "Анализ/УДЗ талдау", "Ұсыныс және жоспар"],
          },
        ],

    processTitle: ru ? "Как проходит приём" : "Қабылдау қалай өтеді",
    steps: ru
      ? [
          { k: "1", t: "Запись", d: "Пишете в WhatsApp → выбираем удобное время." },
          { k: "2", t: "Консультация", d: "Осмотр/разбор жалоб → первичная оценка." },
          { k: "3", t: "План", d: "Чёткий план действий: обследование/лечение/наблюдение." },
        ]
      : [
          { k: "1", t: "Жазылу", d: "WhatsApp → ыңғайлы уақытты таңдаймыз." },
          { k: "2", t: "Қабылдау", d: "Тексеру/шағым → бастапқы бағалау." },
          { k: "3", t: "Жоспар", d: "Нақты жоспар: тексеру/ем/бақылау." },
        ],

    prepTitle: ru ? "Подготовка к приёму" : "Қабылдауға дайындық",
    prepLead: ru
      ? "Чтобы консультация была максимально полезной — вот короткий чек-лист."
      : "Қабылдау тиімді болуы үшін қысқа чек-лист.",
    prepCards: ru
      ? [
          {
            t: "Что взять с собой",
            items: ["Если есть — анализы/УЗИ", "Список лекарств, которые принимаете", "Вопросы, которые хотите уточнить"],
          },
          {
            t: "Перед визитом",
            items: ["Кратко вспомните симптомы: когда началось, что усиливает/снижает", "Не стесняйтесь — это обычные медицинские вопросы", "Лучше прийти раньше на 5–10 минут"],
          },
          {
            t: "Онлайн-консультация",
            items: ["Хорошая связь и заряд телефона", "Файлы анализов/УЗИ (фото/сканы)", "Тихое место на 10–15 минут"],
          },
        ]
      : [
          {
            t: "Өзіңізбен алыңыз",
            items: ["Анализ/УДЗ болса — ала келіңіз", "Қабылдап жүрген дәрілер тізімі", "Сұрақтарыңызды жазып алыңыз"],
          },
          {
            t: "Келмес бұрын",
            items: ["Белгілер қашан басталды — қысқаша еске түсіріңіз", "Ұялуға болмайды — бұл медицина", "5–10 минут ертерек келіңіз"],
          },
          {
            t: "Онлайн кеңес",
            items: ["Байланыс жақсы болсын", "Анализ/УДЗ файлдары (фото)", "Тыныш жер (10–15 минут)"],
          },
        ],

    reviewsTitle: ru ? "Отзывы и кейсы" : "Пікірлер және кейстер",
    reviewsLead: ru
      ? "Показываем реальные материалы в Instagram: результаты, объяснения, ответы на вопросы."
      : "Instagram-та нақты материалдар: түсіндіру, сұрақ-жауап, нәтижелер.",
    reviewsCards: ru
      ? [
          { t: "Отзывы пациентов", d: "Смотрите подборку в актуальном «Отзывы»." },
          { t: "Разборы случаев", d: "Объяснения простым языком: причины и решения." },
          { t: "Вопрос–ответ", d: "Короткие видео: что делать и когда обращаться." },
        ]
      : [
          { t: "Науқас пікірлері", d: "«Отзывы/Пікірлер» актуалынан қараңыз." },
          { t: "Кейстер талдауы", d: "Себеп пен шешімді қарапайым тілмен түсіндіру." },
          { t: "Сұрақ–жауап", d: "Қысқа видео: не істеу керек және қашан келу керек." },
        ],
    instaBtn: ru ? "Открыть Instagram" : "Instagram ашу",

    pricesTitle: ru ? "Цены" : "Бағалар",
    priceCards: ru
      ? [
          { t: "Очная консультация", v: "10 000 тг", note: "AYANA Clinic" },
          { t: "Онлайн консультация", v: "10 000 тг", note: "WhatsApp/видео" },
        ]
      : [
          { t: "Оффлайн консультация", v: "10 000 тг", note: "AYANA clinic" },
          { t: "Онлайн консультация", v: "10 000 тг", note: "WhatsApp/видео" },
        ],
    includedTitle: ru ? "Что вы получите" : "Не аласыз",
    included: ru
      ? ["Понимание причины и рисков", "Варианты решения и рекомендации", "Следующий шаг: анализы/УЗИ/наблюдение"]
      : ["Себеп пен тәуекел түсінігі", "Шешім нұсқалары", "Келесі қадам: анализ/УДЗ/бақылау"],

    clinicTitle: ru ? "Клиника" : "Клиника",
    address: ru ? "AYANA Clinic, Ұлы Дала 45/1, Астана" : "AYANA clinic, Ұлы Дала 45/1, Астана",
    hours: ru ? "Ежедневно 9:00–20:00" : "Күн сайын 9:00–20:00",
    mapBtn: ru ? "Открыть в 2GIS" : "2GIS картадан ашу",
    mapLink: "https://2gis.kz/astana/geo/70000001101491610",

    faqTitle: "FAQ",
    faq: ru
      ? [
          ["Как записаться?", "Напишите в WhatsApp — подберём удобное время."],
          ["Можно онлайн?", "Да. Разбираем ситуацию и даём план действий."],
          ["Если нужна операция?", "Расскажу показания, этапы и подготовку."],
          ["Что взять на приём?", "Если есть анализы/УЗИ — возьмите с собой."],
          ["Конфиденциальность?", "Да. Медицинская тайна соблюдается."],
        ]
      : [
          ["Қалай жазыламын?", "WhatsApp-қа жазыңыз — уақыт таңдаймыз."],
          ["Онлайн бола ма?", "Иә. Талдап, жоспар ұсынамыз."],
          ["Ота қажет болса?", "Көрсеткіш, кезең, дайындықты түсіндіремін."],
          ["Қабылдауға не керек?", "Анализ/УДЗ болса, алып келіңіз."],
          ["Құпиялылық?", "Иә. Медициналық құпия сақталады."],
        ],

    contactTitle: ru ? "Контакты" : "Байланыс",
    disclaimer: ru
      ? "Информация на сайте не заменяет очный приём. Диагноз ставится врачом."
      : "Сайттағы ақпарат қабылдауды алмастырмайды. Диагноз қабылдауда қойылады.",
  };
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

function Section({
  id,
  tone = "plain",
  children,
}: {
  id?: string;
  tone?: "plain" | "soft";
  children: React.ReactNode;
}) {
  // Soft sections: add a subtle medical-tint gradient instead of pure white
  const bg =
    tone === "soft"
      ? "bg-gradient-to-b from-sky-50/60 via-white to-white"
      : "bg-white";
  return (
    <section id={id} className={`border-t ${bg}`}>
      <Container>
        <div className="py-12 md:py-16 anim-fadeUp">{children}</div>
      </Container>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm text-slate-700 shadow-sm">
      <CheckCircle2 className="h-4 w-4 text-sky-700" />
      {children}
    </span>
  );
}

export default function Landing({ lang }: { lang: Lang }) {
  const s = copy(lang);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-700 to-sky-900" />
              <div className="leading-tight">
                <div className="text-sm font-semibold">{s.title}</div>
                <div className="text-xs text-slate-600">{s.eyebrow}</div>
              </div>
            </div>

            <nav className="hidden items-center gap-4 text-sm text-slate-700 md:flex">
              {s.nav.map(([href, label]) => (
                <a key={href} href={href} className="hover:text-slate-950">
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={s.langSwitch.href}
                className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                aria-label="Switch language"
              >
                {s.langSwitch.label}
              </a>

              <a
                href={whatsappLink(lang)}
                className="hidden rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 sm:inline-flex"
              >
                {s.primaryCta}
              </a>

              {/* Burger (mobile) */}
              <button
                onClick={() => setOpen(true)}
                className="inline-flex rounded-xl border p-2 hover:bg-slate-50 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <div className="text-sm font-semibold">{s.title}</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border p-2 hover:bg-slate-50"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <a
                href={whatsappLink(lang)}
                className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-700 px-4 py-3 font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                {s.primaryCta}
              </a>

              <div className="grid gap-2">
                {s.nav.map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute -left-40 top-[-160px] h-[380px] w-[380px] rounded-full bg-sky-100 blur-3xl" />
        <div className="absolute -right-40 top-[-180px] h-[420px] w-[420px] rounded-full bg-sky-100 blur-3xl" />

        <Container>
          <div className="py-10 md:py-14">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="order-2 anim-fadeUp md:order-1">
                <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm text-slate-700 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-sky-700" />
                  <span>{s.eyebrow}</span>
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                  {s.title}
                </h1>

                <p className="mt-4 text-lg text-slate-700 md:text-xl">
                  {s.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>{s.trustStats[0].k + " — " + s.trustStats[0].v}</Pill>
                  <Pill>{s.trustStats[1].k + " — " + s.trustStats[1].v}</Pill>
                  <Pill>{s.trustStats[2].k + " — " + s.trustStats[2].v}</Pill>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappLink(lang)}
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white shadow-sm hover:opacity-90"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {s.primaryCta}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href={telLink}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border bg-white px-6 py-3 font-semibold hover:bg-slate-50"
                  >
                    <Phone className="h-5 w-5" />
                    {s.secondaryCta}
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {s.hours}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {s.address}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 rounded-3xl border bg-white p-5 shadow-sm sm:grid-cols-2">
                  {s.trustStats.map((x) => (
                    <div key={x.k} className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-2xl font-bold">{x.k}</div>
                      <div className="mt-1 text-sm text-slate-700">{x.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl border bg-white p-4 text-sm text-slate-700 shadow-sm">
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-4 w-4 text-sky-700" />
                    <span>
                      {lang === "ru"
                        ? "Запись занимает ~1 минуту. Напишите в WhatsApp — и мы подберём удобное время."
                        : "Жазылу ~1 минут. WhatsApp-қа жазыңыз — уақыт таңдаймыз."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative order-1 anim-fadeUp md:order-2">
                <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-b from-sky-200/40 to-white" />
                <div className="relative overflow-hidden rounded-[28px] border bg-slate-50 shadow-sm">
                  <Image
                    src="/images/doctor-hero.jpg"
                    alt="Doctor photo"
                    width={1200}
                    height={1500}
                    priority
                    className="h-[520px] w-full object-cover md:h-[680px]"
                  />
                  <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <BadgeCheck className="h-4 w-4 text-sky-700" />
                      {lang === "ru" ? "Профессионально • Безопасно" : "Кәсіби • Қауіпсіз"}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      {lang === "ru" ? "Конфиденциальность соблюдается" : "Құпиялылық сақталады"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating WhatsApp (desktop) */}
            <a
              href={whatsappLink(lang)}
              className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-2xl bg-sky-700 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 md:inline-flex"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </Container>
      </section>

      {/* HELP */}
      <Section id="help" tone="soft">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.helpTitle}</h2>
            <p className="mt-3 text-slate-700">{s.helpLead}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {s.symptomChips.map((x) => (
                <span key={x} className="rounded-full border bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
                  {x}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-2xl bg-sky-700 p-2 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{lang === "ru" ? "Важно" : "Маңызды"}</div>
                  <div className="mt-1 text-sm text-slate-700">
                    {lang === "ru"
                      ? "Самолечение и затягивание могут ухудшать состояние. Лучше уточнить у врача и получить план."
                      : "Өзін-өзі емдеу және созу жағдайды қиындатуы мүмкін. Дәрігерден нақты жоспар алыңыз."}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a href={whatsappLink(lang)} className="inline-flex items-center gap-2 rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white hover:opacity-90">
                <MessageCircle className="h-5 w-5" />
                {s.primaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold">{s.whyTitle}</h3>
            <div className="mt-5 grid gap-4">
              {s.whyCards.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.t} className="rounded-3xl border bg-slate-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-white p-2 shadow-sm">
                        <Icon className="h-5 w-5 text-sky-700" />
                      </div>
                      <div>
                        <div className="font-semibold">{c.t}</div>
                        <div className="mt-1 text-sm text-slate-700">{c.d}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-r from-sky-700 to-sky-900 p-5 text-white">
              <div className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-5 w-5" />
                {lang === "ru" ? "Запись: быстро и удобно" : "Жазылу: тез әрі ыңғайлы"}
              </div>
              <div className="mt-1 text-sm text-white/85">
                {lang === "ru"
                  ? "Напишите в WhatsApp — уточним время и подготовку."
                  : "WhatsApp-қа жазыңыз — уақыт пен дайындықты нақтылаймыз."}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.servicesTitle}</h2>
        <p className="mt-3 text-slate-700">{s.servicesLead}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {s.serviceGroups.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.name} className="rounded-[28px] border bg-white p-7 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-700 p-2 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xl font-bold">{g.name}</div>
                </div>
                <ul className="mt-5 space-y-3">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-slate-800">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-700" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" tone="soft">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.processTitle}</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {s.steps.map((st) => (
            <div key={st.k} className="rounded-[28px] border bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-700 text-white">
                  <span className="text-lg font-bold">{st.k}</span>
                </div>
                <div className="text-xl font-bold">{st.t}</div>
              </div>
              <div className="mt-3 text-slate-700">{st.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* PREP */}
      <Section id="prep">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.prepTitle}</h2>
        <p className="mt-3 text-slate-700">{s.prepLead}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {s.prepCards.map((c) => (
            <div key={c.t} className="rounded-[28px] border bg-white p-7 shadow-sm">
              <div className="text-xl font-bold">{c.t}</div>
              <ul className="mt-4 space-y-3">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-slate-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-700" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border bg-slate-50 p-7 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-2xl bg-sky-700 p-2 text-white">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">
                {lang === "ru" ? "Если сомневаетесь — напишите заранее" : "Күмән болса — алдын ала жазыңыз"}
              </div>
              <div className="mt-1 text-sm text-slate-700">
                {lang === "ru"
                  ? "Можно отправить краткое описание симптомов — подскажем, что подготовить."
                  : "Белгілерді қысқаша жазсаңыз — не дайындау керегін айтамыз."}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <a href={whatsappLink(lang)} className="inline-flex items-center gap-2 rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white hover:opacity-90">
              <MessageCircle className="h-5 w-5" />
              {s.primaryCta}
            </a>
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" tone="soft">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.reviewsTitle}</h2>
        <p className="mt-3 text-slate-700">{s.reviewsLead}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {s.reviewsCards.map((c) => (
            <div key={c.t} className="rounded-[28px] border bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2">
                <Quote className="h-5 w-5 text-sky-700" />
                <div className="text-xl font-bold">{c.t}</div>
              </div>
              <div className="mt-3 text-slate-700">{c.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://www.instagram.com/dr.zhussanbay"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            <ArrowRight className="h-5 w-5" />
            {s.instaBtn}
          </a>

          <div className="rounded-2xl border bg-white px-5 py-3 text-sm text-slate-700 shadow-sm">
            {lang === "ru"
              ? "Совет: добавьте в Instagram актуальное «Отзывы» — это резко повышает доверие."
              : "Кеңес: Instagram-да «Отзывы/Пікірлер» актуалын жасаңыз — сенім өседі."}
          </div>
        </div>
      </Section>

      {/* PRICES */}
      <Section id="prices">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.pricesTitle}</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {s.priceCards.map((p) => (
            <div key={p.t} className="rounded-[28px] border bg-white p-8 shadow-sm">
              <div className="text-lg font-semibold text-slate-900">{p.t}</div>
              <div className="mt-3 text-4xl font-bold">{p.v}</div>
              <div className="mt-2 text-sm text-slate-600">{p.note}</div>
              <a
                href={whatsappLink(lang)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" />
                {s.primaryCta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[28px] border bg-slate-50 p-8 shadow-sm">
          <div className="text-xl font-bold">{s.includedTitle}</div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {s.included.map((x) => (
              <div key={x} className="rounded-3xl border bg-white p-5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-700" />
                  <div className="text-slate-800">{x}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CLINIC */}
      <Section id="clinic" tone="soft">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.clinicTitle}</h2>

            <div className="mt-5 rounded-[28px] border bg-white p-7 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-2xl bg-sky-700 p-2 text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{s.address}</div>
                  <div className="mt-1 text-sm text-slate-700">{s.hours}</div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={s.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl border bg-white px-6 py-3 font-semibold hover:bg-slate-50"
                    >
                      <MapPin className="h-5 w-5" />
                      {s.mapBtn}
                    </a>
                    <a
                      href={whatsappLink(lang)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white hover:opacity-90"
                    >
                      <MessageCircle className="h-5 w-5" />
                      {s.primaryCta}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 text-sm text-slate-600">
              {lang === "ru"
                ? "Если нужно — подскажем, как подготовиться к приёму."
                : "Қажет болса, қабылдауға қалай дайындалу керегін айтамыз."}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border bg-white shadow-sm">
            <Image
              src="/images/clinic.jpg"
              alt="Clinic photo"
              width={1400}
              height={900}
              className="h-[360px] w-full object-cover md:h-[520px]"
            />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.faqTitle}</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {s.faq.map(([q, a]) => (
            <details key={q} className="rounded-[28px] border bg-white p-6 shadow-sm">
              <summary className="cursor-pointer text-base font-semibold">{q}</summary>
              <div className="mt-2 text-slate-700">{a}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" tone="soft">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.contactTitle}</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border bg-white p-7 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">
              {lang === "ru" ? "Телефон / WhatsApp" : "Телефон / WhatsApp"}
            </div>
            <div className="mt-2 text-xl font-bold">{phonePretty}</div>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href={whatsappLink(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" />
                {s.primaryCta}
              </a>
              <a
                href={telLink}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border bg-white px-6 py-3 font-semibold hover:bg-slate-50"
              >
                <Phone className="h-5 w-5" />
                {s.secondaryCta}
              </a>
            </div>

            <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 text-sky-700" />
                <span>{s.disclaimer}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border bg-white p-7 shadow-sm md:col-span-2">
            <div className="text-sm font-semibold text-slate-500">Instagram</div>
            <a
              href="https://www.instagram.com/dr.zhussanbay"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-xl font-bold underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
            >
              @dr.zhussanbay <ArrowRight className="h-5 w-5" />
            </a>

            <div className="mt-5 text-xs text-slate-500">
              © {new Date().getFullYear()} {s.title}
            </div>
          </div>
        </div>
      </Section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/90 p-3 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-6xl gap-2 px-1">
          <a
            href={whatsappLink(lang)}
            className="flex-1 rounded-2xl bg-sky-700 px-4 py-3 text-center font-semibold text-white"
          >
            WhatsApp
          </a>
          <a
            href={telLink}
            className="flex-1 rounded-2xl border bg-white px-4 py-3 text-center font-semibold"
          >
            {lang === "ru" ? "Звонок" : "Қоңырау"}
          </a>
        </div>
      </div>

      <div className="h-20 sm:hidden" />
    </div>
  );
}
