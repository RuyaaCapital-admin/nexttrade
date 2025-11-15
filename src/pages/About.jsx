import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Shield,
  Users,
  TrendingUp,
  Target,
  Heart,
  Globe,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function About({ language = "en" }) {
  const content = {
    en: {
      hero: {
        badge: "About RFT Trade",
        title: "Built by Traders, for Traders",
        subtitle: "Your trusted partner in financial markets since 2018",
      },
      story: {
        title: "Our Story",
        text: "RFT Trade was founded by experienced traders who understood the challenges faced by Arab traders in accessing reliable, transparent, and professional trading services. Since 2018, we've been dedicated to providing world-class trading services through the MT5 platform, offering access to over 120 financial instruments including currencies, indices, precious metals, energy sources, cryptocurrencies, and more.",
      },
      mission: {
        title: "Our Mission",
        text: "To empower traders with cutting-edge technology, transparent pricing, and exceptional support, making financial markets accessible to everyone.",
      },
      vision: {
        title: "Our Vision",
        text: "To become the most trusted and preferred trading partner for traders in the Middle East and beyond.",
      },
      values: [
        {
          icon: Shield,
          title: "Transparency",
          desc: "Complete clarity in all our operations and pricing",
        },
        {
          icon: Heart,
          title: "Integrity",
          desc: "Honest and ethical practices in everything we do",
        },
        {
          icon: Users,
          title: "Client-Focused",
          desc: "Your success is our priority",
        },
        {
          icon: Zap,
          title: "Innovation",
          desc: "Constantly improving our services and technology",
        },
      ],
      stats: [
        { value: "120+", label: "Trading Instruments", icon: TrendingUp },
        { value: "24/7", label: "Customer Support", icon: Users },
        { value: "2018", label: "Established", icon: Award },
        { value: "Fast", label: "Execution Speed", icon: Zap },
      ],
      differences: {
        title: "What Makes Us Different",
        items: [
          "Started by traders who believe in Arab traders",
          "Multiple branches across Turkey for local support",
          "Zero commission trading on all instruments",
          "Islamic swap-free accounts available",
          "Comprehensive educational resources in Arabic",
          "Dedicated account managers for personalized support",
        ],
      },
    },
    ar: {
      hero: {
        badge: "من نحن",
        title: "صُنع بواسطة متداولين، للمتداولين",
        subtitle: "شريكك الموثوق في الأسواق المالية منذ 2018",
      },
      story: {
        title: "قصتنا",
        text: "تأسست RFT Trade على يد متداولين ذوي خبرة أدركوا التحديات التي يواجهها المتداولون العرب في الوصول إلى خدمات تداول موثوقة وشفافة ومهنية. منذ عام 2018، كرسنا جهودنا لتقديم خدمات تداول عالمية المستوى من خلال منصة MT5، مع توفير الوصول إلى أكثر من 120 أداة مالية بما في ذلك العملات والمؤشرات والمعادن الثمينة ومصادر الطاقة والعملات الرقمية والمزيد.",
      },
      mission: {
        title: "مهمتنا",
        text: "تمكين المتداولين بأحدث التقنيات وأسعار شفافة ودعم استثنائي، مما يجعل الأسواق المالية في متناول الجميع.",
      },
      vision: {
        title: "رؤيتنا",
        text: "أن نصبح الشريك التجاري الأكثر ثقة وتفضيلاً للمتداولين في الشرق الأوسط وخارجه.",
      },
      values: [
        {
          icon: Shield,
          title: "الشفافية",
          desc: "وضوح كامل في جميع عملياتنا وأسعارنا",
        },
        {
          icon: Heart,
          title: "النزاهة",
          desc: "ممارسات صادقة وأخلاقية في كل ما نقوم به",
        },
        {
          icon: Users,
          title: "التركيز على العميل",
          desc: "نجاحك هو أولويتنا",
        },
        {
          icon: Zap,
          title: "الابتكار",
          desc: "تحسين مستمر لخدماتنا وتقنياتنا",
        },
      ],
      stats: [
        { value: "120+", label: "أداة تداول", icon: TrendingUp },
        { value: "24/7", label: "دعم العملاء", icon: Users },
        { value: "2018", label: "تأسست", icon: Award },
        { value: "سريع", label: "سرعة التنفيذ", icon: Zap },
      ],
      differences: {
        title: "ما يميزنا",
        items: [
          "بدأنا كمتداولين نؤمن بالمتداول العربي",
          "فروع متعددة في تركيا للدعم المحلي",
          "تداول بدون عمولة على جميع الأدوات",
          "حسابات إسلامية خالية من الفوائد متاحة",
          "موارد تعليمية شاملة باللغة العربية",
          "مدراء حسابات متخصصون للدعم الشخصي",
        ],
      },
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl -top-20 -left-20" />
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl -bottom-20 -right-20" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2">
            {t.hero.badge}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.hero.title}</h1>
          <p className="text-xl text-gray-300">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{t.story.title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{t.story.text}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">{t.mission.title}</h3>
                  <p className="text-lg text-gray-700">{t.mission.text}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">{t.vision.title}</h3>
                  <p className="text-lg text-gray-700">{t.vision.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {language === "en" ? "Our Core Values" : "قيمنا الأساسية"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                      <p className="text-gray-600">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-indigo-300" />
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
            {t.differences.title}
          </h2>

          <div className="space-y-4">
            {t.differences.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{idx + 1}</span>
                </div>
                <p className="text-lg text-gray-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}