# LeadValidator

<div align="center">
  <img src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="LeadValidator" width="800" height="400" style="border-radius: 10px; object-fit: cover;">
  
  <h3>Professional Form Validation & Lead Qualification SaaS</h3>
  <p>Reduce spam, improve lead quality, and boost conversions with real-time validation</p>

  [![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=flat-square&logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
</div>

## 🚀 Overview

LeadValidator is a comprehensive form validation and lead qualification platform that helps businesses automatically validate, score, and distribute high-quality leads. Our intelligent validation system combines email verification, phone validation, IP analysis, and behavioral scoring to ensure you only receive qualified prospects.

### ✨ Key Features

- **🔍 Advanced Lead Verification**
  - Real-time email validation with SMTP verification
  - Phone number validation using international standards
  - IP/device fingerprinting and geolocation analysis
  - Intelligent scoring algorithm (0-100 scale)

- **⚡ Easy JavaScript Integration**
  - Lightweight client-side script (<20KB)
  - Works with any HTML form
  - Dashboard-generated API keys and snippets
  - Zero-configuration setup

- **📊 Comprehensive Dashboard**
  - Real-time lead analytics and quality metrics
  - Interactive charts and conversion tracking
  - Lead management with filtering and export
  - Project organization and team collaboration

- **🔗 Flexible Data Distribution**
  - Webhook integration with retry logic
  - Email notifications for qualified leads
  - CRM integration support
  - Export capabilities (CSV, JSON)

- **🛡️ Enterprise Security**
  - Supabase authentication with RLS
  - API rate limiting and abuse protection
  - GDPR compliance features
  - SOC 2 Type II ready architecture

## 🏗️ Technical Stack

### Frontend
- **React 18** - Modern UI with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Recharts** - Interactive data visualization

### Backend & Infrastructure
- **Supabase** - PostgreSQL database with real-time features
- **Supabase Auth** - Authentication and user management
- **Edge Functions** - Serverless API endpoints
- **Row Level Security** - Database-level access control

### External Services
- **IPQualityScore API** - IP and device analysis
- **Resend/SendGrid** - Transactional email delivery
- **libphonenumber-js** - International phone validation

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- IPQualityScore API key (optional)
- Resend API key (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/leadvalidator.git
cd leadvalidator
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_CDN_URL=https://cdn.leadvalidator.com

# External Services (Optional)
VITE_IPQUALITYSCORE_API_KEY=your_ipqualityscore_api_key
VITE_RESEND_API_KEY=your_resend_api_key
```

### 3. Database Setup
The database schema is automatically managed through Supabase migrations. The main tables include:
- `profiles` - User account information
- `projects` - Form validation projects
- `leads` - Captured and validated lead data

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to access the dashboard.

## 🎯 Quick Start Guide

### For Businesses (Using the Dashboard)

1. **Create Account**: Sign up at the dashboard
2. **Create Project**: Set up a new validation project
3. **Get Integration Code**: Copy the JavaScript snippet
4. **Add to Website**: Paste the code into your website
5. **Monitor Results**: View leads and analytics in real-time

### For Developers (API Integration)

```html
<!-- Basic Integration -->
<script src="https://cdn.leadvalidator.com/v1/lv.js"></script>
<script>
  LeadValidator.init({
    apiKey: 'lv_live_your_api_key_here',
    formSelector: '#contact-form',
    validateOnSubmit: true,
    showValidationUI: true
  });
</script>
```

```javascript
// Advanced Configuration
LeadValidator.init({
  apiKey: 'lv_live_your_api_key_here',
  formSelector: '.contact-form',
  
  // Validation Options
  validateOnSubmit: true,
  validateOnBlur: false,
  minScore: 70,
  
  // Custom Field Mapping
  fieldMap: {
    email: 'email',
    firstName: 'first_name',
    lastName: 'last_name',
    phone: 'phone'
  },
  
  // Event Callbacks
  onValidationComplete: function(result) {
    console.log('Validation score:', result.score);
    if (result.qualified) {
      // Handle qualified lead
    }
  },
  
  onSubmitSuccess: function(leadId) {
    // Redirect or show success message
    window.location.href = '/thank-you';
  }
});
```

## 📊 Dashboard Features

### Lead Analytics
- **Quality Score Distribution**: Visual breakdown of lead scores
- **Conversion Trends**: Track performance over time
- **Geographic Insights**: See where your best leads come from
- **Spam Detection**: Monitor blocked submissions

### Project Management
- **Multiple Projects**: Organize forms by website or campaign
- **API Key Management**: Secure key generation and rotation
- **Webhook Configuration**: Set up real-time data delivery
- **Team Collaboration**: Invite team members with role-based access

### Lead Management
- **Advanced Filtering**: Sort by score, date, project, or status
- **Bulk Actions**: Export, delete, or update multiple leads
- **Lead Details**: View complete validation breakdown
- **Follow-up Tools**: Mark leads as contacted or converted

## 🔧 API Documentation

### Validation Endpoint
```http
POST /api/v1/validate
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1-555-0123",
  "message": "I'm interested in your services",
  "metadata": {
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://google.com"
  }
}
```

### Webhook Payload
```json
{
  "leadId": "lead_abc123",
  "projectId": "proj_xyz789",
  "timestamp": "2024-01-20T10:30:00Z",
  "data": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1-555-0123"
  },
  "validation": {
    "score": 92,
    "emailValid": true,
    "phoneValid": true,
    "isSpam": false,
    "reasons": []
  },
  "qualified": true
}
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build the application
npm run build

# Deploy to Vercel
npx vercel --prod
```

### Backend (Supabase)
The backend is automatically deployed through Supabase. Edge Functions are deployed via the Supabase CLI:

```bash
supabase functions deploy validate-lead
```

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Integration tests
npm run test:integration
```

### Test Coverage
- Form validation logic
- API endpoint responses
- Webhook delivery
- Authentication flows
- Database operations

## 🛣️ Roadmap

### Phase 1 (Current)
- ✅ Core validation system
- ✅ Dashboard interface
- ✅ JavaScript integration
- ✅ Basic webhook support

### Phase 2 (Q2 2024)
- 🔄 Advanced analytics and reporting
- 🔄 Team collaboration features
- 🔄 API rate limiting
- 🔄 White-label options

### Phase 3 (Q3 2024)
- 📋 CRM integrations (HubSpot, Salesforce)
- 📋 Advanced scoring algorithms
- 📋 A/B testing capabilities
- 📋 Mobile app

### Phase 4 (Q4 2024)
- 📋 Machine learning scoring
- 📋 Enterprise SSO
- 📋 Advanced compliance features
- 📋 Multi-language support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write comprehensive tests
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@leadvalidator.com
- 💬 Discord: [Join our community](https://discord.gg/leadvalidator)
- 📖 Documentation: [docs.leadvalidator.com](https://docs.leadvalidator.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/leadvalidator/issues)

## 🏆 Acknowledgments

- Built with [Supabase](https://supabase.com) for backend infrastructure
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons by [Lucide](https://lucide.dev)
- Phone validation by [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)

---

<div align="center">
  <p>Made with ❤️ by the LeadValidator team</p>
  <p>⭐ Star us on GitHub if this project helped you!</p>
</div>