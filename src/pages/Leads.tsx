import React, { useState } from 'react';
import { Search, Filter, Download, Mail, Phone, Calendar, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Lead {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  message?: string;
  projectName: string;
  validationScore: number;
  isQualified: boolean;
  isSpam: boolean;
  emailValid: boolean;
  phoneValid?: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    email: 'john.doe@company.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1-555-0123',
    company: 'Tech Corp',
    message: 'Interested in your services',
    projectName: 'Main Website',
    validationScore: 92,
    isQualified: true,
    isSpam: false,
    emailValid: true,
    phoneValid: true,
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    email: 'sarah@startup.io',
    firstName: 'Sarah',
    lastName: 'Johnson',
    company: 'Innovation Labs',
    projectName: 'Landing Page Campaign',
    validationScore: 88,
    isQualified: true,
    isSpam: false,
    emailValid: true,
    ipAddress: '203.0.113.45',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: '3',
    email: 'spam@fake-domain.xyz',
    firstName: 'Fake',
    lastName: 'User',
    message: 'Buy cheap products now!!!',
    projectName: 'Main Website',
    validationScore: 23,
    isQualified: false,
    isSpam: true,
    emailValid: false,
    ipAddress: '185.220.101.44',
    userAgent: 'curl/7.68.0',
    createdAt: '2024-01-20T08:45:00Z'
  }
];

const filterOptions = [
  { value: 'all', label: 'All Leads' },
  { value: 'qualified', label: 'Qualified Only' },
  { value: 'spam', label: 'Spam Only' },
  { value: 'high-score', label: 'High Score (80+)' },
];

export const Leads: React.FC = () => {
  const [leads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = searchTerm === '' || 
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'qualified' && lead.isQualified) ||
      (selectedFilter === 'spam' && lead.isSpam) ||
      (selectedFilter === 'high-score' && lead.validationScore >= 80);

    return matchesSearch && matchesFilter;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (lead: Lead) => {
    if (lead.isSpam) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (lead.isQualified) return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <Shield className="h-4 w-4 text-yellow-500" />;
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const selectAllLeads = () => {
    setSelectedLeads(selectedLeads.length === filteredLeads.length ? [] : filteredLeads.map(lead => lead.id));
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Leads
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage all captured leads with validation details
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            <Download className="h-4 w-4 inline mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-500">
              {filteredLeads.length} of {leads.length} leads
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white shadow-sm border border-gray-200 sm:rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
              onChange={selectAllLeads}
            />
            <span className="ml-3 text-sm text-gray-700">
              {selectedLeads.length > 0 ? `${selectedLeads.length} selected` : 'Select all'}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={selectedLeads.includes(lead.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-4"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLeadSelection(lead.id)}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {lead.firstName} {lead.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        {lead.company && (
                          <div className="text-sm text-gray-500">{lead.company}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className={lead.emailValid ? 'text-green-600' : 'text-red-600'}>
                          {lead.emailValid ? 'Valid' : 'Invalid'}
                        </span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className={lead.phoneValid ? 'text-green-600' : 'text-gray-600'}>
                            {lead.phoneValid ? 'Valid' : 'Unverified'}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.projectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(lead.validationScore)}`}>
                      {lead.validationScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(lead)}
                      <span className="ml-2 text-sm text-gray-900">
                        {lead.isSpam ? 'Spam' : lead.isQualified ? 'Qualified' : 'Review'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(lead.createdAt), 'MMM d, yyyy HH:mm')}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by integrating our form validation script.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};