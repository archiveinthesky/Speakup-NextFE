import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

function SpeakupFE({ Component, pageProps: { session, ...pageProps } }) {
    const queryClient = new QueryClient();
    return (
        <SessionProvider session={session}>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <MantineProvider
                        theme={{
                            colors: {
                                primary: [
                                    '#EAF5F6',
                                    '#D2EBEE',
                                    '#B5E0E5',
                                    '#8ACDD6',
                                    '#6DC1CB',
                                    '#50B4C1',
                                    '#32A8B6',
                                    '#159BAC',
                                    '#0C8C9C',
                                    '#087E8C',
                                ],
                                neutral: [
                                    '#F2FBFC',
                                    '#D8E8EA',
                                    '#B2D4D8',
                                    '#92B7BC',
                                    '#7BA4A9',
                                    '#659096',
                                    '#4F777B',
                                    '#406165',
                                    '#2C4346',
                                    '#243436',
                                ],
                            },
                            primaryColor: 'primary',
                            primaryShade: 6,
                        }}
                    >
                        <NotificationsProvider>
                            <Component {...pageProps} />;
                        </NotificationsProvider>
                    </MantineProvider>
                </QueryClientProvider>
            </RecoilRoot>
        </SessionProvider>
    );
}

export default SpeakupFE;
