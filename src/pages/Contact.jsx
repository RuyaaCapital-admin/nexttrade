
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Contact({ language = "en" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    accountType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      hero: {
        title: "Get Started with RFT Trade",
        subtitle: "Open your trading account today and join thousands of successful traders",
      },
      form: {
        title: "Open Your Trading Account",
        subtitle: "Fill in the form below and our team will contact you within 24 hours",
        name: "Full Name",
        namePlaceholder: "John Doe",
        email: "Email Address",
        emailPlaceholder: "john@example.com",
        phone: "Phone Number",
        phonePlaceholder: "+90 XXX XXX XXXX",
        accountType: "Account Type",
        accountTypePlaceholder: "Select account type",
        accountTypes: {
          demo: "Demo Account",
          live: "Live Account",
          islamic: "Islamic Account",
        },
        message: "Message (Optional)",
        messagePlaceholder: "Tell us about your trading experience...",
        submit: "Open Account",
        submitting: "Processing...",
      },
      info: [
        {
          icon: Phone,
          title: "Phone",
          content: "+90 XXX XXX XXXX",
          desc: "Mon-Fri: 9AM - 6PM (GMT+3)",
        },
        {
          icon: Mail,
          title: "Email",
          content: "support@rfttrade.com",
          desc: "We'll respond within 24 hours",
        },
        {
          icon: MapPin,
          title: "Office",
          content: "Istanbul, Turkey",
          desc: "Multiple branches across Turkey",
        },
        {
          icon: Clock,
          title: "Trading Hours",
          content: "24/5 Market Access",
          desc: "Sunday 10PM - Friday 10PM GMT",
        },
      ],
      benefits: {
        title: "Why Open an Account with Us?",
        items: [
          "Zero commission on all trades",
          "Ultra-low spreads from 0.1 pips",
          "Islamic swap-free accounts",
          "Instant deposits and withdrawals",
          "Dedicated account manager",
          "Free educational resources",
        ],
      },
      success: "Thank you! We'll contact you within 24 hours.",
      error: "Please fill in all required fields.",
    },
    ar: {
      hero: {
        title: "ابدأ مع RFT Trade",
        subtitle: "افتح حساب التداول الخاص بك اليوم وانضم إلى آلاف المتداولين الناجحين",
      },
      form: {
        title: "افتح حساب التداول الخاص بك",
        subtitle: "املأ النموذج أدناه وسيتصل بك فريقنا خلال 24 ساعة",
        name: "الاسم الكامل",
        namePlaceholder: "أحمد محمد",
        email: "البريد الإلكتروني",
        emailPlaceholder: "ahmad@example.com",
        phone: "رقم الهاتف",
        phonePlaceholder: "+90 XXX XXX XXXX",
        accountType: "نوع الحساب",
        accountTypePlaceholder: "اختر نوع الحساب",
        accountTypes: {
          demo: "حساب تجريبي",
          live: "حساب حقيقي",
          islamic: "حساب إسلامي",
        },
        message: "رسالة (اختياري)",
        messagePlaceholder: "أخبرنا عن خبرتك في التداول...",
        submit: "فتح حساب",
        submitting: "جاري المعالجة...",
      },
      info: [
        {
          icon: Phone,
          title: "الهاتف",
          content: "+90 XXX XXX XXXX",
          desc: "الإثنين-الجمعة: 9 صباحاً - 6 مساءً (GMT+3)",
        },
        {
          icon: Mail,
          title: "البريد الإلكتروني",
          content: "support@rfttrade.com",
          desc: "سنرد عليك خلال 24 ساعة",
        },
        {
          icon: MapPin,
          title: "المكتب",
          content: "اسطنبول، تركيا",
          desc: "فروع متعددة في أنحاء تركيا",
        },
        {
          icon: Clock,
          title: "ساعات التداول",
          content: "الوصول إلى السوق 24/5",
          desc: "الأحد 10 مساءً - الجمعة 10 مساءً GMT",
        },
      ],
      benefits: {
        title: "لماذا تفتح حساباً معنا؟",
        items: [
          "بدون عمولة على جميع الصفقات",
          "فروقات أسعار منخفضة جداً من 0.1 نقطة",
          "حسابات إسلامية خالية من الفوائد",
          "إيداعات وسحوبات فورية",
          "مدير حساب متخصص",
          "موارد تعليمية مجانية",
        ],
      },
      success: "شكراً لك! سنتصل بك خلال 24 ساعة.",
      error: "يرجى ملء جميع الحقول المطلوبة.",
    },
  };

  const t = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.accountType) {
      toast.error(t.error);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(t.success);
      setFormData({
        name: "",
        email: "",
        phone: "",
        accountType: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl top-0 left-0 animate-pulse" />
          <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl bottom-0 right-0 animate-pulse" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.hero.title}</h1>
          <p className="text-xl text-gray-300">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900">{t.form.title}</h2>
                  <p className="text-gray-600 mb-8">{t.form.subtitle}</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium">
                        {t.form.name} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.form.namePlaceholder}
                        className="mt-2 h-12"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base font-medium">
                        {t.form.email} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.form.emailPlaceholder}
                        className="mt-2 h-12"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">
                        {t.form.phone} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.form.phonePlaceholder}
                        className="mt-2 h-12"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="accountType" className="text-base font-medium">
                        {t.form.accountType} <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.accountType}
                        onValueChange={(value) => setFormData({ ...formData, accountType: value })}
                      >
                        <SelectTrigger className="mt-2 h-12">
                          <SelectValue placeholder={t.form.accountTypePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="demo">{t.form.accountTypes.demo}</SelectItem>
                          <SelectItem value="live">{t.form.accountTypes.live}</SelectItem>
                          <SelectItem value="islamic">{t.form.accountTypes.islamic}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-base font-medium">
                        {t.form.message}
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.form.messagePlaceholder}
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        t.form.submitting
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          {t.form.submit}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.info.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-blue-600 font-medium mb-1">{item.content}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Benefits */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-50 to-blue-50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">{t.benefits.title}</h3>
                  <div className="space-y-4">
                    {t.benefits.items.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-gray-700 font-medium">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
