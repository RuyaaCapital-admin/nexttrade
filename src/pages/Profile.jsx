import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  RefreshCw,
  LifeBuoy,
  LogOut,
  Mail,
  Phone,
  Globe2,
  Clock,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import { fetchCurrentUser, updateCurrentUser } from "@/api/functions";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";

const defaultPreferences = {
  tradeAlerts: true,
  productUpdates: true,
  marketing: false
};

const translations = {
  en: {
    heroTitle: "Account Center",
    heroSubtitle: "Review your profile, fine-tune preferences, and keep your trading experience aligned with your goals.",
    accountStatusLabel: "Status",
    statusActive: "Active",
    statusPending: "Pending Review",
    statusSuspended: "Suspended",
    pageSubtitle: "Your personal data is kept secure with enterprise-grade encryption.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    timezoneLabel: "Timezone",
    lastLoginLabel: "Last Login",
    accountCreatedLabel: "Member Since",
    notAvailable: "Not available",
    personalInformationTitle: "Personal information",
    personalInformationDescription: "Keep your details current so our support and compliance teams can reach you when needed.",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "e.g. Sarah Abdullah",
    emailPlaceholder: "name@nexttrade.app",
    phonePlaceholder: "+971 50 123 4567",
    jobTitleLabel: "Role / title",
    jobTitlePlaceholder: "Portfolio Manager",
    languageLabel: "Language",
    languagePlaceholder: "Select language",
    timezonePlaceholder: "Select timezone",
    saveButton: "Save changes",
    savingLabel: "Saving...",
    resetButton: "Reset",
    preferencesTitle: "Communication preferences",
    preferencesDescription: "Refine how we reach you with market intelligence, alerts, and updates.",
    tradeAlertsLabel: "Trade alerts",
    tradeAlertsDescription: "Receive instant notifications for executed trades and margin requirements.",
    productUpdatesLabel: "Product updates",
    productUpdatesDescription: "Be the first to hear about new asset listings and platform capabilities.",
    marketingLabel: "Insights & research",
    marketingDescription: "Occasional strategy notes and macro research tailored to your portfolio.",
    securityTitle: "Security overview",
    securityDescription: "Monitor account activity and keep your credentials protected.",
    quickActionsTitle: "Quick actions",
    refreshAction: "Refresh data",
    contactSupportAction: "Contact support",
    logoutAction: "Log out",
    loadingTitle: "Loading your profile",
    loadingSubtitle: "Retrieving secure account details...",
    errorTitle: "Unable to load profile",
    errorDescription: "We couldn’t fetch your profile data right now. Please retry in a few moments.",
    retryLabel: "Try again",
    successTitle: "Profile updated",
    successDescription: "Your account preferences were refreshed successfully.",
    noChangesTitle: "No updates detected",
    noChangesDescription: "Make a change before saving—your current settings are already live.",
    errorToastTitle: "Update failed",
    genericError: "Something went wrong. Please try again.",
    supportDescription: "Our support desk is available 24/7 for urgent trading matters.",
    securityDevicesTitle: "Session activity",
    lastPasswordChange: "Password last updated",
    resetConfirmation: "Reverted changes",
    resetDescription: "Your pending edits were discarded.",
    refreshSuccess: "Profile refreshed",
    refreshDescription: "Latest account data loaded."
  },
  ar: {
    heroTitle: "مركز الحساب",
    heroSubtitle: "راجع ملفك الشخصي، وعدّل تفضيلاتك، واحرص على توافق تجربتك التداولية مع أهدافك.",
    accountStatusLabel: "الحالة",
    statusActive: "مفعل",
    statusPending: "قيد المراجعة",
    statusSuspended: "موقوف",
    pageSubtitle: "يتم حفظ بياناتك الشخصية بأمان بواسطة تشفير بمستوى المؤسسات.",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "رقم الهاتف",
    timezoneLabel: "المنطقة الزمنية",
    lastLoginLabel: "آخر تسجيل دخول",
    accountCreatedLabel: "عضو منذ",
    notAvailable: "غير متوفر",
    personalInformationTitle: "المعلومات الشخصية",
    personalInformationDescription: "حافظ على بيانات دقيقة ليتمكن فريق الدعم والامتثال من التواصل معك عند الحاجة.",
    fullNameLabel: "الاسم الكامل",
    fullNamePlaceholder: "مثال: سارة عبد الله",
    emailPlaceholder: "name@nexttrade.app",
    phonePlaceholder: "+971 50 123 4567",
    jobTitleLabel: "المسمى الوظيفي",
    jobTitlePlaceholder: "مدير محفظة",
    languageLabel: "اللغة",
    languagePlaceholder: "اختر اللغة",
    timezonePlaceholder: "اختر المنطقة الزمنية",
    saveButton: "حفظ التغييرات",
    savingLabel: "جارٍ الحفظ...",
    resetButton: "إعادة تعيين",
    preferencesTitle: "تفضيلات التواصل",
    preferencesDescription: "حدد الطريقة المناسبة لاستقبال تنبيهات السوق والتحديثات.",
    tradeAlertsLabel: "تنبيهات التداول",
    tradeAlertsDescription: "استقبل إشعارات فورية بالصفقات المنفذة ومتطلبات الهامش.",
    productUpdatesLabel: "تحديثات المنتجات",
    productUpdatesDescription: "كن أول من يعرف الأصول الجديدة وقدرات المنصة.",
    marketingLabel: "الأبحاث والتحليلات",
    marketingDescription: "مذكرات استراتيجية وأبحاث اقتصادية مخصصة لمحفظتك من وقت لآخر.",
    securityTitle: "نظرة أمنية",
    securityDescription: "راقب نشاط الحساب وحافظ على سرية بيانات الدخول.",
    quickActionsTitle: "إجراءات سريعة",
    refreshAction: "تحديث البيانات",
    contactSupportAction: "التواصل مع الدعم",
    logoutAction: "تسجيل الخروج",
    loadingTitle: "جاري تحميل الملف الشخصي",
    loadingSubtitle: "يتم استرجاع بيانات الحساب الآمنة...",
    errorTitle: "تعذر تحميل الملف الشخصي",
    errorDescription: "لم نتمكن من جلب بياناتك الآن. يرجى المحاولة لاحقًا.",
    retryLabel: "أعد المحاولة",
    successTitle: "تم تحديث الملف",
    successDescription: "تم تحديث تفضيلات حسابك بنجاح.",
    noChangesTitle: "لا توجد تغييرات",
    noChangesDescription: "قم بإجراء تعديل قبل الحفظ — إعداداتك الحالية مفعلة بالفعل.",
    errorToastTitle: "فشل التحديث",
    genericError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    supportDescription: "فريق الدعم متاح على مدار الساعة للحالات التداولية العاجلة.",
    securityDevicesTitle: "نشاط الجلسات",
    lastPasswordChange: "آخر تحديث لكلمة المرور",
    resetConfirmation: "تم التراجع عن التغييرات",
    resetDescription: "تم تجاهل التعديلات الحالية.",
    refreshSuccess: "تم التحديث",
    refreshDescription: "تم تحميل أحدث بيانات الحساب."
  }
};

