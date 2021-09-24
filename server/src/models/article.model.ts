import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Category} from './category.model';
import {OrderDetail} from './order-detail.model';

@model()
export class Article extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  pictures?: string;

  @belongsTo(() => Category)
  categoryId: string;

  @hasMany(() => OrderDetail)
  orderDetails: OrderDetail[];

  constructor(data?: Partial<Article>) {
    super(data);
  }
}

export interface ArticleRelations {
  // describe navigational properties here
}

export type ArticleWithRelations = Article & ArticleRelations;
