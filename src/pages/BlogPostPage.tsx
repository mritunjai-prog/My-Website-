import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Heart, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import API_URL from "@/config/api";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  cover_image: string;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog/${slug}`);
      const data = await response.json();
      if (data.success) {
        setPost(data.data);
      } else {
        toast({
          title: "Error",
          description: "Blog post not found",
          variant: "destructive",
        });
        navigate("/blog");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post || hasLiked) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/${post.id}/like`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        setPost({ ...post, likes: post.likes + 1 });
        setHasLiked(true);
        toast({
          title: "Thanks!",
          description: "You liked this post",
        });
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Post not found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-20">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Button>

          {/* Cover Image */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-secondary mb-8">
            <img
              src={post.cover_image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.category && <Badge>{post.category}</Badge>}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={14} />
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye size={14} />
              {post.views}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart size={14} />
              {post.likes}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b">
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-muted-foreground">Author</p>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Like Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLike}
              disabled={hasLiked}
              className="gap-2"
            >
              <Heart size={20} className={hasLiked ? "fill-current" : ""} />
              {hasLiked ? "Liked!" : "Like this post"}
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
