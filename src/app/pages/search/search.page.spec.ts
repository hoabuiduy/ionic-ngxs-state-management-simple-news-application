import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';
import { ArticleModel } from 'src/app/core/models/article.model';
import { GetArticleListAction, LoadMoreArticleListAction, SetArticleSourceAction } from 'src/app/core/states/articles/article.actions';
import { NavMock } from 'src/app/shared/mocks';

import { SearchPage } from './search.page';


fdescribe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPage],
      imports: [IonicModule.forRoot(),
      NgxsModule.forRoot()],
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#viewDetail', () => {
    const article: ArticleModel = {
      title: 'test',
      description: 'test'
    };
    spyOn(component.navCtrl, 'navigateForward');
    component.viewDetail(article);
    expect(component.navCtrl.navigateForward).toHaveBeenCalledWith(['tabs', 'search', 'articleDetail'], {
      state: {
        article
      },
    });
  })

  it('#search', () => {
    const event = {
      target: {
        value: 'abc'
      }
    }
    spyOn(component, 'getListArticle');
    component.search(event);
    expect(component.getListArticle).toHaveBeenCalledWith({
      q: 'abc',
      keyword: 'abc',
      page: 1
    })
    expect(component.triggerSearch).toEqual(true);
  })

  it('#onClearKeyword', () => {
    const filters = {
      q: '*',
      keyword: '',
      page: 1
    };
    component.triggerSearch = true;
    spyOn(component, 'getListArticle');
    component.onClearKeyword();
    expect(component.getListArticle).toHaveBeenCalledWith(filters)
    expect(component.triggerSearch).toEqual(false);
  })

  it('#doRefresh', () => {
    spyOn(component, 'getListArticle');
    spyOn(component.store, 'selectSnapshot').and.returnValue({
      keyword: 'abc'
    });
    component.doRefresh(null);
    expect(component.getListArticle).toHaveBeenCalledWith({
      keyword: 'abc',
      page: 1
    }, 'initial')
  })

  it('#loadMore', () => {
    spyOn(component.store, 'selectSnapshot').and.returnValue({
      keyword: 'abc'
    });
    spyOn(component, 'loadMoreArticle');

    component.loadMore(null);
    expect(component.loadMoreArticle).toHaveBeenCalledWith({
      keyword: 'abc'
    })
  })

  it('#disabeLoadMore', () => {
    spyOn(component.store, 'selectSnapshot').and.returnValue({
      code: 'error'
    });
    expect(component.disableLoadmore()).toEqual(true);
  })

  it('#getListArticle', () => {
    spyOn(component.store, 'dispatch');
    component.getListArticle({
      q: 'abc'
    });
    expect(component.store.dispatch).toHaveBeenCalledWith(new GetArticleListAction({
      ...{ q: 'abc' }
    }, 'loading'))
  })

  it('#loadMoreArticle', () => {
    spyOn(component.store, 'dispatch');
    component.loadMoreArticle({
      q: 'abc',
      page: 1
    });
    expect(component.store.dispatch).toHaveBeenCalledWith(new LoadMoreArticleListAction({
      q: 'abc',
      page: 2
    }))
  })

  it('#clearSource', () => {
    spyOn(component.store, 'dispatch');
    component.clearSource();
    expect(component.store.dispatch).toHaveBeenCalledWith(new SetArticleSourceAction(null));
  })

  it('#selectSource', () => {
    spyOn(component.navCtrl, 'navigateForward');
    component.selectSource();
    expect(component.navCtrl.navigateForward).toHaveBeenCalledWith(['tabs', 'category']);
  })
});
