import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  cover_image: string;
  views: number;
  likes: number;
  created_at: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog`);
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    ...new Set(posts.map((post) => post.category).filter(Boolean)),
  ];
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thoughts, stories and ideas about AI, ML, web development and
              technology
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All Posts
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden bg-secondary">
                        <img
                          src={post.cover_image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2 hover:gradient-text transition-all">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart size={14} />
                          {post.likes}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
