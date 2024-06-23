import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IrealContentsComponent } from './ireal-contents.component';

describe('IrealContentsComponent', () => {
  let component: IrealContentsComponent;
  let fixture: ComponentFixture<IrealContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrealContentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IrealContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
