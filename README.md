# Pinova Pro — Visual Discovery Platform

A complete, professional Pinterest-inspired visual discovery platform built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

### Core Platform
- **Masonry Feed** — Dynamic, responsive masonry grid with infinite scroll
- **Real Image Search** — Unsplash API integration with fallback to curated images
- **Search & Filters** — Full-text search with orientation, color, and order filters
- **Pin Detail View** — Full-screen pin view with comments, reactions, sharing
- **Pin Creation** — Drag-and-drop image upload with metadata
- **Boards & Collections** — Create, organize, and manage pin collections
- **User Profiles** — Customizable profiles with avatars, bios, and activity
- **Follow System** — Follow/unfollow users with personalized feeds

### Authentication
- **Email/Password** — Secure registration and login
- **Google OAuth** — Sign in with Google account
- **GitHub OAuth** — Sign in with GitHub account
- **Phone Verification** — SMS OTP-based authentication
- **Password Reset** — Secure token-based password recovery

### User Experience
- **Dark/Light Mode** — Full theme support with persistence
- **8 Accent Colors** — Customizable brand colors
- **100+ Languages** — Internationalization with RTL support
- **Responsive Design** — Mobile, tablet, and desktop optimized
- **Progressive Web App** — Installable, offline-capable
- **Accessibility** — Keyboard navigation, ARIA labels, semantic HTML

### Admin Dashboard
- **Overview Statistics** — Users, pins, engagement metrics
- **User Management** — Search, suspend, restore users
- **Content Moderation** — Review reports, manage content
- **Analytics & Audit Logs** — Platform activity tracking
- **Platform Settings** — Feature flags, maintenance mode

### Security & Privacy
- **Role-Based Access Control** — User, moderator, admin, owner roles
- **Content Reporting** — Report pins, comments, users, messages
- **Privacy Controls** — Profile visibility, data sharing settings
- **Session Management** — Secure sessions with revocation
- **Rate Limiting** — Protection against abuse

## 📁 Project Structure

```
pinova-pro/
├── src/
│   ├── api/            # API clients (Unsplash, etc.)
│   ├── components/     # Reusable UI components
│   ├── i18n/           # Internationalization (100+ languages)
│   ├── pages/          # Page-level components
│   ├── store/          # Zustand state management
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.js      # Vite configuration
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- (Optional) Unsplash API access key for real image search
- (Optional) Google OAuth credentials
- (Optional) GitHub OAuth credentials
- (Optional) SMS provider credentials (Firebase, Twilio)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/pinova-pro.git
cd pinova-pro

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_UNSPLASH_ACCESS_KEY` | Unsplash API access key | Optional* |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `VITE_GITHUB_CLIENT_ID` | GitHub OAuth client ID | Optional |
| `VITE_API_URL` | Backend API URL | Optional |

*Without an Unsplash key, the app uses curated fallback images from Picsum Photos.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🐳 Docker Deployment

```bash
# Build the Docker image
docker build -t pinova-pro .

# Run the container
docker run -p 3000:80 \
  -e VITE_UNSPLASH_ACCESS_KEY=your_key \
  pinova-pro
```

## 🔌 API Integration

### Unsplash Image Search
The app integrates with the Unsplash API for real image search. Without an API key, it falls back to curated images from Picsum Photos.

**Features:**
- Paginated search results (up to 500 per query)
- Orientation filters (landscape, portrait, squarish)
- Color filters
- Sort by relevance or latest
- Proper attribution

### OAuth Providers
- **Google**: Uses Google Identity Services with authorization code flow
- **GitHub**: Uses GitHub OAuth Apps with authorization code flow
- **Phone**: Integrates with SMS OTP providers (Firebase Auth recommended)

## 🌍 Internationalization

Pinova Pro supports 100+ languages with:
- Searchable language selector
- Translation completeness indicators
- RTL layout support for Arabic, Hebrew, Persian, Urdu
- Locale-aware date/number formatting
- Language persistence per user

## 🔒 Security

- All secrets stored server-side only
- No credentials in frontend code
- CSRF protection for state-changing operations
- Rate limiting on sensitive endpoints
- Input validation on all user inputs
- Secure session management with HttpOnly cookies
- Password hashing with bcrypt/argon2
- XSS protection via React's built-in escaping

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` (requires admin role):
- Real-time statistics and charts
- User management with search and actions
- Content moderation queue
- Report lifecycle management
- Audit logging for all admin actions
- Platform configuration

## 🧪 Testing

```bash
# Run type checking
npm run typecheck

# Run tests (when backend is configured)
npm test
```

## 📝 Deployment Checklist

- [ ] Set up Unsplash API key (or use fallback)
- [ ] Configure Google OAuth (if using)
- [ ] Configure GitHub OAuth (if using)
- [ ] Set up SMS provider (if using phone auth)
- [ ] Configure database (PostgreSQL + Prisma)
- [ ] Set up Redis for caching/rate limiting
- [ ] Configure S3-compatible storage for uploads
- [ ] Set up HTTPS/SSL
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and logging
- [ ] Configure backups

## 📄 License

This project is provided as-is for educational and commercial use.

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript best practices
- All features are accessible
- No secrets are committed
- Tests pass before submitting PRs

---

**Pinova Pro** — Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS.
