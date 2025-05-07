import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Download,
  ArrowUp,
  Users,
  CheckCircle2,
  Building,
  Lock
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30days");

  // Growth Chart Data
  const growthData = [
    { name: "Jan", users: 84000 },
    { name: "Feb", users: 91000 },
    { name: "Mar", users: 98000 },
    { name: "Apr", users: 107000 },
    { name: "May", users: 118000 },
    { name: "Jun", users: 126000 },
    { name: "Jul", users: 135000 },
    { name: "Aug", users: 142857 }
  ];

  // Session Duration Data
  const sessionData = [
    { name: "Jan", duration: 12.5 },
    { name: "Feb", duration: 13.2 },
    { name: "Mar", duration: 14.1 },
    { name: "Apr", duration: 15.0 },
    { name: "May", duration: 16.2 },
    { name: "Jun", duration: 17.3 },
    { name: "Jul", duration: 17.9 },
    { name: "Aug", duration: 18.5 }
  ];

  // Revenue Data
  const revenueData = [
    { name: "Jan", actual: 420000, projected: null },
    { name: "Feb", actual: 480000, projected: null },
    { name: "Mar", actual: 520000, projected: null },
    { name: "Apr", actual: 580000, projected: null },
    { name: "May", actual: 650000, projected: null },
    { name: "Jun", actual: 780000, projected: null },
    { name: "Jul", actual: 842500, projected: null },
    { name: "Aug", actual: null, projected: 920000 },
    { name: "Sep", actual: null, projected: 990000 },
    { name: "Oct", actual: null, projected: 1060000 },
    { name: "Nov", actual: null, projected: 1150000 },
    { name: "Dec", actual: null, projected: 1250000 }
  ];

  // Satisfaction Data for Pie Chart
  const satisfactionData = [
    { name: "Very Satisfied", value: 68 },
    { name: "Satisfied", value: 26.2 },
    { name: "Neutral", value: 4.1 },
    { name: "Dissatisfied", value: 1.7 }
  ];
  
  const COLORS = ['#4A72F5', '#6ECEB2', '#E2E8F0', '#F97316'];

  const keyMetrics = [
    { label: "Therapists", value: "10,428", change: "+124 this month" },
    { label: "Communities", value: "845", change: "+32 this month" },
    { label: "Sessions Completed", value: "487,932", change: "+15.8% MoM" },
    { label: "Retention Rate", value: "78.4%", change: "+2.3% MoM" }
  ];

  const marketOpportunity = [
    { label: "Global Mental Health Market", value: "$383.31B", change: "Growing at 3.5% CAGR" },
    { label: "Telehealth Segment", value: "$87.4B", change: "Growing at 24.7% CAGR" }
  ];

  const expansionStrategies = [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500 h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>, title: "Global Expansion", description: "Targeting key markets in Europe, Asia, and Latin America with localized therapist networks" },
    { icon: <Building className="text-primary-500 h-4 w-4" />, title: "B2B Partnerships", description: "Enterprise solutions for universities, corporations, and healthcare providers" },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500 h-4 w-4"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>, title: "Insurance Integration", description: "Partnerships with health insurance providers to cover platform services" }
  ];

  const investmentPoints = [
    { icon: <TrendingUp className="text-primary-500" />, title: "High Growth Potential", description: "Projected to capture 5% of the telehealth mental wellness market within 3 years" },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Strong Network Effects", description: "Increasing value with each new user, therapist, and community added to the platform" },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, title: "Proprietary Technology", description: "AI-driven matching and recommendation system creates a sustainable competitive advantage" }
  ];

  return (
    <section id="analytics" className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary-100 text-primary-700 border-none px-6 py-1.5 text-sm font-medium mb-4">
            Investor Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Platform Analytics & Growth Metrics</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Comprehensive overview of platform performance, user engagement, and market potential
          </p>
        </div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <CardHeader className="p-6 border-b border-neutral-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-neutral-800">Platform Growth</CardTitle>
                <CardDescription>User acquisition and retention metrics</CardDescription>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="pl-3 pr-8 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-700 text-sm w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="12months">Last 12 months</SelectItem>
                      <SelectItem value="alltime">All time</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Growth Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* User Growth */}
              <Card className="bg-neutral-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">Total Users</p>
                      <p className="text-2xl font-bold text-neutral-800">142,857</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-none flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      24.3%
                    </Badge>
                  </div>
                  <div className="h-32 w-full bg-white rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" hide />
                        <Tooltip 
                          formatter={(value) => [`${value.toLocaleString()} users`, 'Users']}
                          contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}
                        />
                        <Bar dataKey="users" fill="#4A72F5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Session Duration */}
              <Card className="bg-neutral-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">Avg. Session Duration</p>
                      <p className="text-2xl font-bold text-neutral-800">18.5 min</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-none flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      12.7%
                    </Badge>
                  </div>
                  <div className="h-32 w-full bg-white rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sessionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip 
                          formatter={(value) => [`${value} minutes`, 'Avg Duration']}
                          contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="duration" 
                          stroke="#4A72F5" 
                          strokeWidth={3}
                          dot={{ fill: '#4A72F5', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* User Satisfaction */}
              <Card className="bg-neutral-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">User Satisfaction</p>
                      <p className="text-2xl font-bold text-neutral-800">94.2%</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-none flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      3.5%
                    </Badge>
                  </div>
                  <div className="h-32 w-full bg-white rounded-lg flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={satisfactionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                          labelLine={false}
                        >
                          {satisfactionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Percentage']}
                          contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {keyMetrics.map((metric, i) => (
                <Card key={i} className="border border-neutral-100">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-neutral-500 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-neutral-800">{metric.value}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-green-500 text-xs font-medium">{metric.change}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Revenue Metrics */}
            <Card className="bg-neutral-50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">Revenue & Growth Projection</h3>
                    <p className="text-neutral-600">12-month forecast based on current metrics</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="h-3 w-3 bg-primary-500 rounded-full mr-1"></span>
                      <span className="text-xs text-neutral-600">Actual</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 bg-primary-300 rounded-full mr-1"></span>
                      <span className="text-xs text-neutral-600">Projected</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-64 w-full bg-white rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']}
                        contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }}
                      />
                      <Legend />
                      <Bar dataKey="actual" name="Actual" fill="#4A72F5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="projected" name="Projected" fill="#A5B4FC" radius={[4, 4, 0, 0]} />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#4A72F5" 
                        strokeWidth={3}
                        dot={{ r: 0 }}
                        activeDot={{ r: 0 }}
                        legendType="none"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-neutral-500 mb-1">Current MRR</p>
                      <p className="text-2xl font-bold text-neutral-800">$842,500</p>
                      <div className="flex items-center mt-1">
                        <span className="text-green-500 text-xs font-medium">+18.7% MoM</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-neutral-500 mb-1">Projected ARR (12-mo)</p>
                      <p className="text-2xl font-bold text-neutral-800">$14.2M</p>
                      <div className="flex items-center mt-1">
                        <span className="text-green-500 text-xs font-medium">+42.5% YoY</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-neutral-500 mb-1">User Acquisition Cost</p>
                      <p className="text-2xl font-bold text-neutral-800">$24.80</p>
                      <div className="flex items-center mt-1">
                        <span className="text-green-500 text-xs font-medium">-8.3% MoM</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </motion.div>
        
        {/* Market Opportunity */}
        <motion.div 
          className="bg-white rounded-2xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <CardHeader className="p-6 border-b border-neutral-100">
            <CardTitle className="text-xl font-semibold text-neutral-800">Market Opportunity & Expansion Strategy</CardTitle>
            <CardDescription>Growth potential and strategic initiatives</CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-neutral-800 mb-4">Target Market Size</h4>
                <Card className="bg-neutral-50 mb-6">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {marketOpportunity.map((item, i) => (
                        <div key={i}>
                          <h5 className="text-sm font-medium text-neutral-500 mb-1">{item.label}</h5>
                          <p className="text-xl font-bold text-neutral-800">{item.value}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-green-500 text-xs font-medium">{item.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <h4 className="text-lg font-semibold text-neutral-800 mb-4">Expansion Strategy</h4>
                <div className="space-y-4">
                  {expansionStrategies.map((strategy, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        {strategy.icon}
                      </div>
                      <div>
                        <p className="text-neutral-700">
                          <span className="font-medium">{strategy.title}:</span> {strategy.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-neutral-800 mb-4">Competitive Advantage</h4>
                <Card className="bg-primary-50 mb-6">
                  <CardContent className="p-6">
                    <div className="relative">
                      {/* Quadrant chart showing competitive positioning */}
                      <div className="h-64 w-full bg-white rounded-lg p-4 relative">
                        {/* Axes labels */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500">High Accessibility</div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xs font-medium text-neutral-500">Low Accessibility</div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-xs font-medium text-neutral-500 -rotate-90">Low Personalization</div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 text-xs font-medium text-neutral-500 rotate-90">High Personalization</div>
                        
                        {/* Quadrant lines */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-px bg-neutral-200"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-px bg-neutral-200"></div>
                        
                        {/* Competitor positions */}
                        <div className="absolute top-[70%] left-[30%] h-5 w-5 rounded-full bg-neutral-200 flex items-center justify-center" title="Traditional Therapy">
                          <span className="text-xs text-neutral-600">T</span>
                        </div>
                        <div className="absolute top-[40%] left-[60%] h-5 w-5 rounded-full bg-neutral-300 flex items-center justify-center" title="BetterHelp">
                          <span className="text-xs text-neutral-600">B</span>
                        </div>
                        <div className="absolute top-[35%] left-[65%] h-5 w-5 rounded-full bg-neutral-300 flex items-center justify-center" title="Talkspace">
                          <span className="text-xs text-neutral-600">TS</span>
                        </div>
                        
                        {/* Our position (realeader) */}
                        <motion.div 
                          className="absolute top-[10%] left-[85%] h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center shadow-md z-10" 
                          title="realeader"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          viewport={{ once: true }}
                        >
                          <span className="text-xs text-white font-medium">R</span>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <h4 className="text-lg font-semibold text-neutral-800 mb-4">Investment Opportunity</h4>
                <div className="space-y-4">
                  {investmentPoints.map((point, i) => (
                    <div key={i} className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                        {point.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-neutral-800">{point.title}</h5>
                        <p className="text-sm text-neutral-600">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </motion.div>
      </div>
    </section>
  );
}
