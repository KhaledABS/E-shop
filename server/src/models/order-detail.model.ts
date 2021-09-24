import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Article} from './article.model';
import {Order} from './order.model';

@model()
export class OrderDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  qty?: number;

  @belongsTo(() => Article)
  articleId: string;

  @belongsTo(() => Order)
  orderId: string;

  constructor(data?: Partial<OrderDetail>) {
    super(data);
  }
}

export interface OrderDetailRelations {
  // describe navigational properties here
}

export type OrderDetailWithRelations = OrderDetail & OrderDetailRelations;
