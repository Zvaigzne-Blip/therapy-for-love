import { supabase } from './supabaseClient'

// ===== USER FUNCTIONS =====
export async function createUser(username, email, password) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password }])
    .select()
  return { data, error }
}

export async function getUserById(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

// ===== PROFILE FUNCTIONS =====
export async function createProfile(userId, bio, interests) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ user_id: userId, bio, interests }])
    .select()
  return { data, error }
}

export async function updateProfile(userId, bio, interests) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ bio, interests })
    .eq('user_id', userId)
    .select()
  return { data, error }
}

// ===== ARTICLE FUNCTIONS =====
export async function createArticle(title, content, authorId) {
  const { data, error } = await supabase
    .from('articles')
    .insert([{ title, content, author_id: authorId }])
    .select()
  return { data, error }
}

export async function getAllArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*, users(username)')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getArticleById(articleId) {
  const { data, error } = await supabase
    .from('articles')
    .select('*, users(username)')
    .eq('article_id', articleId)
    .single()
  return { data, error }
}

// ===== ADVICE FUNCTIONS =====
export async function createAdvice(userId, content) {
  const { data, error } = await supabase
    .from('advice')
    .insert([{ user_id: userId, content }])
    .select()
  return { data, error }
}

export async function getUserAdvice(userId) {
  const { data, error } = await supabase
    .from('advice')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ===== FORUM FUNCTIONS =====
export async function createForumPost(userId, title, content) {
  const { data, error } = await supabase
    .from('community_forum')
    .insert([{ user_id: userId, title, content }])
    .select()
  return { data, error }
}

export async function getAllForumPosts() {
  const { data, error } = await supabase
    .from('community_forum')
    .select('*, users(username), comments(count)')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getForumPostById(postId) {
  const { data, error } = await supabase
    .from('community_forum')
    .select('*, users(username)')
    .eq('post_id', postId)
    .single()
  return { data, error }
}

export async function updateForumPost(postId, title, content) {
  const { data, error } = await supabase
    .from('community_forum')
    .update({ title, content, updated_at: new Date() })
    .eq('post_id', postId)
    .select()
  return { data, error }
}

export async function deleteForumPost(postId) {
  const { error } = await supabase
    .from('community_forum')
    .delete()
    .eq('post_id', postId)
  return { error }
}

// ===== COMMENT FUNCTIONS =====
export async function createComment(postId, userId, content) {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ post_id: postId, user_id: userId, content }])
    .select()
  return { data, error }
}

export async function getPostComments(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, users(username)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  return { data, error }
}

export async function deleteComment(commentId) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('comment_id', commentId)
  return { error }
}
