import supabase from "../config/db.js";

// Helper function to create slug
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Get all published blog posts
export const getAllPosts = async (req, res, next) => {
  try {
    const { category, tag, search } = req.query;
    let query = supabase.from("blog_posts").select("*").eq("published", true);

    if (category) query = query.eq("category", category);
    if (tag) query = query.contains("tags", [tag]);
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const { data: posts, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;

    res.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// Get single blog post by slug
export const getPostBySlug = async (req, res, next) => {
  try {
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", req.params.slug)
      .eq("published", true)
      .single();

    if (error || !post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Increment views
    await supabase
      .from("blog_posts")
      .update({ views: post.views + 1 })
      .eq("id", post.id);

    post.views += 1;

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Create new blog post
export const createPost = async (req, res, next) => {
  try {
    const postData = {
      ...req.body,
      slug: createSlug(req.body.title),
      author: req.body.author || "Mritunjai Singh",
      views: 0,
      likes: 0,
    };

    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert([postData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Update blog post
export const updatePost = async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = createSlug(req.body.title);
    }

    const { data: post, error } = await supabase
      .from("blog_posts")
      .update(req.body)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error || !post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.json({
      success: true,
      message: "Blog post updated successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog post
export const deletePost = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Like a blog post
export const likePost = async (req, res, next) => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("likes")
      .eq("id", req.params.id)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    const { error: updateError } = await supabase
      .from("blog_posts")
      .update({ likes: post.likes + 1 })
      .eq("id", req.params.id);

    if (updateError) throw updateError;

    res.json({
      success: true,
      data: { likes: post.likes + 1 },
    });
  } catch (error) {
    next(error);
  }
};
