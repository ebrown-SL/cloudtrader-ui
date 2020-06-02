import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { HomeComponent } from './home.component';
import { AuthService } from '../auth/auth.service';
import { LogoutComponent } from '../logout/logout.component';
import { User } from '../shared/models/user.model';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceStub: Partial<AuthService>;

  let currentUserSubjectStub: BehaviorSubject<User>;

  beforeEach(async(() => {
    currentUserSubjectStub = new BehaviorSubject<User>(null);
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
    currentUserSubjectStub.next({ id: 0, username: 'username', balance: 0, token: '' });

    fixture.detectChanges();

    const currentUser = fixture.debugElement.query(By.css('#current-user')).nativeElement;
    expect(currentUser.textContent).toContain('username');
  });
});
