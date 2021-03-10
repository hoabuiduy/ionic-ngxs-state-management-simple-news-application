import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { IonicModule } from '@ionic/angular';
import { DataStateComponent } from './data-state/data-state.component';



@NgModule({
  declarations: [
    ArticleComponent,
    DataStateComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticleComponent,
    DataStateComponent
  ]
})
export class ComponentModule { }
