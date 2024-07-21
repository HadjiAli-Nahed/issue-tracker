import dynamic from "next/dynamic";
import IssueFormSkeleton from "../components/IssueFormSkeleton";

const IssueForm = dynamic(
	() => import('@/app/issues/components/IssueForm'),
	{
		ssr: false,
		loading: () => <IssueFormSkeleton />
	}
);

const NewIssuePage = () => {
	return (
		<IssueForm />
	)
}
export default NewIssuePage
