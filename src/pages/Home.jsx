import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Award,
  DollarSign,
  LineChart,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
  Coins,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home({ language = "en" }) {
  const [activeInstrument, setActiveInstrument] = useState(0);
  const isRTL = language === "ar";

  const content = {
    en: {
      hero: {
        badge: "Trusted MT5 Broker",
        title: "Trade Smarter with RFT Trade",
        subtitle: "Access 120+ Financial Instruments with Zero Commission",
        cta1: "Open Live Account",
        cta2: "Try Demo Account",
      },
      stats: [
        { value: "120+", label: "Trading Instruments" },
        { value: "0.0", label: "Commission" },
        { value: "24/7", label: "Support" },
        { value: "Fast", label: "Execution" },
      ],
      features: [
        { icon: Shield, title: "Trusted Broker", desc: "Regulated and secure trading environment" },
        { icon: Zap, title: "Instant Execution", desc: "Lightning-fast order execution in milliseconds" },
        { icon: DollarSign, title: "Zero Commission", desc: "No hidden fees or commission charges" },
        { icon: Globe, title: "Islamic Accounts", desc: "Swap-free trading for Islamic finance" },
      ],
      instruments: {
        title: "Trade Multiple Asset Classes",
        subtitle: "Diversify your portfolio with our wide range of instruments",
        items: [
          { name: "Forex", pairs: "50+ Currency Pairs", icon: Globe },
          { name: "Indices", pairs: "20+ Global Indices", icon: BarChart3 },
          { name: "Commodities", pairs: "Gold, Silver, Oil", icon: Coins },
          { name: "Crypto", pairs: "Top Cryptocurrencies", icon: TrendingUp },
        ],
      },
      whyChoose: {
        title: "Why Choose RFT Trade?",
        subtitle: "Built by traders, for traders",
        reasons: [
          "Ultra-low spreads starting from 0.1 pips",
          "Dedicated account manager for personalized support",
          "Advanced MT5 platform with expert advisors",
          "Instant deposits and withdrawals",
          "Comprehensive educational resources",
          "Multi-asset trading on one platform",
        ],
      },
      steps: {
        title: "Start Trading in 4 Easy Steps",
        items: [
          { title: "Register", desc: "Create your account in minutes" },
          { title: "Verify", desc: "Upload your documents" },
          { title: "Fund", desc: "Deposit with multiple payment methods" },
          { title: "Trade", desc: "Start trading 120+ instruments" },
        ],
      },
    },
    ar: {
      hero: {
        badge: "وسيط MT5 موثوق",
        title: "تداول بذكاء مع RFT Trade",
        subtitle: "احصل على أكثر من 120 أداة مالية بدون عمولة",
        cta1: "فتح حساب حقيقي",
        cta2: "تجربة حساب تجريبي",
      },
      stats: [
        { value: "120+", label: "أداة تداول" },
        { value: "0.0", label: "عمولة" },
        { value: "24/7", label: "دعم فني" },
        { value: "سريع", label: "تنفيذ فوري" },
      ],
      features: [
        { icon: Shield, title: "وسيط موثوق", desc: "بيئة تداول آمنة ومنظمة" },
        { icon: Zap, title: "تنفيذ فوري", desc: "تنفيذ الأوامر بسرعة البرق في أجزاء من الثانية" },
        { icon: DollarSign, title: "بدون عمولة", desc: "لا رسوم خفية أو عمولات" },
        { icon: Globe, title: "حسابات إسلامية", desc: "تداول خالي من الفوائد الربوية" },
      ],
      instruments: {
        title: "تداول فئات أصول متعددة",
        subtitle: "نوّع محفظتك مع مجموعة واسعة من الأدوات",
        items: [
          { name: "العملات", pairs: "أكثر من 50 زوج عملة", icon: Globe },
          { name: "المؤشرات", pairs: "أكثر من 20 مؤشر عالمي", icon: BarChart3 },
          { name: "السلع", pairs: "ذهب، فضة، نفط", icon: Coins },
          { name: "العملات الرقمية", pairs: "أفضل العملات الرقمية", icon: TrendingUp },
        ],
      },
      whyChoose: {
        title: "لماذا RFT Trade؟",
        subtitle: "صُنع بواسطة متداولين، للمتداولين",
        reasons: [
          "فروقات أسعار منخفضة جداً تبدأ من 0.1 نقطة",
          "مدير حساب متخصص لدعم شخصي",
          "منصة MT5 متقدمة مع المستشارين الخبراء",
          "إيداعات وسحوبات فورية",
          "موارد تعليمية شاملة",
          "تداول متعدد الأصول على منصة واحدة",
        ],
      },
      steps: {
        title: "ابدأ التداول في 4 خطوات سهلة",
        items: [
          { title: "التسجيل", desc: "أنشئ حسابك في دقائق" },
          { title: "التحقق", desc: "قم برفع مستنداتك" },
          { title: "التمويل", desc: "أودع بطرق دفع متعددة" },
          { title: "التداول", desc: "ابدأ التداول بأكثر من 120 أداة" },
        ],
      },
    },
  };

  const t = content[language];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -top-20 -left-20 animate-pulse" />
          <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2 inline" />
              {t.hero.badge}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300"
                asChild
              >
                <Link to={createPageUrl("Contact")}>
                  {t.hero.cta1}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm rounded-full px-8 py-6 text-lg"
                asChild
              >
                <Link to={createPageUrl("Contact")}>
                  {t.hero.cta2}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {t.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trading Instruments */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t.instruments.title}
            </h2>
            <p className="text-xl text-gray-600">{t.instruments.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.instruments.items.map((instrument, idx) => {
              const Icon = instrument.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <Card className="h-full bg-white border-0 shadow-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-8 relative z-10">
                      <Icon className="w-12 h-12 mb-4 text-indigo-600 group-hover:text-white transition-colors" />
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-white transition-colors">
                        {instrument.name}
                      </h3>
                      <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                        {instrument.pairs}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t.whyChoose.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">{t.whyChoose.subtitle}</p>

              <div className="space-y-4">
                {t.whyChoose.reasons.map((reason, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 text-lg">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-1">
                <div className="w-full h-full rounded-3xl bg-white p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="w-24 h-24 mx-auto mb-6 text-indigo-600" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {language === "en" ? "Smart Trading Platform" : "منصة تداول ذكية"}
                    </h3>
                    <p className="text-gray-600">
                      {language === "en"
                        ? "Advanced tools and analytics for professional traders"
                        : "أدوات وتحليلات متقدمة للمتداولين المحترفين"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.steps.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.steps.items.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.desc}</p>
                </div>
                {idx < t.steps.items.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-white/20" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-xl"
              asChild
            >
              <Link to={createPageUrl("Contact")}>
                {language === "en" ? "Get Started Now" : "ابدأ الآن"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}