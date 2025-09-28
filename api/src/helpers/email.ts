import Handlebars from 'handlebars';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';

export function registerHbsHelpers() {
    Handlebars.registerHelper('uppercase', (s: any) => String(s ?? '').toUpperCase());
    Handlebars.registerHelper('formatDate', (date: any, fmt: string, opts: any) => {
        const d = new Date(date);
        const localeStr = (opts?.data?.root?.locale ?? 'vi') as 'vi' | 'en';
        const locale = localeStr === 'en' ? enUS : vi;
        return isNaN(d.getTime()) ? '' : format(d, fmt, { locale });
    });
}