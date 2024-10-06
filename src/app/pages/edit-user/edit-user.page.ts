import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  public form: FormGroup
  
  constructor(
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name:['', [], []],
      surname:['', [], []],
      email:['', [], []],
      userName:['', [], []],
      password:['', [], []]
    })
  }


  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.userService.getUserById(id).subscribe(
        {
          next:data=>{
            this.form.controls['name'].setValue(data.name);
            this.form.controls['surname'].setValue(data.surname);
            this.form.controls['email'].setValue(data.email);
            this.form.controls['userName'].setValue(data.userName);
            this.form.controls['password'].setValue(data.password);
            console.log(data)
          },
          error:err=>{err}
        }
      )
    }/**/
  }

  async saveUser() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id && this.form) {
      this.userService.updateUser(id, this.form.value).subscribe({
        next:data=>{
          console.log(data)
        },
        error:err=>{console.log(err)}
      })
      this.router.navigateByUrl('/');
    }
  }

}
