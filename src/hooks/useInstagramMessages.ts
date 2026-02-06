import { useCallback, useEffect, useState } from "react";

const GRAPH_URL = "https://graph.facebook.com/v19.0";

export interface InstagramConversation {
  id: string;
  updated_time: string;
}

export interface InstagramMessage {
  id?: string;
  from?: {
    id: string;
    username: string;
  };
  message?: string;
  created_time: string;
}

interface UseInstagramMessagesProps {
  pageId: string;
  pageAccessToken: string;
  conversationId?: string;
}

export function useInstagramMessages({
  pageId,
  pageAccessToken,
  conversationId,
}: UseInstagramMessagesProps) {
  const [conversations, setConversations] = useState<
    InstagramConversation[]
  >([]);
  const [messages, setMessages] = useState<InstagramMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${GRAPH_URL}/${pageId}/conversations?platform=instagram&access_token=${pageAccessToken}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Erro ao buscar conversas");
      }

      setConversations(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pageId, pageAccessToken]);

  const fetchMessages = useCallback(
    async (convId: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${GRAPH_URL}/${convId}/messages?fields=from,to,message,created_time&access_token=${pageAccessToken}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "Erro ao buscar mensagens");
        }

        const sorted = (data.data || []).sort(
          (a: InstagramMessage, b: InstagramMessage) =>
            new Date(a.created_time).getTime() -
            new Date(b.created_time).getTime()
        );

        setMessages(sorted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [pageAccessToken]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!conversationId) return;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${GRAPH_URL}/${pageId}/messages?access_token=${pageAccessToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipient: {
                conversation_id: conversationId,
              },
              message: {
                text,
              },
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "Erro ao enviar mensagem");
        }

        // Atualiza lista após envio
        await fetchMessages(conversationId);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [conversationId, pageId, pageAccessToken, fetchMessages]
  );

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId);
    }
  }, [conversationId, fetchMessages]);

  return {
    conversations,
    messages,
    loading,
    error,
    fetchConversations,
    fetchMessages,
    sendMessage,
  };
}
