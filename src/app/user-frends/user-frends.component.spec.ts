import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFrendsComponent } from './user-frends.component';

describe('UserFrendsComponent', () => {
  let component: UserFrendsComponent;
  let fixture: ComponentFixture<UserFrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFrendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