const languageOptions = [
  { value: "en", label: { en: "English", ar: "الإنجليزية" } },
  { value: "ar", label: { en: "Arabic", ar: "العربية" } }
];

const timezoneOptions = [
  "UTC",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Europe/London",
  "America/New_York"
];

const normalizeUserProfile = (user = {}) => {
  const fullName =
    user.fullName ||
    user.name ||
    [user.firstName, user.lastName].filter(Boolean).join(" ");

  return {
    fullName: fullName || "",
    email: user.email || "",
    phone: user.phone || user.phoneNumber || "",
    jobTitle: user.jobTitle || user.position || "",
    timezone: user.timezone || user.timeZone || "UTC",
    languagePreference: user.language || user.locale || "en",
    preferences: {
      ...defaultPreferences,
      ...(typeof user.preferences === "object" && user.preferences ? user.preferences : {})
    }
  };
};

const cloneProfileState = (state = {}) => ({
  ...state,
  preferences: {
    ...(state.preferences || {})
  }
});

const preferencesAreEqual = (a = {}, b = {}) => {
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  for (const key of keys) {
    if ((a?.[key] ?? false) !== (b?.[key] ?? false)) {
      return false;
    }
  }
  return true;
};

const buildUpdatePayload = (initial = {}, current = {}) => {
  const payload = {};

  if ((initial.fullName || "") !== (current.fullName || "")) {
    payload.fullName = current.fullName;
    payload.name = current.fullName;
  }

  if ((initial.email || "") !== (current.email || "")) {
    payload.email = current.email;
  }

  if ((initial.phone || "") !== (current.phone || "")) {
    payload.phone = current.phone;
  }

  if ((initial.jobTitle || "") !== (current.jobTitle || "")) {
    payload.jobTitle = current.jobTitle;
  }

  if ((initial.timezone || "") !== (current.timezone || "")) {
    payload.timezone = current.timezone;
  }

  if ((initial.languagePreference || "") !== (current.languagePreference || "")) {
    payload.language = current.languagePreference;
  }

  if (!preferencesAreEqual(initial.preferences, current.preferences)) {
    payload.preferences = current.preferences;
  }

  return payload;
};

