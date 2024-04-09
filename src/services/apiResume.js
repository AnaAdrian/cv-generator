import supabase from "./supabase";

export async function getResume(id) {
    const { data, error } = await supabase
        .from('resumes')
        .select(`
        *, 
        courses(*),
        education(*),
        hobbies(*),
        languages(*),
        work_history(*),
        social_profiles(*),
        skills(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error fetching resume", error);
        throw error;
    }
    return data;
}

export async function createResume(userId, obj = {}) {
    const { data, error } = await supabase
        .from('resumes')
        .insert({ user_id: userId, ...obj })
        .select("id");

    if (error) {
        console.error("Error creating resume", error);
        throw error;
    }
    return data[0].id;
}

export async function duplicateResume(resumeId) {
    const { data, error } = await supabase.rpc('duplicate_resume', { original_resume_id: resumeId });

    if (error) {
        console.error("Error duplicating resume", error);
        throw error;
    }
    return data;
}


export async function getAllResumes() {
    const { data, error } = await supabase
        .from('resumes')
        .select('id, title, updated_at, preview_image_url, score')
        .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function deleteResume(id) {
    const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Error deleting resume", error);
        throw error;
    }
}

export async function updateResume(tableName, id, updates) {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error updating resume", error);
        throw error;
    }
    return data;
}

export async function calculateResumeScore(id) {
    const { data, error } = await supabase
        .rpc('calculate_resume_score', { resume_id: id });

    if (error) {
        console.error("Error calculating resume score", error);
        throw error;
    }
    return data;
}