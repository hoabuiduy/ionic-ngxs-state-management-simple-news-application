import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleState } from './core/states/articles/article.state';
import { NewsInterceptor } from './core/services/interceptor';
import { ArticleHeadlineState } from './core/states/article-headline/article-headline.state';
import { ArticleSourceState } from './core/states/article-source/article-source.state';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot([ArticleHeadlineState, ArticleState, ArticleSourceState])
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: NewsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
