import {Component, OnInit} from '@angular/core';
import {AuthUserService} from "@app/services/auth-user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private authUserService: AuthUserService) {
  }

  ngOnInit(): void {
    this.getSocialLink();
  }

  getSocialLink() {
    this.authUserService.getSocialLink().subscribe(res => {
      console.log('social-link ', res);
    });
  }

}
