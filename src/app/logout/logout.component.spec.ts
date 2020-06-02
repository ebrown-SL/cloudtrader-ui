import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { LogoutComponent } from './logout.component';
import { AuthService } from '../auth/auth.service';

describe('LogoutComponent', () => {
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LogoutComponent
      ],
      providers: [
        AuthService
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LogoutComponent);
    });
  }));

  it('should call AuthService logout() method when button is clicked', () => {
    const logoutSpy = spyOn(fixture.debugElement.injector.get(AuthService), 'logout');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(logoutSpy).toHaveBeenCalled();
  });
});
