/**
 * Default Sitemap Options
 */
import axios from "axios";
const defaultOptions = {
    lastmod: new Date(),
    exclude: ['/**'],
    changefreq: 'daily',
    priority: 1,
    gzip: true
  }
  
  const getSitemapChunks = async () => {
    const chunks = []
    const chunkSize = 5000
    // get the total number of items
    // const { count } = await axios.post(
    //   (process.env.BASE_API_URL || "https://dev-movie-api.pirate168.com/api/v1/") + "gen-sitemap-rawdata",
    //   {},
    //   {
    //       headers: {
    //           domain: process.env.DOMAIN || "devmovie",
    //       },
    //   }
    // ); 
    const response = await axios.post(
      (process.env.BASE_API_URL || "https://dev-movie-api.pirate168.com/api/v1/") + "gen-sitemap-rawdata",
      {},
      {
          headers: {
              domain: process.env.DOMAIN || "devmovie",
          },
      }
    );
    const chunkCount = Math.ceil(response.data.result.length / chunkSize)
    console.log(chunkCount);

    for (let i = 1; i <= chunkCount; i++) {
      chunks.push({
        ...defaultOptions,
        path: `sitemap-${i}.xml`,
        routes: async () => {
          const from = i * chunkSize;
          const size = chunkSize;

          let { data: data } = await axios.post(
            (process.env.BASE_API_URL || `https://dev-movie-api.pirate168.com/api/v1/`) + `gen-sitemap-rawdata?from=${from}&size=${size}`,
            {},
            {
                headers: {
                    domain: process.env.DOMAIN || "devmovie",
                },
            },
          );

          return data.data.result.map((x) => {
            return {
                url: x.loc,
                priority: x.priority,
            }
          });
        }
      })
    }
    console.log(chunks);
    return chunks;
  }
  
  /**
   * Export global sitmapindex configuration as async function.
   * This enables splitting of large sitemaps
   *
   * @returns {object} Sitemapindex configuration object
   */
  export const sitemap = async () => {
    const sitemaps = []
  
    /**
     * Create dynamic, chunked sitemaps
     */
    const sitemapChunks = await getSitemapChunks()
    sitemaps.push(...sitemapChunks)
    
    // you can add some more sitemaps ...
  
    
    return {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      cacheTime: 1000 * 60 * 60 * 12,
      exclude: ['/**'],
      path: '/sitemapindex.xml',
      sitemaps: sitemaps
    }
  }