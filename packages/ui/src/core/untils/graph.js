import colors from '../constants/colors';

export const generateNodes = (schema, { width, height, prefix, bias }) => {
  const nodes = [];

  const offset = Math.round(width / (schema.length + 1));

  for (let i = 0; i < schema.length; i++) {
    const heightOffset = Math.round(height / (schema[i] + 1));
    for (let k = 0; k < schema[i]; k++) {
      const isBias = bias && k === schema[i] - 1;
      const isInputNeuron = !i && !isBias;
      const isOutNeuron = i === schema.length - 1 && !isBias;

      nodes.push({
        id: `node_${i}_${k}_${prefix}`,
        layer: i,
        index: k,
        label: {
          color: colors[i],
          isInputNeuron,
          isOutNeuron,
          isBias
        },
        position: {
          x: (i + 1) * offset,
          y: (k + 1) * heightOffset
        },
        size: {
          width: 20,
          height: 16
        }
      });
    }
  }

  return nodes;
};

export const generateEdges = (schema, prefix, learn, bias) => {
  const edges = [];
  const start = learn ? 0 : 1;
  const biasDiff = bias ? 1 : 0;
  const finish = learn ? schema.length : schema.length - 1;

  for (let i = start; i < finish; i++) {
    for (let k = 0; k < schema[i]; k++) {
      if (i + 1 < finish) {
        for (let j = 0; j < schema[i + 1] - biasDiff; j++) {
          edges.push({
            source: `node_${i}_${k}_${prefix}`,
            target: `node_${i + 1}_${j}_${prefix}`
          });
        }
      }
    }
  }

  return edges;
};
