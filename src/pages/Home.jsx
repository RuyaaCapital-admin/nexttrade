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
  TrendingDown,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import AITradingChat from "../components/home/AITradingChat";

export default function Home({ language = "en" }) {
  const [activeInstrument, setActiveInstrument] = useState(0);
  const isRTL = language === "ar";

  const content = {
    en: {
      hero: {
        badge: "Regulated Broker",
        title: "Trade Smarter with RFT Trade",
        subtitle: "Access 120+ Financial Instruments with Zero Commission",
        cta1: "Open Live Account",
        cta2: "Try Demo Account"
      },
      stats: [
      { value: "120+", label: "Trading Instruments" },
      { value: "0.0", label: "Commission" },
      { value: "24/7", label: "Support" },
      { value: "<1s", label: "Execution" }],

      exclusiveOffers: {
        title: "Exclusive Registration Bonuses",
        subtitle: "Get premium features when you open your account today",
        offers: [
        {
          icon: Gift,
          title: "Welcome Bonus",
          desc: "Up to $500 trading bonus on your first deposit",
          badge: "Limited Time",
          color: "from-orange-500 to-red-500"
        },
        {
          icon: Bot,
          title: "AI Trading Assistant",
          desc: "Free access to our advanced AI-powered trading advisor",
          badge: "Premium Feature",
          color: "from-indigo-500 to-purple-500"
        },
        {
          icon: Bell,
          title: "Live Trade Signals",
          desc: "Receive real-time trading signals from expert analysts",
          badge: "Free Forever",
          color: "from-green-500 to-emerald-500"
        },
        {
          icon: Wallet,
          title: "Instant Withdrawals",
          desc: "Withdraw your profits instantly 24/7 with zero fees",
          badge: "No Limits",
          color: "from-blue-500 to-cyan-500"
        }]

      },
      features: [
      { icon: Shield, title: "Trusted Broker", desc: "Regulated and secure trading environment" },
      { icon: Zap, title: "Instant Execution", desc: "Lightning-fast order execution in milliseconds" },
      { icon: DollarSign, title: "Zero Commission", desc: "No hidden fees or commission charges" },
      { icon: Globe, title: "Islamic Accounts", desc: "Swap-free trading for Islamic finance" }],

      instruments: {
        title: "Trade Multiple Asset Classes",
        subtitle: "Diversify your portfolio with our wide range of instruments",
        items: [
        { name: "Forex", pairs: "50+ Currency Pairs", icon: Globe },
        { name: "Indices", pairs: "20+ Global Indices", icon: BarChart3 },
        { name: "Commodities", pairs: "Gold, Silver, Oil", icon: Coins },
        { name: "Crypto", pairs: "Top Cryptocurrencies", icon: TrendingUp }]

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
        "Multi-asset trading on one platform"]

      },
      steps: {
        title: "Start Trading in 4 Easy Steps",
        items: [
        { title: "Register", desc: "Create your account in minutes" },
        { title: "Verify", desc: "Upload your documents" },
        { title: "Fund", desc: "Deposit with multiple payment methods" },
        { title: "Trade", desc: "Start trading 120+ instruments" }]

      }
    },
    ar: {
      hero: {
        badge: "وسيط منظم",
        title: "تداول بذكاء مع RFT Trade",
        subtitle: "احصل على أكثر من 120 أداة مالية بدون عمولة",
        cta1: "فتح حساب حقيقي",
        cta2: "تجربة حساب تجريبي"
      },
      stats: [
      { value: "120+", label: "أداة تداول" },
      { value: "0.0", label: "عمولة" },
      { value: "24/7", label: "دعم فني" },
      { value: "<1s", label: "تنفيذ فوري" }],

      exclusiveOffers: {
        title: "مكافآت التسجيل الحصرية",
        subtitle: "احصل على ميزات مميزة عند فتح حسابك اليوم",
        offers: [
        {
          icon: Gift,
          title: "مكافأة الترحيب",
          desc: "ما يصل إلى 500 دولار مكافأة تداول على إيداعك الأول",
          badge: "عرض محدود",
          color: "from-orange-500 to-red-500"
        },
        {
          icon: Bot,
          title: "مساعد التداول بالذكاء الاصطناعي",
          desc: "وصول مجاني لمستشار التداول المتقدم بالذكاء الاصطناعي",
          badge: "ميزة مميزة",
          color: "from-indigo-500 to-purple-500"
        },
        {
          icon: Bell,
          title: "إشارات التداول المباشرة",
          desc: "احصل على إشارات تداول فورية من محللين خبراء",
          badge: "مجاني للأبد",
          color: "from-green-500 to-emerald-500"
        },
        {
          icon: Wallet,
          title: "سحب فوري",
          desc: "اسحب أرباحك فوراً على مدار الساعة بدون رسوم",
          badge: "بدون حدود",
          color: "from-blue-500 to-cyan-500"
        }]

      },
      features: [
      { icon: Shield, title: "وسيط موثوق", desc: "بيئة تداول آمنة ومنظمة" },
      { icon: Zap, title: "تنفيذ فوري", desc: "تنفيذ الأوامر بسرعة البرق في أجزاء من الثانية" },
      { icon: DollarSign, title: "بدون عمولة", desc: "لا رسوم خفية أو عمولات" },
      { icon: Globe, title: "حسابات إسلامية", desc: "تداول خالي من الفوائد الربوية" }],

      instruments: {
        title: "تداول فئات أصول متعددة",
        subtitle: "نوّع محفظتك مع مجموعة واسعة من الأدوات",
        items: [
        { name: "العملات", pairs: "أكثر من 50 زوج عملة", icon: Globe },
        { name: "المؤشرات", pairs: "أكثر من 20 مؤشر عالمي", icon: BarChart3 },
        { name: "السلع", pairs: "ذهب، فضة، نفط", icon: Coins },
        { name: "العملات الرقمية", pairs: "أفضل العملات الرقمية", icon: TrendingUp }]

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
        "تداول متعدد الأصول على منصة واحدة"]

      },
      steps: {
        title: "ابدأ التداول في 4 خطوات سهلة",
        items: [
        { title: "التسجيل", desc: "أنشئ حسابك في دقائق" },
        { title: "التحقق", desc: "قم برفع مستنداتك" },
        { title: "التمويل", desc: "أودع بطرق دفع متعددة" },
        { title: "التداول", desc: "ابدأ التداول بأكثر من 120 أداة" }]

      }
    }
  };

  const t = content[language];

  const marketData = [
    { 
      symbol: "XAU/USD",
      name: language === "ar" ? "الذهب" : "Gold",
      price: "2,654.32",
      change: "+1.24%",
      isPositive: true,
      icon: "🥇"
    },
    { 
      symbol: "NAS100",
      name: language === "ar" ? "ناسداك" : "NASDAQ",
      price: "16,428.82",
      change: "+0.87%",
      isPositive: true,
      icon: "📈"
    },
    { 
      symbol: "EUR/USD",
      name: language === "ar" ? "يورو/دولار" : "Euro",
      price: "1.0865",
      change: "-0.15%",
      isPositive: false,
      icon: "💱"
    }
  ];

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section - Enhanced Professional Design */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6918477c99a4af56630b48a6/1cdf8d782_c7d6b2f5-1e27-4f66-98bd-6e7460b52810.png)'
          }} />

        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-cyan-600/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950" />

        {/* Content Layer */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}>

              <Badge className="mb-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white border border-blue-500/30 backdrop-blur-md px-4 py-2 text-sm">
                <Shield className="w-4 h-4 mr-2 inline" />
                {t.hero.badge}
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t.hero.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                {t.hero.subtitle}
              </p>

              {/* MT5 Platform Badge */}
              <div className="flex items-center gap-3 mb-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 w-fit">
                <div className="text-sm text-gray-400 font-medium">
                  {language === "ar" ? "منصة التداول:" : "Trading Platform:"}
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    MT5
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 rounded-full px-8 py-6 text-lg shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:shadow-blue-500/70"
                  asChild>

                  <Link to={createPageUrl("Contact")}>
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t.hero.cta1}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-sm rounded-full px-8 py-6 text-lg transition-all duration-300"
                  asChild>

                  <Link to={createPageUrl("Contact")}>
                    {t.hero.cta2}
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.stats.map((stat, idx) =>
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-blue-500/50 transition-all duration-300">

                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Right Content - Live Market Data Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block">

              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg">
                            {language === "ar" ? "الأسواق المباشرة" : "Live Markets"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {language === "ar" ? "أسعار في الوقت الفعلي" : "Real-time Prices"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-400 font-medium">LIVE</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {marketData.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + idx * 0.1 }}
                          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.icon}</span>
                              <div>
                                <div className="text-white font-bold">{item.symbol}</div>
                                <div className="text-xs text-gray-400">{item.name}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold text-lg">{item.price}</div>
                              <div className={`text-sm font-medium flex items-center gap-1 ${
                                item.isPositive ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {item.change}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            $1,250.50
                          </div>
                          <div className="text-sm text-gray-400">
                            {language === "ar" ? "الربح اليومي" : "Today's Profit"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold text-xl">+8.4%</div>
                          <div className="text-xs text-gray-400">ROI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exclusive Registration Bonuses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              {language === "en" ? "Limited Time Offer" : "عرض لفترة محدودة"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
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
                  className="relative">

                  <Card className="h-full border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${offer.color} text-white border-0 text-xs px-3 py-1`}>
                        {offer.badge}
                      </Badge>

                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${offer.color} flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {offer.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {offer.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>);

            })}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center">

            <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-cyan-600">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {language === "en" ?
                  "Ready to Claim Your Bonuses?" :
                  "هل أنت مستعد للحصول على مكافآتك؟"}
                </h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {language === "en" ?
                  "Open your account now and unlock all premium features instantly!" :
                  "افتح حسابك الآن واحصل على جميع الميزات المميزة فوراً!"}
                </p>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:scale-105 transition-all"
                  asChild>

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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
                  transition={{ delay: idx * 0.1 }}>

                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4 shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>);

            })}
          </div>
        </div>
      </section>

      {/* Trading Instruments */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
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
                  whileHover={{ scale: 1.05 }}>

                  <Card className="h-full bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8">
                      <Icon className="w-12 h-12 mb-4 text-blue-600" />
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">
                        {instrument.name}
                      </h3>
                      <p className="text-gray-600">
                        {instrument.pairs}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>);

            })}
          </div>
        </div>
      </section>

      {/* AI Trading Chat Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t.whyChoose.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">{t.whyChoose.subtitle}</p>

              <div className="space-y-4">
                {t.whyChoose.reasons.map((reason, idx) =>
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3">

                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 text-lg">{reason}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <AITradingChat language={language} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.steps.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.steps.items.map((step, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative">

                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.desc}</p>
                </div>
                {idx < t.steps.items.length - 1 &&
              <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-white/20" />
              }
              </motion.div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:scale-105 transition-all"
              asChild>

              <Link to={createPageUrl("Contact")}>
                {language === "en" ? "Get Started Now" : "ابدأ الآن"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>);

}