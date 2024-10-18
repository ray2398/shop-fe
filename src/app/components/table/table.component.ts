import { Component, OnInit } from '@angular/core';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  productCache: { [page: number]: any[] } = {};
  lastVisible: any = null;
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  searchTerm: string = '';
  dateStart: string = '';
  dateFinish: string = '';
  selectedCategory: string = '';
  errorDate: string = '';
  errorCategory: string = '';

  readonly dateMask: MaskitoOptions = {
    mask: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(private requestService: ProductsService) {}

  ngOnInit() {
    this.getAllProducts(1);
  }

  async getAllProducts(
    page: number,
    query: string = '',
    forceUpdate: boolean = false
  ) {
    if (!forceUpdate && this.productCache[page] && !query) {
      this.products = this.productCache[page];
      return;
    }

    const lastVisibleParam = page > 0 ? this.lastVisible : null;

    const response = await this.requestService
      .getProducts({ lastVisible: lastVisibleParam, search: query })
      .toPromise();

    const newProducts = response.products.results.filter(
      (product: any) =>
        !this.products.some(
          (existingProduct: any) => existingProduct.id === product.id
        )
    );

    if (!forceUpdate && newProducts.length === 0) {
      return;
    }
    this.productCache[page] = newProducts;
    this.totalPages = Math.ceil(
      response.products.totalProducts / this.itemsPerPage
    );
    this.lastVisible = response.products.lastVisibleId;
    this.products = this.productCache[page];
  }

  async updatePagination() {
    if (this.productCache[this.currentPage]) {
      this.products = this.productCache[this.currentPage];
    } else {
      if (this.searchTerm !== '') {
        await this.getAllProducts(this.currentPage, this.searchTerm, true);
      } else {
        await this.getAllProducts(this.currentPage, '', true);
      }
    }
  }

  async nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.updatePagination();
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.updatePagination();
    }
  }

  async filterItems(event: CustomEvent) {
    if (event.detail.value !== '') {
      const valSearch = event.detail.value.toLowerCase();
      this.reset();
      this.searchTerm = valSearch;
      await this.getAllProducts(1, valSearch, true);
    } else {
      this.reset();
      this.currentPage = 1;
      this.searchTerm = '';
      await this.getAllProducts(1, '', true);
    }
  }

  async searchFilters() {
    this.clearMessageError();
    if (this.isValidFilters()) {
    }
  }

  isValidFilters(): boolean {
    if (this.selectedCategory === '') {
      this.errorCategory = 'Selecciona una categoria';
      return false;
    }
    if (this.dateStart === '' && this.dateFinish === '') {
      this.errorDate = 'Ingresa las Fechas';
      return false;
    }
    return true;
  }

  clearMessageError() {
    this.errorCategory = '';
    this.errorDate = '';
  }

  reset() {
    this.productCache = [];
    this.lastVisible = null;
    this.totalPages = 0;
    this.products = [];
  }

  async resetFilters() {
    this.reset();
    this.clearMessageError();
    this.dateStart = '';
    this.dateFinish = '';
    this.selectedCategory = '';
    await this.getAllProducts(1, '', true);
  }
}
