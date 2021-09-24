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
  Category,
  Article,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryArticleController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/articles', {
    responses: {
      '200': {
        description: 'Array of Category has many Article',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Article)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Article>,
  ): Promise<Article[]> {
    return this.categoryRepository.articles(id).find(filter);
  }

  @post('/categories/{id}/articles', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Article)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Article, {
            title: 'NewArticleInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) article: Omit<Article, 'id'>,
  ): Promise<Article> {
    return this.categoryRepository.articles(id).create(article);
  }

  @patch('/categories/{id}/articles', {
    responses: {
      '200': {
        description: 'Category.Article PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Article, {partial: true}),
        },
      },
    })
    article: Partial<Article>,
    @param.query.object('where', getWhereSchemaFor(Article)) where?: Where<Article>,
  ): Promise<Count> {
    return this.categoryRepository.articles(id).patch(article, where);
  }

  @del('/categories/{id}/articles', {
    responses: {
      '200': {
        description: 'Category.Article DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Article)) where?: Where<Article>,
  ): Promise<Count> {
    return this.categoryRepository.articles(id).delete(where);
  }
}
