import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Download, Play, Link, FileVideo, Music, Settings, Share, Trash2, Sparkles, Zap } from "lucide-react";

interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
}

interface DownloadItem {
  id: string;
  title: string;
  progress: number;
  status: 'downloading' | 'completed' | 'error';
  format: string;
  quality: string;
}

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedQuality, setSelectedQuality] = useState("720p");
  const [selectedFormat, setSelectedFormat] = useState("mp4");
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Initialize AdSense ads
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const analyzeVideo = async () => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      toast({
        title: "अमान्य URL",
        description: "कृपया एक मान्य YouTube URL दर्ज करें",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulating API call
    setTimeout(() => {
      setVideoInfo({
        id: "1",
        title: "Amazing YouTube Video - Sample Title",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "3:45",
        channel: "Sample Channel",
        views: "1.2M views"
      });
      setIsAnalyzing(false);
      toast({
        title: "वीडियो विश्लेषण पूर्ण",
        description: "वीडियो की जानकारी प्राप्त हो गई है",
      });
    }, 2000);
  };

  const startDownload = () => {
    if (!videoInfo) return;

    const newDownload: DownloadItem = {
      id: Date.now().toString(),
      title: videoInfo.title,
      progress: 0,
      status: 'downloading',
      format: selectedFormat,
      quality: selectedQuality
    };

    setDownloads(prev => [newDownload, ...prev]);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloads(prev => prev.map(download => {
        if (download.id === newDownload.id && download.status === 'downloading') {
          const newProgress = Math.min(download.progress + Math.random() * 15, 100);
          return {
            ...download,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : 'downloading'
          };
        }
        return download;
      }));
    }, 500);

    setTimeout(() => clearInterval(interval), 8000);

    toast({
      title: "डाउनलोड शुरू",
      description: `${selectedQuality} ${selectedFormat.toUpperCase()} में डाउनलोड शुरू हो गया`,
    });
  };

  const removeDownload = (id: string) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="min-h-screen p-4 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="p-3 rounded-full bg-gradient-primary animate-pulse-glow">
            <Download className="w-8 h-8 text-white" />
          </div>
          <Sparkles className="w-6 h-6 text-accent animate-float" />
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text">
          YouTube डाउनलोडर
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          किसी भी YouTube वीडियो को आसानी से डाउनलोड करें
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-accent">
          <Zap className="w-4 h-4" />
          <span>तेज़ • सुरक्षित • विश्वसनीय</span>
        </div>
      </div>

      {/* Google AdSense */}
      <div className="animate-fade-in">
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7836659036507838"
          data-ad-slot="3845870189"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      {/* URL Input Card */}
      <Card className="glass-effect glow-shadow card-hover animate-slide-up">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-display">
            <div className="p-2 rounded-lg bg-primary/10">
              <Link className="w-5 h-5 text-primary" />
            </div>
            वीडियो URL दर्ज करें
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="glass-effect text-base h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
            />
            <Button 
              onClick={analyzeVideo} 
              disabled={isAnalyzing || !url}
              variant="secondary"
              className="px-6 h-12 hover-glow font-medium"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  विश्लेषण...
                </div>
              ) : (
                "विश्लेषण करें"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Info Card */}
      {videoInfo && (
        <Card className="glass-effect card-hover animate-scale-in">
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="relative group">
                <img 
                  src={videoInfo.thumbnail} 
                  alt={videoInfo.title}
                  className="w-40 h-24 md:w-48 md:h-28 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="font-display font-semibold text-lg line-clamp-2 leading-tight">{videoInfo.title}</h3>
                <p className="text-sm text-accent font-medium">{videoInfo.channel}</p>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span className="bg-muted/20 px-2 py-1 rounded-full">{videoInfo.duration}</span>
                  <span className="bg-muted/20 px-2 py-1 rounded-full">{videoInfo.views}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium font-display">गुणवत्ता चुनें</label>
                  <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                    <SelectTrigger className="glass-effect h-12 font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                      <SelectItem value="360p" className="font-medium">360p (SD)</SelectItem>
                      <SelectItem value="720p" className="font-medium">720p (HD) ⭐</SelectItem>
                      <SelectItem value="1080p" className="font-medium">1080p (Full HD)</SelectItem>
                      <SelectItem value="4K" className="font-medium">4K (Ultra HD) 💎</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium font-display">फॉर्मेट चुनें</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="glass-effect h-12 font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                      <SelectItem value="mp4">
                        <div className="flex items-center gap-3">
                          <FileVideo className="w-4 h-4 text-primary" />
                          <span className="font-medium">MP4 (वीडियो)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="mp3">
                        <div className="flex items-center gap-3">
                          <Music className="w-4 h-4 text-accent" />
                          <span className="font-medium">MP3 (ऑडियो)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={startDownload} 
                className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 hover-glow h-14 text-lg font-display font-semibold"
                size="lg"
              >
                <Download className="w-6 h-6 mr-3" />
                डाउनलोड शुरू करें
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Downloads List */}
      {downloads.length > 0 && (
        <Card className="glass-effect card-hover animate-fade-in">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-display">
              <div className="p-2 rounded-lg bg-primary/10">
                <Download className="w-5 h-5 text-primary" />
              </div>
              डाउनलोड्स ({downloads.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {downloads.map((download, index) => (
              <div 
                key={download.id} 
                className="space-y-3 p-5 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm hover:bg-card/40 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-medium line-clamp-1 text-base">{download.title}</h4>
                    <div className="flex gap-2 mt-2">
                      <Badge 
                        variant="outline" 
                        className="text-xs font-medium bg-primary/10 text-primary border-primary/20"
                      >
                        {download.quality}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="text-xs font-medium bg-accent/10 text-accent border-accent/20"
                      >
                        {download.format.toUpperCase()}
                      </Badge>
                      {download.status === 'completed' && (
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                          ✓ पूर्ण
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {download.status === 'completed' && (
                      <>
                        <Button size="sm" variant="ghost" className="hover-glow h-9 w-9 p-0">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover-glow h-9 w-9 p-0">
                          <Share className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeDownload(download.id)}
                      className="hover-glow h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {download.status === 'downloading' && (
                  <div className="space-y-2">
                    <Progress 
                      value={download.progress} 
                      className="h-2 bg-muted/20" 
                    />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        डाउनलोड हो रहा है...
                      </span>
                      <span className="text-primary font-medium">
                        {Math.round(download.progress)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Settings & Legal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-display">
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              सेटिंग्स
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex justify-between">
                <span>समानांतर डाउनलोड:</span>
                <span className="text-foreground font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>डिफ़ॉल्ट गुणवत्ता:</span>
                <span className="text-foreground font-medium">720p</span>
              </div>
              <div className="flex justify-between">
                <span>डिफ़ॉल्ट फॉर्मेट:</span>
                <span className="text-foreground font-medium">MP4</span>
              </div>
              <div className="flex justify-between">
                <span>स्टोरेज स्थान:</span>
                <span className="text-foreground font-medium">आंतरिक मेमोरी</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-display font-semibold text-amber-200">कानूनी सूचना</h3>
              <p className="text-xs text-amber-300/80 leading-relaxed">
                यह UI प्रोटोटाइप है। वास्तविक YouTube डाउनलोडिंग में कानूनी समस्याएं हो सकती हैं।
                कृपया YouTube के नियम व शर्तों का सम्मान करें।
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Google AdSense Bottom */}
      <div className="animate-fade-in">
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7836659036507838"
          data-ad-slot="3845870189"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export default VideoDownloader;