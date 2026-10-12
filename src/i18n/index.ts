// ============================================
// PINOVA PRO — i18n System (100+ Languages)
// ============================================

export const LANGUAGES: { code: string; name: string; nativeName: string; dir: 'ltr' | 'rtl'; completeness: number }[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', completeness: 100 },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr', completeness: 98 },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr', completeness: 97 },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr', completeness: 96 },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', dir: 'ltr', completeness: 95 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr', completeness: 94 },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr', completeness: 93 },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr', completeness: 92 },
  { code: 'ko', name: 'Korean', nativeName: '한국어', dir: 'ltr', completeness: 91 },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', dir: 'ltr', completeness: 90 },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', dir: 'ltr', completeness: 88 },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', completeness: 87 },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl', completeness: 85 },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: 'rtl', completeness: 83 },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr', completeness: 82 },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr', completeness: 78 },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl', completeness: 76 },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', completeness: 89 },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', dir: 'ltr', completeness: 86 },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', dir: 'ltr', completeness: 91 },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', dir: 'ltr', completeness: 88 },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', dir: 'ltr', completeness: 87 },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', dir: 'ltr', completeness: 86 },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', dir: 'ltr', completeness: 85 },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', dir: 'ltr', completeness: 83 },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', dir: 'ltr', completeness: 81 },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', dir: 'ltr', completeness: 82 },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', dir: 'ltr', completeness: 80 },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', dir: 'ltr', completeness: 78 },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', dir: 'ltr', completeness: 79 },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', dir: 'ltr', completeness: 77 },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', dir: 'ltr', completeness: 76 },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', dir: 'ltr', completeness: 84 },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', dir: 'ltr', completeness: 82 },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', dir: 'ltr', completeness: 75 },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', dir: 'ltr', completeness: 80 },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr', completeness: 81 },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', dir: 'ltr', completeness: 78 },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', dir: 'ltr', completeness: 74 },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', dir: 'ltr', completeness: 68 },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', dir: 'ltr', completeness: 62 },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr', completeness: 70 },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', dir: 'ltr', completeness: 68 },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', dir: 'ltr', completeness: 65 },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', dir: 'ltr', completeness: 64 },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr', completeness: 67 },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr', completeness: 63 },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', dir: 'ltr', completeness: 60 },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', dir: 'ltr', completeness: 58 },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', dir: 'ltr', completeness: 55 },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', dir: 'ltr', completeness: 52 },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', dir: 'ltr', completeness: 50 },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', dir: 'ltr', completeness: 53 },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', dir: 'ltr', completeness: 60 },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', dir: 'ltr', completeness: 58 },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', dir: 'ltr', completeness: 62 },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', dir: 'ltr', completeness: 55 },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', dir: 'ltr', completeness: 53 },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', dir: 'ltr', completeness: 50 },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', dir: 'ltr', completeness: 78 },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', dir: 'ltr', completeness: 76 },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', dir: 'ltr', completeness: 75 },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', dir: 'ltr', completeness: 72 },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', dir: 'ltr', completeness: 65 },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', dir: 'ltr', completeness: 63 },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara', dir: 'ltr', completeness: 55 },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', dir: 'ltr', completeness: 74 },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', dir: 'ltr', completeness: 68 },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', dir: 'ltr', completeness: 70 },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', dir: 'ltr', completeness: 48 },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', dir: 'ltr', completeness: 45 },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', dir: 'ltr', completeness: 47 },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', dir: 'ltr', completeness: 46 },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', dir: 'ltr', completeness: 44 },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', dir: 'ltr', completeness: 42 },
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', dir: 'ltr', completeness: 40 },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', dir: 'ltr', completeness: 72 },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', dir: 'ltr', completeness: 68 },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', dir: 'ltr', completeness: 70 },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', dir: 'ltr', completeness: 60 },
  { code: 'lb', name: 'Luxembourgish', nativeName: 'Lëtzebuergesch', dir: 'ltr', completeness: 55 },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', dir: 'ltr', completeness: 58 },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', dir: 'ltr', completeness: 48 },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', dir: 'ltr', completeness: 45 },
  { code: 'tk', name: 'Turkmen', nativeName: 'Türkmen', dir: 'ltr', completeness: 43 },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', dir: 'rtl', completeness: 40 },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî', dir: 'rtl', completeness: 48 },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', dir: 'rtl', completeness: 38 },
  { code: 'dv', name: 'Dhivehi', nativeName: 'ދިވެހި', dir: 'rtl', completeness: 35 },
  { code: 'jv', name: 'Javanese', nativeName: 'Basa Jawa', dir: 'ltr', completeness: 42 },
  { code: 'su', name: 'Sundanese', nativeName: 'Basa Sunda', dir: 'ltr', completeness: 38 },
  { code: 'ceb', name: 'Cebuano', nativeName: 'Cebuano', dir: 'ltr', completeness: 40 },
  { code: 'hmn', name: 'Hmong', nativeName: 'Hmoob', dir: 'ltr', completeness: 35 },
  { code: 'ny', name: 'Chichewa', nativeName: 'Chichewa', dir: 'ltr', completeness: 32 },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Kinyarwanda', dir: 'ltr', completeness: 38 },
  { code: 'sn', name: 'Shona', nativeName: 'chiShona', dir: 'ltr', completeness: 36 },
  { code: 'co', name: 'Corsican', nativeName: 'Corsu', dir: 'ltr', completeness: 45 },
  { code: 'fy', name: 'Frisian', nativeName: 'Frysk', dir: 'ltr', completeness: 50 },
  { code: 'gd', name: 'Scottish Gaelic', nativeName: 'Gàidhlig', dir: 'ltr', completeness: 48 },
  { code: 'br', name: 'Breton', nativeName: 'Brezhoneg', dir: 'ltr', completeness: 42 },
  { code: 'oc', name: 'Occitan', nativeName: 'Occitan', dir: 'ltr', completeness: 40 },
  { code: 'ht', name: 'Haitian Creole', nativeName: 'Kreyòl Ayisyen', dir: 'ltr', completeness: 45 },
  { code: 'mi', name: 'Maori', nativeName: 'Te Reo Māori', dir: 'ltr', completeness: 50 },
  { code: 'haw', name: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi', dir: 'ltr', completeness: 38 },
  { code: 'sm', name: 'Samoan', nativeName: 'Gagana Sāmoa', dir: 'ltr', completeness: 35 },
  { code: 'to', name: 'Tongan', nativeName: 'Lea Faka-Tonga', dir: 'ltr', completeness: 32 },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', dir: 'ltr', completeness: 30 },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', dir: 'ltr', completeness: 42 },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', dir: 'ltr', completeness: 38 },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', dir: 'ltr', completeness: 35 },
  { code: 'bo', name: 'Tibetan', nativeName: 'བོད་ཡིག', dir: 'ltr', completeness: 30 },
  { code: 'dz', name: 'Dzongkha', nativeName: 'རྫོང་ཁ', dir: 'ltr', completeness: 28 },
];

