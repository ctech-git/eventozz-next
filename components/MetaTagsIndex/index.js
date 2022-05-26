import Head from "next/head"

export const MetaTagsIndex = () => {
    return (
        <Head>
            <meta name="description" content="Não pegue filas. Compre de casa, receba os ingressos no seu WhatsApp e participe de seus eventozz favoritos" />
            <meta property="og:title" content="Eventozz - ingressos online" />
            <meta property="og:description" content="Não pegue filas. Compre de casa, receba os ingressos no seu WhatsApp e participe de seus eventozz favoritos" />
            <meta property="og:url" content="https://eventozz.com/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content='https://www.eventozz.com/images/banner/banner-eventozz-mobile.png' key="ogimage" />
            <meta property="og:site_name" content='Eventozz' key="ogsitename" />
        </Head>
    )
}