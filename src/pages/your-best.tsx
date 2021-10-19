import { Button } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FaSpotify } from 'react-icons/fa';

export default function yourBest() {
  const [session] = useSession();

  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push('/');
  }

  return (
    <>
      {session && (
        <Button
          colorScheme="green"
          leftIcon={<FaSpotify />}
          w="fit-content"
          alignSelf="center"
          mt="2rem"
          onClick={() => handleSignOut()}
        >
          Log out
        </Button>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
