import { PagedResult } from "@/app/@types";
import { api } from "@/lib/api";
import queryString from 'query-string'
const prefix = '/api/books';

const bookCateRequest = {
    getList: (queryParams?: any) =>
        api.get<PagedResult<any>>(
            `${prefix}${queryParams
                ? `?${queryString.stringify(queryParams, {
                    skipNull: true,
                    skipEmptyString: true,
                })}`
                : ''
            }`
        ),
}

export default bookCateRequest;