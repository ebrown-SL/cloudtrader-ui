import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { HomeComponent } from './home.component';
import { AuthService } from '../auth/auth.service';
import { LogoutComponent } from '../logout/logout.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceStub: Partial<AuthService>;

  let currentUserSubjectStub: BehaviorSubject<string>;

  beforeEach(async(() => {
    currentUserSubjectStub = new BehaviorSubject<string>('');
    authServiceStub = {
      currentUser: currentUserSubjectStub.asObservable()
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HomeComponent,
        LogoutComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
    });
  }));

  it('should display the name of the current user', () => {
    currentUserSubjectStub.next('username');

    fixture.detectChanges();

    const currentUser = fixture.debugElement.query(By.css('#current-user')).nativeElement;
    expect(currentUser.textContent).toContain('username');
  });
});
