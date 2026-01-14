import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX, FiMapPin, FiClock, FiPhone } from "react-icons/fi";

// Images
import logoImg from "../assets/logo.jpeg";
import heroImg from "../assets/hero.jpg";
import g1 from "../assets/g1.jpeg";
import g2 from "../assets/g2.jpeg";
import g3 from "../assets/g3.jpeg";
import g4 from "../assets/g4.jpeg";
import g5 from "../assets/g5.jpeg";

const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";
const sectionPad = "py-14 sm:py-16";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: "easeOut" },
  }),
};

const pop = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.99, y: 10, transition: { duration: 0.18 } },
};

function LangSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language || "de";

  return (
    <select
      value={current}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-neutral-800 shadow-sm"
      aria-label="Language"
    >
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  );
}

function Button({ children, href, variant = "primary", className = "" }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-neutral-950 text-white hover:bg-neutral-800 focus:ring-neutral-950 focus:ring-offset-white"
      : "bg-white/85 text-neutral-900 hover:bg-white ring-1 ring-black/10 focus:ring-white focus:ring-offset-neutral-950";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm ring-1 ring-black/10">
      {children}
    </span>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-neutral-600">{subtitle}</p> : null}
    </div>
  );
}

function ItemCard({ item, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={index}
      className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-neutral-900">{item.name}</div>
            {item.tag ? (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-bold text-neutral-900 ring-1 ring-black/10"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,146,70,0.16), rgba(245,245,245,0.55), rgba(206,43,55,0.14))",
                }}
              >
                {item.tag}
              </span>
            ) : null}
          </div>
          <div className="mt-1 text-sm text-neutral-600">{item.desc}</div>
        </div>

        {/* Prices removed on purpose */}
      </div>
    </motion.div>
  );
}

function GalleryCard({ src, alt, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={index}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
    >
      <div className="relative h-56">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold text-neutral-900">{alt}</div>
      </div>
    </motion.div>
  );
}

