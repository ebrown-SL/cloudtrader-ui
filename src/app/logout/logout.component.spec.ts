import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { LogoutComponent } from './logout.component';
import { AuthService } from '../auth/auth.service';

describe('LogoutComponent', () => {
  let fixture: ComponentFixture<LogoutComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async(() => {
    authServiceStub = {};

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        LogoutComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LogoutComponent);
    });
  }));

  it('should call AuthService logout() method when button is clicked', () => {
    authServiceStub.logout = jasmine.createSpy();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(authServiceStub.logout).toHaveBeenCalled();
  });
});
