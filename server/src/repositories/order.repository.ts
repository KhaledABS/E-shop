import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Order, OrderRelations, Utilisateur, OrderDetail} from '../models';
import {UtilisateurRepository} from './utilisateur.repository';
import {OrderDetailRepository} from './order-detail.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly utilisateur: BelongsToAccessor<Utilisateur, typeof Order.prototype.id>;

  public readonly orderDetails: HasManyRepositoryFactory<OrderDetail, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('UtilisateurRepository') protected utilisateurRepositoryGetter: Getter<UtilisateurRepository>, @repository.getter('OrderDetailRepository') protected orderDetailRepositoryGetter: Getter<OrderDetailRepository>,
  ) {
    super(Order, dataSource);
    this.orderDetails = this.createHasManyRepositoryFactoryFor('orderDetails', orderDetailRepositoryGetter,);
    this.registerInclusionResolver('orderDetails', this.orderDetails.inclusionResolver);
    this.utilisateur = this.createBelongsToAccessorFor('utilisateur', utilisateurRepositoryGetter,);
    this.registerInclusionResolver('utilisateur', this.utilisateur.inclusionResolver);
    // this.orderDetails = this.createHasManyRepositoryFactoryFor('orderDetails', orderDetailRepositoryGetter,);
    // this.registerInclusionResolver('orderDetails', this.orderDetails.inclusionResolver);
    // this.utilisateur = this.createBelongsToAccessorFor('utilisateur', utilisateurRepositoryGetter,);
    // this.registerInclusionResolver('utilisateur', this.utilisateur.inclusionResolver);
  }
}
