import { Flex, Text, Image, useBreakpointValue } from '@chakra-ui/react';

export function Banner() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    });

    return (
        <Flex w="100%" h="80" bgImage="url('/background_banner.png')" bgSize="cover" bgPosition="center">
            <Flex w="100%" maxW={1480} mx="auto" p="4" align="center" justify={{ base: 'center', lg: 'space-between' }}>
                <Flex direction="column" justify="space-between">
                    <Text as="h1" fontSize={['3xl', '4xl']} fontWeight="semibold" color="heading_light">
                        5 Continentes, infinitas possibilidades.
                    </Text>
                    <Text as="h2" fontSize={['lg', 'xl']} color="info_light" mt={[4, 6]}>
                        Chegou a hora de tirar do papel a viagem que você sempre sonhou.{' '}
                    </Text>
                </Flex>
                {isWideVersion && <Image src="/airplane.svg" alt="Airplane" mb="-12" alignSelf="flex-end" />}
            </Flex>
        </Flex>
    );
}