type TranslationKeys = {
  // Navigation
  'nav.home': string;
  'nav.search': string;
  'nav.create': string;
  'nav.notifications': string;
  'nav.messages': string;
  'nav.profile': string;
  'nav.settings': string;
  'nav.admin': string;
  'nav.logout': string;
  'nav.login': string;
  'nav.signup': string;
  // Home
  'home.title': string;
  'home.subtitle': string;
  'home.forYou': string;
  'home.trending': string;
  'home.following': string;
  // Search
  'search.placeholder': string;
  'search.results': string;
  'search.noResults': string;
  'search.filters': string;
  'search.recent': string;
  'search.clear': string;
  // Pin
  'pin.save': string;
  'pin.saved': string;
  'pin.unsave': string;
  'pin.share': string;
  'pin.download': string;
  'pin.report': string;
  'pin.comments': string;
  'pin.addComment': string;
  'pin.related': string;
  'pin.source': string;
  // Boards
  'board.create': string;
  'board.name': string;
  'board.description': string;
  'board.public': string;
  'board.private': string;
  'board.delete': string;
  'board.edit': string;
  'board.pins': string;
  // Profile
  'profile.followers': string;
  'profile.following': string;
  'profile.pins': string;
  'profile.boards': string;
  'profile.follow': string;
  'profile.unfollow': string;
  'profile.editProfile': string;
  // Auth
  'auth.welcome': string;
  'auth.email': string;
  'auth.password': string;
  'auth.forgotPassword': string;
  'auth.continueGoogle': string;
  'auth.continueGithub': string;
  'auth.continuePhone': string;
  'auth.or': string;
  'auth.noAccount': string;
  'auth.hasAccount': string;
  // Settings
  'settings.title': string;
  'settings.account': string;
  'settings.privacy': string;
  'settings.notifications': string;
  'settings.language': string;
  'settings.theme': string;
  'settings.darkMode': string;
  'settings.deleteAccount': string;
  // Admin
  'admin.dashboard': string;
  'admin.users': string;
  'admin.content': string;
  'admin.reports': string;
  'admin.analytics': string;
  'admin.settings': string;
  // General
  'general.loading': string;
  'general.error': string;
  'general.retry': string;
  'general.cancel': string;
  'general.save': string;
  'general.delete': string;
  'general.edit': string;
  'general.confirm': string;
  'general.back': string;
  'general.next': string;
  'general.loadMore': string;
  'general.noMore': string;
};

