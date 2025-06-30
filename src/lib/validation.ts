import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export interface ValidationResult {
  score: number;
  emailValid: boolean;
  phoneValid: boolean | null;
  isSpam: boolean;
  reasons: string[];
}

export interface LeadData {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
}

// Email validation using comprehensive regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Common disposable email domains
const DISPOSABLE_DOMAINS = [
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'tempmail.org',
  'yopmail.com',
  'throwaway.email'
];

// Spam keywords
const SPAM_KEYWORDS = [
  'buy now',
  'click here',
  'free money',
  'guaranteed',
  'make money',
  'no cost',
  'risk free',
  'special promotion',
  'urgent',
  'winner'
];

export function validateLead(data: LeadData): ValidationResult {
  let score = 100;
  const reasons: string[] = [];
  let emailValid = false;
  let phoneValid: boolean | null = null;
  let isSpam = false;

  // Email validation
  if (data.email) {
    emailValid = EMAIL_REGEX.test(data.email);
    if (!emailValid) {
      score -= 30;
      reasons.push('Invalid email format');
    } else {
      const domain = data.email.split('@')[1].toLowerCase();
      
      // Check for disposable email domains
      if (DISPOSABLE_DOMAINS.includes(domain)) {
        score -= 40;
        reasons.push('Disposable email domain');
        isSpam = true;
      }
      
      // Check for suspicious patterns
      if (domain.includes('test') || domain.includes('example')) {
        score -= 25;
        reasons.push('Test email domain');
      }
    }
  } else {
    score -= 50;
    reasons.push('Missing email address');
  }

  // Phone validation
  if (data.phone) {
    try {
      const phoneNumber = parsePhoneNumber(data.phone);
      phoneValid = phoneNumber ? isValidPhoneNumber(data.phone) : false;
      if (!phoneValid) {
        score -= 10;
        reasons.push('Invalid phone number');
      }
    } catch {
      phoneValid = false;
      score -= 10;
      reasons.push('Invalid phone number format');
    }
  }

  // Name validation
  if (!data.firstName || data.firstName.length < 2) {
    score -= 15;
    reasons.push('Missing or invalid first name');
  }

  if (!data.lastName || data.lastName.length < 2) {
    score -= 10;
    reasons.push('Missing or invalid last name');
  }

  // Message spam detection
  if (data.message) {
    const messageLower = data.message.toLowerCase();
    const spamKeywordCount = SPAM_KEYWORDS.filter(keyword => 
      messageLower.includes(keyword)
    ).length;
    
    if (spamKeywordCount > 0) {
      score -= spamKeywordCount * 15;
      reasons.push(`Message contains ${spamKeywordCount} spam keyword(s)`);
      if (spamKeywordCount >= 2) {
        isSpam = true;
      }
    }

    // Check for excessive capitalization
    const capsRatio = (data.message.match(/[A-Z]/g) || []).length / data.message.length;
    if (capsRatio > 0.5) {
      score -= 20;
      reasons.push('Excessive capitalization in message');
      isSpam = true;
    }

    // Check for excessive punctuation
    const punctuationCount = (data.message.match(/[!?]{2,}/g) || []).length;
    if (punctuationCount > 0) {
      score -= 15;
      reasons.push('Excessive punctuation in message');
    }
  }

  // User agent validation
  if (data.userAgent) {
    // Check for bot-like user agents
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /curl/i,
      /wget/i,
      /python/i
    ];
    
    if (botPatterns.some(pattern => pattern.test(data.userAgent!))) {
      score -= 30;
      reasons.push('Bot-like user agent detected');
      isSpam = true;
    }
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  // Mark as spam if score is very low
  if (score < 30) {
    isSpam = true;
  }

  return {
    score,
    emailValid,
    phoneValid,
    isSpam,
    reasons
  };
}

// Generate a unique API key
export function generateApiKey(): string {
  const prefix = 'lv_live_';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return prefix + result;
}

// Webhook payload structure
export interface WebhookPayload {
  leadId: string;
  projectId: string;
  timestamp: string;
  data: LeadData;
  validation: ValidationResult;
  qualified: boolean;
}

// Send webhook with retry logic
export async function sendWebhook(url: string, payload: WebhookPayload, maxRetries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'LeadValidator-Webhook/1.0'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        return true;
      }

      console.warn(`Webhook attempt ${attempt} failed with status: ${response.status}`);
    } catch (error) {
      console.error(`Webhook attempt ${attempt} failed:`, error);
    }

    // Wait before retry (exponential backoff)
    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return false;
}