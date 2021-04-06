import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flex, Text, Divider, Link as ChakraLink } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { Category } from '../components/Category';
import { api } from '../services/api';

interface Continent {
    id: number;
    slug: string;
    name: string;
    subtitle: string;
    image: string;
}

export default function Dashboard() {
    const [continents, setContinents] = useState<Continent[]>([]);

    useEffect(() => {
        (async () => {
            const continents = await api.get<Continent[]>('/api/continents');

            setContinents(continents);
        })();
    }, []);

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Banner />
            <Category />

            <Divider alignSelf="center" my="8" bg="heading_dark" borderColor="heading_dark" maxW="20" opacity={1} />

            <Flex direction="column" align="center">
                <Text mb="8" fontSize="4xl" fontWeight="medium" color="heading_dark" textAlign="center">
                    Vamos nessa?
                    <br />
                    Então escolha seu continente
                </Text>
                <Swiper navigation pagination={{ clickable: true }} style={{ width: '100%', color: 'red' }}>
                    {continents.map(continent => (
                        <SwiperSlide key={continent.id}>
                            <Flex
                                h="96"
                                direction="column"
                                align="center"
                                justify="center"
                                bgImage={`url(${continent.image})`}
                                bgSize="cover"
                                bgPosition="center">
                                <Link href={`/continent/${continent.slug}`} passHref>
                                    <ChakraLink
                                        fontSize={['4xl', '5xl']}
                                        fontWeight="bold"
                                        color="heading_light"
                                        cursor="pointer"
                                        transition="all 0.2s"
                                        _hover={{
                                            opacity: '0.6'
                                        }}>
                                        {continent.name}
                                    </ChakraLink>
                                </Link>
                                <Text
                                    fontSize={['xl', '2xl']}
                                    fontWeight="bold"
                                    color="heading_light"
                                    mt="4"
                                    maxW="70%"
                                    align="center">
                                    {continent.subtitle}
                                </Text>
                            </Flex>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Flex>
        </Flex>
    );
}
