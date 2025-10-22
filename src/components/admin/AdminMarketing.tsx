import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Calendar,
  Users,
  TrendingUp,
  Target,
  Share2,
  Search,
  Edit3,
  Eye,
  Plus,
  BarChart3,
  Image,
  MessageCircle,
  Globe,
  DollarSign,
  Play,
  Pause,
  Settings,
  Download
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'social' | 'email' | 'ppc' | 'content';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  reach: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  content: string;
  image?: string;
  scheduledDate: string;
  status: 'scheduled' | 'published' | 'draft';
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

const AdminMarketing = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Makhana Sale 2025',
      type: 'social',
      status: 'active',
      budget: 50000,
      spent: 32000,
      reach: 125000,
      clicks: 3200,
      conversions: 245,
      startDate: '2025-06-01',
      endDate: '2025-08-31'
    },
    {
      id: '2',
      name: 'Premium Bihar Makhana Launch',
      type: 'email',
      status: 'completed',
      budget: 25000,
      spent: 24500,
      reach: 85000,
      clicks: 4200,
      conversions: 380,
      startDate: '2025-05-15',
      endDate: '2025-06-15'
    },
    {
      id: '3',
      name: 'Google Ads - Healthy Snacks',
      type: 'ppc',
      status: 'active',
      budget: 100000,
      spent: 67000,
      reach: 250000,
      clicks: 8500,
      conversions: 520,
      startDate: '2025-07-01',
      endDate: '2025-09-30'
    }
  ]);

  // Calculate marketing KPIs
  const marketingKPIs = {
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalReach: campaigns.reduce((sum, c) => sum + c.reach, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    avgCTR: campaigns.length > 0 
      ? campaigns.reduce((sum, c) => sum + (c.clicks / c.reach * 100), 0) / campaigns.length 
      : 0,
    avgCPA: campaigns.reduce((sum, c) => sum + c.conversions, 0) > 0
      ? campaigns.reduce((sum, c) => sum + c.spent, 0) / campaigns.reduce((sum, c) => sum + c.conversions, 0)
      : 0,
    roi: campaigns.reduce((sum, c) => sum + c.spent, 0) > 0
      ? (campaigns.reduce((sum, c) => sum + c.conversions, 0) * 500 - campaigns.reduce((sum, c) => sum + c.spent, 0)) / campaigns.reduce((sum, c) => sum + c.spent, 0) * 100
      : 0
  };

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: '1',
      platform: 'instagram',
      content: 'Discover the authentic taste of Bihar Makhana! 🌾 Fresh from our farms to your table. #Makhana #HealthySnacks #Bihar',
      scheduledDate: '2025-09-25T10:00:00',
      status: 'scheduled',
      engagement: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: '2',
      platform: 'facebook',
      content: 'Premium quality makhana now available with free delivery across India! Order now and taste the difference.',
      scheduledDate: '2025-09-24T16:30:00',
      status: 'published',
      engagement: { likes: 147, shares: 23, comments: 12 }
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'social' as Campaign['type'],
    budget: '',
    startDate: '',
    endDate: ''
  });

  const [newPost, setNewPost] = useState({
    platform: 'instagram' as SocialPost['platform'],
    content: '',
    scheduledDate: ''
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.budget || !newCampaign.startDate || !newCampaign.endDate) {
      alert('Please fill all campaign details');
      return;
    }

    const campaign: Campaign = {
      id: (campaigns.length + 1).toString(),
      name: newCampaign.name,
      type: newCampaign.type,
      status: 'draft',
      budget: parseInt(newCampaign.budget),
      spent: 0,
      reach: 0,
      clicks: 0,
      conversions: 0,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({ name: '', type: 'social', budget: '', startDate: '', endDate: '' });
    alert('Campaign created successfully!');
  };

  const handleSchedulePost = () => {
    if (!newPost.content || !newPost.scheduledDate) {
      alert('Please fill all post details');
      return;
    }

    const post: SocialPost = {
      id: (socialPosts.length + 1).toString(),
      platform: newPost.platform,
      content: newPost.content,
      scheduledDate: newPost.scheduledDate,
      status: 'scheduled',
      engagement: { likes: 0, shares: 0, comments: 0 }
    };

    setSocialPosts([...socialPosts, post]);
    setNewPost({ platform: 'instagram', content: '', scheduledDate: '' });
    alert('Post scheduled successfully!');
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostStatusColor = (status: SocialPost['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: SocialPost['platform']) => {
    switch (platform) {
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'twitter': return '🐦';
      case 'linkedin': return '💼';
    }
  };

  const getCampaignTypeIcon = (type: Campaign['type']) => {
    switch (type) {
      case 'social': return <Share2 className="h-4 w-4" />;
      case 'email': return <MessageCircle className="h-4 w-4" />;
      case 'ppc': return <Target className="h-4 w-4" />;
      case 'content': return <Edit3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Management</h1>
          <p className="text-gray-600 mt-1">Manage campaigns, social media, and marketing content</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">₹1,75,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold text-gray-900">460K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-gray-900">1,145</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <p className="text-2xl font-bold text-gray-900">3.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="seo">SEO & Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
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
                    onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value as Campaign['type'] })}
                  >
                    <option value="social">Social Media</option>
                    <option value="email">Email Marketing</option>
                    <option value="ppc">Pay Per Click</option>
                    <option value="content">Content Marketing</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="campaign-budget">Budget (₹)</Label>
                  <Input
                    id="campaign-budget"
                    type="number"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                    placeholder="Enter budget amount"
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-start">Start Date</Label>
                  <Input
                    id="campaign-start"
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-end">End Date</Label>
                  <Input
                    id="campaign-end"
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
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
              <CardTitle>Active Campaigns</CardTitle>
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
                          <p className="text-sm text-gray-600 capitalize">{campaign.type} Campaign</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Budget</p>
                        <p className="font-semibold">₹{campaign.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Spent</p>
                        <p className="font-semibold">₹{campaign.spent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Reach</p>
                        <p className="font-semibold">{campaign.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Clicks</p>
                        <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Conversions</p>
                        <p className="font-semibold">{campaign.conversions}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-600">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Schedule Social Media Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="post-platform">Platform</Label>
                  <select 
                    id="post-platform"
                    className="w-full p-2 border rounded-md"
                    value={newPost.platform}
                    onChange={(e) => setNewPost({ ...newPost, platform: e.target.value as SocialPost['platform'] })}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="post-date">Schedule Date & Time</Label>
                  <Input
                    id="post-date"
                    type="datetime-local"
                    value={newPost.scheduledDate}
                    onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="post-content">Content</Label>
                <Textarea
                  id="post-content"
                  rows={4}
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Write your social media post content..."
                />
              </div>
              <Button onClick={handleSchedulePost} className="w-full">
                Schedule Post
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled & Published Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socialPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getPlatformIcon(post.platform)}</span>
                        <div>
                          <Badge className={getPostStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1 capitalize">{post.platform}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(post.scheduledDate).toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    
                    {post.status === 'published' && (
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>👍 {post.engagement.likes}</span>
                        <span>🔄 {post.engagement.shares}</span>
                        <span>💬 {post.engagement.comments}</span>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  SEO Keywords
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primary-keywords">Primary Keywords</Label>
                  <Textarea
                    id="primary-keywords"
                    rows={3}
                    placeholder="makhana, fox nuts, bihar makhana, healthy snacks..."
                    defaultValue="makhana, fox nuts, bihar makhana, healthy snacks, lotus seeds"
                  />
                </div>
                <div>
                  <Label htmlFor="long-tail-keywords">Long-tail Keywords</Label>
                  <Textarea
                    id="long-tail-keywords"
                    rows={3}
                    placeholder="buy premium makhana online, healthy bihar fox nuts..."
                    defaultValue="buy premium makhana online, healthy bihar fox nuts, organic lotus seeds delivery"
                  />
                </div>
                <Button className="w-full">Update SEO Keywords</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit3 className="h-5 w-5 mr-2" />
                  Content Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    placeholder="Premium Bihar Makhana | Healthy Fox Nuts Online"
                    defaultValue="Premium Bihar Makhana | Healthy Fox Nuts Online"
                  />
                </div>
                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    rows={2}
                    placeholder="Discover premium quality Bihar makhana..."
                    defaultValue="Discover premium quality Bihar makhana delivered fresh to your door. Healthy, nutritious fox nuts perfect for snacking."
                  />
                </div>
                <Button className="w-full">Update Meta Tags</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Blog: Health Benefits of Makhana', date: '2025-09-26', status: 'draft' },
                  { title: 'Article: Bihar Farming Heritage', date: '2025-09-28', status: 'scheduled' },
                  { title: 'Recipe: Makhana Kheer', date: '2025-10-01', status: 'draft' },
                ].map((content, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{content.title}</h4>
                      <p className="text-sm text-gray-600">{content.date}</p>
                    </div>
                    <Badge className={content.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                      {content.status}
                    </Badge>
                  </div>
                ))}
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
                  Website Traffic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Page Views</span>
                    <span className="font-semibold">125,432</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Unique Visitors</span>
                    <span className="font-semibold">45,231</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bounce Rate</span>
                    <span className="font-semibold">32.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg. Session</span>
                    <span className="font-semibold">2m 45s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Social Media Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Instagram</span>
                    <span className="font-semibold">25.2K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Facebook</span>
                    <span className="font-semibold">18.5K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Twitter</span>
                    <span className="font-semibold">8.3K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">LinkedIn</span>
                    <span className="font-semibold">3.1K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Conversion Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email Signups</span>
                    <span className="font-semibold">2,341</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sales Conversion</span>
                    <span className="font-semibold">4.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cart Abandonment</span>
                    <span className="font-semibold">68.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Return Visitors</span>
                    <span className="font-semibold">35.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Bihar Makhana Health Benefits', views: '12.5K', engagement: '8.2%' },
                  { title: 'Premium Fox Nuts Collection', views: '9.8K', engagement: '6.7%' },
                  { title: 'Traditional Farming Methods', views: '7.3K', engagement: '9.1%' },
                  { title: 'Makhana Recipe Ideas', views: '6.9K', engagement: '11.3%' },
                ].map((content, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{content.title}</h4>
                      <p className="text-sm text-gray-600">{content.views} views</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {content.engagement} engagement
                    </Badge>
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

export default AdminMarketing;