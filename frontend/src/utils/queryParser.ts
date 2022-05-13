interface QueryObject {
  [index: string]: string;
}

export function queryParser(search: string): QueryObject {
  let queryObject: QueryObject = {};

  search
    .slice(1)
    .split("&")
    .forEach((query) => {
      const [key, value] = query.split("=");
      queryObject = { ...queryObject, [key]: value };
    });

  return queryObject;
}