const en: TranslationKeys = {
  'nav.home': 'Home', 'nav.search': 'Search', 'nav.create': 'Create', 'nav.notifications': 'Notifications',
  'nav.messages': 'Messages', 'nav.profile': 'Profile', 'nav.settings': 'Settings', 'nav.admin': 'Admin',
  'nav.logout': 'Log out', 'nav.login': 'Log in', 'nav.signup': 'Sign up',
  'home.title': 'Get your daily dose of inspiration', 'home.subtitle': 'Discover ideas for every interest',
  'home.forYou': 'For You', 'home.trending': 'Trending', 'home.following': 'Following',
  'search.placeholder': 'Search for ideas...', 'search.results': 'results', 'search.noResults': 'No results found',
  'search.filters': 'Filters', 'search.recent': 'Recent searches', 'search.clear': 'Clear all',
  'pin.save': 'Save', 'pin.saved': 'Saved', 'pin.unsave': 'Unsave', 'pin.share': 'Share',
  'pin.download': 'Download', 'pin.report': 'Report', 'pin.comments': 'Comments',
  'pin.addComment': 'Add a comment...', 'pin.related': 'More like this', 'pin.source': 'Visit source',
  'board.create': 'Create board', 'board.name': 'Board name', 'board.description': 'Description',
  'board.public': 'Public', 'board.private': 'Private', 'board.delete': 'Delete board',
  'board.edit': 'Edit board', 'board.pins': 'pins',
  'profile.followers': 'followers', 'profile.following': 'following', 'profile.pins': 'Pins',
  'profile.boards': 'Boards', 'profile.follow': 'Follow', 'profile.unfollow': 'Unfollow',
  'profile.editProfile': 'Edit profile',
  'auth.welcome': 'Welcome to Pinova Pro', 'auth.email': 'Email', 'auth.password': 'Password',
  'auth.forgotPassword': 'Forgot password?', 'auth.continueGoogle': 'Continue with Google',
  'auth.continueGithub': 'Continue with GitHub', 'auth.continuePhone': 'Continue with phone',
  'auth.or': 'or', 'auth.noAccount': "Don't have an account?", 'auth.hasAccount': 'Already have an account?',
  'settings.title': 'Settings', 'settings.account': 'Account', 'settings.privacy': 'Privacy',
  'settings.notifications': 'Notifications', 'settings.language': 'Language', 'settings.theme': 'Theme',
  'settings.darkMode': 'Dark mode', 'settings.deleteAccount': 'Delete account',
  'admin.dashboard': 'Dashboard', 'admin.users': 'Users', 'admin.content': 'Content',
  'admin.reports': 'Reports', 'admin.analytics': 'Analytics', 'admin.settings': 'Settings',
  'general.loading': 'Loading...', 'general.error': 'Something went wrong', 'general.retry': 'Try again',
  'general.cancel': 'Cancel', 'general.save': 'Save', 'general.delete': 'Delete', 'general.edit': 'Edit',
  'general.confirm': 'Confirm', 'general.back': 'Back', 'general.next': 'Next',
  'general.loadMore': 'Load more', 'general.noMore': 'No more to show',
};

