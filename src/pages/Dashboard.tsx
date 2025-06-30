import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Shield, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const statsData = [
  { name: 'Jan', leads: 120, qualified: 95 },
  { name: 'Feb', leads: 145, qualified: 118 },
  { name: 'Mar', leads: 165, qualified: 142 },
  { name: 'Apr', leads: 189, qualified: 156 },
  { name: 'May', leads: 201, qualified: 178 },
  { name: 'Jun', leads: 234, qualified: 201 },
];

const qualityData = [
  { name: 'High Quality', value: 65, color: '#10B981' },
  { name: 'Medium Quality', value: 25, color: '#F59E0B' },
  { name: 'Low Quality', value: 10, color: '#EF4444' },
];

const stats = [
  {
    name: 'Total Leads',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Qualified Leads',
    value: '2,156',
    change: '+8.2%',
    changeType: 'positive',
    icon: Shield,
  },
  {
    name: 'Conversion Rate',
    value: '75.7%',
    change: '+2.1%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    name: 'Avg Quality Score',
    value: '84.2',
    change: '-1.4%',
    changeType: 'negative',
    icon: Zap,
  },
];

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="bg-gray-200 rounded-lg h-96"></div>
          <div className="bg-gray-200 rounded-lg h-96"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Monitor your lead validation performance and quality metrics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-lg transition-shadow sm:px-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 self-center" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 flex-shrink-0 self-center" />
                )}
                <span className="sr-only">
                  {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                </span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="qualified"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stackId="1"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Quality Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={qualityData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {qualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Leads</h3>
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {[
                { email: 'john@example.com', score: 92, status: 'qualified', time: '2 minutes ago' },
                { email: 'sarah@company.com', score: 88, status: 'qualified', time: '5 minutes ago' },
                { email: 'spam@test.com', score: 23, status: 'rejected', time: '12 minutes ago' },
                { email: 'mike@startup.io', score: 95, status: 'qualified', time: '18 minutes ago' },
              ].map((lead, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    {index !== 3 && (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            lead.status === 'qualified'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        >
                          <Shield className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            New lead: <span className="font-medium text-gray-900">{lead.email}</span>
                          </p>
                          <p className="text-sm text-gray-500">
                            Quality Score: <span className={`font-medium ${lead.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                              {lead.score}
                            </span>
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time>{lead.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};