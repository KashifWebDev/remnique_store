import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../../../shared/interfaces/product";
import {ShopService} from "../../../../shared/api/shop.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-test-product',
  templateUrl: './test-product.component.html',
  styleUrls: ['./test-product.component.scss']
})
export class TestProductComponent implements OnInit {
    relatedProducts$!: Observable<Product[]>;

    product!: Product;
    layout: 'standard'|'columnar'|'sidebar' = 'standard';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    slug: string = '';

    constructor(
        private shop: ShopService,
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.slug = params['slug'];
        });
        this.route.data.subscribe(data => {
            this.layout = data['layout'] || this.layout;
            this.sidebarPosition = data['sidebarPosition'] || this.sidebarPosition;
            // this.product = data['product'];

            this.relatedProducts$ = this.shop.getRelatedProducts(data['product']);
        });

        this.http.get(environment.baseURL+`/frontend/products/slug/${this.slug}`).subscribe((res: any) => {
            console.log(res.data);
            this.product = res.data;
        });
    }
}
