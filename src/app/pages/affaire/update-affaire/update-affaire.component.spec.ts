import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAffaireComponent } from './update-affaire.component';

describe('UpdateAffaireComponent', () => {
  let component: UpdateAffaireComponent;
  let fixture: ComponentFixture<UpdateAffaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAffaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
