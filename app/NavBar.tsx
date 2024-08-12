'use client'
import React from 'react'
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from 'classnames';
import { useSession } from "next-auth/react";
import { Box, Container, DropdownMenu, Flex, Avatar, Text } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NavBar = () => {

	return (
		<nav className='border-b mb-5 px-5 py-3'>
			<Container>
				<Flex justify='between'>
					<Flex align='center' gap='3'>
						<Link href='/'><AiFillBug /></Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
}

const AuthStatus = () => {
	const {status, data: session} = useSession();

	if (status === "loading") return <Skeleton width='3rem' />;

	if (status === "unauthenticated")
		return <Link className='nav-link' href='/auth/signin'>Log In</Link>;

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar src={session!.user!.image!} fallback='?' size='2' radius='full'
							className='cursor-pointer' referrerPolicy='no-referrer' />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size='2'>
							{session!.user!.email}
						</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Link href='/auth/signout'>Log Out</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	)
}

const NavLinks = () => {
	const currentPath = usePathname();
	const links = [
		{label: 'Dashboard', href: '/'},
		{label: 'Bugs', href: '/issues/list'}
	]

	return (
		<ul className='flex space-x-6'>
			{links.map(link =>
				<li key={link.href}>
					<Link className={classnames({
						'nav-link': true,
						'!text-zinc-900': link.href === currentPath,
					})}
						  href={link.href}>{link.label}</Link>
				</li>
			)}
		</ul>
	)
}
export default NavBar
