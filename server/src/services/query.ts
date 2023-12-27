import {Request} from 'express';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query: Request['query']) {
  const pageStr = typeof query.page === 'string' ? query.page : undefined;
  const limitStr = typeof query.limit === 'string' ? query.limit : undefined;

  const page =
    (pageStr && Math.abs(parseInt(pageStr, 10))) || DEFAULT_PAGE_NUMBER;
  const limit =
    (limitStr && Math.abs(parseInt(limitStr, 10))) || DEFAULT_PAGE_LIMIT;

  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

export {getPagination};
