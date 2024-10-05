// pages/api/session.js
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function handler(req, res) {
    try {
        const session = await getKindeServerSession(req, res);
        console.log('Session data:', session); // Log session data for debugging

        // Get user data from the session
        const user = await session.getUser(); // Call the getUser() method

        if (user) {
            res.status(200).json({ user }); // Return user data
        } else {
            res.status(200).json({ user: null });
        }
    } catch (error) {
        console.error('Error getting session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