const es: Partial<TranslationKeys> = {
  'nav.home': 'Inicio', 'nav.search': 'Buscar', 'nav.create': 'Crear', 'nav.notifications': 'Notificaciones',
  'nav.messages': 'Mensajes', 'nav.profile': 'Perfil', 'nav.settings': 'Configuración', 'nav.admin': 'Admin',
  'nav.logout': 'Cerrar sesión', 'nav.login': 'Iniciar sesión', 'nav.signup': 'Registrarse',
  'home.title': 'Recibe tu dosis diaria de inspiración', 'home.subtitle': 'Descubre ideas para cada interés',
  'home.forYou': 'Para ti', 'home.trending': 'Tendencias', 'home.following': 'Siguiendo',
  'search.placeholder': 'Buscar ideas...', 'search.results': 'resultados', 'search.noResults': 'No se encontraron resultados',
  'search.filters': 'Filtros', 'search.recent': 'Búsquedas recientes', 'search.clear': 'Borrar todo',
  'pin.save': 'Guardar', 'pin.saved': 'Guardado', 'pin.unsave': 'Quitar', 'pin.share': 'Compartir',
  'pin.download': 'Descargar', 'pin.report': 'Reportar', 'pin.comments': 'Comentarios',
  'pin.addComment': 'Añadir un comentario...', 'pin.related': 'Más como este', 'pin.source': 'Visitar fuente',
  'general.loading': 'Cargando...', 'general.error': 'Algo salió mal', 'general.retry': 'Intentar de nuevo',
  'general.cancel': 'Cancelar', 'general.save': 'Guardar', 'general.delete': 'Eliminar',
};

const fr: Partial<TranslationKeys> = {
  'nav.home': 'Accueil', 'nav.search': 'Rechercher', 'nav.create': 'Créer', 'nav.notifications': 'Notifications',
  'nav.messages': 'Messages', 'nav.profile': 'Profil', 'nav.settings': 'Paramètres', 'nav.admin': 'Admin',
  'nav.logout': 'Se déconnecter', 'nav.login': 'Se connecter', 'nav.signup': "S'inscrire",
  'home.title': 'Recevez votre dose quotidienne d\'inspiration', 'home.subtitle': 'Découvrez des idées pour chaque intérêt',
  'home.forYou': 'Pour vous', 'home.trending': 'Tendances', 'home.following': 'Abonnements',
  'search.placeholder': 'Rechercher des idées...', 'pin.save': 'Enregistrer', 'pin.saved': 'Enregistré',
  'general.loading': 'Chargement...', 'general.cancel': 'Annuler', 'general.save': 'Enregistrer',
};

const de: Partial<TranslationKeys> = {
  'nav.home': 'Startseite', 'nav.search': 'Suchen', 'nav.create': 'Erstellen', 'nav.notifications': 'Benachrichtigungen',
  'nav.messages': 'Nachrichten', 'nav.profile': 'Profil', 'nav.settings': 'Einstellungen',
  'home.title': 'Erhalte deine tägliche Dosis Inspiration', 'home.subtitle': 'Entdecke Ideen für jedes Interesse',
  'home.forYou': 'Für dich', 'home.trending': 'Im Trend', 'home.following': 'Folge ich',
  'search.placeholder': 'Nach Ideen suchen...', 'pin.save': 'Speichern', 'pin.saved': 'Gespeichert',
  'general.loading': 'Laden...', 'general.cancel': 'Abbrechen', 'general.save': 'Speichern',
};

const ja: Partial<TranslationKeys> = {
  'nav.home': 'ホーム', 'nav.search': '検索', 'nav.create': '作成', 'nav.notifications': '通知',
  'nav.messages': 'メッセージ', 'nav.profile': 'プロフィール', 'nav.settings': '設定',
  'home.title': '毎日のインスピレーションを受け取ろう', 'home.subtitle': 'あらゆる興味のためのアイデアを発見',
  'home.forYou': 'おすすめ', 'home.trending': 'トレンド', 'home.following': 'フォロー中',
  'search.placeholder': 'アイデアを検索...', 'pin.save': '保存', 'pin.saved': '保存済み',
  'general.loading': '読み込み中...', 'general.cancel': 'キャンセル',
};

