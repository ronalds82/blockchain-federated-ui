import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HospitalSelectionComponent } from './hospital-selection.component';

describe('HospitalSelectionComponent', () => {
  let component: HospitalSelectionComponent;
  let fixture: ComponentFixture<HospitalSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
