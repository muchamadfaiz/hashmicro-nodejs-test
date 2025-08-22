export interface IPagination<T> {
  data: T[];
  meta: {
    page: {
      itemPerPage: number;
      currentPage: number;
      totalPages: number;
      totalData: number;
    };
  };
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
}
