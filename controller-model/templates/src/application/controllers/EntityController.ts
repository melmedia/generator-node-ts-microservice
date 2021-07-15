import {
  BodyParam,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  OnUndefined,
  Param,
  Put,
  Post,
  QueryParam,
  Res,
} from 'routing-controllers';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { di, rejectNanParam } from '@melmedia/node-ts-framework';
import { queryIdArray } from '@melmedia/rest-client';

import * as forms from '../forms';
import * as models from '../../infrastructure/models';
import { <%= entityName %>View } from '../views/<%= entityName %>View';
import { Type } from '../../Type';

@JsonController('/<%= entityNameLower %>')
export class <%= entityName %>Controller {
  @di.inject(Type.<%= entityName %>DataRepository)
  protected <%= entityNameLower %>DataRepository!: Repository<models.<%= entityName %>>;

  /* tslint:disable:max-line-length */
  /**
   * @api {POST} /<%= entityNameLower %> Create <%= entityNameLower %>
   * @apiName Create
   * @apiGroup <%= entityName %>
   * @apiVersion 1.0.0
   *
   * @apiParam {Object} <%= entityNameLower %>
   * @apiParam {String} .firstName
   * @apiParam {String} .lastName
   * @apiParam {String} .email
   * @apiParam {Boolean} [.isDraft]
   *
   * @apiSuccess (201) {String} Location HTTP header with url for created resource
   * @apiSuccess (201) {Object} <%= entityNameLower %>
   * @apiSuccess (201) {String} <%= entityNameLower %>.id ID of created entity
   *
   * @apiError (400) {String} code BadRequest
   *
   * @apiExample {curl} Example:
   *   curl -v -X POST -H "Content-Type: application/json" --data-binary '{"<%= entityNameLower %>":{"firstName":"Ivan","lastName":"Ivanov","email":"test@example.com","isDraft":false}}' http://0.0.0.0:3000/<%= entityNameLower %>
   */

  /* tslint:enable:max-line-length */
  @Post('/')
  @HttpCode(201)
  public async create(
    @BodyParam('<%= entityNameLower %>', { required: true }) <%= entityNameLower %>Form: forms.Create<%= entityName %>,
    @Res() response: Response,
  ) {
    const <%= entityNameLower %> = plainToClass(models.<%= entityName %>, <%= entityNameLower %>Form);
    <%= entityNameLower %>.creationTime = <%= entityNameLower %>.updateTime = new Date;
    <%= entityNameLower %>.status = models.<%= entityName %>Status.Active;
    await this.<%= entityNameLower %>DataRepository.save(<%= entityNameLower %>);

    response.location(`/<%= entityNameLower %>/${<%= entityNameLower %>.id}`);
    return { <%= entityNameLower %>: (new <%= entityName %>View).one(<%= entityNameLower %>) };
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {PUT} /<%= entityNameLower %>/:id Update <%= entityNameLower %>
   * @apiName Update
   * @apiGroup <%= entityName %>
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id
   *
   * @apiParam {Object} <%= entityNameLower %>
   * @apiParam {String} .firstName
   * @apiParam {String} .lastName
   * @apiParam {String} .email
   *
   * @apiSuccess (204) {String} HttpStatusCode
   *
   * @apiError (400) {String} code BadRequest
   * @apiError (404) {String} code NotFound
   *
   * @apiExample {curl} Example:
   *   curl -v -X PUT -H "Content-Type: application/json" --data-binary '{"<%= entityNameLower %>":{"firstName":"Ivan","lastName":"Petrov","email":"test@example.com"}}' http://0.0.0.0:3000/<%= entityNameLower %>/1
   */

  /* tslint:enable:max-line-length */
  @Put('/:id')
  @OnUndefined(204)
  public async update(
    @Param('id') id: number,
    @BodyParam('<%= entityNameLower %>', { required: true }) <%= entityNameLower %>Form: forms.Update<%= entityName %>,
  ) {
    rejectNanParam('id', id);
    let <%= entityNameLower %> = await this.<%= entityNameLower %>DataRepository.findOne(id);

    if (!<%= entityNameLower %>) {
      throw new NotFoundError('No such <%= entityNameLower %>');
    }

    <%= entityNameLower %> = plainToClassFromExist(<%= entityNameLower %>, <%= entityNameLower %>Form);
    <%= entityNameLower %>.updateTime = new Date;

    await this.<%= entityNameLower %>DataRepository.save(<%= entityNameLower %>);
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {GET} /<%= entityNameLower %> List <%= entityNameLower %>s
   * @apiName List
   * @apiGroup <%= entityName %>
   * @apiVersion 1.0.0
   *
   * @apiParam {Boolean} [isDraft] Filter by isDraft
   * @apiParam {String} [id] filter list by IDs (comma-separated: 1,2,3)
   *
   * @apiSuccess {Object[]} <%= entityNameLower %>s
   * @apiSuccess {String} .firstName
   * @apiSuccess {String} .lastName
   * @apiSuccess {String} .email
   * @apiSuccess {Boolean} [.isDraft]
   *
   * @apiError (400) {String} code BadRequest
   *
   * @apiExample {curl} Example:
   *   curl -v http://0.0.0.0:3000/<%= entityNameLower %>
   */

  /* tslint:enable:max-line-length */
  @Get('/')
  public async list(
    @QueryParam('isDraft') isDraft?: boolean,
    @QueryParam('id') id?: string,
  ) {
    const queryBuilder = this.<%= entityNameLower %>DataRepository.createQueryBuilder('<%= entityNameLower %>');
    queryBuilder.where({ status: models.<%= entityName %>Status.Active });

    if (undefined !== isDraft) {
      queryBuilder.andWhere('"isDraft" = :isDraft', { isDraft });
    }

    if (undefined !== id) {
      queryBuilder.andWhere('id in (:id)', { id: queryIdArray(id) });
    }

    const <%= entityNameLower %>s = await queryBuilder
      .orderBy('"lastName"', 'ASC')
      .addOrderBy('"firstName"', 'ASC', 'NULLS FIRST')
      .addOrderBy('id', 'DESC', 'NULLS FIRST')
      .getMany();
    if (!<%= entityNameLower %>s.length) {
      return { <%= entityNameLower %>s: [] };
    }

    return { <%= entityNameLower %>s: (new <%= entityName %>View).index(<%= entityNameLower %>s) };
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {GET} /<%= entityNameLower %>/:id Get <%= entityNameLower %>
   * @apiName Get
   * @apiGroup <%= entityName %>
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id
   *
   * @apiSuccess {Object} <%= entityNameLower %>
   * @apiSuccess {String} .firstName
   * @apiSuccess {String} .lastName
   * @apiSuccess {String} .email
   * @apiSuccess {Boolean} [.isDraft]
   *
   * @apiError (404) {String} code NotFound
   *
   * @apiExample {curl} Example:
   *   curl -v http://0.0.0.0:3000/<%= entityNameLower %>/1
   */

  /* tslint:enable:max-line-length */
  @Get('/:id')
  public async get(@Param('id') id: number) {
    rejectNanParam('id', id);
    const <%= entityNameLower %> = await this.<%= entityNameLower %>DataRepository.findOne(id);
    if (!<%= entityNameLower %>) {
      throw new NotFoundError('No such <%= entityNameLower %>');
    }
    return { <%= entityNameLower %>: (new <%= entityName %>View).one(<%= entityNameLower %>) };
  }

}
