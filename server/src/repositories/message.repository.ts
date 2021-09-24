import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Message, MessageRelations, Utilisateur} from '../models';
import {UtilisateurRepository} from './utilisateur.repository';

export class MessageRepository extends DefaultCrudRepository<
  Message,
  typeof Message.prototype.id,
  MessageRelations
> {

  public readonly utilisateur: BelongsToAccessor<Utilisateur, typeof Message.prototype.id>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('UtilisateurRepository') protected utilisateurRepositoryGetter: Getter<UtilisateurRepository>,
  ) {
    super(Message, dataSource);
    this.utilisateur = this.createBelongsToAccessorFor('utilisateur', utilisateurRepositoryGetter,);
    this.registerInclusionResolver('utilisateur', this.utilisateur.inclusionResolver);
  }
}
