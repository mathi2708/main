import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogmanagerComponent } from './logmanager.component';

describe('LogmanagerComponent', () => {
  let component: LogmanagerComponent;
  let fixture: ComponentFixture<LogmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogmanagerComponent]
    });
    fixture = TestBed.createComponent(LogmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
