/**
 * LeadValidator JavaScript SDK
 * Form validation and lead qualification for websites
 */
(function(window) {
  'use strict';

  const LeadValidator = {
    config: {
      apiKey: null,
      formSelector: 'form',
      validateOnSubmit: true,
      validateOnBlur: false,
      showValidationUI: true,
      minScore: 70,
      apiEndpoint: 'https://api.leadvalidator.com/v1/validate',
      fieldMap: {
        email: 'email',
        firstName: 'first_name',
        lastName: 'last_name',
        phone: 'phone',
        company: 'company',
        message: 'message'
      },
      onValidationComplete: null,
      onSubmitSuccess: null,
      onSubmitError: null
    },

    init: function(options) {
      if (!options || !options.apiKey) {
        console.error('LeadValidator: API key is required');
        return;
      }

      // Merge options with default config
      Object.assign(this.config, options);

      // Initialize form listeners
      this.initializeForms();
    },

    initializeForms: function() {
      const forms = document.querySelectorAll(this.config.formSelector);
      
      forms.forEach(form => {
        if (this.config.validateOnSubmit) {
          form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        if (this.config.validateOnBlur) {
          const emailFields = form.querySelectorAll('input[type="email"], input[name*="email"]');
          emailFields.forEach(field => {
            field.addEventListener('blur', this.validateEmailField.bind(this));
          });
        }
      });
    },

    handleFormSubmit: function(event) {
      event.preventDefault();
      
      const form = event.target;
      const formData = this.extractFormData(form);
      
      if (!formData.email) {
        this.showError('Email address is required');
        return;
      }

      // Show loading state
      this.setFormLoading(form, true);
      
      // Validate lead
      this.validateLead(formData)
        .then(result => {
          if (this.config.onValidationComplete) {
            this.config.onValidationComplete(result);
          }

          if (result.qualified) {
            this.submitLead(form, formData, result);
          } else {
            this.handleRejectedLead(form, result);
          }
        })
        .catch(error => {
          console.error('LeadValidator: Validation failed', error);
          this.setFormLoading(form, false);
          
          if (this.config.onSubmitError) {
            this.config.onSubmitError(error);
          }
        });
    },

    extractFormData: function(form) {
      const formData = new FormData(form);
      const data = {};
      
      // Map form fields to standard format
      for (const [key, value] of formData.entries()) {
        const mappedKey = this.getMappedFieldName(key);
        if (mappedKey) {
          data[mappedKey] = value;
        }
      }

      // Add tracking data
      data.ipAddress = this.getClientIP();
      data.userAgent = navigator.userAgent;
      data.referrer = document.referrer;
      data.timestamp = new Date().toISOString();

      return data;
    },

    getMappedFieldName: function(fieldName) {
      const lowerName = fieldName.toLowerCase();
      
      // Check direct mapping
      for (const [standard, mapped] of Object.entries(this.config.fieldMap)) {
        if (lowerName.includes(mapped) || lowerName.includes(standard)) {
          return standard;
        }
      }

      // Common field name patterns
      if (lowerName.includes('email')) return 'email';
      if (lowerName.includes('first') && lowerName.includes('name')) return 'firstName';
      if (lowerName.includes('last') && lowerName.includes('name')) return 'lastName';
      if (lowerName.includes('phone') || lowerName.includes('tel')) return 'phone';
      if (lowerName.includes('company') || lowerName.includes('organization')) return 'company';
      if (lowerName.includes('message') || lowerName.includes('comment')) return 'message';

      return null;
    },

    validateLead: function(data) {
      return fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      });
    },

    submitLead: function(form, data, validationResult) {
      // In a real implementation, this would submit to your backend
      // For demo purposes, we'll simulate a successful submission
      
      setTimeout(() => {
        this.setFormLoading(form, false);
        this.showSuccess('Thank you! Your message has been sent.');
        
        if (this.config.onSubmitSuccess) {
          this.config.onSubmitSuccess(validationResult.leadId || 'demo-lead-id');
        }
        
        form.reset();
      }, 1000);
    },

    handleRejectedLead: function(form, result) {
      this.setFormLoading(form, false);
      
      if (result.isSpam) {
        this.showError('Your submission appears to be spam and has been blocked.');
      } else {
        this.showError('Please check your information and try again.');
      }
    },

    validateEmailField: function(event) {
      const field = event.target;
      const email = field.value;
      
      if (!email) return;
      
      const isValid = this.isValidEmail(email);
      this.showFieldValidation(field, isValid, isValid ? 'Valid email' : 'Invalid email format');
    },

    isValidEmail: function(email) {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return emailRegex.test(email);
    },

    setFormLoading: function(form, loading) {
      const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
      
      if (submitButton) {
        submitButton.disabled = loading;
        
        if (loading) {
          submitButton.dataset.originalText = submitButton.textContent;
          submitButton.textContent = 'Validating...';
        } else {
          submitButton.textContent = submitButton.dataset.originalText || 'Submit';
        }
      }
    },

    showFieldValidation: function(field, isValid, message) {
      if (!this.config.showValidationUI) return;
      
      // Remove existing validation
      const existingFeedback = field.parentNode.querySelector('.lv-validation-feedback');
      if (existingFeedback) {
        existingFeedback.remove();
      }
      
      // Add new validation feedback
      const feedback = document.createElement('div');
      feedback.className = `lv-validation-feedback ${isValid ? 'lv-valid' : 'lv-invalid'}`;
      feedback.textContent = message;
      
      field.parentNode.appendChild(feedback);
      
      // Style the field
      field.classList.remove('lv-field-valid', 'lv-field-invalid');
      field.classList.add(isValid ? 'lv-field-valid' : 'lv-field-invalid');
    },

    showSuccess: function(message) {
      if (!this.config.showValidationUI) return;
      this.showNotification(message, 'success');
    },

    showError: function(message) {
      if (!this.config.showValidationUI) return;
      this.showNotification(message, 'error');
    },

    showNotification: function(message, type) {
      const notification = document.createElement('div');
      notification.className = `lv-notification lv-${type}`;
      notification.textContent = message;
      
      // Style the notification
      Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '6px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        maxWidth: '400px',
        backgroundColor: type === 'success' ? '#10B981' : '#EF4444',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out'
      });
      
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Remove after delay
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }, 4000);
    },

    getClientIP: function() {
      // In a real implementation, this would be handled server-side
      // This is just a placeholder for the client-side demo
      return 'client-ip-placeholder';
    }
  };

  // Add CSS for validation UI
  const style = document.createElement('style');
  style.textContent = `
    .lv-validation-feedback {
      font-size: 12px;
      margin-top: 4px;
      padding: 2px 0;
    }
    
    .lv-valid {
      color: #10B981;
    }
    
    .lv-invalid {
      color: #EF4444;
    }
    
    .lv-field-valid {
      border-color: #10B981 !important;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1) !important;
    }
    
    .lv-field-invalid {
      border-color: #EF4444 !important;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1) !important;
    }
  `;
  
  document.head.appendChild(style);

  // Expose LeadValidator globally
  window.LeadValidator = LeadValidator;

})(window);