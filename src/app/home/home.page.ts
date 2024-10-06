import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public users: Observable<User[]> | undefined;

  userLogged:User|null = null;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public router: Router,
    public alertController: AlertController
  ) {
    this.authService.userLogged$.subscribe(user =>{
      this.userLogged = user;
    })
  }

  ngOnInit(): void {
    this.users = this.userService.getAll();
  }

  editUser(id?: string|undefined) {
    if (id == undefined) {
      this.router.navigateByUrl('/registrar')
    } else {
      this.router.navigateByUrl(`/edit-user/${id}`)
    }
  }

  refresh() {
    this.users = this.userService.getAll();
  }

  deleteUser(id:string):Observable<User>{
    return this.userService.deleteUser(id);
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  async presentAlertConfirm(u:User) {
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Quitar usuario',
      message: `¿Seguro que quieres eliminar este usuario`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Aceptar',
          handler: () => {
            if (u && u.id) {
              this.deleteUser(u.id).subscribe({
                next: data => {
                  this.refresh()
                },
                error:err=>{
                  console.log(err)
                }
              })
            }
          }
        }
      ]
    })
    await alert.present()
  }

}
