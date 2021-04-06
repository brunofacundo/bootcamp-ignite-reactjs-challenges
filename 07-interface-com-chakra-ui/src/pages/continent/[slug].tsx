import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Flex, Grid, Image, Text } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import db from '../api/continents/db.json';

interface ContinentProps {
    continent: Continent;
}

interface Continent {
    id: number;
    name: string;
    description: string;
    image: string;
    countries: number;
    languages: number;
    topCities: [
        {
            city: string;
            image: string;
            country: string;
            flag: string;
        }
    ];
}

export default function Continent({ continent }: ContinentProps) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <Flex h="100vh" align="center" justify="center">
                Carregando...
            </Flex>
        );
    }

    return (
        <Flex direction="column" h="100vh">
            <Header back />

            <Flex
                w="100%"
                minH={500}
                bgImage={`url(${continent.image})`}
                bgSize="cover"
                bgPosition="center"
                align={['center', 'flex-end']}>
                <Text
                    w="100%"
                    maxW={1480}
                    mx="auto"
                    px="4"
                    color="heading_light"
                    fontSize="5xl"
                    fontWeight="semibold"
                    mb={['0', '14']}
                    textAlign={['center', 'initial']}>
                    {continent.name}
                </Text>
            </Flex>

            <Flex w="100%" maxW={1480} mx="auto" px="4" direction="column">
                <Flex my="16" direction={['column', 'row']}>
                    <Text flex="1" color="heading_dark" fontSize="2xl" lineHeight="9" textAlign="justify">
                        {continent.description}
                    </Text>

                    <Flex flex="1" mt={['4', '0']} ml={['0', '16']} justify="space-between">
                        <Flex direction="column" align="center" justify="center">
                            <Text color="highlight" fontSize="5xl" fontWeight="semibold">
                                {continent.countries}
                            </Text>
                            <Text color="heading_dark" fontSize="2xl" fontWeight="semibold">
                                países
                            </Text>
                        </Flex>

                        <Flex direction="column" align="center" justify="center">
                            <Text color="highlight" fontSize="5xl" fontWeight="semibold">
                                {continent.languages}
                            </Text>
                            <Text color="heading_dark" fontSize="2xl" fontWeight="semibold">
                                línguas
                            </Text>
                        </Flex>

                        <Flex direction="column" align="center" justify="center">
                            <Text color="highlight" fontSize="5xl" fontWeight="semibold">
                                {continent.topCities.length}
                            </Text>
                            <Text color="heading_dark" fontSize="2xl" fontWeight="semibold">
                                cidades +100
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex direction="column" mb="16">
                    <Text color="heading_dark" fontSize="4xl" fontWeight="medium">
                        Cidades +100
                    </Text>

                    <Grid mt="8" templateColumns={{ base: '1f', xl: 'repeat(4, 1fr)' }} gap="16">
                        {continent.topCities.map(item => (
                            <Flex
                                key={item.city}
                                direction="column"
                                w={['100%', '64']}
                                overflow="hidden"
                                borderTopLeftRadius="base"
                                borderTopRadius="base">
                                <Image src={item.image} w="100%" h="44" objectFit="cover" />

                                <Flex
                                    align="center"
                                    justify="space-between"
                                    p="8"
                                    overflow="hidden"
                                    borderBottomLeftRadius="base"
                                    borderBottomRadius="base"
                                    borderLeftWidth={1}
                                    borderRightWidth={1}
                                    borderBottomWidth={1}
                                    borderColor="highlight">
                                    <Flex direction="column">
                                        <Text color="heading_dark" fontSize="xl" fontWeight="semibold">
                                            {item.city}
                                        </Text>
                                        <Text color="info_dark" fontSize="md" fontWeight="medium" mt="2">
                                            {item.country}
                                        </Text>
                                    </Flex>
                                    <Image src={item.flag} w={30} h={30} borderRadius="full" />
                                </Flex>
                            </Flex>
                        ))}
                    </Grid>
                </Flex>
            </Flex>
        </Flex>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: db.map(continent => ({
            params: { slug: continent.slug }
        })),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps = async context => {
    const continent = db.find(continent => continent.slug == context.params.slug) || {};

    return {
        props: {
            continent
        }
    };
};
