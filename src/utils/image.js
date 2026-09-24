/**
 * Downscales & converts an uploaded image File into a base64 data: URL (via
 * canvas) so it can be stored directly in localStorage alongside the rest of
 * the product/client data — no backend or file server required. Fine for a
 * small catalog of photos; if you outgrow localStorage's ~5-10MB limit, swap
 * this for a real upload to a storage bucket (S3, Cloudinary, etc.) and store
 * the resulting URL instead.
 */
export function resizeImage(file, maxDimension = 1000, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = () => {
      img.onload = () => {
        let { width, height } = img
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
