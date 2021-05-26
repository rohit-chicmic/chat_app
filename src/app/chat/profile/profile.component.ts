import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  file: File = null;
  imgSrc: any;
  submitted = false;
  errorMsg: string = null;
  registerForm: FormGroup;
  defaultValue:any;

  constructor(private domSanitizer: DomSanitizer,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
    });
    this.registerForm.controls.proof.patchValue(this.defaultValue);
  }

  public onChange(event: Event): void {
    this.file = (event.target as HTMLInputElement).files[0];
    this.validateFile();
  }

  private validateFile() {
    if (this.file && this.file.type.startsWith('image/')) {
      this.imgSrc = URL.createObjectURL(this.file);
      this.imgSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(this.imgSrc);
    } else {
      this.file = null;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = null;

    if (this.registerForm.invalid) {
      return;
    }

    const data = new FormData();
    if (this.file) {
      data.append('imageUpload', this.file);
    }
    this.userService.uploadAvatar(data).subscribe(res => {
      console.log(res);
      
    });
    // this.userService.register(data).subscribe(() => {
    //   this.router.navigateByUrl('/chat')
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }, error => {
    //   this.errorMsg = error.error.message;
    // });

  }
}
