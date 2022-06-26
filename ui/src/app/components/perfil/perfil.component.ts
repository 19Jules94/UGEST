import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Profile } from 'src/app/models/Profile';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario?: Profile;
  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.usuario= this.authenticationService.getProfile();
  }
}
