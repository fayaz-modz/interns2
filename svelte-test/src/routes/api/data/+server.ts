import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ request }) => {
	return json({
		status: 'user is active'
	});
};
