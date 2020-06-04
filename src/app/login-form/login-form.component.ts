import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Credentials } from '../shared/models/credentials.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Input() buttonText;
  @Output() submitForm = new EventEmitter<Credentials>();

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    this.submitForm.emit(this.form.value);
  }
}
