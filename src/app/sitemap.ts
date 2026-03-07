
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iskconlucknow.in/';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
        url: `${baseUrl}/darshan`,
        lastModified: new Date(),
    },
    {
        url: `${baseUrl}/events`,
        lastModified: new Date(),
    },
    {
        url: `${baseUrl}/donate`,
        lastModified: new Date(),
    },
    {
        url: `${baseUrl}/gallery`,
        lastModified: new Date(),
    },
    {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
    },
    {
        url: `${baseUrl}/srila-prabhupada`,
        lastModified: new Date(),
    },
    {
        url: `${baseUrl}/visit`,
        lastModified: new Date(),
    },
  ]
}
