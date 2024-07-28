import { Component, OnInit } from '@angular/core';
import { ProductModel, ProductService } from '../../services/product-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateUpdateProductComponent } from '../create-update-product/create-update-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  standalone: true,
})
export class ProductListComponent implements OnInit {

  productArray: ProductModel[] = [];
  productCount!: number;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog

  ) { }
  ngOnInit(): void {
    this.getAllProductList();
    this.productService.refreshAfterCreate.subscribe(() => {
      this.getAllProductList();
    });
    this.productService.refreshAfterDelete.subscribe(() => {
      this.getAllProductList();
    });
    this.productService.refreshAfterUpdate.subscribe(() => {
      this.getAllProductList();
    });
  }
  getAllProductList() {
    const form = {
      click_from: 'list'
    }
    this.productService.listProduct(form).subscribe((data) => {
      this.productArray = data.results;
      this.productCount = this.productArray.length;
    })
  }

  deleteProduct(product_obj: any) {
    this.productService.deleteProduct({ product_id: product_obj.id }).subscribe((data) => {
      if (data.status === 200) {
        console.log(data.message);
      } else if (data.status === 204) {
        console.log(data.message)
      }
    }, (error) => {
      console.log("An error occurred.")
    })
  }
  editProduct(product_obj: any) {
    const dialogRef = this.dialog.open(CreateUpdateProductComponent, {
      data: {
        product_id: product_obj.id,
        product_obj: product_obj
      }
    });
  }
  addProduct() {
    const dialogRef = this.dialog.open(CreateUpdateProductComponent, {
      data: {
        product_id: 0,
        product_obj: {}
      }
    });
  }
}
