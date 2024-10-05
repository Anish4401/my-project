// pages/api/logout.js
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Get the current session
            const session = await getKindeServerSession(req);

            if (session) {
                console.log('Session found:', session);

                // Here, you would normally clear the session or tokens (e.g., clear cookies)
                // Add your session invalidation logic (e.g., res.clearCookie if using cookies)
                // Example: res.clearCookie('session_cookie');

                // Respond with success
                res.setHeader('Set-Cookie', 'kinde_session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict');
                res.status(200).json({ message: 'Logged out successfully' });
            } else {
                console.log('No session found');
                res.status(400).json({ error: 'No session found' });
            }
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Handle incorrect HTTP method (GET, PUT, DELETE, etc.)
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
