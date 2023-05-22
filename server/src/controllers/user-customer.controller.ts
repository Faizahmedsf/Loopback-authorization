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
  User,
  Customer,
} from '../models';
import {MyUserRepository} from '../repositories';

export class UserCustomerController {
  constructor(
    @repository(MyUserRepository) protected userRepository: MyUserRepository,
  ) { }

  @get('/users/{id}/customer', {
    responses: {
      '200': {
        description: 'User has one Customer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customer),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Customer>,
  ): Promise<Customer> {
    return this.userRepository.customer(id).get(filter);
  }

  @post('/users/{id}/customer', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomerInUser',
            exclude: ['id'],
            optional: ['userid']
          }),
        },
      },
    }) customer: Omit<Customer, 'id'>,
  ): Promise<Customer> {
    return this.userRepository.customer(id).create(customer);
  }

  @patch('/users/{id}/customer', {
    responses: {
      '200': {
        description: 'User.Customer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {partial: true}),
        },
      },
    })
    customer: Partial<Customer>,
    @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>,
  ): Promise<Count> {
    return this.userRepository.customer(id).patch(customer, where);
  }

  @del('/users/{id}/customer', {
    responses: {
      '200': {
        description: 'User.Customer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>,
  ): Promise<Count> {
    return this.userRepository.customer(id).delete(where);
  }
}
