'use client'

import {
  Avatar,
  Button,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ChevronDown, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export default function UserMenu() {
  const { data: session } = useSession()

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={ChevronDown} />}
        h={14}
        rounded='full'
      >
        <HStack spacing={4}>
          <Avatar
            size='sm'
            src={session?.user?.image!}
            name={session?.user?.name!}
          />
          <Heading as='h3' size='md'>
            {session?.user?.name}
          </Heading>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={async () =>
            await signOut({
              callbackUrl: '/',
            })
          }
        >
          <Icon as={LogOut} mr={2} />
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