export default function DolceVitaCafe() {
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("nav.gelato"), href: "#gelato" },
    { label: t("nav.specials"), href: "#specials" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.visit"), href: "#visit" },
  ];

  // Favourites (translated) - no prices
  const favorites = useMemo(
    () => [
      {
        name: t("dolcevita.favourites.items.fruitCup.name"),
        desc: t("dolcevita.favourites.items.fruitCup.desc"),
        tag: t("dolcevita.tags.top"),
      },
      {
        name: t("dolcevita.favourites.items.chocolateDeluxe.name"),
        desc: t("dolcevita.favourites.items.chocolateDeluxe.desc"),
        tag: t("dolcevita.tags.classic"),
      },
      {
        name: t("dolcevita.favourites.items.strawberryDream.name"),
        desc: t("dolcevita.favourites.items.strawberryDream.desc"),
        tag: t("dolcevita.tags.summer"),
      },
      {
        name: t("dolcevita.favourites.items.affogato.name"),
        desc: t("dolcevita.favourites.items.affogato.desc"),
        tag: t("dolcevita.tags.italian"),
      },
    ],
    [t]
  );

  // Specials (translated) - no prices
  const specials = useMemo(
    () => [
      {
        name: t("dolcevita.specials.items.dolceVitaCup.name"),
        desc: t("dolcevita.specials.items.dolceVitaCup.desc"),
        tag: t("dolcevita.tags.showcase"),
      },
      {
        name: t("dolcevita.specials.items.kinderCup.name"),
        desc: t("dolcevita.specials.items.kinderCup.desc"),
        tag: t("dolcevita.tags.family"),
      },
      {
        name: t("dolcevita.specials.items.waffleIce.name"),
        desc: t("dolcevita.specials.items.waffleIce.desc"),
        tag: t("dolcevita.tags.best"),
      },
    ],
    [t]
  );

  // Gallery captions (translated)
  const gallery = useMemo(
    () => [
      { src: g1, alt: t("dolcevita.gallery.items.g1") },
      { src: g2, alt: t("dolcevita.gallery.items.g2") },
      { src: g3, alt: t("dolcevita.gallery.items.g3") },
      { src: g4, alt: t("dolcevita.gallery.items.g4") },
      { src: g5, alt: t("dolcevita.gallery.items.g5") },
    ],
    [t]
  );

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-neutral-900 overflow-x-hidden">


      {/* Subtle “gold” + italian accent background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-28 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(198,164,110,0.45), transparent 60%), radial-gradient(circle at 75% 40%, rgba(0,146,70,0.14), transparent 62%), radial-gradient(circle at 55% 70%, rgba(206,43,55,0.14), transparent 62%)",
          }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-black/5">
        <div className={`${container} h-16 flex items-center justify-between`}>
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Dolce Vita logo"
              className="h-10 w-10 rounded-2xl object-cover ring-1 ring-black/10"
            />
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-neutral-900">Dolce Vita</div>
              <div className="text-xs text-neutral-600">{t("tagline")}</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                {l.label}
              </a>
            ))}
            <LangSwitcher />
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-3 py-2 shadow-sm"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur"
            >
              <motion.div
                variants={pop}
                initial="hidden"
                animate="show"
                exit="exit"
                className="absolute left-4 right-4 top-4 rounded-3xl bg-white p-5 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{t("dolcevita.mobile.menu")}</div>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2"
                    aria-label="Close menu"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="mt-4 grid gap-2">
                  <div className="pb-2">
                    <LangSwitcher />
                  </div>
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero with REAL image */}
      <main id="top">
        <section className="relative">
          <div className={`${container} ${sectionPad}`}>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="flex flex-wrap gap-2">
                  <Chip>{t("chips.fresh")}</Chip>
                  <Chip>{t("chips.italian")}</Chip>
                  <Chip>{t("chips.family")}</Chip>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={1}
                  className="mt-5 text-4xl sm:text-5xl font-extrabold leading-[1.03] text-neutral-950"
                >
                  {t("hero.title1")}{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, rgba(198,164,110,1), rgba(25,25,25,1))",
                    }}
                  >
                    {t("hero.title2")}
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={2}
                  className="mt-5 max-w-xl text-neutral-700 leading-relaxed"
                >
                  {t("hero.desc")}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={3}
                  className="mt-7 flex flex-col sm:flex-row gap-3"
                >
                  <Button href="#specials">{t("hero.cta1")}</Button>
                  <Button href="#visit" variant="ghost">
                    {t("hero.cta2")}
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/10">
                  <div className="relative h-[360px] sm:h-[420px]">
                    <img src={heroImg} alt="Dolce Vita showcase" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                    <div className="absolute left-4 top-4 rounded-2xl bg-white/85 px-3 py-2 text-xs font-bold text-neutral-900 ring-1 ring-black/10">
                      Dolce Vita • Eis-Café
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-sm font-semibold text-neutral-900">{t("dolcevita.heroCard.title")}</div>
                    <div className="mt-1 text-sm text-neutral-600">{t("dolcevita.heroCard.desc")}</div>
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute -z-10 -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-60"
                  style={{ background: "rgba(198,164,110,0.45)" }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Favorites */}
        <section id="gelato" className="bg-white">
          <div className={`${container} ${sectionPad}`}>
            <SectionTitle title={t("sections.gelatoTitle")} subtitle={t("sections.gelatoSub")} />
            <div className="grid md:grid-cols-2 gap-4">
              {favorites.map((item, i) => (
                <ItemCard key={`${item.name}-${i}`} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Specials */}
        <section id="specials" className="bg-[#FAF7F0]">
          <div className={`${container} ${sectionPad}`}>
            <SectionTitle title={t("sections.specialsTitle")} subtitle={t("sections.specialsSub")} />
            <div className="grid lg:grid-cols-3 gap-4">
              {specials.map((item, i) => (
                <ItemCard key={`${item.name}-${i}`} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Gallery with your real photos */}
        <section id="gallery" className="bg-white">
          <div className={`${container} ${sectionPad}`}>
            <SectionTitle title={t("sections.galleryTitle")} subtitle={t("sections.gallerySub")} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((g, i) => (
                <GalleryCard key={`${g.alt}-${i}`} src={g.src} alt={g.alt} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className="bg-neutral-950 text-white">
          <div className={`${container} ${sectionPad}`}>
            <div className="grid lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3">
                  <img
                    src={logoImg}
                    alt="Dolce Vita logo"
                    className="h-11 w-11 rounded-2xl object-cover ring-1 ring-white/15"
                  />
                  <div>
                    <div className="font-extrabold">Dolce Vita</div>
                    <div className="text-xs text-white/70">{t("tagline")}</div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-white/80">{t("sections.visitSub")}</p>

                <div className="mt-5 space-y-2 text-sm text-white/85">
                  <div className="flex items-center gap-2">
                    <FiMapPin /> {t("visit.address")}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock /> {t("visit.hours")}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone /> {t("visit.phone")}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="font-semibold">{t("sections.visitTitle")}</div>
                  <div className="mt-2 text-sm text-white/75">{t("dolcevita.visit.mapHint")}</div>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20804.182413446666!2d9.340607630317429!3d49.32332014156209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4798181d155379e1%3A0x29fc58ac67ee6c8e!2sDolce%20Vita!5e0!3m2!1sen!2smk!4v1768408037754!5m2!1sen!2smk"
    className="h-56 w-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
    title="Dolce Vita Location"
  />
</div>

                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="font-semibold">{t("dolcevita.contact.title")}</div>
                  <div className="mt-2 text-sm text-white/75">{t("sections.visitSub")}</div>

                  <div className="mt-4 flex flex-col gap-3">
                    <a
                      href="tel:+49000000000"
                      className="rounded-2xl bg-white text-neutral-900 px-4 py-3 text-sm font-bold text-center hover:bg-neutral-100 transition"
                    >
                      {t("visit.call")}
                    </a>
                    <a
                      href="https://maps.app.goo.gl/1XtCp7jFAgULdwsy9"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-center hover:bg-white/15 transition"
                    >
                      {t("visit.map")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>© {new Date().getFullYear()} Dolce Vita — {t("dolcevita.footer.demo")}</div>
              <div className="flex gap-4">
                <a className="hover:text-white" href="#gelato">
                  {t("nav.gelato")}
                </a>
                <a className="hover:text-white" href="#gallery">
                  {t("nav.gallery")}
                </a>
                <a className="hover:text-white" href="#visit">
                  {t("nav.visit")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
