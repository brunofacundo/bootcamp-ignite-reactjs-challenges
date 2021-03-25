import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: number | string | Date | null, pattern: string): string {
    if (!date) return '';

    let convertedDate: number | Date;

    if (typeof date === 'string') {
        convertedDate = parseISO(date);
    } else {
        convertedDate = date;
    }

    return format(convertedDate, pattern, { locale: ptBR });
}
