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
  Sparkles,
  Gift,
  Bell,
  Wallet,
  Bot,
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
        { value: "<1s", label: "Execution" },
      ],
      exclusiveOffers: {
        title: "Exclusive Registration Bonuses",
        subtitle: "Get premium features when you open your account today",
        offers: [
          {
            icon: Gift,
            title: "Welcome Bonus",
            desc: "Up to $500 trading bonus on your first deposit",
            badge: "Limited Time",
            color: "from-orange-500 to-red-500",
          },
          {
            icon: Bot,
            title: "AI Trading Assistant",
            desc: "Free access to our advanced AI-powered trading advisor",
            badge: "Premium Feature",
            color: "from-indigo-500 to-purple-500",
          },
          {
            icon: Bell,
            title: "Live Trade Signals",
            desc: "Receive real-time trading signals from expert analysts",
            badge: "Free Forever",
            color: "from-green-500 to-emerald-500",
          },
          {
            icon: Wallet,
            title: "Instant Withdrawals",
            desc: "Withdraw your profits instantly 24/7 with zero fees",
            badge: "No Limits",
            color: "from-blue-500 to-cyan-500",
          },
        ],
      },
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
          "Instant deposits and withdrawals 24/7",
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
        { value: "<1s", label: "تنفيذ فوري" },
      ],
      exclusiveOffers: {
        title: "مكافآت التسجيل الحصرية",
        subtitle: "احصل على ميزات مميزة عند فتح حسابك اليوم",
        offers: [
          {
            icon: Gift,
            title: "مكافأة الترحيب",
            desc: "ما يصل إلى 500 دولار مكافأة تداول على إيداعك الأول",
            badge: "عرض محدود",
            color: "from-orange-500 to-red-500",
          },
          {
            icon: Bot,
            title: "مساعد التداول بالذكاء الاصطناعي",
            desc: "وصول مجاني لمستشار التداول المتقدم بالذكاء الاصطناعي",
            badge: "ميزة مميزة",
            color: "from-indigo-500 to-purple-500",
          },
          {
            icon: Bell,
            title: "إشارات التداول المباشرة",
            desc: "احصل على إشارات تداول فورية من محللين خبراء",
            badge: "مجاني للأبد",
            color: "from-green-500 to-emerald-500",
          },
          {
            icon: Wallet,
            title: "سحب فوري",
            desc: "اسحب أرباحك فوراً على مدار الساعة بدون رسوم",
            badge: "بدون حدود",
            color: "from-blue-500 to-cyan-500",
          },
        ],
      },
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
          "إيداعات وسحوبات فورية على مدار الساعة",
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
      {/* Hero Section with Background Image - FIXED */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden isolate">
        {/* Background Image with Overlay - Completely Non-Interactive */}
        <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: -1 }}>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6918477c99a4af56630b48a6/1cdf8d782_c7d6b2f5-1e27-4f66-98bd-6e7460b52810.png)',
            }}
          />
          {/* Professional Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2 text-sm">
                <Star className="w-4 h-4 mr-2 inline" />
                {t.hero.badge}
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t.hero.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-10">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 rounded-full px-8 py-6 text-lg shadow-2xl transition-all duration-300"
                  style={{ boxShadow: '0 10px 40px rgba(79, 70, 229, 0.3)' }}
                  asChild
                >
                  <Link to={createPageUrl("Contact")}>
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t.hero.cta1}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 backdrop-blur-sm rounded-full px-8 py-6 text-lg transition-all duration-300"
                  asChild
                >
                  <Link to={createPageUrl("Contact")}>
                    {t.hero.cta2}
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.5 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Static Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 pb-4 border-b border-white/20">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">Active Trades</div>
                        <div className="text-sm text-gray-300">Real-time market access</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">EUR/USD</span>
                        <span className="text-green-400 font-bold">+2.45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Gold</span>
                        <span className="text-blue-400 font-bold">+1.20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">BTC/USD</span>
                        <span className="text-purple-400 font-bold">+3.15%</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <div className="text-3xl font-bold text-white mb-1">$1,250.50</div>
                      <div className="text-sm text-gray-300">Total Profit Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      {/* Exclusive Registration Bonuses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              {language === "en" ? "Limited Time Offer" : "عرض لفترة محدودة"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t.exclusiveOffers.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.exclusiveOffers.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.exclusiveOffers.offers.map((offer, idx) => {
              const Icon = offer.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <Card className="h-full border-0 shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-300">
                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    
                    <CardContent className="p-6 relative">
                      <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${offer.color} text-white border-0 text-xs px-3 py-1`}>
                        {offer.badge}
                      </Badge>

                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${offer.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {offer.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {language === "en" 
                    ? "Ready to Claim Your Bonuses?" 
                    : "هل أنت مستعد للحصول على مكافآتك؟"}
                </h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {language === "en"
                    ? "Open your account now and unlock all premium features instantly!"
                    : "افتح حسابك الآن واحصل على جميع الميزات المميزة فوراً!"}
                </p>
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:scale-105 transition-all"
                  asChild
                >
                  <Link to={createPageUrl("Contact")}>
                    <Gift className="w-5 h-5 mr-2" />
                    {language === "en" ? "Claim Your Bonuses Now" : "احصل على مكافآتك الآن"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
              className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:scale-105 transition-all"
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