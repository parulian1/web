export interface Testimonial {
  href: string;
  title: string;
  photo: string;
  content: string;
  reviewerName: string;
  reviewerJobTitle?: string;
  sortPriority?: string;
  isActive?: boolean;
  name: string;
}
