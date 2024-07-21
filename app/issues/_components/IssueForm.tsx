'use client'
import { Button, TextField, Callout } from "@radix-ui/themes";
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css'
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from "@/app/validationSchema";
import { z } from 'zod';
import { ErrorMessage } from "@/app/components";
import { Spinner } from "@/app/components";
import { Issue } from "@prisma/client";


type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({issue}: { issue?: Issue }) => {
	const router = useRouter()

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [error, setError] = useState('');

	const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
		resolver: zodResolver(createIssueSchema)
	});
	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);
			await axios.post('/api/issues', data);
			router.push('/issues');
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
				<Button disabled={isSubmitting}>Submit new Issue {isSubmitting && <Spinner />}</Button>
			</form>
		</div>
	)
}
export default IssueForm