import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { EditTripComponent } from './edit-trip.component';

describe('EditTripComponent', () => {
  let component: EditTripComponent;
  let fixture: ComponentFixture<EditTripComponent>;

  beforeEach(async () => {
    localStorage.setItem('tripCode', 'GALR210214');
    await TestBed.configureTestingModule({
      imports: [EditTripComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with a form that requires every trip field', () => {
    expect(component).toBeTruthy();
    const form = (component as any).editForm;
    expect(form.get('name').hasError('required')).toBeTrue();
  });
});
