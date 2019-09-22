export function updateSchema(schema, { bias }) {
  if (bias) {
    return schema.map(el => el + 1);
  }
  if (!bias) {
    return schema.map(el => el - 1);
  }
  return schema;
}
