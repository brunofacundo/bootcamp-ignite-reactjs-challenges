import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, Image, Link } from '@chakra-ui/react';

interface ModalViewImageProps {
    isOpen: boolean;
    onClose: () => void;
    imgUrl: string;
}

export function ModalViewImage({ isOpen, onClose, imgUrl }: ModalViewImageProps): JSX.Element {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent width="fit-content" maxW="900px" maxH="600px">
                <ModalBody p={0}>
                    <Image src={imgUrl} flex="1" objectFit="cover" />
                </ModalBody>

                <ModalFooter bgColor="pGray.700" p={2} justifyContent="flex-start">
                    <Link href={imgUrl} target="__blank">
                        Abrir original
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
