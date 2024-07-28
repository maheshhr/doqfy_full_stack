import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.scss'
})
export class CreateUpdateProductComponent implements OnInit {
  productData: any;
  product_id!: number;
  title!: string;
  productForm!: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateProductComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.product_id = data.product_id;
    this.productData = data.product_obj;
  }
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
      price: new UntypedFormControl(''),
      iso_id: new UntypedFormControl(''),
      product_id: new UntypedFormControl(this.product_id),
    })
    if (Number(this.product_id) === 0) {
      this.title = 'Create Product';
    } else {
      this.title = 'Update Product';
      this.patchFormData(this.productData);
    }
  }
  patchFormData(data: any) {
    this.productForm.patchValue({
      name: data['name'],
      description: data['description'],
      price: data['price'],
      iso_id: data['iso_id'],
    })
  }
  createNewProduct() {
    this.productService.createProduct(this.productForm.value).subscribe((data) => {
      if (data.status === 201) {
        console.log(data.message);
        this.dialogRef.close();
      } else if (data.status === 205) {
        console.log(data.message);
      }
    })
  }
  updateExistingProduct() {
    this.productService.updateProduct(this.productForm.value).subscribe((data) => {
      if (data.status === 200) {
        console.log(data.message);
        this.dialogRef.close();
      } else if (data.status === 205) {
        console.log(data.message);
      }
    })
  }
}
