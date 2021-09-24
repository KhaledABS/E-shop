import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Message,
  Utilisateur,
} from '../models';
import {MessageRepository} from '../repositories';

export class MessageUtilisateurController {
  constructor(
    @repository(MessageRepository)
    public messageRepository: MessageRepository,
  ) { }

  @get('/messages/{id}/utilisateur', {
    responses: {
      '200': {
        description: 'Utilisateur belonging to Message',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Utilisateur)},
          },
        },
      },
    },
  })
  async getUtilisateur(
    @param.path.string('id') id: typeof Message.prototype.id,
  ): Promise<Utilisateur> {
    return this.messageRepository.utilisateur(id);
  }
}
