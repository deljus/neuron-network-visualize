import colors from '../constants/colors';

export const generateNodes = (schema, { width, height, prefix }) => {
  const nodes = [];

  const offset = Math.round(width / (schema.length + 1));

  for(let i = 0; i < schema.length; i++){
    const heightOffset = Math.round(height/(schema[i] + 1));
    for(let k = 0; k < schema[i]; k++){
      const isInputNeuron = !i;
      const isOutNeuron = i === schema.length - 1;
      nodes.push({
        id: `node_${i}_${k}_${prefix}`,
        layer: i,
        index: k,
        label: {
          color: colors[i],
          isInputNeuron,
          isOutNeuron,
        },
        position: {
          x: (i + 1) * offset,
          y: (k + 1) * heightOffset
        },
        size: {
          width: isInputNeuron ? 40 : 20,
          height: 16,
        }
      })
    }
  }

  return nodes;
};

export const generateEdges = (schema, prefix, learn) => {
  const edges = [];
  const start = learn ? 0 : 1;
  const finish = learn ? schema.length : schema.length - 1;

  for(let i = start; i < finish; i++){
    for(let k = 0; k < schema[i]; k++){
      if(i + 1 < finish){
        for(let j = 0; j < schema[i+1]; j++) {
          edges.push({
            source: `node_${i}_${k}_${prefix}`,
            target: `node_${i + 1}_${j}_${prefix}`
          })
        }
      }
    }
  }

  return edges;
};
