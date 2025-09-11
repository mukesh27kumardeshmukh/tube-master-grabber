import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Download, Play, Link, FileVideo, Music, Settings, Share, Trash2 } from "lucide-react";

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
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold gradient-text">
          YouTube डाउनलोडर
        </h1>
        <p className="text-muted-foreground">
          किसी भी YouTube वीडियो को आसानी से डाउनलोड करें
        </p>
      </div>

      {/* URL Input Card */}
      <Card className="glass-effect glow-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-primary" />
            वीडियो URL दर्ज करें
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="glass-effect"
            />
            <Button 
              onClick={analyzeVideo} 
              disabled={isAnalyzing || !url}
              variant="secondary"
            >
              {isAnalyzing ? "विश्लेषण..." : "विश्लेषण करें"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Info Card */}
      {videoInfo && (
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <img 
                src={videoInfo.thumbnail} 
                alt={videoInfo.title}
                className="w-32 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold line-clamp-2">{videoInfo.title}</h3>
                <p className="text-sm text-muted-foreground">{videoInfo.channel}</p>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{videoInfo.duration}</span>
                  <span>•</span>
                  <span>{videoInfo.views}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">गुणवत्ता</label>
                  <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                    <SelectTrigger className="glass-effect">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="360p">360p (SD)</SelectItem>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                      <SelectItem value="4K">4K (Ultra HD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">फॉर्मेट</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="glass-effect">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">
                        <div className="flex items-center gap-2">
                          <FileVideo className="w-4 h-4" />
                          MP4 (वीडियो)
                        </div>
                      </SelectItem>
                      <SelectItem value="mp3">
                        <div className="flex items-center gap-2">
                          <Music className="w-4 h-4" />
                          MP3 (ऑडियो)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={startDownload} 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                डाउनलोड शुरू करें
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Downloads List */}
      {downloads.length > 0 && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              डाउनलोड्स ({downloads.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {downloads.map((download) => (
              <div key={download.id} className="space-y-2 p-4 rounded-lg bg-card/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-1">{download.title}</h4>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {download.quality}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {download.format.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {download.status === 'completed' && (
                      <>
                        <Button size="sm" variant="ghost">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeDownload(download.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {download.status === 'downloading' && (
                  <div className="space-y-1">
                    <Progress value={download.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center">
                      {Math.round(download.progress)}% पूर्ण
                    </p>
                  </div>
                )}
                
                {download.status === 'completed' && (
                  <p className="text-xs text-green-400 text-center">
                    ✓ डाउनलोड पूर्ण
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Settings Card */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            सेटिंग्स
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• समानांतर डाउनलोड: 3</p>
            <p>• डिफ़ॉल्ट गुणवत्ता: 720p</p>
            <p>• डिफ़ॉल्ट फॉर्मेट: MP4</p>
            <p>• स्टोरेज स्थान: आंतरिक मेमोरी</p>
          </div>
        </CardContent>
      </Card>

      {/* Legal Notice */}
      <div className="text-center text-xs text-muted-foreground bg-card/20 p-4 rounded-lg">
        <p>
          ⚠️ यह UI प्रोटोटाइप है। वास्तविक YouTube डाउनलोडिंग में कानूनी समस्याएं हो सकती हैं।
          <br />
          कृपया YouTube के नियम व शर्तों का सम्मान करें।
        </p>
      </div>
    </div>
  );
};

export default VideoDownloader;