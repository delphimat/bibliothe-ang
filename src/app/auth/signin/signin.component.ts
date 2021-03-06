import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  template: `
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2">
        <h2>Connexion</h2>
        <form [formGroup]="signInForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" class="form-control" formControlName="email">
          </div>
          <div class="form-group">
            <label for="email">Password</label>
            <input type="text" id="password" class="form-control" formControlName="password">
          </div>
          <button class="btn btn-primary" type="submit" [disabled]="signInForm.invalid">loggggin</button>
        </form>

        <p class="text-danger">
          {{errorMessage }}
        </p>

      </div>
    </div>
  `,
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
