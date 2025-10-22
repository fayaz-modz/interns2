import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ request }) => {
	console.log(...request.headers);

	return json(
		{
			message: 'hello'
		},
		{
			headers: { 'x-custom-header': 'potato' }
		}
	);
};

export const POST: RequestHandler = ({ request }) => {
	return json({
		message: 'hello from post'
	});
};
