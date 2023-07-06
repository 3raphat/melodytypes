'use client'

import {
  Icon,
  IconButton,
  IconButtonProps,
  useClipboard,
} from '@chakra-ui/react'
import { CopyCheck, CopyIcon } from 'lucide-react'

interface CopyToClipboardProps extends Omit<IconButtonProps, 'aria-label'> {
  text: string
}

export default function CopyToClipboard({
  text,
  ...props
}: CopyToClipboardProps) {
  const { hasCopied, onCopy } = useClipboard(text)

  return (
    <IconButton
      aria-label='Copy to clipboard'
      size='lg'
      icon={<Icon as={hasCopied ? CopyCheck : CopyIcon} />}
      onClick={onCopy}
      colorScheme='blackAlpha'
      {...props}
    />
  )
}
