import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Download, Eye, MessageSquare, Zap, Brain, Code, Palette, BarChart, Shield, Plus, User, Tag, TrendingUp } from 'lucide-react';
;

const AIAgentMarketplace = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: Brain },
    { id: 'productivity', name: 'Productivity', icon: Zap },
    { id: 'development', name: 'Development', icon: Code },
    { id: 'design', name: 'Design & Creative', icon: Palette },
    { id: 'analytics', name: 'Analytics', icon: BarChart },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'communication', name: 'Communication', icon: MessageSquare }
  ];

  const pricingOptions = [
    { id: 'all', name: 'All Pricing' },
    { id: 'free', name: 'Free' },
    { id: 'freemium', name: 'Freemium' },
    { id: 'paid', name: 'Paid' }
  ];

  // Sample AI agents data
  useEffect(() => {
    const sampleAgents = [
      {
        id: 1,
        name: 'CodeBot Pro',
        description: 'Advanced code generation and review assistant with support for 50+ programming languages',
        category: 'development',
        pricing: 'paid',
        price: '$29/month',
        rating: 4.8,
        downloads: 15420,
        author: 'DevTools Inc',
        tags: ['JavaScript', 'Python', 'Code Review', 'AI'],
        featured: true,
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&h=200&fit=crop'
      },
      {
        id: 2,
        name: 'Content Wizard',
        description: 'AI-powered content creation and optimization for marketing teams',
        category: 'productivity',
        pricing: 'freemium',
        price: 'Free / $19/month',
        rating: 4.6,
        downloads: 8930,
        author: 'MarketAI',
        tags: ['Content', 'Marketing', 'SEO', 'Writing'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop'
      },
      {
        id: 3,
        name: 'Design Assistant',
        description: 'Intelligent design suggestions and automated asset generation',
        category: 'design',
        pricing: 'paid',
        price: '$39/month',
        rating: 4.9,
        downloads: 12100,
        author: 'CreativeAI',
        tags: ['Design', 'UI/UX', 'Assets', 'Automation'],
        featured: true,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop'
      },
      {
        id: 4,
        name: 'Data Insight Engine',
        description: 'Transform raw data into actionable business insights with natural language queries',
        category: 'analytics',
        pricing: 'paid',
        price: '$49/month',
        rating: 4.7,
        downloads: 6780,
        author: 'DataForge',
        tags: ['Analytics', 'Business Intelligence', 'Data Viz', 'SQL'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop'
      },
      {
        id: 5,
        name: 'Security Guardian',
        description: 'Real-time threat detection and automated security response system',
        category: 'security',
        pricing: 'paid',
        price: '$99/month',
        rating: 4.8,
        downloads: 4250,
        author: 'SecureAI Labs',
        tags: ['Security', 'Threat Detection', 'Automation', 'Monitoring'],
        featured: false,
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop'
      },
      {
        id: 6,
        name: 'Chat Optimizer',
        description: 'Enhance team communication with AI-powered message analysis and suggestions',
        category: 'communication',
        pricing: 'freemium',
        price: 'Free / $15/month',
        rating: 4.4,
        downloads: 18900,
        author: 'CommAI',
        tags: ['Communication', 'Team Chat', 'Analysis', 'Productivity'],
        featured: true,
        image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=200&h=200&fit=crop'
      }
    ];
    setAgents(sampleAgents);
    setFilteredAgents(sampleAgents);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = agents;

    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(agent => agent.category === selectedCategory);
    }

    if (selectedPricing !== 'all') {
      filtered = filtered.filter(agent => agent.pricing === selectedPricing);
    }

    setFilteredAgents(filtered);
  }, [searchTerm, selectedCategory, selectedPricing, agents]);

  const featuredAgents = filteredAgents.filter(agent => agent.featured);
  const regularAgents = filteredAgents.filter(agent => !agent.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Rainbowbeast AI Marketplace
                </h1>
                <p className="text-sm text-gray-600">Discover & Deploy AI Agents</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Submit Agent</span>
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI agents, features, or categories..."
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white/80 border border-gray-200 rounded-xl hover:bg-white transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pricing</label>
                <select
                  className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                  value={selectedPricing}
                  onChange={(e) => setSelectedPricing(e.target.value)}
                >
                  {pricingOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Agents</p>
                <p className="text-2xl font-bold">{agents.length}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100">Active Users</p>
                <p className="text-2xl font-bold">12.5K</p>
              </div>
              <TrendingUp className="w-8 h-8 text-pink-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Downloads</p>
                <p className="text-2xl font-bold">86K</p>
              </div>
              <Download className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Avg Rating</p>
                <p className="text-2xl font-bold">4.7</p>
              </div>
              <Star className="w-8 h-8 text-green-200" />
            </div>
          </div>
        </div>

        {/* Featured Agents */}
        {featuredAgents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Agents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAgents.map(agent => (
                <(({ agent, featured }) => {
                  const getCategoryIcon = (category) => {
                    const icons = {
                      development: Code,
                      productivity: Zap,
                      design: Palette,
                      analytics: BarChart,
                      security: Shield,
                      communication: MessageSquare
                    };
                    const Icon = icons[category] || Brain;
                    return <Icon className="w-4 h-4" />;
                  };

                  const getPricingColor = (pricing) => {
                    const colors = {
                      free: 'bg-green-100 text-green-800',
                      freemium: 'bg-blue-100 text-blue-800',
                      paid: 'bg-purple-100 text-purple-800'
                    };
                    return colors[pricing] || 'bg-gray-100 text-gray-800';
                  };

                  return (
                    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border ${featured ? 'border-yellow-200 ring-2 ring-yellow-300' : 'border-white/20'} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                      {featured && (
                        <div className="flex items-center mb-3">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium text-yellow-700">Featured</span>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={agent.image}
                            alt={agent.name}
                            className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h3 className="font-bold text-gray-900">{agent.name}</h3>
                            <p className="text-sm text-gray-600">by {agent.author}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPricingColor(agent.pricing)}`}>
                          {agent.pricing}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{agent.description}</p>

                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{agent.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{agent.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(agent.category)}
                          <span className="capitalize">{agent.category}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {agent.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{agent.price}</span>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>Install</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }) key={agent.id} agent={agent} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* All Agents */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All AI Agents ({filteredAgents.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularAgents.map(agent => (
              <(({ agent, featured }) => {
                const getCategoryIcon = (category) => {
                  const icons = {
                    development: Code,
                    productivity: Zap,
                    design: Palette,
                    analytics: BarChart,
                    security: Shield,
                    communication: MessageSquare
                  };
                  const Icon = icons[category] || Brain;
                  return <Icon className="w-4 h-4" />;
                };

                const getPricingColor = (pricing) => {
                  const colors = {
                    free: 'bg-green-100 text-green-800',
                    freemium: 'bg-blue-100 text-blue-800',
                    paid: 'bg-purple-100 text-purple-800'
                  };
                  return colors[pricing] || 'bg-gray-100 text-gray-800';
                };

                return (
                  <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border ${featured ? 'border-yellow-200 ring-2 ring-yellow-300' : 'border-white/20'} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                    {featured && (
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium text-yellow-700">Featured</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h3 className="font-bold text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-gray-600">by {agent.author}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPricingColor(agent.pricing)}`}>
                        {agent.pricing}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{agent.description}</p>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{agent.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{agent.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getCategoryIcon(agent.category)}
                        <span className="capitalize">{agent.category}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{agent.price}</span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>Install</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }) key={agent.id} agent={agent} featured={false} />
            ))}
          </div>
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default AIAgentMarketplace;