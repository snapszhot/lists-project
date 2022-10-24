import { getSingleList } from '@lib/prismic'

// import { Poll } from '@components/views'

export default function EditPage() {
    return 'Edit my ballot!!'
    // return <Poll {...props} />
}

export async function getServerSideProps({ params, preview = false, req }) {
    const uid = req?.cookies[`list-${params.pollId}`] || null

    if (!uid) {
        return {
            redirect: {
                destination: `/list/${params.pollId}?noBallot=true`,
                permanent: false,
            },
        }
    }

    const list = await getSingleList(preview, params.pollId)

    return {
        props: {
            ...list,
            preview,
            uid: params.pollId,
        },
    }
}
