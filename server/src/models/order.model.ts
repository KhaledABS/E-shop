import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Utilisateur} from './utilisateur.model';
import {OrderDetail} from './order-detail.model';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  total?: number;

  @belongsTo(() => Utilisateur)
  utilisateurId?: string;

  @hasMany(() => OrderDetail)
  orderDetails?: OrderDetail[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
