import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseAIComponent } from './response-ai.component';

describe('ResponseAIComponent', () => {
  let component: ResponseAIComponent;
  let fixture: ComponentFixture<ResponseAIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseAIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
