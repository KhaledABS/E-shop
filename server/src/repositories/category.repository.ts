import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Category, CategoryRelations, Article} from '../models';
import {ArticleRepository} from './article.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly articles: HasManyRepositoryFactory<Article, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('ArticleRepository') protected articleRepositoryGetter: Getter<ArticleRepository>,
  ) {
    super(Category, dataSource);
    this.articles = this.createHasManyRepositoryFactoryFor('articles', articleRepositoryGetter,);
    this.registerInclusionResolver('articles', this.articles.inclusionResolver);
  }
}
