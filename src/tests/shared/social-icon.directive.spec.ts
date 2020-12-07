import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SocialIconDirective } from '@app/shared';

@Component({
  template: `
  <a href="https://www.instagram.com/marthatilaarshop/?hl=id" appSocialIcon #ig></a>
  <a href="https://twitter.com/MT_Shop?s=20" appSocialIcon #twitter></a>
  <a href="https://www.facebook.com/shopmarthatilaar/" appSocialIcon #fb></a>

  <a href="https://whoops-not-a-social-link" appSocialIcon #mistake></a>
`})
class TestComponent { }

describe('SocialIconDirective', () => {

  // let component: LoaderComponent;
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [SocialIconDirective, TestComponent]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(SocialIconDirective));
  });

  it('should insert instagram img in 1st <a>', () => {
    const anchorTag = des[0].nativeElement as HTMLAnchorElement;

    expect(anchorTag.children.length).toBe(1);

    expect(anchorTag.firstChild).toBeInstanceOf(HTMLImageElement);
    const imgTag = anchorTag.firstChild as HTMLImageElement;

    expect(imgTag.src).toEqual('assets/footer/instagram.png');
  });

  it('should insert twitter img in 2st <a>', () => {
    const anchorTag = des[0].nativeElement as HTMLAnchorElement;

    expect(anchorTag.children.length).toBe(1);

    expect(anchorTag.firstChild).toBeInstanceOf(HTMLImageElement);
    const imgTag = anchorTag.firstChild as HTMLImageElement;

    expect(imgTag.src).toEqual('assets/footer/twitter.png');
  });

  it('should insert facebook img in 3st <a>', () => {
    const anchorTag = des[0].nativeElement as HTMLAnchorElement;

    expect(anchorTag.children.length).toBe(1);

    expect(anchorTag.firstChild).toBeInstanceOf(HTMLImageElement);
    const imgTag = anchorTag.firstChild as HTMLImageElement;

    expect(imgTag.src).toEqual('assets/footer/facebook.png');
  });

  // todo: add test to make sure that alt and styles are set

  it('should do nothing with the 4th <a>', () => {
    const anchorTag = des[0].nativeElement as HTMLAnchorElement;
    expect(anchorTag.children.length).toBe(0);
  });
});
