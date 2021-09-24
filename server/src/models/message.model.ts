import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Utilisateur} from './utilisateur.model';

@model()
export class Message extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  content?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @belongsTo(() => Utilisateur)
  utilisateurId: string;

  constructor(data?: Partial<Message>) {
    super(data);
  }
}

export interface MessageRelations {
  // describe navigational properties here
}

export type MessageWithRelations = Message & MessageRelations;
