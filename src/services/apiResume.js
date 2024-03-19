import supabase from "./supabase";

export async function getResumeById(id) {
    const { data, error } = await supabase
        .from('resumes')
        .select(`
        *, 
        education(*)
        languages(*),
        work_history(*),
        skills(*),
        social_profiles(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error fetching resume", error);
        throw error;
    }
    return data;
}

export async function createBlankResume(userId) {
    const { data, error } = await supabase
        .from('resumes')
        .insert({ user_id: userId })
        .select("id");

    if (error) {
        console.error("Error creating resume", error);
        throw error;
    }
    return data[0].id;
}

export async function getAllResumes() {
    const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
}

