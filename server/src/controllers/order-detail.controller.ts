import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {OrderDetail} from '../models';
import {OrderDetailRepository} from '../repositories';

export class OrderDetailController {
  constructor(
    @repository(OrderDetailRepository)
    public orderDetailRepository : OrderDetailRepository,
  ) {}

  @post('/order-details')
  @response(200, {
    description: 'OrderDetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderDetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetail, {
            title: 'NewOrderDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    orderDetail: Omit<OrderDetail, 'id'>,
  ): Promise<OrderDetail> {
    return this.orderDetailRepository.create(orderDetail);
  }

  @get('/order-details/count')
  @response(200, {
    description: 'OrderDetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderDetail) where?: Where<OrderDetail>,
  ): Promise<Count> {
    return this.orderDetailRepository.count(where);
  }

  @get('/order-details')
  @response(200, {
    description: 'Array of OrderDetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderDetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderDetail) filter?: Filter<OrderDetail>,
  ): Promise<OrderDetail[]> {
    return this.orderDetailRepository.find(filter);
  }

  @patch('/order-details')
  @response(200, {
    description: 'OrderDetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetail, {partial: true}),
        },
      },
    })
    orderDetail: OrderDetail,
    @param.where(OrderDetail) where?: Where<OrderDetail>,
  ): Promise<Count> {
    return this.orderDetailRepository.updateAll(orderDetail, where);
  }

  @get('/order-details/{id}')
  @response(200, {
    description: 'OrderDetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderDetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderDetail>
  ): Promise<OrderDetail> {
    return this.orderDetailRepository.findById(id, filter);
  }

  @patch('/order-details/{id}')
  @response(204, {
    description: 'OrderDetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetail, {partial: true}),
        },
      },
    })
    orderDetail: OrderDetail,
  ): Promise<void> {
    await this.orderDetailRepository.updateById(id, orderDetail);
  }

  @put('/order-details/{id}')
  @response(204, {
    description: 'OrderDetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderDetail: OrderDetail,
  ): Promise<void> {
    await this.orderDetailRepository.replaceById(id, orderDetail);
  }

  @del('/order-details/{id}')
  @response(204, {
    description: 'OrderDetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderDetailRepository.deleteById(id);
  }
}
