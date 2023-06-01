import { PageLink } from './page-link';
import { Pagination } from './pagination';

export class SearchResults<T> {
    searchResults: T[];
    pagination: Pagination;
    pageLink: PageLink;
}