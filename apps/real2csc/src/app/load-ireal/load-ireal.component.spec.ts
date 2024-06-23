import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadIrealComponent } from './load-ireal.component';

describe('LoadIrealComponent', () => {
  let component: LoadIrealComponent;
  let fixture: ComponentFixture<LoadIrealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadIrealComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadIrealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
