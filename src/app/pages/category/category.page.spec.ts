import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ArticleSourceModel } from 'src/app/core/models/article-source.model';
import { GetArticleSourceListAction } from 'src/app/core/states/article-source/article-source.actions';
import { SetArticleSourceAction } from 'src/app/core/states/articles/article.actions';
import { ArticleState } from 'src/app/core/states/articles/article.state';

import { CategoryPage } from './category.page';
class NavMock {
  public navigateForward() {
  }
}
fdescribe('CategoryPage', () => {
  let component: CategoryPage;
  let fixture: ComponentFixture<CategoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPage],
      imports: [IonicModule.forRoot(),
      NgxsModule.forRoot()],
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#ngOnInit', fakeAsync(() => {
    spyOn(component, 'getArticleSources');
    component.ngOnInit();
    expect(component.getArticleSources).toHaveBeenCalled();
  }));

  it('#viewDetail', () => {
    spyOn(component.navCtrl, 'navigateForward');
    spyOn(component, 'setArticleSource');
    component.viewDetail({} as any);
    expect(component.navCtrl.navigateForward).toHaveBeenCalledWith(['tabs', 'search'])
    expect(component.setArticleSource).toHaveBeenCalled();
  })

  it('#getArticleSources', () => {
    const dispatchSpy = spyOn(TestBed.inject(Store), 'dispatch').and.returnValue(of());
    component.getArticleSources();
    expect(dispatchSpy).toHaveBeenCalledWith(new GetArticleSourceListAction());
  })

  it('#setArticleSource', () => {
    const source: ArticleSourceModel = {
      id: '0',
      name: 'abc'
    }
    const dispatchSpy = spyOn(TestBed.inject(Store), 'dispatch').and.returnValue(of());
    component.setArticleSource(source);
    expect(dispatchSpy).toHaveBeenCalledWith(new SetArticleSourceAction(source));
  })
});
