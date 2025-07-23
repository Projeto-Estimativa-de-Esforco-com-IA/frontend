import '@mantine/core/styles.css';
import React from "react";
import {createTheme, MantineProvider} from '@mantine/core';
import DataProvider from "@/DataProvider";
import {Inter} from "next/font/google";
import {NextSeo} from "next-seo";

const font = Inter({weight: ["300", "500", "700", "900"], subsets: ["latin"]})

export default function App({Component, pageProps}) {
    const theme = createTheme({
        fontFamily: font.style.fontFamily
    });

    return (
        <React.Fragment>
            <NextSeo
                title="Planning Poker - Ferramenta Gratuita de Estimativa Ágil"
                description="Aumente a produtividade do seu time com o Planning Poker, a melhor ferramenta gratuita de estimativa ágil online. Crie salas virtuais, discuta tópicos e colabore com facilidade."
                openGraph={{
                    url: "https://planning-poker.com",
                    title: "Planning Poker - Ferramenta Gratuita de Estimativa Ágil",
                    description: "Aumente a produtividade do seu time com o Planning Poker, a melhor ferramenta gratuita de estimativa ágil online. Crie salas virtuais, discuta tópicos e colabore com facilidade.",
                    siteName: "Planning Poker",
                    images: [
                        {url: 'https://planning-poker.com/social-card.png'}
                    ],
                }}
                twitter={{
                    cardType: "summary_large_image",
                    site: "https://planning-poker.com"
                }}
            />
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={theme}
            >
                <DataProvider>
                    <Component {...pageProps} />
                </DataProvider>
            </MantineProvider>
        </React.Fragment>
    )
}
