import { Component, OnInit } from '@angular/core';
import { Navigation } from '@app/models/navigation';
import { NavigationService } from '@app/services/navigation.service';
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NewsletterService } from "@app/services/newsletter.service";
import { titleCase } from "@app/shared/helpers";
import { ShippingMethodService } from "@app/services/shipping-method.service";
import { Observable } from "rxjs";
import { ShippingMethod } from "@app/models/shipping-method";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public form: FormGroup;
  navigations: Navigation[];
  navigationType = 'content_footer';
  lazyValidation: boolean = true;
  submitted: boolean = false;

  shippings$: Observable<ShippingMethod[]>;

  constructor(
    private navigationService: NavigationService,
    private router: Router, private fb: FormBuilder,
    private newsletterService: NewsletterService,
    private shippingMethodService: ShippingMethodService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initShipping();
    this.getNavigationFooter();
  }

  initShipping(): void {
    this.shippings$ = this.shippingMethodService.fetchList(true);
  }

  getNavigationFooter() {
    this.navigationService.getNavigationByType(this.navigationType, {is_active: true}).subscribe(response => {
      if (response.status === 200) {
        this.navigations = response.body;
      }
    });
  }

  getUrl(href: string) {
    if (!href) {
      return '#';
    }
    const r = /^.+\/api\/(.+?)\/(.+?)\/(.+?)\/$/.exec(href);
    if(!r || r.length !== 4) {
      return '#';
    }
    switch (r[2]) {
      case 'category':
        return '/products/?category=' + r[3];
      default:
        return '/' + r[2] + '/' + r[3];
    }
  }

  navigateTo(href: string) {
    if (!href) {
      return;
    }
    const r = /^.+\/api\/(.+?)\/(.+?)\/(.+?)\/$/.exec(href);
    if(!r || r.length !== 4) {
      return ;
    }
    switch (r[2]) {
      case 'category':
        this.router.navigate(['/products'], {queryParams: {category: r[3]}});
        break;
      case 'page':
        this.router.navigate(['/page', r[3]]);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  get email(): FormControl {
    return this.form.get("email") as FormControl;
  }

  initForm() {
    this.form = this.fb.group({
      email: ["", [
        Validators.required,
        Validators.email,
      ]]
    })
  }

  isValidFormControl(control: FormControl): boolean {
    if (!this.lazyValidation) {
      return control.invalid && (control.dirty || control.touched || this.submitted);
    } else {
      return this.submitted && control.invalid;
    }
  }

  get formValue(): any {
    return {
      ...this.form.value,
      email: this.email.value.toLowerCase(),
    }
  }

  subscribe() {
    this.submitted = true;
    if (this.form.valid) {
      this.newsletterService.create(this.formValue).subscribe(
        (response) => {
          alert('Berhasil subscribe newsletter');
          this.reset();
        },
        (error) => {
          this.handleError(error);
        }
        );
    }
  }

  reset(): void {
    this.submitted = false;
    this.form.reset();
  }

  handleError(error: any) {
    if (error.status === 400) {
      this.setErrors(error.error);
      if (!!this.email.errors) {
        alert(titleCase(this.email.getError('server')[0]));
      }
    } else {
      alert('Gagal subscribe newsletter');
    }
  }

  setErrors(error: any): void {
    Object.keys(error).forEach(fieldName => {
      this.form.controls[fieldName].setErrors({ server: error[fieldName] });
    })
  }
}
