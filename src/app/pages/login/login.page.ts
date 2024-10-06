import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form:FormGroup

  constructor(
    private userService: UserService,
    private authservice: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      //name: '',
      //surname: '',
      username: ['', [Validators.required], []],
      password: ['', [Validators.required], []]
    });
  } 

  ionViewDidEnter(){
    this.form.controls['username'].setValue("");
    this.form.controls['password'].setValue("");
  }

  ngOnInit() {
    /*const nombre = this.activatedRoute.snapshot.paramMap.get('');
    if (nombre) {
      this.userService.getUserByName(nombre).subscribe(
        {
          next:data=>{this.user = data},
          error:err=>{}
        }
      )
    }*/
    this.form.reset()
  }

  isvalidField(field:string):boolean | null {
    return this.form.controls[field].errors && this.form.controls[field].touched
  }

  goRegisterUser(){
    this.router.navigateByUrl(`/registrar`)
  }

  /*async*/ login():void {
    if (this.form?.invalid) {
      this.form.markAllAsTouched()
      return console.log(this.form.value)
    } else {
      this.authservice.login(this.form.value).subscribe({
        next:data=>{
          this.router.navigateByUrl('home')
        },
        error:err=>{
          console.log(err);
        }
      })
    }
    
  }

}
