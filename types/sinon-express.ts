import { SinonStub } from 'sinon';
import { Response } from 'express';

export type SinonStubbedInstance<T> = {
  [P in keyof T]: T[P] extends (...args: infer A) => infer R ? SinonStub<A, R> : T[P];
};

export type StubbedResponse = SinonStubbedInstance<Response>;
