import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const username = await request.json();
	console.log(username);

	if (typeof username.user !== 'string') {
		return json({
			status: 'user not found'
		});
	}

	return json({
		status: 'user is active'
	});
};
