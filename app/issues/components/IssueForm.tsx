'use client'
import { ErrorMessage } from "@/app/components";
import { Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from "@prisma/client";
import { Button, TextField, Callout } from "@radix-ui/themes";
import axios from 'axios';
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';


type IssueFormData = z.infer<typeof issueSchema>;


const IssueForm = ({issue}: { issue?: Issue }) => {
	const router = useRouter()
	const {
		register,
		control,
		handleSubmit,
		formState: {errors},
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema)
	});
	const [error, setError] = useState('');

	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);
			if (issue) {
				await axios.patch('/api/issues/' + issue.id, data);
			} else {
				await axios.post('/api/issues', data);
			}
			router.push('/issues/list');
			router.refresh();
		} catch (error) {
			setIsSubmitting(false)
			setError('An unexpected error has occurred.')
		}
	})

	return (

		<div className='max-w-xl'>
			{error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
			<form className='space-y-3'
				  onSubmit={onSubmit}>
				<TextField.Root>
					<TextField.Input placeholder='Title' {...register('title')} defaultValue={issue?.title} />
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller name='description' control={control}
							defaultValue={issue?.description}
							render={({field}) =>
								<SimpleMDE placeholder='Description' {...field} />} />
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>{issue ? "Update Issue" : "Submit new Issue"}{' '}{isSubmitting &&
                  <Spinner />}</Button>
			</form>
		</div>
	)
}
export default IssueForm