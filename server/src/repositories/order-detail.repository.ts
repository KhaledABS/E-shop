import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {OrderDetail, OrderDetailRelations, Article, Order} from '../models';
import {ArticleRepository} from './article.repository';
import {OrderRepository} from './order.repository';

export class OrderDetailRepository extends DefaultCrudRepository<
  OrderDetail,
  typeof OrderDetail.prototype.id,
  OrderDetailRelations
> {

  public readonly article: BelongsToAccessor<Article, typeof OrderDetail.prototype.id>;

  public readonly order: BelongsToAccessor<Order, typeof OrderDetail.prototype.id>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('ArticleRepository') protected articleRepositoryGetter: Getter<ArticleRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(OrderDetail, dataSource);
    this.order = this.createBelongsToAccessorFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
    this.article = this.createBelongsToAccessorFor('article', articleRepositoryGetter,);
    this.registerInclusionResolver('article', this.article.inclusionResolver);
  }
}
