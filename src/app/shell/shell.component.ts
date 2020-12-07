import {Component, OnInit} from '@angular/core';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(private creds: CredentialsService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.creds.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
  }

}
