import React, { useState } from 'react';
import { Plus, Settings, Code, MoreHorizontal, Eye, Copy, ExternalLink } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  name: string;
  description: string;
  apiKey: string;
  leads: number;
  qualifiedLeads: number;
  webhookUrl?: string;
  createdAt: string;
  status: 'active' | 'paused';
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Main Website',
    description: 'Contact form leads from our main website',
    apiKey: 'lv_live_12345abcdef',
    leads: 1247,
    qualifiedLeads: 945,
    webhookUrl: 'https://api.company.com/webhooks/leads',
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Landing Page Campaign',
    description: 'PPC campaign landing page forms',
    apiKey: 'lv_live_67890ghijkl',
    leads: 532,
    qualifiedLeads: 421,
    createdAt: '2024-02-10',
    status: 'active'
  },
  {
    id: '3',
    name: 'Newsletter Signup',
    description: 'Newsletter subscription forms',
    apiKey: 'lv_live_mnopqr78901',
    leads: 89,
    qualifiedLeads: 67,
    webhookUrl: 'https://hooks.zapier.com/hooks/catch/123456/',
    createdAt: '2024-03-01',
    status: 'paused'
  }
];

export const Projects: React.FC = () => {
  const [projects] = useState<Project[]>(mockProjects);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API key copied to clipboard');
  };

  const getQualificationRate = (qualified: number, total: number) => {
    return total > 0 ? Math.round((qualified / total) * 100) : 0;
  };

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Projects
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your form validation projects and integration settings
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            New Project
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        project.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                            >
                              <Eye className="mr-3 h-4 w-4" />
                              View Details
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                            >
                              <Settings className="mr-3 h-4 w-4" />
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                            >
                              <ExternalLink className="mr-3 h-4 w-4" />
                              Integration Guide
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <p className="text-sm text-gray-600 mb-4">{project.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Leads</span>
                  <span className="font-medium text-gray-900">{project.leads.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qualified</span>
                  <span className="font-medium text-green-600">
                    {project.qualifiedLeads.toLocaleString()} ({getQualificationRate(project.qualifiedLeads, project.leads)}%)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">API Key</span>
                  <button
                    onClick={() => copyApiKey(project.apiKey)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded mr-2">
                      {project.apiKey.substring(0, 12)}...
                    </code>
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                  {project.webhookUrl && (
                    <span className="flex items-center">
                      <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                      Webhook active
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Integration Guide */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Quick Integration</h3>
        <p className="text-sm text-blue-700 mb-4">
          Add form validation to any website in under 5 minutes with our JavaScript snippet.
        </p>
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <code className="text-sm text-gray-800">
            {`<script src="https://cdn.leadvalidator.com/v1/lv.js"></script>
<script>
  LeadValidator.init({
    apiKey: 'your-api-key-here',
    formSelector: '#contact-form'
  });
</script>`}
          </code>
        </div>
        <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          View full integration guide →
        </button>
      </div>
    </div>
  );
};