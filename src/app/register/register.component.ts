import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]{6,12}$")]],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      address: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; } // function which will return the control  of the form

  register(){
    this.submitted = true;

    if (this.form.invalid){
      console.log('invalid form');
      return;
      
    }



    this.userService.registerUser(this.form.value).subscribe(res => {console.log(res)});
    console.log(this.form.value);
    
    this.router.navigate(['../login']);
    
  }

}
