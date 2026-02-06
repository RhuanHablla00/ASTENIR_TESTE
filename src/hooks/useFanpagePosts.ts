import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

export const useFanpagePosts = (igUserId: string, accessToken: string) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  
  const fetchPosts = useCallback(async () => {
    if (!igUserId || !accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const fields = "message,created_time,full_picture,attachments";

      const url = `https://graph.facebook.com/v19.0/${igUserId}/posts?fields=${fields}&access_token=${accessToken}`;

      const res = await axios.get(url);

      setPosts(res.data.data || []);
    } catch (err: any) {
      setError(t(`errors:${err.response?.data?.error_code}`) || "Erro ao carregar posts");
    } finally {
      setLoading(false);
    }
  }, [igUserId, accessToken]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };
};
