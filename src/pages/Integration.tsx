import React, { useState } from 'react';
import { Copy, Check, Code, FileText, Zap, Globe, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

const integrationSteps = [
  {
    id: 1,
    title: 'Include the Script',
    description: 'Add our JavaScript library to your website',
    icon: Code,
  },
  {
    id: 2,
    title: 'Configure Your Forms',
    description: 'Initialize validation for your contact forms',
    icon: Settings,
  },
  {
    id: 3,
    title: 'Test Integration',
    description: 'Verify everything is working correctly',
    icon: Zap,
  },
];

const codeExamples = {
  basic: `<!-- Add this before closing </head> tag -->
<script src="https://cdn.leadvalidator.com/v1/lv.js"></script>

<!-- Initialize after your form -->
<script>
  LeadValidator.init({
    apiKey: 'lv_live_your_api_key_here',
    formSelector: '#contact-form',
    validateOnSubmit: true,
    showValidationUI: true
  });
</script>`,
  
  advanced: `<script>
  LeadValidator.init({
    apiKey: 'lv_live_your_api_key_here',
    formSelector: '#contact-form',
    
    // Validation options
    validateOnSubmit: true,
    validateOnBlur: false,
    showValidationUI: true,
    
    // Custom field mapping
    fieldMap: {
      email: 'email',
      firstName: 'first_name',
      lastName: 'last_name',
      phone: 'phone',
      company: 'company'
    },
    
    // Callbacks
    onValidationComplete: function(result) {
      console.log('Validation result:', result);
      if (result.score < 70) {
        // Handle low-quality lead
        console.warn('Low quality lead detected');
      }
    },
    
    onSubmitSuccess: function(leadId) {
      console.log('Lead submitted:', leadId);
      // Redirect or show success message
    },
    
    onSubmitError: function(error) {
      console.error('Submission error:', error);
      // Show error message to user
    }
  });
</script>`,

  wordpress: `// Add to your theme's functions.php
function add_leadvalidator_script() {
    ?>
    <script src="https://cdn.leadvalidator.com/v1/lv.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        LeadValidator.init({
          apiKey: 'lv_live_your_api_key_here',
          formSelector: '.contact-form, .wpcf7-form',
          validateOnSubmit: true
        });
      });
    </script>
    <?php
}
add_action('wp_head', 'add_leadvalidator_script');`,

  react: `import { useEffect } from 'react';

function ContactForm() {
  useEffect(() => {
    // Load LeadValidator script
    const script = document.createElement('script');
    script.src = 'https://cdn.leadvalidator.com/v1/lv.js';
    script.onload = () => {
      window.LeadValidator.init({
        apiKey: 'lv_live_your_api_key_here',
        formSelector: '#contact-form',
        validateOnSubmit: true,
        onValidationComplete: (result) => {
          console.log('Validation:', result);
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <form id="contact-form">
      {/* Your form fields */}
    </form>
  );
}`
};

export const Integration: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<keyof typeof codeExamples>('basic');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Integration Guide
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Add form validation to your website in minutes with our simple JavaScript integration
        </p>
      </div>

      {/* Quick Start Steps */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Start</h2>
        <div className="space-y-6">
          {integrationSteps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  Step {step.id}: {step.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              </div>
              {index < integrationSteps.length - 1 && (
                <div className="absolute left-5 mt-10 h-6 w-0.5 bg-gray-200" style={{ marginLeft: '20px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Code Examples</h2>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'basic', label: 'Basic Setup' },
              { key: 'advanced', label: 'Advanced Options' },
              { key: 'wordpress', label: 'WordPress' },
              { key: 'react', label: 'React' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedExample(tab.key as keyof typeof codeExamples)}
                className={`${
                  selectedExample === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Code Display */}
        <div className="p-6">
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExamples[selectedExample]}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(codeExamples[selectedExample], selectedExample)}
              className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
            >
              {copiedSection === selectedExample ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Options */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Option</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Default</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  option: 'apiKey',
                  type: 'string',
                  default: 'required',
                  description: 'Your project API key from the dashboard'
                },
                {
                  option: 'formSelector',
                  type: 'string',
                  default: 'form',
                  description: 'CSS selector for the form(s) to validate'
                },
                {
                  option: 'validateOnSubmit',
                  type: 'boolean',
                  default: 'true',
                  description: 'Whether to validate when form is submitted'
                },
                {
                  option: 'validateOnBlur',
                  type: 'boolean',
                  default: 'false',
                  description: 'Whether to validate fields when they lose focus'
                },
                {
                  option: 'showValidationUI',
                  type: 'boolean',
                  default: 'true',
                  description: 'Whether to show validation feedback to users'
                },
                {
                  option: 'minScore',
                  type: 'number',
                  default: '70',
                  description: 'Minimum score to consider a lead qualified'
                },
              ].map((row, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-sm font-mono text-blue-600">{row.option}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{row.type}</td>
                  <td className="py-3 px-4 text-sm font-mono text-gray-900">{row.default}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Testing */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <Zap className="h-6 w-6 text-yellow-600 mt-1" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Test Your Integration</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p className="mb-2">After implementing the code, test your integration:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Submit a test form with a valid email address</li>
                <li>Check your dashboard for the new lead</li>
                <li>Verify webhook delivery (if configured)</li>
                <li>Test with an invalid email to see spam detection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <FileText className="h-6 w-6 text-blue-600 mt-1" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800">Need Help?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p className="mb-2">Check out these additional resources:</p>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="font-medium hover:underline">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium hover:underline">
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium hover:underline">
                    Platform-Specific Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="font-medium hover:underline">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};