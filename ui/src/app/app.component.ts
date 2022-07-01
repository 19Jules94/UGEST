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


  constructor(
    private translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
   

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


 
}
