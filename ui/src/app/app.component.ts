import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './services/authentication.service';
import {Profile} from "./models/Profile";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ui';
  public flashAlert?: string;
  public flashError?: string;
  public flashOk?: string;

  constructor(
    private translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.flashAlert = params.flashalert;
      this.flashError = params.flasherror;
      this.flashOk = params.flashok;
    });

  }

 

  changeLang(lang: string): void {
    this.translate.use(lang).subscribe();
    localStorage.setItem('selectedLanguage', lang);
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['/inicio']);
  }

  public isLogged(): boolean {
    return this.authenticationService.tieneCredenciales();
  }

  public getUsuario(): Profile | undefined {
    return this.authenticationService.getProfile();
  }

  public getFlash(): string | undefined {
    return this.flashAlert;
  }

  public getflashError(): string | undefined {
    return this.flashError;
  }

  public getflashOk(): string | undefined {
    return this.flashOk;
  }
  public onCloseFlash() {
    this.flashAlert = undefined;
    this.flashError = undefined;
    this.flashOk = undefined;
    this.router.navigate(this.route.snapshot.url);
  }
 
}
