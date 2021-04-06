import { Flex, Text, Image, useBreakpointValue, Box } from '@chakra-ui/react';

const categories = [
    { icon: '/category/cocktail.svg', label: 'vida noturna' },
    { icon: '/category/surf.svg', label: 'praia' },
    { icon: '/category/building.svg', label: 'moderno' },
    { icon: '/category/museum.svg', label: 'clássico' },
    { icon: '/category/earth.svg', label: 'e mais...' }
];

export function Category() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    });

    return (
        <Flex
            w="100%"
            maxW={1480}
            mx="auto"
            mt={[12, 16]}
            p="4"
            align="center"
            justify={{ base: 'space-around', lg: 'space-between' }}
            flexWrap="wrap">
            {categories.map(category =>
                isWideVersion ? (
                    <Flex key={category.label} direction="column" align="center">
                        <Image src={category.icon} />
                        <Text mt="2" fontSize="2xl" fontWeight="600" color="heading_dark">
                            {category.label}
                        </Text>
                    </Flex>
                ) : (
                    <Flex key={category.label} align="center">
                        <Box w="2" h="2" borderRadius="full" bgColor="highlight" />
                        <Text m="4" fontSize="xl" fontWeight="600" color="heading_dark">
                            {category.label}
                        </Text>
                    </Flex>
                )
            )}
        </Flex>
    );
}
