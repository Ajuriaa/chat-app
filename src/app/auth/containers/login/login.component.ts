import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({});
  public passwordType = 'password';
  public showPassword = false;

  constructor(
    private _router: Router,
    private readonly _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    //private _authenticationService: AuthMutations,
    private _authGuard: AuthGuard
  ) {
    if (this._authGuard.findToken()) {
      this._router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public togglePasswordVisibility(): void {
    this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password';
    this.showPassword = !this.showPassword;
  }
}
