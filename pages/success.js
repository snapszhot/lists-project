import PropTypes from 'prop-types'

export default function SuccessPage({ uid }) {
    const link = `https://lists-project.vercel.app/update?uid=${uid}`

    return (
        <div>
            Success! Thank you for voting. To update your votes, use this link:{' '}
            <a href='#'>{link}</a>
        </div>
    )
}

SuccessPage.propTypes = {
    uid: PropTypes.string,
}

export async function getServerSideProps({ preview = false, req }) {
    const uid = req.cookies['list-1965']

    return {
        props: {
            preview,
            uid,
        },
    }
}
