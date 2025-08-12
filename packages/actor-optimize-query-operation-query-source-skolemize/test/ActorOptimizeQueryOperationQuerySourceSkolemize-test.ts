import { KeysQueryOperation, KeysQuerySourceIdentify } from '@comunica/context-entries';
import { ActionContext, Bus } from '@comunica/core';
import { type Algebra, Factory } from 'sparqlalgebrajs';
import { ActorOptimizeQueryOperationQuerySourceSkolemize,
} from '../lib/ActorOptimizeQueryOperationQuerySourceSkolemize';
import { QuerySourceSkolemized } from '../lib/QuerySourceSkolemized';
import '@comunica/utils-jest';

const AF = new Factory();

describe('ActorOptimizeQueryOperationQuerySourceSkolemize', () => {
  let bus: any;
  let operationIn: Algebra.Operation;

  beforeEach(() => {
    bus = new Bus({ name: 'bus' });
    operationIn = AF.createNop();
  });

  describe('An ActorOptimizeQueryOperationQuerySourceSkolemize instance', () => {
    let actor: ActorOptimizeQueryOperationQuerySourceSkolemize;

    beforeEach(() => {
      actor = new ActorOptimizeQueryOperationQuerySourceSkolemize({ name: 'actor', bus });
    });

    it('should test', async() => {
      await expect(actor.test({ context: new ActionContext() })).resolves.toPassTestVoid();
    });

    describe('run', () => {
      it('with an empty context', async() => {
        const contextIn = new ActionContext();
        const { context: contextOut } = await actor.run({ context: contextIn, operation: operationIn });
        expect(contextOut).toEqual(new ActionContext({}));
      });

      it('with sources', async() => {
        const source1: any = {
          source: { referenceValue: 'S0' },
        };
        const source2: any = {
          source: { referenceValue: 'S1' },
          context: new ActionContext({ a: 'b' }),
        };
        const contextIn = new ActionContext({
          [KeysQueryOperation.querySources.name]: [
            source1,
            source2,
          ],
        });
        const { context: contextOut } = await actor.run({ context: contextIn, operation: operationIn });

        expect(contextOut).toEqual(new ActionContext({
          [KeysQuerySourceIdentify.sourceIds.name]: new Map([
            [ 'S0', '0' ],
            [ 'S1', '1' ],
          ]),
          [KeysQueryOperation.querySources.name]: [
            {
              source: new QuerySourceSkolemized(source1.source, '0'),
            },
            {
              source: new QuerySourceSkolemized(source2.source, '1'),
              context: new ActionContext({ a: 'b' }),
            },
          ],
        }));
      });
    });
  });
});
