export default {
  SIGMOID: {
    fn: x => 1 / (1 + Math.exp(-x)),
    dfn: x => x * (1 - x)
  }
};
