import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextScraperComponent } from './text-scraper.component';

describe('TextScraperComponent', () => {
  let component: TextScraperComponent;
  let fixture: ComponentFixture<TextScraperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextScraperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextScraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
