import { Activity, Camera, BrainCircuit, Clock, Server, MessageSquare, AlertTriangle, RefreshCw, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function MonitoringPage() {
  const metrics = [
    {
      title: "Monitor image input quality",
      icon: <Camera className="w-5 h-5 text-blue-500" />,
      value: "98.2%",
      description: "Passing quality threshold",
      progress: 98,
      color: "bg-blue-500"
    },
    {
      title: "Track AI prediction accuracy",
      icon: <BrainCircuit className="w-5 h-5 text-green-500" />,
      value: "94.5%",
      description: "Based on validation set",
      progress: 94,
      color: "bg-green-500"
    },
    {
      title: "Measure system response time",
      icon: <Clock className="w-5 h-5 text-orange-500" />,
      value: "1.2s",
      description: "Average API latency",
      progress: 85,
      color: "bg-orange-500"
    },
    {
      title: "Log outputs & performance",
      icon: <Server className="w-5 h-5 text-purple-500" />,
      value: "Healthy",
      description: "All services running",
      progress: 100,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
                <Activity className="w-8 h-8 text-indigo-600" />
              </div>
              Process Monitoring
            </h1>
            <p className="text-slate-500 mt-2 ml-1">Real-time system health and AI performance metrics</p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-1.5 text-sm font-medium shadow-sm flex items-center w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2.5 animate-pulse"></span>
            Live Updates
          </Badge>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <Card key={idx} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    {metric.icon}
                  </div>
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{metric.title}</h3>
                <p className="text-sm text-slate-500 mb-5">{metric.description}</p>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${metric.color} transition-all duration-1000 ease-out`} style={{ width: `${metric.progress}%` }}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Monitoring Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logs & Feedback */}
          <div className="space-y-8">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <div className="p-1.5 bg-blue-50 rounded-md">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  Collect and review user feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {[
                    { stars: "★★★★★", text: "The acne detection was spot on. Very helpful!" },
                    { stars: "★★★★☆", text: "Routine suggestions are great, app is fast." },
                    { stars: "★★★★★", text: "Love the new product recommendations." }
                  ].map((fb, i) => (
                    <div key={i} className="p-5 hover:bg-slate-50/80 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm text-slate-900">Analysis Result Accuracy</span>
                        <span className="text-yellow-400 text-sm tracking-widest">{fb.stars}</span>
                      </div>
                      <p className="text-sm text-slate-600 italic">"{fb.text}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <div className="p-1.5 bg-red-50 rounded-md">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  Identify and fix errors/anomalies
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-red-50/80 text-red-800 p-4 rounded-xl flex items-start gap-4 mb-4 border border-red-100">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-red-900">API Rate Limit Warning</h4>
                    <p className="text-sm mt-1 text-red-700/90">Image processing service approaching rate limit threshold.</p>
                  </div>
                  <Badge className="ml-auto bg-red-100 text-red-800 hover:bg-red-200 border-red-200 cursor-pointer transition-colors">Investigate</Badge>
                </div>
                <p className="text-sm text-slate-500 text-center font-medium">System functioning normally. No other anomalies detected.</p>
              </CardContent>
            </Card>
          </div>

          {/* System Updates & Model Refinement */}
          <div className="space-y-8">
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <div className="p-1.5 bg-indigo-50 rounded-md">
                    <RefreshCw className="w-5 h-5 text-indigo-600" />
                  </div>
                  Perform regular system updates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></span>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-sm text-slate-900">v1.2.4 Deployed</h4>
                      <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600">Today, 10:30 AM</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1.5">Minor bug fixes and performance improvements.</p>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm"></span>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-sm text-slate-900">Security Patch</h4>
                      <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600">Yesterday, 14:15 PM</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1.5">Updated dependency vulnerabilities.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <div className="p-1.5 bg-emerald-50 rounded-md">
                    <Database className="w-5 h-5 text-emerald-600" />
                  </div>
                  Refine model using new data
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-sm text-slate-900">New Data Ingestion</h4>
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">In Progress</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-5 leading-relaxed">Training V2.0 model with recently validated user uploads to improve diverse skin tone recognition.</p>
                  
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Training Progress</span>
                      <span className="text-emerald-700">45%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                      <div className="bg-emerald-500 h-full rounded-full relative" style={{ width: '45%' }}>
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
