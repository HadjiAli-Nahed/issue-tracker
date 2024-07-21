import React from 'react'
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

const IssueDetails = ({issue}: { issue: Issue }) => {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Flex className='gap-x-4' my='2'>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className='prose' mt='8'>
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</>
	)
}
export default IssueDetails
