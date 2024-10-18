import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableComponent } from './table.component';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpGenericService } from 'src/app/services/http-generic.service';
import { FormsModule } from '@angular/forms';
import { MaskitoDirective } from '@maskito/angular';
import { of } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let productsService: ProductsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        FormsModule,
        MaskitoDirective,
      ],
      providers: [ProductsService, HttpGenericService],
    }).compileComponents();

    productsService = TestBed.inject(ProductsService);
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const mockProducts = {
      products: {
        results: [
          {
            id: 1,
            nombre: 'Leche Descremada',
            fechaCaducidad: '10-11-2024',
            categoria: 'Lácteos',
          },
          {
            id: 2,
            nombre: 'Queso Gouda',
            fechaCaducidad: '05-12-2024',
            categoria: 'Lácteos',
          },
          {
            id: 3,
            nombre: 'Yogur Natural',
            fechaCaducidad: '20-10-2024',
            categoria: 'Lácteos',
          },
          {
            id: 4,
            nombre: 'Dr Pepper',
            fechaCaducidad: '10-04-2025',
            categoria: 'Refrescos',
          },
          {
            id: 5,
            nombre: 'Fresca',
            fechaCaducidad: '20-03-2025',
            categoria: 'Refrescos',
          },
          {
            id: 6,
            nombre: 'Manzanita Peñafiel',
            fechaCaducidad: '30-01-2025',
            categoria: 'Refrescos',
          },
        ],
        totalProducts: 6,
        lastVisibleId: 2,
      },
    };
    spyOn(productsService, 'getProducts').and.returnValue(of(mockProducts));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería devolver false si no se seleccionan filtros', () => {
    component.selectedCategory = '';
    component.dateStart = '';
    component.dateFinish = '';

    expect(component.isValidFilters()).toBeFalse();
    expect(component.errorCategory).toBe('Selecciona una categoria');
  });

  it('debería devolver false si la fecha de inicio es mayor a la fecha de finalización', () => {
    component.dateStart = '13-10-2023';
    component.dateFinish = '12-10-2023';

    expect(component.isValidFilters()).toBeFalse();
    expect(component.errorDate).toBe('La fecha de inicio no puede ser mayor a la fecha final');
  });

  it('debería aplicar filtros de categoría y fechas correctamente', async () => {
    const spy = spyOn(component, 'getAllProducts').and.callThrough();

    component.selectedCategory = 'Refrescos';
    component.dateStart = '01-10-2023';
    component.dateFinish = '15-10-2023';

    await component.searchFilters();

    expect(spy).toHaveBeenCalled();
    expect(component.products.length).toBe(6);
    expect(component.errorCategory).toBe('');
    expect(component.errorDate).toBe('');
  });

  it('debería paginar correctamente', async () => {
    component.totalPages = 3;
    await component.nextPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);

    await component.prevPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
  });

  it('debería aplicar filtro de búsqueda de texto', async () => {
    const mockEvent = { detail: { value: 'Manzanita Peñafiel' } } as CustomEvent;

    await component.filterItemsByText(mockEvent);
    fixture.detectChanges();

    expect(component.searchTerm).toBe('manzanita peñafiel');
    expect(component.products.length).toBe(6);
    expect(component.products[5].nombre).toBe('Manzanita Peñafiel');
  });

});
