import type { ChatMessage, ChatRole } from "@/lib/types"
import { request } from "@/services/http"

interface ChatMessageRead {
  id: number
  role: ChatRole
  content: string
}

function toChatMessage({ id, role, content }: ChatMessageRead): ChatMessage {
  return { id: String(id), role, text: content }
}

export async function getChat(skimId: string): Promise<ChatMessage[]> {
  const messages = await request<ChatMessageRead[]>(`/skim/${skimId}/chat`)
  return messages.map(toChatMessage)
}

export async function sendChatMessage(
  skimId: string,
  message: string
): Promise<ChatMessage> {
  const reply = await request<ChatMessageRead>(`/skim/${skimId}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
  return toChatMessage(reply)
}
