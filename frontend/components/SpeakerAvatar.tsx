import type { CSSProperties } from "react";
import { avatarForSpeaker } from "@/lib/avatars";

type SpeakerAvatarProps = {
  speakerId: string;
  className?: string;
  showMark?: boolean;
};

export function SpeakerAvatar({
  speakerId,
  className = "member-avatar",
  showMark = true
}: SpeakerAvatarProps) {
  const avatar = avatarForSpeaker(speakerId);

  return (
    <div
      className={className}
      style={
        {
          "--avatar-a": avatar.colors[0],
          "--avatar-b": avatar.colors[1]
        } as CSSProperties
      }
    >
      <span>{avatar.initials}</span>
      {showMark ? <small>{avatar.mark}</small> : null}
    </div>
  );
}
