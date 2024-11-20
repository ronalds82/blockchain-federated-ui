import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalModelsComponent } from './global-models.component';

describe('GlobalModelsComponent', () => {
  let component: GlobalModelsComponent;
  let fixture: ComponentFixture<GlobalModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
