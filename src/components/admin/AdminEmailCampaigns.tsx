import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Mail,
  Send,
  Users,
  Eye,
  Edit3,
  Plus,
  Calendar,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Settings,
  FileText,
  Zap,
  User,
  CheckCircle
} from 'lucide-react';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  type: 'newsletter' | 'promotional' | 'welcome' | 'abandoned_cart';
  status: 'draft' | 'scheduled' | 'sent' | 'paused';
  recipients: number;
  sentDate?: string;
  scheduledDate?: string;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
  template: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced';
  subscribedDate: string;
  lastActivity: string;
  segments: string[];
}

interface Template {
  id: string;
  name: string;
  type: 'newsletter' | 'promotional' | 'welcome' | 'abandoned_cart';
  thumbnail: string;
  lastUsed: string;
  usage: number;
}

const AdminEmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: '1',
      name: 'Summer Sale Newsletter',
      subject: '🌟 Exclusive Summer Makhana Sale - Up to 25% Off!',
      type: 'promotional',
      status: 'sent',
      recipients: 4523,
      sentDate: '2025-06-15',
      openRate: 28.5,
      clickRate: 4.2,
      unsubscribeRate: 0.3,
      template: 'summer-promo'
    },
    {
      id: '2',
      name: 'Weekly Product Updates',
      subject: 'Fresh Bihar Makhana Just Arrived! 🌾',
      type: 'newsletter',
      status: 'sent',
      recipients: 3892,
      sentDate: '2025-09-20',
      openRate: 32.1,
      clickRate: 5.8,
      unsubscribeRate: 0.2,
      template: 'weekly-newsletter'
    },
    {
      id: '3',
      name: 'Welcome Series - Part 1',
      subject: 'Welcome to Makario Family! 🙏',
      type: 'welcome',
      status: 'scheduled',
      recipients: 856,
      scheduledDate: '2025-09-25T10:00:00',
      openRate: 0,
      clickRate: 0,
      unsubscribeRate: 0,
      template: 'welcome-series'
    },
    {
      id: '4',
      name: 'Cart Recovery Campaign',
      subject: 'Your Premium Makhana is waiting for you...',
      type: 'abandoned_cart',
      status: 'draft',
      recipients: 0,
      openRate: 0,
      clickRate: 0,
      unsubscribeRate: 0,
      template: 'cart-recovery'
    }
  ]);

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: '1',
      email: 'priya.sharma@email.com',
      name: 'Priya Sharma',
      status: 'subscribed',
      subscribedDate: '2025-06-15',
      lastActivity: '2025-09-20',
      segments: ['premium-customers', 'mumbai']
    },
    {
      id: '2',
      email: 'rajesh.kumar@email.com',
      name: 'Rajesh Kumar',
      status: 'subscribed',
      subscribedDate: '2025-07-02',
      lastActivity: '2025-09-18',
      segments: ['bulk-buyers', 'gujarat']
    },
    {
      id: '3',
      email: 'anita.patel@email.com',
      name: 'Anita Patel',
      status: 'unsubscribed',
      subscribedDate: '2025-05-10',
      lastActivity: '2025-08-15',
      segments: ['newsletter-only']
    }
  ]);

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Summer Promotion',
      type: 'promotional',
      thumbnail: '/email-template-1.jpg',
      lastUsed: '2025-06-15',
      usage: 5
    },
    {
      id: '2',
      name: 'Weekly Newsletter',
      type: 'newsletter',
      thumbnail: '/email-template-2.jpg',
      lastUsed: '2025-09-20',
      usage: 12
    },
    {
      id: '3',
      name: 'Welcome Series',
      type: 'welcome',
      thumbnail: '/email-template-3.jpg',
      lastUsed: '2025-09-18',
      usage: 8
    },
    {
      id: '4',
      name: 'Cart Recovery',
      type: 'abandoned_cart',
      thumbnail: '/email-template-4.jpg',
      lastUsed: '2025-09-10',
      usage: 3
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    type: 'newsletter' as EmailCampaign['type'],
    template: '',
    scheduledDate: ''
  });

  const [newSubscriber, setNewSubscriber] = useState({
    email: '',
    name: '',
    segments: ''
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.subject) {
      alert('Please fill all required campaign details');
      return;
    }

    const campaign: EmailCampaign = {
      id: (campaigns.length + 1).toString(),
      name: newCampaign.name,
      subject: newCampaign.subject,
      type: newCampaign.type,
      status: newCampaign.scheduledDate ? 'scheduled' : 'draft',
      recipients: 0,
      scheduledDate: newCampaign.scheduledDate || undefined,
      openRate: 0,
      clickRate: 0,
      unsubscribeRate: 0,
      template: newCampaign.template || 'default'
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({ name: '', subject: '', type: 'newsletter', template: '', scheduledDate: '' });
    alert('Email campaign created successfully!');
  };

  const handleAddSubscriber = () => {
    if (!newSubscriber.email || !newSubscriber.name) {
      alert('Please fill all subscriber details');
      return;
    }

    const subscriber: Subscriber = {
      id: (subscribers.length + 1).toString(),
      email: newSubscriber.email,
      name: newSubscriber.name,
      status: 'subscribed',
      subscribedDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      segments: newSubscriber.segments.split(',').map(s => s.trim()).filter(Boolean)
    };

    setSubscribers([...subscribers, subscriber]);
    setNewSubscriber({ email: '', name: '', segments: '' });
    alert('Subscriber added successfully!');
  };

  const getStatusColor = (status: EmailCampaign['status']) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getSubscriberStatusColor = (status: Subscriber['status']) => {
    switch (status) {
      case 'subscribed': return 'bg-green-100 text-green-800';
      case 'unsubscribed': return 'bg-red-100 text-red-800';
      case 'bounced': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getCampaignTypeIcon = (type: EmailCampaign['type']) => {
    switch (type) {
      case 'newsletter': return <FileText className="h-4 w-4" />;
      case 'promotional': return <Target className="h-4 w-4" />;
      case 'welcome': return <User className="h-4 w-4" />;
      case 'abandoned_cart': return <Zap className="h-4 w-4" />;
    }
  };

  const getTemplateTypeColor = (type: Template['type']) => {
    switch (type) {
      case 'newsletter': return 'bg-blue-100 text-blue-800';
      case 'promotional': return 'bg-purple-100 text-purple-800';
      case 'welcome': return 'bg-green-100 text-green-800';
      case 'abandoned_cart': return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Campaigns</h1>
          <p className="text-gray-600 mt-1">Manage email marketing campaigns and subscribers</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Email Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">12,547</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">28.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <p className="text-2xl font-bold text-gray-900">5.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Create New Campaign
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-type">Campaign Type</Label>
                  <select 
                    id="campaign-type"
                    className="w-full p-2 border rounded-md"
                    value={newCampaign.type}
                    onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value as EmailCampaign['type'] })}
                  >
                    <option value="newsletter">Newsletter</option>
                    <option value="promotional">Promotional</option>
                    <option value="welcome">Welcome Series</option>
                    <option value="abandoned_cart">Abandoned Cart</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="campaign-subject">Email Subject</Label>
                  <Input
                    id="campaign-subject"
                    value={newCampaign.subject}
                    onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                    placeholder="Enter email subject line"
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-template">Template</Label>
                  <select 
                    id="campaign-template"
                    className="w-full p-2 border rounded-md"
                    value={newCampaign.template}
                    onChange={(e) => setNewCampaign({ ...newCampaign, template: e.target.value })}
                  >
                    <option value="">Select Template</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="campaign-schedule">Schedule Date & Time</Label>
                  <Input
                    id="campaign-schedule"
                    type="datetime-local"
                    value={newCampaign.scheduledDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, scheduledDate: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleCreateCampaign} className="w-full">
                Create Campaign
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getCampaignTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{campaign.name}</h3>
                          <p className="text-sm text-gray-600">{campaign.subject}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600">Recipients</p>
                        <p className="font-semibold">{campaign.recipients.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Open Rate</p>
                        <p className="font-semibold">{campaign.openRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Click Rate</p>
                        <p className="font-semibold">{campaign.clickRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Unsubscribe</p>
                        <p className="font-semibold">{campaign.unsubscribeRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-semibold">
                          {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString() : 
                           campaign.scheduledDate ? new Date(campaign.scheduledDate).toLocaleDateString() : 'Not scheduled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2 text-sm text-gray-600">
                        <span className="capitalize">{campaign.type.replace('_', ' ')}</span>
                        {campaign.status === 'scheduled' && campaign.scheduledDate && (
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(campaign.scheduledDate).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {campaign.status === 'draft' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Send className="h-4 w-4 mr-1" />
                            Send
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Add New Subscriber
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="subscriber-email">Email Address</Label>
                  <Input
                    id="subscriber-email"
                    type="email"
                    value={newSubscriber.email}
                    onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="subscriber-name">Full Name</Label>
                  <Input
                    id="subscriber-name"
                    value={newSubscriber.name}
                    onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="subscriber-segments">Segments (comma-separated)</Label>
                  <Input
                    id="subscriber-segments"
                    value={newSubscriber.segments}
                    onChange={(e) => setNewSubscriber({ ...newSubscriber, segments: e.target.value })}
                    placeholder="premium-customers, mumbai, etc."
                  />
                </div>
              </div>
              <Button onClick={handleAddSubscriber} className="w-full">
                Add Subscriber
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscriber List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subscribers.map((subscriber) => (
                  <div key={subscriber.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{subscriber.name}</h4>
                          <p className="text-sm text-gray-600">{subscriber.email}</p>
                          <div className="flex space-x-2 mt-1">
                            {subscriber.segments.map((segment, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {segment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getSubscriberStatusColor(subscriber.status)}>
                          {subscriber.status}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          <p>Joined: {new Date(subscriber.subscribedDate).toLocaleDateString()}</p>
                          <p>Active: {new Date(subscriber.lastActivity).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Template Preview</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{template.name}</h4>
                        <Badge className={getTemplateTypeColor(template.type)}>
                          {template.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Used: {template.usage} times</p>
                        <p>Last used: {new Date(template.lastUsed).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create New Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Email Automation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">Welcome Series</h3>
                      <p className="text-sm text-gray-600">Automated 3-email welcome sequence for new subscribers</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Trigger</p>
                      <p className="font-semibold">New Subscription</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Emails Sent</p>
                      <p className="font-semibold">2,456</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Open Rate</p>
                      <p className="font-semibold">45.2%</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">Abandoned Cart Recovery</h3>
                      <p className="text-sm text-gray-600">Remind customers about items left in their cart</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Trigger</p>
                      <p className="font-semibold">Cart Abandonment</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Recovery Rate</p>
                      <p className="font-semibold">12.8%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue Recovered</p>
                      <p className="font-semibold">₹45,231</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">Re-engagement Campaign</h3>
                      <p className="text-sm text-gray-600">Win back inactive subscribers</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Trigger</p>
                      <p className="font-semibold">30 days inactive</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Reactivation Rate</p>
                      <p className="font-semibold">8.5%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Run</p>
                      <p className="font-semibold">Aug 15, 2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </div>

                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Automation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Delivery Rate</span>
                    <span className="font-semibold">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Open Rate</span>
                    <span className="font-semibold">28.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Click Rate</span>
                    <span className="font-semibold">5.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bounce Rate</span>
                    <span className="font-semibold">1.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Unsubscribe Rate</span>
                    <span className="font-semibold">0.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Top Performing Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Summer Sale Newsletter', openRate: '32.1%' },
                    { name: 'Welcome Series', openRate: '45.2%' },
                    { name: 'Product Updates', openRate: '28.5%' },
                    { name: 'Seasonal Recipes', openRate: '26.8%' }
                  ].map((campaign, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{campaign.name}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {campaign.openRate}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Growth Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">+23.5%</p>
                    <p className="text-sm text-green-600">Subscriber Growth</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">15.2%</p>
                    <p className="text-sm text-blue-600">Email-to-Sale Rate</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">₹1,23,456</p>
                    <p className="text-sm text-purple-600">Revenue from Email</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Best Performing Subject Lines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { subject: '🌟 Exclusive Summer Makhana Sale - Up to 25% Off!', openRate: 34.2, campaigns: 3 },
                  { subject: 'Welcome to Makario Family! 🙏', openRate: 45.2, campaigns: 1 },
                  { subject: 'Fresh Bihar Makhana Just Arrived! 🌾', openRate: 32.1, campaigns: 5 },
                  { subject: 'Your Premium Makhana is waiting...', openRate: 28.7, campaigns: 2 },
                  { subject: 'Limited Time: Free Shipping on All Orders!', openRate: 26.3, campaigns: 4 }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.subject}</p>
                      <p className="text-xs text-gray-500">{item.campaigns} campaigns</p>
                    </div>
                    <div className="text-right ml-4">
                      <Badge className="bg-green-100 text-green-800">
                        {item.openRate}% open rate
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminEmailCampaigns;