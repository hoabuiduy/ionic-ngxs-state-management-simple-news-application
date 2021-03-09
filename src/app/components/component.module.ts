import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticleComponent
  ]
})
export class ComponentModule { }
