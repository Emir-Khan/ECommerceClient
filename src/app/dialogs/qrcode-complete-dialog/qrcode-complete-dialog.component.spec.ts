import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeCompleteDialogComponent } from './qrcode-complete-dialog.component';

describe('QrcodeCompleteDialogComponent', () => {
  let component: QrcodeCompleteDialogComponent;
  let fixture: ComponentFixture<QrcodeCompleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeCompleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeCompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
