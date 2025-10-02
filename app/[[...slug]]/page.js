import { ClientOnly } from './client';

export const generateStaticParams = () => {
    return [{ slug: [''] }]
}

const Page = () => {
    return <ClientOnly />
}

export default Page;