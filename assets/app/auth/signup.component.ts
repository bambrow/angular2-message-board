
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.firstName,
      this.myForm.value.lastName
    );
    this.authService.signup(user).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z]+"),
        Validators.maxLength(32)
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z]+"),
        Validators.maxLength(32)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
        Validators.minLength(6),
        Validators.maxLength(64)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ])
    });
  }
}
