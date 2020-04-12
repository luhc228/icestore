import { convertEffects, convertActions } from '../../src/utils/converter';
import { Models, ModelEffects } from '../../src';
import { counterWithUnsupportEffects, counterWithUnsupportActions } from '../helpers/counter';

describe('utils/convert', () => {
  it('withUnsupportEffects', () => {
    const spy = jest.spyOn(console, "error");
    const models: Models = convertEffects({ counterWithUnsupportEffects });
    expect(spy).toHaveBeenCalled();
    const { counterWithUnsupportEffects: counter } = models;
    expect(Reflect.ownKeys(counter)).toEqual(['state', 'effects']);
    const effects = counter.effects as (dispatch: any) => ModelEffects<any>;
    expect(Reflect.ownKeys(effects(jest.fn))).toEqual(['incrementA']);
  });

  it('withUnsupportActions', () => {
    const spy = jest.spyOn(console, "error");
    const models: Models = convertActions({ counterWithUnsupportActions });
    expect(spy).toHaveBeenCalled();
    const { counterWithUnsupportActions: counter } = models;
    expect(Reflect.ownKeys(counter)).toEqual(['state', 'actions', 'reducers', 'effects']);

    const effects = counter.effects as (dispatch: any) => ModelEffects<any>;
    expect(Reflect.ownKeys(effects(jest.fn))).toEqual(['incrementA']);
  });
});