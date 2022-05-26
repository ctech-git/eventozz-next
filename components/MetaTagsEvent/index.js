import Head from "next/head"

export const MetaTagsEvent = ({event}) => {
    return (
        <Head>
            <title>{`Eventozz | ${event?.nome_evento ? event?.nome_evento : ''}`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={event?.descricao_seo ? event?.descricao_seo : 'Acesse o link para ver mais detalhes sobre o evento e garantir a sua participação!'} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`Eventozz | ${event?.nome_evento ? event?.nome_evento : ''}`} />
            <meta property="og:description" content={event?.descricao_seo ? event?.descricao_seo : 'Acesse o link para ver mais detalhes sobre o evento e garantir a sua participação!'} />
            <meta property="og:image" itemprop="image" content={event?.imagem_banner ? event.imagem_banner : 'https://www.eventozz.com/images/banner/banner-img1.png'} />
        </Head>
    )
}