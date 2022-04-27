import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/globals.css';
import { RecoilRoot } from 'recoil';

function SpeakupFE({ Component, pageProps }) {
    const queryClient = new QueryClient();
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />;
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default SpeakupFE;
