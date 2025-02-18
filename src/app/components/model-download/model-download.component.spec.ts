import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelDownloadComponent } from './model-download.component';

describe('ModelDownloadComponent', () => {
  let component: ModelDownloadComponent;
  let fixture: ComponentFixture<ModelDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelDownloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
