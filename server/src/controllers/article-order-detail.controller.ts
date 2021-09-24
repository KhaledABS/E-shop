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
  Article,
  OrderDetail,
} from '../models';
import {ArticleRepository} from '../repositories';

export class ArticleOrderDetailController {
  constructor(
    @repository(ArticleRepository) protected articleRepository: ArticleRepository,
  ) { }

  @get('/articles/{id}/order-details', {
    responses: {
      '200': {
        description: 'Array of Article has many OrderDetail',
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
    return this.articleRepository.orderDetails(id).find(filter);
  }

  @post('/articles/{id}/order-details', {
    responses: {
      '200': {
        description: 'Article model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Article.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetail, {
            title: 'NewOrderDetailInArticle',
            exclude: ['id'],
            optional: ['articleId']
          }),
        },
      },
    }) orderDetail: Omit<OrderDetail, 'id'>,
  ): Promise<OrderDetail> {
    return this.articleRepository.orderDetails(id).create(orderDetail);
  }

  @patch('/articles/{id}/order-details', {
    responses: {
      '200': {
        description: 'Article.OrderDetail PATCH success count',
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
    return this.articleRepository.orderDetails(id).patch(orderDetail, where);
  }

  @del('/articles/{id}/order-details', {
    responses: {
      '200': {
        description: 'Article.OrderDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrderDetail)) where?: Where<OrderDetail>,
  ): Promise<Count> {
    return this.articleRepository.orderDetails(id).delete(where);
  }
}
