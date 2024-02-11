import supabase from '../../services/supabase.js';

export const handleSignUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) console.error('Error signing up:', error.message);
    else console.log('User signed up', user);
};

export const handleLogin = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
        email,
        password,
    });

    if (error) console.error('Error logging in:', error.message);
    else console.log('User logged in', user);
};

export const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) console.error('Error logging out:', error.message);
};
