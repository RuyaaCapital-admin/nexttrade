import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  BarChart3,
  Coins,
  TrendingUp,
  Zap,
  Shield,
  DollarSign,
  Clock,
  LineChart,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Trading({ language = "en" }) {
  const [activeTab, setActiveTab] = useState("forex");

  const content = {
    en: {
      hero: {
        title: "Trade Multiple Markets",
        subtitle: "Access 120+ instruments across various asset classes on MT5 platform",
      },
      instruments: {
        forex: {
          name: "Forex",
          icon: Globe,
          description: "Trade 50+ major, minor, and exotic currency pairs with ultra-tight spreads",
          features: [
            "Spreads from 0.1 pips",
            "24/5 market access",
            "High liquidity",
            "Major, minor & exotic pairs",
          ],
          pairs: [
            { pair: "EUR/USD", spread: "0.1", description: "Most traded pair" },
            { pair: "GBP/USD", spread: "0.2", description: "British pound" },
            { pair: "USD/JPY", spread: "0.1", description: "Japanese yen" },
            { pair: "AUD/USD", spread: "0.2", description: "Australian dollar" },
          ],
        },
        indices: {
          name: "Indices",
          icon: BarChart3,
          description: "Trade global stock indices with leverage and tight spreads",
          features: [
            "20+ global indices",
            "Low margin requirements",
            "Extended trading hours",
            "Micro and standard contracts",
          ],
          pairs: [
            { pair: "US30", spread: "2.0", description: "Dow Jones" },
            { pair: "SPX500", spread: "0.5", description: "S&P 500" },
            { pair: "UK100", spread: "1.0", description: "FTSE 100" },
            { pair: "GER40", spread: "1.5", description: "DAX 40" },
          ],
        },
        commodities: {
          name: "Commodities",
          icon: Coins,
          description: "Trade precious metals and energy commodities",
          features: [
            "Gold & Silver trading",
            "Oil & Natural Gas",
            "Competitive spreads",
            "Hedging opportunities",
          ],
          pairs: [
            { pair: "XAUUSD", spread: "0.2", description: "Gold vs USD" },
            { pair: "XAGUSD", spread: "0.02", description: "Silver vs USD" },
            { pair: "USOIL", spread: "0.03", description: "WTI Crude Oil" },
            { pair: "UKOIL", spread: "0.03", description: "Brent Crude" },
          ],
        },
        crypto: {
          name: "Cryptocurrencies",
          icon: TrendingUp,
          description: "Trade leading cryptocurrencies 24/7",
          features: [
            "24/7 trading",
            "Top crypto pairs",
            "High volatility opportunities",
            "No wallet needed",
          ],
          pairs: [
            { pair: "BTCUSD", spread: "50", description: "Bitcoin" },
            { pair: "ETHUSD", spread: "5", description: "Ethereum" },
            { pair: "LTCUSD", spread: "0.5", description: "Litecoin" },
            { pair: "XRPUSD", spread: "0.01", description: "Ripple" },
          ],
        },
      },
      advantages: [
        { icon: Zap, title: "Fast Execution", desc: "Orders executed in milliseconds" },
        { icon: Shield, title: "Regulated", desc: "Secure trading environment" },
        { icon: DollarSign, title: "Zero Commission", desc: "No hidden fees" },
        { icon: Clock, title: "24/7 Support", desc: "Always here to help" },
      ],
    },
    ar: {
      hero: {
        title: "تداول أسواق متعددة",
        subtitle: "احصل على أكثر من 120 أداة عبر فئات أصول مختلفة على منصة MT5",
      },
      instruments: {
        forex: {
          name: "العملات",
          icon: Globe,
          description: "تداول أكثر من 50 زوج عملات رئيسي وثانوي وغريب بفروقات ضيقة جداً",
          features: [
            "فروقات أسعار من 0.1 نقطة",
            "الوصول إلى السوق 24/5",
            "سيولة عالية",
            "أزواج رئيسية وثانوية وغريبة",
          ],
          pairs: [
            { pair: "EUR/USD", spread: "0.1", description: "الزوج الأكثر تداولاً" },
            { pair: "GBP/USD", spread: "0.2", description: "الجنيه الإسترليني" },
            { pair: "USD/JPY", spread: "0.1", description: "الين الياباني" },
            { pair: "AUD/USD", spread: "0.2", description: "الدولار الأسترالي" },
          ],
        },
        indices: {
          name: "المؤشرات",
          icon: BarChart3,
          description: "تداول مؤشرات الأسهم العالمية بالرافعة المالية وفروقات ضيقة",
          features: [
            "أكثر من 20 مؤشر عالمي",
            "متطلبات هامش منخفضة",
            "ساعات تداول ممتدة",
            "عقود صغيرة وقياسية",
          ],
          pairs: [
            { pair: "US30", spread: "2.0", description: "داو جونز" },
            { pair: "SPX500", spread: "0.5", description: "إس آند بي 500" },
            { pair: "UK100", spread: "1.0", description: "فوتسي 100" },
            { pair: "GER40", spread: "1.5", description: "داكس 40" },
          ],
        },
        commodities: {
          name: "السلع",
          icon: Coins,
          description: "تداول المعادن الثمينة وسلع الطاقة",
          features: [
            "تداول الذهب والفضة",
            "النفط والغاز الطبيعي",
            "فروقات أسعار تنافسية",
            "فرص التحوط",
          ],
          pairs: [
            { pair: "XAUUSD", spread: "0.2", description: "الذهب مقابل الدولار" },
            { pair: "XAGUSD", spread: "0.02", description: "الفضة مقابل الدولار" },
            { pair: "USOIL", spread: "0.03", description: "نفط خام غرب تكساس" },
            { pair: "UKOIL", spread: "0.03", description: "نفط برنت" },
          ],
        },
        crypto: {
          name: "العملات الرقمية",
          icon: TrendingUp,
          description: "تداول العملات الرقمية الرائدة على مدار الساعة",
          features: [
            "تداول 24/7",
            "أفضل أزواج العملات الرقمية",
            "فرص تقلب عالية",
            "لا حاجة لمحفظة",
          ],
          pairs: [
            { pair: "BTCUSD", spread: "50", description: "بيتكوين" },
            { pair: "ETHUSD", spread: "5", description: "إيثيريوم" },
            { pair: "LTCUSD", spread: "0.5", description: "لايتكوين" },
            { pair: "XRPUSD", spread: "0.01", description: "ريبل" },
          ],
        },
      },
      advantages: [
        { icon: Zap, title: "تنفيذ سريع", desc: "تنفيذ الأوامر في أجزاء من الثانية" },
        { icon: Shield, title: "منظم", desc: "بيئة تداول آمنة" },
        { icon: DollarSign, title: "بدون عمولة", desc: "لا رسوم خفية" },
        { icon: Clock, title: "دعم 24/7", desc: "موجودون دائماً لمساعدتك" },
      ],
    },
  };

  const t = content[language];
  const instruments = t.instruments;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl top-0 left-0" />
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl bottom-0 right-0" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.hero.title}</h1>
          <p className="text-xl text-gray-300">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Trading Instruments */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-gray-100 p-2 rounded-2xl h-auto">
              {Object.entries(instruments).map(([key, data]) => {
                const Icon = data.icon;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center gap-2 py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{data.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(instruments).map(([key, data]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 shadow-2xl mb-8">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6 mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <data.icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold mb-3 text-gray-900">{data.name}</h2>
                          <p className="text-lg text-gray-600">{data.description}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {data.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-4 text-center"
                          >
                            <Activity className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                            <p className="text-sm font-medium text-gray-700">{feature}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {language === "en" ? "Popular Instruments" : "الأدوات الشائعة"}
                        </h3>
                        {data.pairs.map((pair, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <LineChart className="w-8 h-8 text-indigo-600" />
                              <div>
                                <h4 className="font-bold text-gray-900">{pair.pair}</h4>
                                <p className="text-sm text-gray-600">{pair.description}</p>
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-1">
                              {language === "en" ? "Spread" : "السبريد"}: {pair.spread}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {language === "en" ? "Trading Advantages" : "مزايا التداول"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.advantages.map((advantage, idx) => {
              const Icon = advantage.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{advantage.title}</h3>
                      <p className="text-gray-600">{advantage.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}