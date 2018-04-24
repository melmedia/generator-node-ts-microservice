import {
  BadRequestError,
  BodyParam,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  OnUndefined,
  Param,
  Patch,
  Post,
  QueryParam,
  Res,
} from 'routing-controllers';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { di, rejectNanParam } from '@c7s/node-ts-framework';
import { queryIdArray } from '@c7s/rest-client';
import { Create<%= entityName %>Form } from '../forms/Create<%= entityName %>Form';
import { <%= entityName %>, <%= entityName %>Status } from '../../infrastructure/models/<%= entityName %>';
import { <%= entityName %>View } from '../views/<%= entityName %>View';
import { Update<%= entityName %>Form } from '../forms/Update<%= entityName %>Form';
import { Type } from '../../Type';

@JsonController('/<%= entityNameLower %>')
export class <%= entityName %>Controller {
  @di.inject(Type.<%= entityName %>DataRepository)
  protected <%= entityNameLower %>DataRepository!: Repository<<%= entityName %>>;

  /* tslint:disable:max-line-length */
  /**
   * @api {POST} /<%= entityNameLower %> Create <%= entityNameLower %>
   * @apiName Create<%= entityName %>
   * @apiGroup <%= entityName %>
   * @apiVersion 1.0.0
   *
   * @apiParam {Object} <%= entityNameLower %>
   * @apiParam {String} .firstName
   * @apiParam {String} .lastName
   * @apiParam {String} .email
   * @apiParam {Number} [.coachId]
   * @apiParam {Number} [.nutritionistId]
   *
   * @apiSuccess (201) {String} Location HTTP header with url for created resource
   * @apiSuccess (201) {Object} <%= entityNameLower %>
   * @apiSuccess (201) {String} <%= entityNameLower %>.id ID of created entity
   *
   * @apiError (400) {String} code BadRequest
   *
   * @apiExample {curl} Example:
   *   curl -v -X POST -H "Content-Type: application/json" --data-binary '{"<%= entityNameLower %>":{"firstName":"Ivan","lastName":"Ivanov","email":"test@example.com"}}' http://127.0.0.1:3000/<%= entityNameLower %>
   */

  /* tslint:enable:max-line-length */
  @Post('/')
  @HttpCode(201)
  public async create(
    @BodyParam('<%= entityNameLower %>', { required: true }) <%= entityNameLower %>Form: Create<%= entityName %>Form,
    @Res() response: Response,
  ) {
    let <%= entityNameLower %> = plainToClass(<%= entityName %>, <%= entityNameLower %>Form);
    <%= entityNameLower %>.creationTime = <%= entityNameLower %>.updateTime = new Date;
    <%= entityNameLower %>.status = <%= entityName %>Status.AutoCoaching;
    <%= entityNameLower %> = await this.<%= entityNameLower %>DataRepository.save(<%= entityNameLower %>);

    response.location(`/<%= entityNameLower %>/${<%= entityNameLower %>.id}`);
    return { <%= entityNameLower %>: (new <%= entityName %>View).one(<%= entityNameLower %>) };
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {PATCH} /<%= entityNameLower %>/:id Update <%= entityNameLower %>
   * @apiName Update<%= entityName %>
   * @apiGroup <%= entityName %>
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id
   *
   * @apiParam {Object} <%= entityNameLower %> Can send only attributes you want to update
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
   *   curl -v -X PATCH -H "Content-Type: application/json" --data-binary '{"<%= entityNameLower %>":{"firstName":"Ivan","lastName":"Petrov","email":"test@example.com"}}' http://127.0.0.1:3000/<%= entityNameLower %>/1
   */

  /* tslint:enable:max-line-length */
  @Patch('/:id')
  @OnUndefined(204)
  public async update(
    @Param('id') id: number,
    @BodyParam('<%= entityNameLower %>', { required: true }) <%= entityNameLower %>Form: Update<%= entityName %>Form,
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
   * @apiName List<%= entityName %>s
   * @apiGroup <%= entityName %>
   * @apiVersion 1.0.0
   *
   * @apiParam {String=autoCoaching,assessment,coaching} [statusPreset] For assessment return <%= entityNameLower %>s in status: survey, preEating, eating, preCoaching.
   * For coaching return clients in status: coaching.
   * For autoCoaching return clients in status: autoCoaching.
   * @apiParam {Number} [coachId] Filter by coachId
   * @apiParam {Number} [nutritionistId] Filter by nutritionistId
   * @apiParam {Boolean} [isCoachEmpty] Filter by coach is not set
   * @apiParam {Boolean} [isCoachingPaid] Filter by coaching.isPaid
   * @apiParam {Boolean} [isNutritionistEmpty] Filter by nutritionist is not set
   * @apiParam {String} [id] filter list by IDs (comma-separated: 1,2,3)
   *
   * @apiSuccess {Object[]} <%= entityNameLower %>s
   * @apiSuccess {String} .firstName
   * @apiSuccess {String} .lastName
   * @apiSuccess {String} .email
   * @apiSuccess {Number} [.coachId]
   * @apiSuccess {Number} [.nutritionistId]
   * @apiSuccess {String=autoCoaching,survey,preEating,eating,preCoaching,coaching} .status
   *
   * @apiError (400) {String} code BadRequest
   *
   * @apiExample {curl} Example:
   *   curl -v http://127.0.0.1:3000/<%= entityNameLower %>
   */

  /* tslint:enable:max-line-length */
  @Get('/')
  public async list(
    @QueryParam('statusPreset') statusPreset?: 'assessment' | 'coaching' | 'autoCoaching',
    @QueryParam('coachId') coachId?: number,
    @QueryParam('isCoachEmpty') isCoachEmpty?: boolean,
    @QueryParam('nutritionistId') nutritionistId?: number,
    @QueryParam('isNutritionistEmpty') isNutritionistEmpty?: boolean,
    @QueryParam('id') id?: string,
  ) {
    const queryBuilder = this.<%= entityNameLower %>DataRepository.createQueryBuilder('<%= entityNameLower %>');

    if (statusPreset) {
      const statusFilterMap = {
        assessment: [
          <%= entityName %>Status.Survey,
          <%= entityName %>Status.PreEating,
          <%= entityName %>Status.Eating,
          <%= entityName %>Status.PreCoaching,
        ],
        coaching: [
          <%= entityName %>Status.Coaching,
        ],
        autoCoaching: [
          <%= entityName %>Status.AutoCoaching,
        ],
      };

      if (!statusFilterMap[statusPreset]) {
        throw new BadRequestError(`statusFilter must be one of assessment, coaching`);
      }

      queryBuilder.where('status in (:status)', { status: statusFilterMap[statusPreset] });
    }

    if (coachId || nutritionistId) {
      const whereSql: string[] = [];
      const whereParams: any = {};
      if (coachId) {
        whereSql.push(' "coachId" = :coachId ');
        whereParams.coachId = coachId;
      }
      if (nutritionistId) {
        whereSql.push(' "nutritionistId" = :nutritionistId ');
        whereParams.nutritionistId = nutritionistId;
      }

      queryBuilder.andWhere(`(${whereSql.join(' OR ')})`, whereParams);
    }
    if (isCoachEmpty) {
      queryBuilder.andWhere(`"coachId" is null`);
    }
    if (isNutritionistEmpty) {
      queryBuilder.andWhere(`"nutritionistId" is null`);
    }
    if (undefined !== id) {
      queryBuilder.andWhere(`"userId" in (:id)`, { id: queryIdArray(id) });
    }

    const <%= entityNameLower %>s = await queryBuilder
      .orderBy('"nutritionistId"', 'ASC', 'NULLS FIRST')
      .orderBy('"coachId"', 'ASC', 'NULLS FIRST')
      .getMany();
    if (!<%= entityNameLower %>s.length) {
      return { <%= entityNameLower %>s: [] };
    }

    return { <%= entityNameLower %>s: (new <%= entityName %>View).index(<%= entityNameLower %>s) };
  }

  /* tslint:disable:max-line-length */
  /**
   * @api {GET} /<%= entityNameLower %>/:id Get <%= entityNameLower %>
   * @apiName Get<%= entityName %>
   * @apiGroup <%= entityName %>
   * @apiVersion 1.0.0
   *
   * @apiParam {Number} id
   *
   * @apiSuccess {Object} <%= entityNameLower %>
   * @apiSuccess {String} .firstName
   * @apiSuccess {String} .lastName
   * @apiSuccess {String} .email
   * @apiSuccess {Number} [.coachId]
   * @apiSuccess {Number} [.nutritionistId]
   * @apiSuccess {String=autoCoaching,survey,preEating,eating,preCoaching,coaching} .status
   *
   * @apiError (404) {String} code NotFound
   *
   * @apiExample {curl} Example:
   *   curl -v http://127.0.0.1:3000/<%= entityNameLower %>/1
   */

  /* tslint:enable:max-line-length */
  @Get('/:id')
  public async get(@Param('id') id: number) {
    rejectNanParam('id', id);
    const <%= entityNameLower %> = await this.<%= entityNameLower %>DataRepository.findOne(id);
    if (!<%= entityNameLower %>) {
      throw new NotFoundError('No such <%= entityNameLower %>');
    }
    return { <%= entityNameLower %>: (new <%= entityName %>View).one(<%= entityNameLower %> as <%= entityName %>) };
  }

}
