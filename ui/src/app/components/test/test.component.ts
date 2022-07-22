import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/Test';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GestionAacademicoService } from 'src/app/services/gestion-aacademico.service';
import { GestionAccionesService } from 'src/app/services/gestion-acciones.service';
import { GestionAsignaturasService } from 'src/app/services/gestion-asignaturas.service';
import { GestionCentrosService } from 'src/app/services/gestion-centros.service';
import { GestionDepartamentosService } from 'src/app/services/gestion-departamentos.service';
import { GestionEdificiosService } from 'src/app/services/gestion-edificios.service';
import { GestionEspaciosService } from 'src/app/services/gestion-espacios.service';
import { GestionFuncionalidadesService } from 'src/app/services/gestion-funcionalidades.service';
import { GestionGruposService } from 'src/app/services/gestion-grupos.service';
import { GestionHorariosService } from 'src/app/services/gestion-horarios.service';
import { GestionPermisosService } from 'src/app/services/gestion-permisos.service';
import { GestionProfesoresService } from 'src/app/services/gestion-profesores.service';
import { GestionRolesUsuarioService } from 'src/app/services/gestion-roles-usuario.service';
import { GestionRolesService } from 'src/app/services/gestion-roles.service';
import { GestionTitulacionesService } from 'src/app/services/gestion-titulaciones.service';
import { GestionTutoriasService } from 'src/app/services/gestion-tutorias.service';
import { GestionUniversidadesService } from 'src/app/services/gestion-universidades.service';
import { GestionarUsuarioService } from 'src/app/services/gestionar-usuario.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

 
  public error?: string;
  public tests: Test[] = [];

  public type: string;


  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly gestionAccionesService: GestionAccionesService,
    private readonly gestionFuncionalidadesService: GestionFuncionalidadesService,
    private readonly gestionRolesService: GestionRolesService,
    private readonly gestionUsauriosService: GestionarUsuarioService,
    private readonly gestionPermisosService: GestionPermisosService,
    private readonly gestionRolesUsuarioService: GestionRolesUsuarioService,
    private readonly gestionCentrosService: GestionCentrosService,
    private readonly gestionUniversidadesService: GestionUniversidadesService,
    private readonly gestionDepartamentosService: GestionDepartamentosService,
    private readonly gestionEdificiosService: GestionEdificiosService,
    private readonly gestionEspaciosService: GestionEspaciosService,
    private readonly gestionAnhoAcademicoService: GestionAacademicoService,
    private readonly gestionProfesoresService: GestionProfesoresService,
    private readonly gestionTitulacionesService: GestionTitulacionesService,
    private readonly gestionGruposService: GestionGruposService,
    private readonly gestionAsignaturasService: GestionAsignaturasService,
    private readonly gestionHorariosService: GestionHorariosService,
    private readonly gestionTutoriasService: GestionTutoriasService
  ) {
   
    this.type = "ALL";

    this.tests.filter(value => value.flag).length

  }

  getAciertos() {
    return this.tests.filter(value => value.flag).length;
  }

  getFallos() {
    return this.tests.filter(value => !value.flag).length;
  }


  ngOnInit(): void {

  }

   

  doTests() {
    switch (this.type) {
      case "ALL":
        this.doTestsAll();
        break;
      case "LOGIN":
        this.doTestsLogin();
        break;
      case "ACCIONES":
        this.doTestsAcciones();
        break;
      case "DEPARTAMENTOS":
        this.doTestsDepartamentos();
        break;
      case "FUNCIONALIDADES":
        this.doTestsFuncionalidades();
        break;
      case "ROLES":
        this.doTestsRoles();
        break;
      case "USUARIOS":
        this.doTestsUsuarios();
        break;
      case "PERMISOS":
        this.doTestsPermisos();
        break;
      case "ROLESUSUARIO":
        this.doTestsRolesUsuario();
        break;
      case "CENTROS":
        this.doTestsCentros();
        break;
      case "UNIVERSIDADES":
        this.doTestsUniversidades();
        break;
      case "EDIFICIOS":
        this.doTestsEdificios();
        break;
      case "ESPACIOS":
        this.doTestsEspacios();
        break;
      case "ANHO":
        this.doTestsAnhoAcademico();
        break;
      case "PROFESORES":
        this.doTestsProfesores();
        break;
      case "TITULACIONES":
        this.doTestsTitulaciones();
        break;
      case "ASIGNATURAS":
        this.doTestsAsignaturas();
        break;
      case "GRUPOS":
        this.doTestsGrupos();
        break; 
    }
  }


  doTestsAll() {
    this.tests = [];
    this.loginTests();
    this.gestionAccionesTest();
    this.gestionFuncionalidadesTest();
    this.gestionRolesTest();
    this.gestionUsuariosTest();
    this.gestionPermisosTest();
    this.gestionRolesUsuarioTest();
    this.gestionCentrosTest();
    this.gestionUniversidadesTest();
    this.gestionDepartamentosTest();
   // this.gestionEdificiosTest();
    this.gestionEspaciosTest();
    this.gestionProfesoresTest();
    this.gestionAnhoAcademicoTest();
    this.gestionTitulacionesTest();
    this.gestionAsignaturasTest();
    this.gestionGruposTest();
 
  }

  doTestsGrupos() {
    this.tests = [];
    this.gestionGruposTest();
  }

  doTestsAsignaturas() {
    this.tests = [];
    this.gestionAsignaturasTest();
  }


  doTestsTitulaciones() {
    this.tests = [];
    this.gestionTitulacionesTest();
  }

  doTestsProfesores() {
    this.tests = [];
    this.gestionProfesoresTest();
  }

  doTestsAnhoAcademico() {
    this.tests = [];
    this.gestionAnhoAcademicoTest();
  }

  doTestsEspacios() {
    this.tests = [];
    this.gestionEspaciosTest();
  }

  doTestsEdificios() {
    this.tests = [];
    this.gestionEdificiosTest();
  }

  doTestsCentros() {
    this.tests = [];
    this.gestionCentrosTest();
  }

  doTestsRolesUsuario() {
    this.tests = [];
    this.gestionRolesUsuarioTest();
  }

  doTestsPermisos() {
    this.tests = [];
    this.gestionPermisosTest();
  }

  doTestsUsuarios() {
    this.tests = [];
    this.gestionUsuariosTest();
  }

  doTestsRoles() {
    this.tests = [];
    this.gestionRolesTest();
  }

  doTestsFuncionalidades() {
    this.tests = [];
    this.gestionFuncionalidadesTest();
  }

  doTestsAcciones() {
    this.tests = [];
    this.gestionAccionesTest();
  }

  doTestsLogin() {
    this.tests = [];
    this.loginTests();
  }

  private doTestsUniversidades() {
    this.tests = [];
    this.gestionUniversidadesTest();
  }

  private doTestsDepartamentos() {
    this.tests = [];
    this.gestionDepartamentosTest();
  }

  loginTests() {
    //TEST PARA USUARIO Y CONTRASEÑA CORRECTOS
    let dniValue = "12345678Z";
    let passwordValue = "12345678Z";

    let loginAccion1 = "Login exitoso";
    let loginDescrip1 = "Se realiza una petición de inicio de sesión que debe terminar con éxito";

    this.authenticationService.login(dniValue, passwordValue)
      .subscribe(
        value => {
          this.tests.push({accion: loginAccion1, descripcion: loginDescrip1, flag: true});
          this.authenticationService.logout();

        },
        error => {
          this.tests.push({accion: loginAccion1, descripcion: loginDescrip1, flag: false});
          this.authenticationService.logout();
        }
      )


    //TEST PARA CONTRASEÑA INCORRECTA

    dniValue = "44487626Z";
    passwordValue = "44487";

    let loginAccion2 = "Login Contraseña incorrecta";
    let loginDescrip2 = "El login debe devolver un error debido a que no se han introducido correctamente un usuario y una contraseña coincidentes.";

    this.authenticationService.login(dniValue, passwordValue)
      .subscribe(
        value => {
          this.tests.push({accion: loginAccion2, descripcion: loginDescrip2, flag: false});
          this.authenticationService.logout();
        },
        error => {
          this.tests.push({accion: loginAccion2, descripcion: loginDescrip2, flag: true});
          this.authenticationService.logout();
        }
      )

    //TEST PARA USUARIO INEXISTENTE

    dniValue = "4448762";
    passwordValue = "44487";

    let loginAccion3 = "Login Usuario inexistente";
    let loginDescrip3 = "El usuario no está registrado en la base de datos.";

    this.authenticationService.login(dniValue, passwordValue)
      .subscribe(
        value => {
          this.tests.push({accion: loginAccion3, descripcion: loginDescrip3, flag: false});
          this.authenticationService.logout();
        },
        error => {
          this.tests.push({accion: loginAccion3, descripcion: loginDescrip3, flag: true});
          this.authenticationService.logout();
        }
      )

  }

  gestionAccionesTest() {

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJETkkiOiIxMjM0NTY3OFoifQ.A965i7M-G9NMX8FO38YTWcNxyVSleOfks7yHCL1hNp8";
    let acc_func = "{\"ACCION\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"FUNCIONALIDAD\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"ROL\":[\"ADD\",\"DELETE\",\"SHOWALL\"]}";

    localStorage.setItem('credentials', token);
    localStorage.setItem('acciones_funcionalidades', acc_func);
       localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


    //TEST PARA SHOWALL
    this.gestionAccionesService.mostrarTodas()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Acciones MostrarTodos",
            descripcion: "Listado de todas las acciones de la base de datos",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Acciones Showall",
            descripcion: "Listado de todas las acciones de la base de datos",
            flag: false
          });
        }
      )

    //TEST PARA ADD CON NOMBRE ERRONEO
    this.gestionAccionesService.addAccion("ACCION-PRUEBA", "DESCRIPCIONPRUEBA")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Acciones Add",
            descripcion: "Add fallido por introducir un nombre no permitido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Acciones Add",
            descripcion: "Add fallido por introducir un nombre no permitido",
            flag: true
          });
        }
      )

    //TEST PARA ADD CON DESCRIPCION ERRONEA
    this.gestionAccionesService.addAccion("ACCIONPRUEBA", "DESCRIPCION-PRUEBA")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Acciones Add",
            descripcion: "Add fallido por introducir una descripcion no permitida",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Acciones Add",
            descripcion: "Add fallido por introducir una descripcion no permitida",
            flag: true
          });
        }
      )

    //TEST PARA ADD Valido
    this.gestionAccionesService.addAccion("ACCIONPRUEBA", "DESCRIPCIONPRUEBA")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Acciones Add",
            descripcion: "Add valido",
            flag: true
          });
          localStorage.setItem('credentials', token);
          localStorage.setItem('acciones_funcionalidades', acc_func);
             localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

          this.gestionAccionesService.addAccion("ACCIONPRUEBA", "DESCRIPCIONPRUEBA").subscribe(
            () => {
              this.tests.push({
                accion: "Gestion Acciones Delete",
                descripcion: "Add duplicado",
                flag: false
              });
            }, error => {
              if (error.message == '4002') {

                this.tests.push({
                  accion: "Gestion Acciones Delete",
                  descripcion: "Add duplicado",
                  flag: true
                });

                localStorage.setItem('credentials', token);
                localStorage.setItem('acciones_funcionalidades', acc_func);
                   localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

                this.gestionAccionesService.deleteAccion(id).subscribe(
                  () => {
                    this.tests.push({
                      accion: "Gestion Acciones Delete",
                      descripcion: "Delete válido",
                      flag: true
                    });
                  }, () => {
                    this.tests.push({
                      accion: "Gestion Acciones Delete",
                      descripcion: "Delete válido",
                      flag: false
                    });
                  }
                )
                localStorage.removeItem('credentials');
                localStorage.removeItem('acciones_funcionalidades');
                localStorage.removeItem('profile');
              } else {
                this.tests.push({
                  accion: "Gestion Acciones Delete",
                  descripcion: "Add duplicado",
                  flag: false
                });
              }
            }
          )
          localStorage.removeItem('credentials');
          localStorage.removeItem('acciones_funcionalidades');
          localStorage.removeItem('profile');
        }, () => {
          this.tests.push({
            accion: "Gestion Acciones Add",
            descripcion: "Add valido",
            flag: false
          });
        }
      )

    //TEST PARA DELETE FALLIDO
    this.gestionAccionesService.deleteAccion("1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Acciones Delete",
            descripcion: "Delete fallido sobre una accion en uso",
            flag: false
          });
        }, error => {
          if (error.message == '4001') {
            this.tests.push({
              accion: "Gestion Acciones Delete",
              descripcion: "Delete fallido sobre una accion en uso",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Acciones Delete",
              descripcion: "Delete fallido sobre una accion en uso",
              flag: false
            });
          }

        }
      )
    localStorage.removeItem('credentials');
    localStorage.removeItem('acciones_funcionalidades');
    localStorage.removeItem('profile');

  }

  gestionRolesTest() {

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJETkkiOiIxMjM0NTY3OFoifQ.A965i7M-G9NMX8FO38YTWcNxyVSleOfks7yHCL1hNp8";
    let acc_func = "{\"ACCION\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"FUNCIONALIDAD\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"ROL\":[\"ADD\",\"DELETE\",\"SHOWALL\"]}";

    localStorage.setItem('credentials', token);
    localStorage.setItem('acciones_funcionalidades', acc_func);
       localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

    //TEST PARA SHOWALL
    this.gestionRolesService.mostrarTodos()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles Showall",
            descripcion: "Listado de todas las acciones de la base de datos",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Roles Showall",
            descripcion: "Listado de todas las acciones de la base de datos",
            flag: false
          });
        }
      )

    //TEST PARA ADD VALIDO
    this.gestionRolesService.addRol("NUEVOROL")
      .subscribe(
        result => {
          this.tests.push({
            accion: "Gestion Roles Add",
            descripcion: "Add realizado con éxito para un nuevo rol",
            flag: true
          });
          localStorage.setItem('credentials', token);
          localStorage.setItem('acciones_funcionalidades', acc_func);
             localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

          this.gestionRolesService.addRol("NUEVOROL").subscribe(
            value => {
              this.tests.push({
                accion: "Gestion Roles Add",
                descripcion: "Add duplicado",
                flag: false
              });
            },
            error1 => {
              if (error1.message == '4002') {
                this.tests.push({
                  accion: "Gestion Roles Add",
                  descripcion: "Add duplicado",
                  flag: true
                });
                //TEST PARA DELETE OK
                localStorage.setItem('credentials', token);
                localStorage.setItem('acciones_funcionalidades', acc_func);
                   localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

                this.gestionRolesService.deleteRol(result).subscribe(
                  value => {
                    this.tests.push({
                      accion: "Gestion Roles Delete",
                      descripcion: "Borrar un rol",
                      flag: true
                    });
                  },
                  error1 => {
                    this.tests.push({
                      accion: "Gestion Roles Delete",
                      descripcion: "Borrar un rol",
                      flag: false
                    });
                  }
                );
                localStorage.removeItem('credentials');
                localStorage.removeItem('acciones_funcionalidades');
                localStorage.removeItem('profile');
              } else {

                this.tests.push({
                  accion: "Gestion Roles Add",
                  descripcion: "Add duplicado",
                  flag: false
                });
              }
            }
          );
          localStorage.removeItem('credentials');
          localStorage.removeItem('acciones_funcionalidades');
          localStorage.removeItem('profile');


        }, () => {
          this.tests.push({
            accion: "Gestion Roles Add",
            descripcion: "Add realizado con éxito para un nuevo rol",
            flag: false

          });
        }
      )

    //TEST PARA ADD CON NOMBRE INCORRECTO
    this.gestionRolesService.addRol("NUEVOROL1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles Add",
            descripcion: "Add fallido por introducir caracteres numéricos",

            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Roles Add",
            descripcion: "Add fallido por introducir caracteres numéricos",
            flag: true
          });
        }
      )


    //TEST PARA DELETE FALLIDO
    this.gestionRolesService.deleteRol("1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles Delete",
            descripcion: "Delete fallido sobre un rol en uso",
            flag: false
          });
        }, error => {
          if (error.message == '4001') {
            this.tests.push({
              accion: "Gestion Roles Delete",
              descripcion: "Delete fallido sobre un rol en uso",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Roles Delete",
              descripcion: "Delete fallido sobre un rol en uso",
              flag: false
            });
          }
        }
      )


    localStorage.removeItem('credentials');
    localStorage.removeItem('acciones_funcionalidades');
    localStorage.removeItem('profile');


  }

  gestionFuncionalidadesTest() {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJETkkiOiIxMjM0NTY3OFoifQ.A965i7M-G9NMX8FO38YTWcNxyVSleOfks7yHCL1hNp8";
    let acc_func = "{\"ACCION\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"FUNCIONALIDAD\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"ROL\":[\"ADD\",\"DELETE\",\"SHOWALL\"]}";

    localStorage.setItem('credentials', token);
    localStorage.setItem('acciones_funcionalidades', acc_func);
       localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


    //TEST PARA SHOWALL
    this.gestionFuncionalidadesService.mostrarTodas()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Showall",
            descripcion: "Listado de todas las funcionalidades de la base de datos",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Showall",
            descripcion: "Listado de todas las funcionalidades de la base de datos",
            flag: false
          });
        }
      )

    //TEST PARA ADD CON NOMBRE ERRONEO
    this.gestionFuncionalidadesService.addFuncionalidad("ACCION-PRUEBA", "DESCRIPCIONPRUEBA")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Add",
            descripcion: "Add fallido por introducir un nombre no permitido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Add",
            descripcion: "Add fallido por introducir un nombre no permitido",
            flag: true
          });
        }
      )

    //TEST PARA ADD CON DESCRIPCION ERRONEA
    this.gestionFuncionalidadesService.addFuncionalidad("ACCIONPRUEBA", "DESCRIPCION-PRUEBA")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Add",
            descripcion: "Add fallido por introducir una descripcion no permitida",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Add",
            descripcion: "Add fallido por introducir una descripcion no permitida",
            flag: true
          });
        }
      )

    //TEST PARA ADD Valido
    this.gestionFuncionalidadesService.addFuncionalidad("ACCIONPRUEBA", "DESCRIPCIONPRUEBA")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Funcionalidades Add",
            descripcion: "Add valido",
            flag: true
          });
          localStorage.setItem('credentials', token);
          localStorage.setItem('acciones_funcionalidades', acc_func);
             localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

          this.gestionFuncionalidadesService.addFuncionalidad("ACCIONPRUEBA", "DESCRIPCIONPRUEBA").subscribe(
            () => {
              this.tests.push({
                accion: "Gestion Funcionalidades Add",
                descripcion: "Add duplicado",
                flag: false
              });
            }, error => {
              if (error.message == '4002') {
                this.tests.push({
                  accion: "Gestion Funcionalidades Add",
                  descripcion: "Add duplicado",
                  flag: true
                });
                localStorage.setItem('credentials', token);
                localStorage.setItem('acciones_funcionalidades', acc_func);
                   localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

                this.gestionFuncionalidadesService.deleteFuncionalidad(id).subscribe(
                  () => {
                    this.tests.push({
                      accion: "Gestion Funcionalidades Delete",
                      descripcion: "Delete válido",
                      flag: true
                    });
                  }, () => {
                    this.tests.push({
                      accion: "Gestion Funcionalidades Delete",
                      descripcion: "Delete válido",
                      flag: false
                    });
                  }
                )
                localStorage.removeItem('credentials');
                localStorage.removeItem('acciones_funcionalidades');
                localStorage.removeItem('profile');
              } else {
                this.tests.push({
                  accion: "Gestion Funcionalidades Add",
                  descripcion: "Add duplicado",
                  flag: false
                });
              }

            }
          )
          localStorage.removeItem('credentials');
          localStorage.removeItem('acciones_funcionalidades');
          localStorage.removeItem('profile');
        }, () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Add",
            descripcion: "Add valido",
            flag: false
          });
        }
      )

    //TEST PARA DELETE FALLIDO
    this.gestionFuncionalidadesService.deleteFuncionalidad("1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Delete",
            descripcion: "Delete fallido sobre una funcionalidad en uso",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Funcionalidades Delete",
            descripcion: "Delete fallido sobre una funcionalidad en uso",
            flag: true
          });
        }
      )

    localStorage.removeItem('credentials');
    localStorage.removeItem('acciones_funcionalidades');
    localStorage.removeItem('profile');
  }

  gestionUsuariosTest() {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJETkkiOiIxMjM0NTY3OFoifQ.A965i7M-G9NMX8FO38YTWcNxyVSleOfks7yHCL1hNp8";
    let acc_func = "{\"ACCION\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"FUNCIONALIDAD\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"ROL\":[\"ADD\",\"DELETE\",\"SHOWALL\"]}";

    localStorage.setItem('credentials', token);
    localStorage.setItem('acciones_funcionalidades', acc_func);
       localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


    //TEST PARA ADD Valido
    this.gestionUsauriosService.addUsuario("35577002G", "nombre", "apellidos", "jpsilva17@esei.uvigo.es", "aaaaaaa")
      .subscribe(
        (dni) => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add valido",
            flag: true
          });

          localStorage.setItem('credentials', token);
          localStorage.setItem('acciones_funcionalidades', acc_func);
             localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

          this.gestionUsauriosService.addUsuario("35577002G", "nuevo", "usuario", "imblanco18@esei.uvigo.es", "P4ssword")
            .subscribe(
              () => {
                this.tests.push({
                  accion: "Gestion Usuarios Add",
                  descripcion: "Add fallido por introducir un DNI repetido",
                  flag: false
                });
              }, error => {
                if (error.message == '4002') {
                  this.tests.push({
                    accion: "Gestion Usuarios Add",
                    descripcion: "Add fallido por introducir un DNI repetido",
                    flag: true
                  });


                  localStorage.setItem('credentials', token);
                  localStorage.setItem('acciones_funcionalidades', acc_func);
                     localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

                  //TEST PARA ADD CON EMAIL REPETIDO
                  this.gestionUsauriosService.addUsuario("18171619D", "nuevo", "usuario", "jpsilva17@esei.uvigo.es", "P4ssword")
                    .subscribe(
                      () => {
                        this.tests.push({
                          accion: "Gestion Usuarios Add",
                          descripcion: "Add fallido por introducir un email repetido",
                          flag: false
                        });
                      }, error => {
                        if (error.message == '4002') {
                          this.tests.push({
                            accion: "Gestion Usuarios Add",
                            descripcion: "Add fallido por introducir un email repetido",
                            flag: true
                          });


                          localStorage.setItem('credentials', token);
                          localStorage.setItem('acciones_funcionalidades', acc_func);
                             localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

                          //TEST PARA EDIT Valido
                          this.gestionUsauriosService.editUsuario(dni, "nombre", "apellidos", "jpsilva17@esei.uvigo.es","password")
                            .subscribe(
                              () => {
                                this.tests.push({
                                  accion: "Gestion Usuarios Edit",
                                  descripcion: "Edit fallido por no realizar cambios",
                                  flag: false
                                });
                              }, error => {

                                if (error.message == '4005') {

                                  localStorage.setItem('credentials', token);
                                  localStorage.setItem('acciones_funcionalidades', acc_func);
                                     localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

                                  this.gestionUsauriosService.editUsuario(dni, "nombre", "nombre", "jpsilva17@esei.uvigo.es","12345678Z")
                                    .subscribe(
                                      () => {
                                        this.tests.push({
                                          accion: "Gestion Usuarios Edit",
                                          descripcion: "Edit valido",
                                          flag: true
                                        });

                                        localStorage.setItem('credentials', token);
                                        localStorage.setItem('acciones_funcionalidades', acc_func);
                                           localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");

                                        this.gestionUsauriosService.deleteUsuario(dni).subscribe(
                                          () => {
                                            this.tests.push({
                                              accion: "Gestion Usuarios Delete",
                                              descripcion: "Delete válido",
                                              flag: true
                                            });
                                          }, () => {
                                            this.tests.push({
                                              accion: "Gestion Usuarios Delete",
                                              descripcion: "Delete válido",
                                              flag: false
                                            });
                                          }
                                        )
                                        localStorage.removeItem('credentials');
                                        localStorage.removeItem('acciones_funcionalidades');
                                        localStorage.removeItem('profile');

                                      }, () => {
                                        this.tests.push({
                                          accion: "Gestion Usuarios Edit",
                                          descripcion: "Edit valido",
                                          flag: false
                                        });
                                      }
                                    )
                                  localStorage.removeItem('credentials');
                                  localStorage.removeItem('acciones_funcionalidades');
                                  localStorage.removeItem('profile');

                                } else {
                                  this.tests.push({
                                    accion: "Gestion Usuarios Edit",
                                    descripcion: "Edit fallido por no realizar cambios",
                                    flag: false
                                  });
                                }
                                this.tests.push({
                                  accion: "Gestion Usuarios Edit",
                                  descripcion: "Edit fallido por no realizar cambios",
                                  flag: true
                                });

                              }
                            )
                          localStorage.removeItem('credentials');
                          localStorage.removeItem('acciones_funcionalidades');
                          localStorage.removeItem('profile');


                        } else {
                          this.tests.push({
                            accion: "Gestion Usuarios Add",
                            descripcion: "Add fallido por introducir un email repetido",
                            flag: false
                          });
                        }
                      }
                    )
                  localStorage.removeItem('credentials');
                  localStorage.removeItem('acciones_funcionalidades');
                  localStorage.removeItem('profile');

                } else {
                  this.tests.push({
                    accion: "Gestion Usuarios Add",
                    descripcion: "Add fallido por introducir un DNI repetido",
                    flag: false
                  });
                }


              }
            )
          localStorage.removeItem('credentials');
          localStorage.removeItem('acciones_funcionalidades');
          localStorage.removeItem('profile');


        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add valido",
            flag: false
          });
        }
      )

    //TEST PARA SHOWALL
    this.gestionUsauriosService.mostrarTodos()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Showall",
            descripcion: "Listado de todos los usuarios de la base de datos",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Showall",
            descripcion: "Listado de todos los usuarios de la base de datos",
            flag: false
          });
        }
      )


    //TEST PARA ADD CON DNI ERRONEO
    this.gestionUsauriosService.addUsuario("11111111P", "nombre", "apellidos", "jpsilva17@esei.uvigo.es", "P4ssword")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir un DNI no permitido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir un DNI no permitido",
            flag: true
          });
        }
      )

    //TEST PARA ADD CON NOMBRE ERRONEO
    this.gestionUsauriosService.addUsuario("49705920E", "nombre12 con espacios", "apellidos", "jpsilva17@esei.uvigo.es", "P4ssword")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir un nombre no permitido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir un nombre no permitido",
            flag: true
          });
        }
      )

    //TEST PARA ADD CON APELLIDOS ERRONEOS
    this.gestionUsauriosService.addUsuario("49705920E", "nombre", "4pellidos!!!", "jpsilva17@esei.uvigo.es", "P4ssword")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir apellidos no permitidos",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir apellidos no permitidos",
            flag: true
          });
        }
      )

    //TEST PARA ADD CON EMAIL ERRONEO
    this.gestionUsauriosService.addUsuario("49705920E", "nombre", "apellidos", "email_mal_escrito.fail", "P4ssword")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir un email no permitido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir un email no permitido",
            flag: true
          });
        }
      )

    //TEST PARA ADD CON CONTRASEÑA ERRONEA
    this.gestionUsauriosService.addUsuario("49705920E", "nombre", "apellidos", "jpsilva17@esei.uvigo.es", "0")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir una contraseña no permitida",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Add",
            descripcion: "Add fallido por introducir una contraseña no permitida",
            flag: true
          });
        }
      )


    //TEST PARA EDIT CON DNI ERRONEO
    this.gestionUsauriosService.editUsuario("11111111P", "nombre", "apellidos", "jpsilva17@esei.uvigo.es","password")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Edit",
            descripcion: "Edit fallido por introducir un DNI no permitido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Edit",
            descripcion: "Edit fallido por introducir un DNI no permitido",
            flag: true
          });
        }
      )

    //TEST PARA EDIT CON APELLIDOS ERRONEOS
    this.gestionUsauriosService.editUsuario("49705920E", "nombre", "4pellidos!!!", "jpsilva17@esei.uvigo.es","password")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Edit",
            descripcion: "Edit fallido por introducir apellidos no permitidos",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Edit",
            descripcion: "Edit fallido por introducir apellidos no permitidos",
            flag: true
          });
        }
      )

    //TEST PARA EDIT CON EMAIL ERRONEO
    this.gestionUsauriosService.editUsuario("49705920E", "nombre", "apellidos", "email_mal_escrito.fail","password")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuarios Edit",
            descripcion: "Edit fallido por introducir un email no permitido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Usuarios Edit",
            descripcion: "Edit fallido por introducir un email no permitido",
            flag: true
          });
        }
      )


    //TEST PARA DELETE FALLIDO
    this.gestionUsauriosService.deleteUsuario("06262445M")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Usuaurios Delete",
            descripcion: "Delete fallido sobre un usuario no existente",
            flag: false
          });
        }, error => {
          if (error.message == '4005') {
            this.tests.push({
              accion: "Gestion Usuarios Delete",
              descripcion: "Delete fallido sobre un usuario no existente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Usuaurios Delete",
              descripcion: "Delete fallido sobre un usuario no existente",
              flag: false
            });
          }
        }
      )

    localStorage.removeItem('credentials');
    localStorage.removeItem('acciones_funcionalidades');
    localStorage.removeItem('profile');
  }

  gestionDepartamentosTest() {

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJETkkiOiIxMjM0NTY3OFoifQ.A965i7M-G9NMX8FO38YTWcNxyVSleOfks7yHCL1hNp8";
    let acc_func = "{\"ACCION\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"FUNCIONALIDAD\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"ROL\":[\"ADD\",\"DELETE\",\"SHOWALL\"]}";

    localStorage.setItem('credentials', token);
    localStorage.setItem('acciones_funcionalidades', acc_func);
       localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


    this.gestionDepartamentosService.addDepartamento("Departamento de Lenguajes", "D00x00", "1").subscribe(
      (id) => {
        this.tests.push({
          accion: "Gestion Departamentos Add",
          descripcion: "Departamento añadido correctamente",
          flag: true
        });

        localStorage.setItem('credentials', token);
        localStorage.setItem('acciones_funcionalidades', acc_func);
           localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


        this.gestionDepartamentosService.addDepartamento("Departamento de Lenguajes", "D00x00", "1").subscribe(
          () => {
            this.tests.push({
              accion: "Gestion Departamentos Add",
              descripcion: "Add duplicado",
              flag: false
            });

          }, error => {
            if (error.message == '4002') {
              this.tests.push({
                accion: "Gestion Departamentos Add",
                descripcion: "Add duplicado",
                flag: true
              });

              localStorage.setItem('credentials', token);
              localStorage.setItem('acciones_funcionalidades', acc_func);
                 localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


              this.gestionDepartamentosService.addDepartamento("Departamento de Lenguajes II", "D00x77", "1").subscribe(
                (id2) => {

                  localStorage.setItem('credentials', token);
                  localStorage.setItem('acciones_funcionalidades', acc_func);
                     localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


                  this.gestionDepartamentosService.editDepartamento(id2, "Departamento de Lenguajes", "D00x00", "1").subscribe(
                    () => {
                      this.tests.push({
                        accion: "Gestion Departamentos Edit",
                        descripcion: "Edit duplicado",
                        flag: false
                      });

                    }, error => {
                      if (error.message == '4002') {
                        this.tests.push({
                          accion: "Gestion Departamentos Edit",
                          descripcion: "Edit duplicado",
                          flag: true
                        });

                        localStorage.setItem('credentials', token);
                        localStorage.setItem('acciones_funcionalidades', acc_func);
                           localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


                        this.gestionDepartamentosService.deleteDepartamento(id2).subscribe()

                        localStorage.removeItem('credentials');
                        localStorage.removeItem('acciones_funcionalidades');
                        localStorage.removeItem('profile');

                      } else {
                        this.tests.push({
                          accion: "Gestion Departamentos Edit",
                          descripcion: "Edit duplicado",
                          flag: false
                        });
                      }
                    }
                  )
                  localStorage.removeItem('credentials');
                  localStorage.removeItem('acciones_funcionalidades');
                  localStorage.removeItem('profile');
                }
              )
              localStorage.removeItem('credentials');
              localStorage.removeItem('acciones_funcionalidades');
              localStorage.removeItem('profile');

            } else {
              this.tests.push({
                accion: "Gestion Departamentos Add",
                descripcion: "Add duplicado",
                flag: false
              });
            }
          }
        )
        localStorage.removeItem('credentials');
        localStorage.removeItem('acciones_funcionalidades');
        localStorage.removeItem('profile');


        localStorage.setItem('credentials', token);
        localStorage.setItem('acciones_funcionalidades', acc_func);
           localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


        this.gestionDepartamentosService.editDepartamento(id, "Departamento de Lenguajes", "D00x02", "1").subscribe(
          () => {
            this.tests.push({
              accion: "Gestion Departamentos Edit",
              descripcion: "Departamento editado correctamente",
              flag: true
            });

            localStorage.setItem('credentials', token);
            localStorage.setItem('acciones_funcionalidades', acc_func);
               localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


            this.gestionDepartamentosService.editDepartamento(id, "Departamento de Lenguajes", "D00x02", "1").subscribe(
              () => {
                this.tests.push({
                  accion: "Gestion Departamentos Edit",
                  descripcion: "No se puede editar el departamento porque no se han realizado cambios",
                  flag: false
                });

              }, error => {
                if (error.message == '4004') {
                  this.tests.push({
                    accion: "Gestion Departamentos Edit",
                    descripcion: "No se puede editar el departamento porque no se han realizado cambios",
                    flag: true
                  });

                  localStorage.setItem('credentials', token);
                  localStorage.setItem('acciones_funcionalidades', acc_func);
                     localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


                  this.gestionDepartamentosService.show(id).subscribe(
                    () => {
                      this.tests.push({
                        accion: "Gestion Departamentos Show",
                        descripcion: "Centro mostrado correctamente",
                        flag: true
                      });
                      localStorage.setItem('credentials', token);
                      localStorage.setItem('acciones_funcionalidades', acc_func);
                         localStorage.setItem('profile', "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}");


                      this.gestionDepartamentosService.deleteDepartamento(id).subscribe(
                        () => {
                          this.tests.push({
                            accion: "Gestion Departamentos Delete",
                            descripcion: "Departamento eliminado correctamente",
                            flag: true
                          });

                        }, () => {
                          this.tests.push({
                            accion: "Gestion Departamentos Delete",
                            descripcion: "Departamento eliminado correctamente",
                            flag: false
                          });
                        }
                      )
                      localStorage.removeItem('credentials');
                      localStorage.removeItem('acciones_funcionalidades');
                      localStorage.removeItem('profile');
                    }, () => {
                      this.tests.push({
                        accion: "Gestion Departamentos Show",
                        descripcion: "Centro mostrado correctamente",
                        flag: false
                      });
                    }
                  )
                  localStorage.removeItem('credentials');
                  localStorage.removeItem('acciones_funcionalidades');
                  localStorage.removeItem('profile');


                } else {
                  this.tests.push({
                    accion: "Gestion Departamentos Edit",
                    descripcion: "No se puede editar el departamento porque no se han realizado cambios",
                    flag: false
                  });
                }


              }
            )
            localStorage.removeItem('credentials');
            localStorage.removeItem('acciones_funcionalidades');
            localStorage.removeItem('profile');

          }, () => {
            this.tests.push({
              accion: "Gestion Departamentos Edit",
              descripcion: "Departamento editado correctamente",
              flag: false
            });
          }
        )
        localStorage.removeItem('credentials');
        localStorage.removeItem('acciones_funcionalidades');
        localStorage.removeItem('profile');
      }, () => {
        this.tests.push({
          accion: "Gestion Departamentos Add",
          descripcion: "Departamento añadido correctamente",
          flag: false
        });

      }
    )


    this.gestionDepartamentosService.deleteDepartamento("11111").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Departamentos Delete",
          descripcion: "No se puede eliminar el departamento porque no existe",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Departamentos Delete",
          descripcion: "No se puede eliminar el departamento porque no existe",
          flag: true
        });
      }
    )

    this.gestionDepartamentosService.addDepartamento("Departamento de Informatica", "D00x01", "11111").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Departamentos Add",
          descripcion: "No se puede añadir el departamento porque no existe la universidad introducida",
          flag: false
        });

      }, error => {
        if (error.message == '4004') {
          this.tests.push({
            accion: "Gestion Departamentos Add",
            descripcion: "No se puede añadir el departamento porque no existe la universidad introducida",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Departamentos Add",
            descripcion: "No se puede añadir el departamento porque no existe la universidad introducida",
            flag: false
          });
        }

      }
    )

    this.gestionDepartamentosService.addDepartamento("111", "D00x01", "11111").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Departamentos Add",
          descripcion: "No se puede añadir el departamento porque el nombre introducido contiene errores",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Departamentos Add",
          descripcion: "No se puede añadir el departamento porque el nombre introducido contiene errores",
          flag: true
        });
      }
    )

    this.gestionDepartamentosService.editDepartamento("11111", "Departamento de Informatica", "D00x01", "1").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Departamentos Edit",
          descripcion: "No se puede editar el departamento porque no existe",
          flag: false
        });

      }, error => {
        if (error.message == '4004') {
          this.tests.push({
            accion: "Gestion Departamentos Edit",
            descripcion: "No se puede editar el departamento porque no existe",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Departamentos Edit",
            descripcion: "No se puede editar el departamento porque no existe",
            flag: false
          });
        }
      }
    )

    this.gestionDepartamentosService.editDepartamento("11111", "Departamento de Informatica", "D00x01", "11111").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Departamentos Edit",
          descripcion: "No se puede editar el departamento porque no existe la universidad introducida",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Departamentos Edit",
          descripcion: "No se puede editar el departamento porque no existe la universidad introducida",
          flag: true
        });
      }
    )

    this.gestionDepartamentosService.editDepartamento("11111", "111", "111", "11111").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Departamentos Edit",
          descripcion: "No se puede editar el departamento porque el nombre introducido contiene numeros",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Departamentos Edit",
          descripcion: "No se puede editar el departamento porque el nombre introducido contiene numeros",
          flag: true
        });
      }
    )


    this.gestionDepartamentosService.editDepartamento("11111", "Departamento de Informatica", "D00D00", "11111").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Departamentos Edit",
          descripcion: "No se puede editar el departamento porque el codigo introducido no tiene el formato correcto",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Departamentos Edit",
          descripcion: "No se puede editar el departamento porque el codigo introducido no tiene el formato correcto",
          flag: true
        });
      }
    )

    this.gestionDepartamentosService.mostrarTodos().subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Departamentos Showall",
          descripcion: "Se muestran todos los departamentos introducidos en la base de datos",
          flag: true
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Departamentos Showall",
          descripcion: "Se muestran todos los departamentos introducidos en la base de datos",
          flag: false
        });
      }
    )

    localStorage.removeItem('credentials');
    localStorage.removeItem('acciones_funcionalidades');
    localStorage.removeItem('profile');
  }

  gestionTitulacionesTest() {
    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.addTitulacion("Grao Add I", "A00D000D00", "12345678Z", "1", "20202021")
      .subscribe(
        id_titulacion => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add correcto",
            flag: true
          });

          TestComponent.initFakeCredentials();
          this.gestionTitulacionesService.addTitulacion("Grao Add I", "A00D000D00", "12345678Z", "1", "20202021")
            .subscribe(
              () => {
                this.tests.push({
                  accion: "Gestion Titulaciones Add",
                  descripcion: "Add duplicado",
                  flag: false
                });

              }, error => {
                if (error.message == '4002') {

                  this.tests.push({
                    accion: "Gestion Titulaciones Add",
                    descripcion: "Add duplicado",
                    flag: true
                  });
                  TestComponent.initFakeCredentials();
                  this.gestionTitulacionesService.editTitulaciones(id_titulacion, "Grao Add I", "A00D001D00", "12345678Z", "1", "20202021")
                    .subscribe(
                      () => {
                        this.tests.push({
                          accion: "Gestion Titulaciones Edit",
                          descripcion: "Edit correcto",
                          flag: true
                        });

                        TestComponent.initFakeCredentials();
                        this.gestionTitulacionesService.show(id_titulacion)
                          .subscribe(
                            () => {
                              this.tests.push({
                                accion: "Gestion Titulaciones Show",
                                descripcion: "Show correcto",
                                flag: true
                              });
                              TestComponent.initFakeCredentials();
                              this.gestionTitulacionesService.deleteTitulacion(id_titulacion)
                                .subscribe(
                                  () => {
                                    this.tests.push({
                                      accion: "Gestion Titulaciones Delete",
                                      descripcion: "Delete correcto",
                                      flag: true
                                    });

                                  }, error => {
                                    this.tests.push({
                                      accion: "Gestion Titulaciones Delete",
                                      descripcion: "Delete correcto",
                                      flag: false
                                    });
                                  }
                                )
                              TestComponent.removeFakeCredentials();

                            }, error => {
                              this.tests.push({
                                accion: "Gestion Titulaciones Show",
                                descripcion: "Show correcto",
                                flag: false
                              });
                            }
                          )
                        TestComponent.removeFakeCredentials();

                      }, error => {
                        this.tests.push({
                          accion: "Gestion Titulaciones Edit",
                          descripcion: "Edit correcto",
                          flag: false
                        });
                      }
                    )
                  TestComponent.removeFakeCredentials();
                } else {
                  this.tests.push({
                    accion: "Gestion Titulaciones Add",
                    descripcion: "Add duplicado",
                    flag: false
                  });
                }
              }
            )
          TestComponent.removeFakeCredentials();

        }, error => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add correcto",
            flag: false
          });
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.deleteTitulacion("99999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Titulaciones Delete",
            descripcion: "Delete incorrecto porque no existe la titulacion",
            flag: false
          });

        }, error => {
          if (error.message == '4005') {
            this.tests.push({
              accion: "Gestion Titulaciones Delete",
              descripcion: "Delete incorrecto porque no existe la titulacion",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Titulaciones Delete",
              descripcion: "Delete incorrecto porque no existe la titulacion",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.show("99999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Titulaciones Show",
            descripcion: "Show incorrecto porque no existe la titulacion",
            flag: false
          });

        }, error => {
          if (error.message == '4005') {
            this.tests.push({
              accion: "Gestion Titulaciones Show",
              descripcion: "Show incorrecto porque no existe la titulacion",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Titulaciones Show",
              descripcion: "Show incorrecto porque no existe la titulacion",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.mostrarTodas()
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Titulaciones Showall",
            descripcion: "Showall correcto",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Titulaciones Showall",
            descripcion: "Showall correcto",
            flag: false
          });
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.addTitulacion("Grao Add 1", "A00D000D01", "12345678Z", "1", "20202021")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir nombre invalido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir nombre invalido",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.addTitulacion("Grao Add II", "A00D00D01", "12345678Z", "1", "20202021")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir codigo invalido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir codigo invalido",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.addTitulacion("Grao Add II", "A00D000D01", "12345678", "1", "20202021")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir DNI invalido",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir DNI invalido",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.addTitulacion("Grao Add II", "A00D000D01", "22521567J", "1", "20202021")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir DNI inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Titulaciones Add",
              descripcion: "Add incorrecto por introducir DNI inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Titulaciones Add",
              descripcion: "Add incorrecto por introducir DNI inexistente",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials();


    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.addTitulacion("Grao Add II", "A00D000D01", "12345678Z", "1344", "20202021")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir centro inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Titulaciones Add",
              descripcion: "Add incorrecto por introducir centro inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Titulaciones Add",
              descripcion: "Add incorrecto por introducir centro inexistente",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.addTitulacion("Grao Add II", "A00D000D01", "12345678Z", "1", "20202022")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Titulaciones Add",
            descripcion: "Add incorrecto por introducir año inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Titulaciones Add",
              descripcion: "Add incorrecto por introducir año inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Titulaciones Add",
              descripcion: "Add incorrecto por introducir año inexistente",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials();


    TestComponent.initFakeCredentials();
    this.gestionTitulacionesService.addTitulacion("Grao Add III", "A00D000D02", "12345678Z", "1", "20202021")
      .subscribe(
        id_III => {
          TestComponent.initFakeCredentials();
          this.gestionTitulacionesService.addTitulacion("Grao Add IIII", "A00D000D03", "12345678Z", "1", "20202021")
            .subscribe(
              id_IIII => {

                TestComponent.initFakeCredentials();
                this.gestionTitulacionesService.editTitulaciones(id_IIII, "Grao Add 4", "A00D000D03", "12345678Z", "1", "20202021")
                  .subscribe(
                    () => {
                      this.tests.push({
                        accion: "Gestion Titulaciones Edit",
                        descripcion: "Edit incorrecto por introducir nombre invalido",
                        flag: false
                      });
                    }, () => {
                      this.tests.push({
                        accion: "Gestion Titulaciones Edit",
                        descripcion: "Edit incorrecto por introducir nombre invalido",
                        flag: true
                      });

                      //CAMBIO D03 A D02 => ERROR
                      TestComponent.initFakeCredentials();
                      this.gestionTitulacionesService.editTitulaciones(id_IIII, "Grao Add IIII", "A00D000D02", "12345678Z", "1", "20202021")
                        .subscribe(
                          () => {
                            this.tests.push({
                              accion: "Gestion Titulaciones Edit",
                              descripcion: "Edit incorrecto por introducir codigo ya existente",
                              flag: false
                            });
                          }, error => {
                            if (error.message == '4002') {
                              this.tests.push({
                                accion: "Gestion Titulaciones Edit",
                                descripcion: "Edit incorrecto por introducir codigo ya existente",
                                flag: true
                              });
                              TestComponent.initFakeCredentials();
                              this.gestionTitulacionesService.editTitulaciones(id_IIII, "Grao Add IIII", "A00D00D02", "12345678Z", "1", "20202021")
                                .subscribe(
                                  () => {
                                    this.tests.push({
                                      accion: "Gestion Titulaciones Edit",
                                      descripcion: "Edit incorrecto por introducir codigo incorrecto",
                                      flag: false
                                    });
                                  }, () => {
                                    this.tests.push({
                                      accion: "Gestion Titulaciones Edit",
                                      descripcion: "Edit incorrecto por introducir codigo incorrecto",
                                      flag: true
                                    });

                                    TestComponent.initFakeCredentials();
                                    //Se cambia el codigo para que pueda saltar el error del DNI
                                    this.gestionTitulacionesService.editTitulaciones(id_IIII, "Grao Add IIII", "A00D001D02", "22521567J", "1", "20202021").subscribe(
                                      () => {
                                        this.tests.push({
                                          accion: "Gestion Titulaciones Edit",
                                          descripcion: "Edit incorrecto por introducir DNI no existente",
                                          flag: false
                                        });
                                      }, error => {
                                        if (error.message == '4004') {
                                          this.tests.push({
                                            accion: "Gestion Titulaciones Edit",
                                            descripcion: "Edit incorrecto por introducir DNI no existente",
                                            flag: true
                                          });
                                          TestComponent.initFakeCredentials();
                                          //Se cambia el codigo para que pueda saltar el error del DNI
                                          this.gestionTitulacionesService.editTitulaciones(id_IIII, "Grao Add IIII", "A00D001D02", "22521567J", "1", "20202021")
                                            .subscribe(
                                              () => {
                                                this.tests.push({
                                                  accion: "Gestion Titulaciones Edit",
                                                  descripcion: "Edit incorrecto por introducir DNI incorrecto",
                                                  flag: false
                                                });
                                              }, () => {
                                                this.tests.push({
                                                  accion: "Gestion Titulaciones Edit",
                                                  descripcion: "Edit incorrecto por introducir DNI incorrecto",
                                                  flag: true
                                                });
                                                TestComponent.initFakeCredentials();
                                                this.gestionTitulacionesService.deleteTitulacion(id_IIII)
                                                  .subscribe(() => {
                                                    TestComponent.initFakeCredentials();
                                                    this.gestionTitulacionesService.deleteTitulacion(id_III)
                                                      .subscribe()
                                                    TestComponent.removeFakeCredentials();
                                                  })
                                                TestComponent.removeFakeCredentials();
                                              }
                                            )
                                          TestComponent.removeFakeCredentials();
                                        } else {
                                          this.tests.push({
                                            accion: "Gestion Titulaciones Edit",
                                            descripcion: "Edit incorrecto por introducir DNI no existente",
                                            flag: false
                                          });
                                        }
                                      }
                                    )
                                    TestComponent.removeFakeCredentials();
                                  })
                            } else {
                              this.tests.push({
                                accion: "Gestion Titulaciones Edit",
                                descripcion: "Edit incorrecto por introducir codigo ya existente",
                                flag: false
                              });
                            }

                          })
                      TestComponent.removeFakeCredentials();
                    })
                TestComponent.removeFakeCredentials();
              })
          TestComponent.removeFakeCredentials();
        })
    TestComponent.removeFakeCredentials();
  }

  gestionAsignaturasTest() {
    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add I", "6", "Asignatura Add I",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00000", "12345678Z"
    ).subscribe(
      (id_asignatura_I) => {
        this.tests.push({
          accion: "Gestion Asignaturas Add",
          descripcion: "Add correcto.",
          flag: true
        });
        TestComponent.initFakeCredentials();
        this.gestionGruposService.addGrupo("Grupo Add Asignatura I", "A00d99", "GA", "1", "20202021", "1", id_asignatura_I)
          .subscribe(id_grupo_asignatura_I => {
            TestComponent.initFakeCredentials();
            this.gestionAsignaturasService.addAsignatura("Asignatura Add I Duplicada", "6", "Asignatura Add I",
              "OB", "100", "1", "1", "20202021", "1",
              "A00D000D00000", "12345678Z"
            ).subscribe(
              () => {
                this.tests.push({
                  accion: "Gestion Asignaturas Add",
                  descripcion: "Add duplicado.",
                  flag: false
                });

              }, () => {
                this.tests.push({
                  accion: "Gestion Asignaturas Add",
                  descripcion: "Add duplicado.",
                  flag: true
                });
                TestComponent.initFakeCredentials();
                //Se edita el CODIGO de la asignatura
                this.gestionAsignaturasService.editAsignatura(id_asignatura_I, "Asignatura Add I", "6", "Asignatura Add I",
                  "OB", "100", "1", "1", "20202021", "1",
                  "12345678Z", "A00D001D00000"
                ).subscribe(
                  () => {
                    this.tests.push({
                      accion: "Gestion Asignaturas Edit",
                      descripcion: "Edit correcto.",
                      flag: true
                    });
                    TestComponent.initFakeCredentials();
                    this.gestionAsignaturasService.show(id_asignatura_I).subscribe(
                      () => {
                        this.tests.push({
                          accion: "Gestion Asignaturas Show",
                          descripcion: "Show correcto.",
                          flag: true
                        });
                        TestComponent.initFakeCredentials();
                        this.gestionAsignaturasService.deleteAsignatura(id_asignatura_I).subscribe(
                          () => {
                            this.tests.push({
                              accion: "Gestion Asignaturas Delete",
                              descripcion: "Delete incorrecto porque la asignatura está en uso.",
                              flag: false
                            });
                          }, error => {
                            if (error.message == '4001') {
                              this.tests.push({
                                accion: "Gestion Asignaturas Delete",
                                descripcion: "Delete incorrecto porque la asignatura está en uso.",
                                flag: true
                              });
                              TestComponent.initFakeCredentials();
                              this.gestionGruposService.deleteGrupo(id_grupo_asignatura_I)
                                .subscribe(() => {
                                  TestComponent.initFakeCredentials();
                                  this.gestionAsignaturasService.deleteAsignatura(id_asignatura_I).subscribe(
                                    () => {
                                      this.tests.push({
                                        accion: "Gestion Asignaturas Delete",
                                        descripcion: "Delete correcto",
                                        flag: true
                                      });
                                    }, error => {
                                      this.tests.push({
                                        accion: "Gestion Asignaturas Delete",
                                        descripcion: "Delete correcto",
                                        flag: false
                                      });
                                    }
                                  )
                                  TestComponent.removeFakeCredentials();
                                })
                              TestComponent.removeFakeCredentials();
                            } else {
                              this.tests.push({
                                accion: "Gestion Asignaturas Delete",
                                descripcion: "Delete incorrecto porque la asignatura está en uso.",
                                flag: false
                              });
                            }
                          }
                        )
                        TestComponent.removeFakeCredentials();
                      }, () => {
                        this.tests.push({
                          accion: "Gestion Asignaturas Show",
                          descripcion: "Show correcto.",
                          flag: false
                        });
                      }
                    )
                    TestComponent.removeFakeCredentials();
                  }, () => {
                    this.tests.push({
                      accion: "Gestion Asignaturas Edit",
                      descripcion: "Edit correcto.",
                      flag: false
                    });
                  }
                )
                TestComponent.removeFakeCredentials();
              }
            )
            TestComponent.removeFakeCredentials();
          })
        TestComponent.removeFakeCredentials();

      }, () => {
        this.tests.push({
          accion: "Gestion Asignaturas Add",
          descripcion: "Add correcto.",
          flag: false
        });
      }
    )
    TestComponent.removeFakeCredentials();
    //===========>6


    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.deleteAsignatura("12312")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Delete",
            descripcion: "Delete incorrecto porque no existe la asignatura.",
            flag: false
          });
        }, error => {
          if (error.message == '4005') {
            this.tests.push({
              accion: "Gestion Asignaturas Delete",
              descripcion: "Delete incorrecto porque no existe la asignatura.",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Asignaturas Delete",
              descripcion: "Delete incorrecto porque no existe la asignatura.",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials()


    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.show("12312")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Show",
            descripcion: "Show incorrecto porque no existe la asignatura.",
            flag: false
          });
        }, error => {
          if (error.message == '4005') {
            this.tests.push({
              accion: "Gestion Asignaturas Show",
              descripcion: "Show incorrecto porque no existe la asignatura.",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Asignaturas Show",
              descripcion: "Show incorrecto porque no existe la asignatura.",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.mostrarTodas()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Showall",
            descripcion: "Showall correcto",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Showall",
            descripcion: "Showall correcto",
            flag: false
          });
        }
      )
    TestComponent.removeFakeCredentials()


    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "100", "1", "1", "20212022", "1",
      "A00D000D00009", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por problemas de integridad entre año y titulacion",
            flag: false
          });
        }, error => {
          console.log(error.message)
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por problemas de integridad entre año y titulacion",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por problemas de integridad entre año y titulacion",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add 2", "6", "Asignatura Add II",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un nombre incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un nombre con incorrecto",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "5", "Asignatura Add II",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir número de creditos incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir número de creditos incorrecto",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "A",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir contenido incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir contenido incorrecto",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials()


    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OF", "100", "1", "1", "20202021", "1",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir tipo incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir tipo incorrecto",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "E", "1", "1", "20202021", "1",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un formato de horas incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un formato de horas incorrecto",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "100", "7777", "1", "20202021", "1",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un cuatrimestre incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un cuatrimestre incorrecto",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "100", "1", "77777", "20202021", "1",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir una titulacion inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por introducir una titulacion inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por introducir una titulacion inexistente",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials()
    //====>17
    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "100", "1", "1", "20232024", "1",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un año inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por introducir un año inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por introducir un año inexistente",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "100", "1", "1", "20202021", "7777",
      "A00D000D00001", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un departamento inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por introducir un departamento inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por introducir un departamento inexistente",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D0000", "12345678Z"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un codigo erroneo",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un codigo erroneo",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials()

    //=====>20

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00001", "12345678"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un dni erroneo",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un dni erroneo",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials()

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add II", "6", "Asignatura Add II",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00001", "27473817H"
    )
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Asignaturas Add",
            descripcion: "Add incorrecto por introducir un dni inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por introducir un dni inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Asignaturas Add",
              descripcion: "Add incorrecto por introducir un dni inexistente",
              flag: false
            });
          }
        }
      )
    TestComponent.removeFakeCredentials()
    //22


    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add III", "6", "Asignatura Add III",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00002", "12345678Z"
    )
      .subscribe((id_asignatura_II) => {
        TestComponent.initFakeCredentials();
        this.gestionAsignaturasService.addAsignatura("Asignatura Add IIIIII", "6", "Asignatura Add IIIIII",
          "OB", "100", "1", "1", "20202021", "1",
          "A00D000D00006", "12345678Z"
        )
          .subscribe(
            (id_asignatura_III) => {
              TestComponent.initFakeCredentials();
              this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add IIIIII", "6", "Asignatura Add IIIIII",
                "OB", "100", "1", "1", "20202021", "1",
                "12345678Z", "A00D000D00006"
              )
                .subscribe(
                  () => {
                    this.tests.push({
                      accion: "Gestion Asignaturas Edit",
                      descripcion: "Edit incorrecto porque el código es único",
                      flag: false
                    });
                  }, error => {
                    if (error.message == '4002') {
                      this.tests.push({
                        accion: "Gestion Asignaturas Edit",
                        descripcion: "Edit incorrecto porque el código es único",
                        flag: true
                      });

                      TestComponent.initFakeCredentials();
                      this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add 3", "6", "Asignatura Add III",
                        "OB", "100", "1", "1", "20202021", "1",
                        "A00D000D00002", "12345678Z"
                      )
                        .subscribe(
                          () => {
                            this.tests.push({
                              accion: "Gestion Asignaturas Edit",
                              descripcion: "Edit incorrecto por introducir un nombre incorrecto",
                              flag: false
                            });
                          }, () => {
                            this.tests.push({
                              accion: "Gestion Asignaturas Edit",
                              descripcion: "Edit incorrecto por introducir un nombre incorrecto",
                              flag: true
                            });
                            TestComponent.initFakeCredentials();
                            this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "A", "Asignatura Add III",
                              "OB", "100", "1", "1", "20202021", "1",
                              "A00D000D00002", "12345678Z"
                            )
                              .subscribe(
                                () => {
                                  this.tests.push({
                                    accion: "Gestion Asignaturas Edit",
                                    descripcion: "Edit incorrecto por introducir un numero de creditos incorrecto",
                                    flag: false
                                  });
                                }, () => {
                                  this.tests.push({
                                    accion: "Gestion Asignaturas Edit",
                                    descripcion: "Edit incorrecto por introducir un numero de creditos incorrecto",
                                    flag: true
                                  });

                                  TestComponent.initFakeCredentials();
                                  this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "A",
                                    "OB", "100", "1", "1", "20202021", "1",
                                    "A00D000D00002", "12345678Z"
                                  )
                                    .subscribe(
                                      () => {
                                        this.tests.push({
                                          accion: "Gestion Asignaturas Edit",
                                          descripcion: "Edit incorrecto por introducir una descripción erronea",
                                          flag: false
                                        });
                                      }, () => {
                                        this.tests.push({
                                          accion: "Gestion Asignaturas Edit",
                                          descripcion: "Edit incorrecto por introducir una descripción erronea",
                                          flag: true
                                        });


                                        TestComponent.initFakeCredentials();
                                        this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "Asignatura Add III",
                                          "OF", "100", "1", "1", "20202021", "1",
                                          "A00D000D00002", "12345678Z"
                                        )
                                          .subscribe(
                                            () => {
                                              this.tests.push({
                                                accion: "Gestion Asignaturas Edit",
                                                descripcion: "Edit incorrecto por introducir un tipo incorrecto",
                                                flag: false
                                              });
                                            }, () => {
                                              this.tests.push({
                                                accion: "Gestion Asignaturas Edit",
                                                descripcion: "Edit incorrecto por introducir un tipo incorrecto",
                                                flag: true
                                              });

                                              TestComponent.initFakeCredentials();
                                              this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "Asignatura Add III",
                                                "OB", "A", "1", "1", "20202021", "1",
                                                "A00D000D00002", "12345678Z"
                                              )
                                                .subscribe(
                                                  () => {
                                                    this.tests.push({
                                                      accion: "Gestion Asignaturas Edit",
                                                      descripcion: "Edit incorrecto por introducir un número de horas erroneo",
                                                      flag: false
                                                    });
                                                  }, () => {
                                                    this.tests.push({
                                                      accion: "Gestion Asignaturas Edit",
                                                      descripcion: "Edit incorrecto por introducir un número de horas erroneo",
                                                      flag: true
                                                    });

                                                    TestComponent.initFakeCredentials();
                                                    this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "Asignatura Add III",
                                                      "OF", "100", "A", "1", "20202021", "1",
                                                      "A00D000D00002", "12345678Z"
                                                    )
                                                      .subscribe(
                                                        () => {
                                                          this.tests.push({
                                                            accion: "Gestion Asignaturas Edit",
                                                            descripcion: "Edit incorrecto por introducir un cuatrimestre incorrecto",
                                                            flag: false
                                                          });
                                                        }, () => {
                                                          this.tests.push({
                                                            accion: "Gestion Asignaturas Edit",
                                                            descripcion: "Edit incorrecto por introducir un cuatrimestre incorrecto",
                                                            flag: true
                                                          });

                                                          TestComponent.initFakeCredentials();
                                                          this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "Asignatura Add III",
                                                            "OB", "100", "1", "1", "20202021", "1",
                                                            "A00D000D0000", "12345678Z"
                                                          )
                                                            .subscribe(
                                                              () => {
                                                                this.tests.push({
                                                                  accion: "Gestion Asignaturas Edit",
                                                                  descripcion: "Edit incorrecto por introducir un código erroneo",
                                                                  flag: false
                                                                });
                                                              }, () => {
                                                                this.tests.push({
                                                                  accion: "Gestion Asignaturas Edit",
                                                                  descripcion: "Edit incorrecto por introducir un código erroneo",
                                                                  flag: true
                                                                });

                                                                TestComponent.initFakeCredentials();
                                                                this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "Asignatura Add III",
                                                                  "OB", "100", "1", "7777", "20202021", "1",
                                                                  "12345678Z", "A00D000D00002"
                                                                )
                                                                  .subscribe(
                                                                    () => {
                                                                      this.tests.push({
                                                                        accion: "Gestion Asignaturas Edit",
                                                                        descripcion: "Edit incorrecto por introducir un departamento inexistente",
                                                                        flag: false
                                                                      });
                                                                    }, error => {
                                                                      if (error.message == '4004') {
                                                                        this.tests.push({
                                                                          accion: "Gestion Asignaturas Edit",
                                                                          descripcion: "Edit incorrecto por introducir un departamento inexistente",
                                                                          flag: true
                                                                        });
                                                                        TestComponent.initFakeCredentials();
                                                                        this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "Asignatura Add III",
                                                                          "OB", "100", "1", "1", "20202021", "7777",
                                                                          "12345678Z", "A00D000D00002"
                                                                        )
                                                                          .subscribe(
                                                                            () => {
                                                                              this.tests.push({
                                                                                accion: "Gestion Asignaturas Edit",
                                                                                descripcion: "Edit incorrecto por introducir una titulación inexistente",
                                                                                flag: false
                                                                              });
                                                                            }, error => {
                                                                              if (error.message == '4004') {
                                                                                this.tests.push({
                                                                                  accion: "Gestion Asignaturas Edit",
                                                                                  descripcion: "Edit incorrecto por introducir una titulación inexistente",
                                                                                  flag: true
                                                                                });
                                                                                TestComponent.initFakeCredentials();
                                                                                this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "Asignatura Add III",
                                                                                  "OB", "100", "1", "1", "20202021", "1",
                                                                                  "27473817H", "A00D000D00002"
                                                                                )
                                                                                  .subscribe(
                                                                                    () => {
                                                                                      this.tests.push({
                                                                                        accion: "Gestion Asignaturas Edit",
                                                                                        descripcion: "Edit incorrecto por introducir un profesor inexistente",
                                                                                        flag: false
                                                                                      });
                                                                                    }, error => {
                                                                                      if (error.message == '4004') {
                                                                                        this.tests.push({
                                                                                          accion: "Gestion Asignaturas Edit",
                                                                                          descripcion: "Edit incorrecto por introducir un profesor inexistente",
                                                                                          flag: true
                                                                                        });
                                                                                        TestComponent.initFakeCredentials();
                                                                                        this.gestionAsignaturasService.editAsignatura(id_asignatura_II, "Asignatura Add III", "6", "Asignatura Add III",
                                                                                          "OB", "100", "1", "1", "20212022", "1",
                                                                                          "12345678Z", "A00D000D00002"
                                                                                        )
                                                                                          .subscribe(
                                                                                            () => {
                                                                                              this.tests.push({
                                                                                                accion: "Gestion Asignaturas Edit",
                                                                                                descripcion: "Edit incorrecto por problemas de integridad entre año y titulación",
                                                                                                flag: false
                                                                                              });
                                                                                            }, error => {
                                                                                              if (error.message == '4004') {
                                                                                                this.tests.push({
                                                                                                  accion: "Gestion Asignaturas Edit",
                                                                                                  descripcion: "Edit incorrecto por problemas de integridad entre año y titulación",
                                                                                                  flag: true
                                                                                                });
                                                                                                TestComponent.initFakeCredentials();
                                                                                                this.gestionAsignaturasService.deleteAsignatura(id_asignatura_II).subscribe(() => {
                                                                                                  TestComponent.initFakeCredentials();
                                                                                                  this.gestionAsignaturasService.deleteAsignatura(id_asignatura_III).subscribe()
                                                                                                  TestComponent.removeFakeCredentials();
                                                                                                })
                                                                                                TestComponent.removeFakeCredentials();
                                                                                              } else {
                                                                                                this.tests.push({
                                                                                                  accion: "Gestion Asignaturas Edit",
                                                                                                  descripcion: "Edit incorrecto por problemas de integridad entre año y titulación",
                                                                                                  flag: false
                                                                                                });
                                                                                              }

                                                                                            }
                                                                                          )
                                                                                        TestComponent.removeFakeCredentials();
                                                                                      } else {
                                                                                        this.tests.push({
                                                                                          accion: "Gestion Asignaturas Edit",
                                                                                          descripcion: "Edit incorrecto por introducir un profesor inexistente",
                                                                                          flag: false
                                                                                        });
                                                                                      }

                                                                                    }
                                                                                  )
                                                                                TestComponent.removeFakeCredentials();
                                                                              } else {
                                                                                this.tests.push({
                                                                                  accion: "Gestion Asignaturas Edit",
                                                                                  descripcion: "Edit incorrecto por introducir una titulación inexistente",
                                                                                  flag: false
                                                                                });
                                                                              }

                                                                            }
                                                                          )
                                                                        TestComponent.removeFakeCredentials();

                                                                      } else {
                                                                        this.tests.push({
                                                                          accion: "Gestion Asignaturas Edit",
                                                                          descripcion: "Edit incorrecto por introducir un departamento inexistente",
                                                                          flag: false
                                                                        });
                                                                      }

                                                                    }
                                                                  )
                                                                TestComponent.removeFakeCredentials();
                                                              }
                                                            )
                                                          TestComponent.removeFakeCredentials()
                                                        }
                                                      )
                                                    TestComponent.removeFakeCredentials()
                                                  }
                                                )
                                              TestComponent.removeFakeCredentials()
                                            }
                                          )
                                        TestComponent.removeFakeCredentials()
                                      }
                                    )
                                  TestComponent.removeFakeCredentials()
                                }
                              )
                            TestComponent.removeFakeCredentials()
                          }
                        )
                      TestComponent.removeFakeCredentials()
                    } else {
                      this.tests.push({
                        accion: "Gestion Asignaturas Edit",
                        descripcion: "Edit incorrecto porque el código es único",
                        flag: false
                      });
                    }

                  })
              TestComponent.removeFakeCredentials();


            }
          )
        TestComponent.removeFakeCredentials()

      })

  }

  gestionGruposTest() {

    /* nombre: string,
       codigo: string,
     tipo: string,
     horas: string,
     anho: string,
     titulacion: string,
     asignatura: string */

    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add IIII", "6", "Asignatura Add IIII",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00004", "12345678Z"
    ).subscribe((id_asignatura_grupos) => {

      TestComponent.initFakeCredentials();
      this.gestionGruposService.addGrupo("Grupo I", "D00x01", "GA", "1", "20202021", "1", id_asignatura_grupos)
        .subscribe((id_grupo_I) => {
          this.tests.push({
            accion: "Gestion Grupos Add",
            descripcion: "Add correcto",
            flag: true
          });
          TestComponent.initFakeCredentials();
          this.gestionGruposService.addGrupo("Grupo I", "D00x01", "GA", "1", "20202021", "1", id_asignatura_grupos)
            .subscribe(() => {
              this.tests.push({
                accion: "Gestion Grupos Add",
                descripcion: "Add duplicado",
                flag: false
              });
            }, error => {
              if (error.message == '4002') {
                this.tests.push({
                  accion: "Gestion Grupos Add",
                  descripcion: "Add duplicado",
                  flag: true
                });
                TestComponent.initFakeCredentials();
                this.gestionGruposService.editGrupo(id_grupo_I, "Grupo I", "D00x02", "GA", "1", "20202021", "1", id_asignatura_grupos)
                  .subscribe(() => {
                    this.tests.push({
                      accion: "Gestion Grupos Edit",
                      descripcion: "Edit correcto",
                      flag: true
                    });

                    TestComponent.initFakeCredentials();
                    this.gestionGruposService.show(id_grupo_I)
                      .subscribe(() => {
                        this.tests.push({
                          accion: "Gestion Grupos Show",
                          descripcion: "Show correcto",
                          flag: true
                        });

                        TestComponent.initFakeCredentials();
                        this.gestionGruposService.deleteGrupo(id_grupo_I)
                          .subscribe(() => {
                            this.tests.push({
                              accion: "Gestion Grupos Delete",
                              descripcion: "Delete correcto",
                              flag: true
                            });
                            TestComponent.initFakeCredentials();
                            this.gestionAsignaturasService.deleteAsignatura(id_asignatura_grupos)
                              .subscribe()
                            TestComponent.removeFakeCredentials();
                          }, () => {
                            this.tests.push({
                              accion: "Gestion Grupos Delete",
                              descripcion: "Delete correcto",
                              flag: false
                            });
                          })
                        TestComponent.removeFakeCredentials();

                      }, () => {
                        this.tests.push({
                          accion: "Gestion Grupos Show",
                          descripcion: "Show correcto",
                          flag: false
                        });
                      })
                    TestComponent.removeFakeCredentials();
                  }, () => {
                    this.tests.push({
                      accion: "Gestion Grupos Edit",
                      descripcion: "Edit correcto",
                      flag: false
                    });
                  })
                TestComponent.removeFakeCredentials();
              } else {
                this.tests.push({
                  accion: "Gestion Grupos Add",
                  descripcion: "Add duplicado",
                  flag: false
                });
              }
            })
          TestComponent.removeFakeCredentials();
        }, () => {
          this.tests.push({
            accion: "Gestion Grupos Add",
            descripcion: "Add correcto",
            flag: false
          });
        })
      TestComponent.removeFakeCredentials();
    })
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionGruposService.deleteGrupo("999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Grupos Delete",
            descripcion: "Delete incorrecto porque no existe el grupo",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Grupos Delete",
            descripcion: "Delete incorrecto porque no existe el grupo",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionGruposService.show("999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Grupos Show",
            descripcion: "Show incorrecto porque no existe el grupo",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Grupos Show",
            descripcion: "Show incorrecto porque no existe el grupo",
            flag: true
          });
        }
      )
    TestComponent.removeFakeCredentials();

    TestComponent.initFakeCredentials();
    this.gestionGruposService.mostrartodos()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Grupos Showall",
            descripcion: "Showall correcto",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Grupos Show",
            descripcion: "Showall correcto",
            flag: false
          });
        }
      )
    TestComponent.removeFakeCredentials();


    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Add IIIII", "6", "Asignatura Add IIIII",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D000D00005", "12345678Z"
    ).subscribe((id_asignatura_grupos_II) => {


      TestComponent.initFakeCredentials();
      this.gestionGruposService.addGrupo("Grupo 2", "D00x03", "GA", "1", "20202021", "1", id_asignatura_grupos_II)
        .subscribe(() => {
          this.tests.push({
            accion: "Gestion Grupos Add",
            descripcion: "Add incorrecto porque el nombre tiene un formato incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Grupos Add",
            descripcion: "Add incorrecto porque el nombre tiene un formato incorrecto",
            flag: true
          });


          TestComponent.initFakeCredentials();
          this.gestionGruposService.addGrupo("Grupo II", "D0003", "GA", "1", "20202021", "1", id_asignatura_grupos_II)
            .subscribe(() => {
              this.tests.push({
                accion: "Gestion Grupos Add",
                descripcion: "Add incorrecto porque el codigo tiene un formato incorrecto",
                flag: false
              });
            }, () => {
              this.tests.push({
                accion: "Gestion Grupos Add",
                descripcion: "Add incorrecto porque el codigo tiene un formato incorrecto",
                flag: true
              });
              TestComponent.initFakeCredentials();
              this.gestionGruposService.addGrupo("Grupo II", "D00x03", "FA", "1", "20202021", "1", id_asignatura_grupos_II)
                .subscribe(() => {
                    this.tests.push({
                      accion: "Gestion Grupos Add",
                      descripcion: "Add incorrecto porque el tipo tiene un formato incorrecto",
                      flag: false
                    });
                  }, () => {
                    this.tests.push({
                      accion: "Gestion Grupos Add",
                      descripcion: "Add incorrecto porque el tipo tiene un formato incorrecto",
                      flag: true
                    });
                    TestComponent.initFakeCredentials();
                    this.gestionGruposService.addGrupo("Grupo II", "D00x03", "GA", "A", "20202021", "1", id_asignatura_grupos_II)
                      .subscribe(() => {
                          this.tests.push({
                            accion: "Gestion Grupos Add",
                            descripcion: "Add incorrecto porque las horas tienen un formato incorrecto",
                            flag: false
                          });
                        }, () => {
                          this.tests.push({
                            accion: "Gestion Grupos Add",
                            descripcion: "Add incorrecto porque las horas tienen un formato incorrecto",
                            flag: true
                          });
                          TestComponent.initFakeCredentials();
                          this.gestionGruposService.addGrupo("Grupo II", "D00x03", "GA", "1", "20232024", "1", id_asignatura_grupos_II)
                            .subscribe(() => {
                                this.tests.push({
                                  accion: "Gestion Grupos Add",
                                  descripcion: "Add incorrecto porque no existe el año",
                                  flag: false
                                });
                              }, error => {
                                if (error.message == '4004') {
                                  this.tests.push({
                                    accion: "Gestion Grupos Add",
                                    descripcion: "Add incorrecto porque no existe el año",
                                    flag: true
                                  });
                                  TestComponent.initFakeCredentials();
                                  this.gestionGruposService.addGrupo("Grupo II", "D00x03", "GA", "1", "20202021", "7777", id_asignatura_grupos_II)
                                    .subscribe(() => {
                                        this.tests.push({
                                          accion: "Gestion Grupos Add",
                                          descripcion: "Add incorrecto porque no existe la titulación",
                                          flag: false
                                        });
                                      }, error => {
                                        if (error.message == '4004') {
                                          this.tests.push({
                                            accion: "Gestion Grupos Add",
                                            descripcion: "Add incorrecto porque no existe la titulación",
                                            flag: true
                                          });


                                          TestComponent.initFakeCredentials();
                                          this.gestionGruposService.addGrupo("Grupo II", "D00x03", "GA", "1", "20202021", "1", "12345678")
                                            .subscribe(() => {
                                                this.tests.push({
                                                  accion: "Gestion Grupos Add",
                                                  descripcion: "Add incorrecto porque no existe la asignatura",
                                                  flag: false
                                                });
                                              }, error => {
                                                if (error.message == '4004') {
                                                  this.tests.push({
                                                    accion: "Gestion Grupos Add",
                                                    descripcion: "Add incorrecto porque no existe la asignatura",
                                                    flag: true
                                                  });
                                                  TestComponent.initFakeCredentials();
                                                  this.gestionGruposService.addGrupo("Grupo II", "D00x03", "GA", "1", "20212022", "1", id_asignatura_grupos_II)
                                                    .subscribe(() => {
                                                        this.tests.push({
                                                          accion: "Gestion Grupos Add",
                                                          descripcion: "Add incorrecto porque el año introducido no coindice con el de la titulación",
                                                          flag: false
                                                        });
                                                      }, error => {
                                                        if (error.message == '4004') {
                                                          this.tests.push({
                                                            accion: "Gestion Grupos Add",
                                                            descripcion: "Add incorrecto porque el año introducido no coindice con el de la titulación",
                                                            flag: true
                                                          });
                                                          TestComponent.initFakeCredentials();
                                                          this.gestionAsignaturasService.deleteAsignatura(id_asignatura_grupos_II)
                                                            .subscribe()
                                                          TestComponent.removeFakeCredentials();
                                                        } else {
                                                          this.tests.push({
                                                            accion: "Gestion Grupos Add",
                                                            descripcion: "Add incorrecto porque el año introducido no coindice con el de la titulación",
                                                            flag: false
                                                          });
                                                        }
                                                      }
                                                    )
                                                  TestComponent.removeFakeCredentials();
                                                } else {
                                                  this.tests.push({
                                                    accion: "Gestion Grupos Add",
                                                    descripcion: "Add incorrecto porque no existe la asignatura",
                                                    flag: false
                                                  });
                                                }
                                              }
                                            )
                                          TestComponent.removeFakeCredentials();
                                        } else {
                                          this.tests.push({
                                            accion: "Gestion Grupos Add",
                                            descripcion: "Add incorrecto porque no existe la titulación",
                                            flag: false
                                          });
                                        }
                                      }
                                    )
                                  TestComponent.removeFakeCredentials();
                                } else {
                                  this.tests.push({
                                    accion: "Gestion Grupos Add",
                                    descripcion: "Add incorrecto porque no existe el año",
                                    flag: false
                                  });
                                }
                              }
                            )
                          TestComponent.removeFakeCredentials();
                        }
                      )
                    TestComponent.removeFakeCredentials();
                  }
                )
              TestComponent.removeFakeCredentials();
            })

          TestComponent.removeFakeCredentials();
        })

      TestComponent.removeFakeCredentials();
    })
    TestComponent.removeFakeCredentials();


    TestComponent.initFakeCredentials();
    this.gestionAsignaturasService.addAsignatura("Asignatura Edit IIIIII", "6", "Asignatura Edit IIIIII",
      "OB", "100", "1", "1", "20202021", "1",
      "A00D001D00006", "12345678Z"
    ).subscribe((id_asignatura_grupos_III) => {

      TestComponent.initFakeCredentials();
      this.gestionGruposService.addGrupo("Grupo IIII", "D00x04", "GA", "1", "20202021", "1", id_asignatura_grupos_III)
        .subscribe((id_grupo_II) => {

          TestComponent.initFakeCredentials();

          this.gestionGruposService.addGrupo("Grupo IIIII", "D00x05", "GA", "1", "20202021", "1", id_asignatura_grupos_III)
            .subscribe((id_grupo_III) => {
              TestComponent.initFakeCredentials();

              this.gestionGruposService.editGrupo(id_grupo_II, "Grupo IIII", "D00x05", "GA", "1", "20202021", "1", id_asignatura_grupos_III)
                .subscribe(() => {
                  this.tests.push({
                    accion: "Gestion Grupos Edit",
                    descripcion: "Edit incorrecto porque el código es único",
                    flag: false
                  });
                }, error => {
                  if (error.message == '4002') {
                    this.tests.push({
                      accion: "Gestion Grupos Edit",
                      descripcion: "Edit incorrecto porque el código es único",
                      flag: true
                    });
                    TestComponent.removeFakeCredentials();

                    this.gestionGruposService.editGrupo(id_grupo_II, "Grupo 3", "D00x04", "GA", "1", "20202021", "1", id_asignatura_grupos_III)
                      .subscribe(() => {
                        this.tests.push({
                          accion: "Gestion Grupos Edit",
                          descripcion: "Edit incorrecto porque el nombre tiene un formato incorrecto",
                          flag: false
                        });
                      }, () => {
                        this.tests.push({
                          accion: "Gestion Grupos Edit",
                          descripcion: "Edit incorrecto porque el nombre tiene un formato incorrecto",
                          flag: true
                        });
                        TestComponent.initFakeCredentials();
                        this.gestionGruposService.editGrupo(id_grupo_II, "Grupo IIII", "D0004", "GA", "1", "20202021", "1", id_asignatura_grupos_III)
                          .subscribe(() => {
                            this.tests.push({
                              accion: "Gestion Grupos Edit",
                              descripcion: "Edit incorrecto porque el codigo tiene un formato incorrecto",
                              flag: false
                            });
                          }, () => {
                            this.tests.push({
                              accion: "Gestion Grupos Edit",
                              descripcion: "Edit incorrecto porque el codigo tiene un formato incorrecto",
                              flag: true
                            });
                            TestComponent.initFakeCredentials();
                            this.gestionGruposService.editGrupo(id_grupo_II, "Grupo IIII", "D00x04", "A", "1", "20202021", "1", id_asignatura_grupos_III)
                              .subscribe(() => {
                                  this.tests.push({
                                    accion: "Gestion Grupos Edit",
                                    descripcion: "Edit incorrecto porque el tipo tiene un formato incorrecto",
                                    flag: false
                                  });
                                }, () => {
                                  this.tests.push({
                                    accion: "Gestion Grupos Edit",
                                    descripcion: "Edit incorrecto porque el tipo tiene un formato incorrecto",
                                    flag: true
                                  });
                                  TestComponent.initFakeCredentials();
                                  this.gestionGruposService.editGrupo(id_grupo_II, "Grupo IIII", "D00x04", "GA", "a", "20202021", "1", id_asignatura_grupos_III)
                                    .subscribe(() => {
                                        this.tests.push({
                                          accion: "Gestion Grupos Edit",
                                          descripcion: "Edit incorrecto porque las horas tienen un formato incorrecto",
                                          flag: false
                                        });
                                      }, () => {
                                        this.tests.push({
                                          accion: "Gestion Grupos Edit",
                                          descripcion: "Edit incorrecto porque las horas tienen un formato incorrecto",
                                          flag: true
                                        });
                                        TestComponent.initFakeCredentials();
                                        this.gestionGruposService.editGrupo(id_grupo_II, "Grupo IIII", "D00x04", "GA", "1", "20232024", "1", id_asignatura_grupos_III)
                                          .subscribe(() => {
                                              this.tests.push({
                                                accion: "Gestion Grupos Edit",
                                                descripcion: "Edit incorrecto porque no existe el año",
                                                flag: false
                                              });
                                            }, error => {
                                              if (error.message == '4004') {
                                                this.tests.push({
                                                  accion: "Gestion Grupos Edit",
                                                  descripcion: "Edit incorrecto porque no existe el año",
                                                  flag: true
                                                });
                                                TestComponent.initFakeCredentials();
                                                this.gestionGruposService.editGrupo(id_grupo_II, "Grupo IIII", "D00x04", "GA", "1", "20202021", "7777", id_asignatura_grupos_III)
                                                  .subscribe(() => {
                                                      this.tests.push({
                                                        accion: "Gestion Grupos Edit",
                                                        descripcion: "Edit incorrecto porque no existe la titulación",
                                                        flag: false
                                                      });
                                                    }, error => {
                                                      if (error.message == '4004') {
                                                        this.tests.push({
                                                          accion: "Gestion Grupos Edit",
                                                          descripcion: "Edit incorrecto porque no existe la titulación",
                                                          flag: true
                                                        });


                                                        TestComponent.initFakeCredentials();
                                                        this.gestionGruposService.editGrupo(id_grupo_II, "Grupo IIII", "D00x04", "GA", "1", "20202021", "7777", id_asignatura_grupos_III)
                                                          .subscribe(() => {
                                                              this.tests.push({
                                                                accion: "Gestion Grupos Edit",
                                                                descripcion: "Edit incorrecto porque no existe la asignatura",
                                                                flag: false
                                                              });
                                                            }, error => {
                                                              if (error.message == '4004') {
                                                                this.tests.push({
                                                                  accion: "Gestion Grupos Edit",
                                                                  descripcion: "Edit incorrecto porque no existe la asignatura",
                                                                  flag: true
                                                                });
                                                                TestComponent.initFakeCredentials();
                                                                this.gestionGruposService.editGrupo(id_grupo_II, "Grupo IIII", "D00x04", "GA", "1", "20212022", "1", id_asignatura_grupos_III)
                                                                  .subscribe(() => {
                                                                      this.tests.push({
                                                                        accion: "Gestion Grupos Edit",
                                                                        descripcion: "Edit incorrecto porque el año introducido no coindice con el de la titulación",
                                                                        flag: false
                                                                      });
                                                                    }, error => {
                                                                      if (error.message == '4004') {
                                                                        this.tests.push({
                                                                          accion: "Gestion Grupos Edit",
                                                                          descripcion: "Edit incorrecto porque el año introducido no coindice con el de la titulación",
                                                                          flag: true
                                                                        });
                                                                        TestComponent.initFakeCredentials();
                                                                        this.gestionGruposService.deleteGrupo(id_grupo_II)
                                                                          .subscribe(() => {
                                                                            TestComponent.initFakeCredentials();
                                                                            this.gestionGruposService.deleteGrupo(id_grupo_III)
                                                                              .subscribe(() => {
                                                                                TestComponent.initFakeCredentials();
                                                                                this.gestionAsignaturasService.deleteAsignatura(id_asignatura_grupos_III)
                                                                                  .subscribe()
                                                                                TestComponent.removeFakeCredentials();
                                                                              })
                                                                            TestComponent.removeFakeCredentials();
                                                                          })
                                                                        TestComponent.removeFakeCredentials();
                                                                      } else {
                                                                        this.tests.push({
                                                                          accion: "Gestion Grupos Edit",
                                                                          descripcion: "Edit incorrecto porque el año introducido no coindice con el de la titulación",
                                                                          flag: false
                                                                        });
                                                                      }
                                                                    }
                                                                  )
                                                                TestComponent.removeFakeCredentials();
                                                              } else {
                                                                this.tests.push({
                                                                  accion: "Gestion Grupos Add",
                                                                  descripcion: "Add incorrecto porque no existe la asignatura",
                                                                  flag: false
                                                                });
                                                              }
                                                            }
                                                          )
                                                        TestComponent.removeFakeCredentials();
                                                      } else {
                                                        this.tests.push({
                                                          accion: "Gestion Grupos Add",
                                                          descripcion: "Add incorrecto porque no existe la titulación",
                                                          flag: false
                                                        });
                                                      }
                                                    }
                                                  )
                                                TestComponent.removeFakeCredentials();
                                              } else {
                                                this.tests.push({
                                                  accion: "Gestion Grupos Add",
                                                  descripcion: "Add incorrecto porque no existe el año",
                                                  flag: false
                                                });
                                              }
                                            }
                                          )
                                        TestComponent.removeFakeCredentials();
                                      }
                                    )
                                  TestComponent.removeFakeCredentials();
                                }
                              )
                            TestComponent.removeFakeCredentials();
                          })
                        TestComponent.removeFakeCredentials();
                      })
                    TestComponent.removeFakeCredentials();
                  } else {
                    this.tests.push({
                      accion: "Gestion Grupos Edit",
                      descripcion: "Edit incorrecto porque el código es único",
                      flag: false
                    });
                  }


                })

            })
          TestComponent.removeFakeCredentials();
        })
      TestComponent.removeFakeCredentials();
    })
    TestComponent.removeFakeCredentials();

  }

  private gestionPermisosTest() {

    TestComponent.initFakeCredentials();
    this.gestionPermisosService.addPermiso("3", "1", "1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Add",
            descripcion: "Permiso añadido correctamente",
            flag: true
          });

          TestComponent.initFakeCredentials();
          this.gestionPermisosService.addPermiso("3", "1", "1")
            .subscribe(
              () => {
                this.tests.push({
                  accion: "Gestion Permisos Add",
                  descripcion: "Error. Permiso duplicado",
                  flag: false
                });
              }, error => {

                if (error.message == '4002') {
                  this.tests.push({
                    accion: "Gestion Permisos Add",
                    descripcion: "Error. Permiso duplicado",
                    flag: true
                  });
                } else {
                  this.tests.push({
                    accion: "Gestion Permisos Add",
                    descripcion: "Error. Permiso duplicado",
                    flag: false
                  });
                }


                TestComponent.initFakeCredentials();
                this.gestionPermisosService.deletePermiso("3", "1", "1")
                  .subscribe(
                    () => {
                      this.tests.push({
                        accion: "Gestion Permisos Delete",
                        descripcion: "Permiso borrado.",
                        flag: true
                      });
                    }, () => {
                      this.tests.push({
                        accion: "Gestion Permisos Delete",
                        descripcion: "Permiso borrado.",
                        flag: false
                      });
                    }
                  )
                TestComponent.removeFakeCredentials();
              }
            )
          TestComponent.removeFakeCredentials();
        }, () => {
          this.tests.push({
            accion: "Gestion Permisos Add",
            descripcion: "Permiso añadido correctamente",
            flag: false
          });
        }
      )


    this.gestionPermisosService.addPermiso("333333", "1", "1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Add",
            descripcion: "Error. Rol no existente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Rol no existente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Rol no existente",
              flag: false
            });
          }

        }
      )

    this.gestionPermisosService.addPermiso("1", "3333333", "1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Add",
            descripcion: "Error. Funcionalidad no existente",
            flag: false
          });
        }, error => {
          if (error.message == '4002')
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Funcionalidad no existente",
              flag: true
            });
        }
      )

    this.gestionPermisosService.addPermiso("1", "1", "3333")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Add",
            descripcion: "Error. Accion no existente",
            flag: false
          });
        }, error => {

          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Accion no existente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Accion no existente",
              flag: false
            });
          }
        }
      )

    this.gestionPermisosService.addPermiso("ROL", "1", "3333")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Add",
            descripcion: "Error. Formato de rol no valido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Formato de rol no valido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Formato de rol no valido",
              flag: false
            });
          }

        }
      )

    this.gestionPermisosService.addPermiso("1", "FUNCIONALIDAD", "3333")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Add",
            descripcion: "Error. Formato de funcionalidad no valido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Formato de funcionalidad no valido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Formato de funcionalidad no valido",
              flag: false
            });
          }
        }
      )


    this.gestionPermisosService.addPermiso("1", "1", "ACCION")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Add",
            descripcion: "Error. Formato de accion no valido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Formato de accion no valido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Permisos Add",
              descripcion: "Error. Formato de accion no valido",
              flag: false
            });
          }
        }
      )


    this.gestionPermisosService.mostrarTodos()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Showall",
            descripcion: "Permisos correctamente mostrados",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Permisos Showall",
            descripcion: "Permisos correctamente mostrados",
            flag: false
          });
        }
      )

    this.gestionPermisosService.deletePermiso("1000", "1000", "1000")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Permisos Delete",
            descripcion: "Permiso no existente.",
            flag: false
          });
        }, error => {
          if (error.message == '4005') {
            this.tests.push({
              accion: "Gestion Permisos Delete",
              descripcion: "Permiso no existente.",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Permisos Delete",
              descripcion: "Permiso no existente.",
              flag: false
            });
          }
        }
      )


    TestComponent.removeFakeCredentials();

  }

  private gestionRolesUsuarioTest() {

    TestComponent.initFakeCredentials();
    //TEST PARA SHOWALL
    this.gestionRolesUsuarioService.mostrarTodos()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Showall",
            descripcion: "Listado de todas las asignaciones de roles a usuarios de la base de datos",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Showall",
            descripcion: "Listado de todas las asignaciones de roles a usuarios de la base de datos",
            flag: false
          });
        }
      )

    //TEST PARA ADD CON ID USUARIO ERRONEO
    this.gestionRolesUsuarioService.addRolUsuario("39499106X", "1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Add",
            descripcion: "Add fallido por introducir un ID de Usuario Inexistente",
            flag: false
          });
        }, error => {

          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Roles de Usuario Add",
              descripcion: "Add fallido por introducir un ID de Usuario Inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Roles de Usuario Add",
              descripcion: "Add fallido por introducir un ID de Usuario Inexistente",
              flag: false
            });
          }


        }
      )

    //TEST PARA ADD CON ID USUARIO ERRONEO
    this.gestionRolesUsuarioService.addRolUsuario("AAA", "1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Add",
            descripcion: "DNI no válida",
            flag: false
          });
        }, error => {

          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Roles de Usuario Add",
              descripcion: "DNI no válida",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Roles de Usuario Add",
              descripcion: "DNI no válida",
              flag: false
            });
          }


        }
      )

    //TEST PARA ADD CON ID USUARIO ERRONEO
    this.gestionRolesUsuarioService.addRolUsuario("12345678Z", "0")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Add",
            descripcion: "Add fallido por introducir un ID de Rol Inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Roles de Usuario Add",
              descripcion: "Add fallido por introducir un ID de Rol Inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Roles de Usuario Add",
              descripcion: "Add fallido por introducir un ID de Rol Inexistente",
              flag: false
            });
          }

        }
      )

    //TEST PARA ADD CON ID USUARIO ERRONEO
    this.gestionRolesUsuarioService.addRolUsuario("12345678Z", "AAA")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Add",
            descripcion: "Rol no valido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Roles de Usuario Add",
              descripcion: "Rol no valido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Roles de Usuario Add",
              descripcion: "Rol no valido",
              flag: false
            });
          }

        }
      )

    //TEST PARA ADD Valido
    this.gestionRolesUsuarioService.addRolUsuario("12345678Z", "2")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Add",
            descripcion: "Add valido",
            flag: true
          });
          TestComponent.initFakeCredentials();
          this.gestionRolesUsuarioService.deleteRolUsuario("12345678Z", "2").subscribe(
            () => {
              this.tests.push({
                accion: "Gestion Roles de Usuario Delete",
                descripcion: "Delete válido",
                flag: true
              });
            }, () => {
              this.tests.push({
                accion: "Gestion Roles de Usuario Delete",
                descripcion: "Delete válido",
                flag: false
              });
            }
          )
          TestComponent.removeFakeCredentials();
        }, () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Add",
            descripcion: "Add valido",
            flag: false
          });
        }
      )

    //TEST PARA DELETE FALLIDO
    this.gestionRolesUsuarioService.deleteRolUsuario("-1", "-1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Delete",
            descripcion: "Delete fallido sobre una tupla inexistente",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Roles de Usuario Delete",
            descripcion: "Delete fallido sobre una tupla inexistente",
            flag: true
          });
        }
      )

    TestComponent.removeFakeCredentials();
  }

  private gestionCentrosTest() {

    TestComponent.initFakeCredentials();
    this.gestionCentrosService.mostrarTodos()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Showall",
            descripcion: "Listado de todos los centros en la base de datos",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Centros Showall",
            descripcion: "Listado de todos los centros en la base de datos",
            flag: false
          });
        }
      )


    this.gestionUniversidadesService.addUniversidad("Universidade de Santiago", "Vigo", "12345678Z")
      .subscribe(
        (uni_dni) => {

          TestComponent.initFakeCredentials();

          this.gestionCentrosService.addCentro("Centro A", "Ciudad A", "12345678Z", uni_dni)

            .subscribe(
              id => {
                this.tests.push({
                  accion: "Gestion Centros Add",
                  descripcion: "Add correcto",
                  flag: true
                });

                TestComponent.initFakeCredentials();

                this.gestionCentrosService.addCentro("Centro A", "Ciudad A", "12345678Z", uni_dni)
                  .subscribe(
                    () => {
                      this.tests.push({
                        accion: "Gestion Centros Add",
                        descripcion: "Add Duplicado",
                        flag: false
                      });
                    }, () => {
                      this.tests.push({
                        accion: "Gestion Centros Add",
                        descripcion: "Add Duplicado",
                        flag: true
                      });

                      TestComponent.initFakeCredentials();

                      this.gestionCentrosService.deleteCentro(id)

                      this.gestionCentrosService.show(id)
                        .subscribe(
                          () => {
                            this.tests.push({
                              accion: "Gestion Centros Show",
                              descripcion: "Mostrar un centro.",
                              flag: true
                            });

                            TestComponent.initFakeCredentials();


                            this.gestionCentrosService.editCentro(id, "Centro B", "Ciudad B", "12345678Z", uni_dni)
                              .subscribe(
                                () => {
                                  this.tests.push({
                                    accion: "Gestion Centros Edit",
                                    descripcion: "Editar centro correctamente",
                                    flag: true
                                  });

                                  TestComponent.initFakeCredentials();


                                  this.gestionCentrosService.editCentro(id, "Centro B", "Ciudad B", "12345678Z", uni_dni)
                                    .subscribe(
                                      () => {
                                        this.tests.push({
                                          accion: "Gestion Centros Edit",
                                          descripcion: "Editar centro incorrectamente porque no se realizan cambios",
                                          flag: false
                                        });
                                      }, () => {
                                        this.tests.push({
                                          accion: "Gestion Centros Edit",
                                          descripcion: "Editar centro incorrectamente porque no se realizan cambios",
                                          flag: true
                                        });

                                        TestComponent.initFakeCredentials();

                                        this.gestionCentrosService.deleteCentro(id)
                                          .subscribe(
                                            () => {
                                              this.tests.push({
                                                accion: "Gestion Centros Delete",
                                                descripcion: "Delete exitoso",
                                                flag: true
                                              });

                                              TestComponent.initFakeCredentials();

                                              this.gestionUniversidadesService.deleteUniversidad(uni_dni).subscribe();
                                              TestComponent.removeFakeCredentials();

                                            }, () => {
                                              this.tests.push({
                                                accion: "Gestion Centros Delete",
                                                descripcion: "Delete exitoso",
                                                flag: false
                                              });

                                            }
                                          )

                                        TestComponent.removeFakeCredentials();


                                      }
                                    )

                                  TestComponent.removeFakeCredentials();


                                }, () => {
                                  this.tests.push({
                                    accion: "Gestion Centros Edit",
                                    descripcion: "Editar centro correctamente",
                                    flag: false
                                  });

                                }
                              )
                            TestComponent.removeFakeCredentials();


                          }, () => {
                            this.tests.push({
                              accion: "Gestion Centros Show",
                              descripcion: "Mostrar un centro",
                              flag: false
                            });

                          }
                        )
                      TestComponent.removeFakeCredentials();

                    }
                  )
                TestComponent.removeFakeCredentials();

              }, () => {
                this.tests.push({
                  accion: "Gestion Centros Add",
                  descripcion: "Add correcto",
                  flag: false
                });

              }
            )
          TestComponent.removeFakeCredentials();
        }
      )

    this.gestionCentrosService.addCentro("Centro X", "Ciudad X", "12345678Z", "1")
      .subscribe(
        id => {

          TestComponent.initFakeCredentials();

          this.gestionCentrosService.editCentro(id, "Centro X", "Ciudad Y", "56357187B", "1")
            .subscribe(
              () => {
                this.tests.push({
                  accion: "Gestion Centros Edit",
                  descripcion: "Edit fallido por asignar centro a un responsable no existente",
                  flag: false
                });
              }, () => {
                this.tests.push({
                  accion: "Gestion Centros Edit",
                  descripcion: "Edit fallido por asignar centro a un responsable no existente",
                  flag: true
                });
                TestComponent.removeFakeCredentials();

                TestComponent.initFakeCredentials();
                this.gestionCentrosService.editCentro(id, "Centro X", "Ciudad Y", "12345678Z", "99999")
                  .subscribe(
                    () => {
                      this.tests.push({
                        accion: "Gestion Centros Edit",
                        descripcion: "Error: centro asignado a universidad no existente.",
                        flag: false
                      });
                    }, () => {
                      this.tests.push({
                        accion: "Gestion Centros Edit",
                        descripcion: "Error: centro asignado a universidad no existente.",
                        flag: true
                      });

                      TestComponent.initFakeCredentials();
                      this.gestionCentrosService.deleteCentro(id).subscribe();
                      TestComponent.removeFakeCredentials();

                    }
                  )
                TestComponent.removeFakeCredentials();
              }
            )


        }
      )

    this.gestionCentrosService.addCentro("Centro A", "Ciudad A", "12345678Z", "99999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Add",
            descripcion: "Añadir centro con universidad no existente",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Centros Add",
            descripcion: "Añadir centro con universidad no existente",
            flag: true
          });

        }
      )

    this.gestionCentrosService.addCentro("Centro A", "Ciudad A", "12345678Y", "1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Add",
            descripcion: "Añadir centro con DNI incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Centros Add",
            descripcion: "Añadir centro con DNI incorrecto",
            flag: true
          });

        }
      )

    this.gestionCentrosService.addCentro("", "Ciudad A", "12345678Z", "1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Add",
            descripcion: "Nombre no válido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Centros Add",
              descripcion: "Nombre no válido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Centros Add",
              descripcion: "Nombre no válido",
              flag: false
            });
          }
        }
      )

    this.gestionCentrosService.addCentro("Uvigo", "", "12345678Z", "1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Add",
            descripcion: "Ciudad no válida",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Centros Add",
              descripcion: "Ciudad no válida",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Centros Add",
              descripcion: "Ciudad no válida",
              flag: false
            });
          }
        }
      )

    this.gestionCentrosService.deleteCentro('99999')
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Delete",
            descripcion: "Delete de centro no existente",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Centros Delete",
            descripcion: "Delete de centro no existente",
            flag: true
          });

        }
      )

    this.gestionCentrosService.show('99999')
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Show",
            descripcion: "Mostrar un centro no existente",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Centros Show",
            descripcion: "Mostrar un centro no existente",
            flag: true
          });

        }
      )

    this.gestionCentrosService.editCentro("123", "Centro A", "Ciudad A", "123", "99999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Edit",
            descripcion: "Editar centro con DNI de responsable incorrecto",
            flag: false
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Centros Edit",
            descripcion: "Editar centro con DNI de responsable incorrecto",
            flag: true
          });

        }
      )

    this.gestionCentrosService.editCentro("1", "Centro A", "", "12345678Z", "99999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Edit",
            descripcion: "Ciudad no valido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Centros Edit",
              descripcion: "Ciudad no válida",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Centros Edit",
              descripcion: "Ciudad no válida",
              flag: false
            });
          }
        }
      )

    this.gestionCentrosService.editCentro("1", "", "Ciudad", "12345678Z", "99999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Edit",
            descripcion: "Nombre no valido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Centros Edit",
              descripcion: "Nombre no válida",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Centros Edit",
              descripcion: "Nombre no válida",
              flag: false
            });
          }
        }
      )

    this.gestionCentrosService.editCentro("AAAAA", "Centro A", "Ciudad", "12345678Z", "99999")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Centros Edit",
            descripcion: "ID no valido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Centros Edit",
              descripcion: "ID no válido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Centros Edit",
              descripcion: "ID no válido",
              flag: false
            });
          }
        }
      )

    TestComponent.removeFakeCredentials();
  }

  private gestionUniversidadesTest() {

    TestComponent.initFakeCredentials();

    this.gestionUniversidadesService.addUniversidad("Universidade de Coruña", "Coruña", "12345678Z").subscribe(
      (id) => {
        this.tests.push({
          accion: "Gestion Universidades Add",
          descripcion: "Universidad añadida correctamente",
          flag: true
        });

        TestComponent.initFakeCredentials();

        this.gestionUniversidadesService.addUniversidad("Universidade de Coruña", "Coruña", "12345678Z").subscribe(
          () => {
            this.tests.push({
              accion: "Gestion Universidades Add",
              descripcion: "Add erroneo: universidad duplicada",
              flag: false
            });
          }, () => {
            this.tests.push({
              accion: "Gestion Universidades Add",
              descripcion: "Add erroneo: universidad duplicada",
              flag: true
            });


            TestComponent.initFakeCredentials();


            this.gestionUniversidadesService.editUniversidad(id, "Universidade de A Coruña", "A Coruña", "12345678Z").subscribe(
              () => {
                this.tests.push({
                  accion: "Gestion Universidades Edit",
                  descripcion: "Universidad Editada correctamente",
                  flag: true
                });

                TestComponent.initFakeCredentials();

                this.gestionUniversidadesService.editUniversidad(id, "Universidade de A Coruña", "A Coruña", "12345678Z").subscribe(
                  () => {
                    this.tests.push({
                      accion: "Gestion Universidades Edit",
                      descripcion: "Edit fallido por no realizar cambios",
                      flag: false
                    });
                  }, () => {
                    this.tests.push({
                      accion: "Gestion Universidades Edit",
                      descripcion: "Edit fallido por no realizar cambios",
                      flag: true
                    });
                    TestComponent.initFakeCredentials();

                    this.gestionUniversidadesService.show(id).subscribe(
                      () => {
                        this.tests.push({
                          accion: "Gestion Universidades Show",
                          descripcion: "Universidad mostrada correctamente",
                          flag: true
                        });

                        TestComponent.initFakeCredentials();

                        this.gestionUniversidadesService.deleteUniversidad(id).subscribe(
                          () => {
                            this.tests.push({
                              accion: "Gestion Universidades Delete",
                              descripcion: "Universidad borrada correctamente",
                              flag: true
                            });

                          }, () => {
                            this.tests.push({
                              accion: "Gestion Universidades Delete",
                              descripcion: "Universidad borrada correctamente",
                              flag: false
                            });

                          }
                        )
                        TestComponent.removeFakeCredentials();

                      }, () => {
                        this.tests.push({
                          accion: "Gestion Universidades Show",
                          descripcion: "Universidad mostrada correctamente",
                          flag: false
                        });

                      }
                    )
                    TestComponent.removeFakeCredentials();


                  })
                TestComponent.removeFakeCredentials();


              }, () => {
                this.tests.push({
                  accion: "Gestion Universidades Edit",
                  descripcion: "Universidad Editada correctamente",
                  flag: false
                });

              }
            )
            TestComponent.removeFakeCredentials();

          }
        )
        TestComponent.removeFakeCredentials();


      }, () => {
        this.tests.push({
          accion: "Gestion Universidades Add",
          descripcion: "Universidad añadida correctamente",
          flag: false
        });

      }
    )

    this.gestionUniversidadesService.addUniversidad("Universidade de Vigo", "Vigo", "88038211F").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Add",
          descripcion: "Error al añadir universidad por responsable no existente",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Universidades Add",
          descripcion: "Error al añadir universidad por responsable no existente",
          flag: true
        });

      }
    )

    this.gestionUniversidadesService.addUniversidad("", "Vigo", "12345678Z").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Add",
          descripcion: "Nombre no válido",
          flag: false
        });

      }, error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Universidades Add",
            descripcion: "Nombre no válido",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Universidades Add",
            descripcion: "Nombre no válido",
            flag: false
          });
        }


      }
    )

    this.gestionUniversidadesService.addUniversidad("Uvigo", "", "12345678Z").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Add",
          descripcion: "Ciudad no válida",
          flag: false
        });

      }, error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Universidades Add",
            descripcion: "Ciudad no válida",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Universidades Add",
            descripcion: "Ciudad no válida",
            flag: false
          });
        }


      }
    )


    this.gestionUniversidadesService.addUniversidad("Universidade de Vigo", "Vigo", "88038211").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Add",
          descripcion: "Error al añadir universidad por DNI de responsable mal formado",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Universidades Add",
          descripcion: "Error al añadir universidad por DNI de responsable mal formado",
          flag: true
        });

      }
    )

    this.gestionUniversidadesService.mostrarTodas().subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Showall",
          descripcion: "Se muestran todas las universidades",
          flag: true
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Universidades Showall",
          descripcion: "Se muestran todas las universidades",
          flag: false
        });

      }
    )

    this.gestionUniversidadesService.deleteUniversidad("99999").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Delete",
          descripcion: "Error al borrar porque no existe universidad",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Universidades Delete",
          descripcion: "Error al borrar porque no existe universidad",
          flag: true
        });

      }
    )

    this.gestionUniversidadesService.show("99999").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Show",
          descripcion: "Error al mostrar porque no existe universidad",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Universidades Show",
          descripcion: "Error al mostrar porque no existe universidad",
          flag: true
        });

      }
    )

    this.gestionUniversidadesService.editUniversidad("11111111", "Universidade de A Coruña", "A Coruña", "12345678Z").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Edit",
          descripcion: "Error al editar porque no existe universidad",
          flag: false
        });

      }, () => {
        this.tests.push({
          accion: "Gestion Universidades Edit",
          descripcion: "Error al editar porque no existe universidad",
          flag: true
        });

      }
    )

    this.gestionUniversidadesService.editUniversidad("AAA", "Universidade de A Coruña", "A Coruña", "12345678Z").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Edit",
          descripcion: "ID no valido",
          flag: false
        });

      }, error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Universidades Edit",
            descripcion: "ID no valido",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Universidades Edit",
            descripcion: "ID no valido",
            flag: false
          });
        }
      }
    )

    this.gestionUniversidadesService.editUniversidad("1", "", "A Coruña", "12345678Z").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Edit",
          descripcion: "Nombre no valido",
          flag: false
        });

      }, error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Universidades Edit",
            descripcion: "Nombre no valido",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Universidades Edit",
            descripcion: "Nombre no valido",
            flag: false
          });
        }
      }
    )

    this.gestionUniversidadesService.editUniversidad("1", "Universidade de A Coruña", "", "12345678Z").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Edit",
          descripcion: "Ciudad no valida",
          flag: false
        });

      }, error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Universidades Edit",
            descripcion: "Ciudad no valida",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Universidades Edit",
            descripcion: "Ciudad no valida",
            flag: false
          });
        }
      }
    )

    this.gestionUniversidadesService.editUniversidad("1", "Universidade de A Coruña", "A Coruña", "12345678A").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Universidades Edit",
          descripcion: "DNI no valido",
          flag: false
        });

      }, error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Universidades Edit",
            descripcion: "DNI no valido",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Universidades Edit",
            descripcion: "DNI no valido",
            flag: false
          });
        }
      }
    )

    TestComponent.removeFakeCredentials();

  }

  private gestionEdificiosTest() {
    TestComponent.initFakeCredentials();

    this.gestionEdificiosService.addEdificio("Miralles", "Vigo", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Edificios Add",
            descripcion: "Edificio añadido correctamente",
            flag: true
          });

          TestComponent.initFakeCredentials();
          this.gestionEdificiosService.addEdificio("Miralles", "Vigo", "1")
            .subscribe(
              id => {
                this.tests.push({
                  accion: "Gestion Edificios Add",
                  descripcion: "Edificio duplicado",
                  flag: false
                });
              }, () => {
                this.tests.push({
                  accion: "Gestion Edificios Add",
                  descripcion: "Edificio duplicado",
                  flag: true
                });
                TestComponent.initFakeCredentials();
                this.gestionEdificiosService.editEdificio(id, "Miralles", "Pontevedra", "1").subscribe(
                  () => {
                    this.tests.push({
                      accion: "Gestion Edificios Edit",
                      descripcion: "Edificio editado correctamente",
                      flag: true
                    });

                    TestComponent.initFakeCredentials();
                    this.gestionEdificiosService.show(id)
                      .subscribe(
                        () => {
                          this.tests.push({
                            accion: "Gestion Edificios Show",
                            descripcion: "Edificio mostrado correctamente",
                            flag: true
                          });

                          TestComponent.initFakeCredentials();
                          this.gestionEdificiosService.deleteEdificio(id)
                            .subscribe(
                              () => {
                                this.tests.push({
                                  accion: "Gestion Edificios Delete",
                                  descripcion: "Edificio eliminado correctamente",
                                  flag: true
                                });
                              }, () => {
                                this.tests.push({
                                  accion: "Gestion Edificios Delete",
                                  descripcion: "Edificio eliminado correctamente",
                                  flag: false
                                });
                              }
                            )
                          TestComponent.removeFakeCredentials();
                        }, () => {
                          this.tests.push({
                            accion: "Gestion Edificios Show",
                            descripcion: "Edificio mostrado correctamente",
                            flag: false
                          });
                        }
                      )
                    TestComponent.removeFakeCredentials();
                  },
                  () => {
                    this.tests.push({
                      accion: "Gestion Edificios Edit",
                      descripcion: "Edificio editado correctamente",
                      flag: false
                    });
                  });
                TestComponent.removeFakeCredentials();
              }
            )
          TestComponent.removeFakeCredentials();
        }, () => {
          this.tests.push({
            accion: "Gestion Edificios Add",
            descripcion: "Edificio añadido correctamente",
            flag: false
          });
        }
      )

    this.gestionEdificiosService.show("0")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Edificios Show",
            descripcion: "Edificio inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4005') {
            this.tests.push({
              accion: "Gestion Edificios Show",
              descripcion: "Edificio inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Edificios Show",
              descripcion: "Edificio inexistente",
              flag: false
            });
          }

        }
      )

    this.gestionEdificiosService.addEdificio("Miralles-21", "Vigo", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Edificios Add",
            descripcion: "Nombre no válido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Edificios Add",
              descripcion: "Nombre no válido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Edificios Add",
              descripcion: "Nombre no válido",
              flag: false
            });
          }

        }
      )

    this.gestionEdificiosService.addEdificio("Miralles", "Vigo-Pontevedra", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Edificios Add",
            descripcion: "Ubicación no válida",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Edificios Add",
              descripcion: "Ubicación no válida",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Edificios Add",
              descripcion: "Ubicación no válida",
              flag: false
            });
          }

        }
      )

    this.gestionEdificiosService.editEdificio("-1", "Miralles", "Vigo", "-1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Edificios Edit",
            descripcion: "Universidad inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Edificios Edit",
              descripcion: "Universidad inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Edificios Edit",
              descripcion: "Universidad inexistente",
              flag: false
            });
          }

        }
      )

    this.gestionEdificiosService.editEdificio("1", "Miralles$$$$", "Vigo", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Edificios Edit",
            descripcion: "Nombre no válido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Edificios Edit",
              descripcion: "Nombre no válido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Edificios Edit",
              descripcion: "Nombre no válido",
              flag: false
            });
          }
        }
      )

    this.gestionEdificiosService.editEdificio("1", "Miralles", "Vigo$$$", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Edificios Edit",
            descripcion: "Ubicación no válida",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Edificios Edit",
              descripcion: "Ubicación no válida",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Edificios Edit",
              descripcion: "Ubicación no válida",
              flag: false
            });
          }

        }
      )

    this.gestionEdificiosService.addEdificio("Miralles", "Vigo", "-1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Edificios Add",
            descripcion: "Universidad inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Edificios Add",
              descripcion: "Universidad inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Edificios Add",
              descripcion: "Universidad inexistente",
              flag: false
            });
          }
        }
      )

    this.gestionEdificiosService.deleteEdificio("-1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Edificios Delete",
            descripcion: "Edificio inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Edificios Delete",
              descripcion: "Edificio inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Edificios Delete",
              descripcion: "Edificio inexistente",
              flag: true
            });
          }

        }
      )

    this.gestionEdificiosService.mostrarTodos()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Edificios Showall",
            descripcion: "Edificios mostrados correctamente",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Edificios Delete",
            descripcion: "Edificios mostrados correctamente",
            flag: false
          });
        }
      )

    TestComponent.removeFakeCredentials();
  }

  private gestionEspaciosTest() {
    TestComponent.initFakeCredentials();

    this.gestionEspaciosService.addAEspacio("D304", "Despacho", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Espacios Add",
            descripcion: "Espacio añadido correctamente",
            flag: true
          });

          TestComponent.initFakeCredentials();
          this.gestionEspaciosService.addAEspacio("D304", "Despacho", "1")
            .subscribe(
              id => {
              }, error => {
                if (error.message == '4002') {
                  this.tests.push({
                    accion: "Gestion Espacios Add",
                    descripcion: "Espacio duplicado",
                    flag: true
                  });
                } else {
                  this.tests.push({
                    accion: "Gestion Espacios Add",
                    descripcion: "Espacio duplicado",
                    flag: false
                  });
                }

                TestComponent.initFakeCredentials();
                this.gestionEspaciosService.editEspacio(id, "D305", "Despacho", "1").subscribe(
                  () => {
                    this.tests.push({
                      accion: "Gestion Espacios Edit",
                      descripcion: "Espacio editado correctamente",
                      flag: true
                    });

                    TestComponent.initFakeCredentials();
                    this.gestionEspaciosService.show(id)
                      .subscribe(
                        () => {
                          this.tests.push({
                            accion: "Gestion Espacios Show",
                            descripcion: "Espacio mostrado correctamente",
                            flag: true
                          });

                          TestComponent.initFakeCredentials();
                          this.gestionEspaciosService.deleteEspacio(id)
                            .subscribe(
                              () => {
                                this.tests.push({
                                  accion: "Gestion Espacios Delete",
                                  descripcion: "Espacio eliminado correctamente",
                                  flag: true
                                });
                              }, () => {
                                this.tests.push({
                                  accion: "Gestion Espacios Delete",
                                  descripcion: "Espacio eliminado correctamente",
                                  flag: false
                                });
                              }
                            )
                          TestComponent.removeFakeCredentials();
                        }, () => {
                          this.tests.push({
                            accion: "Gestion Espacios Show",
                            descripcion: "Espacio mostrado correctamente",
                            flag: false
                          });
                        }
                      )
                    TestComponent.removeFakeCredentials();
                  },
                  () => {
                    this.tests.push({
                      accion: "Gestion Espacios Edit",
                      descripcion: "Espacio editado correctamente",
                      flag: false
                    });
                  });
                TestComponent.removeFakeCredentials();
              }
            )
          TestComponent.removeFakeCredentials();
        }, () => {
          this.tests.push({
            accion: "Gestion Espacios Add",
            descripcion: "Espacio añadido correctamente",
            flag: false
          });
        }
      )

    this.gestionEspaciosService.show("-1")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Espacios Show",
            descripcion: "Espacio inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Espacios Show",
              descripcion: "Espacio inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Espacios Show",
              descripcion: "Espacio inexistente",
              flag: true
            });
          }

        }
      )

    this.gestionEspaciosService.addAEspacio("D-304", "Despacho", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Espacios Add",
            descripcion: "Nombre no válido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Espacios Add",
              descripcion: "Nombre no válido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Espacios Add",
              descripcion: "Nombre no válido",
              flag: false
            });
          }

        }
      )

    this.gestionEspaciosService.addAEspacio("D304", "Aula-Despacho", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Espacios Add",
            descripcion: "Tipo no válido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Espacios Add",
              descripcion: "Tipo no válido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Espacios Add",
              descripcion: "Tipo no válido",
              flag: false
            });
          }


        }
      )

    this.gestionEspaciosService.editEspacio("1", "D304", "Aula", "65749877")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Espacios Edit",
            descripcion: "Edificio inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Espacios Edit",
              descripcion: "Edificio inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Espacios Edit",
              descripcion: "Edificio inexistente",
              flag: false
            });
          }

        }
      )

    this.gestionEspaciosService.editEspacio("1", "D304asd$", "Aula", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Espacios Edit",
            descripcion: "Nombre no válido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Espacios Edit",
              descripcion: "Nombre no válido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Espacios Edit",
              descripcion: "Nombre no válido",
              flag: false
            });
          }

        }
      )

    this.gestionEspaciosService.editEspacio("1", "D304", "A$", "1")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Espacios Edit",
            descripcion: "Tipo no válido",
            flag: false
          });
        }, error => {
          if (error.message == '404') {
            this.tests.push({
              accion: "Gestion Espacios Edit",
              descripcion: "Tipo no válido",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Espacios Edit",
              descripcion: "Tipo no válido",
              flag: false
            });
          }

        }
      )

    this.gestionEspaciosService.addAEspacio("D304", "Aula", "987987")
      .subscribe(
        id => {
          this.tests.push({
            accion: "Gestion Espacios Add",
            descripcion: "Edificio inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4004') {
            this.tests.push({
              accion: "Gestion Espacios Add",
              descripcion: "Edificio inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Espacios Add",
              descripcion: "Edificio inexistente",
              flag: false
            });
          }

        }
      )

    this.gestionEspaciosService.deleteEspacio("0")
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Espacios Delete",
            descripcion: "Espacio inexistente",
            flag: false
          });
        }, error => {
          if (error.message == '4005') {
            this.tests.push({
              accion: "Gestion Espacios Delete",
              descripcion: "Espacio inexistente",
              flag: true
            });
          } else {
            this.tests.push({
              accion: "Gestion Espacios Delete",
              descripcion: "Espacio inexistente",
              flag: false
            });
          }

        }
      )

    this.gestionEspaciosService.mostrarTodas()
      .subscribe(
        () => {
          this.tests.push({
            accion: "Gestion Espacios Showall",
            descripcion: "Espacios mostrados correctamente",
            flag: true
          });
        }, () => {
          this.tests.push({
            accion: "Gestion Espacios Delete",
            descripcion: "Espacios mostrados correctamente",
            flag: false
          });
        }
      )

    TestComponent.removeFakeCredentials();
  }

  private gestionProfesoresTest() {
    TestComponent.initFakeCredentials();

    this.gestionProfesoresService.mostrarTodos().subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Showall",
          descripcion: "Showall valido",
          flag: true
        });
      },
      () => {
        this.tests.push({
          accion: "Gestion Profesores Showall",
          descripcion: "Showall valido",
          flag: false
        });
      }
    )

    this.gestionProfesoresService.show("12345678X").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Showcurrent",
          descripcion: "Profesor no existente",
          flag: false
        });
      },
      () => {
        this.tests.push({
          accion: "Gestion Profesores Showcurrent",
          descripcion: "Profesor no existente",
          flag: true
        });
      }
    )

    this.gestionProfesoresService.show("12345678Z").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Showcurrent",
          descripcion: "Showcurrent valido",
          flag: true
        });
      },
      () => {
        this.tests.push({
          accion: "Gestion Profesores Showcurrent",
          descripcion: "Showcurrent valido",
          flag: false
        });
      }
    )

    this.gestionProfesoresService.editProfesores("10800498C", "1", "TC").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Edit",
          descripcion: "Profesor no existente",
          flag: false
        });
      },
      error => {
        if (error.message == '4005') {
          this.tests.push({
            accion: "Gestion Profesores Edit",
            descripcion: "Profesor no existente",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Profesores Edit",
            descripcion: "Profesor no existente",
            flag: false
          });
        }

      }
    )

    this.gestionProfesoresService.deleteProfesor("10800498C").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Delete",
          descripcion: "Profesor no existente",
          flag: false
        });
      },
      error => {
        if (error.message == '4005') {
          this.tests.push({
            accion: "Gestion Profesores Delete",
            descripcion: "Profesor no existente",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Profesores Delete",
            descripcion: "Profesor no existente",
            flag: false
          });
        }

      }
    )

    this.gestionProfesoresService.addProfesor("10800498A", "1", "TC").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Add",
          descripcion: "DNI no valido",
          flag: false
        });
      },
      error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Profesores Add",
            descripcion: "DNI no valido",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Profesores Add",
            descripcion: "DNI no valido",
            flag: false
          });
        }

      }
    )

    this.gestionProfesoresService.addProfesor("10800498C", "AA", "TC").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Add",
          descripcion: "Departamento no valido",
          flag: false
        });
      },
      error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Profesores Add",
            descripcion: "Departamento no valido",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Profesores Add",
            descripcion: "Departamento no valido",
            flag: false
          });
        }

      }
    )

    this.gestionProfesoresService.addProfesor("10800498C", "1", "1234").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Add",
          descripcion: "Dedicación no valido",
          flag: false
        });
      },
      error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Profesores Add",
            descripcion: "Dedicación no valido",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Profesores Add",
            descripcion: "Dedicación no valido",
            flag: false
          });
        }

      }
    )

    this.gestionProfesoresService.addProfesor("10800498C", "1", "TC").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Profesores Add",
          descripcion: "Usuario no existente",
          flag: false
        });
      },
      error => {
        if (error.message == '4004') {
          this.tests.push({
            accion: "Gestion Profesores Add",
            descripcion: "Usuario no existente",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Profesores Add",
            descripcion: "Usuario no existente",
            flag: false
          });
        }

      }
    )

    this.gestionUsauriosService.addUsuario("86891434X", "Ejemplo", "Ejemplo", "ejemplo@esei.uvigo.es", "ejemplo")
      .subscribe(
        () => {
          TestComponent.initFakeCredentials();
          this.gestionProfesoresService.addProfesor("86891434X", "1", "TC").subscribe(
            () => {
              this.tests.push({
                accion: "Gestion Profesores Add",
                descripcion: "Add valido",
                flag: true
              });

              TestComponent.initFakeCredentials();

              this.gestionProfesoresService.editProfesores("86891434X", "1000", "TC").subscribe(
                () => {
                  this.tests.push({
                    accion: "Gestion Profesores Edit",
                    descripcion: "Departamento no existente",
                    flag: false
                  });
                },
                error => {
                  if (error.message == '4004') {
                    this.tests.push({
                      accion: "Gestion Profesores Edit",
                      descripcion: "Departamento no existente",
                      flag: true
                    });
                  } else {
                    this.tests.push({
                      accion: "Gestion Profesores Edit",
                      descripcion: "Departamento no existente",
                      flag: false
                    });
                  }
                }
              )

              this.gestionProfesoresService.editProfesores("86891434X", "AA", "TC").subscribe(
                () => {
                  this.tests.push({
                    accion: "Gestion Profesores Edit",
                    descripcion: "Departamento no valido",
                    flag: false
                  });
                },
                error => {
                  if (error.message == '404') {
                    this.tests.push({
                      accion: "Gestion Profesores Edit",
                      descripcion: "Departamento no valido",
                      flag: true
                    });
                  } else {
                    this.tests.push({
                      accion: "Gestion Profesores Edit",
                      descripcion: "Departamento no valido",
                      flag: false
                    });
                  }
                }
              )

              this.gestionProfesoresService.editProfesores("86891434X", "1", "AAAA").subscribe(
                () => {
                  this.tests.push({
                    accion: "Gestion Profesores Edit",
                    descripcion: "Dedicacion no valida",
                    flag: false
                  });
                },
                error => {
                  if (error.message == '404') {
                    this.tests.push({
                      accion: "Gestion Profesores Edit",
                      descripcion: "Dedicacion no valida",
                      flag: true
                    });
                  } else {
                    this.tests.push({
                      accion: "Gestion Profesores Edit",
                      descripcion: "Dedicacion no valida",
                      flag: false
                    });
                  }
                }
              )

              this.gestionProfesoresService.editProfesores("86891434A", "1", "AAAA").subscribe(
                () => {
                  this.tests.push({
                    accion: "Gestion Profesores Edit",
                    descripcion: "DNI no valido",
                    flag: false
                  });
                },
                error => {
                  if (error.message == '404') {
                    this.tests.push({
                      accion: "Gestion Profesores Edit",
                      descripcion: "DNI no valido",
                      flag: true
                    });
                  } else {
                    this.tests.push({
                      accion: "Gestion Profesores Edit",
                      descripcion: "DNI no valido",
                      flag: false
                    });
                  }
                }
              )


              this.gestionProfesoresService.addProfesor("86891434X", "1", "TC").subscribe(
                () => {
                  this.tests.push({
                    accion: "Gestion Profesores Add",
                    descripcion: "Profesor duplicado",
                    flag: false
                  });
                },
                error => {
                  this.tests.push({
                    accion: "Gestion Profesores Add",
                    descripcion: "Profesor duplicado",
                    flag: true
                  });
                  TestComponent.initFakeCredentials();
                  this.gestionProfesoresService.deleteProfesor("86891434X").subscribe(
                    () => {
                      this.tests.push({
                        accion: "Gestion Profesores Delete",
                        descripcion: "Delete valido",
                        flag: true
                      });
                      TestComponent.initFakeCredentials();
                      this.gestionUsauriosService.deleteUsuario("86891434X").subscribe();
                      TestComponent.removeFakeCredentials();
                    }, error1 => {
                      this.tests.push({
                        accion: "Gestion Profesores Delete",
                        descripcion: "Delete valido",
                        flag: false
                      });
                    }
                  )
                  TestComponent.removeFakeCredentials();
                }
              )
              TestComponent.removeFakeCredentials();

            },
            error => {
              this.tests.push({
                accion: "Gestion Profesores Add",
                descripcion: "Add valido",
                flag: false
              });
            }
          )
          TestComponent.removeFakeCredentials();
        }
      )


    TestComponent.removeFakeCredentials();
  }

  private gestionAnhoAcademicoTest() {
    TestComponent.initFakeCredentials();

    this.gestionAnhoAcademicoService.addAAcademico("19801981").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Años Academicos Add",
          descripcion: "Add válido",
          flag: true
        });

        TestComponent.initFakeCredentials();

        this.gestionAnhoAcademicoService.addAAcademico("19801981").subscribe(
          () => {
            this.tests.push({
              accion: "Gestion Años Academicos Add",
              descripcion: "Año repetido",
              flag: false
            });

          }, error => {
            if (error.message == '4002') {
              this.tests.push({
                accion: "Gestion Años Academicos Add",
                descripcion: "Año repetido",
                flag: true
              });
            } else {
              this.tests.push({
                accion: "Gestion Años Academicos Add",
                descripcion: "Año repetido",
                flag: false
              });
            }


            TestComponent.initFakeCredentials();

            this.gestionAnhoAcademicoService.deleteAAcademico("19801981").subscribe(
              () => {
                this.tests.push({
                  accion: "Gestion Años Academicos Delete",
                  descripcion: "Delete válido",
                  flag: true
                });
              },
              () => {
                this.tests.push({
                  accion: "Gestion Años Academicos Delete",
                  descripcion: "Delete válido",
                  flag: false
                });
              }
            )

            TestComponent.removeFakeCredentials();

          })

        TestComponent.removeFakeCredentials();

      }, () => {
        this.tests.push({
          accion: "Gestion Años Academicos Add",
          descripcion: "Add válido",
          flag: false
        });
      })

    this.gestionAnhoAcademicoService.addAAcademico("20002002").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Años Academicos Add",
          descripcion: "Año no válido",
          flag: false
        });

      }, error => {
        if (error.message == '404') {
          this.tests.push({
            accion: "Gestion Años Academicos Add",
            descripcion: "Año no válido",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Años Academicos Add",
            descripcion: "Año no válido",
            flag: false
          });
        }

      })

    this.gestionAnhoAcademicoService.deleteAAcademico("19001901").subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Años Academicos Delete",
          descripcion: "Año no existente",
          flag: false
        });
      },
      error => {
        if (error.message == '4005') {
          this.tests.push({
            accion: "Gestion Años Academicos Delete",
            descripcion: "Año no existente",
            flag: true
          });
        } else {
          this.tests.push({
            accion: "Gestion Años Academicos Delete",
            descripcion: "Año no existente",
            flag: false
          });
        }

      }
    )

    this.gestionAnhoAcademicoService.mostrartodos().subscribe(
      () => {
        this.tests.push({
          accion: "Gestion Años Academicos Showall",
          descripcion: "Showall valido",
          flag: true
        });
      },
      () => {
        this.tests.push({
          accion: "Gestion Años Academicos Showall",
          descripcion: "Showall valido",
          flag: false
        });
      }
    )


    TestComponent.removeFakeCredentials();
  }


  private static initFakeCredentials() {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJETkkiOiIxMjM0NTY3OFoifQ.A965i7M-G9NMX8FO38YTWcNxyVSleOfks7yHCL1hNp8";
    const acc_func = "{\"ACCION\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"FUNCIONALIDAD\":[\"ADD\",\"DELETE\",\"SHOWALL\"],\"ROL\":[\"ADD\",\"DELETE\",\"SHOWALL\"]}";
    const profile = "{\"dni\":\"12345678Z\",\"nombre\":\"ADMIN\",\"apellidos\":\"UVIGO\",\"email\":\"admin@uvigo.com\"}";

    localStorage.setItem('credentials', token);
    localStorage.setItem('acciones_funcionalidades', acc_func);
    localStorage.setItem('profile', profile);
  }

  private static removeFakeCredentials() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('acciones_funcionalidades');
    localStorage.removeItem('profile');
  }


}
