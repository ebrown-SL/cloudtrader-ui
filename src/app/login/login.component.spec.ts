import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async(() => {
    authServiceStub = {};

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
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

    expect(fixture.componentInstance.loginForm.value.username).toEqual('admin');
  });

  it('should call AuthService login() method with correct object when submit button is clicked', () => {
    authServiceStub.login = jasmine.createSpy();

    fixture.detectChanges();

    const usernameControl = fixture.debugElement.query(By.css('#username-control')).nativeElement;
    usernameControl.value = 'admin';
    usernameControl.dispatchEvent(new Event('input'));

    const passwordControl = fixture.debugElement.query(By.css('#password-control')).nativeElement;
    passwordControl.value = 'password';
    passwordControl.dispatchEvent(new Event('input'));

    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    submitButton.click();

    expect(authServiceStub.login).toHaveBeenCalledWith({ username: 'admin', password: 'password' });
  });
});
