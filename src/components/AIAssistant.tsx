import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  UserRound,
  Trash2,
} from "lucide-react";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hello! I'm ClinicOS AI Assistant. How can I help you today?",
  },
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = input.trim();

    if (!value) return;

    console.log("AI Assistant form value:", { message: value });

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: value,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      text: "I'm currently running in demo mode. Connect an AI service later to provide real-time clinical assistance.",
    };

    setMessages((current) => [
      ...current,
      userMessage,
      assistantMessage,
    ]);

    setInput("");
  };

  const clearChat = () => {
    setMessages(initialMessages);
  };

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <Bot size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                AI Assistant
              </h1>
              <p className="text-sm text-slate-500">
                Your intelligent ClinicOS assistant.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={clearChat}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <Trash2 size={16} />
          Clear Chat
        </button>
      </div>

      {/* Chat */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[70%] ${
                    isUser
                      ? "rounded-br-md bg-teal-600 text-white"
                      : "rounded-bl-md bg-slate-100 text-slate-700"
                  }`}
                >
                  {message.text}
                </div>

                {isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <UserRound size={18} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Suggestions */}
        <div className="border-t border-slate-100 px-4 py-3 sm:px-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              "Today's appointments",
              "Pending reports",
              "Available doctors",
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setInput(suggestion)}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600"
              >
                <Sparkles size={12} />
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-100 p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 focus-within:border-teal-500 focus-within:bg-white">
            <input
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ClinicOS AI..."
              className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white transition hover:bg-teal-700"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </div>

          <p className="mt-2 text-center text-[11px] text-slate-400">
            Demo mode · AI responses are simulated
          </p>
        </form>
      </div>
    </section>
  );
};

export default AIAssistant;