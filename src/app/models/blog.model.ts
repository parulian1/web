export interface WpBlog {
  posts: Blog[]
}

export interface Blog {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  jetpack_featured_media_url?: string;
  featured_image: string;
  short_URL: string;
  URL: string;
}
