import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderDetail,
  Order,
} from '../models';
import {OrderDetailRepository} from '../repositories';

export class OrderDetailOrderController {
  constructor(
    @repository(OrderDetailRepository)
    public orderDetailRepository: OrderDetailRepository,
  ) { }

  @get('/order-details/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to OrderDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.string('id') id: typeof OrderDetail.prototype.id,
  ): Promise<Order> {
    return this.orderDetailRepository.order(id);
  }
}
