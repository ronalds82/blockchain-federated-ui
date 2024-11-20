import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelUploadComponent } from './model-upload.component';

describe('ModelUploadComponent', () => {
  let component: ModelUploadComponent;
  let fixture: ComponentFixture<ModelUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
