import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const GoogleAdsCampaignReport = () => {
  // Header customization state (same as Account report for uniformity)
  const [reportTitle, setReportTitle] = useState('Google Ads Campaign Performance Report');
  const [dateRange, setDateRange] = useState('Jan 1, 2024 - Jan 31, 2024');
  const [clientName, setClientName] = useState('[Client Name]');
  const [accountId, setAccountId] = useState('[Account ID]');
  const [reportId, setReportId] = useState('RPT-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [generatedDate, setGeneratedDate] = useState(new Date().toLocaleDateString());
  const [brandColor, setBrandColor] = useState('#3b82f6');
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState('[Company Name]');

  // Sample campaign data with API markers
  const campaignData = [
    {
      id: 'camp_1',
      name: 'Brand Awareness Q1',
      status: 'Active',
      clicks: 12450,
      impressions: 245600,
      ctr: 5.07,
      avgCpc: 1.25,
      conversions: 156,
      conversionRate: 1.25,
      cost: 15562.50,
      roas: 3.2
    },
    {
      id: 'camp_2', 
      name: 'Product Launch Campaign',
      status: 'Active',
      clicks: 8920,
      impressions: 198400,
      ctr: 4.49,
      avgCpc: 1.45,
      conversions: 124,
      conversionRate: 1.39,
      cost: 12934.00,
      roas: 2.8
    },
    {
      id: 'camp_3',
      name: 'Retargeting - High Value',
      status: 'Active', 
      clicks: 5670,
      impressions: 89200,
      ctr: 6.35,
      avgCpc: 0.95,
      conversions: 89,
      conversionRate: 1.57,
      cost: 5386.50,
      roas: 4.1
    },
    {
      id: 'camp_4',
      name: 'Search - Competitor Terms',
      status: 'Paused',
      clicks: 3240,
      impressions: 78900,
      ctr: 4.11,
      avgCpc: 1.85,
      conversions: 32,
      conversionRate: 0.99,
      cost: 5994.00,
      roas: 1.2
    },
    {
      id: 'camp_5',
      name: 'Display - Lookalike Audience',
      status: 'Active',
      clicks: 7890,
      impressions: 456700,
      ctr: 1.73,
      avgCpc: 0.75,
      conversions: 67,
      conversionRate: 0.85,
      cost: 5917.50,
      roas: 2.1
    }
  ];

  // Logo upload handling
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Create image to check dimensions
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => {
          // Recommend dimensions but don't strictly enforce
          if (img.width > 1000 || img.height > 1000) {
            if (!confirm('Image is quite large. For best results, use images smaller than 1000x1000px. Continue anyway?')) {
              return;
            }
          }
          setLogoImage(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoImage(null);
  };

  // Formatting functions
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatNumber = (num: number) => num.toLocaleString();
  const formatPercentage = (rate: number) => `${rate.toFixed(2)}%`;

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Modern Dashboard Header */}
        <div className="dashboard-header">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                {logoImage ? (
                  <div className="relative">
                    <img 
                      src={logoImage} 
                      alt="Company Logo" 
                      className="w-16 h-16 object-contain rounded-lg shadow-sm"
                    />
                    <button
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 print:hidden"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={companyLogo}
                      onChange={(e) => setCompanyLogo(e.target.value)}
                      className="editable-field font-bold text-lg"
                      placeholder="Company Name"
                    />
                    <div className="print:hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label htmlFor="logo-upload" className="text-xs text-blue-600 cursor-pointer hover:underline">
                        Upload Logo
                      </label>
                      <p className="text-xs text-muted-foreground">Max 2MB, recommended 512x512px</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right space-y-1">
              <div className="print:hidden">
                <label className="text-xs text-muted-foreground">Brand Color:</label>
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="ml-2 w-8 h-6 rounded border"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Report ID: 
                <span 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setReportId(e.target.textContent || reportId)}
                  className="editable-field ml-1"
                >
                  {reportId}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Generated: 
                <span 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setGeneratedDate(e.target.textContent || generatedDate)}
                  className="editable-field ml-1"
                >
                  {generatedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setReportTitle(e.target.textContent || reportTitle)}
              className="editable-field text-3xl font-bold"
              style={{ color: brandColor }}
            >
              {reportTitle}
            </h1>
            
            <div className="flex justify-center items-center space-x-8 text-muted-foreground">
              <div>
                <span className="font-medium">Period: </span>
                <span 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setDateRange(e.target.textContent || dateRange)}
                  className="editable-field"
                >
                  {dateRange}
                </span>
              </div>
              <div>
                <span className="font-medium">Client: </span>
                <span 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setClientName(e.target.textContent || clientName)}
                  className="editable-field"
                >
                  {clientName}
                </span>
              </div>
              <div>
                <span className="font-medium">Account: </span>
                <span 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setAccountId(e.target.textContent || accountId)}
                  className="editable-field"
                >
                  {accountId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Performance Overview Table */}
        <section className="page-break-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">📊 Campaign Performance Overview</h2>
          </div>
          <div className="dashboard-chart-card glow-effect">
            <div className="chart-card-content">
              <div className="overflow-x-auto">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Campaign Name</th>
                      <th>Status</th>
                      <th>Clicks</th>
                      <th>Impressions</th>
                      <th>CTR</th>
                      <th>Avg. CPC</th>
                      <th>Conversions</th>
                      <th>Conv. Rate</th>
                      <th>Cost</th>
                      <th>ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignData.map((campaign, index) => (
                      <tr key={campaign.id}>
                        <td id={`${campaign.id}_name`} className="font-medium">{campaign.name}</td>
                        <td id={`${campaign.id}_status`}>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td id={`${campaign.id}_clicks`}>{formatNumber(campaign.clicks)}</td>
                        <td id={`${campaign.id}_impressions`}>{formatNumber(campaign.impressions)}</td>
                        <td id={`${campaign.id}_ctr`}>{formatPercentage(campaign.ctr)}</td>
                        <td id={`${campaign.id}_avgcpc`}>{formatCurrency(campaign.avgCpc)}</td>
                        <td id={`${campaign.id}_conversions`}>{formatNumber(campaign.conversions)}</td>
                        <td id={`${campaign.id}_convrate`}>{formatPercentage(campaign.conversionRate)}</td>
                        <td id={`${campaign.id}_cost`}>{formatCurrency(campaign.cost)}</td>
                        <td id={`${campaign.id}_roas`}>{campaign.roas.toFixed(1)}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Charts Section */}
        <section className="page-break-avoid mb-8">
          <Card className="report-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                📈 Campaign Trends & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="chart-placeholder" id="chart_campaign_spend_conversion">
                  <h4 className="font-medium mb-4">Spend vs Conversions by Campaign</h4>
                  <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-gray-600">Bar Chart: Campaign Spend vs Conversions</p>
                      <p className="text-sm text-gray-500">Data will be injected via API</p>
                    </div>
                  </div>
                </div>
                
                <div className="chart-placeholder" id="chart_campaign_impressions_clicks">
                  <h4 className="font-medium mb-4">Daily Impressions & Clicks Trend</h4>
                  <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📈</div>
                      <p className="text-gray-600">Line Chart: Daily Impressions & Clicks</p>
                      <p className="text-sm text-gray-500">Data will be injected via API</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Individual Campaign Detail Cards */}
        <section className="page-break-avoid mb-8">
          <h2 className="text-2xl font-bold mb-6">📋 Individual Campaign Details</h2>
          <div className="grid gap-6">
            {campaignData.slice(0, 3).map((campaign) => (
              <Card key={campaign.id} className="report-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Campaign ID: {campaign.id.toUpperCase()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="metric-card">
                          <div className="text-2xl font-bold text-primary">{formatNumber(campaign.clicks)}</div>
                          <div className="text-sm text-muted-foreground">Clicks</div>
                        </div>
                        <div className="metric-card">
                          <div className="text-2xl font-bold text-primary">{formatNumber(campaign.impressions)}</div>
                          <div className="text-sm text-muted-foreground">Impressions</div>
                        </div>
                        <div className="metric-card">
                          <div className="text-2xl font-bold text-primary">{formatCurrency(campaign.avgCpc)}</div>
                          <div className="text-sm text-muted-foreground">Avg. CPC</div>
                        </div>
                        <div className="metric-card">
                          <div className="text-2xl font-bold text-primary">{campaign.roas.toFixed(1)}x</div>
                          <div className="text-sm text-muted-foreground">ROAS</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="chart-placeholder h-32" id={`chart_${campaign.id}_trend`}>
                        <div className="flex items-center justify-center h-full bg-gray-50 rounded border">
                          <div className="text-center">
                            <div className="text-2xl mb-1">📈</div>
                            <p className="text-xs text-gray-600">Campaign Trend</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="editable-content" id={`${campaign.id}_commentary`}>
                        <h5 className="font-medium mb-2">Analyst Notes:</h5>
                        <div 
                          contentEditable
                          suppressContentEditableWarning
                          className="min-h-[60px] p-3 border rounded-md text-sm"
                        >
                          Add your observations about this campaign performance, optimization opportunities, and strategic recommendations...
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Strategic Commentary */}
        <section className="page-break-avoid mb-8">
          <Card className="report-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                💡 Strategic Commentary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                contentEditable
                suppressContentEditableWarning
                className="editable-content min-h-[150px] p-4 border rounded-md"
                id="strategic_commentary"
              >
                <p><strong>Campaign Performance Analysis:</strong></p>
                <p>• Brand Awareness Q1 shows strong performance with 5.07% CTR and 3.2x ROAS</p>
                <p>• Retargeting campaigns delivering highest ROAS at 4.1x</p>
                <p>• Competitor terms campaign shows low ROAS (1.2x) - consider budget reallocation</p>
                <br />
                <p><strong>Key Insights:</strong></p>
                <p>Add your strategic analysis and insights here...</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Summary and Optimization Recommendations */}
        <section className="page-break-avoid mb-8">
          <Card className="report-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                🎯 Summary & Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">🚀 Top Performing Campaigns</h4>
                <div 
                  contentEditable
                  suppressContentEditableWarning
                  className="editable-content space-y-2"
                  id="top_performers"
                >
                  <p>• <strong>Retargeting - High Value:</strong> Excellent 4.1x ROAS with 6.35% CTR</p>
                  <p>• <strong>Brand Awareness Q1:</strong> Strong overall performance with balanced metrics</p>
                  <p>• <strong>Product Launch Campaign:</strong> Good conversion volume with solid 2.8x ROAS</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-red-700 mb-3">⚠️ Campaigns Needing Attention</h4>
                <div 
                  contentEditable
                  suppressContentEditableWarning
                  className="editable-content space-y-2"
                  id="attention_needed"
                >
                  <p>• <strong>Search - Competitor Terms:</strong> Low 1.2x ROAS, currently paused for optimization</p>
                  <p>• <strong>Display - Lookalike Audience:</strong> Low CTR (1.73%) suggests audience refinement needed</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <h4 className="font-semibold text-blue-800 mb-3">📋 Next Steps & Strategic Actions</h4>
                <div 
                  contentEditable
                  suppressContentEditableWarning
                  className="editable-content space-y-2 text-blue-800"
                  id="next_steps"
                >
                  <p>• Increase budget allocation to retargeting campaigns (highest ROAS)</p>
                  <p>• A/B test new ad creative for display campaigns to improve CTR</p>
                  <p>• Review and optimize competitor keyword strategy before reactivating</p>
                  <p>• Implement dynamic remarketing for product launch campaign</p>
                  <p>• Set up automated bid adjustments based on device and time performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="report-footer mt-12 pt-6 border-t print:fixed print:bottom-0 print:left-0 print:right-0">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="space-x-4">
              <span>Powered by AdSpyder</span>
              <span>•</span>
              <span>adspyder.com</span>
              <span>•</span>
              <span>support@adspyder.com</span>
            </div>
            <div>
              Page <span className="page-number"></span>
            </div>
          </div>
        </footer>
      </div>

      {/* API Integration Script Template */}
      <script dangerouslySetInnerHTML={{
        __html: `
        // API Integration Template for Google Ads Campaign Performance Report
        // Uncomment and modify these functions to connect with AdSpyder's API
        
        /*
        async function loadCampaignData() {
          try {
            const response = await fetch('/api/campaigns?client_id=' + encodeURIComponent('${accountId}'));
            const data = await response.json();
            
            // Update campaign table data
            data.campaigns.forEach((campaign, index) => {
              document.getElementById(campaign.id + '_name').textContent = campaign.name;
              document.getElementById(campaign.id + '_status').textContent = campaign.status;
              document.getElementById(campaign.id + '_clicks').textContent = campaign.clicks.toLocaleString();
              document.getElementById(campaign.id + '_impressions').textContent = campaign.impressions.toLocaleString();
              document.getElementById(campaign.id + '_ctr').textContent = campaign.ctr.toFixed(2) + '%';
              document.getElementById(campaign.id + '_avgcpc').textContent = '$' + campaign.avgCpc.toFixed(2);
              document.getElementById(campaign.id + '_conversions').textContent = campaign.conversions.toLocaleString();
              document.getElementById(campaign.id + '_convrate').textContent = campaign.conversionRate.toFixed(2) + '%';
              document.getElementById(campaign.id + '_cost').textContent = '$' + campaign.cost.toLocaleString();
              document.getElementById(campaign.id + '_roas').textContent = campaign.roas.toFixed(1) + 'x';
            });
            
            console.log('Campaign data loaded successfully');
          } catch (error) {
            console.error('Error loading campaign data:', error);
          }
        }
        
        async function loadChartData() {
          try {
            const response = await fetch('/api/campaigns/charts?client_id=' + encodeURIComponent('${accountId}'));
            const chartData = await response.json();
            
            // Initialize Chart.js or ApexCharts here
            // Example for Chart.js:
            // const ctx = document.getElementById('chart_campaign_spend_conversion').getContext('2d');
            // new Chart(ctx, {
            //   type: 'bar',
            //   data: chartData.spendVsConversions,
            //   options: { responsive: true }
            // });
            
            console.log('Chart data loaded successfully');
          } catch (error) {
            console.error('Error loading chart data:', error);
          }
        }
        
        // Call these functions when the page loads
        // document.addEventListener('DOMContentLoaded', function() {
        //   loadCampaignData();
        //   loadChartData();
        // });
        */
        `
      }} />
    </div>
  );
};

export default GoogleAdsCampaignReport;