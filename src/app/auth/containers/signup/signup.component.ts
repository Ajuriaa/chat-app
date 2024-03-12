import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from 'src/app/core/guards';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [AuthGuard],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup = new FormGroup({});

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
    this.signupForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
