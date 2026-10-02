/**
 * SoSo AI - Multi-Language & Multi-Theme Frontend Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================
  // Internationalization (i18n) Translations Dictionary
  // ==========================================================
  const translations = {
    ar: {
      brandBadge: "الرفيق الذكي",
      newChat: "محادثة جديدة",
      searchPlaceholder: "ابحث في المحادثات...",
      noConversations: "لا توجد محادثات سابقة",
      noMatchingConversations: "لا توجد محادثات مطابقة",
      settingsBtn: "الإعدادات",
      themeText: "المظهر الخشبي",
      exportChat: "تصدير المحادثة (Markdown)",
      deleteChat: "حذف هذه المحادثة",
      heroWelcomePrefix: "مرحباً بك في",
      heroSubtitle: "رفيقك ومساعدك الشخصي اليومي، فائق الذكاء للإجابة على الأسئلة، تنظيم يومك، وتحليل الصور بدقة متناهية",
      card1Title: "تحليل الصور واستخراج النصوص",
      card1Desc: "إرفع أي صورة، مستند أو رسم بياني، واطلب منها ما تريده",
      card2Title: "تخطيط اليوم والإنتاجية",
      card2Desc: "نظم مهامك وأولوياتك، واعمل على تحقيق أهدافك",
      card3Title: "شرح المفاهيم والبرمجة",
      card3Desc: "اشرح أي فكرة، تعلم مهارة جديدة، وامتلك أدوات لتحقيق أهدافك",
      card4Title: "المسائل العلمية والرياضية",
      card4Desc: "إجابات دقيقة مع خطوات الحل الواضحة",
      attachedImage: "صورة مرفقة",
      readyForAnalysis: "جاهزة للتحليل مع السؤال",
      removeImage: "إزالة الصورة",
      attachTooltip: "رفع صورة (أو اسحبها إلى هنا)",
      voiceTooltip: "إدخال صوتي",
      sendTooltip: "إرسال (Enter)",
      inputPlaceholder: "اسأل SoSo أي شيء، أو ارفع صورة لمناقشتها...",
      inputFooter: "مساعدك الذكي - رحلة معرفية لا تنتهي",
      settingsTitle: "إعدادات SoSo AI",
      settingsLanguage: "لغة الواجهة (Interface Language)",
      settingsTheme: "مظهر وألوان الواجهة (Theme Palette)",
      settingsProvider: "مزود الذكاء الاصطناعي (AI Provider)",
      settingsModel: "النموذج (Model)",
      settingsPrompt: "طابع وشخصية SoSo AI (System Prompt)",
      settingsTemp: "درجة الإبداع (Temperature)",
      saveSettings: "حفظ الإعدادات",
      cancel: "إلغاء",
      getKeyFree: "احصل على مفتاح مجاني بضغطة زر ↗",
      copyAnswer: "نسخ الإجابة",
      copied: "تم النسخ!",
      readAloud: "قراءة صوتية",
      stopAudio: "إيقاف الصوت",
      copyCode: "📋 نسخ الكود",
      codeCopied: "✓ تم النسخ!",
      confirmDelete: "هل أنت متأكد من حذف هذه المحادثة؟",
      renamePrompt: "أدخل العنوان الجديد للمحادثة:",
      editModalTitle: "تعديل عنوان المحادثة",
      renameInputLabel: "العنوان الجديد للمحادثة",
      saveRename: "حفظ التغيير",
      deleteModalTitle: "حذف المحادثة",
      confirmDeleteDesc: "هل أنت متأكد من رغبتك في حذف هذه المحادثة نهائياً؟ لا يمكن التراجع عن هذه الخطوة.",
      confirmDeleteBtnText: "نعم، حذف نهائي",
      logoutModalTitle: "تسجيل الخروج",
      confirmLogoutDesc: "هل ترغب حقاً في تسجيل الخروج من حسابك في SoSo AI؟",
      confirmLogoutBtnText: "تسجيل الخروج",
      currentSessionBadge: "الجلسة الحالية",
      logoutHintText: "💡 يمكنك تسجيل الدخول مجدداً في أي وقت للوصول إلى كافة محادثاتك وسجلاتك المحفوظة بأمان.",
      typingIndicator: "جاري التفكير والكتابة...",
      deepThink: "تفكير عميق",
      deepThinkTooltip: "تفعيل التفكير والتحليل العميق (إجابات مفصلة وشاملة)",
      deepThinkActiveNotice: "🧠 نمط التفكير العميق مُفعّل: ستحصل على إجابة تحليلية شاملة ومفصلة",
      deepThinkBadgeText: "تفكير عميق ومفصّل",
      settingsDialect: "لهجة وصوت التحدث",
      voiceListeningText: "جاري الاستماع... تحدث الآن بلغتك أو لهجتك",
      micPermissionDenied: "يرجى السماح بالوصول إلى الميكروفون لاستخدام الإدخال الصوتي.",
      themeWoodDesc: "ألوان خشبية زاهية وصندل دافئ",
      themeOliveDesc: "ألوان زيتية وأعشاب برية نضرة",
      themeOceanDesc: "أزرق سماوي وبحري منعش",
      themeSunsetDesc: "درجات المرجان والخوخ الحيوية",
      themeLightDesc: "تصميم نهاري أبيض أنيق",
      themeDarkDesc: "الوضع الليلي الداكن المريح",
      refreshCards: "🔄 أفكار متجددة",
      followUpLabel: "💡 أسئلة مقترحة"
    },
    en: {
      brandBadge: "Smart Companion",
      newChat: "New Chat",
      searchPlaceholder: "Search conversations...",
      noConversations: "No conversations yet",
      noMatchingConversations: "No matching conversations",
      settingsBtn: "Settings",
      themeText: "Color Theme",
      exportChat: "Export Chat (Markdown)",
      deleteChat: "Delete this chat",
      heroWelcomePrefix: "Welcome to",
      heroSubtitle: "Your ultra-smart daily personal companion for answering questions, organizing your day, and analyzing images with extreme precision.",
      card1Title: "Image Analysis & OCR",
      card1Desc: "Upload any photo, document, or chart for an in-depth explanation",
      card2Title: "Daily Planning & Productivity",
      card2Desc: "Organize your tasks, prioritize goals, and stay energized",
      card3Title: "Coding & Concepts",
      card3Desc: "Request clean code, bug fixes, and easy technical walkthroughs",
      card4Title: "Math & Science Problems",
      card4Desc: "Accurate step-by-step solutions with clear mathematical notation",
      attachedImage: "Attached Image",
      readyForAnalysis: "Ready for analysis with prompt",
      removeImage: "Remove Image",
      attachTooltip: "Attach image (or drag & drop here)",
      voiceTooltip: "Voice Input",
      sendTooltip: "Send (Enter)",
      inputPlaceholder: "Ask SoSo anything or upload an image to discuss...",
      inputFooter: "SoSo AI - Your smart daily companion. Accurately analyzes images and speaks multiple languages.",
      settingsTitle: "SoSo AI Settings",
      settingsLanguage: "Interface Language",
      settingsTheme: "Color Palette & Theme",
      settingsProvider: "AI Provider",
      settingsModel: "Model",
      settingsPrompt: "SoSo AI Persona & System Prompt",
      settingsTemp: "Creativity (Temperature)",
      saveSettings: "Save Settings",
      cancel: "Cancel",
      getKeyFree: "Get free API Key with one click ↗",
      copyAnswer: "Copy Answer",
      copied: "Copied!",
      readAloud: "Read Aloud",
      stopAudio: "Stop Audio",
      copyCode: "📋 Copy Code",
      codeCopied: "✓ Copied!",
      confirmDelete: "Are you sure you want to delete this conversation?",
      renamePrompt: "Enter new conversation title:",
      editModalTitle: "Edit Conversation Title",
      renameInputLabel: "New Conversation Title",
      saveRename: "Save Changes",
      deleteModalTitle: "Delete Conversation",
      confirmDeleteDesc: "Are you sure you want to delete this conversation permanently? This cannot be undone.",
      confirmDeleteBtnText: "Yes, Delete",
      logoutModalTitle: "Sign Out",
      confirmLogoutDesc: "Are you sure you want to sign out of your SoSo AI account?",
      confirmLogoutBtnText: "Sign Out",
      currentSessionBadge: "Current Session",
      logoutHintText: "💡 You can sign back in anytime to access all your securely saved conversations.",
      typingIndicator: "Thinking and typing...",
      deepThink: "Deep Think",
      deepThinkTooltip: "Enable Deep Thinking (detailed, in-depth responses)",
      deepThinkActiveNotice: "🧠 Deep Thinking mode active: you will receive exhaustive, multi-step analytical answers",
      deepThinkBadgeText: "Deep Reasoning",
      settingsDialect: "Voice Dialect & Accent",
      voiceListeningText: "Listening... Speak now in your language or dialect",
      micPermissionDenied: "Please allow microphone access to use voice typing.",
      themeWoodDesc: "Warm sandalwood & rich bright wood tones",
      themeOliveDesc: "Natural botanical sage & olive tones",
      themeOceanDesc: "Vibrant ocean azure & sky blue",
      themeSunsetDesc: "Warm peach & sunset coral shades",
      themeLightDesc: "Modern clean crisp white",
      themeDarkDesc: "Elegant comfortable dark mode",
      refreshCards: "🔄 Fresh Ideas",
      followUpLabel: "💡 Suggested Questions"
    },
    fr: {
      brandBadge: "Compagnon Intelligent",
      newChat: "Nouvelle discussion",
      searchPlaceholder: "Rechercher...",
      noConversations: "Aucune discussion",
      noMatchingConversations: "Aucun résultat trouvé",
      settingsBtn: "Paramètres",
      themeText: "Thème d'affichage",
      exportChat: "Exporter (Markdown)",
      deleteChat: "Supprimer la discussion",
      heroWelcomePrefix: "Bienvenue sur",
      heroSubtitle: "Votre compagnon quotidien ultra-intelligent pour répondre à vos questions et analyser vos images avec précision.",
      card1Title: "Analyse d'image & OCR",
      card1Desc: "Téléversez une photo, un schéma ou un document pour une explication détaillée",
      card2Title: "Organisation & Productivité",
      card2Desc: "Planifiez vos journées, organisez vos priorités et restez motivé",
      card3Title: "Code & Concepts",
      card3Desc: "Obtenez du code propre, des corrections de bugs et des explications limpides",
      card4Title: "Sciences & Mathématiques",
      card4Desc: "Résolutions pas à pas avec formules structurées",
      attachedImage: "Image jointe",
      readyForAnalysis: "Prête pour analyse",
      removeImage: "Supprimer",
      attachTooltip: "Joindre une image (glisser-déposer)",
      voiceTooltip: "Saisie vocale",
      sendTooltip: "Envoyer (Entrée)",
      inputPlaceholder: "Demandez à SoSo ou téléversez une image...",
      inputFooter: "SoSo AI - Votre compagnon quotidien intelligent. Analyse d'images et multilingue.",
      settingsTitle: "Paramètres de SoSo AI",
      settingsLanguage: "Langue de l'interface",
      settingsTheme: "Palette de couleurs & Thème",
      settingsProvider: "Fournisseur d'IA",
      settingsModel: "Modèle",
      settingsPrompt: "Personnalité de SoSo AI",
      settingsTemp: "Créativité (Température)",
      saveSettings: "Enregistrer",
      cancel: "Annuler",
      getKeyFree: "Obtenir une clé API gratuite ↗",
      copyAnswer: "Copier",
      copied: "Copié !",
      readAloud: "Lecture vocale",
      stopAudio: "Arrêter l'audio",
      copyCode: "📋 Copier le code",
      codeCopied: "✓ Copié !",
      confirmDelete: "Voulez-vous vraiment supprimer cette conversation ?",
      renamePrompt: "Entrez le nouveau titre :",
      typingIndicator: "Réflexion et rédaction...",
      deepThink: "Pensée Profonde",
      deepThinkTooltip: "Activer la pensée profonde (réponses détaillées et approfondies)",
      deepThinkActiveNotice: "🧠 Mode pensée profonde actif : vous recevrez des réponses analytiques et exhaustives",
      deepThinkBadgeText: "Raisonnement Approfondi",
      settingsDialect: "Voix & Accent Vocal",
      voiceListeningText: "Écoute en cours... Parlez maintenant",
      micPermissionDenied: "Veuillez autoriser l'accès au microphone.",
      themeWoodDesc: "Bois chaleureux et santal lumineux",
      themeOliveDesc: "Tons olive et sauge naturelle",
      themeOceanDesc: "Bleu océanique éclatant",
      themeSunsetDesc: "Pêche et corail crépusculaire",
      themeLightDesc: "Blanc moderne éclatant",
      themeDarkDesc: "Mode sombre raffiné"
    },
    es: {
      brandBadge: "Compañero Inteligente",
      newChat: "Nuevo chat",
      searchPlaceholder: "Buscar chats...",
      noConversations: "No hay chats aún",
      noMatchingConversations: "Sin coincidencias",
      settingsBtn: "Ajustes",
      themeText: "Tema de color",
      exportChat: "Exportar chat (Markdown)",
      deleteChat: "Eliminar este chat",
      heroWelcomePrefix: "Bienvenido a",
      heroSubtitle: "Tu compañero personal diario para responder preguntas, planificar tu día y analizar imágenes con máxima precisión.",
      card1Title: "Análisis de imagen y OCR",
      card1Desc: "Sube cualquier foto, documento o gráfico para una explicación detallada",
      card2Title: "Planificación diaria",
      card2Desc: "Organiza tus tareas y mantén tu energía y enfoque",
      card3Title: "Programación y Conceptos",
      card3Desc: "Solicita código limpio, resolución de errores y explicaciones claras",
      card4Title: "Problemas de Matemáticas y Ciencia",
      card4Desc: "Soluciones paso a paso con fórmulas matemáticas claras",
      attachedImage: "Imagen adjunta",
      readyForAnalysis: "Lista para análisis",
      removeImage: "Quitar imagen",
      attachTooltip: "Adjuntar imagen",
      voiceTooltip: "Entrada de voz",
      sendTooltip: "Enviar (Enter)",
      inputPlaceholder: "Pregúntale a SoSo cualquier cosa o sube una imagen...",
      inputFooter: "SoSo AI - Tu compañero diario. Analiza imágenes y domina múltiples idiomas.",
      settingsTitle: "Ajustes de SoSo AI",
      settingsLanguage: "Idioma de la interfaz",
      settingsTheme: "Paleta de colores y tema",
      settingsProvider: "Proveedor de IA",
      settingsModel: "Modelo",
      settingsPrompt: "Personalidad de SoSo AI",
      settingsTemp: "Creatividad (Temperatura)",
      saveSettings: "Guardar ajustes",
      cancel: "Cancelar",
      getKeyFree: "Obtener clave API gratis ↗",
      copyAnswer: "Copiar respuesta",
      copied: "¡Copiado!",
      readAloud: "Lectura de voz",
      stopAudio: "Detener voz",
      copyCode: "📋 Copiar código",
      codeCopied: "✓ ¡Copiado!",
      confirmDelete: "¿Seguro que deseas eliminar esta conversación?",
      renamePrompt: "Introduce el nuevo título:",
      typingIndicator: "Pensando y escribiendo...",
      deepThink: "Pensamiento Profundo",
      deepThinkTooltip: "Activar pensamiento profundo (respuestas detalladas y profundas)",
      deepThinkActiveNotice: "🧠 Modo pensamiento profundo activo: recibirás respuestas analíticas y exhaustivas",
      deepThinkBadgeText: "Razonamiento Profundo",
      themeWoodDesc: "Madera cálida y tonos sándalo",
      themeOliveDesc: "Verde oliva y salvia botánica",
      themeOceanDesc: "Azul cielo y océano brillante",
      themeSunsetDesc: "Tonos melocotón y coral cálido",
      themeLightDesc: "Blanco limpio moderno",
      themeDarkDesc: "Modo oscuro elegante"
    },
    de: {
      brandBadge: "Kluger Begleiter",
      newChat: "Neuer Chat",
      searchPlaceholder: "Chats durchsuchen...",
      noConversations: "Noch keine Chats",
      noMatchingConversations: "Keine passenden Chats",
      settingsBtn: "Einstellungen",
      themeText: "Farbdesign",
      exportChat: "Chat exportieren (Markdown)",
      deleteChat: "Diesen Chat löschen",
      heroWelcomePrefix: "Willkommen bei",
      heroSubtitle: "Dein hochintelligenter täglicher Begleiter für Fragen, Tagesplanung und präzise Bildanalysen.",
      card1Title: "Bildanalyse & Texterkennung",
      card1Desc: "Lade ein Bild, Dokument oder Diagramm für detaillierte Erklärungen hoch",
      card2Title: "Tagesplanung & Produktivität",
      card2Desc: "Strukturiere deine Aufgaben und bleibe fokussiert",
      card3Title: "Programmierung & Konzepte",
      card3Desc: "Erhalte sauberen Code, Fehlerbehebungen und verständliche Erklärungen",
      card4Title: "Mathe- und Wissenschaftsaufgaben",
      card4Desc: "Präzise Schritt-für-Schritt-Lösungen mit mathematischen Formeln",
      attachedImage: "Angehängtes Bild",
      readyForAnalysis: "Bereit zur Analyse",
      removeImage: "Bild entfernen",
      attachTooltip: "Bild anhängen",
      voiceTooltip: "Spracheingabe",
      sendTooltip: "Senden (Enter)",
      inputPlaceholder: "Frag SoSo alles oder lade ein Bild hoch...",
      inputFooter: "SoSo AI - Dein persönlicher KI-Begleiter. Bildanalyse und mehrsprachig.",
      settingsTitle: "SoSo AI Einstellungen",
      settingsLanguage: "Benutzeroberflächen-Sprache",
      settingsTheme: "Farbpalette & Design",
      settingsProvider: "KI-Anbieter",
      settingsModel: "Modell",
      settingsPrompt: "SoSo AI Persönlichkeit",
      settingsTemp: "Kreativität (Temperatur)",
      saveSettings: "Einstellungen speichern",
      cancel: "Abbrechen",
      getKeyFree: "Kostenlosen API-Schlüssel holen ↗",
      copyAnswer: "Antwort kopieren",
      copied: "Kopiert!",
      readAloud: "Vorlesen",
      stopAudio: "Audio stoppen",
      copyCode: "📋 Code kopieren",
      codeCopied: "✓ Kopiert!",
      confirmDelete: "Möchtest du diese Unterhaltung wirklich löschen?",
      renamePrompt: "Neuen Titel eingeben:",
      typingIndicator: "Denkt nach und tippt...",
      deepThink: "Tiefes Denken",
      deepThinkTooltip: "Tiefes Denken aktivieren (detaillierte und tiefgründige Antworten)",
      deepThinkActiveNotice: "🧠 Tiefes Denken aktiv: Sie erhalten ausführliche und tiefgreifende Antworten",
      deepThinkBadgeText: "Tiefgründige Analyse",
      themeWoodDesc: "Warmes Holz und Sandelholztöne",
      themeOliveDesc: "Natürliche Oliven- und Salbeitöne",
      themeOceanDesc: "Strahlendes Ozean- und Azurblau",
      themeSunsetDesc: "Warme Pfirsich- und Korallentöne",
      themeLightDesc: "Modernes klares Weiß",
      themeDarkDesc: "Eleganter dunkler Modus"
    },
    tr: {
      brandBadge: "Akıllı Yoldaş",
      newChat: "Yeni Sohbet",
      searchPlaceholder: "Sohbetlerde ara...",
      noConversations: "Henüz sohbet yok",
      noMatchingConversations: "Eşleşen sohbet bulunamadı",
      settingsBtn: "Ayarlar",
      themeText: "Renk Teması",
      exportChat: "Sohbeti Dışa Aktar (Markdown)",
      deleteChat: "Bu sohbeti sil",
      heroWelcomePrefix: "Hoş Geldiniz:",
      heroSubtitle: "Soruları yanıtlayan, gününüzü planlayan ve görselleri derinlemesine analiz eden akıllı kişisel yardımcınız.",
      card1Title: "Görsel Analizi ve OCR",
      card1Desc: "Detaylı açıklama için bir görsel, belge veya grafik yükleyin",
      card2Title: "Günlük Planlama ve Verimlilik",
      card2Desc: "Görevlerinizi organize edin, hedeflerinizi belirleyin",
      card3Title: "Kodlama ve Kavramlar",
      card3Desc: "Temiz kod, hata çözümleri ve sade teknik anlatımlar alın",
      card4Title: "Matematik ve Bilim Problemleri",
      card4Desc: "Adım adım çözümler ve net formüller",
      attachedImage: "Ekli Resim",
      readyForAnalysis: "Soru ile analize hazır",
      removeImage: "Resmi kaldır",
      attachTooltip: "Resim ekle (veya sürükleyip bırakın)",
      voiceTooltip: "Sesli Giriş",
      sendTooltip: "Gönder (Enter)",
      inputPlaceholder: "SoSo'ya herhangi bir şey sorun veya resim yükleyin...",
      inputFooter: "SoSo AI - Akıllı günlük yardımcınız. Görselleri analiz eder ve çok dilli konuşur.",
      settingsTitle: "SoSo AI Ayarları",
      settingsLanguage: "Arayüz Dili",
      settingsTheme: "Renk Paleti ve Tema",
      settingsProvider: "Yapay Zeka Sağlayıcısı",
      settingsModel: "Model",
      settingsPrompt: "SoSo AI Kişiliği",
      settingsTemp: "Yaratıcılık (Sıcaklık)",
      saveSettings: "Ayarları Kaydet",
      cancel: "İptal",
      getKeyFree: "Tek tıkla ücretsiz API anahtarı alın ↗",
      copyAnswer: "Cevabı Kopyala",
      copied: "Kopyalandı!",
      readAloud: "Sesli Oku",
      stopAudio: "Sesi Durdur",
      copyCode: "📋 Kodu Kopyala",
      codeCopied: "✓ Kopyalandı!",
      confirmDelete: "Bu sohbeti silmek istediğinizden emin misiniz?",
      renamePrompt: "Yeni sohbet başlığını girin:",
      typingIndicator: "Düşünüyor ve yazıyor...",
      deepThink: "Derin Düşünme",
      deepThinkTooltip: "Derin düşünmeyi etkinleştir (detaylı ve kapsamlı yanıtlar)",
      deepThinkActiveNotice: "🧠 Derin düşünme modu aktif: kapsamlı ve ayrıntılı analitik yanıtlar alacaksınız",
      deepThinkBadgeText: "Derin Mantık Yürütme",
      themeWoodDesc: "Sıcak ahşap ve sandal ağacı tonları",
      themeOliveDesc: "Doğal zeytin ve adaçayı yeşili",
      themeOceanDesc: "Canlı okyanus ve gökyüzü mavisi",
      themeSunsetDesc: "Sıcak şeftali ve mercan tonları",
      themeLightDesc: "Modern aydınlık beyaz",
      themeDarkDesc: "Zarif karanlık mod"
    }
  };

  // State
  let currentLanguage = localStorage.getItem("soso_lang") || "ar";
  let currentTheme = localStorage.getItem("soso_theme") || "theme-wood";
  let currentDialect = localStorage.getItem("soso_dialect") || "auto";
  let currentConversationId = null;
  let conversations = [];
  let attachedImageFile = null;
  let isGenerating = false;
  let recognition = null;
  let isRecording = false;
  let activeSpeechUtterance = null;
  let isDeepThinkActive = localStorage.getItem("soso_deep_think") === "true";
  let isNewChatMode = true;

  // Auth State
  let currentAuthToken = localStorage.getItem("soso_auth_token") || null;
  let currentAuthUser = null;
  let pendingVerifyEmail = "";
  let pendingResetEmail = "";
  let resendCountdownTimer = null;
  let resetResendCountdownTimer = null;

  function getAuthHeaders(extra = {}) {
    const headers = { ...extra };
    if (currentAuthToken) {
      headers["Authorization"] = `Bearer ${currentAuthToken}`;
    }
    return headers;
  }

  // DOM Elements
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const newChatBtn = document.getElementById("newChatBtn");
  const conversationsList = document.getElementById("conversationsList");
  const searchInput = document.getElementById("searchConversations");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  // Auth Gateway Elements
  const authModal = document.getElementById("authModal");
  const authAlert = document.getElementById("authAlert");
  const tabSignUpBtn = document.getElementById("tabSignUpBtn");
  const tabSignInBtn = document.getElementById("tabSignInBtn");
  const authTabs = document.getElementById("authTabs");
  const signUpForm = document.getElementById("signUpForm");
  const signUpName = document.getElementById("signUpName");
  const signUpEmail = document.getElementById("signUpEmail");
  const signUpPassword = document.getElementById("signUpPassword");
  const toggleSignUpPass = document.getElementById("toggleSignUpPass");
  const verifyOtpForm = document.getElementById("verifyOtpForm");
  const verifyEmailDisplay = document.getElementById("verifyEmailDisplay");
  const verifyOtpInput = document.getElementById("verifyOtpInput");
  const resendCodeBtn = document.getElementById("resendCodeBtn");
  const backToSignUpBtn = document.getElementById("backToSignUpBtn");
  const smtpNoticeBox = document.getElementById("smtpNoticeBox");
  const revealCodeBtn = document.getElementById("revealCodeBtn");
  const revealedCodeDisplay = document.getElementById("revealedCodeDisplay");
  const signInForm = document.getElementById("signInForm");
  const signInEmail = document.getElementById("signInEmail");
  const signInPassword = document.getElementById("signInPassword");
  const toggleSignInPass = document.getElementById("toggleSignInPass");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");

  // Forgot & Reset Password Gateway Elements
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const forgotEmail = document.getElementById("forgotEmail");
  const forgotSubmitBtn = document.getElementById("forgotSubmitBtn");
  const backToSignInFromForgot = document.getElementById("backToSignInFromForgot");
  const resetPasswordForm = document.getElementById("resetPasswordForm");
  const resetEmailDisplay = document.getElementById("resetEmailDisplay");
  const resetOtpInput = document.getElementById("resetOtpInput");
  const newPasswordInput = document.getElementById("newPasswordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const toggleNewPass = document.getElementById("toggleNewPass");
  const toggleConfirmPass = document.getElementById("toggleConfirmPass");
  const resetPasswordSubmitBtn = document.getElementById("resetPasswordSubmitBtn");
  const resendResetCodeBtn = document.getElementById("resendResetCodeBtn");
  const backToSignInFromReset = document.getElementById("backToSignInFromReset");
  const smtpResetNoticeBox = document.getElementById("smtpResetNoticeBox");
  const revealResetCodeBtn = document.getElementById("revealResetCodeBtn");
  const revealedResetCodeDisplay = document.getElementById("revealedResetCodeDisplay");

  // User Profile in Sidebar
  const userProfileBar = document.getElementById("userProfileBar");
  const userAvatar = document.getElementById("userAvatar");
  const userAvatarWrapper = document.getElementById("userAvatarWrapper");
  const userAvatarFileInput = document.getElementById("userAvatarFileInput");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const currentChatTitle = document.getElementById("currentChatTitle");
  const activeModelName = document.getElementById("activeModelName");
  const exportChatBtn = document.getElementById("exportChatBtn");
  const deleteCurrentChatBtn = document.getElementById("deleteCurrentChatBtn");
  const quickLangSelect = document.getElementById("quickLangSelect");
  
  const messagesContainer = document.getElementById("messagesContainer");
  const heroWelcome = document.getElementById("heroWelcome");
  const chatFlow = document.getElementById("chatFlow");
  
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const attachBtn = document.getElementById("attachBtn");
  const imageFileInput = document.getElementById("imageFileInput");
  const voiceBtn = document.getElementById("voiceBtn");
  const voiceListeningBar = document.getElementById("voiceListeningBar");
  const voiceListeningText = document.getElementById("voiceListeningText");
  const stopListeningBtn = document.getElementById("stopListeningBtn");
  const deepThinkBtn = document.getElementById("deepThinkBtn");
  const deepThinkIndicatorBar = document.getElementById("deepThinkIndicatorBar");
  const disableDeepThinkBtn = document.getElementById("disableDeepThinkBtn");
  
  const imagePreviewBar = document.getElementById("imagePreviewBar");
  const previewImage = document.getElementById("previewImage");
  const previewName = document.getElementById("previewName");
  const removeImgBtn = document.getElementById("removeImgBtn");
  
  // Modals & Settings
  const settingsModal = document.getElementById("settingsModal");
  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const cancelSettingsBtn = document.getElementById("cancelSettingsBtn");
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");
  const settingsLanguage = document.getElementById("settingsLanguage");
  const settingsDialect = document.getElementById("settingsDialect");
  const themePickerGrid = document.getElementById("themePickerGrid");

  // Settings inputs
  const settingsProvider = document.getElementById("settingsProvider");
  const geminiSettingsSection = document.getElementById("geminiSettingsSection");
  const openaiSettingsSection = document.getElementById("openaiSettingsSection");
  const settingsGeminiKey = document.getElementById("settingsGeminiKey");
  const toggleGeminiKeyVis = document.getElementById("toggleGeminiKeyVis");
  const geminiKeyStatus = document.getElementById("geminiKeyStatus");
  const settingsGeminiModel = document.getElementById("settingsGeminiModel");
  const settingsOpenaiKey = document.getElementById("settingsOpenaiKey");
  const toggleOpenaiKeyVis = document.getElementById("toggleOpenaiKeyVis");
  const openaiKeyStatus = document.getElementById("openaiKeyStatus");
  const settingsOpenaiModelSelect = document.getElementById("settingsOpenaiModelSelect");
  const settingsOpenaiBase = document.getElementById("settingsOpenaiBase");
  const settingsOpenaiModel = document.getElementById("settingsOpenaiModel");
  const settingsPrompt = document.getElementById("settingsPrompt");
  const settingsTemp = document.getElementById("settingsTemp");
  const tempValueDisplay = document.getElementById("tempValueDisplay");

  // Image Viewer Modal
  const imageViewerModal = document.getElementById("imageViewerModal");
  const viewerImage = document.getElementById("viewerImage");
  const closeImageViewerBtn = document.getElementById("closeImageViewerBtn");

  // Rename & Delete Modals Elements
  const renameModal = document.getElementById("renameModal");
  const renameInput = document.getElementById("renameInput");
  const closeRenameBtn = document.getElementById("closeRenameBtn");
  const cancelRenameBtn = document.getElementById("cancelRenameBtn");
  const confirmRenameBtn = document.getElementById("confirmRenameBtn");

  const deleteModal = document.getElementById("deleteModal");
  const deleteChatTitlePreview = document.getElementById("deleteChatTitlePreview");
  const closeDeleteBtn = document.getElementById("closeDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

  const logoutModal = document.getElementById("logoutModal");
  const closeLogoutBtn = document.getElementById("closeLogoutBtn");
  const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");
  const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
  const logoutModalAvatarBadge = document.getElementById("logoutModalAvatarBadge");
  const logoutModalAvatarInitial = document.getElementById("logoutModalAvatarInitial");
  const logoutModalUserName = document.getElementById("logoutModalUserName");
  const logoutModalUserEmail = document.getElementById("logoutModalUserEmail");

  let pendingRenameConvId = null;
  let pendingDeleteConvId = null;

  // Initialize Markdown parser
  if (window.marked) {
    marked.setOptions({
      highlight: function (code, lang) {
        if (window.hljs) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        }
        return code;
      },
      breaks: true,
      gfm: true
    });
  }

  // ==========================================================
  // Language & i18n Management
  // ==========================================================
  function t(key) {
    const langDict = translations[currentLanguage] || translations["ar"];
    return langDict[key] || translations["ar"][key] || key;
  }

  function applyLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("soso_lang", lang);

    document.documentElement.lang = lang;
    const isRtl = lang === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";

    // Update form selectors
    if (quickLangSelect) quickLangSelect.value = lang;
    if (settingsLanguage) settingsLanguage.value = lang;

    // Update all elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const trans = t(key);
      if (trans) el.textContent = trans;
    });

    // Update all placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const trans = t(key);
      if (trans) el.placeholder = trans;
    });

    // Update all titles
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
      const key = el.getAttribute("data-i18n-title");
      const trans = t(key);
      if (trans) el.title = trans;
    });

    // Update speech recognition language
    if (recognition) {
      recognition.lang = getEffectiveSpeechLang();
    }

    // Refresh conversation list for empty state
    renderConversationsList();

    if (typeof renderSuggestionCards === "function") {
      renderSuggestionCards(currentSuggestionSetIndex);
    }
  }

  function getEffectiveSpeechLang() {
    if (currentDialect && currentDialect !== "auto") {
      return currentDialect;
    }
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("ar")) {
      if (nav.includes("dz") || nav === "ar") return "ar-DZ";
      if (nav.includes("eg")) return "ar-EG";
      if (nav.includes("ma")) return "ar-MA";
      if (nav.includes("sy")) return "ar-SY";
      if (nav.includes("tn")) return "ar-TN";
      return "ar-SA";
    }
    if (nav.startsWith("fr")) return "fr-FR";
    if (nav.startsWith("es")) return "es-ES";
    if (nav.startsWith("de")) return "de-DE";
    if (nav.startsWith("tr")) return "tr-TR";
    return currentLanguage === "ar" ? "ar-DZ" : "en-US";
  }

  if (quickLangSelect) {
    quickLangSelect.addEventListener("change", (e) => {
      applyLanguage(e.target.value);
    });
  }

  if (settingsLanguage) {
    settingsLanguage.addEventListener("change", (e) => {
      applyLanguage(e.target.value);
    });
  }

  // ==========================================================
  // Themes & Color Palettes
  // ==========================================================
  const themeDetails = {
    "theme-wood": { icon: "🪵", labelAr: "المظهر الخشبي", labelEn: "Warm Wood" },
    "theme-olive": { icon: "🫒", labelAr: "المظهر الزيتي", labelEn: "Olive Green" },
    "theme-ocean": { icon: "🌊", labelAr: "المظهر المحيطي", labelEn: "Ocean Breeze" },
    "theme-sunset": { icon: "🌅", labelAr: "المظهر المرجاني", labelEn: "Sunset Coral" },
    "theme-light": { icon: "☀️", labelAr: "النهاري الكلاسيكي", labelEn: "Classic Light" },
    "theme-dark": { icon: "🌙", labelAr: "الليلي الفاخر", labelEn: "Night Dark" }
  };

  const themeOrder = ["theme-wood", "theme-olive", "theme-ocean", "theme-sunset", "theme-light", "theme-dark"];

  function applyTheme(themeName) {
    currentTheme = themeName;
    localStorage.setItem("soso_theme", themeName);

    // Remove existing theme classes
    document.body.className = "";
    document.body.classList.add(themeName);

    const info = themeDetails[themeName] || themeDetails["theme-wood"];
    if (themeIcon) themeIcon.textContent = info.icon;
    if (themeText) themeText.textContent = currentLanguage === "ar" ? info.labelAr : info.labelEn;

    // Update active state in settings modal cards
    if (themePickerGrid) {
      themePickerGrid.querySelectorAll(".theme-card-option").forEach(card => {
        if (card.dataset.theme === themeName) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });
    }
  }

  // Quick theme toggle button (if present)
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentIndex = themeOrder.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      applyTheme(themeOrder[nextIndex]);
    });
  }

  // Theme selection cards in settings modal
  if (themePickerGrid) {
    themePickerGrid.querySelectorAll(".theme-card-option").forEach(card => {
      card.addEventListener("click", () => {
        const selected = card.dataset.theme;
        applyTheme(selected);
      });
    });
  }

  // ==========================================================
  // Sidebar Controls
  // ==========================================================
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle("open");
      } else {
        sidebar.classList.toggle("collapsed");
      }
    });
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  // ==========================================================
  // Load Conversations & Initial State
  // ==========================================================
  async function loadConversations(autoSelectFirst = false) {
    if (!currentAuthToken) {
      conversations = [];
      renderConversationsList();
      if (!currentConversationId) {
        showHeroWelcome();
      }
      return;
    }
    try {
      const res = await fetch("/api/conversations", {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error("Failed to load");
      conversations = await res.json();
      purgeSearchAutofill();
      renderConversationsList();

      if (autoSelectFirst && conversations.length > 0 && !currentConversationId && !isNewChatMode) {
        selectConversation(conversations[0].id);
      } else if (!currentConversationId || isNewChatMode || conversations.length === 0) {
        if (!currentConversationId) {
          showHeroWelcome();
        }
      }
    } catch (err) {
      console.error("Error loading conversations:", err);
    }
  }

  function purgeSearchAutofill() {
    if (!searchInput) return;
    const currentVal = searchInput.value.trim().toLowerCase();
    if (!currentVal) return;
    const userEmail = currentAuthUser?.email?.toLowerCase() || "";
    if ((userEmail && currentVal === userEmail) || (currentVal.includes("@") && currentVal.includes("."))) {
      searchInput.value = "";
      renderConversationsList();
    }
  }

  function scheduleSearchAutofillPurge() {
    purgeSearchAutofill();
    [40, 120, 250, 500, 1000, 1800].forEach(delay => {
      setTimeout(purgeSearchAutofill, delay);
    });
  }

  function renderConversationsList() {
    conversationsList.innerHTML = "";
    if (searchInput) {
      const currentVal = searchInput.value.trim().toLowerCase();
      const userEmail = currentAuthUser?.email?.toLowerCase() || "";
      if (currentVal && ((userEmail && currentVal === userEmail) || (currentVal.includes("@") && currentVal.includes(".")))) {
        searchInput.value = "";
      }
    }
    const filter = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const filtered = conversations.filter(c => c.title.toLowerCase().includes(filter));

    if (clearSearchBtn) {
      clearSearchBtn.style.display = filter ? "flex" : "none";
    }

    if (filtered.length === 0) {
      const emptyMsg = filter ? t("noMatchingConversations") : t("noConversations");
      conversationsList.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
      return;
    }

    filtered.forEach(c => {
      const item = document.createElement("div");
      item.className = `conversation-item ${(!isNewChatMode && c.id === currentConversationId) ? "active" : ""}`;
      item.dataset.id = c.id;

      item.innerHTML = `
        <span class="conv-title">${escapeHtml(c.title)}</span>
        <div class="conv-actions">
          <button class="conv-action-btn edit" title="تعديل الاسم" data-i18n-title="editChat">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button class="conv-action-btn delete" title="حذف المحادثة" data-i18n-title="deleteChat">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;

      item.addEventListener("click", (e) => {
        if (e.target.closest(".conv-actions")) return;
        selectConversation(c.id);
        if (window.innerWidth <= 768 && sidebar) sidebar.classList.remove("open");
      });

      const editBtn = item.querySelector(".edit");
      if (editBtn) {
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openRenameModal(c.id, c.title);
        });
      }

      const delBtn = item.querySelector(".delete");
      if (delBtn) {
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openDeleteModal(c.id, c.title);
        });
      }

      conversationsList.appendChild(item);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      renderConversationsList();
      if (searchInput) searchInput.focus();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const currentVal = searchInput.value.trim().toLowerCase();
      const userEmail = currentAuthUser?.email?.toLowerCase() || "";
      if (currentVal && ((userEmail && currentVal === userEmail) || (currentVal.includes("@") && currentVal.includes(".")))) {
        searchInput.value = "";
      }
      renderConversationsList();
    });
  }

  async function selectConversation(convId) {
    stopCurrentSpeech();
    isNewChatMode = false;
    currentConversationId = convId;
    renderConversationsList();

    try {
      const res = await fetch(`/api/conversations/${convId}`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error("Conversation not found");
      const data = await res.json();

      if (currentChatTitle) currentChatTitle.textContent = data.title || t("newChat");
      chatFlow.innerHTML = "";

      if (data.messages && data.messages.length > 0) {
        heroWelcome.style.display = "none";
        messagesContainer.classList.remove("hero-mode");

        let lastAssistantIdx = -1;
        for (let i = data.messages.length - 1; i >= 0; i--) {
          if (data.messages[i].role === "assistant") {
            lastAssistantIdx = i;
            break;
          }
        }

        data.messages.forEach((msg, idx) => {
          const isLastAssistant = (idx === lastAssistantIdx);
          appendMessageUI(
            msg.role,
            msg.content,
            msg.image_url,
            false,
            Boolean(msg.deep_think),
            isLastAssistant
          );
        });
      } else {
        showHeroWelcome();
      }
      // Start from the top so the conversation text is immediately visible from line 1
      messagesContainer.scrollTop = 0;
    } catch (err) {
      console.error("Error selecting conversation:", err);
    }
  }

  async function startNewChat() {
    stopCurrentSpeech();
    currentConversationId = null;
    isNewChatMode = true;
    chatFlow.innerHTML = "";
    showHeroWelcome();
    if (currentChatTitle) currentChatTitle.textContent = t("newChat");
    renderConversationsList();
    chatInput.value = "";
    chatInput.style.height = "auto";
    attachedImageFile = null;
    if (imageFileInput) imageFileInput.value = "";
    if (imagePreviewBar) imagePreviewBar.style.display = "none";
    chatInput.focus();
    if (window.innerWidth <= 768 && sidebar) sidebar.classList.remove("open");
    // Ensure conversations list is refreshed from backend
    await loadConversations(false);
  }

  newChatBtn.addEventListener("click", startNewChat);

  // ==========================================================
  // Custom Modals: Rename & Delete Conversations
  // ==========================================================
  function openRenameModal(convId, currentTitle) {
    pendingRenameConvId = convId;
    if (renameInput) {
      renameInput.value = currentTitle || "";
    }
    if (renameModal) {
      renameModal.style.display = "flex";
      setTimeout(() => {
        if (renameInput) {
          renameInput.focus();
          renameInput.select();
        }
      }, 100);
    }
  }

  function closeRenameModal() {
    if (renameModal) renameModal.style.display = "none";
    pendingRenameConvId = null;
  }

  async function handleConfirmRename() {
    if (!pendingRenameConvId) return;
    const newTitle = renameInput ? renameInput.value.trim() : "";
    if (!newTitle) {
      if (renameInput) renameInput.focus();
      return;
    }
    const convId = pendingRenameConvId;
    closeRenameModal();

    try {
      await fetch(`/api/conversations/${convId}/title`, {
        method: "PATCH",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ title: newTitle })
      });
      if (currentConversationId === convId && currentChatTitle) {
        currentChatTitle.textContent = newTitle;
      }
      await loadConversations();
    } catch (err) {
      console.error("Error renaming conversation:", err);
    }
  }

  if (confirmRenameBtn) confirmRenameBtn.addEventListener("click", handleConfirmRename);
  if (cancelRenameBtn) cancelRenameBtn.addEventListener("click", closeRenameModal);
  if (closeRenameBtn) closeRenameBtn.addEventListener("click", closeRenameModal);
  if (renameInput) {
    renameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleConfirmRename();
      } else if (e.key === "Escape") {
        closeRenameModal();
      }
    });
  }
  if (renameModal) {
    renameModal.addEventListener("click", (e) => {
      if (e.target === renameModal) closeRenameModal();
    });
  }

  function openDeleteModal(convId, title) {
    pendingDeleteConvId = convId;
    if (deleteChatTitlePreview) {
      deleteChatTitlePreview.textContent = title || t("newChat");
    }
    if (deleteModal) deleteModal.style.display = "flex";
  }

  function closeDeleteModal() {
    if (deleteModal) deleteModal.style.display = "none";
    pendingDeleteConvId = null;
  }

  async function handleConfirmDelete() {
    if (!pendingDeleteConvId) return;
    const convId = pendingDeleteConvId;
    closeDeleteModal();
    stopCurrentSpeech();

    try {
      await fetch(`/api/conversations/${convId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (currentConversationId === convId) {
        currentConversationId = null;
      }
      await loadConversations();
      if (!currentConversationId && conversations.length > 0) {
        selectConversation(conversations[0].id);
      } else if (conversations.length === 0) {
        if (currentChatTitle) currentChatTitle.textContent = t("newChat");
        showHeroWelcome();
      }
    } catch (err) {
      console.error("Error deleting conversation:", err);
    }
  }

  if (confirmDeleteBtn) confirmDeleteBtn.addEventListener("click", handleConfirmDelete);
  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener("click", closeDeleteModal);
  if (closeDeleteBtn) closeDeleteBtn.addEventListener("click", closeDeleteModal);
  if (deleteModal) {
    deleteModal.addEventListener("click", (e) => {
      if (e.target === deleteModal) closeDeleteModal();
    });
  }

  if (deleteCurrentChatBtn) {
    deleteCurrentChatBtn.addEventListener("click", () => {
      if (currentConversationId) {
        const conv = conversations.find(c => c.id === currentConversationId);
        openDeleteModal(currentConversationId, conv ? conv.title : "");
      }
    });
  }

  function showHeroWelcome() {
    heroWelcome.style.display = "flex";
    messagesContainer.classList.add("hero-mode");
    chatFlow.innerHTML = "";
    if (typeof advanceToNextSuggestionSet === "function") {
      advanceToNextSuggestionSet();
    } else if (typeof renderSuggestionCards === "function") {
      renderSuggestionCards(currentSuggestionSetIndex);
      startSuggestionTimer();
    }
  }

  // ==========================================================
  // Image Uploading & Preview
  // ==========================================================
  attachBtn.addEventListener("click", () => {
    imageFileInput.click();
  });

  imageFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleAttachedImage(file);
    }
  });

  function handleAttachedImage(file) {
    attachedImageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewName.textContent = file.name;
      imagePreviewBar.style.display = "block";
      chatInput.focus();
    };
    reader.readAsDataURL(file);
  }

  removeImgBtn.addEventListener("click", () => {
    attachedImageFile = null;
    imageFileInput.value = "";
    imagePreviewBar.style.display = "none";
    previewImage.src = "";
  });

  // Drag and drop images
  window.addEventListener("dragover", (e) => e.preventDefault());
  window.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleAttachedImage(file);
      }
    }
  });

  // Paste image from clipboard (Ctrl+V)
  window.addEventListener("paste", (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile();
        handleAttachedImage(file);
        break;
      }
    }
  });

  // ==========================================================
  // Dynamic Continuously Rotating Suggestions & Subtitles
  // ==========================================================
  const suggestionGrid = document.getElementById("suggestionGrid");
  const heroSubtitleEl = document.getElementById("heroSubtitle");
  const refreshCardsBtn = document.getElementById("refreshCardsBtn");

  const suggestionSets = [
    // 1: الإنتاجية والتحليل البصري والرياضيات
    [
      {
        id: "img_extract",
        color: "card-blue",
        titleAr: "تحليل وتلخيص الصور",
        descAr: "إرفع أي صورة، مستند أو رسم بياني، واطلب تحليلها بدقة",
        promptAr: "حلل هذه الصورة بالتفصيل واستخرج أي نص أو معلومات هامة منها",
        titleEn: "Image & Text Extraction",
        descEn: "Upload any document, chart or image to extract and analyze data",
        promptEn: "Analyze this image in detail and extract all key data and text",
        needImage: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`
      },
      {
        id: "daily_planner",
        color: "card-orange",
        titleAr: "تخطيط وجدولة اليوم",
        descAr: "نظم مهامك وأولوياتك، واعمل على تحقيق أهدافك اليومية",
        promptAr: "ساعدني كرفيق شخصي في وضع جدول يومي واقعي ومثالي لزيادة الإنتاجية والتوازن اليوم",
        titleEn: "Daily Planning & Focus",
        descEn: "Organize tasks and priorities to achieve your daily goals",
        promptEn: "Help me create an optimal daily schedule to boost productivity and balance",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
      },
      {
        id: "math_science",
        color: "card-pink",
        titleAr: "المسائل العلمية والرياضيات",
        descAr: "حلول دقيقة خطوة بخطوة مع شرح القوانين والمعادلات",
        promptAr: "أحتاج إلى حل وشرح دقيق وخطوة بخطوة لمسألة رياضية أو فيزيائية",
        titleEn: "Math & Science Solver",
        descEn: "Step-by-step solutions with clear conceptual explanations",
        promptEn: "I need a step-by-step explanation and solution for a math or physics problem",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path></svg>`
      },
      {
        id: "code_explain",
        color: "card-green",
        titleAr: "شرح المفاهيم والبرمجة",
        descAr: "اشرح أي فكرة تقنية، تعلم مهارة، وامتلك أدوات برمجية عملية",
        promptAr: "اشرح لي بالتفصيل وبأمثلة عملية كيف يعمل هذا المفهوم التقني مع كود توضيحي بسيط",
        titleEn: "Code & Concepts",
        descEn: "Understand complex tech concepts and build practical tools",
        promptEn: "Explain this technical concept with practical examples and clear code",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
      }
    ],

    // 2: البرمجة المتقدمة وهندسة النظم
    [
      {
        id: "build_app",
        color: "card-green",
        titleAr: "كتابة وبناء الأكواد البرمجية",
        descAr: "كتابة سكربتات، تطبيقات ويب، وتطوير برمجيات متكاملة",
        promptAr: "ساعدني في كتابة كود برمجي احترافي ومنظم لتطبيق عملي مع شرح طريقة التشغيل",
        titleEn: "Code Development",
        descEn: "Build robust scripts, web tools, and full applications",
        promptEn: "Help me write clean, professional code for a real-world app with setup instructions",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
      },
      {
        id: "debug_code",
        color: "card-orange",
        titleAr: "تصحيح واكتشاف الأخطاء",
        descAr: "الصق كودك لاكتشاف الثغرات وتصليح المشاكل وتحسين السرعة",
        promptAr: "سأرسل لك كوداً برمجياً، حدد لي الأخطاء فيه، واشرح سببها، وقدم النسخة المصححة والمحسنة",
        titleEn: "Bug Fixing & Debugging",
        descEn: "Inspect code, fix syntax and logical bugs, and boost speed",
        promptEn: "I will provide code; identify any bugs, explain their cause, and provide the fixed code",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="7"></circle><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`
      },
      {
        id: "db_design",
        color: "card-blue",
        titleAr: "تصميم قواعد البيانات (SQL)",
        descAr: "هندسة الجداول والعلاقات واستعلامات SQL عالية الكفاءة",
        promptAr: "كيف أصمم هيكل قاعدة بيانات فعالة وسريعة لمشروعي مع استعلامات SQL الأساسية؟",
        titleEn: "Database & SQL Design",
        descEn: "Schema architecture, relations, and optimized queries",
        promptEn: "How do I design a high-performance database schema with key SQL queries?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`
      },
      {
        id: "deep_algorithms",
        color: "card-pink",
        titleAr: "الخوارزميات وهياكل البيانات",
        descAr: "شرح خوارزميات الترتيب والبحث مع تعقيد الوقت والمساحة",
        promptAr: "اشرح لي خوارزمية البحث الثنائي أو البرمجة الديناميكية بأسلوب مبسط مع تحليل التعقيد O(n)",
        titleEn: "Algorithms & Data Structures",
        descEn: "Grok sorting, search, graphs, and dynamic programming",
        promptEn: "Explain binary search or dynamic programming with visual steps and Big-O analysis",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line></svg>`
      }
    ],

    // 3: الرياضة والبحث المباشر والأخبار
    [
      {
        id: "live_football",
        color: "card-blue",
        titleAr: "مباريات اليوم والرياضة",
        descAr: "جدول أهم المباريات، المواعيد الحية، والنتائج مع القنوات الناقلة",
        promptAr: "ما هي أهم مباريات اليوم ومواعيدها والقنوات الناقلة بالتفصيل؟",
        titleEn: "Today's Matches & Sports",
        descEn: "Live match schedules, fixtures, results, and broadcast channels",
        promptEn: "What are today's top football matches, kickoff times, and broadcast channels?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>`
      },
      {
        id: "live_news",
        color: "card-orange",
        titleAr: "أحدث الأخبار والتقنية",
        descAr: "بحث حي في الإنترنت بالثانية لتلخيص أحدث الأحداث العالمية",
        promptAr: "ابحث في الإنترنت وأخبرني بأحدث التطورات العلمية والتقنية اليوم بالتفصيل",
        titleEn: "Latest News & Tech",
        descEn: "Real-time web search for breaking tech news and events",
        promptEn: "Search the web and provide a detailed summary of today's top tech breakthroughs",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
      },
      {
        id: "startup_ideas",
        color: "card-pink",
        titleAr: "أفكار مشاريع ودراسات جدوى",
        descAr: "اقتراحات مشاريع ريادية مبتكرة مع خطط التنفيذ ونموذج العمل",
        promptAr: "اقترح لي 5 أفكار مشاريع ذكية وناشئة لعام 2026 مع خطوات البدء وتحديد الفئات المستهدفة",
        titleEn: "Startup Ideas & Plans",
        descEn: "Innovative business concepts with actionable roadmaps",
        promptEn: "Suggest 5 innovative startup ideas for 2026 with validation steps and target audience",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
      },
      {
        id: "deep_thinking",
        color: "card-green",
        titleAr: "التحليل والتفكير العميق",
        descAr: "تحليل معمق للأفكار المعقدة والمقارنات الفلسفية المتوازنة",
        promptAr: "ناقش معي فكرة فلسفية أو علمية معقدة وحللها بعمق من كافة الزوايا المختلفة",
        titleEn: "Deep Critical Thinking",
        descEn: "Multifaceted analysis of intricate philosophical and real questions",
        promptEn: "Analyze a complex intellectual question deeply from multiple philosophical angles",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path><line x1="9" y1="21" x2="15" y2="21"></line></svg>`
      }
    ],

    // 4: الكتابة والترجمة وصناعة المحتوى
    [
      {
        id: "pro_translation",
        color: "card-orange",
        titleAr: "الترجمة والتدقيق اللغوي",
        descAr: "ترجمة دقيقة تحافظ على السياق مع شرح المفردات والقواعد",
        promptAr: "ترجم لي هذا النص ترجمة طبيعية بليغة مع شرح الكلمات الصعبة وتصحيح أي أخطاء",
        titleEn: "Professional Translation",
        descEn: "Contextual human-grade translation and grammar checking",
        promptEn: "Translate this text smoothly into natural language and highlight tough vocabulary",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"></path></svg>`
      },
      {
        id: "creative_writing",
        color: "card-pink",
        titleAr: "صياغة المقالات ورسائل البريد",
        descAr: "كتابة محتوى جذاب ومقالات ورسائل رسمية بتنسيق احترافي",
        promptAr: "اكتب لي بريداً إلكترونياً رسمياً مقنعاً ومنظماً لطلب شراكة أو مقابلة عمل",
        titleEn: "Writing & Professional Emails",
        descEn: "Craft compelling essays, articles, and executive correspondence",
        promptEn: "Write a persuasive, highly professional email proposing a business collaboration",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`
      },
      {
        id: "book_summary",
        color: "card-green",
        titleAr: "تلخيص الكتب وتطوير الذات",
        descAr: "أهم خلاصات الكتب العالمية الشهيرة مع خطوات تطبيقية عملية",
        promptAr: "لخص لي أهم أفكار كتاب العادات الذرية وكيف يمكنني تطبيقه عملياً في روتيني اليومي؟",
        titleEn: "Book Summaries & Wisdom",
        descEn: "Key takeaways from top bestselling non-fiction books",
        promptEn: "Summarize the key principles of 'Atomic Habits' and give a 7-day action plan",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`
      },
      {
        id: "doc_data_extract",
        color: "card-blue",
        titleAr: "استخراج البيانات من المستندات",
        descAr: "تحويل الصور والفواتير والجداول إلى أرقام منظمة قابلة للنسخ",
        promptAr: "استخرج كافة البيانات والأرقام والجداول من هذا المستند ونظمها في جدول مرتب",
        titleEn: "Document & Data Extraction",
        descEn: "Extract tabular numbers, invoices, and records cleanly",
        promptEn: "Extract all numbers and data from this document and organize them into a clean markdown table",
        needImage: true,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
      }
    ],

    // 5: العلوم والكون واللغات والصحة
    [
      {
        id: "universe_physics",
        color: "card-pink",
        titleAr: "أسرار الكون والفيزياء",
        descAr: "شرح علم الفلك، النسبية، وميكانيكا الكم بأسلوب مبهر وسهل",
        promptAr: "اشرح لي نظرية النسبية العامة لأينشتاين ومفهوم انحناء الزمكان بأبسط أسلوب ممكن",
        titleEn: "Physics & Cosmology",
        descEn: "Explore relativity, quantum mechanics, and deep space",
        promptEn: "Explain Einstein's General Relativity and spacetime curvature in the simplest intuitive way",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
      },
      {
        id: "fitness_health",
        color: "card-green",
        titleAr: "الرياضة والروتين الصحي",
        descAr: "برامج تمارين رياضية متوازنة وتوجيهات غذائية لزيادة الطاقة",
        promptAr: "ضع لي برنامجاً تدريبياً وتمارين منزلية لمدة 4 أسابيع مع نصائح غذائية صحية",
        titleEn: "Fitness & Nutrition",
        descEn: "Custom workout splits, nutrition tips, and energy habits",
        promptEn: "Create a 4-week bodyweight home workout routine with practical nutrition tips",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`
      },
      {
        id: "math_calculus",
        color: "card-blue",
        titleAr: "حل التفاضل والتكامل",
        descAr: "حل المعادلات الجبرية والتفاضلية المعقدة مع تفصيل كل خطوة",
        promptAr: "احسب لي تكامل هذه الدالة مع توضيح خطوات الحل والقواعد الرياضية المطبقة",
        titleEn: "Calculus & Algebra",
        descEn: "Derivatives, integrals, and equation solving step-by-step",
        promptEn: "Solve this calculus integration step-by-step showing the mathematical rules used",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>`
      },
      {
        id: "lang_conversation",
        color: "card-orange",
        titleAr: "ممارسة المحادثة باللغات",
        descAr: "حوار تفاعلي بالإنجليزية أو الفرنسية مع تصحيح النطق والقواعد",
        promptAr: "دعنا نتحدث باللغة الإنجليزية في موضوع يومي، وصحح لي أي خطأ لغوي فوراً",
        titleEn: "Language Practice",
        descEn: "Interactive dialogues in English or French with instant corrections",
        promptEn: "Let's roleplay a conversation in English and correct any grammar mistakes I make",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`
      }
    ],

    // 6: ذكاء الأعمال والتسويق الرقمي
    [
      {
        id: "digital_marketing",
        color: "card-blue",
        titleAr: "استراتيجيات التسويق الرقمي",
        descAr: "خطط إعلانية مبتكرة، استهداف الجمهور، وصناعة حملات تسويقية ناجحة",
        promptAr: "ضع لي خطة تسويق رقمي متكاملة ومبتكرة لمشروعي لاستهداف العملاء وتحقيق أعلى عائد",
        titleEn: "Digital Marketing Strategy",
        descEn: "Ad campaigns, audience targeting, and high-ROI growth tactics",
        promptEn: "Create a complete digital marketing blueprint for my business to acquire customers effectively",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`
      },
      {
        id: "pitch_deck",
        color: "card-orange",
        titleAr: "صياغة العروض الاستثمارية (Pitch Deck)",
        descAr: "هيكلة شرائح عرض تقديمي مقنع لجذب المستثمرين والشركاء",
        promptAr: "كيف أصوغ شرائح عرض استثماري (Pitch Deck) من 10 شرائح يقنع المستثمرين بتمويل فكرتي؟",
        titleEn: "Pitch Deck & Funding",
        descEn: "Structure compelling 10-slide decks that win investors over",
        promptEn: "Help me structure an impactful 10-slide investor pitch deck for my business idea",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
      },
      {
        id: "pricing_strategy",
        color: "card-pink",
        titleAr: "هندسة التسعير وتعظيم الأرباح",
        descAr: "نماذج تسعير المنتجات والخدمات وحساب نقطة التعادل وهوامش الربح",
        promptAr: "ما هي أفضل استراتيجية تسعير لخدمتي الجديدة لضمان الربحية وجذب العملاء؟",
        titleEn: "Pricing & Profit Models",
        descEn: "Value-based pricing, unit economics, and break-even targets",
        promptEn: "What is the best pricing strategy for my new service to maximize profitability and traction?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
      },
      {
        id: "competitor_analysis",
        color: "card-green",
        titleAr: "تحليل المنافسين ومصفوفة SWOT",
        descAr: "كشف نقاط القوة والضعف وتحديد الميزة التنافسية الحصرية لمشروعك",
        promptAr: "ساعدني في إجراء تحليل تنافسي ومصفوفة SWOT شاملة لمشروعي لتحديد ميزتي التنافسية",
        titleEn: "Competitor & SWOT Analysis",
        descEn: "Uncover gaps, weaknesses, and unfair competitive advantages",
        promptEn: "Conduct a comprehensive competitor and SWOT analysis to find my unique market edge",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`
      }
    ],

    // 7: الذكاء الاصطناعي والأتمتة المستقبلية
    [
      {
        id: "prompt_engineering",
        color: "card-orange",
        titleAr: "هندسة الأوامر الذكية (Prompting)",
        descAr: "صياغة أوامر احترافية (System Prompts) لاستخراج أفضل النتائج من الـ AI",
        promptAr: "علمني كيف أصيغ أمراً فائق الدقة (Prompt) بمبدأ الدور والسياق والقيود لمهمتي",
        titleEn: "Prompt Engineering",
        descEn: "Craft elite system prompts with role, context, and constraints",
        promptEn: "Teach me how to engineer a high-precision prompt using role, context, and few-shot techniques",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>`
      },
      {
        id: "ai_agents",
        color: "card-blue",
        titleAr: "بناء وكلاء الذكاء الاصطناعي (AI Agents)",
        descAr: "تصميم وكلاء مستقلين لتنفيذ مهام متعددة الخطوات تلقائياً وبدقة",
        promptAr: "كيف أبني وكيلاً ذكياً (AI Agent) قادر على استخدام الأدوات والبحث واتخاذ القرارات ذاتياً؟",
        titleEn: "Building AI Agents",
        descEn: "Architect autonomous agents that reason and execute multi-step tools",
        promptEn: "How do I build an autonomous AI agent capable of using tools and reasoning independently?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`
      },
      {
        id: "task_automation",
        color: "card-green",
        titleAr: "أتمتة المهام اليومية بـ Python",
        descAr: "توفير الساعات عبر سكربتات لتنظيم الملفات وجلب البيانات التلقائي",
        promptAr: "اكتب لي سكربت Python لأتمتة مهمة متكررة وتوفير وقت العمل اليومي",
        titleEn: "Python Task Automation",
        descEn: "Automate repetitive workflows, file parsing, and web scraping",
        promptEn: "Write a clean Python script to automate a repetitive daily file management or data task",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
      },
      {
        id: "future_tech_trends",
        color: "card-pink",
        titleAr: "استشراف الثورات التكنولوجية القادمة",
        descAr: "استكشاف آفاق الحوسبة الكمية، التكنولوجيا الحيوية، والذكاء الاصطناعي الفائق",
        promptAr: "ما هي أهم 5 تحولات تكنولوجية ستغير العالم في السنوات القادمة وكيف أستعد لها؟",
        titleEn: "Future Tech & Emerging Trends",
        descEn: "Explore quantum computing, biotech, and next-gen breakthroughs",
        promptEn: "What are the top 5 transformative technology shifts of this decade and how should I prepare?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
      }
    ],

    // 8: تحليل البيانات وإكسل المتقدم
    [
      {
        id: "excel_mastery",
        color: "card-green",
        titleAr: "أسرار معادلات Excel و Sheets",
        descAr: "صيغ VLOOKUP, INDEX/MATCH, XLOOKUP, والدوال المركبة المتقدمة",
        promptAr: "أعطني صيغة إكسل متقدمة للبحث عن قيم مطابقة متعددة ودمج النتائج تلقائياً",
        titleEn: "Excel & Sheets Formulas",
        descEn: "Master XLOOKUP, INDEX/MATCH, QUERY, and nested logic",
        promptEn: "Provide an advanced Excel formula to cross-reference multiple columns and aggregate matching records",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`
      },
      {
        id: "data_viz_dashboards",
        color: "card-blue",
        titleAr: "تصميم لوحات البيانات (Dashboards)",
        descAr: "تحويل الأرقام الصامتة إلى رسوم بيانية تفاعلية ومؤشرات أداء واضحة (KPIs)",
        promptAr: "كيف أصمم لوحة بيانات تفاعلية تعرض مؤشرات الأداء الرئيسية (KPIs) بوضوح لمتخذي القرار؟",
        titleEn: "Data Dashboards & KPIs",
        descEn: "Turn raw metrics into interactive charts and executive insights",
        promptEn: "How do I structure an executive dashboard displaying key KPIs clearly for decision-makers?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
      },
      {
        id: "data_cleaning",
        color: "card-orange",
        titleAr: "تنظيف وتجهيز البيانات (Data Cleaning)",
        descAr: "معالجة القيم المفقودة، إزالة التكرار، وتوحيد تنسيقات التواريخ والنصوص",
        promptAr: "ما هي أفضل الخطوات البرمجية بـ Pandas لتنظيف مجموعة بيانات مليئة بالفراغات والأخطاء؟",
        titleEn: "Data Cleaning & Prep",
        descEn: "Handle missing values, outliers, and normalization cleanly",
        promptEn: "What are the best Pandas techniques to clean and normalize a messy dataset with missing values?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`
      },
      {
        id: "stat_testing",
        color: "card-pink",
        titleAr: "التحليل الإحصائي واختبار الفرضيات",
        descAr: "فهم الانحراف المعياري، اختبار T-test، ومستويات الدلالة الإحصائية (p-value)",
        promptAr: "اشرح لي مفهوم الدلالة الإحصائية (P-value) واختبار A/B Testing بطريقة مبسطة وعملية",
        titleEn: "Statistical Analysis & A/B Tests",
        descEn: "Grok p-values, hypothesis testing, confidence intervals, and variance",
        promptEn: "Explain p-values and A/B hypothesis testing simply with a real business example",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>`
      }
    ],

    // 9: الدراسة والامتحانات والتعلم الفائق
    [
      {
        id: "feynman_learning",
        color: "card-pink",
        titleAr: "تقنية فاينمان للشرح والتبسيط",
        descAr: "فهم أصعب القوانين والنظريات عبر إعادة شرحها بأبسط الكلمات الممكنة",
        promptAr: "استخدم تقنية فاينمان واشرح لي مفهوماً معقداً بأسلوب مبسط جداً بدون مصطلحات غامضة",
        titleEn: "Feynman Learning Technique",
        descEn: "Master complex subjects by teaching them in ultra-simple terms",
        promptEn: "Use the Feynman technique to explain a complicated concept in simple terms without jargon",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`
      },
      {
        id: "exam_prep_schedule",
        color: "card-green",
        titleAr: "خطة مراجعة الامتحانات الذكية",
        descAr: "جدول زمني مبني على التكرار المتباعد (Spaced Repetition) لتجنب الضغط",
        promptAr: "ضع لي جدول مراجعة دراسية مبنياً على التكرار المتباعد لإنهاء المقررات قبل الامتحانات",
        titleEn: "Exam Prep & Spaced Repetition",
        descEn: "Science-backed study schedules that eliminate exam panic",
        promptEn: "Create a study schedule using spaced repetition to master my exam material without stress",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`
      },
      {
        id: "memory_palace",
        color: "card-orange",
        titleAr: "تقنية قصر الذاكرة والاستذكار",
        descAr: "حفظ القوائم والتواريخ والمفاهيم الطويلة وربطها بمواقع بصرية ثابتة",
        promptAr: "كيف أستخدم تقنية قصر الذاكرة (Memory Palace) لحفظ قائمة طويلة من المعلومات بسرعة؟",
        titleEn: "Memory Palace Technique",
        descEn: "Memorize lists, terms, and dates using visual spatial loci",
        promptEn: "How do I build and use a Memory Palace to memorize long lists of information rapidly?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>`
      },
      {
        id: "mind_mapping",
        color: "card-blue",
        titleAr: "الخرائط الذهنية وتلخيص الفصول",
        descAr: "تحويل الكتب والمحاضرات الطويلة إلى مخطط هيكلي سهل المراجعة",
        promptAr: "لخص لي هذا الفصل الدراسي في خريطة ذهنية هيكلية واضحة بنقاط متفرعة",
        titleEn: "Mind Mapping & Outlining",
        descEn: "Convert dense textbooks into clear hierarchical visual outlines",
        promptEn: "Summarize this dense chapter into a structured mind map with clear key branches",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`
      }
    ],

    // 10: التصميم وتجربة المستخدم والإبداع
    [
      {
        id: "ui_ux_audit",
        color: "card-blue",
        titleAr: "تقييم واجهات وتجربة المستخدم (UI/UX)",
        descAr: "فحص سهولة الاستخدام، تحسين مسار العميل، وزيادة معدل التحويل",
        promptAr: "كيف أقيّم واجهة مستخدم تطبيقي وفق معايير سهولة الاستخدام العشرة (Heuristics)؟",
        titleEn: "UI/UX Usability Audit",
        descEn: "Evaluate user flows, Nielsen heuristics, and conversion friction",
        promptEn: "How do I audit my app interface using Nielsen's 10 usability heuristics?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
      },
      {
        id: "color_palettes",
        color: "card-pink",
        titleAr: "تناسق الألوان والهوية البصرية",
        descAr: "اختيار لوحات ألوان احترافية متناغمة مع رمزيتها النفسية للعلامة التجارية",
        promptAr: "اقترح لي لوحة ألوان حديثة متناسقة لمشروع تقني مع أكواد HEX ورمزية كل لون",
        titleEn: "Color Harmony & Brand Palette",
        descEn: "Curate modern color palettes with HEX codes and color psychology",
        promptEn: "Suggest a modern cohesive color palette with HEX codes and psychological resonance for my project",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`
      },
      {
        id: "ux_copywriting",
        color: "card-orange",
        titleAr: "كتابة نصوص الواجهات (UX Writing)",
        descAr: "صياغة نصوص واضحة ومقنعة للأزرار والتنبيهات ورسائل الخطأ",
        promptAr: "أعد صياغة هذه الرسائل داخل التطبيق لتكون واضحة، لطيفة، ومحفزة للمستخدم على المتابعة",
        titleEn: "UX Microcopy & Messaging",
        descEn: "Craft clear, human, action-oriented button copy and error alerts",
        promptEn: "Rewrite these interface error states and call-to-actions to be warm, clear, and reassuring",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`
      },
      {
        id: "creative_brainstorm",
        color: "card-green",
        titleAr: "العصف الذهني وتقنية SCAMPER",
        descAr: "توليد حلول ابتكارية للمشاكل المعقدة عبر زوايا غير تقليدية",
        promptAr: "طبق تقنية SCAMPER لتطوير وتحسين هذا المنتج أو الخدمة واقتراح أفكار غير مسبوقة",
        titleEn: "SCAMPER Creative Brainstorming",
        descEn: "Generate innovative breakthrough ideas using lateral thinking",
        promptEn: "Apply the SCAMPER method to revolutionize this product with innovative out-of-the-box features",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      }
    ],

    // 11: التطوير الشخصي والمهارات القيادية
    [
      {
        id: "negotiation_skills",
        color: "card-orange",
        titleAr: "فنون التفاوض والإقناع الذكي",
        descAr: "مبادئ هارفارد للتفاوض، كسب الصفقات، وبناء علاقات رابحة للطرفين (Win-Win)",
        promptAr: "كيف أتفاوض بذكاء على زيادة راتب أو عقد عمل وفق مبادئ التفاوض القائم على المصالح؟",
        titleEn: "Strategic Negotiation",
        descEn: "Harvard principles to secure deals and mutual win-win agreements",
        promptEn: "How do I negotiate a contract or salary raise effectively using interest-based negotiation?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
      },
      {
        id: "public_speaking",
        color: "card-pink",
        titleAr: "الإلقاء والخطابة أمام الجمهور",
        descAr: "التغلب على رهبة المسرح، نبرة الصوت الواثقة، وهيكلة عرض تقديمي ساحر",
        promptAr: "ساعدني في تحضير افتتاحية قوية لخطاب أو عرض تقديمي تجذب انتباه الحضور من أول دقيقة",
        titleEn: "Public Speaking & Charisma",
        descEn: "Overcome stage fright, command presence, and craft memorable hooks",
        promptEn: "Help me script a magnetic hook for a presentation that captivates the room in the first 60 seconds",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
      },
      {
        id: "habit_loop",
        color: "card-green",
        titleAr: "هندسة العادات وإلغاء التسويف",
        descAr: "آليات الدوبامين، حلقة الإشارة والمكافأة، وقاعدة الدقيقتين لبدء المهام فوراً",
        promptAr: "كيف أتغلب على التسويف والمماطلة في مشروع كبير باستخدام قاعدة الدقيقتين وتجزئة المهام؟",
        titleEn: "Habit Loops & Anti-Procrastination",
        descEn: "Dopamine cues, two-minute rule, and sustainable productivity routines",
        promptEn: "How do I conquer deep procrastination on a large project using the 2-minute rule and micro-steps?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`
      },
      {
        id: "emotional_intel",
        color: "card-blue",
        titleAr: "الذكاء العاطفي وإدارة الضغوط",
        descAr: "الهدوء تحت الضغط، التواصل غير العنيف، وفهم دوافع النفس والآخرين",
        promptAr: "كيف أتعامل بذكاء عاطفي وهدوء مع زميل عمل صعب أو موقف يتسم بالتوتر الحاد؟",
        titleEn: "Emotional Intelligence & Calm",
        descEn: "Composure under pressure, nonviolent communication, and empathy",
        promptEn: "How do I handle a high-stress workplace conflict calmly and assertively using emotional intelligence?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
      }
    ],

    // 12: الفلسفة والألغاز والتفكير الاستراتيجي
    [
      {
        id: "logic_puzzles",
        color: "card-blue",
        titleAr: "ألغاز منطقية وتكتيكات الشطرنج",
        descAr: "تحديات تفكير واستنتاج رياضي ومنطقي لتدريب الدماغ على التفكير المستقبلي",
        promptAr: "أعطني لغزاً منطقياً ذكياً يتطلب تفكيراً استنتاجياً عميقاً لحله مع إعطائي فرصة للمحاولة",
        titleEn: "Logic Puzzles & Tactics",
        descEn: "Brain teasers and deductive reasoning challenges to sharpen mental agility",
        promptEn: "Give me an intriguing logic riddle that requires deductive reasoning, and let me try solving it first",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
      },
      {
        id: "mental_models",
        color: "card-green",
        titleAr: "النماذج الذهنية لاتخاذ القرارات",
        descAr: "مبدأ باريتو 80/20، مصفوفة أيزنهاور، والتفكير من الدرجة الثانية",
        promptAr: "اشرح لي كيف أستخدم التفكير من الدرجة الثانية (Second-Order Thinking) لتجنب العواقب غير المقصودة",
        titleEn: "Mental Models for Decisions",
        descEn: "Second-order thinking, Pareto principle, and inversion techniques",
        promptEn: "Explain how to apply second-order thinking to avoid unintended consequences in major decisions",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`
      },
      {
        id: "first_principles",
        color: "card-orange",
        titleAr: "التفكير من المبادئ الأولى (First Principles)",
        descAr: "تفكيك المسائل المعقدة إلى حقائقها الفيزيائية الأساسية دون تقليد الآخرين",
        promptAr: "كيف أطبق أسلوب التفكير من المبادئ الأولى (First Principles) لإيجاد حل جذري لمشكلتي؟",
        titleEn: "First Principles Thinking",
        descEn: "Boil challenges down to fundamental truths and innovate from the ground up",
        promptEn: "How do I apply first principles reasoning to solve a tough dilemma from scratch instead of by analogy?",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
      },
      {
        id: "decision_matrix",
        color: "card-pink",
        titleAr: "مصفوفة اتخاذ القرارات المصيرية",
        descAr: "تقييم الخيارات المعقدة بأوزان ونقاط موضوعية لحسم القرارات الحياتية والمهنية",
        promptAr: "ساعدني في بناء مصفوفة قرار بالأوزان (Weighted Decision Matrix) للمفاضلة بين خيارين مهمين",
        titleEn: "Weighted Decision Matrix",
        descEn: "Objective weighted scoring to evaluate critical career and life forks",
        promptEn: "Help me construct a weighted decision matrix to choose objectively between two major opportunities",
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>`
      }
    ]
  ];

  const heroSubtitles = [
    {
      ar: "رفيقك ومساعدك الشخصي اليومي، فائق الذكاء للإجابة على الأسئلة، تنظيم يومك، وتحليل الصور بدقة متناهية 🌟",
      en: "Your personal daily companion, ultra-intelligent for answering questions, organizing your day, and analyzing images."
    },
    {
      ar: "مساعدك البرمجي المتطور لكتابة وتصحيح الأكواد البرمجية، هندسة النظم، وحل أصعب المسائل التقنية 💻",
      en: "Your advanced coding assistant for writing and debugging code, system design, and technical mastery."
    },
    {
      ar: "مرتبط بالإنترنت والأحداث بالثانية لتزويدك بأحدث الأخبار، المباريات الرياضية، والنتائج المباشرة 🌐",
      en: "Connected to real-time events to give you live news, football fixtures, and up-to-the-second updates."
    },
    {
      ar: "شريكك الإبداعي في الترجمة الفورية، صياغة المقالات، وتلخيص أمهات الكتب العالمية 📚",
      en: "Your creative partner for fluent translation, professional writing, and world-class book summaries."
    },
    {
      ar: "مرشدك العلمي في استكشاف أسرار الكون، حل المعادلات الرياضية، وبناء الروتين الرياضي والصحي 🪐",
      en: "Your scientific mentor for exploring the cosmos, solving calculus, and crafting healthy fitness routines."
    },
    {
      ar: "مستشارك الاستراتيجي في ريادة الأعمال، دراسات الجدوى، وخطط التسويق الرقمي وتنمية الأرباح 📈",
      en: "Your strategic business advisor for startup modeling, investor pitch decks, and digital marketing."
    },
    {
      ar: "بوابتك المتقدمة لهندسة الأوامر، أتمتة المهام بـ Python، وتطوير وكلاء الذكاء الاصطناعي ⚡",
      en: "Your gateway to expert prompt engineering, Python automation scripts, and autonomous AI agents."
    },
    {
      ar: "محلل البيانات الذكي لكشف أنماط الجداول، معادلات إكسل المعقدة، وبناء لوحات المؤشرات التفاعلية 📊",
      en: "Your smart data analyst for Excel formulas, dataset cleaning, and interactive executive KPI dashboards."
    },
    {
      ar: "رفيقك الدراسي لاجتياز الامتحانات بتفوق عبر تقنيات التعلم الفائق وقصر الذاكرة والخرائط الذهنية 🎓",
      en: "Your academic mentor for mastering exams with the Feynman technique, spaced repetition, and mind mapping."
    },
    {
      ar: "معملك الإبداعي لهندسة تجربة المستخدم UI/UX، تناسق الألوان، وتوليد أفكار تصميم غير مسبوقة 🎨",
      en: "Your creative lab for UI/UX heuristic audits, brand color palettes, and lateral brainstorming."
    },
    {
      ar: "مدربك الشخصي لتطوير المهارات القيادية، فنون التفاوض والإقناع، وبناء عادات النجاح المستدامة 🏆",
      en: "Your leadership coach for high-stakes negotiation, magnetic public speaking, and sustainable habits."
    },
    {
      ar: "مساحتك الفكرية العميقة لحل الألغاز المنطقية، التفكير الاستراتيجي، وتطبيق النماذج الذهنية لحل المعضلات 🧩",
      en: "Your intellectual haven for logic puzzles, first-principles thinking, and decision matrix models."
    }
  ];

  // Non-repeating Shuffle Deck System
  let suggestionDeck = [];
  let deckPointer = 0;
  let currentSuggestionSetIndex = 0;
  let suggestionIntervalTimer = null;
  const ROTATION_INTERVAL = 3000; // 3 seconds rotation as requested

  function initSuggestionDeck() {
    const indices = Array.from({ length: suggestionSets.length }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // Prevent immediate repeat at cycle boundaries
    if (indices.length > 1 && indices[0] === currentSuggestionSetIndex) {
      [indices[0], indices[1]] = [indices[1], indices[0]];
    }
    suggestionDeck = indices;
    deckPointer = 0;
  }

  function getNextSuggestionSetIndex() {
    if (suggestionDeck.length === 0 || deckPointer >= suggestionDeck.length) {
      initSuggestionDeck();
    }
    return suggestionDeck[deckPointer++];
  }

  function renderSuggestionCards(setIndex) {
    if (!suggestionGrid) return;
    const cards = suggestionSets[setIndex] || suggestionSets[0];
    const isAr = currentLanguage === "ar";

    suggestionGrid.innerHTML = cards.map(c => {
      const title = isAr ? c.titleAr : c.titleEn;
      const desc = isAr ? c.descAr : c.descEn;
      const prompt = isAr ? c.promptAr : c.promptEn;
      const badgeClass = c.color.replace("card-", "badge-");

      return `
        <div class="suggestion-card ${c.color}" data-prompt="${prompt.replace(/"/g, '&quot;')}" data-need-image="${c.needImage ? 'true' : 'false'}">
          <div class="card-arrow-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
          <div class="card-content">
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
          <div class="card-icon-badge ${badgeClass}">
            ${c.icon}
          </div>
        </div>
      `;
    }).join("");

    // Wire click handlers for newly rendered cards
    suggestionGrid.querySelectorAll(".suggestion-card").forEach(card => {
      card.addEventListener("click", () => {
        const promptText = card.dataset.prompt;
        const needImage = card.dataset.needImage === "true";
        if (needImage && !attachedImageFile) {
          imageFileInput.click();
          chatInput.value = promptText;
        } else {
          chatInput.value = promptText;
          sendMessage();
        }
      });
    });
  }

  function isHeroSectionVisible() {
    if (!heroWelcome) return false;
    return heroWelcome.style.display !== "none" && window.getComputedStyle(heroWelcome).display !== "none";
  }

  function advanceToNextSuggestionSet() {
    currentSuggestionSetIndex = getNextSuggestionSetIndex();
    renderSuggestionCards(currentSuggestionSetIndex);
    if (heroSubtitleEl) {
      const subObj = heroSubtitles[currentSuggestionSetIndex % heroSubtitles.length];
      heroSubtitleEl.textContent = currentLanguage === "ar" ? subObj.ar : subObj.en;
    }
    startSuggestionTimer();
  }

  function cycleSuggestions() {
    if (!suggestionGrid || !isHeroSectionVisible()) return;

    suggestionGrid.classList.add("grid-fading");
    if (heroSubtitleEl) heroSubtitleEl.classList.add("subtitle-fading");

    setTimeout(() => {
      currentSuggestionSetIndex = getNextSuggestionSetIndex();
      renderSuggestionCards(currentSuggestionSetIndex);

      if (heroSubtitleEl) {
        const subObj = heroSubtitles[currentSuggestionSetIndex % heroSubtitles.length];
        heroSubtitleEl.textContent = currentLanguage === "ar" ? subObj.ar : subObj.en;
      }

      requestAnimationFrame(() => {
        suggestionGrid.classList.remove("grid-fading");
        if (heroSubtitleEl) heroSubtitleEl.classList.remove("subtitle-fading");
      });
    }, 240);
  }

  function startSuggestionTimer() {
    stopSuggestionTimer();
    suggestionIntervalTimer = setInterval(() => {
      cycleSuggestions();
    }, ROTATION_INTERVAL);
  }

  function stopSuggestionTimer() {
    if (suggestionIntervalTimer) {
      clearInterval(suggestionIntervalTimer);
      suggestionIntervalTimer = null;
    }
  }

  function restartSuggestionTimer() {
    stopSuggestionTimer();
    startSuggestionTimer();
  }

  // Hover to pause: keeps cards completely steady while reading or hovering
  if (suggestionGrid) {
    suggestionGrid.addEventListener("mouseenter", () => {
      stopSuggestionTimer();
    });
    suggestionGrid.addEventListener("mouseleave", () => {
      if (isHeroSectionVisible()) {
        startSuggestionTimer();
      }
    });
  }

  // Pause rotation when user is focusing or typing in the chat input
  if (chatInput) {
    chatInput.addEventListener("focus", () => {
      stopSuggestionTimer();
    });
    chatInput.addEventListener("blur", () => {
      if (!chatInput.value.trim() && isHeroSectionVisible()) {
        startSuggestionTimer();
      }
    });
  }

  // Initialize non-repeating deck and start initial timer
  initSuggestionDeck();
  currentSuggestionSetIndex = getNextSuggestionSetIndex();
  renderSuggestionCards(currentSuggestionSetIndex);
  startSuggestionTimer();

  // ==========================================================
  // Auto-grow Input & Send Handlers
  // ==========================================================
  chatInput.addEventListener("input", () => {
    chatInput.style.height = "auto";
    chatInput.style.height = Math.min(chatInput.scrollHeight, 180) + "px";
  });

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  sendBtn.addEventListener("click", sendMessage);

  // ==========================================================
  // Deep Thinking (Brain Mode) Toggle
  // ==========================================================
  function updateDeepThinkUI() {
    if (!deepThinkBtn) return;
    if (isDeepThinkActive) {
      deepThinkBtn.classList.add("active");
      deepThinkBtn.setAttribute("aria-pressed", "true");
      if (deepThinkIndicatorBar) deepThinkIndicatorBar.style.display = "flex";
    } else {
      deepThinkBtn.classList.remove("active");
      deepThinkBtn.setAttribute("aria-pressed", "false");
      if (deepThinkIndicatorBar) deepThinkIndicatorBar.style.display = "none";
    }
  }

  if (deepThinkBtn) {
    deepThinkBtn.addEventListener("click", () => {
      isDeepThinkActive = !isDeepThinkActive;
      localStorage.setItem("soso_deep_think", isDeepThinkActive ? "true" : "false");
      updateDeepThinkUI();
    });
  }

  if (disableDeepThinkBtn) {
    disableDeepThinkBtn.addEventListener("click", () => {
      isDeepThinkActive = false;
      localStorage.setItem("soso_deep_think", "false");
      updateDeepThinkUI();
    });
  }

  // Initialize Deep Think UI state on page load
  updateDeepThinkUI();

  // ==========================================================
  // Send Message & Streaming Logic
  // ==========================================================
  async function sendMessage(options = {}) {
    const text = chatInput.value.trim();
    if ((!text && !attachedImageFile) || isGenerating) return;

    const autoSpeak = Boolean(options && options.autoSpeak);

    // 1. Immediately hide welcome screen and switch to chat flow
    heroWelcome.style.display = "none";
    messagesContainer.classList.remove("hero-mode");
    isNewChatMode = false;
    stopSuggestionTimer();

    // 2. If starting a new conversation, create it cleanly on the backend
    if (!currentConversationId) {
      try {
        const titleSnippet = text.slice(0, 30) || t("newChat");
        const res = await fetch("/api/conversations", {
          method: "POST",
          headers: getAuthHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            title: titleSnippet,
            auth_token: currentAuthToken || ""
          })
        });
        if (res.ok) {
          const data = await res.json();
          currentConversationId = data.id;
          if (currentChatTitle) currentChatTitle.textContent = data.title || titleSnippet;
          // Immediately unshift into local conversations array and render in sidebar!
          const exists = conversations.some(c => c.id === data.id);
          if (!exists) {
            conversations.unshift({
              id: data.id,
              title: data.title || titleSnippet,
              created_at: data.created_at || new Date().toISOString(),
              updated_at: data.updated_at || new Date().toISOString(),
              message_count: 1
            });
          }
          renderConversationsList();
        }
      } catch (err) {
        console.error("Error creating conversation for message:", err);
      }
    }

    const imageToSend = attachedImageFile;
    let localImageUrl = null;
    if (imageToSend) {
      localImageUrl = URL.createObjectURL(imageToSend);
    }

    // Add user message to UI
    appendMessageUI("user", text, localImageUrl, false);

    // Reset input fields
    chatInput.value = "";
    chatInput.style.height = "auto";
    attachedImageFile = null;
    imageFileInput.value = "";
    imagePreviewBar.style.display = "none";

    isGenerating = true;
    sendBtn.disabled = true;

    // Capture deep think state for this message turn
    const activeDeepThink = isDeepThinkActive;

    // Create assistant bubble placeholder
    const assistantBubble = appendMessageUI("assistant", "", null, true, activeDeepThink);
    scrollToBottom();

    // Prepare FormData with live temporal anchor down to the second
    const now = new Date();
    let clientTimeStr = "";
    try {
      clientTimeStr = now.toLocaleString(currentLanguage === "ar" ? "ar-SA" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
    } catch (e) {
      clientTimeStr = now.toISOString();
    }

    const formData = new FormData();
    formData.append("conversation_id", currentConversationId);
    formData.append("message", text);
    formData.append("deep_think", activeDeepThink ? "true" : "false");
    formData.append("client_timestamp", now.toISOString());
    formData.append("client_timezone", Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    formData.append("client_time_str", clientTimeStr);
    if (imageToSend) {
      formData.append("image", imageToSend);
    }
    if (currentAuthToken) {
      formData.append("auth_token", currentAuthToken);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.text) {
                accumulatedText += data.text;
                updateAssistantBubble(assistantBubble, accumulatedText);
                scrollToBottom();
              }
              if (data.new_title) {
                const conv = conversations.find(c => c.id === currentConversationId);
                if (conv) conv.title = data.new_title;
                if (currentChatTitle) currentChatTitle.textContent = data.new_title;
                renderConversationsList();
              }
              if (data.error) {
                accumulatedText += `\n\n⚠️ Error: ${data.error}`;
                updateAssistantBubble(assistantBubble, accumulatedText);
              }
            } catch (jsonErr) {
              // Incomplete chunk
            }
          }
        }
      }

      // Finish bubble
      finishAssistantBubble(assistantBubble, accumulatedText);
      await loadConversations();

      // If this was a voice assistant prompt, speak the answer aloud automatically in user dialect
      if (autoSpeak && accumulatedText.trim()) {
        const bubbleContainer = assistantBubble.closest(".msg-bubble-container");
        const ttsBtn = bubbleContainer ? bubbleContainer.querySelector(".msg-tool-btn:last-child") : null;
        if (ttsBtn) {
          speakText(accumulatedText, ttsBtn, getEffectiveSpeechLang());
        }
      }

    } catch (err) {
      console.error("Chat error:", err);
      updateAssistantBubble(assistantBubble, `\n\n⚠️ Failed to connect to server: ${err.message}`);
    } finally {
      isGenerating = false;
      sendBtn.disabled = false;
      scrollToBottom();
    }
  }

  // ==========================================================
  // Render Messages in UI
  // ==========================================================
  function appendMessageUI(role, content, imageUrl, isStreaming = false, isDeepThink = false, shouldRenderSuggestions = true) {
    const wrapper = document.createElement("div");
    wrapper.className = `message-wrapper ${role}`;

    const avatar = document.createElement("div");
    avatar.className = "msg-avatar";
    if (role === "user") {
      avatar.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      `;
    } else {
      const avatarImg = document.createElement("img");
      avatarImg.src = "assets/logo_icon.png";
      avatarImg.alt = "SoSo AI";
      avatarImg.className = "msg-avatar-logo";
      avatar.appendChild(avatarImg);
    }

    const bubbleContainer = document.createElement("div");
    bubbleContainer.className = "msg-bubble-container";

    // User attached image
    if (imageUrl) {
      const imgContainer = document.createElement("div");
      imgContainer.className = "user-msg-image";
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = "Attachment";
      img.addEventListener("click", () => openImageViewer(imageUrl));
      imgContainer.appendChild(img);
      bubbleContainer.appendChild(imgContainer);
    }

    // Deep Thinking Badge for Assistant message
    if (role === "assistant" && isDeepThink) {
      const deepTag = document.createElement("div");
      deepTag.className = "deep-think-tag";
      deepTag.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5"/>
          <path d="M12 4.5a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 3 3 0 0 1-.34 5.58 2.5 2.5 0 0 1-2.96 3.08A2.5 2.5 0 0 1 12 19.5"/>
          <path d="M12 4.5v15"/>
        </svg>
        <span data-i18n="deepThinkBadgeText">${t("deepThinkBadgeText")}</span>
      `;
      bubbleContainer.appendChild(deepTag);
    }

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    if (role === "user") {
      bubble.textContent = content;
    } else {
      if (isStreaming) {
        bubble.innerHTML = `<span class="typing-indicator">${t("typingIndicator")}</span>`;
      } else {
        const cleanText = cleanResponseText(content);
        renderMarkdownInto(bubble, cleanText);
      }
    }

    bubbleContainer.appendChild(bubble);

    // Action buttons & suggestions for assistant
    if (role === "assistant" && !isStreaming) {
      const cleanText = cleanResponseText(content);
      const actions = createMessageActions(cleanText);
      bubbleContainer.appendChild(actions);

      if (shouldRenderSuggestions && cleanText && cleanText.trim().length > 30) {
        renderFollowUpQuestions(bubble, content);
      }
    }

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubbleContainer);
    chatFlow.appendChild(wrapper);

    return bubble;
  }

  const FOLLOWUP_ICONS = {
    idea: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path></svg>`,
    action: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    deep: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
    code: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    plan: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    tool: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>`,
    check: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
  };

  const FOLLOWUP_ARROW_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
  const SPARKLE_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

  function cleanResponseText(rawText) {
    if (!rawText) return "";
    let cleaned = rawText;

    // 1. Cut at <<<SUGGESTIONS>>> or any variant
    const sugIdx = cleaned.search(/<{1,4}SUGGESTIONS>{1,4}/i);
    if (sugIdx !== -1) {
      cleaned = cleaned.slice(0, sugIdx);
    }

    // 2. Cut at any <<>> or <<<>>> block followed by [icon:
    const iconBlockIdx = cleaned.search(/<{1,4}>{1,4}\s*(\r?\n)?\s*\[icon:/i);
    if (iconBlockIdx !== -1) {
      cleaned = cleaned.slice(0, iconBlockIdx);
    }

    // 3. Remove any trailing or embedded suggestions block
    cleaned = cleaned.replace(/<{1,4}SUGGESTIONS>{1,4}[\s\S]*?(?:<{1,4}END_SUGGESTIONS>{1,4}|$)/gi, "");

    // 4. Remove any <<>> ... <<>> blocks containing [icon:
    cleaned = cleaned.replace(/<{1,4}>{1,4}[\s\S]*?\[icon:[\s\S]*?<{1,4}>{1,4}/gi, "");

    // 5. Clean any trailing isolated [icon:...] lines
    cleaned = cleaned.replace(/^\s*\[icon:\w+\]\s*.+$/gm, "");

    // 6. Clean any isolated <<>> or <<<>>> delimiters
    cleaned = cleaned.replace(/^\s*<{1,4}>{1,4}\s*$/gm, "");

    return cleaned.trim();
  }

  function updateAssistantBubble(bubble, rawText) {
    renderMarkdownInto(bubble, cleanResponseText(rawText));
  }

  function finishAssistantBubble(bubble, finalContent) {
    const cleanText = cleanResponseText(finalContent);
    renderMarkdownInto(bubble, cleanText);
    const bubbleContainer = bubble.closest(".msg-bubble-container");
    if (bubbleContainer && !bubbleContainer.querySelector(".msg-actions")) {
      const actions = createMessageActions(cleanText);
      bubbleContainer.appendChild(actions);
    }
    // Render high-value follow-up questions immediately (zero latency)
    if (cleanText && cleanText.trim().length > 50) {
      renderFollowUpQuestions(bubble, finalContent);
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function extractSuggestionsFromText(finalContent) {
    if (!finalContent) return [];

    let block = "";

    const sugMatch = finalContent.match(/<{1,4}SUGGESTIONS>{1,4}([\s\S]*?)(?:<{1,4}END_SUGGESTIONS>{1,4}|$)/i);
    if (sugMatch && sugMatch[1]) {
      block = sugMatch[1].trim();
    } else {
      const tagMatch = finalContent.match(/<{1,4}>{1,4}([\s\S]*?\[icon:[\s\S]*?)(?:<{1,4}>{1,4}|$)/i);
      if (tagMatch && tagMatch[1]) {
        block = tagMatch[1].trim();
      } else if (finalContent.includes("[icon:")) {
        const lines = finalContent.split("\n").filter(l => l.trim().match(/^\[icon:\w+\]/i));
        if (lines.length > 0) {
          block = lines.join("\n");
        }
      }
    }

    if (!block) return [];

    const lines = block
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith("<<") && !l.startsWith(">>") && !l.toLowerCase().includes("suggestions"));

    const results = [];
    const defaultIcons = ["idea", "action", "deep"];

    lines.forEach((line, idx) => {
      let iconType = defaultIcons[idx % defaultIcons.length];
      let text = line;
      const match = line.match(/^\[icon:(\w+)\]\s*(.+)/i);
      if (match) {
        iconType = match[1].toLowerCase();
        text = match[2];
      } else {
        text = text.replace(/^[-*•\d.]+\s*/, "").trim();
      }
      text = text.replace(/^[«"']+|[»"']+$/g, "").trim();
      if (text.length >= 6) {
        results.push({ iconType, text });
      }
    });

    return results;
  }

  function getContextualFallbackQuestions(text) {
    const isAr = currentLanguage === "ar";
    const lower = (text || "").toLowerCase();

    // 1. Productivity, Schedule, Daily Routine
    if (lower.includes("جدول") || lower.includes("يوم") || lower.includes("روتين") || lower.includes("مهام") || lower.includes("schedule") || lower.includes("routine")) {
      return isAr ? [
        { iconType: "idea", text: "كيف أخصص هذا الجدول ليتوافق مع أوقات ذروة طاقتي وتركيزي؟" },
        { iconType: "action", text: "ما هي أفضل الأدوات والتطبيقات العملية لمتابعة إنجاز هذه المهام يومياً؟" },
        { iconType: "deep", text: "ما خطة الطوارئ البديلة إذا طرأ ظرف مفاجئ عطل الروتين المخطط؟" }
      ] : [
        { iconType: "idea", text: "How can I customize this routine to match my personal peak energy hours?" },
        { iconType: "action", text: "What are the best apps and practical tools to track these daily habits?" },
        { iconType: "deep", text: "What is the contingency plan if an urgent disruption throws off this schedule?" }
      ];
    }

    // 2. Code, Programming, Databases
    if (lower.includes("كود") || lower.includes("برمج") || lower.includes("دالة") || lower.includes("sql") || lower.includes("code") || lower.includes("function") || lower.includes("error")) {
      return isAr ? [
        { iconType: "code", text: "كيف أكتب اختبارات Unit Tests شاملة للتحقق من أمان واستقرار هذا الكود؟" },
        { iconType: "tool", text: "ما هي أفضل ممارسات تحسين الأداء (Performance Tuning) وتقليل زمن الاستجابة؟" },
        { iconType: "deep", text: "كيف أربط هذا الجزء بقاعدة بيانات أو واجهة مستخدم (UI) متكاملة؟" }
      ] : [
        { iconType: "code", text: "How can I write comprehensive unit tests to ensure this code is robust?" },
        { iconType: "tool", text: "What are the best performance tuning practices to optimize execution speed?" },
        { iconType: "deep", text: "How do I integrate this logic with a full database or responsive frontend UI?" }
      ];
    }

    // 3. Business, Marketing, Startups
    if (lower.includes("مشروع") || lower.includes("تسويق") || lower.includes("مبيعات") || lower.includes("أرباح") || lower.includes("business") || lower.includes("marketing") || lower.includes("startup")) {
      return isAr ? [
        { iconType: "idea", text: "كيف أحدد القنوات التسويقية الأكثر كفاءة للوصول إلى جمهوري المستهدف بأقل تكلفة؟" },
        { iconType: "action", text: "ما هي الخطوات العملية لبناء وإطلاق النسخة التجريبية الأولى (MVP)؟" },
        { iconType: "deep", text: "كيف نقيس مؤشرات الأداء الرئيسية (KPIs) ونحلل جدوى هذا المشروع بدقة؟" }
      ] : [
        { iconType: "idea", text: "What are the highest-ROI acquisition channels to reach my ideal target audience?" },
        { iconType: "action", text: "What are the immediate actionable steps to launch a lean MVP?" },
        { iconType: "deep", text: "How should we define and track our core business KPIs and unit economics?" }
      ];
    }

    // 4. Learning, Study, Science
    if (lower.includes("كتاب") || lower.includes("دراسة") || lower.includes("امتحان") || lower.includes("شرح") || lower.includes("study") || lower.includes("exam") || lower.includes("learn")) {
      return isAr ? [
        { iconType: "plan", text: "كيف أطبق تقنية التكرار المتباعد لتثبيت هذه المعلومات في الذاكرة طويلة المدى؟" },
        { iconType: "action", text: "ما هي الخطة الأسبوعية المثالية لتطبيق هذه المفاهيم خطوة بخطوة؟" },
        { iconType: "deep", text: "ما هي أهم الأسئلة أو الاختبارات التقييمية لقياس مدى استيعابي لهذا الموضوع؟" }
      ] : [
        { iconType: "plan", text: "How do I leverage spaced repetition to retain these concepts long-term?" },
        { iconType: "action", text: "What is an optimal weekly action blueprint to master this step-by-step?" },
        { iconType: "deep", text: "What diagnostic questions should I practice to test my true comprehension?" }
      ];
    }

    // 5. General High-Value Default
    return isAr ? [
      { iconType: "idea", text: "كيف يمكنني التعمق في هذه الفكرة وتكييفها مع حالتي الخاصة بشكل عملي؟" },
      { iconType: "action", text: "ما هي أهم 3 خطوات يجب البدء بها فوراً لتحقيق أسرع وأفضل نتيجة؟" },
      { iconType: "deep", text: "ما هي التحديات أو الأخطاء الشائعة في هذا السياق وكيف أتجنبها مسبقاً؟" }
    ] : [
      { iconType: "idea", text: "How can I adapt and deeply apply this solution to my specific personal context?" },
      { iconType: "action", text: "What are the top 3 highest-leverage steps to take right now for optimal results?" },
      { iconType: "deep", text: "What are the common pitfalls or hidden hurdles here, and how can I avoid them?" }
    ];
  }

  function renderFollowUpQuestions(bubble, finalContent) {
    const bubbleContainer = bubble.closest(".msg-bubble-container");
    if (!bubbleContainer) return;

    // Remove any previous follow-up block in this bubble container
    const existingBlock = bubbleContainer.querySelector(".follow-up-block");
    if (existingBlock) existingBlock.remove();

    let suggestions = extractSuggestionsFromText(finalContent);
    if (!suggestions || suggestions.length === 0) {
      const cleanText = cleanResponseText(finalContent);
      suggestions = getContextualFallbackQuestions(cleanText);
    }

    if (!suggestions || suggestions.length === 0) return;

    const followUpBlock = document.createElement("div");
    followUpBlock.className = "follow-up-block";

    // Header badge
    const header = document.createElement("div");
    header.className = "follow-up-header";
    const badge = document.createElement("div");
    badge.className = "follow-up-badge";
    badge.innerHTML = `${SPARKLE_SVG}<span>${t("followUpLabel")}</span>`;
    header.appendChild(badge);
    followUpBlock.appendChild(header);

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "follow-up-cards";

    const cardColors = ["card-orange", "card-blue", "card-purple"];

    suggestions.slice(0, 3).forEach((item, index) => {
      const colorClass = cardColors[index % cardColors.length];
      const iconSvg = FOLLOWUP_ICONS[item.iconType] || FOLLOWUP_ICONS.idea;

      const card = document.createElement("button");
      card.type = "button";
      card.className = `follow-up-card ${colorClass}`;
      card.innerHTML = `
        <div class="follow-up-card-icon">
          ${iconSvg}
        </div>
        <div class="follow-up-card-text">
          ${escapeHtml(item.text)}
        </div>
        <div class="follow-up-card-arrow">
          ${FOLLOWUP_ARROW_SVG}
        </div>
      `;

      card.addEventListener("click", () => {
        chatInput.value = item.text;
        chatInput.focus();
        sendMessage();
      });

      cardsContainer.appendChild(card);
    });

    followUpBlock.appendChild(cardsContainer);
    bubbleContainer.appendChild(followUpBlock);
    scrollToBottom();
  }


  function renderMarkdownInto(element, markdownText) {
    if (window.marked) {
      element.innerHTML = marked.parse(markdownText);
    } else {
      element.textContent = markdownText;
    }

    // 1. Highlight all code blocks with Highlight.js
    element.querySelectorAll("pre code").forEach(codeBlock => {
      codeBlock.classList.add("hljs");
      if (window.hljs) {
        try {
          hljs.highlightElement(codeBlock);
        } catch (e) {
          // ignore highlight error for unknown formats
        }
      }
    });

    // 2. Add Code block copy headers
    element.querySelectorAll("pre").forEach(pre => {
      if (!pre.querySelector(".code-header")) {
        const code = pre.querySelector("code");
        let lang = "code";
        if (code && code.className) {
          const match = code.className.match(/language-(\w+)/);
          if (match) {
            lang = match[1];
          } else {
            const hljsMatch = code.className.match(/\bhljs\s+(\w+)\b/);
            if (hljsMatch) lang = hljsMatch[1];
          }
        }

        const header = document.createElement("div");
        header.className = "code-header";
        header.innerHTML = `
          <div class="code-lang">
            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            <span>${lang}</span>
          </div>
          <button type="button" class="copy-code-btn">
            <svg class="copy-icon" viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span class="btn-text">${t("copyCode")}</span>
          </button>
        `;
        const copyBtn = header.querySelector("button");
        copyBtn.addEventListener("click", () => {
          const textToCopy = code ? code.innerText : pre.innerText;
          navigator.clipboard.writeText(textToCopy);
          copyBtn.classList.add("copied");
          copyBtn.querySelector(".btn-text").textContent = t("codeCopied");
          copyBtn.querySelector(".copy-icon").innerHTML = `<polyline points="20 6 9 17 4 12"></polyline>`;
          setTimeout(() => {
            copyBtn.classList.remove("copied");
            copyBtn.querySelector(".btn-text").textContent = t("copyCode");
            copyBtn.querySelector(".copy-icon").innerHTML = `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>`;
          }, 2000);
        });
        pre.insertBefore(header, pre.firstChild);
      }
    });

    // Render KaTeX Math if available
    if (window.renderMathInElement) {
      try {
        renderMathInElement(element, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (mathErr) {
        console.warn("KaTeX render error:", mathErr);
      }
    }
  }

  function createMessageActions(text) {
    const actions = document.createElement("div");
    actions.className = "msg-actions";

    // Copy Button
    const copyBtn = document.createElement("button");
    copyBtn.className = "msg-tool-btn";
    copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      <span>${t("copyAnswer")}</span>
    `;
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(text);
      copyBtn.querySelector("span").textContent = t("copied");
      setTimeout(() => copyBtn.querySelector("span").textContent = t("copyAnswer"), 2000);
    });

    // Text to Speech (TTS) Button
    const ttsBtn = document.createElement("button");
    ttsBtn.className = "msg-tool-btn";
    ttsBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
      <span>${t("readAloud")}</span>
    `;
    ttsBtn.addEventListener("click", () => {
      speakText(text, ttsBtn);
    });

    actions.appendChild(copyBtn);
    actions.appendChild(ttsBtn);
    return actions;
  }

  // ==========================================================
  // Text to Speech (TTS) & Voice Typing (STT)
  // ==========================================================
  let currentAudio = null;
  let currentAudioBtn = null;

  function stopCurrentSpeech() {
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch (e) {}
      currentAudio = null;
    }
    if (window.speechSynthesis && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
      window.speechSynthesis.cancel();
    }
    if (currentAudioBtn) {
      currentAudioBtn.classList.remove("speaking");
      currentAudioBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        <span>${t("readAloud")}</span>
      `;
      currentAudioBtn = null;
    }
  }

  async function speakText(text, buttonElement, langOverride = null) {
    if (!text || !text.trim()) return;

    // If clicking on the currently playing button -> Stop
    if (currentAudioBtn === buttonElement) {
      stopCurrentSpeech();
      return;
    }

    // Stop any other currently playing audio
    stopCurrentSpeech();

    currentAudioBtn = buttonElement;
    buttonElement.classList.add("speaking");
    buttonElement.innerHTML = `
      <svg class="spin-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
      <span>${currentLanguage === "ar" ? "جاري التجهيز..." : "Loading..."}</span>
    `;

    const activeSpeechLang = langOverride || getEffectiveSpeechLang();

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          lang: activeSpeechLang,
          dialect: activeSpeechLang
        })
      });

      if (!response.ok) {
        throw new Error(`Server TTS returned ${response.status}`);
      }

      // Check if user cancelled while fetching
      if (currentAudioBtn !== buttonElement) {
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudio = audio;

      buttonElement.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>
        <span>${t("stopAudio")}</span>
      `;

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        if (currentAudio === audio) {
          stopCurrentSpeech();
        }
      };

      audio.onerror = (e) => {
        console.warn("Audio playback error, falling back to browser synthesis:", e);
        URL.revokeObjectURL(audioUrl);
        fallbackBrowserTTS(text, buttonElement, activeSpeechLang);
      };

      await audio.play();

    } catch (err) {
      console.warn("Edge neural TTS failed or offline, falling back to browser SpeechSynthesis:", err);
      fallbackBrowserTTS(text, buttonElement, activeSpeechLang);
    }
  }

  function fallbackBrowserTTS(text, buttonElement, activeSpeechLang = null) {
    if (!window.speechSynthesis) {
      alert(currentLanguage === "ar" ? "المتصفح لا يدعم القراءة الصوتية" : "TTS not supported in this browser.");
      stopCurrentSpeech();
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text properly for browser TTS
    let cleanText = text
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\\times/g, " ضرب ")
      .replace(/\\div/g, " تقسيم ")
      .replace(/\\pm/g, " زائد أو ناقص ")
      .replace(/\\approx/g, " تقريباً ")
      .replace(/\\leq/g, " أصغر من أو يساوي ")
      .replace(/\\geq/g, " أكبر من أو يساوي ")
      .replace(/\$\$/g, " ")
      .replace(/\$/g, " ")
      .replace(/[*_#~>|]/g, "")
      .replace(/^\s*[-*•]\s+/gm, "")
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanText) {
      stopCurrentSpeech();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const hasArabic = /[\u0600-\u06FF]/.test(cleanText);
    const targetLang = activeSpeechLang || getEffectiveSpeechLang();

    const voices = window.speechSynthesis.getVoices() || [];
    let selectedVoice = null;

    if (hasArabic) {
      selectedVoice = voices.find(v => v.lang.startsWith("ar") || v.name.toLowerCase().includes("arabic") || v.name.toLowerCase().includes("hamed") || v.name.toLowerCase().includes("ismael") || v.name.toLowerCase().includes("salma") || v.name.toLowerCase().includes("shakir") || v.name.toLowerCase().includes("zeina"));
      utterance.lang = selectedVoice ? selectedVoice.lang : (targetLang.startsWith("ar") ? targetLang : "ar-SA");
    } else if (targetLang.startsWith("es") || currentLanguage === "es") {
      selectedVoice = voices.find(v => v.lang.startsWith("es"));
      utterance.lang = selectedVoice ? selectedVoice.lang : "es-ES";
    } else if (targetLang.startsWith("de") || currentLanguage === "de") {
      selectedVoice = voices.find(v => v.lang.startsWith("de"));
      utterance.lang = selectedVoice ? selectedVoice.lang : "de-DE";
    } else if (targetLang.startsWith("fr") || currentLanguage === "fr") {
      selectedVoice = voices.find(v => v.lang.startsWith("fr"));
      utterance.lang = selectedVoice ? selectedVoice.lang : "fr-FR";
    } else {
      selectedVoice = voices.find(v => v.lang.startsWith("en"));
      utterance.lang = selectedVoice ? selectedVoice.lang : "en-US";
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    currentAudioBtn = buttonElement;
    buttonElement.classList.add("speaking");
    buttonElement.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>
      <span>${t("stopAudio")}</span>
    `;

    utterance.onend = () => {
      stopCurrentSpeech();
    };

    utterance.onerror = () => {
      stopCurrentSpeech();
    };

    window.speechSynthesis.speak(utterance);
  }

  // Voice Input (Web Speech Recognition)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = getEffectiveSpeechLang();

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      chatInput.value = transcript;
      chatInput.style.height = "auto";
      chatInput.style.height = Math.min(chatInput.scrollHeight, 180) + "px";
      if (voiceListeningText) {
        voiceListeningText.textContent = transcript || t("voiceListeningText");
      }
    };

    recognition.onerror = (e) => {
      console.warn("Speech recognition error:", e);
      if (e && e.error === "not-allowed") {
        alert(t("micPermissionDenied"));
      }
      stopVoiceRecording(false);
    };

    recognition.onend = () => {
      stopVoiceRecording(true);
    };

    async function handleVoiceBtnClick() {
      if (isRecording) {
        if (recognition) {
          try { recognition.stop(); } catch (err) {}
        }
        stopVoiceRecording(true);
      } else {
        stopCurrentSpeech();

        // 1. Immediately transition to conversation screen if on home screen!
        if (heroWelcome.style.display !== "none") {
          heroWelcome.style.display = "none";
          messagesContainer.classList.remove("hero-mode");
          isNewChatMode = false;
        }

        try {
          recognition.lang = getEffectiveSpeechLang();
          recognition.start();
          isRecording = true;
          voiceBtn.classList.add("recording");
          voiceBtn.title = t("stopAudio");
          if (voiceListeningBar) {
            voiceListeningBar.style.display = "flex";
            if (voiceListeningText) voiceListeningText.textContent = t("voiceListeningText");
          }
        } catch (e) {
          console.error("Speech recognition start failed:", e);
          stopVoiceRecording(false);
        }
      }
    }

    voiceBtn.addEventListener("click", handleVoiceBtnClick);

    if (stopListeningBtn) {
      stopListeningBtn.addEventListener("click", () => {
        if (recognition) {
          try { recognition.stop(); } catch (err) {}
        }
        chatInput.value = "";
        chatInput.style.height = "auto";
        stopVoiceRecording(false);
      });
    }
  } else {
    voiceBtn.style.display = "none";
  }

  function stopVoiceRecording(shouldSend = false) {
    isRecording = false;
    voiceBtn.classList.remove("recording");
    voiceBtn.title = t("voiceTooltip");
    if (voiceListeningBar) {
      voiceListeningBar.style.display = "none";
    }

    if (shouldSend) {
      const text = chatInput.value.trim();
      if (text) {
        sendMessage({ autoSpeak: true });
      }
    }
  }

  // ==========================================================
  // Image Viewer Modal
  // ==========================================================
  function openImageViewer(src) {
    viewerImage.src = src;
    imageViewerModal.style.display = "flex";
  }

  closeImageViewerBtn.addEventListener("click", () => {
    imageViewerModal.style.display = "none";
  });

  imageViewerModal.addEventListener("click", (e) => {
    if (e.target === imageViewerModal) {
      imageViewerModal.style.display = "none";
    }
  });

  // ==========================================================
  // Export Chat
  // ==========================================================
  async function exportConversation(convId) {
    if (!convId) return;
    try {
      const res = await fetch(`/api/conversations/${convId}`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      let md = `# ${data.title}\n\n`;
      (data.messages || []).forEach(m => {
        md += `### ${m.role === "user" ? "User" : "SoSo AI"}\n`;
        if (m.image_url) md += `![Image](${m.image_url})\n\n`;
        md += `${m.content}\n\n---\n\n`;
      });

      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.title.replace(/[\\/:*?"<>|]/g, "_")}.md`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Failed to export chat.");
    }
  }

  if (exportChatBtn) {
    exportChatBtn.addEventListener("click", () => {
      if (currentConversationId) exportConversation(currentConversationId);
    });
  }

  // ==========================================================
  // Settings Management
  // ==========================================================
  openSettingsBtn.addEventListener("click", openSettings);
  closeSettingsBtn.addEventListener("click", () => settingsModal.style.display = "none");
  cancelSettingsBtn.addEventListener("click", () => settingsModal.style.display = "none");

  settingsModal.addEventListener("click", (e) => {
    if (e.target === settingsModal) settingsModal.style.display = "none";
  });

  settingsTemp.addEventListener("input", (e) => {
    tempValueDisplay.textContent = e.target.value;
  });

  const EYE_OPEN_SVG = `<svg class="eye-icon" viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  const EYE_OFF_SVG = `<svg class="eye-icon" viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m2 2 20 20"></path><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path></svg>`;

  function setupEyeToggle(btn, input) {
    if (!btn || !input) return;
    btn.innerHTML = EYE_OPEN_SVG;
    btn.addEventListener("click", () => {
      const isPass = input.type === "password";
      input.type = isPass ? "text" : "password";
      btn.innerHTML = isPass ? EYE_OFF_SVG : EYE_OPEN_SVG;
    });
  }

  setupEyeToggle(toggleGeminiKeyVis, settingsGeminiKey);
  setupEyeToggle(toggleOpenaiKeyVis, settingsOpenaiKey);

  if (settingsOpenaiModelSelect && settingsOpenaiModel) {
    settingsOpenaiModelSelect.addEventListener("change", () => {
      if (settingsOpenaiModelSelect.value === "custom") {
        settingsOpenaiModel.style.display = "block";
        settingsOpenaiModel.focus();
      } else {
        settingsOpenaiModel.style.display = "none";
        settingsOpenaiModel.value = settingsOpenaiModelSelect.value;
      }
    });
  }

  settingsProvider.addEventListener("change", () => {
    if (settingsProvider.value === "gemini") {
      geminiSettingsSection.style.display = "block";
      openaiSettingsSection.style.display = "none";
    } else {
      geminiSettingsSection.style.display = "none";
      openaiSettingsSection.style.display = "block";
    }
  });

  async function openSettings() {
    try {
      const res = await fetch("/api/settings");
      const settings = await res.json();

      settingsProvider.value = settings.provider || "gemini";
      if (settingsPrompt) settingsPrompt.value = settings.system_prompt || "";
      settingsTemp.value = settings.temperature || 0.7;
      tempValueDisplay.textContent = settings.temperature || 0.7;

      if (settings.has_api_key) {
        geminiKeyStatus.textContent = `${currentLanguage === "ar" ? "المفتاح الحالي" : "Current Key"}: ${settings.api_key_masked} (Active)`;
        geminiKeyStatus.style.color = "#10b981";
      } else {
        geminiKeyStatus.textContent = currentLanguage === "ar" ? "لم يتم تعيين المفتاح بعد." : "No API key configured yet.";
        geminiKeyStatus.style.color = "#eab308";
      }

      if (openaiKeyStatus) {
        if (settings.has_openai_key) {
          openaiKeyStatus.textContent = `${currentLanguage === "ar" ? "المفتاح الحالي" : "Current Key"}: ${settings.openai_api_key_masked} (Active)`;
          openaiKeyStatus.style.color = "#10b981";
        } else {
          openaiKeyStatus.textContent = currentLanguage === "ar" ? "لم يتم تعيين المفتاح بعد." : "No API key configured yet.";
          openaiKeyStatus.style.color = "#eab308";
        }
      }

      settingsGeminiModel.value = settings.model || "gemini-3.5-flash-lite";
      settingsOpenaiBase.value = settings.openai_base_url || "";
      
      const currentOaiModel = settings.openai_model || "gpt-4o";
      if (settingsOpenaiModelSelect) {
        const matchingOpt = Array.from(settingsOpenaiModelSelect.options).some(o => o.value === currentOaiModel);
        if (matchingOpt) {
          settingsOpenaiModelSelect.value = currentOaiModel;
          settingsOpenaiModel.style.display = "none";
          settingsOpenaiModel.value = currentOaiModel;
        } else {
          settingsOpenaiModelSelect.value = "custom";
          settingsOpenaiModel.style.display = "block";
          settingsOpenaiModel.value = currentOaiModel;
        }
      } else {
        settingsOpenaiModel.value = currentOaiModel;
      }

      settingsLanguage.value = currentLanguage;
      if (settingsDialect) {
        settingsDialect.value = currentDialect || "auto";
      }
      applyTheme(currentTheme);

      // Google OAuth settings population
      const settingsGoogleClientId = document.getElementById("settingsGoogleClientId");
      const settingsGoogleClientSecret = document.getElementById("settingsGoogleClientSecret");
      const googleClientIdStatus = document.getElementById("googleClientIdStatus");
      const googleSecretStatus = document.getElementById("googleSecretStatus");

      if (settingsGoogleClientId) {
        settingsGoogleClientId.value = settings.google_client_id || "";
      }
      if (settingsGoogleClientSecret) {
        settingsGoogleClientSecret.value = "";
      }
      if (googleClientIdStatus) {
        if (settings.has_google_client_id) {
          googleClientIdStatus.textContent = `${currentLanguage === "ar" ? "المعرف المسجل" : "Registered ID"}: ${settings.google_client_id_masked} (جاهز للمصادقة الرسمية ✓)`;
          googleClientIdStatus.style.color = "#10b981";
        } else {
          googleClientIdStatus.textContent = currentLanguage === "ar" ? "لم يتم إدخال Client ID بعد (مطلوب لفتح نافذة اختيار الحسابات الرسمية من accounts.google.com)." : "Google Client ID not configured.";
          googleClientIdStatus.style.color = "#eab308";
        }
      }
      if (googleSecretStatus) {
        if (settings.has_google_client_secret) {
          googleSecretStatus.textContent = `${currentLanguage === "ar" ? "المفتاح السري" : "Secret"}: ${settings.google_client_secret_masked} (Active ✓)`;
          googleSecretStatus.style.color = "#10b981";
        } else {
          googleSecretStatus.textContent = currentLanguage === "ar" ? "المفتاح السري غير مسجل (اختياري/موصى به لتوثيق السيرفر)." : "Secret not configured.";
          googleSecretStatus.style.color = "var(--text-muted)";
        }
      }

      const settingsRedirectUriText = document.getElementById("settingsRedirectUriText");
      if (settingsRedirectUriText) {
        settingsRedirectUriText.textContent = `${window.location.origin}/api/auth/google/callback`;
      }

      settingsProvider.dispatchEvent(new Event("change"));
      settingsModal.style.display = "flex";
    } catch (err) {
      console.error("Error opening settings:", err);
      settingsModal.style.display = "flex";
    }
  }

  // Toggle secret visibility in settings
  const toggleGoogleSecretVis = document.getElementById("toggleGoogleSecretVis");
  if (toggleGoogleSecretVis) {
    setupEyeToggle(toggleGoogleSecretVis, document.getElementById("settingsGoogleClientSecret"));
  }

  // Copy Redirect URI in settings
  const copyRedirectUriBtn = document.getElementById("copyRedirectUriBtn");
  if (copyRedirectUriBtn) {
    copyRedirectUriBtn.addEventListener("click", () => {
      const uriToCopy = `${window.location.origin}/api/auth/google/callback`;
      navigator.clipboard.writeText(uriToCopy);
      const copyRedirectText = document.getElementById("copyRedirectText");
      if (copyRedirectText) copyRedirectText.textContent = "تم النسخ بنجاح! ✓";
      copyRedirectUriBtn.classList.add("copied");
      setTimeout(() => {
        if (copyRedirectText) copyRedirectText.textContent = "نسخ الرابط";
        copyRedirectUriBtn.classList.remove("copied");
      }, 2000);
    });
  }

  saveSettingsBtn.addEventListener("click", async () => {
    if (settingsDialect) {
      currentDialect = settingsDialect.value;
      localStorage.setItem("soso_dialect", currentDialect);
      if (recognition) {
        recognition.lang = getEffectiveSpeechLang();
      }
    }

    const effectiveOpenaiModel = (settingsOpenaiModelSelect && settingsOpenaiModelSelect.value === "custom") 
      ? settingsOpenaiModel.value.trim() 
      : ((settingsOpenaiModelSelect && settingsOpenaiModelSelect.value) || settingsOpenaiModel.value.trim() || "gpt-4o");

    const payload = {
      provider: settingsProvider.value,
      model: settingsGeminiModel.value,
      temperature: parseFloat(settingsTemp.value),
      openai_base_url: settingsOpenaiBase.value.trim(),
      openai_model: effectiveOpenaiModel
    };

    if (settingsPrompt && settingsPrompt.value && settingsPrompt.value.trim()) {
      payload.system_prompt = settingsPrompt.value.trim();
    }

    if (settingsGeminiKey.value.trim()) {
      payload.api_key = settingsGeminiKey.value.trim();
    }
    if (settingsOpenaiKey.value.trim()) {
      payload.openai_api_key = settingsOpenaiKey.value.trim();
    }

    const settingsGoogleClientId = document.getElementById("settingsGoogleClientId");
    const settingsGoogleClientSecret = document.getElementById("settingsGoogleClientSecret");
    if (settingsGoogleClientId) {
      payload.google_client_id = settingsGoogleClientId.value.trim();
    }
    if (settingsGoogleClientSecret && settingsGoogleClientSecret.value.trim()) {
      payload.google_client_secret = settingsGoogleClientSecret.value.trim();
    }

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to save");
      
      saveSettingsBtn.textContent = t("saved");
      setTimeout(() => {
        saveSettingsBtn.textContent = t("saveSettings");
        settingsModal.style.display = "none";
      }, 1000);

      // Update badge (if present)
      if (activeModelName) {
        activeModelName.textContent = payload.provider === "openai_compatible" ? payload.openai_model : payload.model;
      }
    } catch (err) {
      alert("Error saving settings: " + err.message);
    }
  });

  // Helpers
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Load initial settings to show model name
  fetch("/api/settings")
    .then(r => r.json())
    .then(s => {
      if (s.model && activeModelName) activeModelName.textContent = s.model;
    })
    .catch(() => {});

  // ==========================================================
  // Authentication & Verification System
  // ==========================================================
  function showAuthAlert(msg, type = "error") {
    if (!authAlert) return;
    authAlert.className = `auth-alert ${type}`;
    authAlert.textContent = msg;
    authAlert.style.display = "block";
  }

  function clearAuthAlert() {
    if (!authAlert) return;
    authAlert.style.display = "none";
    authAlert.textContent = "";
  }

  function switchAuthTab(tab) {
    clearAuthAlert();
    if (tab === "signup") {
      if (authTabs) authTabs.style.display = "flex";
      if (tabSignUpBtn) tabSignUpBtn.classList.add("active");
      if (tabSignInBtn) tabSignInBtn.classList.remove("active");
      if (signUpForm) signUpForm.style.display = "flex";
      if (signInForm) signInForm.style.display = "none";
      if (verifyOtpForm) verifyOtpForm.style.display = "none";
      if (forgotPasswordForm) forgotPasswordForm.style.display = "none";
      if (resetPasswordForm) resetPasswordForm.style.display = "none";
    } else if (tab === "signin") {
      if (authTabs) authTabs.style.display = "flex";
      if (tabSignInBtn) tabSignInBtn.classList.add("active");
      if (tabSignUpBtn) tabSignUpBtn.classList.remove("active");
      if (signInForm) signInForm.style.display = "flex";
      if (signUpForm) signUpForm.style.display = "none";
      if (verifyOtpForm) verifyOtpForm.style.display = "none";
      if (forgotPasswordForm) forgotPasswordForm.style.display = "none";
      if (resetPasswordForm) resetPasswordForm.style.display = "none";
    } else if (tab === "verify") {
      if (authTabs) authTabs.style.display = "none";
      if (signUpForm) signUpForm.style.display = "none";
      if (signInForm) signInForm.style.display = "none";
      if (verifyOtpForm) verifyOtpForm.style.display = "flex";
      if (forgotPasswordForm) forgotPasswordForm.style.display = "none";
      if (resetPasswordForm) resetPasswordForm.style.display = "none";
    } else if (tab === "forgot") {
      if (authTabs) authTabs.style.display = "none";
      if (signUpForm) signUpForm.style.display = "none";
      if (signInForm) signInForm.style.display = "none";
      if (verifyOtpForm) verifyOtpForm.style.display = "none";
      if (forgotPasswordForm) forgotPasswordForm.style.display = "flex";
      if (resetPasswordForm) resetPasswordForm.style.display = "none";
    } else if (tab === "reset-pass") {
      if (authTabs) authTabs.style.display = "none";
      if (signUpForm) signUpForm.style.display = "none";
      if (signInForm) signInForm.style.display = "none";
      if (verifyOtpForm) verifyOtpForm.style.display = "none";
      if (forgotPasswordForm) forgotPasswordForm.style.display = "none";
      if (resetPasswordForm) resetPasswordForm.style.display = "flex";
    }
  }

  function updateUserProfileUI() {
    if (currentAuthUser) {
      if (userProfileBar) userProfileBar.style.display = "flex";
      if (userName) userName.textContent = currentAuthUser.name || "مستخدم";
      if (userEmail) userEmail.textContent = currentAuthUser.email || "";

      // Remove any legacy stuck dummy avatar
      if (currentAuthUser.avatar && currentAuthUser.avatar.includes("user_avatar_sefiane")) {
        currentAuthUser.avatar = null;
      }

      const initial = (currentAuthUser.name || "U").trim().charAt(0).toUpperCase();

      if (userAvatar) {
        if (currentAuthUser.avatar) {
          userAvatar.classList.add("has-image");
          userAvatar.innerHTML = `<img src="${currentAuthUser.avatar}" alt="${currentAuthUser.name || 'User'}" class="user-avatar-image" onerror="this.parentElement.classList.remove('has-image'); this.parentElement.textContent='${initial}';">`;
        } else {
          userAvatar.classList.remove("has-image");
          userAvatar.textContent = initial;
        }
      }
    } else {
      if (userProfileBar) userProfileBar.style.display = "none";
    }
  }

  // Handle avatar upload click
  if (userAvatarWrapper && userAvatarFileInput) {
    userAvatarWrapper.addEventListener("click", () => {
      userAvatarFileInput.click();
    });

    userAvatarFileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("يرجى اختيار ملف صورة صالح (PNG, JPG, WEBP)");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/auth/avatar", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${currentAuthToken || ""}`
          },
          body: formData
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "تعذر رفع الصورة");
        }

        if (currentAuthUser) {
          currentAuthUser.avatar = data.avatar;
          updateUserProfileUI();
        }
      } catch (err) {
        console.error("Avatar upload failed:", err);
        alert("تعذر تحديث الصورة الشخصية: " + err.message);
      } finally {
        userAvatarFileInput.value = "";
      }
    });
  }

  function showAuthModal(tab = "signup") {
    if (authModal) {
      authModal.style.display = "flex";
      switchAuthTab(tab);
      // Suppress browser autofill & email alias popups
      try {
        const inputs = authModal.querySelectorAll("input");
        inputs.forEach(inp => {
          inp.setAttribute("autocomplete", "off");
          inp.setAttribute("data-lpignore", "true");
          inp.setAttribute("data-1p-ignore", "true");
        });
      } catch (e) {}
    }
  }

  function hideAuthModal() {
    if (authModal) {
      authModal.style.display = "none";
      clearAuthAlert();
      scheduleSearchAutofillPurge();
    }
  }

  async function checkAuthStatus() {
    if (!currentAuthToken) {
      showAuthModal("signup");
      return false;
    }
    try {
      const res = await fetch(`/api/auth/me?token=${encodeURIComponent(currentAuthToken)}`, {
        headers: { "Authorization": `Bearer ${currentAuthToken}` }
      });
      if (res.ok) {
        currentAuthUser = await res.json();
        try {
          document.cookie = `soso_auth_token=${encodeURIComponent(currentAuthToken)}; path=/; max-age=2592000; SameSite=Lax`;
        } catch (e) {}
        updateUserProfileUI();
        hideAuthModal();
        return true;
      } else {
        localStorage.removeItem("soso_auth_token");
        try {
          document.cookie = "soso_auth_token=; path=/; max-age=0;";
        } catch (e) {}
        currentAuthToken = null;
        currentAuthUser = null;
        updateUserProfileUI();
        showAuthModal("signup");
        return false;
      }
    } catch (e) {
      console.warn("Auth check network fallback:", e);
      return true;
    }
  }

  // Toggle password visibility
  if (toggleSignUpPass && signUpPassword) {
    toggleSignUpPass.addEventListener("click", () => {
      const isPass = signUpPassword.type === "password";
      signUpPassword.type = isPass ? "text" : "password";
      toggleSignUpPass.innerHTML = isPass ? EYE_OFF_SVG : EYE_OPEN_SVG;
    });
  }
  if (toggleSignInPass && signInPassword) {
    toggleSignInPass.addEventListener("click", () => {
      const isPass = signInPassword.type === "password";
      signInPassword.type = isPass ? "text" : "password";
      toggleSignInPass.innerHTML = isPass ? EYE_OFF_SVG : EYE_OPEN_SVG;
    });
  }

  // Auth tabs clicks & switch prompts
  if (tabSignUpBtn) tabSignUpBtn.addEventListener("click", () => switchAuthTab("signup"));
  if (tabSignInBtn) tabSignInBtn.addEventListener("click", () => switchAuthTab("signin"));
  if (backToSignUpBtn) backToSignUpBtn.addEventListener("click", () => switchAuthTab("signup"));

  const goToSignInBtn = document.getElementById("goToSignInBtn");
  const goToSignUpBtn = document.getElementById("goToSignUpBtn");
  if (goToSignInBtn) goToSignInBtn.addEventListener("click", () => switchAuthTab("signin"));
  if (goToSignUpBtn) goToSignUpBtn.addEventListener("click", () => switchAuthTab("signup"));

  function handleSmtpVerificationState(data) {
    if (!smtpNoticeBox) return;
    if (data && data.email_sent) {
      smtpNoticeBox.style.display = "none";
    } else {
      smtpNoticeBox.style.display = "block";
      if (revealedCodeDisplay) {
        revealedCodeDisplay.style.display = "none";
        revealedCodeDisplay.textContent = "";
      }
      if (revealCodeBtn) {
        revealCodeBtn.onclick = () => {
          if (data && data.preview_code && revealedCodeDisplay) {
            revealedCodeDisplay.textContent = data.preview_code;
            revealedCodeDisplay.style.display = "block";
            if (verifyOtpInput) {
              verifyOtpInput.value = data.preview_code;
              verifyOtpInput.focus();
            }
          }
        };
      }
    }
  }

  // 1. Sign Up Submit
  if (signUpForm) {
    signUpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearAuthAlert();
      const name = signUpName.value.trim();
      const email = signUpEmail.value.trim();
      const password = signUpPassword.value;

      if (!name || !email || !password) {
        showAuthAlert("يرجى ملء جميع الحقول المطلوبة", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAuthAlert("يرجى إدخال بريد إلكتروني صالح (مثال: name@example.com)", "error");
        return;
      }

      if (password.length < 6) {
        showAuthAlert("كلمة المرور يجب أن تتكون من 6 خانات على الأقل", "error");
        return;
      }

      const submitBtn = document.getElementById("signUpSubmitBtn");
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>جاري إرسال الرمز... ⏳</span>`;

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "تعذر إنشاء الحساب");
        }

        pendingVerifyEmail = email;
        if (verifyEmailDisplay) verifyEmailDisplay.textContent = email;
        if (verifyOtpInput) verifyOtpInput.value = ""; // Empty for real code entry

        handleSmtpVerificationState(data);
        showAuthAlert(data.message, data.email_sent ? "success" : "info");
        switchAuthTab("verify");
        startResendTimer();
        if (verifyOtpInput) verifyOtpInput.focus();

      } catch (err) {
        showAuthAlert(err.message, "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>إنشاء حساب</span>`;
      }
    });
  }

  // 2. Verify OTP Submit
  if (verifyOtpForm) {
    verifyOtpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearAuthAlert();
      const code = verifyOtpInput.value.trim();
      if (!code || code.length !== 6) {
        showAuthAlert("يرجى إدخال رمز التحقق المكون من 6 أرقام", "error");
        return;
      }

      const submitBtn = document.getElementById("verifySubmitBtn");
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>جاري التحقق... ⏳</span>`;

      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: pendingVerifyEmail, code })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "رمز التحقق غير صحيح");
        }

        currentAuthToken = data.token;
        currentAuthUser = data.user;
        localStorage.setItem("soso_auth_token", data.token);
        try {
          document.cookie = `soso_auth_token=${encodeURIComponent(data.token)}; path=/; max-age=2592000; SameSite=Lax`;
        } catch (e) {}

        updateUserProfileUI();
        hideAuthModal();
        currentConversationId = null;
        isNewChatMode = true;
        chatFlow.innerHTML = "";
        showHeroWelcome();
        await loadConversations(false);

      } catch (err) {
        showAuthAlert(err.message, "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>تأكيد وتفعيل الحساب</span>`;
      }
    });
  }

  // Resend code
  function startResendTimer() {
    if (!resendCodeBtn) return;
    const textSpan = document.getElementById("resendCodeText") || resendCodeBtn;
    let secondsLeft = 60;
    resendCodeBtn.disabled = true;
    textSpan.textContent = `إعادة الإرسال (${secondsLeft}s)`;
    if (resendCountdownTimer) clearInterval(resendCountdownTimer);

    resendCountdownTimer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(resendCountdownTimer);
        resendCodeBtn.disabled = false;
        textSpan.textContent = "إعادة إرسال الرمز";
      } else {
        textSpan.textContent = `إعادة الإرسال (${secondsLeft}s)`;
      }
    }, 1000);
  }

  if (resendCodeBtn) {
    resendCodeBtn.addEventListener("click", async () => {
      if (!pendingVerifyEmail) return;
      clearAuthAlert();
      try {
        const res = await fetch("/api/auth/resend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: pendingVerifyEmail })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "تعذر إعادة الإرسال");

        if (verifyOtpInput) verifyOtpInput.value = "";
        handleSmtpVerificationState(data);
        showAuthAlert(data.message, data.email_sent ? "success" : "info");
        startResendTimer();
      } catch (err) {
        showAuthAlert(err.message, "error");
      }
    });
  }

  // 3. Sign In Submit
  if (signInForm) {
    signInForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearAuthAlert();
      const email = signInEmail.value.trim();
      const password = signInPassword.value;

      if (!email || !password) {
        showAuthAlert("يرجى إدخال البريد الإلكتروني وكلمة المرور", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAuthAlert("يرجى إدخال بريد إلكتروني صالح", "error");
        return;
      }

      const submitBtn = document.getElementById("signInSubmitBtn");
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>جاري الدخول... ⏳</span>`;

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "فشل تسجيل الدخول");
        }

        if (data.status === "unverified") {
          pendingVerifyEmail = email;
          if (verifyEmailDisplay) verifyEmailDisplay.textContent = email;
          if (verifyOtpInput) verifyOtpInput.value = "";
          showAuthAlert(data.message, "info");
          switchAuthTab("verify");
          startResendTimer();
          return;
        }

        currentAuthToken = data.token;
        currentAuthUser = data.user;
        localStorage.setItem("soso_auth_token", data.token);
        try {
          document.cookie = `soso_auth_token=${encodeURIComponent(data.token)}; path=/; max-age=2592000; SameSite=Lax`;
        } catch (e) {}

        updateUserProfileUI();
        hideAuthModal();
        currentConversationId = null;
        isNewChatMode = true;
        chatFlow.innerHTML = "";
        showHeroWelcome();
        await loadConversations(false);

      } catch (err) {
        showAuthAlert(err.message, "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>تسجيل الدخول</span>`;
      }
    });
  }

  // ==========================================================
  // Forgot & Reset Password Flow
  // ==========================================================
  function handleSmtpResetState(data) {
    if (!smtpResetNoticeBox) return;
    if (data && data.email_sent) {
      smtpResetNoticeBox.style.display = "none";
    } else {
      smtpResetNoticeBox.style.display = "block";
      if (revealedResetCodeDisplay) {
        revealedResetCodeDisplay.style.display = "none";
        revealedResetCodeDisplay.textContent = "";
      }
      if (revealResetCodeBtn) {
        revealResetCodeBtn.onclick = () => {
          if (data && data.preview_code && revealedResetCodeDisplay) {
            revealedResetCodeDisplay.textContent = data.preview_code;
            revealedResetCodeDisplay.style.display = "block";
            if (resetOtpInput) {
              resetOtpInput.value = data.preview_code;
              resetOtpInput.focus();
            }
          }
        };
      }
    }
  }

  function startResetResendTimer() {
    if (!resendResetCodeBtn) return;
    const textSpan = document.getElementById("resendResetCodeText") || resendResetCodeBtn;
    let secondsLeft = 60;
    resendResetCodeBtn.disabled = true;
    textSpan.textContent = `إعادة الإرسال (${secondsLeft}s)`;
    if (resetResendCountdownTimer) clearInterval(resetResendCountdownTimer);

    resetResendCountdownTimer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(resetResendCountdownTimer);
        resendResetCodeBtn.disabled = false;
        textSpan.textContent = "إعادة إرسال الرمز";
      } else {
        textSpan.textContent = `إعادة الإرسال (${secondsLeft}s)`;
      }
    }, 1000);
  }

  // Toggle new password visibility
  if (toggleNewPass && newPasswordInput) {
    toggleNewPass.addEventListener("click", () => {
      const isPass = newPasswordInput.type === "password";
      newPasswordInput.type = isPass ? "text" : "password";
      toggleNewPass.innerHTML = isPass ? EYE_OFF_SVG : EYE_OPEN_SVG;
    });
  }
  if (toggleConfirmPass && confirmPasswordInput) {
    toggleConfirmPass.addEventListener("click", () => {
      const isPass = confirmPasswordInput.type === "password";
      confirmPasswordInput.type = isPass ? "text" : "password";
      toggleConfirmPass.innerHTML = isPass ? EYE_OFF_SVG : EYE_OPEN_SVG;
    });
  }

  // Navigation Links
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", () => {
      clearAuthAlert();
      switchAuthTab("forgot");
      if (forgotEmail) {
        if (signInEmail && signInEmail.value.trim()) {
          forgotEmail.value = signInEmail.value.trim();
        }
        forgotEmail.focus();
      }
    });
  }

  if (backToSignInFromForgot) {
    backToSignInFromForgot.addEventListener("click", () => {
      clearAuthAlert();
      switchAuthTab("signin");
    });
  }

  if (backToSignInFromReset) {
    backToSignInFromReset.addEventListener("click", () => {
      clearAuthAlert();
      switchAuthTab("signin");
    });
  }

  // Step 1: Submit Forgot Password Form (Request Reset Code)
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearAuthAlert();
      const email = forgotEmail.value.trim();
      if (!email) {
        showAuthAlert("يرجى إدخال البريد الإلكتروني المسجل", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAuthAlert("يرجى إدخال بريد إلكتروني صالح", "error");
        return;
      }

      const submitBtn = document.getElementById("forgotSubmitBtn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>جاري إرسال رمز التحقق... ⏳</span>`;
      }

      try {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "تعذر إرسال رمز استعادة كلمة المرور");
        }

        pendingResetEmail = email;
        if (resetEmailDisplay) resetEmailDisplay.textContent = email;
        if (resetOtpInput) resetOtpInput.value = "";
        if (newPasswordInput) newPasswordInput.value = "";
        if (confirmPasswordInput) confirmPasswordInput.value = "";

        handleSmtpResetState(data);
        showAuthAlert(data.message, data.email_sent ? "success" : "info");
        switchAuthTab("reset-pass");
        startResetResendTimer();
        if (resetOtpInput) resetOtpInput.focus();

      } catch (err) {
        showAuthAlert(err.message, "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>إرسال رمز إعادة التعيين</span>`;
        }
      }
    });
  }

  // Resend Reset Code Button
  if (resendResetCodeBtn) {
    resendResetCodeBtn.addEventListener("click", async () => {
      if (!pendingResetEmail) return;
      clearAuthAlert();
      try {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: pendingResetEmail })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "تعذر إعادة إرسال الرمز");

        if (resetOtpInput) resetOtpInput.value = "";
        handleSmtpResetState(data);
        showAuthAlert(data.message, data.email_sent ? "success" : "info");
        startResetResendTimer();
      } catch (err) {
        showAuthAlert(err.message, "error");
      }
    });
  }

  // Step 2: Submit Reset Password Form (Enter Code & New Password)
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearAuthAlert();
      const code = resetOtpInput ? resetOtpInput.value.trim() : "";
      const newPassword = newPasswordInput ? newPasswordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

      if (!code || code.length !== 6) {
        showAuthAlert("يرجى إدخال رمز التحقق المكون من 6 أرقام", "error");
        return;
      }

      if (!newPassword || newPassword.length < 6) {
        showAuthAlert("يجب أن تتكون كلمة المرور الجديدة من 6 خانات على الأقل", "error");
        return;
      }

      if (newPassword !== confirmPassword) {
        showAuthAlert("كلمة المرور وتأكيد كلمة المرور غير متطابقتين", "error");
        return;
      }

      const submitBtn = document.getElementById("resetPasswordSubmitBtn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>جاري تعيين كلمة المرور... ⏳</span>`;
      }

      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: pendingResetEmail,
            code: code,
            new_password: newPassword
          })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "فشلت عملية تعيين كلمة المرور");
        }

        // Successfully updated password!
        // Return to login screen as requested by user
        if (newPasswordInput) newPasswordInput.value = "";
        if (confirmPasswordInput) confirmPasswordInput.value = "";
        if (resetOtpInput) resetOtpInput.value = "";

        switchAuthTab("signin");
        showAuthAlert("تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.", "success");

        if (signInEmail) {
          signInEmail.value = pendingResetEmail;
        }
        if (signInPassword) {
          signInPassword.value = "";
          signInPassword.focus();
        }

      } catch (err) {
        showAuthAlert(err.message, "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>حفظ كلمة المرور الجديدة</span>`;
        }
      }
    });
  }

  // 5. Logout Confirmation Modal
  function openLogoutModal() {
    if (!logoutModal) return;
    if (currentAuthUser) {
      if (logoutModalUserName) logoutModalUserName.textContent = currentAuthUser.name || "مستخدم";
      if (logoutModalUserEmail) logoutModalUserEmail.textContent = currentAuthUser.email || "";
      if (logoutModalAvatarBadge) {
        if (currentAuthUser.avatar) {
          logoutModalAvatarBadge.classList.add("has-image");
          const initial = (currentAuthUser.name || "U").trim().charAt(0).toUpperCase();
          logoutModalAvatarBadge.innerHTML = `<img src="${currentAuthUser.avatar}" alt="${currentAuthUser.name || 'User'}" class="user-avatar-image" onerror="this.parentElement.classList.remove('has-image'); this.parentElement.textContent='${initial}';">`;
        } else {
          logoutModalAvatarBadge.classList.remove("has-image");
          const initial = (currentAuthUser.name || "U").trim().charAt(0).toUpperCase();
          logoutModalAvatarBadge.textContent = initial;
        }
      }
    }
    logoutModal.style.display = "flex";
  }

  function closeLogoutModal() {
    if (logoutModal) logoutModal.style.display = "none";
  }

  async function handleConfirmLogout() {
    if (confirmLogoutBtn) {
      confirmLogoutBtn.disabled = true;
      confirmLogoutBtn.innerHTML = `<span>جارٍ تسجيل الخروج... ⏳</span>`;
    }

    try {
      if (currentAuthToken) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: currentAuthToken })
        });
      }
    } catch (e) {
      console.warn("Logout error:", e);
    } finally {
      if (confirmLogoutBtn) {
        confirmLogoutBtn.disabled = false;
        confirmLogoutBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span data-i18n="confirmLogoutBtnText">${t("confirmLogoutBtnText") || "تسجيل الخروج"}</span>
        `;
      }
    }

    closeLogoutModal();
    currentAuthToken = null;
    currentAuthUser = null;
    localStorage.removeItem("soso_auth_token");
    try {
      document.cookie = "soso_auth_token=; path=/; max-age=0;";
    } catch (e) {}
    conversations = [];
    currentConversationId = null;
    isNewChatMode = true;
    chatFlow.innerHTML = "";
    showHeroWelcome();
    renderConversationsList();
    updateUserProfileUI();
    showAuthModal("signin");
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openLogoutModal();
    });
  }

  if (closeLogoutBtn) closeLogoutBtn.addEventListener("click", closeLogoutModal);
  if (cancelLogoutBtn) cancelLogoutBtn.addEventListener("click", closeLogoutModal);
  if (confirmLogoutBtn) confirmLogoutBtn.addEventListener("click", handleConfirmLogout);
  if (logoutModal) {
    logoutModal.addEventListener("click", (e) => {
      if (e.target === logoutModal) closeLogoutModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (logoutModal && logoutModal.style.display !== "none") {
        closeLogoutModal();
      }
    }
  });

  // Initial load
  (async () => {
    const isAuthed = await checkAuthStatus();
    if (isAuthed) {
      await loadConversations();
    } else {
      conversations = [];
      renderConversationsList();
      showHeroWelcome();
    }
    scheduleSearchAutofillPurge();
  })();
  window.addEventListener("focus", purgeSearchAutofill);
});
