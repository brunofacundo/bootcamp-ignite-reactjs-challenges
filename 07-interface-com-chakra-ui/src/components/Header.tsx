import { Flex, Image, Icon, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';

interface HeaderProps {
    back?: boolean;
}

export function Header({ back }: HeaderProps) {
    const router = useRouter();

    function handleBack() {
        router.push('/');
    }

    return (
        <Flex as="header" w="100%" maxW={1480} minH="24" mx="auto" px="4" align="center" justify="space-between">
            {back ? (
                <Icon
                    as={IoChevronBack}
                    onClick={handleBack}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                        opacity: '0.6'
                    }}
                />
            ) : (
                <Box />
            )}
            <Link href="/" passHref>
                <Image src="/logo.svg" alt="Logo" cursor="pointer" />
            </Link>
            <Box />
        </Flex>
    );
}
