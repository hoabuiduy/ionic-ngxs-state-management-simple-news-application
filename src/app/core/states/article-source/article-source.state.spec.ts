import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ArticleSourceState } from './article-source.state';
import { GetArticleSourceListAction } from './article-source.actions';
import { ArticleService } from '../../services/article.service';
import { ArticleSourceModel } from '../../models/article-source.model';
import { articleSourceListResponseMock } from 'src/app/shared/mocks';


describe('ArticleSource actions', () => {
  let store: Store;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('ArticleService', ['getArticleSources']);
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ArticleSourceState])],
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

  it('should get list article source', fakeAsync(() => {
    articleServiceSpy.getArticleSources.and.returnValue(articleSourceListResponseMock as any)
    store.dispatch(new GetArticleSourceListAction());
    tick();
    store.select(ArticleSourceState.articleSources).subscribe((items: ArticleSourceModel[]) => {
      expect(items).toEqual(articleSourceListResponseMock.data.sources);
    });
  }));

  it('should get status', () => {
    const status = store.selectSnapshot(ArticleSourceState.status);
    expect(status).toBeTruthy();
    expect(status).toEqual({
      code: 'initial'
    });
  })

});
