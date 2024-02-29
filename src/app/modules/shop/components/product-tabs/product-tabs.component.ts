import {Component, Input, OnInit} from '@angular/core';
import {Product, ProductFeaturesSection} from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit{
    @Input() withSidebar = false;
    @Input() tab: 'description'|'specification'|'reviews' = 'description';
    @Input() product: any;

    specification: ProductFeaturesSection[] = specification;
    reviews: Review[] = reviews;

    constructor() {
    }

    ngOnInit(): void {
    }
}
