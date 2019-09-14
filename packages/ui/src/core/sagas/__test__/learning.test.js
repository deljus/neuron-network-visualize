import { validateLearningFile } from '../learning';

describe('validateLearningFile', () => {
  const gen = validateLearningFile({});
  gen.next();
});
