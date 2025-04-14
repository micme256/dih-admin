export const arraysToOjects = (data) => {
    return data?.length ? data.slice(1).map(row =>
      Object.fromEntries(data[0].map((key, i) => [key, row[i]]))
    ) : [];
  };
  