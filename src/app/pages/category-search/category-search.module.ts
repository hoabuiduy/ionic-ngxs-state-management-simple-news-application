import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorySearchPageRoutingModule } from './category-search-routing.module';

import { CategorySearchPage } from './category-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorySearchPageRoutingModule
  ],
  declarations: [CategorySearchPage]
})
export class CategorySearchPageModule {}
