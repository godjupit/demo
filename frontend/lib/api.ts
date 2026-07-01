type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message: string;
  agent_id: string;
  thread_id: string | null;
  messages: ChatMessage[];
};

type ChatResponse = {
  thread_id: string;
  agent_id: string;
  answer: string;
  citations: Array<{
    source_id: string;
    title: string;
    url?: string | null;
    quote?: string | null;
  }>;
  related_nodes: string[];
  context_sufficient: boolean;
};

export type RoundtableTurn = {
  speaker_id: string;
  speaker_name: string;
  role: string;
  content: string;
};

export type RoundtableResponse = {
  thread_id: string;
  topic: string;
  moderator_plan: string;
  turns: RoundtableTurn[];
  summary: string;
};

export type TargetedFollowup = {
  id: string;
  speaker_id: string;
  speaker_name: string;
  role: string;
  question: string;
  content: string;
};

export type SpeakerInfo = {
  speaker_id: string;
  name: string;
  role: string;
  perspective: string;
  style: string;
  location: string;
  map_x: number;
  map_y: number;
  latitude: number;
  longitude: number;
};

export type SpeakerChatResponse = {
  thread_id: string;
  speaker_id: string;
  speaker_name: string;
  role: string;
  answer: string;
  citations?: Array<{
    source_id: string;
    chunk_id: string;
    title: string;
    score: number;
    quote: string;
    metadata: Record<string, unknown>;
  }>;
};

export type ConversationResponse = {
  thread_id: string;
  user_id?: string | null;
  agent_id: string;
  messages: ChatMessage[];
};

export type RoundtableStreamEvent =
  | { type: "start"; thread_id: string; topic: string }
  | { type: "plan_start" }
  | { type: "plan_delta"; delta: string }
  | { type: "plan_done"; moderator_plan: string }
  | {
      type: "turn_start";
      speaker_id: string;
      speaker_name: string;
      role: string;
    }
  | { type: "turn_delta"; speaker_id: string; delta: string }
  | ({ type: "turn_done" } & RoundtableTurn)
  | { type: "summary_start" }
  | { type: "summary_delta"; delta: string }
  | { type: "summary_done"; summary: string }
  | { type: "done"; thread_id: string; topic: string }
  | { type: "error"; message: string };

export type TargetedFollowupStreamEvent =
  | {
      type: "target_start";
      thread_id: string;
      speaker_id: string;
      speaker_name: string;
      role: string;
      question: string;
    }
  | { type: "target_delta"; speaker_id: string; delta: string }
  | {
      type: "target_done";
      thread_id: string;
      speaker_id: string;
      speaker_name: string;
      role: string;
      question: string;
      content: string;
    }
  | { type: "error"; message: string };

const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL ?? "http://127.0.0.1:8000";

export async function sendChat(payload: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function getRoundtableSpeakers(): Promise<SpeakerInfo[]> {
  const response = await fetch(`${API_URL}/api/roundtable/speakers`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function getConversation(
  agentId: string,
  threadId: string
): Promise<ConversationResponse> {
  const response = await fetch(
    `${API_URL}/api/conversations/${encodeURIComponent(agentId)}/${encodeURIComponent(threadId)}`
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function sendSpeakerChat(payload: {
  message: string;
  speaker_id: string;
  thread_id: string | null;
  messages: ChatMessage[];
}): Promise<SpeakerChatResponse> {
  const response = await fetch(`${API_URL}/api/roundtable/speaker-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function runRoundtable(
  topic: string,
  speakerIds: string[]
): Promise<RoundtableResponse> {
  const response = await fetch(`${API_URL}/api/roundtable`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ topic, speaker_ids: speakerIds })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function streamRoundtable(
  topic: string,
  speakerIds: string[],
  history: RoundtableResponse[],
  onEvent: (event: RoundtableStreamEvent) => void
): Promise<void> {
  const response = await fetch(`${API_URL}/api/roundtable/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    },
    body: JSON.stringify({ topic, history, speaker_ids: speakerIds })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  if (!response.body) {
    throw new Error("ReadableStream unavailable");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const rawEvent of events) {
      const lines = rawEvent.split("\n");
      const eventType = lines
        .find((line) => line.startsWith("event: "))
        ?.slice("event: ".length);
      const data = lines
        .find((line) => line.startsWith("data: "))
        ?.slice("data: ".length);

      if (!eventType || !data) {
        continue;
      }

      onEvent({ type: eventType, ...JSON.parse(data) } as RoundtableStreamEvent);
    }
  }
}

export async function streamTargetedFollowup(
  payload: {
    question: string;
    speaker_id: string;
    round: RoundtableResponse;
    history: RoundtableResponse[];
  },
  onEvent: (event: TargetedFollowupStreamEvent) => void
): Promise<void> {
  const response = await fetch(`${API_URL}/api/roundtable/followup/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  if (!response.body) {
    throw new Error("ReadableStream unavailable");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const rawEvent of events) {
      const lines = rawEvent.split("\n");
      const eventType = lines
        .find((line) => line.startsWith("event: "))
        ?.slice("event: ".length);
      const data = lines
        .find((line) => line.startsWith("data: "))
        ?.slice("data: ".length);

      if (!eventType || !data) {
        continue;
      }

      onEvent({
        type: eventType,
        ...JSON.parse(data)
      } as TargetedFollowupStreamEvent);
    }
  }
}
