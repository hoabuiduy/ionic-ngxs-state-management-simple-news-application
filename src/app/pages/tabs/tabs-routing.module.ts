import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>  import('../home/home.module').then(m=>m.HomePageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('../category/category.module').then(m=>m.CategoryPageModule)
      },
      {
        path: 'search',
        loadChildren: () =>  import('../search/search.module').then(m=>m.SearchPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo:'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
