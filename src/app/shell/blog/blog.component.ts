import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {BlogService} from '@app/services/blog.service';
import {Blog} from '@app/models/blog.model';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() limit = 5;
  blogBaseUrl: string;
  defaultImg = 'assets/blog-not-found.png';
  blogs: Blog[] = [];

  // slide configure
  slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'variableWidth': true,
    'infinite': true,
    'nextArrow': '<button class="slick-next"><span class="material-icons">\n' +
      'keyboard_arrow_right\n' +
      '</span></button>',
    'prevArrow': '<button class="slick-prev"><span class="material-icons">\n' +
      'keyboard_arrow_left\n' +
      '</span></button>',
  };

  constructor(
    private el: ElementRef,
    private blogService: BlogService
  ) { }

  // LifeCycle
  ngOnInit(): void {
    this.getList();
  }

  //
  getList(): void {
    this.blogService.getList().subscribe((blogs) => {
      this.blogBaseUrl = blogs.blogUrl;
      this.blogs = blogs.posts.slice(0, this.limit);
    });
  }

  public getPostImage(blog: Blog): string {
    return blog.featured_image || blog.featuredImage || this.defaultImg;
  }

  public getPostUrl(blog: Blog): string {
    return blog.short_URL || blog.link || '#';
  }
}
