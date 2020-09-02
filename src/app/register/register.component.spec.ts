import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { throwError, of } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AuthService } from '../auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { LogoutComponent } from '../home/logout/logout.component';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async(() => {
    authServiceStub = {};

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        RegisterComponent,
        LogoutComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(RegisterComponent);
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

    expect(fixture.componentInstance.registerForm.value.username).toEqual('admin');
  });

  it('should not submit the form if username field is empty', () => {
    const onSubmitSpy = spyOn(fixture.componentInstance, 'onSubmit');

    fixture.detectChanges();

    const passwordControl = fixture.debugElement.query(By.css('#password-control')).nativeElement;
    passwordControl.value = 'password';
    passwordControl.dispatchEvent(new Event('input'));

    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    submitButton.click();

    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('should not submit the form if password field is empty', () => {
    const onSubmitSpy = spyOn(fixture.componentInstance, 'onSubmit');

    fixture.detectChanges();

    const usernameControl = fixture.debugElement.query(By.css('#username-control')).nativeElement;
    usernameControl.value = 'admin';
    usernameControl.dispatchEvent(new Event('input'));

    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    submitButton.click();

    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('should submit the form if fields are valid', () => {
    const onSubmitSpy = spyOn(fixture.componentInstance, 'onSubmit');

    fixture.detectChanges();

    const usernameControl = fixture.debugElement.query(By.css('#username-control')).nativeElement;
    usernameControl.value = 'admin';
    usernameControl.dispatchEvent(new Event('input'));

    const passwordControl = fixture.debugElement.query(By.css('#password-control')).nativeElement;
    passwordControl.value = 'password';
    passwordControl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    submitButton.click();

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should display an error message if register is unsuccessful', () => {
    authServiceStub.register = () => throwError({ error: { message: 'Error message' } });

    fixture.componentInstance.onSubmit();
    fixture.detectChanges();

    const serverError = fixture.debugElement.query(By.css('#server-error')).nativeElement;
    expect(serverError).toBeTruthy();
  });

  it('should navigate to the homepage if register is successful', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    authServiceStub.register = () => of(new User());

    fixture.componentInstance.onSubmit();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalled();
  });
});
