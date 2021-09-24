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
  Order,
  OrderDetail,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderOrderDetailController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/order-details', {
    responses: {
      '200': {
        description: 'Array of Order has many OrderDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderDetail)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrderDetail>,
  ): Promise<OrderDetail[]> {
    return this.orderRepository.orderDetails(id).find(filter);
  }

  @post('/orders/{id}/order-details', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetail, {
            title: 'NewOrderDetailInOrder',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) orderDetail: Omit<OrderDetail, 'id'>,
  ): Promise<OrderDetail> {
    return this.orderRepository.orderDetails(id).create(orderDetail);
  }

  @patch('/orders/{id}/order-details', {
    responses: {
      '200': {
        description: 'Order.OrderDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetail, {partial: true}),
        },
      },
    })
    orderDetail: Partial<OrderDetail>,
    @param.query.object('where', getWhereSchemaFor(OrderDetail)) where?: Where<OrderDetail>,
  ): Promise<Count> {
    return this.orderRepository.orderDetails(id).patch(orderDetail, where);
  }

  @del('/orders/{id}/order-details', {
    responses: {
      '200': {
        description: 'Order.OrderDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrderDetail)) where?: Where<OrderDetail>,
  ): Promise<Count> {
    return this.orderRepository.orderDetails(id).delete(where);
  }
}
