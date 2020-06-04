import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        LoginFormComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginFormComponent);
    });
  }));

  it('should create a username input', () => {
    const usernameControl = fixture.debugElement.query(By.css('#username-control'));
    expect(usernameControl).toBeTruthy();
  });

  it('should create a password input', () => {
    const passwordControl = fixture.debugElement.query(By.css('#password-control'));
    expect(passwordControl).toBeTruthy();
  });

  it('should update the form object when the input is typed in', () => {
    fixture.detectChanges();

    const usernameControl = fixture.debugElement.query(By.css('#username-control')).nativeElement;
    usernameControl.value = 'admin';
    usernameControl.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.form.value.username).toEqual('admin');
  });

  it('should emit a submit event with correct object when submit button is clicked', () => {
    const submitFormSpy = spyOn(fixture.componentInstance.submitForm, 'emit');

    fixture.detectChanges();

    const usernameControl = fixture.debugElement.query(By.css('#username-control')).nativeElement;
    usernameControl.value = 'admin';
    usernameControl.dispatchEvent(new Event('input'));

    const passwordControl = fixture.debugElement.query(By.css('#password-control')).nativeElement;
    passwordControl.value = 'password';
    passwordControl.dispatchEvent(new Event('input'));

    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    submitButton.click();

    expect(submitFormSpy).toHaveBeenCalledWith({ username: 'admin', password: 'password' });
  });
});
