import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  public form:FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.required], []],
      surname: ['', [], []],
      email: ['', [Validators.required], []],
      userName: ['', [Validators.required], []],
      password: ['', [Validators.required], []],
      passwordConfirm: ['', Validators.required, []]
    });
  }

  ngOnInit() {
    this.form.reset()
  }
  
  goToLogin() {
    this.router.navigateByUrl('/login')
  }

  isvalidField(field:string):boolean | null {
    return this.form.controls[field].errors && this.form.controls[field].touched
  }

  /*async*/ register():void {
    if (this.form?.invalid) {
      this.form.markAllAsTouched()
      return console.log(this.form.value)
    }  else {
      this.authService.register(this.form.value).subscribe({
        next:data=>{
          console.log(this.form.value)
        }
      })
    }
    this.router.navigateByUrl('/login')
  }

}
