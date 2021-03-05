import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPage } from './category.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryPage
      },
      {
        path: 'search',
        loadChildren: () => import('../category-search/category-search.module').then(m => m.CategorySearchPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule { }
