import {MiddlewareSequence} from '@loopback/rest';

import {
  AuthenticateFn,
  AuthenticationBindings,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  FindRoute,
  HttpErrors,
  InvokeMethod,
  InvokeMiddleware,
  ParseParams,
  Reject,
  RequestContext,
  Send,
  SequenceActions,
  SequenceHandler,
} from '@loopback/rest';
import { RoleRepository } from './repositories/role.repository';
import { AuthorizationBindings, AuthorizeErrorKeys, AuthorizeFn, UserPermissionsFn } from 'loopback4-authorization';
import { User } from './models';
// ------------------------------------
export class MySequence implements SequenceHandler {
  constructor(
    
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,

    // ---- ADD THIS LINE ------
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,

    @repository(RoleRepository) public roleRepository: RoleRepository,
    @inject(AuthorizationBindings.AUTHORIZE_ACTION)
    protected checkAuthorisation: AuthorizeFn,
    @inject(AuthorizationBindings.USER_PERMISSIONS)
    private readonly getUserPermissions: UserPermissionsFn<string>,

  ) {}
  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      // - enable jwt auth -
      // call authentication action
      // ---------- ADD THIS LINE -------------
      const authUser: User | any = await this.authenticateRequest(request);

      const permissions = this.getUserPermissions(
        authUser.permissions,
        authUser.role.permissions,
      );

      const isAccessAllowed: boolean = await this.checkAuthorisation(
        permissions, // do authUser.permissions if using method #1
        request,
      );

      if (!authUser) {
        console.log(`Please Login`);
      } else {
        let role = await this.roleRepository.findById(authUser.role);

        const isAccessAllowed: boolean = await this.checkAuthorisation(
          role.permissions,
          request,
        );

        if (!isAccessAllowed) {
          throw new HttpErrors.Forbidden(AuthorizeErrorKeys.NotAllowedAccess);
        }
      }

      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      // ---------- ADD THIS SNIPPET -------------
      // if error is coming from the JWT authentication extension
      // make the statusCode 401
      if (
        err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        err.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(err, {statusCode: 401 /* Unauthorized */});
      }
      // ---------- END OF SNIPPET -------------
      this.reject(context, err);
    }
  }
}
