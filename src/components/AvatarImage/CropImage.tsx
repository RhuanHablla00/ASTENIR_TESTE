import { TbCameraOff, TbPhoto, TbTrash } from 'react-icons/tb'
import { ChangeEvent, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { useForm } from 'react-hook-form'
import Button from '../Base/Button'
import { useTranslation } from 'react-i18next'

type Shape = 'rect' | 'round'

interface ICropImageProps {
  setImageBlob: (blob: Blob | null) => void
  onClose?: () => void
  aspect?: number
  cropShape?: Shape
}

interface FormValues {
  image: File | null
}

function getCroppedImg(
  imageSrc: string,
  crop: Area
): Promise<Blob | null> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      canvas.width = crop.width
      canvas.height = crop.height

      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas context not found'))

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )

      canvas.toBlob(
        (blob) => resolve(blob),
        'image/jpeg'
      )
    }

    image.onerror = reject
  })
}

const CropImage = ({
  setImageBlob,
  onClose,
  aspect = 1,
  cropShape = 'round',
}: ICropImageProps) => {
  const { register, handleSubmit, setValue } = useForm<FormValues>()

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(2)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const { t } = useTranslation();
  
  const onSubmit = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
    setImageBlob(croppedImage)
    onClose?.()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setValue('image', file)
      setImageSrc(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  const onCropComplete = (_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white dark:bg-transparent rounded-b-2xl">
      <div className="flex flex-1 w-full items-center bg-white dark:bg-black mx-4 justify-center">
        {imageSrc ? (
          <div className={`relative flex flex-1 w-full ${aspect ? 'aspect-[11/4]' : 'h-[400px]'}`}>
            <button
              onClick={() => {
                setValue('image', null)
                setImageSrc(null)
              }}
              className="absolute right-5 top-5 z-50 bg-gray-400 dark:bg-gray-500 rounded-full p-2 hover:opacity-80"
            >
              <TbTrash className="w-5 h-5 text-white" />
            </button>

            <Cropper
              showGrid={false}
              cropShape={cropShape}
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        ) : (
          <div
            className={`flex ${cropShape === 'rect'
                ? 'w-96 h-56'
                : 'w-56 h-56 rounded-full'
              } bg-gray-200 dark:bg-gray-800 items-center justify-center my-6`}
          >
            <TbCameraOff className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-1 w-full flex-row bg-white dark:bg-transparent gap-4 pt-4"
      >
        <label htmlFor="image">
          <Button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            variant="secondary"
          >
            {t('send_image')}
          </Button>

          <input
            id="image"
            type="file"
            className="hidden"
            {...register('image')}
            ref={imageInputRef}
            onChange={handleImageChange}
          />
        </label>


        <div className="flex flex-1 flex-row items-center justify-center gap-2 p-2">
          <TbPhoto className="text-gray-500 w-4 h-4" />

          <input
            disabled={!imageSrc}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full cursor-pointer accent-primary-500"
            type="range"
            min={1}
            max={3}
            step={0.1}
          />

          <TbPhoto className="text-gray-500 w-6 h-6" />
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          disabled={!imageSrc}
        >
          {t('save')}
        </Button>
      </form>
    </div>
  )
}

export default CropImage
