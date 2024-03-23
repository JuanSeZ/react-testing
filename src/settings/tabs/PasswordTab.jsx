import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {useToast} from "@/components/ui/use-toast.js";


const formSchema = z.object({
  new: z.string().min(6),
  'new-repeated': z.string().min(6)
}).refine(data => data.new === data['new-repeated'], {
  message: "New password and repeated password must match",
  path: ['new-repeated']
});


export const PasswordTab = () => {
	const { toast } = useToast()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			current: 'secret-password',
			new: '',
			'new-repeated': ''
		}
	})
	const onSubmit = (values) => {
		console.log({ values })
		toast({ title: 'Success', text: 'Password changed' })
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>
					Change your password here. After saving, you`ll be logged out.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="current"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current password</FormLabel>
									<FormControl>
										<Input placeholder='current' id="current" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="new"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New password</FormLabel>
									<FormControl>
										<Input placeholder='new'  id="new" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="new-repeated"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Repeat new password</FormLabel>
									<FormControl>
										<Input placeholder='new-repeated' id="new-repeated" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Save password</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

