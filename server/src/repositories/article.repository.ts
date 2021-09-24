import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Article, ArticleRelations, Category, OrderDetail} from '../models';
import {CategoryRepository} from './category.repository';
import {OrderDetailRepository} from './order-detail.repository';

export class ArticleRepository extends DefaultCrudRepository<
  Article,
  typeof Article.prototype.id,
  ArticleRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof Article.prototype.id>;

  public readonly orderDetails: HasManyRepositoryFactory<OrderDetail, typeof Article.prototype.id>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('OrderDetailRepository') protected orderDetailRepositoryGetter: Getter<OrderDetailRepository>,
  ) {
    super(Article, dataSource);
    this.orderDetails = this.createHasManyRepositoryFactoryFor('orderDetails', orderDetailRepositoryGetter,);
    this.registerInclusionResolver('orderDetails', this.orderDetails.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
