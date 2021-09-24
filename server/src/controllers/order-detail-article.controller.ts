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
  Article,
} from '../models';
import {OrderDetailRepository} from '../repositories';

export class OrderDetailArticleController {
  constructor(
    @repository(OrderDetailRepository)
    public orderDetailRepository: OrderDetailRepository,
  ) { }

  @get('/order-details/{id}/article', {
    responses: {
      '200': {
        description: 'Article belonging to OrderDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Article)},
          },
        },
      },
    },
  })
  async getArticle(
    @param.path.string('id') id: typeof OrderDetail.prototype.id,
  ): Promise<Article> {
    return this.orderDetailRepository.article(id);
  }
}
