import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeScanningDialogComponent } from './qrcode-scanning-dialog.component';

describe('QrcodeScanningDialogComponent', () => {
  let component: QrcodeScanningDialogComponent;
  let fixture: ComponentFixture<QrcodeScanningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeScanningDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeScanningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
