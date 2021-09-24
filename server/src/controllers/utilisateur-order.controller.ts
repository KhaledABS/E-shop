import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Utilisateur,
  Order,
} from '../models';
import {UtilisateurRepository} from '../repositories';

export class UtilisateurOrderController {
  constructor(
    @repository(UtilisateurRepository) protected utilisateurRepository: UtilisateurRepository,
  ) { }

  @get('/utilisateurs/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Utilisateur has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.utilisateurRepository.orders(id).find(filter);
  }



  @patch('/utilisateurs/{id}/orders', {
    responses: {
      '200': {
        description: 'Utilisateur.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.utilisateurRepository.orders(id).patch(order, where);
  }

  @del('/utilisateurs/{id}/orders', {
    responses: {
      '200': {
        description: 'Utilisateur.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.utilisateurRepository.orders(id).delete(where);
  }
}
