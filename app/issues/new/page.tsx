import dynamic from "next/dynamic";

const IssueForm = dynamic(
	() => import('@/app/issues/components/IssueForm'),
	{
		ssr: false,
	}
);

const NewIssuePage = () => {
	return (
		<IssueForm />
	)
}
export default NewIssuePage
