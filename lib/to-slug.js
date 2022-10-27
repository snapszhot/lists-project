import slugify from 'slugify'

export default function toSlug(string) {
    return slugify(string, {
        lower: true,
        strict: true,
    })
}
