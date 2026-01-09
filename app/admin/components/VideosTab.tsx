import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Edit, Eye, Trash2 } from 'lucide-react';

type VideoItem = {
    id: number;
    title: string;
    category: string;
    duration: string;
    views: number;
    status: string;
};

type NewVideo = {
    title: string;
    description: string;
    category: string;
    ageGroup: string;
    instructor: string;
    tags: string;
};

export function VideosTab({
    videos,
    newVideo,
    setNewVideo,
    onAddVideo,
}: {
    videos: VideoItem[];
    newVideo: NewVideo;
    setNewVideo: React.Dispatch<React.SetStateAction<NewVideo>>;
    onAddVideo: () => void;
}) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Manage Videos</h2>
                <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Video
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload New Video</CardTitle>
                        <CardDescription>Add student showcase video</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="video-title">Video Title</Label>
                            <Input
                                id="video-title"
                                value={newVideo.title}
                                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                                placeholder="Amazing Progress - Student Name"
                            />
                        </div>

                        <div>
                            <Label htmlFor="video-description">Description</Label>
                            <Textarea
                                id="video-description"
                                value={newVideo.description}
                                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                                placeholder="Describe the student's journey and achievements..."
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="video-category">Category</Label>
                                <select
                                    id="video-category"
                                    value={newVideo.category}
                                    onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md bg-background"
                                >
                                    <option value="Tajweed">Tajweed</option>
                                    <option value="Hifz">Hifz</option>
                                    <option value="Tarjama o Tafseer">Tarjama o Tafseer</option>
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="video-age-group">Age Group</Label>
                                <select
                                    id="video-age-group"
                                    value={newVideo.ageGroup}
                                    onChange={(e) => setNewVideo({ ...newVideo, ageGroup: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md bg-background"
                                >
                                    <option value="4-7 years">4-7 years</option>
                                    <option value="8-12 years">8-12 years</option>
                                    <option value="12-18 years">12-18 years</option>
                                    <option value="19-25 years">19-25 years</option>
                                    <option value="25+ years">25+ years</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="video-instructor">Instructor</Label>
                            <Input
                                id="video-instructor"
                                value={newVideo.instructor}
                                onChange={(e) => setNewVideo({ ...newVideo, instructor: e.target.value })}
                                placeholder="Sister Aisha Malik"
                            />
                        </div>

                        <div>
                            <Label htmlFor="video-tags">Tags (comma separated)</Label>
                            <Input
                                id="video-tags"
                                value={newVideo.tags}
                                onChange={(e) => setNewVideo({ ...newVideo, tags: e.target.value })}
                                placeholder="Progress, Success Story, Inspiration"
                            />
                        </div>

                        <div>
                            <Label htmlFor="video-file">Video File</Label>
                            <Input id="video-file" type="file" accept="video/*" className="cursor-pointer" />
                        </div>

                        <Button onClick={onAddVideo} className="w-full">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Video
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Current Videos</CardTitle>
                        <CardDescription>Manage uploaded videos</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {videos.map((video) => (
                                <div key={video.id} className="flex items-start justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{video.title}</h3>
                                        <div className="flex gap-2 mt-2">
                                            <Badge variant="secondary">{video.category}</Badge>
                                            <Badge variant={video.status === 'Published' ? 'default' : 'outline'}>{video.status}</Badge>
                                        </div>
                                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                            <span>Duration: {video.duration}</span>
                                            <span>Views: {video.views.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

