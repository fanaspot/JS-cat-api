export const sortAlphabeticallyByAsc = (a, b, dataIndex) =>
  a[dataIndex].localeCompare(b[dataIndex]);
export const sortAlphabeticallyByDesc = (a, b, dataIndex) =>
  b[dataIndex].localeCompare(a[dataIndex]);
