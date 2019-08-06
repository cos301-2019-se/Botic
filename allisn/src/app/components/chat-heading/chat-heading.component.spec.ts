import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHeadingComponent } from './chat-heading.component';

describe('ChatHeadingComponent', () => {
  let component: ChatHeadingComponent;
  let fixture: ComponentFixture<ChatHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
