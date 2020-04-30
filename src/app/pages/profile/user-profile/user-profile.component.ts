import {Component, OnInit} from '@angular/core';
import {AuthUserService} from "@app/services/auth-user.service";
import {SocialAuth} from "@app/models/social-auth";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public socialAuth: Array<SocialAuth> = [];
  public currentModeFb: string = 'Sambungkan';
  public currentModeGoogle: string = 'Sambungkan';
  public disabledFb: boolean = false;
  public disabledGoogle: boolean = false;
  public srcGoogle: string = 'assets/social/logo-google.svg';
  public isCheckFb: boolean = false;
  public isCheckGoogle: boolean = false;

  constructor(private authUserService: AuthUserService) {
  }

  ngOnInit(): void {
    this.getSocialLink();
  }

  getSocialLink() {
    this.authUserService.getSocialLink().subscribe(res => {
      this.socialAuth = res;

      // google
      if((this.socialAuth[0].is_connect) && (!this.socialAuth[0].can_unlink)){
        this.currentModeGoogle = 'Putuskan Sambungan';
        this.srcGoogle = 'assets/social/logo-google-disabled.svg';
        this.disabledGoogle = true;
        this.isCheckGoogle = true;
      } else if((this.socialAuth[0].is_connect) && (this.socialAuth[0].can_unlink)) {
        this.currentModeGoogle = 'Putuskan Sambungan';
        this.isCheckGoogle = true;
      }

      // facebook
      if((this.socialAuth[1].is_connect) && (!this.socialAuth[1].can_unlink)){
        this.currentModeFb = 'Putuskan Sambungan';
        this.disabledFb = true;
        this.isCheckFb = true;
      } else if((this.socialAuth[1].is_connect) && (this.socialAuth[1].can_unlink)) {
        this.currentModeFb = 'Putuskan Sambungan';
        this.isCheckFb = true;
      }
    });
  }

}
