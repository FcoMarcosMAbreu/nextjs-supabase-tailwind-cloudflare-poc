import Image from 'next/image'

// replace [yourprojectname] and [yourdomain.com] with your actual project name and (custom) domain
const cloudflareImageLoader = ({ src, width, quality }) => {
  if (!quality) {
    quality = 75
  }
  return `https://image-resizer.marcos-abreu.workers.dev?width=${width}&quality=${quality}&image=https://marcosabreu-net.pages.dev${src}`
}

export default function Img(props) {
  if (process.env.NODE_ENV === 'development') {
    return <Image unoptimized={true} {...props} alt=''/>
  } else {
    return <Image {...props} loader={cloudflareImageLoader} alt=''/>
  }
} 