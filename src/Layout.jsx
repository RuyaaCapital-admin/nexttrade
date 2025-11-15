import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Globe, Menu, X, TrendingUp, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRTL = language === "ar";

  const navigation = [
    { name: { en: "Home", ar: "الرئيسية" }, url: createPageUrl("Home") },
    { name: { en: "About", ar: "من نحن" }, url: createPageUrl("About") },
    { name: { en: "Trading", ar: "التداول" }, url: createPageUrl("Trading") },
    { name: { en: "Contact", ar: "اتصل بنا" }, url: createPageUrl("Contact") },
  ];

  return (
    <div className={`min-h-screen bg-[#FAFAF9] ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <style>{`
        :root {
          --primary-600: #4F46E5;
          --primary-700: #4338CA;
          --accent-500: #F59E0B;
          --accent-600: #D97706;
          --success-500: #10B981;
          --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --gradient-gold: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .glow-button {
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
          transition: all 0.3s ease;
        }

        .glow-button:hover {
          box-shadow: 0 0 30px rgba(79, 70, 229, 0.5);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6918477c99a4af56630b48a6/f9eb99f2f_d2b4194c-19cd-4925-823f-26dd04fd3565.png" 
                alt="RFT Trade"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className={`nav-link text-sm font-medium transition-colors ${
                    location.pathname === item.url
                      ? 'text-indigo-600 active'
                      : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  {item.name[language]}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Globe className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("ar")}>
                    العربية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                className="glow-button bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 rounded-full px-6"
                asChild
              >
                <Link to={createPageUrl("Contact")}>
                  {language === "en" ? "Open Account" : "فتح حساب"}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Globe className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("ar")}>
                    العربية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-effect border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className="block text-gray-700 hover:text-indigo-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name[language]}
                </Link>
              ))}
              <Button 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                asChild
              >
                <Link to={createPageUrl("Contact")} onClick={() => setMobileMenuOpen(false)}>
                  {language === "en" ? "Open Account" : "فتح حساب"}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {React.cloneElement(children, { language })}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6918477c99a4af56630b48a6/f9eb99f2f_d2b4194c-19cd-4925-823f-26dd04fd3565.png" 
                  alt="RFT Trade"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm">
                {language === "en" 
                  ? "Your trusted partner in financial markets trading since 2018."
                  : "شريكك الموثوق في تداول الأسواق المالية منذ 2018"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{language === "en" ? "Quick Links" : "روابط سريعة"}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {navigation.map((item) => (
                  <li key={item.url}>
                    <Link to={item.url} className="hover:text-white transition-colors">
                      {item.name[language]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{language === "en" ? "Trading" : "التداول"}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{language === "en" ? "Forex" : "العملات"}</li>
                <li>{language === "en" ? "Indices" : "المؤشرات"}</li>
                <li>{language === "en" ? "Commodities" : "السلع"}</li>
                <li>{language === "en" ? "Cryptocurrencies" : "العملات الرقمية"}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{language === "en" ? "Contact" : "اتصل بنا"}</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+90 XXX XXX XXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@rfttrade.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>
              {language === "en" 
                ? "© 2025 RFT Trade. All rights reserved."
                : "© 2025 RFT Trade. جميع الحقوق محفوظة"}
            </p>
            <p className="mt-2 text-xs">
              {language === "en"
                ? "Trading involves risk. Please trade responsibly."
                : "التداول ينطوي على مخاطر. يرجى التداول بمسؤولية"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}