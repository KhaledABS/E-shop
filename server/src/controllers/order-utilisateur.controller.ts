import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  Utilisateur,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderUtilisateurController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/utilisateur', {
    responses: {
      '200': {
        description: 'Utilisateur belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Utilisateur)},
          },
        },
      },
    },
  })
  async getUtilisateur(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<Utilisateur> {
    return this.orderRepository.utilisateur(id);
  }
}
