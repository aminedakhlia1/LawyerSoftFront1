import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTribunalComponent } from './list-tribunal.component';

describe('ListTribunalComponent', () => {
  let component: ListTribunalComponent;
  let fixture: ComponentFixture<ListTribunalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTribunalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTribunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
