import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ArticleHeadlineState } from './article-headline.state';
import { GetListArticleHeadlineAction, LoadMoreArticleHeadlienAction } from './article-headline.actions';
import { ArticleService } from '../../services/article.service';
import { articleListResponseMock } from 'src/app/shared/mocks';


describe('ArticleHeadline actions', () => {
  let store: Store;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('ArticleService', ['getArticleTopHeadlines']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ArticleHeadlineState])],
      providers: [
        {
          provide: ArticleService,
          useValue: spy
        }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;

  }));
  it('#getListArticleHealineAction', fakeAsync(() => {
    articleServiceSpy.getArticleTopHeadlines.and.returnValue(articleListResponseMock as any);
    store.dispatch(new GetListArticleHeadlineAction('loading'));
    tick();
    store.select(ArticleHeadlineState.articleHeadlines).subscribe(articles => {
      expect(articles).toBeTruthy();
      expect(articles).toContain(articleListResponseMock.data.articles[0]);
    })
  }));

  it('#loadMoreArticleHeadline', fakeAsync(() => {
    articleServiceSpy.getArticleTopHeadlines.and.returnValue(articleListResponseMock as any);
    store.dispatch(new LoadMoreArticleHeadlienAction());
    tick();
    expect(store.selectSnapshot(ArticleHeadlineState.status)).toEqual({
      code: 'success'
    });
    expect(store.selectSnapshot(ArticleHeadlineState.articleHeadlines).length).toEqual(10);
    expect(store.selectSnapshot(ArticleHeadlineState.filters).page).toEqual(2);
  }))

});
