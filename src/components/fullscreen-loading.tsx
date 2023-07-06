import React from 'react'

import { Grid, LayoutProps } from '@chakra-ui/react'

import Loader from '@/components/loader'

interface FullScreenLoadingProps {
  height?: LayoutProps['height']
}

export default function FullScreenLoading({ height }: FullScreenLoadingProps) {
  return (
    <Grid height={height ?? '75vh'}>
      <Loader />
    </Grid>
  )
}
