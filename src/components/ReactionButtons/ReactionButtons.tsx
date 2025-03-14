"use client";

import { useState, useEffect } from "react";

interface Reaction {
  id: number;
  description: string;
  count: number;
  icon: string; // URL иконки приходит с API
}

interface ReactionButtonsProps {
  articleId: number;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ articleId }) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [userReactionId, setUserReactionId] = useState<number | null>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await fetch(`https://zn.by/api/v1/reactions/list/story/${articleId}/`);
        if (!response.ok) throw new Error("Ошибка загрузки реакций");
        const data: Reaction[] = await response.json();
        setReactions(data);
      } catch (error) {
        console.error("🚨 Ошибка загрузки реакций:", error);
      }
    };

    fetchReactions();
  }, [articleId]);

  const handleReactionClick = async (reaction: Reaction) => {
    try {
      if (reaction.id === userReactionId) {
        await fetch(`https://zn.by/api/v1/reactions/remove/`, {
          method: "POST",
          body: JSON.stringify({
            story_article: articleId,
            reaction_type: reaction.id,
          }),
          headers: { "Content-Type": "application/json" },
        });

        setReactions((prevReactions) =>
          prevReactions.map((r) =>
            r.id === reaction.id ? { ...r, count: Math.max(0, r.count - 1) } : r
          )
        );
        setUserReactionId(null);
      } else {
        if (userReactionId) {
          await fetch(`https://zn.by/api/v1/reactions/remove/`, {
            method: "POST",
            body: JSON.stringify({
              story_article: articleId,
              reaction_type: userReactionId,
            }),
            headers: { "Content-Type": "application/json" },
          });

          setReactions((prevReactions) =>
            prevReactions.map((r) =>
              r.id === userReactionId
                ? { ...r, count: Math.max(0, r.count - 1) }
                : r
            )
          );
        }

        await fetch(`https://zn.by/api/v1/reactions/add/`, {
          method: "POST",
          body: JSON.stringify({
            story_article: articleId,
            reaction_type: reaction.id,
          }),
          headers: { "Content-Type": "application/json" },
        });

        setReactions((prevReactions) =>
          prevReactions.map((r) =>
            r.id === reaction.id ? { ...r, count: r.count + 1 } : r
          )
        );

        setUserReactionId(reaction.id);
      }
    } catch (error) {
      console.error("🚨 Ошибка отправки реакции:", error);
    }
  };

  return (
    <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
      {reactions.length > 0 ? (
        reactions.map((reaction) => (
          <div
            key={reaction.id}
            className={`flex flex-col items-center space-x-1 cursor-pointer ${
              userReactionId === reaction.id ? "text-blue-500" : ""
            }`}
            onClick={() => handleReactionClick(reaction)}
          >
            <img
              src={reaction.icon} // Используем иконку из API
              alt={reaction.description}
              className="w-6 h-6"
            />
            <span>{reaction.count}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-400">Нет реакций</p>
      )}
    </div>
  );
};

export default ReactionButtons;
