import { useEffect, useMemo, useState } from 'react'
import GenericModal from '../Modals/GenericModal'
import CropImage from './CropImage'
import { useTranslation } from 'react-i18next'

interface AvatarImageCropperProps {
  initialImage?: string | null
  onImageCropped?: (blob: Blob) => void
  onConfirm?: (blob: Blob) => Promise<void> | void
  size?: number
}

const AvatarImage = ({
  initialImage = null,
  onImageCropped,
  onConfirm,
  size = 128,
}: AvatarImageCropperProps) => {
  const { t } = useTranslation()
  const [openModal, setOpenModal] = useState(false)
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null)

  const previewUrl = useMemo(() => {
    if (avatarBlob) {
      return URL.createObjectURL(avatarBlob)
    }
    return initialImage
  }, [avatarBlob, initialImage])

  useEffect(() => {
    return () => {
      if (previewUrl && avatarBlob) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl, avatarBlob])

  const handleImageCropped = async (blob: Blob | null) => {
    if (!blob) return

    setAvatarBlob(blob)
    onImageCropped?.(blob)

    if (onConfirm) {
      await onConfirm(blob)
    }

    setOpenModal(false)
  }

  return (
    <>
      <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-36"> <div className="w-full h-full overflow-hidden border-[6px] box border-white rounded-full image-fit cursor-pointer bg-gray-100" onClick={() => setOpenModal(true)}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center text-xs text-gray-400">
            {t('select_a_image')}
          </div>
        )}
      </div>
      </div>

      <GenericModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={t('select_a_image')}
        closeOnBackdrop={false}
        size="big"
        content={
          <CropImage
            setImageBlob={handleImageCropped}
            cropShape="round"
            aspect={1}
            onClose={() => setOpenModal(false)}
          />
        }
      />
    </>
  )
}

export default AvatarImage
