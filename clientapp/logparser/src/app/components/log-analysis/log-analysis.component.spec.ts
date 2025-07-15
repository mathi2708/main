import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAnalysisComponent } from './log-analysis.component';

describe('LogAnalysisComponent', () => {
  let component: LogAnalysisComponent;
  let fixture: ComponentFixture<LogAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogAnalysisComponent]
    });
    fixture = TestBed.createComponent(LogAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