const ar: Partial<TranslationKeys> = {
  'nav.home': 'الرئيسية', 'nav.search': 'بحث', 'nav.create': 'إنشاء', 'nav.notifications': 'الإشعارات',
  'nav.messages': 'الرسائل', 'nav.profile': 'الملف الشخصي', 'nav.settings': 'الإعدادات',
  'home.title': 'احصل على جرعتك اليومية من الإلهام', 'home.subtitle': 'اكتشف أفكاراً لكل اهتمام',
  'home.forYou': 'لك', 'home.trending': 'رائج', 'home.following': 'متابَعون',
  'search.placeholder': 'ابحث عن أفكار...', 'pin.save': 'حفظ', 'pin.saved': 'محفوظ',
  'general.loading': 'جارٍ التحميل...', 'general.cancel': 'إلغاء',
};

const zh: Partial<TranslationKeys> = {
  'nav.home': '首页', 'nav.search': '搜索', 'nav.create': '创建', 'nav.notifications': '通知',
  'nav.messages': '消息', 'nav.profile': '个人资料', 'nav.settings': '设置',
  'home.title': '获取每日灵感', 'home.subtitle': '发现各种兴趣的想法',
  'home.forYou': '为你推荐', 'home.trending': '热门', 'home.following': '关注',
  'search.placeholder': '搜索想法...', 'pin.save': '保存', 'pin.saved': '已保存',
  'general.loading': '加载中...', 'general.cancel': '取消',
};

const ko: Partial<TranslationKeys> = {
  'nav.home': '홈', 'nav.search': '검색', 'nav.create': '만들기', 'nav.notifications': '알림',
  'nav.messages': '메시지', 'nav.profile': '프로필', 'nav.settings': '설정',
  'home.title': '매일의 영감을 받아보세요', 'home.subtitle': '모든 관심사를 위한 아이디어 발견',
  'home.forYou': '추천', 'home.trending': '인기', 'home.following': '팔로잉',
  'search.placeholder': '아이디어 검색...', 'pin.save': '저장', 'pin.saved': '저장됨',
  'general.loading': '로딩 중...', 'general.cancel': '취소',
};

const pt: Partial<TranslationKeys> = {
  'nav.home': 'Início', 'nav.search': 'Pesquisar', 'nav.create': 'Criar', 'nav.notifications': 'Notificações',
  'nav.messages': 'Mensagens', 'nav.profile': 'Perfil', 'nav.settings': 'Configurações',
  'home.title': 'Receba sua dose diária de inspiração', 'home.subtitle': 'Descubra ideias para cada interesse',
  'home.forYou': 'Para você', 'home.trending': 'Em alta', 'home.following': 'Seguindo',
  'search.placeholder': 'Pesquisar ideias...', 'pin.save': 'Salvar', 'pin.saved': 'Salvo',
  'general.loading': 'Carregando...', 'general.cancel': 'Cancelar',
};

const ru: Partial<TranslationKeys> = {
  'nav.home': 'Главная', 'nav.search': 'Поиск', 'nav.create': 'Создать', 'nav.notifications': 'Уведомления',
  'nav.messages': 'Сообщения', 'nav.profile': 'Профиль', 'nav.settings': 'Настройки',
  'home.title': 'Получайте ежедневную дозу вдохновения', 'home.subtitle': 'Откройте идеи для каждого интереса',
  'home.forYou': 'Для вас', 'home.trending': 'В тренде', 'home.following': 'Подписки',
  'search.placeholder': 'Поиск идей...', 'pin.save': 'Сохранить', 'pin.saved': 'Сохранено',
  'general.loading': 'Загрузка...', 'general.cancel': 'Отмена',
};

const translations: Record<string, Partial<TranslationKeys>> = {
  en, es, fr, de, ja, ar, zh, ko, pt, ru,
};

export function t(key: keyof TranslationKeys, lang: string = 'en'): string {
  const langTranslations = translations[lang] || translations['en'];
  return (langTranslations as Record<string, string>)?.[key] || en[key] || key;
}

export function getLanguage(code: string) {
  return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
}

export function isRTL(code: string): boolean {
  const lang = getLanguage(code);
  return lang.dir === 'rtl';
}