const formatDateTime = (value, language, fallback) => {
  if (!value) {
    return fallback;
  }

  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return fallback;
    }
    const locale = language === "ar" ? "ar-SA" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(date);
  } catch {
    return fallback;
  }
};

const getStatusMeta = (status, t) => {
  const normalized = (status || "active").toString().toLowerCase();
  if (normalized.includes("suspend")) {
    return { variant: "destructive", label: t.statusSuspended };
  }
  if (normalized.includes("pending") || normalized.includes("review")) {
    return { variant: "secondary", label: t.statusPending };
  }
  return { variant: "default", label: t.statusActive };
};

const getSafeValue = (value, fallback) => {
  if (value === null || value === undefined) {
    return fallback;
  }
  if (typeof value === "string" && value.trim() === "") {
    return fallback;
  }
  return value;
};

const InfoPill = ({ Icon, label, value }) => (
  <div className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3 backdrop-blur">
    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/70">
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
    <p className="mt-1 text-sm font-semibold text-white">{value}</p>
  </div>
);

InfoPill.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

const PreferenceRow = ({ label, description, checked, onCheckedChange }) => (
  <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  </div>
);

PreferenceRow.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheckedChange: PropTypes.func.isRequired
};

const LoadingView = ({ language }) => {
  const t = translations[language] || translations.en;
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900">{t.loadingTitle}</h1>
            <p className="text-sm text-slate-500">{t.loadingSubtitle}</p>
          </div>
          <Skeleton className="h-48 w-full rounded-3xl" />
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-72 w-full rounded-3xl" />
            <Skeleton className="h-72 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

LoadingView.propTypes = {
  language: PropTypes.oneOf(["en", "ar"]).isRequired
};

export default function Profile({ language }) {
  const t = translations[language] || translations.en;
  const { toast } = useToast();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formState, setFormState] = useState(null);
  const [initialState, setInitialState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const initials = useMemo(() => {
    const name = formState?.fullName;
    if (!name || !name.trim()) {
      return "NT";
    }
    const parts = name.trim().split(" ").filter(Boolean);
    if (!parts.length) {
      return "NT";
    }
    return parts
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }, [formState?.fullName]);

  const loadUser = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchCurrentUser();
      const normalized = normalizeUserProfile(data);
      setUser(data);
      const cloned = cloneProfileState(normalized);
      setFormState(cloned);
      setInitialState(cloneProfileState(normalized));
    } catch (err) {
      setError(err);
    } finally {
      if (silent) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handlePreferenceChange = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field) => (value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const hasChanges = useMemo(() => {
    if (!initialState || !formState) {
      return false;
    }
    return Object.keys(buildUpdatePayload(initialState, formState)).length > 0;
  }, [initialState, formState]);

  const handleSave = async () => {
    if (!initialState || !formState) {
      return;
    }
    const payload = buildUpdatePayload(initialState, formState);
    if (!Object.keys(payload).length) {
      toast({
        title: t.noChangesTitle,
        description: t.noChangesDescription
      });
      return;
    }

    try {
      setSaving(true);
      const updated = await updateCurrentUser(payload);
      const mergedUser = { ...(user || {}), ...(updated || {}) };
      const normalized = normalizeUserProfile(mergedUser);
      setUser(mergedUser);
      const cloned = cloneProfileState(normalized);
      setInitialState(cloneProfileState(normalized));
      setFormState(cloned);
      toast({
        title: t.successTitle,
        description: t.successDescription
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: t.errorToastTitle,
        description: err?.message || t.genericError
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!initialState) {
      return;
    }
    setFormState(cloneProfileState(initialState));
    toast({
      title: t.resetConfirmation,
      description: t.resetDescription
    });
  };

  const handleRefresh = () => {
    loadUser({ silent: Boolean(user) }).then(() => {
      if (user) {
        toast({
          title: t.refreshSuccess,
          description: t.refreshDescription
        });
      }
    });
  };

  const handleSupport = () => {
    navigate(createPageUrl("Contact"));
  };

  const handleLogout = async () => {
    try {
      await base44.auth.logout();
    } catch (err) {
      toast({
        variant: "destructive",
        title: t.errorToastTitle,
        description: err?.message || t.genericError
      });
    }
  };

  if (loading) {
    return <LoadingView language={language} />;
  }

  const isUnauthorized = error?.status === 401 || error?.status === 403 || error?.code === "UNAUTHORIZED";
  if (isUnauthorized) {
    return <UserNotRegisteredError />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="rounded-3xl border border-slate-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">{t.errorTitle}</CardTitle>
              <CardDescription className="text-slate-500">{t.errorDescription}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <Button onClick={() => loadUser()}>{t.retryLabel}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (!formState) {
    return null;
  }

  const statusMeta = getStatusMeta(user?.status, t);
  const notAvailable = t.notAvailable;
  const lastLogin = user?.lastLoginAt || user?.last_login_at || user?.lastLogin || user?.last_login;
  const createdAt = user?.createdAt || user?.created_at;
  const passwordUpdatedAt = user?.passwordUpdatedAt || user?.password_updated_at;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 pb-16" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 space-y-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-10 shadow-2xl">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/40 blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20 border-2 border-white/40 shadow-lg">
                <AvatarImage src={user?.avatarUrl || user?.avatar || ""} alt={formState.fullName || "User"} />
                <AvatarFallback className="bg-white/90 text-lg font-semibold text-slate-900">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold text-white sm:text-4xl">{t.heroTitle}</h1>
                  <Badge
                    variant={statusMeta.variant}
                    className="border-white/40 bg-white/20 text-xs font-semibold uppercase tracking-wide text-white"
                  >
                    {statusMeta.label}
                  </Badge>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80">{t.heroSubtitle}</p>
              </div>
            </div>
            <Button
              variant="secondary"
              className="bg-white/10 text-white hover:bg-white/20"
              onClick={handleSave}
              disabled={saving || !hasChanges}
            >
              {saving ? t.savingLabel : t.saveButton}
            </Button>
          </div>
          <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoPill Icon={Mail} label={t.emailLabel} value={getSafeValue(formState.email, notAvailable)} />
            <InfoPill Icon={Phone} label={t.phoneLabel} value={getSafeValue(formState.phone, notAvailable)} />
            <InfoPill Icon={Globe2} label={t.timezoneLabel} value={getSafeValue(formState.timezone, notAvailable)} />
            <InfoPill
              Icon={Clock}
              label={t.lastLoginLabel}
              value={formatDateTime(lastLogin, language, notAvailable)}
            />
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)]">
          <div className="space-y-8">
            <Card className="rounded-3xl border border-slate-200 shadow-lg">
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl text-slate-900">{t.personalInformationTitle}</CardTitle>
                <CardDescription className="text-slate-500">{t.personalInformationDescription}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullNameLabel}</Label>
                    <Input
                      id="fullName"
                      value={formState.fullName}
                      onChange={handleInputChange("fullName")}
                      placeholder={t.fullNamePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.emailLabel}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange("email")}
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.phoneLabel}</Label>
                    <Input
                      id="phone"
                      value={formState.phone}
                      onChange={handleInputChange("phone")}
                      placeholder={t.phonePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">{t.jobTitleLabel}</Label>
                    <Input
                      id="jobTitle"
                      value={formState.jobTitle}
                      onChange={handleInputChange("jobTitle")}
                      placeholder={t.jobTitlePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languagePreference">{t.languageLabel}</Label>
                    <Select
                      value={formState.languagePreference}
                      onValueChange={handleSelectChange("languagePreference")}
                    >
                      <SelectTrigger id="languagePreference">
                        <SelectValue placeholder={t.languagePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">{t.timezoneLabel}</Label>
                    <Select value={formState.timezone} onValueChange={handleSelectChange("timezone")}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder={t.timezonePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {timezoneOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/60">
                <Button variant="ghost" onClick={handleReset} disabled={saving || !hasChanges}>
                  {t.resetButton}
                </Button>
                <Button onClick={handleSave} disabled={saving || !hasChanges}>
                  {saving ? t.savingLabel : t.saveButton}
                </Button>
              </CardFooter>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-lg">
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl text-slate-900">{t.preferencesTitle}</CardTitle>
                <CardDescription className="text-slate-500">{t.preferencesDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PreferenceRow
                  label={t.tradeAlertsLabel}
                  description={t.tradeAlertsDescription}
                  checked={formState.preferences.tradeAlerts}
                  onCheckedChange={(value) => handlePreferenceChange("tradeAlerts", value)}
                />
                <PreferenceRow
                  label={t.productUpdatesLabel}
                  description={t.productUpdatesDescription}
                  checked={formState.preferences.productUpdates}
                  onCheckedChange={(value) => handlePreferenceChange("productUpdates", value)}
                />
                <PreferenceRow
                  label={t.marketingLabel}
                  description={t.marketingDescription}
                  checked={formState.preferences.marketing}
                  onCheckedChange={(value) => handlePreferenceChange("marketing", value)}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="rounded-3xl border border-slate-200 shadow-lg">
              <CardHeader className="space-y-3">
                <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  {t.quickActionsTitle}
                </CardTitle>
                <CardDescription className="text-slate-500">{t.supportDescription}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button
                  variant="outline"
                  className="justify-start gap-3"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  <span>{t.refreshAction}</span>
                </Button>
                <Button variant="secondary" className="justify-start gap-3" onClick={handleSupport}>
                  <LifeBuoy className="h-4 w-4" />
                  <span>{t.contactSupportAction}</span>
                </Button>
                <Button variant="destructive" className="justify-start gap-3" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>{t.logoutAction}</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-lg">
              <CardHeader className="space-y-3">
                <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  {t.securityTitle}
                </CardTitle>
                <CardDescription className="text-slate-500">{t.securityDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">{t.lastLoginLabel}</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatDateTime(lastLogin, language, notAvailable)}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">{t.accountCreatedLabel}</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatDateTime(createdAt, language, notAvailable)}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">{t.lastPasswordChange}</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatDateTime(passwordUpdatedAt, language, notAvailable)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  language: PropTypes.oneOf(["en", "ar"]).isRequired
};
