import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Article,
  Category,
} from '../models';
import {ArticleRepository} from '../repositories';

export class ArticleCategoryController {
  constructor(
    @repository(ArticleRepository)
    public articleRepository: ArticleRepository,
  ) { }

  @get('/articles/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to Article',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof Article.prototype.id,
  ): Promise<Category> {
    return this.articleRepository.category(id);
  }
}
