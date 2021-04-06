import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        highlight: '#ffba08',
        heading_light: '#f5f8fa',
        heading_dark: '#47585B',
        info_light: '#dadada',
        info_dark: '#999999'
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins'
    },
    styles: {
        global: {
            body: {
                bg: '#F5F8FA'
            }
        }
    }
});
